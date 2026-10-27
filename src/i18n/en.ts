// All site text (the site is English only).

export type ProjectStatus = "progress" | "use" | "shipped";
export type RoadmapStatus = "done" | "inProgress" | "planned";
export type ExperienceKind = "work" | "certification" | "internship" | "volunteer" | "education";

const en = {
  meta: {
    title: "Juan Castelblanco · Software Developer",
    description:
      "Juan David Rodriguez Castelblanco: software developer strong in JavaScript and React, with Node.js experience on AWS. Building Casshy, a gamified personal-finance app.",
  },
  nav: {
    about: "About",
    projects: "Projects",
    skills: "Skills",
    experience: "Experience",
    contact: "Contact",
    resume: "Resume",
    menu: "Open menu",
    theme: "Toggle dark mode",
    mainLabel: "Main",
    mobileLabel: "Mobile menu",
    skip: "Skip to content",
  },
  hero: {
    status: "Open to Software Developer roles",
    hello: "Hi, I'm Juan.",
    role: "Software developer",
    ctaProjects: "See projects",
    techLabel: "Technologies I work with",
    pauseMotion: "Pause animations",
    stats: [
      { value: "AWS", label: "Certified Cloud Practitioner" },
      { value: "Tier 2 → 3", label: "Moving to Tier-3 support at OpenText" },
      { value: "Casshy", label: "Building a gamified personal-finance app" },
      { value: "AI", label: "Learning agentic AI and LLM integrations" },
    ],
  },
  about: {
    eyebrow: "About",
    title: "A bit about me",
    paragraphs: [
      "I'm a software developer who likes building real products that ship and solve real problems. I work across the stack, from React and Next.js front ends to Node.js services on AWS, and I bring AI into what I build: LLM integrations and multi-agent workflows with tools like Claude Code and Codex. Right now that's Casshy, my own personal-finance app.",
      "I started coding at 17. Today I work in production support at OpenText, moving into Tier 3, so I know how real systems fail and how to fix them.",
      "Outside of tech, you'll find me playing soccer, at the gym, playing drums or gaming with friends.",
    ],
  },
  projects: {
    eyebrow: "Projects",
    title: "Selected work",
    lead: "What I'm building now, plus full-stack, backend and AWS work I've shipped.",
    filters: { all: "All", backend: "Backend", web: "Web", aws: "AWS", extensions: "Extensions" },
    status: { progress: "In progress", use: "In use", shipped: "Shipped" },
    learnMore: "Learn more",
    stackLabel: "Tech stack",
    // The featured project (Casshy) shows everything open instead of "Learn more"
    featured: {
      featuresTitle: "What it does",
      roadmapTitle: "Roadmap",
      states: { done: "Done", inProgress: "In progress", planned: "Planned" },
      roadmap: [
        { title: "Phase 0 · Vision, docs & ADRs", status: "done" },
        { title: "Phase 1 · Robust foundation & landing page", status: "inProgress" },
        { title: "Next · Web app: finance, Casshy & Academy", status: "planned" },
        { title: "Last · Mobile app with Expo", status: "planned" },
      ] satisfies { title: string; status: RoadmapStatus }[],
    },
    diagram: {
      alt: "Fragments architecture: the web UI calls the Express API, which runs in Docker on Amazon ECS, checks Cognito tokens (JWT), stores fragment data in S3 and metadata in DynamoDB.",
      ui: "Web UI",
      api: "Express API",
    },
    links: { learning: "What I'm learning", api: "API code", ui: "UI code", code: "Code" },
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
          "Built with Claude Code (CLI): ADR-driven plans, custom skills and sub-agents, and a review of every diff",
        ],
      },
      {
        id: "incidenthub",
        status: "progress" as ProjectStatus,
        title: "IncidentHub",
        summary:
          "My hands-on project to go deeper into backend TypeScript and AI integrations: a NestJS REST API for support incidents with SLA tracking and AI-assisted triage.",
        bullets: [
          "Built phase by phase, starting with a simple ticket API and adding one new skill at a time",
          "Tickets with priority-based SLAs, breach detection and a status workflow on PostgreSQL with Prisma",
          "AI triage: an LLM summarizes each new ticket and suggests its priority, with a human confirming",
          "Later phases: JWT security, tests, CI/CD and AWS deployment",
        ],
      },
      {
        id: "fragments",
        status: "shipped" as ProjectStatus,
        title: "Fragments — Cloud REST API on AWS",
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
    lead: "Highlighted means I've built with it and know it well. Learning is kept separate on purpose: these are skills in progress, not ones I claim to master yet.",
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
        applying: "IncidentHub: adding AI triage that summarizes each ticket and suggests its priority.",
      },
      casshy: {
        title: "Casshy's stack",
        summary: "The tools I chose for Casshy and am learning in depth as I build it.",
        applying: "Casshy Phase 1 (monorepo, API, database, landing page) and the IncidentHub NestJS API.",
      },
      java: {
        title: "Java & Spring Boot",
        summary: "Going from college Java to REST APIs with a database and tests.",
        // No project uses Java right now (IncidentHub moved to TypeScript), so nothing is shown
        applying: "",
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
    offClock: "Off the clock: soccer ⚽ · gym 🏋️ · drums 🥁 · video games 🎮",
    footer: "Built with Astro, React, shadcn/ui and Motion",
  },
};

export default en;
export type Content = typeof en;
