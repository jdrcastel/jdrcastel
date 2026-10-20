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
  status: "Open to Full-stack, Backend & Cloud roles",
  roles: ["Full-stack developer", "MERN & Next.js developer", "Java & Spring Boot developer", "AWS & DevOps builder"],
  pitch:
    "Full-stack developer strongest in JavaScript and TypeScript (MongoDB, Express, React, Node.js, Next.js), with Java and Spring Boot for backend services. AWS Certified Cloud Practitioner who ships containerized REST services on AWS with Docker and CI/CD. At OpenText I troubleshoot production incidents on enterprise SaaS platforms and I'm moving into Tier-3 support. I build with AI coding agents every day: Claude Code, OpenAI Codex and GitHub Copilot.",
  hobbies: "volleyball 🏐 · gym 🏋️ · video games 🎮",
};

export const stats = [
  { value: "AWS", label: "Certified Cloud Practitioner" },
  { value: "Tier 2 → 3", label: "Moving to Tier-3 support at OpenText" },
  { value: "5+", label: "OpenText products supported (LRE, ALM, Octane…)" },
  { value: "4", label: "Live DevOps tools on this site" },
];

// core: one of my strongest skills (highlighted).
// learning: something I'm actively learning right now (dashed, with a sprout).
export type Skill = { name: string; core?: boolean; learning?: boolean };
export const skillGroups: { icon: string; title: string; skills: Skill[] }[] = [
  {
    icon: "⚛️",
    title: "JavaScript & MERN",
    skills: [
      { name: "JavaScript", core: true }, { name: "TypeScript", core: true }, { name: "React", core: true },
      { name: "Next.js", core: true }, { name: "Node.js", core: true }, { name: "Express", core: true },
      { name: "MongoDB", core: true }, { name: "REST APIs", core: true }, { name: "Redux" }, { name: "HTML/CSS" },
      { name: "Astro" },
    ],
  },
  {
    icon: "☕",
    title: "Java",
    skills: [
      { name: "Java" }, { name: "Spring Boot" }, { name: "REST APIs" }, { name: "Microservices" },
      { name: "Object-oriented programming" },
    ],
  },
  {
    icon: "☁️",
    title: "AWS & Cloud",
    skills: [
      { name: "AWS Cloud Practitioner", core: true }, { name: "ECS" }, { name: "ECR" }, { name: "S3" },
      { name: "DynamoDB" }, { name: "Cognito" }, { name: "Lambda" }, { name: "IAM" }, { name: "VPC" },
    ],
  },
  {
    icon: "⚙️",
    title: "DevOps & CI/CD",
    skills: [
      { name: "Docker", core: true }, { name: "GitHub Actions", core: true }, { name: "CI/CD", core: true },
      { name: "Linux", core: true }, { name: "Jenkins" }, { name: "Git" }, { name: "Bash" }, { name: "Vitest" },
      { name: "Kubernetes", learning: true }, { name: "Terraform", learning: true },
    ],
  },
  {
    icon: "🤖",
    title: "AI coding agents",
    skills: [
      { name: "Claude Code", core: true }, { name: "OpenAI Codex", core: true }, { name: "GitHub Copilot", core: true },
      { name: "Prompt engineering" }, { name: "AI-assisted code review" },
    ],
  },
  {
    icon: "🔐",
    title: "Data & enterprise support",
    skills: [
      { name: "SQL", core: true }, { name: "PostgreSQL" }, { name: "SQL Server" }, { name: "DynamoDB" },
      { name: "SAML SSO", core: true }, { name: "OAuth 2.0" }, { name: "LDAP" }, { name: "Log analysis" },
      { name: "Salesforce" }, { name: "Power Apps" }, { name: "Power Automate" },
    ],
  },
];

export type Filter = "devops" | "backend" | "web" | "automation";
export const filters: { id: "all" | Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "web", label: "Full-stack / MERN" },
  { id: "backend", label: "Backend" },
  { id: "devops", label: "DevOps & AWS" },
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
    title: "DevOps Toolbox Portfolio",
    status: "Live",
    summary:
      "The site you are on: browser tools for real support and DevOps tasks, shipped through a tested pipeline.",
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
    summary: "My next project, to show Java and Spring Boot with the same AWS and DevOps setup.",
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
  ["Full-stack JavaScript", "My strongest area: MERN apps with React and Next.js front ends and Node.js/Express REST APIs (Chronicle, Enterprise Microservice Platform)."],
  ["Java backend", "Java and Spring Boot for REST services; a Spring Boot API on AWS is my next build."],
  ["AWS", "AWS Certified Cloud Practitioner. Deployed a microservice on ECS with ECR, Cognito, S3 and DynamoDB."],
  ["CI/CD & containers", "Docker images deployed through CI/CD; this site ships through a GitHub Actions pipeline I wrote. Jenkins daily at OpenText."],
  ["Databases", "MongoDB in MERN apps; SQL troubleshooting on SQL Server and PostgreSQL in production support; DynamoDB on AWS."],
  ["Identity & security", "Resolve SAML SSO, OAuth 2.0 and LDAP incidents for enterprise customers. The SSO inspector is the tool I wanted for that job."],
  ["AI coding agents", "Use Claude Code, OpenAI Codex and GitHub Copilot daily to read, debug, review and generate code, and I verify every change with tests."],
  ["Production troubleshooting", "Root-cause analysis on Linux and Windows with logs and SQL, moving from Tier-2 into Tier-3 escalations at OpenText."],
  ["Communication", "Lead remote sessions with technical and non-technical customers. Fully bilingual in English and Spanish."],
];
