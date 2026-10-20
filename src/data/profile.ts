// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Juan David Rodríguez Castelblanco",
  short: "Juan Castelblanco",
  email: "jdrcastel@gmail.com",
  linkedin: "https://www.linkedin.com/in/jdcastel/",
  github: "https://github.com/jdrcastel",
  repo: "jdrcastel/jdrcastel",
  location: "Toronto, Canada",
  status: "Open to Full-stack, DevOps & Cloud roles",
  roles: ["MERN stack developer", "Java developer", "DevOps & AWS engineer", "AI integration builder"],
  pitch:
    "Full-stack developer working in the MERN stack and Java, with a DevOps and AWS focus. AWS Certified Cloud Practitioner, hands-on with CI/CD, Docker and Linux, and I build with AI every day: LLM integrations and AI-assisted development with GitHub Copilot and Claude Code. At OpenText I support enterprise SaaS customers and I'm moving from Tier 2 to Tier 3.",
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
    title: "MERN & JavaScript",
    skills: [
      { name: "MongoDB", core: true }, { name: "Express", core: true }, { name: "React", core: true },
      { name: "Node.js", core: true }, { name: "TypeScript", core: true }, { name: "REST APIs", core: true },
      { name: "Next.js" }, { name: "Redux" }, { name: "Astro" }, { name: "Vitest" },
    ],
  },
  {
    icon: "☕",
    title: "Java",
    skills: [
      { name: "Java", core: true }, { name: "OOP & data structures" }, { name: "JUnit" },
      { name: "Spring Boot", learning: true }, { name: "Maven", learning: true }, { name: "Jakarta EE", learning: true },
    ],
  },
  {
    icon: "⚙️",
    title: "DevOps & CI/CD",
    skills: [
      { name: "Docker", core: true }, { name: "GitHub Actions", core: true }, { name: "Jenkins", core: true },
      { name: "CI/CD pipelines", core: true }, { name: "Linux", core: true }, { name: "Git" }, { name: "Bash" },
      { name: "Kubernetes", learning: true }, { name: "Terraform", learning: true },
    ],
  },
  {
    icon: "☁️",
    title: "AWS & Cloud",
    skills: [
      { name: "AWS Cloud Practitioner", core: true }, { name: "EC2" }, { name: "S3" }, { name: "IAM" }, { name: "VPC" },
      { name: "CloudWatch", learning: true }, { name: "Lambda", learning: true }, { name: "Google Cloud" },
    ],
  },
  {
    icon: "🤖",
    title: "AI integrations",
    skills: [
      { name: "GitHub Copilot", core: true }, { name: "Claude Code", core: true }, { name: "Prompt engineering" },
      { name: "LLM APIs (OpenAI, Claude)" }, { name: "AI-assisted code review" }, { name: "RAG", learning: true },
      { name: "MCP", learning: true }, { name: "Python", learning: true }, { name: "FastAPI", learning: true },
    ],
  },
  {
    icon: "🔐",
    title: "Data & enterprise SaaS",
    skills: [
      { name: "SQL", core: true }, { name: "SQL Server" }, { name: "PostgreSQL" }, { name: "SAML SSO", core: true },
      { name: "OAuth 2.0" }, { name: "LDAP" }, { name: "Log analysis", core: true }, { name: "Root-cause analysis" },
      { name: "Power Apps" }, { name: "Power Automate" }, { name: "Jira" },
    ],
  },
];

export type Filter = "devops" | "backend" | "web" | "automation";
export const filters: { id: "all" | Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "devops", label: "DevOps & AWS" },
  { id: "backend", label: "Backend" },
  { id: "web", label: "Web" },
  { id: "automation", label: "Automation" },
];

export type Project = {
  title: string;
  status: "Live" | "In use" | "Shipped" | "Learning build";
  summary: string;
  bullets?: string[];
  stack: Skill[];
  tags: Filter[];
  featured?: boolean;
  link?: { href: string; label: string };
};

export const projects: Project[] = [
  {
    title: "This portfolio + DevOps toolbox",
    status: "Live",
    featured: true,
    summary:
      "The site you are on. Four browser-based tools (SSO token inspector, Dockerfile linter, AWS VPC planner, live CI/CD feed) shipped through a tested pipeline.",
    bullets: [
      "Tool logic is plain TypeScript modules, separate from the UI, covered by Vitest unit tests",
      "GitHub Actions pipeline: npm ci → astro check → vitest → build → deploy to GitHub Pages",
      "A failing test blocks the deploy, so a broken tool never reaches production",
      "Static site: no server to patch, zero hosting cost, fast everywhere",
    ],
    stack: [
      { name: "GitHub Actions", core: true }, { name: "TypeScript", core: true }, { name: "Vitest" }, { name: "Astro" },
      { name: "GitHub Pages" }, { name: "Terraform (generated)" },
    ],
    tags: ["devops", "web"],
    link: { href: "#toolbox", label: "Try the tools" },
  },
  {
    title: "Enterprise Microservice Platform (Fragments)",
    status: "Shipped",
    summary: "Cloud-hosted microservice with full CRUD REST endpoints and an automated CI/CD pipeline.",
    bullets: [
      "Authenticated REST API that stores and converts text and image fragments",
      "Containerized with Docker on Linux and deployed on AWS through CI/CD",
    ],
    stack: [
      { name: "Node.js" }, { name: "Express" }, { name: "REST", core: true }, { name: "Docker", core: true },
      { name: "AWS", core: true }, { name: "CI/CD" }, { name: "Linux" },
    ],
    tags: ["devops", "backend"],
  },
  {
    title: "SaaS case tracker (Chrome extension)",
    status: "In use",
    summary: "Internal tool I built for my OpenText SaaS support team to track case status and timing against SLAs.",
    bullets: ["Adopted by the team for day-to-day case tracking", "Turns a manual process into a glanceable dashboard"],
    stack: [{ name: "JavaScript" }, { name: "Chrome Extensions API" }, { name: "HTML/CSS" }],
    tags: ["automation", "web"],
  },
  {
    title: "Ontario Government internal apps",
    status: "Shipped",
    summary: "Internal business apps and automated workflows that streamlined business processes.",
    stack: [{ name: "Power Apps", core: true }, { name: "Power Automate", core: true }],
    tags: ["automation"],
  },
  {
    title: "Chronicle App",
    status: "Shipped",
    summary: "Multi-tenant social journal with real-time state management and a clean, intuitive UI.",
    stack: [
      { name: "MongoDB" }, { name: "Express" }, { name: "React" }, { name: "Node.js" },
      { name: "Next.js" }, { name: "Redux" }, { name: "TypeScript" },
    ],
    tags: ["web", "backend"],
  },
  {
    title: "AssetVault — Spring Boot API on Kubernetes",
    status: "Learning build",
    summary: "What I'm building now to learn Java/Spring Boot and Kubernetes end to end.",
    bullets: [
      "Goal: REST API for file assets with Spring Boot 3 and PostgreSQL",
      "Goal: multi-stage Docker image, deployed to Kubernetes with health probes",
      "Goal: GitHub Actions pipeline with tests, image build and AWS deploy",
    ],
    stack: [
      { name: "Java", learning: true }, { name: "Spring Boot", learning: true }, { name: "PostgreSQL" },
      { name: "Docker" }, { name: "Kubernetes", learning: true }, { name: "AWS" },
    ],
    tags: ["backend", "devops"],
  },
];

export type ExperienceItem = {
  kind: "Work" | "Certification" | "Volunteer" | "Education";
  when: string;
  role: string;
  org: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  {
    kind: "Work",
    when: "Sep 2025 — Present · Waterloo, ON",
    role: "Technical Support Specialist (Tier 2 → Tier 3)",
    org: "OpenText",
    bullets: [
      "Moving from Tier-2 to Tier-3 support, taking on deeper technical escalations.",
      "Production support for global enterprise customers on OpenText SaaS: LoadRunner Enterprise, QC/ALM, Octane/ValueEdge, Digital Lab and MF Connect.",
      "Investigate and reproduce incidents in authentication (SAML SSO, LDAP, OAuth 2.0), integrations, performance, installs, patching and configuration.",
      "Find root causes with Windows/Linux, SQL, Jenkins, WinSCP, system logs and environment data.",
      "Work with Operations, Network, L3, Engineering and R&D to escalate and resolve incidents under SLAs.",
      "Built an internal Chrome extension the SaaS team uses to track case status and timing.",
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
    kind: "Work",
    when: "Sep 2022 — Apr 2023 · Toronto, ON",
    role: "Application Developer",
    org: "Ontario Government",
    bullets: [
      "Built internal business apps with Microsoft Power Apps and automated workflows with Power Automate.",
      "Collaborated with developers and designers to fix bugs, ship features and improve UX.",
      "Turned business requirements into working low-code solutions used across internal teams.",
    ],
  },
  {
    kind: "Volunteer",
    when: "2022 — 2023",
    role: "Technical Support Engineer",
    org: "Hispanotech",
    bullets: ["Mentored junior engineers supporting Latin American STEM professionals in Canada."],
  },
  {
    kind: "Education",
    when: "2021 — 2024",
    role: "Advanced Diploma, Computer Programming & Analysis",
    org: "Seneca Polytechnic",
    bullets: [
      "President's Honour List (twice). Certifications: Fundamentals of Software Engineering, Advanced Algorithms (Array & String Patterns).",
    ],
  },
];

export const roleFit = [
  ["CI/CD & automation", "This site ships through a GitHub Actions pipeline I wrote (check → test → build → deploy). I work with Jenkins daily at OpenText."],
  ["Containers", "Dockerized and deployed the Fragments microservice. The Dockerfile linter above encodes the practices I follow. Learning Kubernetes now."],
  ["AWS", "AWS Certified Cloud Practitioner. Deployed Fragments on AWS. The VPC planner shows how I think about subnets, AZs and Terraform."],
  ["Linux & troubleshooting", "Daily root-cause analysis on Windows and Linux with logs, SQL and environment data for enterprise customers."],
  ["Identity & security", "Resolve SAML SSO, OAuth 2.0 and LDAP incidents for enterprise customers. The SSO inspector is the tool I wanted for that job."],
  ["Full-stack (MERN + Java)", "REST APIs with Node.js/Express and MongoDB, React front ends, and Java. Learning Spring Boot through the AssetVault build."],
  ["Databases", "SQL troubleshooting on SQL Server and PostgreSQL in production support; MongoDB in Chronicle."],
  ["Testing & quality", "Unit tests gate every deploy of this site. Comfortable with TDD."],
  ["AI integrations", "Use GitHub Copilot and Claude Code daily to read, debug, review and generate code. Integrating LLM APIs into apps; learning RAG and MCP."],
  ["Communication", "Lead remote sessions with technical and non-technical customers. Fully bilingual in English and Spanish."],
];
