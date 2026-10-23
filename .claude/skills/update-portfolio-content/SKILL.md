---
name: update-portfolio-content
description: Edit portfolio text, projects, skills or experience in both English and Spanish. Use whenever Juan asks to change what the site says.
---

# Update portfolio content

1. **Announce first.** Tell Juan exactly what text you will change, in which sections, in both languages.
2. Find where the content lives:
   - Text: `src/i18n/en.ts` and `src/i18n/es.ts`. They have the same shape, and `es.ts` is typed as `Content`.
   - Language-neutral data: `src/i18n/shared.ts`. This holds links, technology chips (`core: true` = strongest),
     project metadata (`featured`, `group: "extension"`, `tags`, `links`).
3. Edit both languages in the same change. Write natural Spanish (Canadian/Latin American), not word-for-word.
4. Respect "Content truth" in `CLAUDE.md`. New skills go to the right level. Learning items go only in
   `learningChips` plus `skills.learning`.
5. Adding a project:
   - Add an item to `projects.items` in both files (same `id`, `status`: `progress` | `use` | `shipped`).
   - Add its metadata to `projectMeta` in `shared.ts`. New link keys also need labels in `projects.links`.
6. Hero JSON: edit `hero.payload` in both files. Keep values short (the code window wraps around 50 characters).
7. Build and check both `/jdrcastel/` and `/jdrcastel/es/` (see the `ship-portfolio` skill).
8. If Juan states a new preference, add it to "Decision log" in `CLAUDE.md`.
