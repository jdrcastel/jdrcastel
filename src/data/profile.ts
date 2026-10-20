// All site content lives here. Edit this file to update the portfolio.
// Keep it in sync with the resume (Resume_Juan_Castelblanco.docx / .pdf).

export const profile = {
  name: "Juan David Rodríguez Castelblanco",
  short: "Juan Castelblanco",
  email: "jdrcastel@gmail.com",
  linkedin: "https://www.linkedin.com/in/jdcastel/",
  github: "https://github.com/jdrcastel",
  repo: "jdrcastel/jdrcastel",
  location: "Ontario, Canada",
  status: "Open to Software Developer roles",
  roles: ["Software developer", "Java & Spring Boot developer", "React & Node.js developer", "AWS-certified engineer"],
  pitch:
    "Software developer for enterprise SaaS: Java and Spring Boot on the backend, React and Node.js across the stack, deployed on AWS with Docker and CI/CD. At OpenText I troubleshoot production incidents on enterprise SaaS platforms and I'm moving into Tier-3 support, so I know how real systems fail and how to fix them. I build with AI coding agents (Claude Code, OpenAI Codex, GitHub Copilot) and verify every change with tests.",
  hobbies: "volleyball 🏐 · gym 🏋️ · video games 🎮",
};

export const stats = [
  { value: "AWS", label: "Certified Cloud Practitioner" },
  { value: "Tier 2 → 3", label: "Moving to Tier-3 support at OpenText" },
  { value: "5+", label: "OpenText products supported (LRE, ALM, Octane…)" },
  { value: "4", label: "Live engineering tools on this site" },
];

// core: one of my strongest skills (highlighted).
// learning: something I'm actively learning right now (dashed, with a sprout).
export type Skill = { name: string; core?: boolean; learning?: boolean };
export const skillGroups: { icon: string; title: string; skills: Skill[] }[] = [
  {
    icon: "☕",
    title: "Java & Spring Boot",
    skills: [
      { name: "Java", core: true }, { name: "Spring Boot", core: true }, { name: "REST APIs", core: true },
      { name: "Microservices" }, { name: "Object-oriented programming" },
    ],
  },
  {
    icon: "⚛️",
    title: "React & Node.js",
    skills: [
      { name: "JavaScript", core: true }, { name: "TypeScript", core: true }, { name: "React", core: true },
      { name: "Node.js", core: true }, { name: "Next.js" }, { name: "Express" }, { name: "Redux" }, { name: "HTML/CSS" },
    ],
  },
  {
    icon: "☁️",
    title: "AWS",
    skills: [
      { name: "AWS Cloud Practitioner", core: true }, { name: "ECS" }, { name: "ECR" }, { name: "S3" },
      { name: "DynamoDB" }, { name: "Cognito" }, { name: "Lambda" }, { name: "IAM" }, { name: "VPC" },
    ],
  },
  {
    icon: "🚀",
    title: "Delivery & quality",
    skills: [
      { name: "Docker", core: true }, { name: "CI/CD", core: true }, { name: "GitHub Actions" }, { name: "Jenkins" },
      { name: "Unit testing" }, { name: "Vitest" }, { name: "Git" }, { name: "Linux" }, { name: "Bash" },
    ],
  },
  {
    icon: "🤖",
    title: "AI coding agents",
    skills: [
      { name: "Claude Code", core: true }, { name: "OpenAI Codex", core: true }, { name: "GitHub Copilot", core: true },
      { name: "AI-assisted code review" },
    ],
  },
  {
    icon: "🗄️",
    title: "Data & production support",
    skills: [
      { name: "SQL", core: true }, { name: "PostgreSQL" }, { name: "SQL Server" }, { name: "MongoDB" }, { name: "DynamoDB" },
      { name: "Root-cause analysis", core: true }, { name: "Log analysis" }, { name: "SAML SSO" }, { name: "OAuth 2.0" },
      { name: "LDAP" }, { name: "Power Apps" }, { name: "Power Automate" },
    ],
  },
];

export type Filter = "devops" | "backend" | "web" | "automation";
export const filters: { id: "all" | Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "web", label: "Full-stack" },
  { id: "devops", label: "AWS & CI/CD" },
  { id: "automation", label: "Automation" },
];

export type Project = {
  title: string;
  status: "Live" | "In use" | "Shipped" | "Next build";
  summary: string;
  bullets?: string[];
  stack: Skill[];
  tags: Filter[];
  featured?: boolean;
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    title: "Enterprise Microservice Platform",
    status: "Shipped",
    featured: true,
    summary: "RESTful CRUD microservice on AWS with authentication, object storage and a containerized CI/CD deployment.",
    bullets: [
      "Node.js/Express REST API with Cognito authentication and S3/DynamoDB storage over HTTPS",
      "Containerized with Docker, images pushed to ECR and deployed to ECS through a CI/CD pipeline",
      "Built with performance and security in mind for an enterprise microservice workflow",
    ],
    stack: [
      { name: "Node.js", core: true }, { name: "Express", core: true }, { name: "AWS ECS" }, { name: "ECR" },
      { name: "Cognito" }, { name: "S3" }, { name: "DynamoDB" }, { name: "Docker", core: true }, { name: "CI/CD" },
    ],
    tags: ["backend", "devops"],
  },
  {
    title: "Engineering Toolbox Portfolio",
    status: "Live",
    summary:
      "The site you are on: browser tools for real engineering tasks, shipped through a tested CI/CD pipeline.",
    bullets: [
      "JWT/SAML SSO inspector, Dockerfile linter, and an AWS VPC subnet planner that generates Terraform",
      "GitHub Actions CI/CD: type check → unit tests → build → deploy; failing tests block the deploy",
    ],
    stack: [
      { name: "TypeScript", core: true }, { name: "Vitest" }, { name: "GitHub Actions", core: true }, { name: "Astro" },
      { name: "AWS VPC" }, { name: "Terraform" },
    ],
    tags: ["devops", "web"],
    link: { href: "#toolbox", label: "Try the tools" },
  },
  {
    title: "Chronicle App (Social Journal)",
    status: "Shipped",
    summary: "Full-stack, multi-tenant social journal app with a Node.js and Express REST backend on MongoDB.",
    stack: [
      { name: "MongoDB", core: true }, { name: "Express", core: true }, { name: "React", core: true },
      { name: "Node.js", core: true }, { name: "Next.js" }, { name: "Redux" },
    ],
    tags: ["web", "backend"],
  },
  {
    title: "SaaS case tracker (Chrome extension)",
    status: "In use",
    summary: "Internal tool I built in JavaScript for my OpenText SaaS support team to track case status and timing.",
    stack: [{ name: "JavaScript" }, { name: "Chrome Extensions API" }, { name: "HTML/CSS" }],
    tags: ["automation", "web"],
  },
  {
    title: "Ontario Government internal apps",
    status: "Shipped",
    summary: "Internal web apps built with Power Apps and business workflows automated with Power Automate.",
    stack: [{ name: "Power Apps" }, { name: "Power Automate" }],
    tags: ["automation"],
  },
  {
    title: "Spring Boot API on AWS",
    status: "Next build",
    summary: "My next project: a production-style Spring Boot API with the same AWS and CI/CD setup.",
    bullets: [
      "Goal: Spring Boot REST API with PostgreSQL",
      "Goal: multi-stage Docker image deployed to AWS ECS",
      "Goal: GitHub Actions pipeline with tests and automated deploy",
    ],
    stack: [
      { name: "Java" }, { name: "Spring Boot" }, { name: "PostgreSQL" }, { name: "Docker" }, { name: "AWS ECS" },
    ],
    tags: ["backend", "devops"],
  },
];

export type ExperienceItem = {
  kind: "Work" | "Internship" | "Certification" | "Volunteer" | "Education";
  when: string;
  role: string;
  org: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    kind: "Work",
    when: "Sep 2025 — Present · Waterloo, ON",
    role: "Technical Support Specialist",
    org: "OpenText",
    bullets: [
      "Provide production support to global enterprise customers on OpenText SaaS products (LoadRunner Enterprise, ALM/QC, Octane/ValueEdge), currently moving from Tier-2 into Tier-3 escalations.",
      "Troubleshoot authentication (SAML SSO, LDAP, OAuth 2.0), integration and performance incidents using Linux/Windows, SQL, Jenkins and system logs, and analyze ticket data to find root causes and recurring issues.",
      "Partner with Operations, Engineering and R&D in an SLA-driven environment to resolve complex escalations.",
      "Built an internal Chrome extension in JavaScript that the SaaS support team uses to track case status and timing.",
    ],
  },
  {
    kind: "Certification",
    when: "Amazon Web Services",
    role: "AWS Certified Cloud Practitioner",
    org: "AWS",
    bullets: ["Core AWS services, global infrastructure, security and the shared responsibility model, pricing and support."],
  },
  {
    kind: "Internship",
    when: "Sep 2022 — Apr 2023 · Toronto, ON",
    role: "Application Developer",
    org: "Government of Ontario",
    bullets: [
      "Built internal web apps with Microsoft Power Apps and automated business workflows with Power Automate.",
      "Worked with developers and designers to fix bugs, deliver new features, and improve user experience.",
    ],
  },
  {
    kind: "Volunteer",
    when: "2022 — 2023",
    role: "Technical Support Engineer",
    org: "Hispanotech",
    bullets: ["Organized technical workshops and networking sessions for Latin American tech professionals in Canada."],
  },
  {
    kind: "Education",
    when: "Jan 2021 — Jan 2024 · Toronto, ON",
    role: "Computer Programming and Analysis (Advanced Diploma)",
    org: "Seneca Polytechnic",
    bullets: [
      "Relevant coursework: Java, Object-Oriented Programming, Cloud Infrastructure, Database Systems, Data Structures.",
      "President's Honour List, Summer and Fall 2023.",
      "Platzi certificates: Advanced Algorithms, REST API with JavaScript, Object-Oriented Programming.",
    ],
  },
];

export const roleFit = [
  ["Java backend", "Java and Spring Boot for REST services. A Spring Boot API on AWS is my next build, with tests, Docker and CI/CD."],
  ["Full-stack", "React and Next.js front ends with Node.js/Express REST APIs (Chronicle, Enterprise Microservice Platform)."],
  ["AWS", "AWS Certified Cloud Practitioner. Deployed a microservice on ECS with ECR, Cognito, S3 and DynamoDB."],
  ["Delivery & quality", "Docker images shipped through CI/CD. This site deploys through a GitHub Actions pipeline where failing tests block the release."],
  ["Databases", "SQL troubleshooting on SQL Server and PostgreSQL in production support; MongoDB and DynamoDB in projects."],
  ["Production experience", "Root-cause analysis on Linux and Windows with logs and SQL, moving from Tier-2 into Tier-3 escalations at OpenText. I know how real systems fail."],
  ["AI coding agents", "Use Claude Code, OpenAI Codex and GitHub Copilot daily to read, debug, review and generate code, and I verify every change with tests."],
  ["Communication", "Lead remote sessions with technical and non-technical customers. Fully bilingual in English and Spanish."],
];
