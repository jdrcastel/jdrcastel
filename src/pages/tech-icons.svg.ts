// One SVG sprite for the marquee logos, generated at build time and cached by the browser.
// The marquee repeats each logo several times, so <use> keeps the HTML small.
import { techRows } from "@/lib/tech";

export function GET() {
  const symbols = techRows
    .flat()
    .flatMap(({ icon }) => (icon ? [`<symbol id="${icon.slug}" viewBox="0 0 24 24"><path d="${icon.path}"/></symbol>`] : []))
    .join("");
  return new Response(`<svg xmlns="http://www.w3.org/2000/svg">${symbols}</svg>`, {
    headers: { "Content-Type": "image/svg+xml" },
  });
}
