# Juan Castelblanco · Portfolio

Bilingual (EN/ES) single-page portfolio, published at https://jdrcastel.github.io/jdrcastel/ (Spanish at `/es/`).
This repo is also Juan's GitHub profile repo: `README.md` is his profile page, not project docs.

## Rules from Juan (always follow)

1. **Announce before changing.** Before any edit, say what you will change and why. Ask when a decision is his
   (design direction, content, removing things). Always share questions and suggestions so work keeps moving.
2. **Only the web portfolio.** Never edit the resume (Word or PDF). `public/Resume_Juan_Castelblanco.pdf` is replaced
   only when Juan provides a new one.
3. **Always bilingual.** Every text change goes into both `src/i18n/en.ts` and `src/i18n/es.ts`, same structure.
4. **Latest stable versions.** Check `npm view <pkg> version` before adding or upgrading anything.
5. **Minimal and professional.** A recruiter has ~60 seconds: clear hierarchy, no visual noise, fast. Animations only
   where they add meaning (Casshy's coin, subtle reveal on scroll).
6. **Honest content.** Never claim skills, features or results that aren't real. See "Content truth" below.
7. **Keep it essential.** No test suites or extra CI for this site (Juan's decision). Verify by building and checking
   both languages in a browser.
8. **Work through PRs.** Develop on a branch, open a PR, Juan merges. Deploy runs on push to `main`.
9. Save Juan's new preferences and decisions in this file (section "Decision log").

## Stack

- Astro 7 (static output, i18n routing: `en` default without prefix, `es` under `/es/`)
- React 19 islands only where there is interaction (`client:visible`): projects filter + "Learn more",
  skills/learning tabs, experience "More details"
- Tailwind CSS v4 + shadcn/ui (new-york style, neutral base, blue `brand` accent) in `src/components/ui/`
- Fonts: Geist and Geist Mono (Google Fonts)
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
  i18n/en.ts, es.ts   All text. es.ts is typed as `Content` from en.ts, so shapes must match.
  i18n/shared.ts      Language-neutral data: links, tech chips, project metadata, coin colors.
  i18n/index.ts       getContent(lang), homeUrl(lang), assetUrl(file) (base-path aware).
  components/         Page.astro composes: Nav, Hero, About, Casshy, Projects, Skills, Experience, Contact.
  components/ui/      shadcn/ui components (copied from the registry; don't hand-edit unless needed).
  layouts/Layout.astro  <head>: lang, canonical, hreflang, Open Graph, theme bootstrap.
  pages/index.astro, pages/es/index.astro
public/               favicon.svg, og.png (1200×630 preview), resume PDF
```

## Code conventions

- Static by default. Use a React island only for real interaction; pass islands only the props they need.
- Use shadcn components and `buttonVariants()` for links styled as buttons. Use `cn()` from `@/lib/utils`.
- Tailwind tokens (`bg-background`, `text-muted-foreground`, `text-brand`…); no hard-coded colors except the
  code window and Casshy's coin.
- Accessibility (WCAG AA): semantic landmarks, labelled sections, `aria-pressed`/`aria-expanded` on toggles,
  visible focus, `prefers-reduced-motion` respected, external links `rel="noopener"`.
- All URLs to pages/assets go through `homeUrl()` / `assetUrl()` so the `/jdrcastel` base path works.

## shadcn/ui in the cloud sandbox

`ui.shadcn.com` is blocked by the sandbox proxy, so `npx shadcn add` fails there. Use the `add-shadcn-component`
skill: copy the component from the `shadcn-ui/ui` GitHub repo (`apps/v4/registry/new-york-v4/ui/`) and change
`from "cn"` to `from "@/lib/utils"`. On Juan's machine, `npx shadcn add <name>` works with `components.json`.

## Content truth (what Juan knows vs. is learning)

- **Strong:** JavaScript, TypeScript, React, Next.js, Redux, HTML/CSS, Node.js, Express, REST, microservices,
  Docker, CI/CD, SQL, root-cause/log analysis, GitHub Copilot, AWS Cloud Practitioner.
- **Hands-on:** ECS, ECR, S3, DynamoDB, Cognito, GitHub Actions, Jest, Jenkins, Git, Linux, Bash, MongoDB,
  SQL Server, OAuth 2.0, Java (college), OOP.
- **Learning (only in the Learning tab):** Claude Code, OpenAI Codex, LLM integrations, MCP, Casshy's stack
  (NestJS, Prisma, PostgreSQL, Turborepo, Better Auth, Zod, Rive, k3s), Spring Boot, Spring Data JPA, JUnit.
- **Never list:** Python, FastAPI, .NET, C++, Kubernetes, Terraform, Lambda, IAM, VPC, SAML, LDAP, Power Apps.
- Ontario Government internship: a React web page (no LDAP, no Power Apps claims).
- Timer SaaS Team is a **web extension** (shown under "Web extensions"), not a main project.
- Casshy: Phase 0 done (vision, docs, ADRs), Phase 1 in progress, **no app code yet**. Never present it as live.

## Decision log

- 2026-10: Main projects are Casshy, IncidentHub and Fragments (microservices). Timer goes under Web extensions.
  Chronicle removed.
- 2026-10: Skills and Learning share one section with tabs; "What I bring to a team" table removed.
- 2026-10: Hero shows the profile as a JSON `POST` request; stats cards stay under the hero.
- 2026-10: Bilingual with two URLs (`/` English, `/es/` Spanish) and an EN|ES switch.
- 2026-10: shadcn/ui (real React components) + Tailwind v4; removed type-check/CI test steps and Vitest.
- 2026-10: Minimal visual style: no background blobs, grid, marquee, typing effect or shimmer.
