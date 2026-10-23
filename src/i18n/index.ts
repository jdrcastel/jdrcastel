import en, { type Content } from "./en";
import es from "./es";

export const locales = ["en", "es"] as const;
export type Lang = (typeof locales)[number];

const dictionaries: Record<Lang, Content> = { en, es };

export const getContent = (lang: Lang): Content => dictionaries[lang];

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Home URL for a language, including the GitHub Pages base path. */
export const homeUrl = (lang: Lang) => `${base}/${lang === "en" ? "" : `${lang}/`}`;

/** URL of a file in /public, including the base path. */
export const assetUrl = (file: string) => `${base}/${file}`;

export type { Content };
export type { ExperienceKind, ProjectStatus, RoadmapStatus } from "./en";
