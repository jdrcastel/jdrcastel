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
  hobbies: "soccer ⚽ · gym 🏋️ · video games 🎮",
};

export const stats = [
  { value: "AWS", label: "Certified Cloud Practitioner" },
  { value: "Tier 2 → 3", label: "Moving to Tier-3 support at OpenText" },
  { value: "5+", label: "OpenText products supported (LRE, ALM, Octane…)" },
  { value: "Java", label: "Building IncidentHub with Spring Boot" },
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
      { name: "Git" }, { name: "Linux" }, { name: "Bash" },
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
      { name: "LDAP" },
    ],
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
    title: "IncidentHub — Spring Boot incident & SLA API",
    status: "In progress",
    featured: true,
    summary:
      "A REST API to manage support incidents with SLA tracking, based on the problems I see every day in production support.",
    bullets: [
      "Tickets with priority-based SLAs, breach detection and a status workflow",
      "PostgreSQL with Spring Data JPA and Flyway migrations",
      "JWT security with roles, JUnit/Mockito/Testcontainers tests, Docker and GitHub Actions, deployed on AWS",
    ],
    stack: [
      { name: "Java", core: true }, { name: "Spring Boot", core: true }, { name: "PostgreSQL" }, { name: "Spring Security" },
      { name: "JUnit" }, { name: "Docker" }, { name: "GitHub Actions" }, { name: "AWS" },
    ],
    tags: ["backend", "aws"],
    links: [{ href: "#building", label: "See the build plan" }],
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
    summary: "Full-stack, multi-tenant social journal app with a Node.js and Express REST backend on MongoDB.",
    stack: [
      { name: "React", core: true }, { name: "Next.js" }, { name: "Redux" }, { name: "Node.js", core: true },
      { name: "Express" }, { name: "MongoDB" },
    ],
    tags: ["web", "backend"],
  },
  {
    title: "Ontario Government internal web page",
    status: "Shipped",
    summary: "Internal web page built with React during my internship, working with developers and designers.",
    stack: [{ name: "React", core: true }, { name: "JavaScript" }],
    tags: ["web"],
  },
];

// What I'm building right now, shown in the "Now building" section.
export const building = {
  name: "IncidentHub",
  pitch:
    "A Spring Boot REST API for support incidents with SLA tracking. It covers what Java job postings ask for most: REST, SQL with JPA, security, tests, Docker, CI/CD and AWS.",
  why: "I handle enterprise incidents every day at OpenText. This is the tool I would want: it knows each ticket's SLA and flags breaches before customers notice.",
  phases: [
    { title: "Core API", detail: "Ticket CRUD, validation, error handling, PostgreSQL with Spring Data JPA and Flyway", status: "in-progress" },
    { title: "Business rules", detail: "SLA per priority, breach detection, status workflow (open → in progress → resolved)", status: "planned" },
    { title: "Security", detail: "Spring Security with JWT and roles (agent, admin)", status: "planned" },
    { title: "Tests", detail: "JUnit 5, Mockito and Testcontainers", status: "planned" },
    { title: "Delivery", detail: "Docker, GitHub Actions CI/CD, OpenAPI docs", status: "planned" },
    { title: "AWS", detail: "Deploy to AWS (ECS or EC2) with RDS PostgreSQL", status: "planned" },
    { title: "React front end", detail: "Dashboard for agents to see tickets and SLA status", status: "planned" },
  ] as { title: string; detail: string; status: "done" | "in-progress" | "planned" }[],
};

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
  ["Java backend", "Java and Spring Boot for REST services. Building IncidentHub now: JPA, security, tests, Docker, CI/CD and AWS."],
  ["Full-stack", "React front ends (Ontario Government, Chronicle), Node.js/Express REST APIs (Fragments) and a Chrome extension used by my team (Timer SaaS Team)."],
  ["AWS", "AWS Certified Cloud Practitioner. Deployed a microservice on ECS with ECR, Cognito, S3 and DynamoDB."],
  ["Delivery & quality", "Docker images shipped to AWS through CI/CD; Jenkins daily at OpenText; this site deploys with GitHub Actions."],
  ["Databases", "SQL troubleshooting on SQL Server and PostgreSQL in production support; MongoDB and DynamoDB in projects."],
  ["Production experience", "Root-cause analysis on Linux and Windows with logs and SQL, moving from Tier-2 into Tier-3 escalations at OpenText. I know how real systems fail."],
  ["AI coding agents", "Use Claude Code, OpenAI Codex and GitHub Copilot daily to read, debug, review and generate code, and I verify every change with tests."],
  ["Communication", "Lead remote sessions with technical and non-technical customers. Fully bilingual in English and Spanish."],
];
