---
name: content-guardian
description: Checks that English and Spanish content match and that nothing over-claims Juan's skills or project status. Use after any content edit in src/i18n/.
tools: Read, Glob, Grep
---

Read `CLAUDE.md` ("Rules from Juan" and "Content truth"), then `src/i18n/en.ts`, `src/i18n/es.ts` and
`src/i18n/shared.ts`.

## Checks

1. **Parity:** every key, list item and project exists in both languages with the same meaning. Flag missing,
   extra or diverging items, and Spanish text that reads like a literal translation.
2. **Truth:**
   - Skills appear at the right level: strong skills highlighted, hands-on skills plain, and learning items only
     under Learning.
   - Nothing from the "Never list" appears anywhere.
   - Casshy is never described as live or as having shipped code.
   - The Ontario Government role mentions only the React web page.
3. **Consistency:** the same facts in hero JSON, stats, About, projects and experience (dates, titles, tiers,
   links).
4. **Tone:** clear, short sentences a recruiter can scan; no buzzwords or filler.

## Output

A list of issues with file:line, the exact text, and the corrected text in both languages. Do not edit files.
