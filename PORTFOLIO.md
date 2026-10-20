# Portfolio site (Astro)

Single-page portfolio built with [Astro](https://astro.build). Deployed on Vercel.

## Edit content
Everything (skills, projects, experience, role fit) lives in `src/data/profile.ts`.
Each section is a component in `src/components/`.
Mark a skill with `core: true` (strongest) or `learning: true` (learning now).

## DevOps toolbox
Logic lives in `src/lib/` as plain TypeScript with unit tests next to it; the UI is `src/components/Toolbox.astro`.
- `jwt.ts`, `saml.ts`: SSO token inspector
- `dockerfile.ts`: Dockerfile linter
- `cidr.ts`: AWS VPC subnet planner + Terraform output

## Run locally
```bash
npm install
npm run dev      # http://localhost:4321
npm test         # unit tests for the toolbox (Vitest)
npm run check    # type check
npm run build    # static output in dist/
```
Requires Node 22.22+.

## Deploy on Vercel
Import this repo in Vercel. It auto-detects Astro, so no settings are needed.
To replace the current site, point the existing `juan-castelblanco` Vercel project at this repo
(Settings → Git → Connected Repository).

## Deploy on GitHub Pages
`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`
to https://jdrcastel.github.io/jdrcastel/, after type checks and tests pass.
`.github/workflows/ci.yml` runs the same checks on every pull request.
Keep this as the only workflow that deploys to Pages.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
