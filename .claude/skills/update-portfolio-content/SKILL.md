---
name: update-portfolio-content
description: Edit portfolio text, projects, skills or experience (English). Use whenever Juan asks to change what the site says.
---

# Update portfolio content

1. **Announce first.** Tell Juan (in Spanish) exactly what text you will change and in which sections.
2. Find where the content lives:
   - Text: `src/i18n/en.ts` (the site is English only).
   - Language-neutral data: `src/i18n/shared.ts`. This holds links, technology chips (`core: true` = strongest),
     project metadata (`featured`, `group: "extension"` = shown only under the Extensions filter, `tags`, `links`).
   - Hero logo marquee: `src/lib/tech.ts` (only Strong / Hands-on technologies).
3. Write clear, short English a recruiter can scan.
4. Respect "Content truth" in `CLAUDE.md`. New skills go to the right level. Learning items go only in
   `learningChips` plus `skills.learning`.
5. Adding a project:
   - Add an item to `projects.items` (`id`, `status`: `progress` | `use` | `shipped`).
   - Add its metadata to `projectMeta` in `shared.ts`. New link keys also need labels in `projects.links`.
6. Hero JSON: edit `hero.payload`. Keep values short (the code window wraps around 50 characters).
7. Build and check `/jdrcastel/` (see the `ship-portfolio` skill).
8. If Juan states a new preference, add it to "Decision log" in `CLAUDE.md`.
9. If the change affects the resume (projects, stack, learning), ask Juan whether to update it too
   (`update-resume` skill), and check `README.md` (his GitHub profile) for the same text.
