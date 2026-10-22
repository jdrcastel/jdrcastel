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
  roles: ["Software developer", "JavaScript & React developer", "Node.js microservices on AWS", "Growing into Java & Spring Boot"],
  hobbies: "soccer ⚽ · gym 🏋️ · video games 🎮",
  tagline: "JavaScript & React developer who also ships Node.js services on AWS. Now growing into Java, Spring Boot and AI integrations.",
  about: [
    "I'm a software developer with strong JavaScript and front-end skills: React, Next.js, TypeScript and Redux. On the backend I built a Node.js microservice on AWS with Cognito, S3, DynamoDB, Docker and a CI/CD pipeline to ECS.",
    "At OpenText I support enterprise SaaS customers in production and I'm moving from Tier 2 into Tier 3, so I know how real systems fail and how to fix them. I also built a Chrome extension my team uses every day.",
    "Right now I'm learning Java and Spring Boot, and how to build with AI: coding agents like Claude Code and OpenAI Codex, and LLM integrations inside real apps. I'm putting both into practice in IncidentHub.",
  ],
};

export const stats = [
  { value: "AWS", label: "Certified Cloud Practitioner" },
  { value: "Tier 2 → 3", label: "Moving to Tier-3 support at OpenText" },
  { value: "5+", label: "OpenText products supported (LRE, ALM, Octane…)" },
  { value: "AI", label: "Learning agentic AI and LLM integrations" },
];

// core: one of my strongest skills (highlighted).
// learning: something I'm actively learning right now (dashed, with a sprout).
export type Skill = { name: string; core?: boolean; learning?: boolean };
export const skillGroups: { icon: string; title: string; skills: Skill[] }[] = [
  {
    icon: "⚛️",
    title: "JavaScript & front end",
    skills: [
      { name: "JavaScript", core: true }, { name: "TypeScript", core: true }, { name: "React", core: true },
      { name: "Next.js", core: true }, { name: "Redux", core: true }, { name: "HTML/CSS", core: true },
      { name: "Responsive UI", core: true },
    ],
  },
  {
    icon: "🧩",
    title: "Backend",
    skills: [
      { name: "Node.js", core: true }, { name: "Express", core: true }, { name: "REST APIs", core: true },
      { name: "Microservices", core: true }, { name: "OAuth 2.0" }, { name: "Java" }, { name: "Object-oriented programming" },
    ],
  },
  {
    icon: "☁️",
    title: "AWS",
    skills: [
      { name: "AWS Cloud Practitioner", core: true }, { name: "ECS" }, { name: "ECR" }, { name: "S3" },
      { name: "DynamoDB" }, { name: "Cognito" },
    ],
  },
  {
    icon: "🚀",
    title: "Delivery & quality",
    skills: [
      { name: "Docker", core: true }, { name: "CI/CD", core: true }, { name: "GitHub Actions" }, { name: "Jest" },
      { name: "Jenkins" }, { name: "Git" },
    ],
  },
  {
    icon: "🗄️",
    title: "Databases",
    skills: [{ name: "SQL", core: true }, { name: "MongoDB" }, { name: "SQL Server" }, { name: "DynamoDB" }],
  },
  {
    icon: "🛠️",
    title: "Production support & tools",
    skills: [
      { name: "Root-cause analysis", core: true }, { name: "Log analysis", core: true }, { name: "Linux" },
      { name: "Bash" }, { name: "GitHub Copilot", core: true },
    ],
  },
];

// What I'm learning right now, shown in its own section.
export const learning = [
  {
    icon: "🤖",
    title: "Agentic AI for coding",
    summary: "Working with AI coding agents that read, plan, edit and test code, while I review every change.",
    items: ["Claude Code", "OpenAI Codex", "Agent workflows", "Prompting for code", "Reviewing AI-generated code"],
    applying: "I use them to build IncidentHub step by step and to understand each change.",
  },
  {
    icon: "🧠",
    title: "AI integrations",
    summary: "Calling LLMs from real applications: structured output, tool calling and keeping keys and costs under control.",
    items: ["LLM APIs (Claude, OpenAI)", "Spring AI", "Structured output (JSON)", "Tool calling", "MCP basics"],
    applying: "IncidentHub: AI triage that summarizes each ticket and suggests its priority.",
  },
  {
    icon: "☕",
    title: "Java & Spring Boot",
    summary: "Going from college Java to building a real REST API with a database, tests and security.",
    items: ["Spring Boot", "Spring Data JPA", "PostgreSQL", "JUnit", "Spring Security"],
    applying: "IncidentHub: the REST API, database, tests and security.",
  },
];

export type Filter = "backend" | "web" | "aws";
export const filters: { id: "all" | Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend" },
  { id: "web", label: "Full-stack" },
  { id: "aws", label: "AWS" },
];

export type Project = {
  title: string;
  status: "In progress" | "In use" | "Shipped";
  summary: string;
  bullets?: string[];
  stack: Skill[];
  tags: Filter[];
  featured?: boolean;
  links?: { href: string; label: string }[];
};

export const projects: Project[] = [
  {
    title: "IncidentHub — Java, Spring Boot & AI",
    status: "In progress",
    featured: true,
    summary:
      "My hands-on project to learn Java, Spring Boot and AI integrations: a REST API for support incidents with SLA tracking and AI-assisted triage, based on what I see every day in production support.",
    bullets: [
      "Built phase by phase, starting with a simple ticket API and adding one new skill at a time",
      "Goal: tickets with priority-based SLAs, breach detection and a status workflow on PostgreSQL",
      "AI triage: an LLM summarizes each new ticket and suggests its priority, with a human confirming",
      "Later phases: security with JWT, tests, Docker, CI/CD and AWS deployment",
    ],
    stack: [
      { name: "Java", learning: true }, { name: "Spring Boot", learning: true }, { name: "PostgreSQL", learning: true },
      { name: "Spring Data JPA", learning: true }, { name: "LLM API", learning: true }, { name: "JUnit", learning: true },
      { name: "Docker" }, { name: "AWS" },
    ],
    tags: ["backend", "aws"],
    links: [{ href: "#learning", label: "What I'm learning" }],
  },
  {
    title: "Enterprise Microservice Platform (Fragments)",
    status: "Shipped",
    summary: "Cloud REST microservice on AWS to store and convert text and image fragments, with a separate web UI.",
    bullets: [
      "Node.js/Express API with Cognito JWT auth; data in S3 and metadata in DynamoDB",
      "Converts between text, Markdown, HTML and image formats (sharp)",
      "CI: ESLint, Jest unit tests and Hurl integration tests against LocalStack and DynamoDB Local",
      "CD: GitHub Actions builds the Docker image, pushes it to ECR and deploys it to ECS",
    ],
    stack: [
      { name: "Node.js", core: true }, { name: "Express", core: true }, { name: "Cognito" }, { name: "S3" },
      { name: "DynamoDB" }, { name: "Docker", core: true }, { name: "ECR" }, { name: "ECS" }, { name: "Jest" },
      { name: "GitHub Actions" },
    ],
    tags: ["backend", "aws"],
    links: [
      { href: "https://github.com/jdcastel/Microservice-fragments-Cloud-Computing", label: "API code" },
      { href: "https://github.com/jdcastel/Microservice-fragments-UI", label: "UI code" },
    ],
  },
  {
    title: "Timer SaaS Team (Chrome extension)",
    status: "In use",
    summary:
      "Chrome extension for the OpenText SaaS team: after an agent saves a 15-minute break or 1-hour lunch in the Unified Tool, it counts down and sets the agent back to Available automatically.",
    bullets: [
      "Countdown, downloadable JSON logs, and timer recovery after a page refresh or Chrome restart",
      "Fixed a form reset that changed “15 minutes” to “30 minutes” after Save and blocked the automatic return",
      "Duplicate-write protection, read-only verification and a 30-second test mode",
    ],
    stack: [
      { name: "JavaScript", core: true }, { name: "Chrome Extensions (Manifest V3)" }, { name: "Service worker" },
      { name: "chrome.alarms / storage" }, { name: "HTML/CSS" },
    ],
    tags: ["web"],
    links: [{ href: "https://github.com/jdrcastel/Timer-SaaS-Team", label: "Code" }],
  },
  {
    title: "Chronicle App (Social Journal)",
    status: "Shipped",
    summary: "Full-stack, multi-tenant social journal for sharing travel experiences, joining community forums and organizing meetups.",
    bullets: [
      "React and Next.js front end with Redux for state management and a responsive UI",
      "Node.js and Express REST backend on MongoDB with user authentication",
      "Multi-tenant design with performance benchmarking",
    ],
    stack: [
      { name: "React", core: true }, { name: "Next.js" }, { name: "Redux" }, { name: "Node.js", core: true },
      { name: "Express", core: true }, { name: "MongoDB", core: true },
    ],
    tags: ["web", "backend"],
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
      "Troubleshoot authentication (SSO, OAuth 2.0), integration and performance incidents using Linux/Windows, SQL, Jenkins and system logs, and analyze ticket data to find root causes and recurring issues.",
      "Partner with Operations, Engineering and R&D in an SLA-driven environment to resolve complex escalations.",
      "Built Timer SaaS Team, a Chrome extension that returns agents to Available after breaks in the SaaS Unified Tool, with countdown, logs and timer recovery.",
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
      "Built an internal web page with React.",
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
  ["Java backend", "Java from college; learning Spring Boot now by building IncidentHub, with PostgreSQL, tests, Docker and AWS."],
  ["Full-stack", "React front ends (Ontario Government, Chronicle), Node.js/Express REST APIs (Fragments) and a Chrome extension used by my team (Timer SaaS Team)."],
  ["AWS", "AWS Certified Cloud Practitioner. Deployed a microservice on ECS with ECR, Cognito, S3 and DynamoDB."],
  ["Delivery & quality", "Docker images shipped to AWS through CI/CD; Jenkins daily at OpenText; this site deploys with GitHub Actions."],
  ["Databases", "SQL troubleshooting on SQL Server in production support; MongoDB and DynamoDB in projects."],
  ["Production experience", "Root-cause analysis on Linux and Windows with logs and SQL, moving from Tier-2 into Tier-3 escalations at OpenText. I know how real systems fail."],
  ["AI", "Use GitHub Copilot daily. Learning agentic AI (Claude Code, OpenAI Codex) and LLM integrations, applied in IncidentHub's AI triage."],
  ["Communication", "Lead remote sessions with technical and non-technical customers. Fully bilingual in English and Spanish."],
];
