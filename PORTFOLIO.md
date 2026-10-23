# Portfolio site

Bilingual (EN/ES) single-page portfolio built with Astro 7, React islands, Tailwind CSS v4 and shadcn/ui,
deployed to GitHub Pages: https://jdrcastel.github.io/jdrcastel/ (Spanish: `/es/`).

- Content: `src/i18n/en.ts`, `src/i18n/es.ts` (text) and `src/i18n/shared.ts` (links, tech, project metadata).
- Run locally: `npm install && npm run dev` (Node ≥ 22.23.4).
- Deploy: every push to `main` builds and publishes via `.github/workflows/deploy.yml`.

Project rules, structure and conventions for contributors and AI agents are in [CLAUDE.md](CLAUDE.md).
