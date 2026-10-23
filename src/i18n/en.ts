// English content. es.ts must keep exactly the same shape.

export type ProjectStatus = "progress" | "use" | "shipped";
export type RoadmapStatus = "done" | "inProgress" | "planned";
export type ExperienceKind = "work" | "certification" | "internship" | "volunteer" | "education";

const en = {
  lang: "en",
  meta: {
    title: "Juan Castelblanco · Software Developer",
    description:
      "Juan David Rodríguez Castelblanco: software developer strong in JavaScript and React, with Node.js experience on AWS. Building Casshy, a gamified personal-finance app.",
  },
  nav: {
    about: "About",
    casshy: "Casshy",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    resume: "Resume",
    menu: "Open menu",
    theme: "Toggle dark mode",
    language: "Leer en español",
    mainLabel: "Main",
    mobileLabel: "Mobile menu",
    skip: "Skip to content",
  },
  hero: {
    status: "Open to Software Developer roles",
    hello: "Hi, I'm Juan.",
    role: "Software developer",
    tagline:
      "JavaScript & React developer who built a Node.js microservice on AWS. Now building Casshy, a gamified personal-finance app, with AI coding agents.",
    ctaProjects: "See projects",
    ctaResume: "Resume (PDF)",
    payload: {
      name: "Juan Castelblanco",
      role: "Software Developer",
      job: "Technical Support Specialist @ OpenText",
      location: "Ontario, Canada",
      languages: ["Spanish", "English"],
      education: "Seneca Polytechnic",
      aws: "Certified Cloud Practitioner",
      strengths: ["JavaScript", "React", "Node.js"],
      building: ["Casshy", "IncidentHub"],
      learning: ["AI agents", "LLM integrations", "Spring Boot"],
      openToWork: true,
    },
    stats: [
      { value: "AWS", label: "Certified Cloud Practitioner" },
      { value: "Tier 2 → 3", label: "Moving to Tier-3 support at OpenText" },
      { value: "Casshy", label: "Building a gamified personal-finance app" },
      { value: "AI", label: "Learning agentic AI and LLM integrations" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "Front-end strength, production experience",
    paragraphs: [
      "I'm a software developer with strong JavaScript and front-end skills: React, Next.js, TypeScript and Redux. On the backend I built a Node.js microservice on AWS with Cognito, S3, DynamoDB, Docker and a CI/CD pipeline to ECS.",
      "At OpenText I support enterprise SaaS customers in production and I'm moving from Tier 2 into Tier 3, so I know how real systems fail and how to fix them. I also built a web extension my team uses every day.",
      "Right now I'm building Casshy, a gamified personal-finance app for Canada, and IncidentHub to learn Java, Spring Boot and LLM integrations, working with AI coding agents like Claude Code and OpenAI Codex.",
    ],
  },
  casshy: {
    eyebrow: "Featured project",
    status: "Phase 1 · in progress",
    tagline: "Personal finance you actually want to take care of.",
    summary:
      "A personal-finance web app in the spirit of Monarch (accounts, transactions, budgets, goals and investments) whose hero is Casshy: a living cartoon coin, like Pou or Talking Tom, that you look after with good money habits.",
    dashboard: {
      window: "Casshy · Overview",
      sample: "Sample data · design preview",
      greeting: "Good morning, Juan",
      subtitle: "Let's make room for your future.",
      mood: "Casshy is happy",
      toneLabel: "Casshy's tone",
      tones: {
        gentle: { label: "Gentle", message: "You're doing great. Maybe cook at home one more night this week?" },
        honest: { label: "Honest", message: "You're on track this month. Keep dining out under $120 this week." },
        savage: { label: "Savage", message: "Third takeout this week? Your budget noticed. So did I." },
      },
      stats: { budget: "Monthly budget", spent: "Spent so far", left: "Left to spend" },
      spendingTitle: "Where your money goes",
      spendingPeriod: "This month",
      categories: [
        { name: "Housing", pct: 38 },
        { name: "Groceries", pct: 24 },
        { name: "Transport", pct: 16 },
        { name: "Dining", pct: 12 },
      ],
      checklistTitle: "Your first 90 days in Canada",
      checklist: [
        { label: "Open a bank account", done: true },
        { label: "Get your SIN", done: true },
        { label: "Set up CRA My Account", done: false },
        { label: "Build your credit, step by step", done: false },
      ],
      progressLabel: "steps done",
    },
    features: [
      { icon: "🏦", title: "Money in one place", text: "Accounts, transactions, budgets, goals and investments." },
      { icon: "🪙", title: "A coin that's alive", text: "Casshy will react to your habits, animated with Rive." },
      { icon: "🎓", title: "Casshy Academy", text: "Short money lessons. Casshy educates and never gives investment advice." },
      { icon: "⚖️", title: "Fair XP", text: "Earned through habits and learning, never by having more money." },
      { icon: "🍁", title: "Made for Canada", text: "Starts in Ontario, in English, Spanish and French, for users 14+." },
      { icon: "🔒", title: "Private & accessible", text: "Privacy by design and WCAG AA accessibility from day one." },
    ],
    principlesTitle: "Engineering principles",
    principles: [
      "Pure domain logic in its own packages, separate from frameworks",
      "Money stored as integers in minor units, never floats",
      "Canadian tax rules versioned, each with its source",
      "Architecture decisions recorded as ADRs",
    ],
    archTitle: "Architecture",
    stack: [
      ["Monorepo", "Turborepo · pnpm · strict TypeScript"],
      ["Web", "Next.js · Tailwind · shadcn/ui · Rive"],
      ["API", "NestJS · Zod · Better Auth"],
      ["Data", "PostgreSQL 18 · Prisma 7"],
      ["Infra", "Docker for development · k3s homelab for production"],
      ["Mobile", "Expo, after the web app"],
    ],
    roadmapTitle: "Roadmap",
    roadmap: [
      { title: "Phase 0 · Vision, docs & ADRs", status: "done" },
      { title: "Phase 1 · Robust foundation & landing page", status: "inProgress" },
      { title: "Next · Web app: finance, Casshy & Academy", status: "planned" },
      { title: "Last · Mobile app with Expo", status: "planned" },
    ] satisfies { title: string; status: RoadmapStatus }[],
    states: { done: "Done", inProgress: "In progress", planned: "Planned" },
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work",
    lead: "What I'm building now, plus full-stack, backend and AWS work I've shipped.",
    filters: { all: "All", backend: "Backend", web: "Web", aws: "AWS" },
    status: { progress: "In progress", use: "In use", shipped: "Shipped" },
    learnMore: "Learn more",
    stackLabel: "Tech stack",
    links: { casshy: "See Casshy", learning: "What I'm learning", api: "API code", ui: "UI code", code: "Code" },
    extensionsTitle: "Web extensions",
    items: [
      {
        id: "casshy",
        status: "progress" as ProjectStatus,
        title: "Casshy — gamified personal finance",
        summary:
          "A personal-finance web app for Canada where you take care of Casshy, a living cartoon coin, with good money habits. Designed end to end: vision, ADRs, domain rules and a TypeScript monorepo.",
        bullets: [
          "Accounts, transactions, budgets, goals and investments, plus the Casshy Academy for money lessons",
          "Fair XP from habits and learning evolves the coin: planchet → bronze → silver → gold → diamond → alexandrite",
          "Money as integers, versioned Canadian tax rules, pure domain packages, privacy and WCAG AA",
        ],
      },
      {
        id: "incidenthub",
        status: "progress" as ProjectStatus,
        title: "IncidentHub — Java, Spring Boot & AI",
        summary:
          "My hands-on project to learn Java, Spring Boot and AI integrations: a REST API for support incidents with SLA tracking and AI-assisted triage.",
        bullets: [
          "Built phase by phase, starting with a simple ticket API and adding one new skill at a time",
          "Tickets with priority-based SLAs, breach detection and a status workflow on PostgreSQL",
          "AI triage: an LLM summarizes each new ticket and suggests its priority, with a human confirming",
          "Later phases: security with JWT, tests, Docker, CI/CD and AWS deployment",
        ],
      },
      {
        id: "fragments",
        status: "shipped" as ProjectStatus,
        title: "Enterprise Microservice Platform (Fragments)",
        summary: "Cloud REST microservice on AWS to store and convert text and image fragments, with a separate web UI.",
        bullets: [
          "Node.js/Express API with Cognito JWT auth; data in S3 and metadata in DynamoDB",
          "Converts between text, Markdown, HTML and image formats (sharp)",
          "CI: ESLint, Jest unit tests and Hurl integration tests against LocalStack and DynamoDB Local",
          "CD: GitHub Actions builds the Docker image, pushes it to ECR and deploys it to ECS",
        ],
      },
      {
        id: "timer",
        status: "use" as ProjectStatus,
        title: "Timer SaaS Team",
        summary:
          "Web extension for the OpenText SaaS team: after an agent saves a 15-minute break or 1-hour lunch in the Unified Tool, it counts down and sets the agent back to Available automatically.",
        bullets: [
          "Countdown, downloadable JSON logs, and timer recovery after a page refresh or browser restart",
          "Fixed a form reset that changed “15 minutes” to “30 minutes” after Save and blocked the automatic return",
          "Duplicate-write protection, read-only verification and a 30-second test mode",
        ],
      },
    ],
  },
  skills: {
    eyebrow: "Skills",
    title: "What I use, and what I'm learning",
    lead: "Highlighted means I've built with it and know it well. Learning is kept separate on purpose: I'm applying it, not claiming to master it yet.",
    tabSkills: "Skills",
    tabLearning: "Learning now",
    legendCore: "Built with it",
    legendUsed: "Hands-on",
    groups: {
      frontend: "JavaScript & front end",
      backend: "Backend",
      aws: "AWS",
      delivery: "Delivery & quality",
      data: "Databases",
      support: "Production support & tools",
    },
    applyingLabel: "Applying it in",
    learning: {
      agentic: {
        title: "Agentic AI for coding",
        summary: "Working with AI coding agents that read, plan, edit and test code, while I review every change.",
        applying: "Casshy: I plan with ADRs and build with agents, reviewing each diff.",
      },
      integrations: {
        title: "AI integrations",
        summary: "Calling LLMs from real apps: structured output, tool calling, and keeping keys and costs under control.",
        applying: "IncidentHub: AI triage that summarizes each ticket and suggests its priority.",
      },
      casshy: {
        title: "Casshy's stack",
        summary: "The tools I chose for Casshy and am learning in depth as I build it.",
        applying: "Casshy Phase 1: monorepo foundation, API, database and landing page.",
      },
      java: {
        title: "Java & Spring Boot",
        summary: "Going from college Java to REST APIs with a database, tests and security.",
        applying: "IncidentHub: the REST API, database, tests and security.",
      },
    },
  },
  experience: {
    eyebrow: "Experience",
    title: "Experience & education",
    lead: "Support work taught me how enterprise systems fail. Development work is where I fix that for good.",
    more: "More details",
    kinds: { work: "Work", certification: "Certification", internship: "Internship", volunteer: "Volunteer", education: "Education" },
    items: [
      {
        kind: "work" as ExperienceKind,
        when: "Sep 2025 — Present · Waterloo, ON",
        role: "Technical Support Specialist",
        org: "OpenText",
        bullets: [
          "Production support for global enterprise customers on OpenText SaaS (LoadRunner Enterprise, ALM/QC, Octane/ValueEdge), moving from Tier-2 into Tier-3 escalations.",
          "Troubleshoot authentication (SSO, OAuth 2.0), integration and performance incidents using Linux/Windows, SQL, Jenkins and system logs, and analyze ticket data to find root causes and recurring issues.",
          "Partner with Operations, Engineering and R&D in an SLA-driven environment to resolve complex escalations.",
          "Built Timer SaaS Team, a web extension that returns agents to Available after breaks, with countdown, logs and timer recovery.",
        ],
      },
      {
        kind: "certification" as ExperienceKind,
        when: "Amazon Web Services",
        role: "AWS Certified Cloud Practitioner",
        org: "AWS",
        bullets: ["Core AWS services, global infrastructure, security and the shared responsibility model, pricing and support."],
      },
      {
        kind: "internship" as ExperienceKind,
        when: "Sep 2022 — Apr 2023 · Toronto, ON",
        role: "Application Developer",
        org: "Government of Ontario",
        bullets: [
          "Built an internal web page with React.",
          "Worked with developers and designers on that page to fix bugs, add features and improve the user experience.",
        ],
      },
      {
        kind: "volunteer" as ExperienceKind,
        when: "2022 — 2023",
        role: "Technical Support Engineer",
        org: "Hispanotech",
        bullets: ["Organized technical workshops and networking sessions for Latin American tech professionals in Canada."],
      },
      {
        kind: "education" as ExperienceKind,
        when: "Jan 2021 — Jan 2024 · Toronto, ON",
        role: "Computer Programming and Analysis (Advanced Diploma)",
        org: "Seneca Polytechnic",
        bullets: [
          "Relevant coursework: Java, Object-Oriented Programming, Cloud Infrastructure, Database Systems, Data Structures.",
          "President's Honour List, Summer and Fall 2023.",
          "Platzi certificates: Advanced Algorithms, REST API with JavaScript, Object-Oriented Programming.",
        ],
      },
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build something",
    highlight: "reliable.",
    lead: "I'm looking for Software Developer roles: front end, full-stack or backend. The fastest way to reach me is email.",
    email: "Email me",
    offClock: "Off the clock: soccer ⚽ · gym 🏋️ · video games 🎮",
    footer: "Built with Astro, React and shadcn/ui",
  },
};

export default en;
export type Content = typeof en;
