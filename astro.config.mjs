import { defineConfig } from "astro/config";

// GitHub Pages serves this repo under /jdrcastel/, so the deploy workflow sets
// SITE and BASE_PATH. Locally and on Vercel the site is served from the root.
export default defineConfig({
  site: process.env.SITE ?? "https://juan-castelblanco.vercel.app",
  base: process.env.BASE_PATH ?? "/",
});
