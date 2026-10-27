"""Build Juan's resume (Word + PDF) from the content below.

The Word file reuses the paragraph formatting of template.docx (Juan's original resume); only the text changes.
Usage: python3 build.py [output_dir]   (needs LibreOffice `soffice` for the PDF)
Keep the content in sync with the portfolio (src/i18n/en.ts) and CLAUDE.md "Content truth". English only.
"""
import shutil
import subprocess
import sys
import tempfile
import zipfile
from pathlib import Path
from xml.sax.saxutils import escape as e

HERE = Path(__file__).resolve().parent
OUT = Path(sys.argv[1] if len(sys.argv) > 1 else "resume-build").resolve()
NAME = "Resume_Juan_Castelblanco"

B = "<w:rPr><w:b/><w:bCs/></w:rPr>"
I = "<w:rPr><w:i/><w:iCs/></w:rPr>"
TAB = '<w:tabs><w:tab w:val="right" w:pos="10800"/></w:tabs>'

# Hyperlinks: relationship id -> URL (rId5-rId8 exist in the template; the rest are added)
LINKS = {
    "rId5": "mailto:jdrcastel@gmail.com",
    "rId6": "https://jdrcastel.github.io/jdrcastel/",
    "rId7": "https://www.linkedin.com/in/jdcastel/",
    "rId8": "https://github.com/jdrcastel",
    "rId11": "https://github.com/jdcastel/Microservice-fragments-Cloud-Computing",
    "rId12": "https://github.com/jdcastel/Microservice-fragments-UI",
    "rId13": "https://github.com/jdrcastel/Timer-SaaS-Team",
}


def run(text, rpr=""):
    return f'<w:r>{rpr}<w:t xml:space="preserve">{e(text)}</w:t></w:r>'


def link(rid, text):
    return (f'<w:hyperlink r:id="{rid}" w:history="1"><w:r><w:rPr><w:color w:val="000000"/><w:u w:val="single"/></w:rPr>'
            f"<w:t>{e(text)}</w:t></w:r></w:hyperlink>")


def p(ppr, content):
    return f"<w:p><w:pPr>{ppr}</w:pPr>{content}</w:p>"


def name(text):
    return p('<w:spacing w:after="20"/><w:jc w:val="center"/>',
             run(text, '<w:rPr><w:b/><w:bCs/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr>'))


def tagline(text):
    return p('<w:spacing w:after="20"/><w:jc w:val="center"/>',
             run(text, '<w:rPr><w:b/><w:bCs/><w:sz w:val="22"/><w:szCs w:val="22"/></w:rPr>'))


def heading(text):
    return p('<w:keepNext/><w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="000000"/></w:pBdr>'
             '<w:spacing w:before="120" w:after="50"/>',
             run(text, '<w:rPr><w:smallCaps/><w:sz w:val="24"/><w:szCs w:val="24"/></w:rPr>'))


def para(text):
    return p('<w:spacing w:after="20"/><w:ind w:left="200"/>', run(text))


def role(title, date):
    return p(f'<w:keepNext/>{TAB}<w:spacing w:before="70"/><w:ind w:left="200"/>',
             run(title, B) + f"<w:r><w:tab/><w:t>{e(date)}</w:t></w:r>")


def org(name_, place=""):
    tabbed = f"<w:tab/><w:t>{e(place)}</w:t>" if place else ""
    return p(f'<w:keepNext/>{TAB}<w:spacing w:after="10"/><w:ind w:left="200"/>', f"<w:r>{I}<w:t>{e(name_)}</w:t>{tabbed}</w:r>")


def bullet(text):
    return p('<w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr><w:spacing w:after="12"/>',
             run(text))


def project(title, stack, links=()):
    extra = "".join(run(" | ") + link(rid, text) for rid, text in links)
    return p('<w:keepNext/><w:spacing w:before="60" w:after="10"/><w:ind w:left="200"/>', run(title, B) + run(" | ") + run(stack, I) + extra)


def skill(label, text):
    return p('<w:spacing w:after="4"/><w:ind w:left="200"/>', run(f"{label}: ", B) + run(text))


sep = run("  |  ")
CONTENT = [
    name("Juan David Rodriguez Castelblanco"),
    tagline("Software Developer  |  JavaScript · React · Node.js · AWS · Java"),
    p('<w:spacing w:after="20"/><w:jc w:val="center"/>',
      run("Ontario, Canada") + sep + link("rId5", "jdrcastel@gmail.com") + sep + link("rId6", "jdrcastel.github.io/jdrcastel")
      + sep + link("rId7", "linkedin.com/in/jdcastel") + sep + link("rId8", "github.com/jdrcastel")),

    heading("Summary"),
    para("Software developer with strong JavaScript and front-end skills (React, Next.js, TypeScript) who also built a Node.js "
         "microservice on AWS with Docker and CI/CD (AWS Certified Cloud Practitioner). Now designing Casshy, a gamified "
         "personal-finance app, and building IncidentHub, a TypeScript and NestJS API with AI-assisted triage. At OpenText I "
         "troubleshoot production incidents on enterprise SaaS platforms and am moving into Tier-3 support."),

    heading("Experience"),
    role("Technical Support Specialist", "September 2025 - Present"),
    org("OpenText", "Waterloo, ON"),
    bullet("Provide production support to global enterprise customers on OpenText SaaS products (LoadRunner Enterprise, ALM/QC, "
           "Octane/ValueEdge), currently moving from Tier-2 into Tier-3 escalations."),
    bullet("Troubleshoot authentication (SSO, OAuth 2.0), integration and performance incidents using Linux/Windows, "
           "SQL, Jenkins and system logs, and analyze ticket data to find root causes and recurring issues."),
    bullet("Partner with Operations, Engineering and R&D in an SLA-driven environment to resolve complex escalations."),
    role("Application Developer (Internship)", "September 2022 - April 2023"),
    org("Government of Ontario", "Toronto, ON"),
    bullet("Built an internal web page with React."),
    bullet("Worked with developers and designers to fix bugs, deliver new features, and improve user experience."),

    heading("Projects"),
    project("Casshy (In Progress)", "TypeScript, Next.js, NestJS, PostgreSQL, Prisma, Turborepo, Rive, Docker"),
    bullet("Designing a gamified personal-finance web app for Canada; users care for Casshy, a coin mascot that evolves with fair XP."),
    bullet("Phase 0 done (vision, ADRs); money stored as integers, versioned Canadian tax rules, pure domain packages, WCAG AA."),
    project("IncidentHub (In Progress)", "TypeScript, NestJS, PostgreSQL, Prisma, Zod, LLM API, Docker"),
    bullet("NestJS REST API for support incidents: priority-based SLAs, breach detection and a ticket status workflow."),
    bullet("AI triage: an LLM summarizes each new ticket and suggests its priority, with a human confirming."),
    project("Fragments — Cloud REST API on AWS", "Node.js, Express, AWS, Docker",
            [("rId11", "API code"), ("rId12", "UI code")]),
    bullet("REST API on AWS to store and convert text and image fragments, with Cognito JWT auth, S3 and DynamoDB."),
    bullet("CI with ESLint, Jest and Hurl integration tests; CD builds the Docker image, pushes it to ECR and deploys to ECS."),
    project("Timer SaaS Team (Web Extension)", "JavaScript, Manifest V3", [("rId13", "Code")]),
    bullet("Web extension for the OpenText SaaS team that counts down a saved break or lunch and sets the agent back to Available."),
    bullet("Countdown, JSON log export and timer recovery after restarts; fixed a 15-to-30-minute form reset bug."),

    heading("Skills"),
    skill("Programming", "JavaScript (ES6+), TypeScript, HTML/CSS, SQL, Java, Bash"),
    skill("Frontend", "React, Next.js, Redux, Responsive UI"),
    skill("Backend & APIs", "Node.js, Express.js, RESTful APIs, Microservices, OAuth 2.0"),
    skill("Cloud & Delivery", "AWS (ECS, ECR, S3, DynamoDB, Cognito), Docker, GitHub Actions, Jenkins, CI/CD, Linux"),
    skill("Databases", "SQL, MongoDB, SQL Server, DynamoDB"),
    skill("Tools", "Claude Code, GitHub Copilot, Git/GitHub, Jest, Agile"),
    skill("Currently Learning", "OpenAI Codex, LLM integrations, MCP, NestJS, Prisma, PostgreSQL, Spring Boot, JUnit"),
    skill("Languages", "Spanish (native), English (professional)"),

    heading("Education"),
    role("Computer Programming and Analysis (Advanced Diploma)", "January 2021 - January 2024"),
    org("Seneca Polytechnic", "Toronto, ON"),
    para("Relevant Coursework: Java, Object-Oriented Programming, Cloud Infrastructure, Database Systems, Data Structures"),

    heading("Certifications and Achievements"),
    bullet("AWS Certified Cloud Practitioner"),
    bullet("Platzi: Advanced Algorithms, REST API with JavaScript, and Object-Oriented Programming"),
    bullet("President's Honour List, Summer and Fall 2023, Seneca Polytechnic"),
    bullet("Hispanotech volunteer: organized technical workshops and networking sessions for Latin American tech professionals."),
]


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as tmp:
        src = Path(tmp)
        with zipfile.ZipFile(HERE / "template.docx") as z:
            z.extractall(src)

        doc_path = src / "word/document.xml"
        doc = doc_path.read_text(encoding="utf-8")
        body = doc.index("<w:body>") + len("<w:body>")
        doc_path.write_text(doc[:body] + "".join(CONTENT) + doc[doc.index("<w:sectPr"):], encoding="utf-8")

        rels_path = src / "word/_rels/document.xml.rels"
        rels = rels_path.read_text(encoding="utf-8")
        for rid, url in LINKS.items():
            start = rels.find(f'Id="{rid}"')
            if start == -1:
                rels = rels.replace("</Relationships>",
                                    f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" '
                                    f'Target="{e(url)}" TargetMode="External"/></Relationships>')
            else:
                tag_start = rels.rfind("<Relationship", 0, start)
                tag_end = rels.index("/>", start) + 2
                rels = rels[:tag_start] + (f'<Relationship Id="{rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" '
                                           f'Target="{e(url)}" TargetMode="External"/>') + rels[tag_end:]
        rels_path.write_text(rels, encoding="utf-8")

        docx = OUT / f"{NAME}.docx"
        with zipfile.ZipFile(docx, "w", zipfile.ZIP_DEFLATED) as z:
            for f in sorted(src.rglob("*")):
                if f.is_file():
                    z.write(f, f.relative_to(src).as_posix())

    subprocess.run(["soffice", "--headless", "--convert-to", "pdf", "--outdir", str(OUT), str(docx)],
                   check=True, capture_output=True)
    pdf = OUT / f"{NAME}.pdf"
    pages = subprocess.run(["pdfinfo", str(pdf)], capture_output=True, text=True).stdout
    print(docx)
    print(pdf, next((l.split()[-1] + " page(s)" for l in pages.splitlines() if l.startswith("Pages:")), ""))
    if shutil.which("pdftoppm"):
        subprocess.run(["pdftoppm", "-r", "80", "-png", "-singlefile", str(pdf), str(OUT / "preview")], check=False)


if __name__ == "__main__":
    main()
