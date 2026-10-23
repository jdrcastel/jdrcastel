---
name: update-resume
description: Update Juan's resume (Word + PDF) when he asks. Rebuilds both from build.py, keeps one page, replaces the PDF on the site and sends him the Word file.
---

# Update the resume

Only when Juan asks (CLAUDE.md rule 2). The resume is English only and must say the same as the portfolio.

1. **Edit the content** in `build.py` (`CONTENT` list; links in `LINKS`). Check it against `src/i18n/en.ts` and
   CLAUDE.md "Content truth": same projects, stacks, dates and Learning items, nothing over-claimed.
   `template.docx` is Juan's original Word file; only its formatting is reused. Don't edit it.
2. **Build** into the scratchpad (needs LibreOffice and poppler, both in the cloud sandbox):
   ```bash
   python3 .claude/skills/update-resume/build.py <scratchpad>/resume-build
   ```
   It prints the page count and writes `preview.png` (page 1).
3. **Check:** exactly 1 page (shorten bullets to one line each if it spills), look at `preview.png`, and confirm the
   PDF links (email, portfolio, LinkedIn, GitHub, project code).
4. **Publish:** copy the PDF to `public/Resume_Juan_Castelblanco.pdf` (the site links to it), then build the site.
5. **Send Juan both files** (Word and PDF) in chat. The Word file is not offered on the site.
