// Reads a SAML Response (base64 as posted by the browser, or raw XML) and surfaces
// the fields that usually explain a failed SSO login.

import type { Finding } from "./jwt";

export type SamlResult = {
  fields: { label: string; value: string }[];
  attributes: { name: string; values: string[] }[];
  findings: Finding[];
};

const STATUS_HINTS: Record<string, string> = {
  Success: "The IdP authenticated the user.",
  Requester: "The IdP rejected the request from the SP. Check the AuthnRequest, Entity ID and ACS URL.",
  Responder: "The IdP failed on its side. Check the IdP logs.",
  AuthnFailed: "The user failed to authenticate at the IdP.",
  InvalidNameIDPolicy: "The SP asked for a NameID format the IdP does not release.",
  RequestDenied: "The IdP refused to issue an assertion for this SP.",
};

export function decodeSamlInput(input: string): string {
  const text = input.trim();
  if (text.startsWith("<")) return text;
  try {
    const bin = atob(decodeURIComponent(text).replace(/\s+/g, ""));
    return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
  } catch {
    throw new Error("Input is neither XML nor base64. Paste the SAMLResponse value from the browser's network tab.");
  }
}

// Pass the browser's DOMParser in; keeps this module free of DOM globals.
export function parseSaml(input: string, parser: DOMParser, now = new Date()): SamlResult {
  const doc = parser.parseFromString(decodeSamlInput(input), "application/xml");
  if (doc.getElementsByTagName("parsererror").length) throw new Error("The decoded value is not well-formed XML.");

  const byLocal = (name: string) => [...doc.getElementsByTagName("*")].filter((e) => e.localName === name);
  const first = (name: string) => byLocal(name)[0];

  if (!first("Response") && !first("Assertion")) throw new Error("No SAML Response or Assertion element found.");

  const fields: SamlResult["fields"] = [];
  const findings: Finding[] = [];
  const add = (label: string, value: string | null | undefined) => value && fields.push({ label, value });

  const statusCode = first("StatusCode")?.getAttribute("Value") ?? "";
  const statusShort = statusCode.split(":").pop() ?? "";
  add("Status", statusShort || undefined);
  if (statusShort) {
    const sub = byLocal("StatusCode")[1]?.getAttribute("Value")?.split(":").pop();
    const key = sub && STATUS_HINTS[sub] ? sub : statusShort;
    findings.push({ level: statusShort === "Success" ? "ok" : "error", message: `${sub ? `${statusShort} / ${sub}: ` : ""}${STATUS_HINTS[key] ?? statusCode}` });
  }

  add("Issuer (IdP)", first("Issuer")?.textContent?.trim());
  add("Destination (ACS URL)", first("Response")?.getAttribute("Destination"));
  add("InResponseTo", first("Response")?.getAttribute("InResponseTo"));
  const nameId = first("NameID");
  add("NameID", nameId?.textContent?.trim());
  add("NameID format", nameId?.getAttribute("Format")?.split(":").pop());
  add("Audience (SP Entity ID)", first("Audience")?.textContent?.trim());
  const conditions = first("Conditions");
  const notBefore = conditions?.getAttribute("NotBefore");
  const notOnOrAfter = conditions?.getAttribute("NotOnOrAfter");
  add("NotBefore", notBefore);
  add("NotOnOrAfter", notOnOrAfter);

  if (!first("Assertion") && !first("EncryptedAssertion") && statusShort === "Success") {
    findings.push({ level: "error", message: "Status is Success but there is no Assertion." });
  }
  if (first("EncryptedAssertion")) {
    findings.push({ level: "info", message: "The assertion is encrypted. Only the SP's private key can read its contents." });
  }
  if (first("Signature")) {
    findings.push({ level: "ok", message: "Signature present. The SP must validate it against the IdP certificate in its metadata." });
  } else if (first("Assertion")) {
    findings.push({ level: "error", message: "No signature on the Response or Assertion. A secure SP must reject this." });
  }
  if (notOnOrAfter && new Date(notOnOrAfter) <= now) {
    findings.push({ level: "warn", message: "The assertion window has passed (NotOnOrAfter). Expected for an old capture; on a live login, check clock skew." });
  }
  if (notBefore && new Date(notBefore) > now) {
    findings.push({ level: "warn", message: "NotBefore is in the future: the IdP clock is ahead of this machine." });
  }
  if (first("Assertion") && !first("Audience")) {
    findings.push({ level: "warn", message: "No AudienceRestriction: the assertion is not bound to a specific SP." });
  }

  const attributes = byLocal("Attribute").map((a) => ({
    name: a.getAttribute("FriendlyName") || a.getAttribute("Name") || "(unnamed)",
    values: [...a.getElementsByTagName("*")].filter((v) => v.localName === "AttributeValue").map((v) => v.textContent?.trim() ?? ""),
  }));
  if (first("Assertion") && attributes.length === 0) {
    findings.push({ level: "info", message: "No attributes released. If the app needs email or groups, map them in the IdP." });
  }

  return { fields, attributes, findings };
}
