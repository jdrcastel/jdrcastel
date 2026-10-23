import en, { type Content } from "./en";

/** All site text. The site is English only. */
export const t: Content = en;

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Home URL, including the GitHub Pages base path. */
export const homeUrl = () => `${base}/`;

/** URL of a file in /public, including the base path. */
export const assetUrl = (file: string) => `${base}/${file}`;

export type { Content };
export type { ExperienceKind, ProjectStatus } from "./en";
