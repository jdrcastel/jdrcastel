// Splits an AWS VPC CIDR into public and private subnets across Availability Zones,
// using AWS rules (VPC size /16 to /28, 5 reserved IPs per subnet), and emits Terraform.

export type Subnet = { name: string; tier: "public" | "private"; az: string; cidr: string; first: string; last: string; usable: number };

export const ipToInt = (ip: string): number => {
  const p = ip.split(".").map(Number);
  if (p.length !== 4 || p.some((n) => !Number.isInteger(n) || n < 0 || n > 255)) throw new Error(`"${ip}" is not a valid IPv4 address.`);
  return ((p[0] << 24) >>> 0) + (p[1] << 16) + (p[2] << 8) + p[3];
};
export const intToIp = (n: number): string => [n >>> 24, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join(".");

export function parseCidr(cidr: string): { base: number; prefix: number } {
  const m = cidr.trim().match(/^(\d+\.\d+\.\d+\.\d+)\/(\d{1,2})$/);
  if (!m) throw new Error('Use CIDR notation, e.g. "10.0.0.0/16".');
  const prefix = Number(m[2]);
  if (prefix < 16 || prefix > 28) throw new Error("AWS VPCs must be between /16 and /28.");
  const ip = ipToInt(m[1]);
  const base = prefix === 0 ? 0 : (ip & (~0 << (32 - prefix))) >>> 0;
  if (base !== ip) throw new Error(`Host bits are set. Did you mean ${intToIp(base)}/${prefix}?`);
  return { base, prefix };
}

export function isPrivate(base: number): boolean {
  return (base >>> 24 === 10) || (base >>> 20 === (172 << 4 | 1)) || (base >>> 16 === (192 << 8 | 168));
}

export function planVpc(cidr: string, azCount: number, region = "us-east-1"): { subnets: Subnet[]; subnetPrefix: number; warnings: string[]; notes: string[] } {
  const { base, prefix } = parseCidr(cidr);
  if (azCount < 1 || azCount > 6) throw new Error("Choose between 1 and 6 Availability Zones.");
  const needed = azCount * 2;
  const bits = Math.ceil(Math.log2(needed));
  const subnetPrefix = prefix + bits;
  if (subnetPrefix > 28) throw new Error(`Not enough room: ${needed} subnets would be smaller than /28 (AWS minimum).`);

  const size = 2 ** (32 - subnetPrefix);
  const azs = "abcdef".slice(0, azCount).split("");
  const subnets: Subnet[] = [];
  ["public", "private"].forEach((tier, t) =>
    azs.forEach((az, a) => {
      const start = base + (t * azCount + a) * size;
      subnets.push({
        name: `${tier}-${az}`,
        tier: tier as Subnet["tier"],
        az: `${region}${az}`,
        cidr: `${intToIp(start)}/${subnetPrefix}`,
        first: intToIp(start + 4), // .0 network, .1 router, .2 DNS, .3 reserved
        last: intToIp(start + size - 2), // last address is broadcast (reserved)
        usable: size - 5,
      });
    }),
  );

  const warnings: string[] = [];
  const notes: string[] = [`Each /${subnetPrefix} loses 5 IPs to AWS: network, VPC router, DNS, one reserved, and broadcast.`];
  if (!isPrivate(base)) warnings.push("This range is not RFC 1918 private space; it can clash with public IPs. Prefer 10.0.0.0/8, 172.16.0.0/12 or 192.168.0.0/16.");
  const spare = 2 ** bits - needed;
  if (spare > 0) notes.push(`${spare} subnet block(s) of /${subnetPrefix} left free for future tiers (e.g. databases).`);
  if (azCount === 1) warnings.push("One AZ means no high availability. Use at least 2 for production.");
  return { subnets, subnetPrefix, warnings, notes };
}

export function toTerraform(cidr: string, subnets: Subnet[]): string {
  const blocks = subnets.map(
    (s) => `resource "aws_subnet" "${s.name.replace("-", "_")}" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "${s.cidr}"
  availability_zone       = "${s.az}"
  map_public_ip_on_launch = ${s.tier === "public"}
  tags = { Name = "${s.name}", Tier = "${s.tier}" }
}`,
  );
  return `resource "aws_vpc" "main" {
  cidr_block           = "${cidr.trim()}"
  enable_dns_hostnames = true
  tags = { Name = "main" }
}

${blocks.join("\n\n")}`;
}
