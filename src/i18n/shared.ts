// Language-neutral data: links, technology names and colors. Text lives in en.ts / es.ts.

export const person = {
  name: "Juan David Rodríguez Castelblanco",
  short: "Juan Castelblanco",
  email: "jdrcastel@gmail.com",
  linkedin: "https://www.linkedin.com/in/jdcastel/",
  github: "https://github.com/jdrcastel",
  resume: "Resume_Juan_Castelblanco.pdf",
};

// core: built with it and know it well (highlighted). Everything else: hands-on.
export type Skill = { name: string; core?: boolean };

export const skillChips: Record<string, { icon: string; skills: Skill[] }> = {
  frontend: {
    icon: "⚛️",
    skills: [
      { name: "JavaScript", core: true }, { name: "TypeScript", core: true }, { name: "React", core: true },
      { name: "Next.js", core: true }, { name: "Redux", core: true }, { name: "HTML/CSS", core: true },
      { name: "Responsive UI", core: true },
    ],
  },
  backend: {
    icon: "🧩",
    skills: [
      { name: "Node.js", core: true }, { name: "Express", core: true }, { name: "REST APIs", core: true },
      { name: "Microservices", core: true }, { name: "OAuth 2.0" }, { name: "Java" }, { name: "OOP" },
    ],
  },
  aws: {
    icon: "☁️",
    skills: [
      { name: "AWS Cloud Practitioner", core: true }, { name: "ECS" }, { name: "ECR" }, { name: "S3" },
      { name: "DynamoDB" }, { name: "Cognito" },
    ],
  },
  delivery: {
    icon: "🚀",
    skills: [
      { name: "Docker", core: true }, { name: "CI/CD", core: true }, { name: "GitHub Actions" }, { name: "Jest" },
      { name: "Jenkins" }, { name: "Git" },
    ],
  },
  data: {
    icon: "🗄️",
    skills: [{ name: "SQL", core: true }, { name: "MongoDB" }, { name: "SQL Server" }, { name: "DynamoDB" }],
  },
  support: {
    icon: "🛠️",
    skills: [
      { name: "Root-cause analysis", core: true }, { name: "Log analysis", core: true }, { name: "Linux" },
      { name: "Bash" }, { name: "GitHub Copilot", core: true },
    ],
  },
};

export const learningChips: Record<string, { icon: string; items: string[] }> = {
  agentic: {
    icon: "🤖",
    items: ["Claude Code", "OpenAI Codex", "Agent workflows", "Prompting for code", "Reviewing AI code"],
  },
  integrations: {
    icon: "🧠",
    items: ["LLM APIs (Claude, OpenAI)", "Structured output", "Tool calling", "MCP basics"],
  },
  casshy: {
    icon: "🏗️",
    items: ["Turborepo + pnpm", "NestJS", "Prisma", "PostgreSQL", "Better Auth", "Zod", "shadcn/ui", "Rive", "k3s"],
  },
  java: {
    icon: "☕",
    items: ["Spring Boot", "Spring Data JPA", "JUnit"],
  },
};

export type ProjectMeta = {
  stack: Skill[];
  tags: ("backend" | "web" | "aws")[];
  links: { key: "casshy" | "learning" | "api" | "ui" | "code"; href: string }[];
  featured?: boolean;
  group?: "extension";
};

export const projectMeta: Record<string, ProjectMeta> = {
  casshy: {
    featured: true,
    stack: [
      { name: "Next.js", core: true }, { name: "TypeScript", core: true }, { name: "NestJS" }, { name: "PostgreSQL" },
      { name: "Prisma" }, { name: "Turborepo" }, { name: "shadcn/ui" }, { name: "Rive" }, { name: "Docker" },
    ],
    tags: ["web", "backend"],
    links: [{ key: "casshy", href: "#casshy" }],
  },
  incidenthub: {
    stack: [
      { name: "Java" }, { name: "Spring Boot" }, { name: "PostgreSQL" }, { name: "Spring Data JPA" },
      { name: "LLM API" }, { name: "JUnit" }, { name: "Docker" },
    ],
    tags: ["backend"],
    links: [{ key: "learning", href: "#skills" }],
  },
  fragments: {
    stack: [
      { name: "Node.js", core: true }, { name: "Express", core: true }, { name: "Cognito" }, { name: "S3" },
      { name: "DynamoDB" }, { name: "Docker", core: true }, { name: "ECR" }, { name: "ECS" }, { name: "Jest" },
      { name: "GitHub Actions" },
    ],
    tags: ["backend", "aws"],
    links: [
      { key: "api", href: "https://github.com/jdcastel/Microservice-fragments-Cloud-Computing" },
      { key: "ui", href: "https://github.com/jdcastel/Microservice-fragments-UI" },
    ],
  },
  timer: {
    group: "extension",
    stack: [
      { name: "JavaScript", core: true }, { name: "Manifest V3" }, { name: "Service worker" },
      { name: "chrome.alarms / storage" },
    ],
    tags: ["web"],
    links: [{ key: "code", href: "https://github.com/jdrcastel/Timer-SaaS-Team" }],
  },
};

// Sample amounts for the Casshy dashboard preview, in cents (Casshy stores money as integers)
export const sampleBudget = { budget: 320000, spent: 184000 };
