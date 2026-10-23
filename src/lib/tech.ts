// Logos for the hero marquee (build time only: never import this from a React island).
// Only technologies Juan knows well or has used hands-on; see "Content truth" in CLAUDE.md.
import {
  siCss,
  siDocker,
  siExpress,
  siGit,
  siGithubactions,
  siGithubcopilot,
  siGnubash,
  siHtml5,
  siJavascript,
  siJenkins,
  siJest,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siRedux,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

export type Tech = { label: string; icon?: SimpleIcon };

// AWS has no Simple Icons logo, so it uses a generic cloud icon
export const techRows: Tech[][] = [
  [
    { label: "JavaScript", icon: siJavascript },
    { label: "TypeScript", icon: siTypescript },
    { label: "React", icon: siReact },
    { label: "Next.js", icon: siNextdotjs },
    { label: "Redux", icon: siRedux },
    { label: "HTML5", icon: siHtml5 },
    { label: "CSS", icon: siCss },
    { label: "GitHub Copilot", icon: siGithubcopilot },
  ],
  [
    { label: "Node.js", icon: siNodedotjs },
    { label: "Express", icon: siExpress },
    { label: "Docker", icon: siDocker },
    { label: "AWS" },
    { label: "GitHub Actions", icon: siGithubactions },
    { label: "MongoDB", icon: siMongodb },
    { label: "Jest", icon: siJest },
    { label: "Jenkins", icon: siJenkins },
    { label: "Git", icon: siGit },
    { label: "Linux", icon: siLinux },
    { label: "Bash", icon: siGnubash },
  ],
];

/** Brand color for the hover state, or undefined for near-black logos (they use the text color). */
export const logoColor = (hex: string) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.15 ? undefined : `#${hex}`;
};
