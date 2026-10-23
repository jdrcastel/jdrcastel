import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this repo under /jdrcastel/, so the deploy workflow sets
// SITE and BASE_PATH. Locally the site is served from the root.
export default defineConfig({
  site: process.env.SITE ?? "https://jdrcastel.github.io",
  base: process.env.BASE_PATH ?? "/",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
    routing: { prefixDefaultLocale: false },
  },
});
