// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: "Juan David Rodríguez Castelblanco",
  short: "Juan Castelblanco",
  email: "jdrcastel@gmail.com",
  linkedin: "https://www.linkedin.com/in/jdcastel/",
  github: "https://github.com/jdrcastel",
  location: "Toronto, Ontario",
  status: "Open to Software Developer roles · Ontario",
  roles: ["Backend Java developer", "Spring Boot engineer", "AI integration builder", "Cloud-native developer"],
  pitch:
    "I build REST APIs and services with Java & Spring Boot, ship them in Docker/Kubernetes, and wire in AI features with Python & FastAPI. Today I support enterprise SaaS at OpenText — so I design for performance, multi-tenancy and the 3 a.m. incident from day one.",
  hobbies: "volleyball 🏐 · gym 🏋️ · video games 🎮",
};

export const stats = [
  { value: "Tier-2", label: "Enterprise SaaS support at OpenText" },
  { value: "5+", label: "OpenText products supported (LRE, ALM, Octane…)" },
  { value: "3", label: "Languages in production: Java · JS/TS · Python" },
  { value: "4.0", label: "GPA · Seneca Computer Programming & Analysis" },
];

// `core: true` highlights the skill as core for backend / Java roles.
type Skill = { name: string; core?: boolean };
export const skillGroups: { icon: string; title: string; skills: Skill[] }[] = [
  {
    icon: "☕",
    title: "Backend & APIs",
    skills: [
      { name: "Java 17/21", core: true }, { name: "Spring Boot", core: true }, { name: "REST APIs", core: true },
      { name: "Jakarta EE", core: true }, { name: "Spring Data JPA" }, { name: "Spring Security" },
      { name: "OpenAPI / Swagger" }, { name: "JUnit 5" }, { name: "Mockito" }, { name: "Node.js" },
      { name: "Express" }, { name: "C# / .NET Core" }, { name: "ASP.NET" }, { name: "C++" },
    ],
  },
  {
    icon: "🗄️",
    title: "Databases",
    skills: [
      { name: "PostgreSQL", core: true }, { name: "SQL Server", core: true }, { name: "Oracle", core: true },
      { name: "Flyway" }, { name: "Query tuning" }, { name: "Indexes & execution plans" }, { name: "MongoDB" }, { name: "Redis" },
    ],
  },
  {
    icon: "🤖",
    title: "AI integration",
    skills: [
      { name: "Python", core: true }, { name: "FastAPI", core: true }, { name: "GitHub Copilot", core: true },
      { name: "LLM APIs" }, { name: "RAG" }, { name: "Embeddings / pgvector" }, { name: "Tool calling" },
      { name: "Pydantic" }, { name: "Claude Code" },
    ],
  },
  {
    icon: "☁️",
    title: "Cloud & DevOps",
    skills: [
      { name: "Docker", core: true }, { name: "Kubernetes", core: true }, { name: "AWS", core: true },
      { name: "Google Cloud (GCP)" }, { name: "Azure" }, { name: "Helm" }, { name: "CI/CD" }, { name: "Jenkins" },
      { name: "GitHub Actions" }, { name: "Linux" }, { name: "Windows Server" },
    ],
  },
  {
    icon: "🔐",
    title: "Enterprise & security",
    skills: [
      { name: "Multi-tenant SaaS", core: true }, { name: "SAML SSO" }, { name: "OAuth 2.0 / OIDC" }, { name: "LDAP" },
      { name: "Performance testing" }, { name: "Log analysis" }, { name: "Root-cause analysis" },
    ],
  },
  {
    icon: "🧰",
    title: "Frontend & tooling",
    skills: [
      { name: "Git", core: true }, { name: "Maven", core: true }, { name: "Gradle", core: true }, { name: "React" },
      { name: "Next.js" }, { name: "TypeScript" }, { name: "Redux" }, { name: "Astro" }, { name: "Angular / Ionic" },
      { name: "Jira" }, { name: "Agile / Scrum" }, { name: "TDD" },
    ],
  },
];

export type Filter = "java" | "ai" | "cloud" | "web";
export const filters: { id: "all" | Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "java", label: "Java / Spring" },
  { id: "ai", label: "AI / Python" },
  { id: "cloud", label: "Cloud" },
  { id: "web", label: "Web / JS" },
];

export type Project = {
  title: string;
  status: "In progress" | "In use" | "Shipped";
  summary: string;
  bullets?: string[];
  stack: Skill[];
  tags: Filter[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "AssetVault — Multi-tenant Digital Asset Management API",
    status: "In progress",
    featured: true,
    summary:
      "A Spring Boot service for uploading, versioning, searching and serving media assets, with strict tenant isolation — the same class of problem as enterprise DAM platforms.",
    bullets: [
      "REST API (OpenAPI-documented) for assets, versions, collections and metadata",
      "Tenant isolation via schema-per-tenant on PostgreSQL + Spring Security (OAuth 2.0 / JWT)",
      "Binary storage on S3-compatible object storage; thumbnails generated asynchronously",
      "Flyway migrations, Testcontainers integration tests, k6 load tests for p95 latency",
      "Docker image + Helm chart, deployed to Kubernetes; CI on GitHub Actions",
    ],
    stack: [
      { name: "Java 21", core: true }, { name: "Spring Boot 3", core: true }, { name: "PostgreSQL", core: true },
      { name: "Spring Security" }, { name: "Flyway" }, { name: "Testcontainers" }, { name: "Gradle" },
      { name: "Docker", core: true }, { name: "Kubernetes", core: true }, { name: "AWS S3" },
    ],
    tags: ["java", "cloud"],
  },
  {
    title: "AutoTag AI service",
    status: "In progress",
    summary: "Python microservice that enriches AssetVault uploads with AI-generated tags, captions and semantic search.",
    bullets: [
      "FastAPI + Pydantic contracts consumed by the Java service",
      "LLM vision captioning and embeddings stored in pgvector",
      "Natural-language search: “red product shots from 2025”",
    ],
    stack: [{ name: "Python", core: true }, { name: "FastAPI", core: true }, { name: "LLM APIs" }, { name: "pgvector" }, { name: "Docker" }],
    tags: ["ai", "cloud"],
  },
  {
    title: "SaaS case tracker (Chrome extension)",
    status: "In use",
    summary: "Internal tool built for my OpenText SaaS support team to track case status and timing against SLAs.",
    bullets: ["Adopted by the team for day-to-day case tracking", "Turns a manual process into a glanceable dashboard"],
    stack: [{ name: "JavaScript" }, { name: "Chrome Extensions API" }, { name: "HTML/CSS" }],
    tags: ["web"],
  },
  {
    title: "Enterprise Microservice Platform (Fragments)",
    status: "Shipped",
    summary: "High-performance microservice platform with full CRUD REST endpoints and automated CI/CD pipelines.",
    bullets: [
      "Authenticated REST API that stores and converts text and image fragments",
      "Containerized on Linux and deployed on AWS through CI/CD",
    ],
    stack: [
      { name: "Node.js" }, { name: "Express" }, { name: "REST", core: true }, { name: "Linux" },
      { name: "Docker", core: true }, { name: "AWS", core: true }, { name: "CI/CD" },
    ],
    tags: ["cloud", "web"],
  },
  {
    title: "Chronicle App",
    status: "Shipped",
    summary: "Multi-tenant social journal with real-time state management and a clean, intuitive UI.",
    stack: [
      { name: "MongoDB" }, { name: "Express" }, { name: "React" }, { name: "Node.js" },
      { name: "Next.js" }, { name: "Redux" }, { name: "TypeScript" },
    ],
    tags: ["web"],
  },
  {
    title: "Ontario Government internal apps",
    status: "Shipped",
    summary: "Internal business applications and automated workflows that replaced manual processes.",
    stack: [{ name: "PowerApps" }, { name: "Power Automate" }, { name: "SQL" }],
    tags: ["web"],
  },
  {
    title: "Favorites App",
    status: "Shipped",
    summary: "Mobile app with a native favorites feature built on Capacitor.",
    stack: [{ name: "Ionic" }, { name: "Angular" }, { name: "Capacitor" }],
    tags: ["web"],
  },
];

export const experience = [
  {
    when: "Sep 2025 — Present · Waterloo, ON",
    role: "Technical Support Specialist",
    org: "OpenText",
    bullets: [
      "Production support for global enterprise customers on OpenText SaaS: LoadRunner Enterprise, QC/ALM, Octane/ValueEdge, Digital Lab and MF Connect.",
      "Investigate and reproduce incidents in authentication (SAML SSO, LDAP, OAuth 2.0), integrations, performance, installs, patching and configuration.",
      "Find root causes with Windows/Linux, SQL, Jenkins, WinSCP, system logs and environment data.",
      "Work with Operations, Network, L3, Engineering and R&D to escalate and resolve incidents under SLAs.",
      "Built an internal Chrome extension the SaaS team uses to track case status and timing.",
    ],
  },
  {
    when: "Sep 2022 — Apr 2023 · Toronto, ON",
    role: "Application Developer",
    org: "Ontario Government",
    bullets: [
      "Developed internal web applications with Microsoft PowerApps and Power Automate to streamline business processes.",
      "Collaborated with developers and designers to fix bugs, ship features and improve UX.",
      "Translated business needs into working low-code and full-stack solutions.",
    ],
  },
  {
    when: "2022 — 2023",
    role: "Technical Support Engineer (Volunteer)",
    org: "Hispanotech",
    bullets: ["Mentored junior engineers supporting Latin American STEM professionals in Canada."],
  },
  {
    when: "2021 — 2024",
    role: "Computer Programming & Analysis",
    org: "Seneca Polytechnic",
    bullets: [
      "President's Honour List (twice). Certifications: Fundamentals of Software Engineering, Advanced Algorithms (Array & String Patterns).",
    ],
  },
];

export const roleFit = [
  ["Java backend services & REST APIs", "Spring Boot 3 / Java 21 APIs (AssetVault), REST design with OpenAPI, Node/Express REST microservice in production on AWS."],
  ["Performance, scalability, stability", "Daily work on LoadRunner Enterprise performance issues; load tests with k6, p95 targets, async processing for heavy work."],
  ["Multi-tenant SaaS, cloud & on-prem", "Support OpenText SaaS and on-prem installs and patches; schema-per-tenant design in AssetVault."],
  ["Relational databases", "PostgreSQL, SQL Server and Oracle: troubleshooting queries in production, Flyway migrations."],
  ["Git + Gradle / Maven", "Git daily; Gradle for AssetVault, Maven for coursework and Spring projects."],
  ["Docker & Kubernetes on AWS / GCP / Azure", "Dockerized services deployed on AWS; Helm and Kubernetes for AssetVault."],
  ["Node.js", "Express microservices, React/Next.js apps, Chrome extension."],
  ["AI tools & AI integration, Python, FastAPI", "Daily use of GitHub Copilot and Claude Code to read, debug, review and generate code; FastAPI AutoTag service with LLMs and embeddings."],
  ["Troubleshooting with support & customers", "My current job: leading remote sessions, finding root causes, writing clear action plans for technical and non-technical customers."],
  ["Agile delivery & communication", "SLA-driven teamwork with Engineering and R&D; fully bilingual in English and Spanish."],
];

const T = "7f3c2a1e-tenant";
export const tenantId = T;
export const endpoints = [
  {
    verb: "GET", path: "/assets?page=0&size=2", desc: "Paginated, tenant-scoped asset listing with sorting.", status: "200 OK", ms: 38,
    req: null,
    res: {
      content: [
        { id: "a1b2", name: "spring-campaign-hero.png", mimeType: "image/png", sizeBytes: 2483120, version: 3, tags: ["product", "banner", "red"] },
        { id: "c3d4", name: "brand-guidelines.pdf", mimeType: "application/pdf", sizeBytes: 912004, version: 1, tags: ["brand"] },
      ],
      page: { number: 0, size: 2, totalElements: 1284, totalPages: 642 },
    },
  },
  {
    verb: "POST", path: "/assets", desc: "Multipart upload. Stores the binary, returns 201, and queues AI tagging asynchronously.", status: "201 Created", ms: 112,
    req: 'Content-Type: multipart/form-data\n\nfile=@product-shot.jpg\nmetadata={"collection":"fall-2026"}',
    res: {
      id: "e5f6", name: "product-shot.jpg", mimeType: "image/jpeg", version: 1, status: "PROCESSING",
      _links: { self: `/api/v1/tenants/${T}/assets/e5f6`, versions: `/api/v1/tenants/${T}/assets/e5f6/versions` },
    },
  },
  {
    verb: "GET", path: "/assets/search?q=red product shots", desc: "Semantic search via the FastAPI AutoTag service (pgvector embeddings).", status: "200 OK", ms: 64,
    req: null,
    res: {
      query: "red product shots",
      results: [
        { id: "a1b2", name: "spring-campaign-hero.png", score: 0.91, caption: "Red sneaker on white background" },
        { id: "e5f6", name: "product-shot.jpg", score: 0.87, caption: "Close-up of a red handbag" },
      ],
    },
  },
  {
    verb: "PATCH", path: "/assets/e5f6", desc: "Partial metadata update with optimistic locking (If-Match / ETag).", status: "200 OK", ms: 29,
    req: 'If-Match: "v1"\n\n' + JSON.stringify({ tags: ["handbag", "red", "fall-2026"] }, null, 2),
    res: { id: "e5f6", version: 2, tags: ["handbag", "red", "fall-2026"], updatedAt: "2026-10-20T14:02:11Z" },
  },
  {
    verb: "GET", path: "/assets/zz99", desc: "Errors use RFC 7807 Problem Details. Other tenants' assets are never visible.", status: "404 Not Found", ms: 12,
    req: null,
    res: {
      type: "https://assetvault.dev/problems/not-found", title: "Asset not found", status: 404,
      detail: "Asset 'zz99' does not exist in this tenant.", traceId: "4bf92f3577b34da6",
    },
  },
  {
    verb: "DELETE", path: "/assets/c3d4", desc: "Soft delete; binaries are purged by a scheduled retention job.", status: "204 No Content", ms: 21,
    req: null, res: null,
  },
];
