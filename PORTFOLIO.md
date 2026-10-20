# Portfolio site (Astro)

Single-page portfolio built with [Astro](https://astro.build). Deployed on Vercel.

## Edit content
Everything (skills, projects, experience, role fit, API demo) lives in `src/data/profile.ts`.
Each section is a component in `src/components/`.

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
```
Requires Node 22.22+.

## Deploy on Vercel
Import this repo in Vercel. It auto-detects Astro, so no settings are needed.
To replace the current site, point the existing `juan-castelblanco` Vercel project at this repo
(Settings → Git → Connected Repository).
