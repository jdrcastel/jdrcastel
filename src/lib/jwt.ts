// Decodes a JWT (header + payload) and flags common security / config problems.
// It does NOT verify the signature: that needs the issuer's key, and keys never belong in a browser tool.

export type Finding = { level: "error" | "warn" | "ok" | "info"; message: string };

export type JwtResult = {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  dates: { claim: string; label: string; iso: string }[];
  findings: Finding[];
};

export function base64UrlDecode(input: string): string {
  let b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  b64 += "=".repeat((4 - (b64.length % 4)) % 4);
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function decodeJwt(token: string, nowSeconds = Math.floor(Date.now() / 1000)): JwtResult {
  const parts = token.trim().replace(/^Bearer\s+/i, "").split(".");
  if (parts.length !== 3) throw new Error(`A JWT has 3 parts separated by dots; this one has ${parts.length}.`);

  let header: Record<string, unknown>;
  let payload: Record<string, unknown>;
  try {
    header = JSON.parse(base64UrlDecode(parts[0]));
    payload = JSON.parse(base64UrlDecode(parts[1]));
  } catch {
    throw new Error("Header or payload is not valid base64url-encoded JSON.");
  }

  const findings: Finding[] = [];
  const alg = String(header.alg ?? "");
  if (!alg || alg.toLowerCase() === "none") {
    findings.push({ level: "error", message: 'Algorithm is "none": the token is unsigned and anyone can forge it.' });
  } else if (alg.startsWith("HS")) {
    findings.push({ level: "warn", message: `${alg} uses a shared secret. Every service that verifies it can also mint tokens; RS256/ES256 is safer across services.` });
  } else {
    findings.push({ level: "ok", message: `Signed with ${alg} (asymmetric). Verify it with the issuer's public key (JWKS).` });
  }
  if (!parts[2]) findings.push({ level: "error", message: "Signature part is empty." });

  const dates: JwtResult["dates"] = [];
  const labels: Record<string, string> = { iat: "Issued at", nbf: "Not before", exp: "Expires" };
  for (const claim of ["iat", "nbf", "exp"]) {
    const v = payload[claim];
    if (typeof v === "number") dates.push({ claim, label: labels[claim], iso: new Date(v * 1000).toISOString() });
  }

  const exp = payload.exp as number | undefined;
  const nbf = payload.nbf as number | undefined;
  const iat = payload.iat as number | undefined;
  if (typeof exp !== "number") {
    findings.push({ level: "error", message: "No exp claim: the token never expires." });
  } else if (exp < nowSeconds) {
    findings.push({ level: "error", message: `Expired ${humanize(nowSeconds - exp)} ago. A 401 here is expected; the client must refresh the token.` });
  } else {
    findings.push({ level: "ok", message: `Valid for another ${humanize(exp - nowSeconds)}.` });
    if (typeof iat === "number" && exp - iat > 24 * 3600) {
      findings.push({ level: "warn", message: `Lifetime is ${humanize(exp - iat)}. Access tokens are usually minutes to an hour; use refresh tokens for longer sessions.` });
    }
  }
  if (typeof nbf === "number" && nbf > nowSeconds) {
    findings.push({ level: "warn", message: `Not valid yet (nbf is ${humanize(nbf - nowSeconds)} in the future). Check clock skew between servers.` });
  }
  if (typeof iat === "number" && iat > nowSeconds + 60) {
    findings.push({ level: "warn", message: "Issued in the future: the issuer's clock is ahead. Sync servers with NTP." });
  }
  if (!payload.aud) findings.push({ level: "warn", message: "No aud (audience) claim: the API cannot check the token was meant for it." });
  if (!payload.iss) findings.push({ level: "warn", message: "No iss (issuer) claim." });

  return { header, payload, dates, findings };
}

export function humanize(seconds: number): string {
  const s = Math.abs(Math.round(seconds));
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.round(s / 60)} min`;
  if (s < 86400) return `${(s / 3600).toFixed(1).replace(/\.0$/, "")} h`;
  return `${(s / 86400).toFixed(1).replace(/\.0$/, "")} days`;
}
