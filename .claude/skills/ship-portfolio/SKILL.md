---
name: ship-portfolio
description: Build, check in a browser, commit and open a PR for portfolio changes. Use before telling Juan a change is ready.
---

# Ship the portfolio

1. **Build like production.** This needs Node ≥ 22.23.4. If the sandbox has an older Node, install Node 24 in a
   separate folder:
   `npm i node@24 --prefix /home/user/tools/node24` and prepend `/home/user/tools/node24/node_modules/node/bin`
   to `PATH`. Then run:
   ```bash
   SITE=https://jdrcastel.github.io BASE_PATH=/jdrcastel npx astro build
   SITE=https://jdrcastel.github.io BASE_PATH=/jdrcastel npx astro preview --port 4321
   ```
2. **Check in a browser** with Playwright (Chromium at `/opt/pw-browsers/chromium`; in the cloud sandbox import
   Playwright from `/opt/node-tools/node_modules/playwright/index.mjs`):
   - Pages `/jdrcastel/` and `/jdrcastel/es/`, at 1280 and 390 wide, light and dark.
   - No console errors or 404s, and no horizontal scroll.
   - Filters, "Learn more", tabs, experience details, the EN↔ES switch, the theme toggle, and the mobile menu all
     work.
   - Look at the screenshots yourself before calling it done.
3. **Optional reviews** for bigger changes: run the `recruiter-60s-reviewer`, `web-quality-auditor` and
   `content-guardian` agents. Fix what Juan agrees with.
4. **Commit and open a PR.**
   - Work on the session branch. Merge `origin/main` first if a previous PR was merged.
   - Write a clear commit message, push, and open a PR for Juan to merge.
   - Never touch the resume files.
5. Tell Juan what changed, what you verified, and any questions or suggestions.
