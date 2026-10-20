// Static checks for common Dockerfile problems: security, image size and build-cache use.

export type Rule = { id: string; level: "error" | "warn" | "info"; line?: number; message: string; fix: string };
export type LintResult = { score: number; issues: Rule[]; passed: string[] };

type Instr = { cmd: string; args: string; line: number };

export function parseDockerfile(src: string): Instr[] {
  const out: Instr[] = [];
  const lines = src.split(/\r?\n/);
  let buf = "";
  let start = 0;
  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!buf && (line === "" || line.startsWith("#"))) return;
    if (!buf) start = i + 1;
    buf += (buf ? " " : "") + line.replace(/\\$/, "").trim();
    if (line.endsWith("\\")) return;
    const m = buf.match(/^(\w+)\s*(.*)$/);
    if (m) out.push({ cmd: m[1].toUpperCase(), args: m[2], line: start });
    buf = "";
  });
  return out;
}

const PENALTY = { error: 15, warn: 7, info: 2 } as const;
const BUILD_TOOLS = /\b(mvn|mvnw|gradle|gradlew|npm (run )?build|npm ci|yarn build|go build|dotnet publish|pip install)\b/;
const DEP_INSTALL = /\b(npm (ci|install)|yarn( install)?|pip install|mvnw?|gradlew?)\b/;

export function lintDockerfile(src: string): LintResult {
  const ins = parseDockerfile(src);
  const issues: Rule[] = [];
  const passed: string[] = [];
  const add = (r: Rule) => issues.push(r);

  const froms = ins.filter((i) => i.cmd === "FROM");
  if (!froms.length) {
    add({ id: "no-from", level: "error", message: "No FROM instruction.", fix: "Start with a base image, e.g. FROM eclipse-temurin:21-jre." });
    return { score: 0, issues, passed };
  }

  for (const f of froms) {
    const image = f.args.split(/\s+/).find((t) => !t.startsWith("--")) ?? "";
    if (image === "scratch") continue;
    const tag = image.includes("@") ? "digest" : image.split("/").pop()!.split(":")[1];
    if (!tag || tag === "latest") {
      add({ id: "pin-tag", level: "warn", line: f.line, message: `"${image}" is not pinned to a version.`, fix: "Use a specific tag (e.g. :21-jre) so builds are reproducible." });
    }
  }

  const finalStage = ins.slice(ins.lastIndexOf(froms[froms.length - 1]));
  const users = finalStage.filter((i) => i.cmd === "USER");
  const lastUser = users[users.length - 1]?.args.trim();
  if (!lastUser || lastUser === "root" || lastUser === "0") {
    add({ id: "root", level: "error", line: lastUser ? users[users.length - 1].line : undefined, message: "The container runs as root.", fix: "Create a user and switch to it: RUN useradd -r app && USER app" });
  } else passed.push("Runs as a non-root user");

  if (froms.length > 1) passed.push("Multi-stage build keeps build tools out of the final image");
  else if (ins.some((i) => i.cmd === "RUN" && BUILD_TOOLS.test(i.args))) {
    add({ id: "multi-stage", level: "warn", message: "Builds inside a single stage, so the JDK/SDK and build cache ship to production.", fix: "Use a builder stage (FROM maven… AS build) and copy only the artifact into a slim runtime image." });
  }

  ins.forEach((i) => {
    if (i.cmd === "ENV" || i.cmd === "ARG") {
      if (/(PASSWORD|SECRET|TOKEN|API_?KEY|PRIVATE_KEY)\s*[= ]\s*\S+/i.test(i.args)) {
        add({ id: "secret", level: "error", line: i.line, message: "A secret is baked into the image; anyone who pulls it can read it.", fix: "Inject secrets at runtime (Kubernetes Secrets, AWS Secrets Manager) or use BuildKit --mount=type=secret." });
      }
    }
    if (i.cmd === "ADD" && !/https?:\/\//.test(i.args) && !/\.(tar|tgz|tar\.gz)\b/.test(i.args)) {
      add({ id: "add", level: "info", line: i.line, message: "ADD used to copy local files.", fix: "Use COPY; ADD has implicit behaviour (URL fetch, auto-extract)." });
    }
    if (i.cmd === "RUN") {
      if (/apt-get install/.test(i.args)) {
        if (!/--no-install-recommends/.test(i.args)) add({ id: "apt-recommends", level: "info", line: i.line, message: "apt-get install pulls recommended packages.", fix: "Add --no-install-recommends." });
        if (!/rm -rf \/var\/lib\/apt\/lists/.test(i.args)) add({ id: "apt-cache", level: "warn", line: i.line, message: "apt cache is left in the layer.", fix: "End the same RUN with && rm -rf /var/lib/apt/lists/*" });
        if (!/apt-get update/.test(i.args)) add({ id: "apt-update", level: "warn", line: i.line, message: "apt-get install without update in the same RUN can use a stale cached index.", fix: "Combine: RUN apt-get update && apt-get install -y …" });
      }
      if (/(curl|wget)[^|]*\|\s*(ba)?sh/.test(i.args)) add({ id: "curl-sh", level: "warn", line: i.line, message: "Pipes a remote script straight into a shell.", fix: "Download, verify a checksum, then run it." });
      if (/\bsudo\b/.test(i.args)) add({ id: "sudo", level: "warn", line: i.line, message: "sudo inside a Dockerfile.", fix: "RUN already runs as the current USER; switch USER instead." });
    }
  });

  // Cache busting: copying the whole source before installing dependencies
  const copyAll = ins.findIndex((i) => (i.cmd === "COPY" || i.cmd === "ADD") && /^(--\S+\s+)*\.\s+\S+/.test(i.args));
  const depInstall = ins.findIndex((i) => i.cmd === "RUN" && DEP_INSTALL.test(i.args));
  if (copyAll !== -1 && depInstall > copyAll) {
    add({ id: "cache", level: "warn", line: ins[copyAll].line, message: "COPY . runs before installing dependencies, so any code change re-downloads all of them.", fix: "Copy pom.xml / package.json first, install, then COPY the rest." });
  } else if (depInstall !== -1) passed.push("Dependencies are installed before the source is copied (good layer caching)");

  if (!ins.some((i) => i.cmd === "HEALTHCHECK")) {
    add({ id: "healthcheck", level: "info", message: "No HEALTHCHECK.", fix: "Add one (e.g. curl -f http://localhost:8080/actuator/health), or define liveness/readiness probes in Kubernetes." });
  } else passed.push("Has a HEALTHCHECK");

  if (!ins.some((i) => i.cmd === "EXPOSE")) add({ id: "expose", level: "info", message: "No EXPOSE: the listening port is undocumented.", fix: "EXPOSE 8080" });

  const cmds = ins.filter((i) => i.cmd === "CMD" || i.cmd === "ENTRYPOINT");
  if (!cmds.length) add({ id: "no-cmd", level: "warn", message: "No CMD or ENTRYPOINT.", fix: 'Add ENTRYPOINT ["java","-jar","app.jar"]' });
  else if (cmds.some((c) => !c.args.trim().startsWith("["))) {
    const c = cmds.find((x) => !x.args.trim().startsWith("["))!;
    add({ id: "shell-form", level: "info", line: c.line, message: "Shell form CMD/ENTRYPOINT: the app is not PID 1 and misses SIGTERM, so shutdowns are not graceful.", fix: 'Use exec form: ENTRYPOINT ["java","-jar","app.jar"]' });
  } else passed.push("Exec-form ENTRYPOINT/CMD receives SIGTERM for graceful shutdown");

  const score = Math.max(0, 100 - issues.reduce((s, r) => s + PENALTY[r.level], 0));
  issues.sort((a, b) => PENALTY[b.level] - PENALTY[a.level]);
  return { score, issues, passed };
}

export const SAMPLE_BAD = `FROM maven:latest
WORKDIR /app
COPY . .
RUN mvn -q package -DskipTests
ENV DB_PASSWORD=supersecret
RUN apt-get install -y curl
CMD java -jar target/app.jar`;

export const SAMPLE_GOOD = `# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /src
COPY pom.xml .
RUN mvn -q dependency:go-offline
COPY src ./src
RUN mvn -q package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jre
RUN useradd -r -u 1001 app
WORKDIR /app
COPY --from=build /src/target/app.jar app.jar
USER app
EXPOSE 8080
HEALTHCHECK CMD curl -f http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]`;
