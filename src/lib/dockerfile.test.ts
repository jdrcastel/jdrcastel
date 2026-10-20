import { describe, expect, it } from "vitest";
import { lintDockerfile, parseDockerfile, SAMPLE_BAD, SAMPLE_GOOD } from "./dockerfile";

const ids = (src: string) => lintDockerfile(src).issues.map((i) => i.id);

describe("parseDockerfile", () => {
  it("joins continuation lines and skips comments", () => {
    const ins = parseDockerfile("# c\nFROM alpine:3.20\nRUN apk add \\\n  curl");
    expect(ins).toEqual([
      { cmd: "FROM", args: "alpine:3.20", line: 2 },
      { cmd: "RUN", args: "apk add curl", line: 3 },
    ]);
  });
});

describe("lintDockerfile", () => {
  it("finds the classic problems in the bad sample", () => {
    const found = ids(SAMPLE_BAD);
    for (const id of ["pin-tag", "root", "secret", "multi-stage", "cache", "apt-cache", "shell-form"]) {
      expect(found).toContain(id);
    }
    expect(lintDockerfile(SAMPLE_BAD).score).toBeLessThan(40);
  });

  it("gives the multi-stage sample a high score", () => {
    const r = lintDockerfile(SAMPLE_GOOD);
    expect(r.issues.filter((i) => i.level !== "info")).toEqual([]);
    expect(r.score).toBeGreaterThanOrEqual(90);
  });

  it("only checks USER in the final stage", () => {
    const src = "FROM a:1 AS build\nUSER builder\nFROM b:1\nENTRYPOINT [\"x\"]";
    expect(ids(src)).toContain("root");
  });

  it("does not flag digest-pinned images or scratch", () => {
    expect(ids("FROM alpine@sha256:abc\nUSER 1000")).not.toContain("pin-tag");
    expect(ids("FROM scratch\nUSER 1000")).not.toContain("pin-tag");
  });
});
