import { describe, expect, it } from "vitest";
import { decodeJwt, humanize } from "./jwt";

const b64url = (o: object) => btoa(JSON.stringify(o)).replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
const token = (header: object, payload: object, sig = "c2ln") => `${b64url(header)}.${b64url(payload)}.${sig}`;
const NOW = 1_800_000_000;

describe("decodeJwt", () => {
  it("decodes header and payload and reports time left", () => {
    const r = decodeJwt(token({ alg: "RS256" }, { sub: "juan", iss: "idp", aud: "api", iat: NOW - 60, exp: NOW + 3600 }), NOW);
    expect(r.header.alg).toBe("RS256");
    expect(r.payload.sub).toBe("juan");
    expect(r.findings.filter((f) => f.level === "error")).toHaveLength(0);
    expect(r.findings.some((f) => f.message.includes("Valid for another 1 h"))).toBe(true);
  });

  it("flags expired tokens and alg none", () => {
    const r = decodeJwt(token({ alg: "none" }, { exp: NOW - 120 }), NOW);
    const errors = r.findings.filter((f) => f.level === "error").map((f) => f.message);
    expect(errors.some((m) => m.includes('"none"'))).toBe(true);
    expect(errors.some((m) => m.startsWith("Expired 2 min ago"))).toBe(true);
  });

  it("strips a Bearer prefix and rejects malformed tokens", () => {
    expect(decodeJwt("Bearer " + token({ alg: "HS256" }, { exp: NOW + 10 }), NOW).header.alg).toBe("HS256");
    expect(() => decodeJwt("abc.def")).toThrow(/3 parts/);
    expect(() => decodeJwt("@@.@@.x")).toThrow(/base64url/);
  });
});

describe("humanize", () => {
  it("picks a readable unit", () => {
    expect(humanize(45)).toBe("45s");
    expect(humanize(3600)).toBe("1 h");
    expect(humanize(86400 * 2)).toBe("2 days");
  });
});
