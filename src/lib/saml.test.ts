import { describe, expect, it } from "vitest";
import { decodeSamlInput } from "./saml";

describe("decodeSamlInput", () => {
  it("accepts raw XML, base64 and URL-encoded base64", () => {
    const xml = "<samlp:Response/>";
    const b64 = btoa(xml);
    expect(decodeSamlInput(xml)).toBe(xml);
    expect(decodeSamlInput(b64)).toBe(xml);
    expect(decodeSamlInput(encodeURIComponent(b64))).toBe(xml);
  });

  it("rejects input that is neither", () => {
    expect(() => decodeSamlInput("not base64!!")).toThrow(/neither XML nor base64/);
  });
});
