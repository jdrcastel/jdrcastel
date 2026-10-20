import { describe, expect, it } from "vitest";
import { intToIp, ipToInt, parseCidr, planVpc, toTerraform } from "./cidr";

describe("ip helpers", () => {
  it("round-trips addresses above 128.0.0.0", () => {
    expect(intToIp(ipToInt("192.168.10.255"))).toBe("192.168.10.255");
    expect(() => ipToInt("10.0.0.256")).toThrow();
  });
});

describe("parseCidr", () => {
  it("enforces AWS VPC sizes and clean network addresses", () => {
    expect(parseCidr("10.0.0.0/16")).toEqual({ base: ipToInt("10.0.0.0"), prefix: 16 });
    expect(() => parseCidr("10.0.0.0/8")).toThrow(/16 and \/28/);
    expect(() => parseCidr("10.0.1.0/16")).toThrow(/10.0.0.0\/16/);
  });
});

describe("planVpc", () => {
  it("splits a /16 across 3 AZs into 8 /19 blocks with AWS reserved IPs", () => {
    const { subnets, subnetPrefix, notes } = planVpc("10.0.0.0/16", 3);
    expect(subnetPrefix).toBe(19);
    expect(subnets.map((s) => s.cidr)).toEqual([
      "10.0.0.0/19", "10.0.32.0/19", "10.0.64.0/19",
      "10.0.96.0/19", "10.0.128.0/19", "10.0.160.0/19",
    ]);
    expect(subnets[0]).toMatchObject({ name: "public-a", az: "us-east-1a", first: "10.0.0.4", last: "10.0.31.254", usable: 8187 });
    expect(notes.some((n) => n.includes("2 subnet block(s)"))).toBe(true);
  });

  it("rejects plans that need subnets smaller than /28", () => {
    expect(() => planVpc("10.0.0.0/27", 2)).toThrow(/28/);
  });

  it("warns about public ranges", () => {
    expect(planVpc("8.8.0.0/16", 2).warnings[0]).toMatch(/RFC 1918/);
  });

  it("generates Terraform for every subnet", () => {
    const { subnets } = planVpc("172.16.0.0/20", 2, "ca-central-1");
    const tf = toTerraform("172.16.0.0/20", subnets);
    expect(tf.match(/resource "aws_subnet"/g)).toHaveLength(4);
    expect(tf).toContain('availability_zone       = "ca-central-1b"');
  });
});
