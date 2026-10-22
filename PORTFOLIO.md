# Portfolio site (Astro)

Single-page portfolio built with [Astro](https://astro.build), deployed to GitHub Pages.

## Edit content
Everything (profile, skills, the "Learning now" cards, projects, experience, role fit) lives in `src/data/profile.ts`.
Each section is a component in `src/components/`. Mark a skill with `core: true` to highlight it.
The JSON request in the hero is built from the `payload` object in `src/components/Hero.astro`.

The resume PDF served by the site is `public/Resume_Juan_Castelblanco.pdf`; replace it when the resume changes.

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # type check
npm run build    # static output in dist/
```
Requires Node 22.22+.

## Deploy
`.github/workflows/deploy.yml` type-checks, builds and publishes on every push to `main`
to https://jdrcastel.github.io/jdrcastel/. `.github/workflows/ci.yml` runs the same checks on pull requests.
Keep `deploy.yml` as the only workflow that deploys to Pages.
