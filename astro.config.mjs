import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages serves this repo under /jdrcastel/, so the deploy workflow sets
// SITE and BASE_PATH. Locally the site is served from the root.
export default defineConfig({
  site: process.env.SITE ?? "https://jdrcastel.github.io",
  base: process.env.BASE_PATH ?? "/",
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
  // Fonts come from the @fontsource-variable npm packages and are served from the site itself
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Geist",
      cssVariable: "--font-geist",
      options: {
        variants: [
          { src: ["./node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2"], weight: "100 900", style: "normal" },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      options: {
        variants: [
          { src: ["./node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2"], weight: "100 900", style: "normal" },
        ],
      },
    },
  ],
});
