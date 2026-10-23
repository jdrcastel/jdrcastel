# Juan Castelblanco · Portfolio

Single-page portfolio in English, published at https://jdrcastel.github.io/jdrcastel/.
This repo is also Juan's GitHub profile repo: `README.md` is his profile page, not project docs.

## Rules from Juan (always follow)

1. **Announce before changing.** Before any edit, say what you will change and why. Ask when a decision is his
   (design direction, content, removing things). Always share questions and suggestions so work keeps moving.
2. **Resume only when asked.** Edit the resume (Word + PDF) only when Juan asks, with the `update-resume` skill. It is
   English only and must match the portfolio content. The PDF goes to `public/`; the Word file is sent to Juan in chat.
3. **English only.** All text lives in `src/i18n/en.ts` (Juan removed the Spanish version). Talk to Juan in Spanish.
4. **Latest stable versions.** Check `npm view <pkg> version` before adding or upgrading anything.
5. **Minimal and professional.** A recruiter has ~60 seconds: clear hierarchy, no visual noise, fast. Animations only
   where they add meaning (see "Animations" below). Propose new animations and wait for his
   approval before building them.
6. **Honest content.** Never claim skills, features or results that aren't real. See "Content truth" below.
7. **Keep it essential.** No test suites or extra CI for this site (Juan's decision). Verify by building and checking
   the page in a browser.
8. **Work through PRs.** Develop on a branch, open a PR, Juan merges. Deploy runs on push to `main`.
9. Save Juan's new preferences and decisions in this file (section "Decision log").

## Stack

- Astro 7 (static output, one page)
- React 19 islands only where there is interaction (`client:visible`): projects (filters, "Learn more", Fragments
  diagram) and skills/learning tabs. Experience "More details" is a native `<details>` (no JS).
- Animation libraries: **Motion** (`motion/react`, React islands only, `LazyMotion` + `m` with `domMax` loaded on
  demand from `src/lib/motion-features.ts`), **Lenis** (smooth scroll, `Layout.astro`), **simple-icons** (build time
  only: logos become one cached sprite at `/tech-icons.svg`). Magic UI patterns are adapted by hand (see below).
- Tailwind CSS v4 + shadcn/ui (new-york style, neutral base, blue `brand` accent) in `src/components/ui/`
- Fonts: Geist and Geist Mono through the Astro Fonts API with the local provider, from the
  `@fontsource-variable/geist*` npm packages (self-hosted, no external requests; works in the sandbox and CI)
- Deploy: GitHub Actions → GitHub Pages (`.github/workflows/deploy.yml`), `BASE_PATH=/jdrcastel`
- Node ≥ 22.23.4 (Astro 7.4 requirement). CI uses the latest LTS.

## Commands

```bash
npm install
npm run dev                                                         # http://localhost:4321
SITE=https://jdrcastel.github.io BASE_PATH=/jdrcastel npm run build # same build as production
npm run preview
```

## Structure

```
src/
  i18n/en.ts          All text (English).
  i18n/shared.ts      Language-neutral data: links, tech chips, project metadata.
  i18n/index.ts       t (the content), homeUrl(), assetUrl(file) (base-path aware).
  components/         Page.astro composes: Nav, Hero, About, Projects, Skills, Experience, Contact, Footer.
                      Hero includes TechMarquee.astro; ProjectsGrid.tsx includes ArchitectureDiagram.tsx (Fragments).
  lib/tech.ts         Marquee technologies (simple-icons). Never import it from a React island.
  pages/tech-icons.svg.ts  Builds the logo sprite.
  components/ui/      shadcn/ui components (copied from the registry; don't hand-edit unless needed).
  layouts/Layout.astro  <head>: canonical, Open Graph, theme bootstrap, Lenis.
  pages/index.astro
public/               favicon.svg, og.png (1200×630 preview), resume PDF
```

## Code conventions

- Static by default. Use a React island only for real interaction; pass islands only the props they need.
- Use shadcn components and `buttonVariants()` for links styled as buttons. Use `cn()` from `@/lib/utils`.
- Tailwind tokens (`bg-background`, `text-muted-foreground`, `text-brand`…); no hard-coded colors except the
  code window dots.
- Accessibility (WCAG AA): semantic landmarks, labelled sections, `aria-pressed`/`aria-expanded` on toggles,
  visible focus, `prefers-reduced-motion` respected, external links `rel="noopener"`.
- All URLs to pages/assets go through `homeUrl()` / `assetUrl()` so the `/jdrcastel` base path works.

## Animations (approved by Juan; propose new ones and wait for his OK)

Principles: off with `prefers-reduced-motion` (static fallbacks), looping animations stop with the pause button in the
marquee (`html[data-motion="paused"]`, saved in localStorage), loops animate only `transform`/`opacity` or pause when
off screen, and nothing delays reading for more than ~1 s. Keep `animation-timeline` in its own CSS rule: the minifier
folds it into the `animation` shorthand otherwise and browsers drop it.

- **Hero entrance:** heading words come into focus (`.hero-word`), the rest fades up (`.hero-in`, `--d` delays).
- **Tech marquee:** two rows of logos (only "Strong" technologies) in opposite directions, centered to the content
  width under the hero stats; pause on hover/focus; gray → brand color on hover; static and wrapped for reduced motion.
- **Header progress line:** CSS scroll timeline, JS fallback in `Nav.astro`.
- **Section titles:** slide up from a mask when the header reveals (`.title-mask` in `Section.astro`).
- **About:** words light up line by line as you scroll (`.read-word`, CSS view timelines; static where unsupported).
- **Projects:** filter pill slides between filters (Motion `layoutId`), cards fade/reflow (`AnimatePresence`,
  `layout="position"`), border beam on the featured Casshy card, Fragments architecture diagram with light pulses
  (pulses pause off screen), mouse spotlight on cards.
- **Experience timeline:** line fills and dots light up with scroll.
- **Theme switch:** circle reveal from the toggle (View Transitions).
- **Logo:** "Juan Castelblanco" turns brand blue on hover.
- **Smooth scroll:** Lenis runs its frame loop only while gliding; in-page links keep the URL and focus in sync.
- Also: reveal on scroll (`[data-reveal]`) and card lift (`.lift`).

## shadcn/ui in the cloud sandbox

`ui.shadcn.com` is blocked by the sandbox proxy, so `npx shadcn add` fails there. Use the `add-shadcn-component`
skill: copy the component from the `shadcn-ui/ui` GitHub repo (`apps/v4/registry/new-york-v4/ui/`) and change
`from "cn"` to `from "@/lib/utils"`. On Juan's machine, `npx shadcn add <name>` works with `components.json`.
Magic UI (`magicui.design`) is blocked too: read components from GitHub (`magicuidesign/magicui`,
`apps/www/registry/magicui/`), adapt them and credit them in a comment (MIT).

## Content truth (what Juan knows vs. is learning)

- **Strong:** JavaScript, TypeScript, React, Next.js, Redux, HTML/CSS, Node.js, Express, REST, microservices,
  Docker, CI/CD, SQL, root-cause/log analysis, GitHub Copilot, AWS Cloud Practitioner.
- **Hands-on:** ECS, ECR, S3, DynamoDB, Cognito, GitHub Actions, Jest, Jenkins, Git, Linux, Bash, MongoDB,
  SQL Server, OAuth 2.0, Java (college), OOP.
- **Learning (only in the Learning tab):** Claude Code, OpenAI Codex, LLM integrations, MCP, Casshy's stack
  (NestJS, Prisma, PostgreSQL, Turborepo, Better Auth, Zod, Rive, k3s), Spring Boot, Spring Data JPA, JUnit.
- IncidentHub: TypeScript, NestJS, PostgreSQL, Prisma, Zod, LLM API, Docker (support-incident API with SLAs and AI
  triage). Java and Spring Boot stay in Learning with no project attached.
- **Never list:** Python, FastAPI, .NET, C++, Kubernetes, Terraform, Lambda, IAM, VPC, SAML, LDAP, Power Apps.
- Ontario Government internship: a React web page (no LDAP, no Power Apps claims).
- Timer SaaS Team is a **web extension**: it shows under "All" (last) and under its own "Extensions" filter.
- Casshy: Phase 0 done (vision, docs, ADRs), Phase 1 in progress, **no app code yet**. Never present it as live.

## Decision log

- 2026-10: Main projects are Casshy, IncidentHub and Fragments (microservices). Timer goes under Web extensions.
  Chronicle removed.
- 2026-10: Skills and Learning share one section with tabs; "What I bring to a team" table removed.
- 2026-10: (Replaced) The hero JSON request + Send button were removed; the hero is now typographic and centered.
- 2026-10: (Replaced) The site was bilingual EN/ES; Juan later removed Spanish. English only now.
- 2026-10: shadcn/ui (real React components) + Tailwind v4; removed type-check/CI test steps and Vitest.
- 2026-10: No background blobs, grid, typing effect or shimmer. (The marquee came back later with real logos.)
- 2026-10: No coin, no dashboard or app demo for Casshy: "it's a portfolio, only to explain". No Rive on the portfolio.
- 2026-10: The name is "Casshy" (double s). `github.com/jdcastel` is Juan's other GitHub account (Fragments repos).
- 2026-10: Approved animations: hero Send, circular theme switch, scroll-filled timeline, EN↔ES fade, card
  spotlight. Stats are words, not numbers, so they light up instead of counting.
- Later: a custom domain (e.g. `juancastelblanco.dev`) for GitHub Pages.
- 2026-10: Spring Security removed from Learning (not confirmed).
  Recruiter-review suggestions declined; project order stays Casshy, IncidentHub, Fragments.
- 2026-10: Juan found the site too minimal: approved the full animation set above (marquee and header progress line
  back, hero entrance, border beam, fluid filters, Fragments diagram, Lenis, About highlight, masked titles) and
  allowed libraries (Motion, Lenis, simple-icons, Magic UI patterns), keeping it professional, not flashy.
- 2026-10: IncidentHub moved to TypeScript + NestJS + Prisma (same idea). Java and Spring Boot stay in Learning.
- 2026-10: Timer SaaS Team is no longer its own block; it has an "Extensions" filter and also shows under "All".
- 2026-10: Resume updated on Juan's request: English only, IncidentHub stack, Learning synced with the web, spoken
  languages line. The Word file is sent in chat, not offered on the site.
- 2026-10: Juan's redesign round:
  - Logo reads "Juan Castelblanco" (brand blue on hover).
  - Hero shows only "Hi, I'm Juan. / Software developer", the "See projects" button and LinkedIn/GitHub icons. The
    resume downloads from the header button only.
  - English only (Spanish version deleted).
  - Casshy lives inside Projects as the featured card; there is no separate Casshy section.
  - About is personal: building real products, journey since 2021, AI agents, hobbies (soccer, gym, drums, games).
  - The marquee shows only "Strong" technologies, centered.
- 2026-10: Hero is typographic and centered (badge, "Hi, I'm Juan. / Software developer", See projects + icons), then
  the stat cards and the marquee. No JSON, no code window.
- 2026-10: Projects layout: featured Casshy full width, the other projects in equal-height columns below (3 on
  desktop) with "Learn more" and links aligned at the bottom. Short titles ("IncidentHub", "Fragments — AWS
  microservice").
- 2026-10: About says "I started coding at 17" (no year).
