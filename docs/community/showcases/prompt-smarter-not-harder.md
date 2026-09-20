---
title: "Speaking at WordCamp KTM 2026: Prompt Smarter, Not Harder — contribute with prompt workflows and skills (live demo)"
date: "2026-09-15"
type: guide
summary: "A hands-on workshop and demo kit I authored and delivered at WordCamp Kathmandu 2026 (Sep 18-19): about two hours, seven guided demos, and one idea — stop writing the same prompt again and again. It covers prompts that work first time, the five-part prompt, re-prompting, reusable master prompts, using skills with DeepSeek for LinkedIn and CV work, and ends with a live contribution demo: a workflow turned into a SKILL.md and opened as a pull request. Full circle: I contributed the google-no-code skill (merged in PR #1497) before sharing on the WCKTM stage."
proof:
  repo: "https://github.com/WHOISABHISHEKADHIKARI/agentic-awesome-skills"
  pull_request: "https://github.com/sickn33/agentic-awesome-skills/pull/1497"
  commit: ""
  published:
    - "https://new.express.adobe.com/publishedV2/urn:aaid:sc:AP:3881f45a-2e25-5662-b8af-2450f5cc98e3"
    - "https://kathmandu.wordcamp.org/2026/speaker/abhishek-adhikari/"
    - "https://kathmandu.wordcamp.org/2026/session/prompt-smarter-not-harder/"
related_skills: [prompt-engineering, prompt-engineering-patterns, linkedin-profile-optimizer, cv-generator]
tags:
  - prompting
  - talks
author:
  name: "Abhishek Adhikari"
  handle: "@WHOISABHISHEKADHIKARI"
---

# Speaking at WordCamp KTM 2026: Prompt Smarter, Not Harder — contribute with prompt workflows and skills (live demo)

![Abhishek Adhikari, WordCamp Kathmandu 2026 speaker](https://i0.wp.com/kathmandu.wordcamp.org/2026/files/2026/07/DSC02604-scaled.jpg?fit=800%2C1200&ssl=1)

## What I Made

A hands-on workshop I authored and delivered at WordCamp Kathmandu 2026 at
Alice Receptions: two hours, seven guided demos, one idea — stop writing the
same prompt again and again. The running example is Murrah Ghee, the ghee brand
of Himalaya Krishi Tatha Pasupalan Farm, so every demo lands on a real
business. The kit follows the arc **Prompt → Skill → Context → Loop → Graph**
(the session stops at skills):

- Write prompts that give useful answers the first time.
- Let the AI improve your prompt and ask the missing questions.
- Save a good prompt as a skill and reuse it.
- Use skills other people wrote — for a LinkedIn profile and a CV.
- Turn your own way of working into a skill and share it on GitHub.

Attendees run the demos on their own machines with GitHub, GitHub Desktop,
VS Code, OpenCode, and DeepSeek.

## Session Outline

A two-hour workshop, seven guided demos:

1. **Context, Format, Output** — any AI chat. Three simple parts already make a
   big difference: a lazy prompt gives a generic answer, the structured prompt
   knows the farm, the brand, and the reader.
2. **The Five-Part Prompt** — any AI chat. Add `Role` and `Tweaks` to the
   Context/Action/Format core for more control (change one Role line and the
   tone changes instantly).
3. **Re-prompting** — any AI chat. Let the AI redesign your draft prompt and ask
   you the missing questions one at a time.
4. **Master Prompt** — write once with square-bracket blanks
   (`[BRAND NAME]`, `[CONTENT TYPE]`, `[WORD COUNT]`), fill the blanks, reuse.
5. **LinkedIn Optimization with a Skill** — DeepSeek. Load your LinkedIn PDF
   plus the `linkedin-profile-optimizer` skill from the Agentic Awesome Skills
   library for a consistent audit and rewrite.
6. **CV Content with a Skill** — DeepSeek. The same PDF with the `cv-generator`
   skill produces an ATS-ready CV instead: one PDF, a different skill, a
   different result.
7. **From Workflow to Skill to Contribution** — DeepSeek, Apps Script, GitHub.
   Take a real Google Forms workflow, ask AI to turn it into a `SKILL.md`
   (`google-forms-creator`), test it, then fork, add
   `skills/google-forms-creator/SKILL.md`, commit on a branch, and open a pull
   request to the Agentic Awesome Skills repository with
   `feat: add google-forms-creator skill`.

Demo 7 is the live contribution demo: everyone leaves having seen a daily
workflow become a skill on GitHub in front of them.

## How It Showcases This Community

This is the full circle: I contributed the `google-no-code` skill to this
repository, it was reviewed and merged in
[PR #1497](https://github.com/sickn33/agentic-awesome-skills/pull/1497), and
within the same journey I shared what contributing and collaborating taught me
from the WordCamp Kathmandu stage. From contributing, to collaborating, to
sharing — and the deck directly applies the structured prompting that this
community's `prompt-engineering` and `prompt-engineering-patterns` skills
formalize, inviting attendees to run those patterns on their own assistant.

## Provenance

This content was authored by me and is verified at the proof links above. The
repository proof resolves to my own fork (owner matches my handle), and the
pull request proof resolves to the merged PR I authored. The official
spoken-profile page, the session page, and the slides are linked as published
proof. The demo kit
(`https://claude.ai/artifact/5CSh9c1wPH4ppMND5kyppc`) is the full workshop kit
behind an interactive login; the same session content is summarized above so
it stays readable and machine-searchable here. The speaker photo used above is
the public WordCamp-hosted headshot, so it resolves for anyone without a login.
The submitting GitHub handle is locked to the account that opened the
submission.

## Speaking at WordCamp KTM 2026: Prompt Smarter, Not Harder — contribute with prompt workflows and skills (live demo)

Photos pending upload by the author. Captions stay concrete — event, the work,
and what actually happened. Swap each `PLACEHOLDER` with the image URL, or drop
files under `docs/community/showcases/media/` and use the relative path.

1. **On stage** — opening the talk "Prompt Smarter, Not Harder" at WordCamp
   Kathmandu 2026.
   ![Abhishek Adhikari on stage at WordCamp Kathmandu 2026](data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1024'%20height='512'%3E%3Crect%20width='1024'%20height='512'%20fill='%23e9e9e9'/%3E%3Ctext%20x='512'%20y='256'%20font-family='sans-serif'%20font-size='34'%20text-anchor='middle'%20fill='%23777777'%3EPhoto%20pending%20upload%3C/text%3E%3C/svg%3E)

2. **The topic** — how to contribute to open-source projects using prompt
   workflows and skills.
   ![Prompt workflow and skills demo on screen](data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1024'%20height='512'%3E%3Crect%20width='1024'%20height='512'%20fill='%23e9e9e9'/%3E%3Ctext%20x='512'%20y='256'%20font-family='sans-serif'%20font-size='34'%20text-anchor='middle'%20fill='%23777777'%3EPhoto%20pending%20upload%3C/text%3E%3C/svg%3E)

3. **Live demo** — contributing in real time with the prompt workflow and
   skills, as the assistant's reasoning updates.
   ![Live contribution demo during the talk](data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1024'%20height='512'%3E%3Crect%20width='1024'%20height='512'%20fill='%23e9e9e9'/%3E%3Ctext%20x='512'%20y='256'%20font-family='sans-serif'%20font-size='34'%20text-anchor='middle'%20fill='%23777777'%3EPhoto%20pending%20upload%3C/text%3E%3C/svg%3E)

4. **The room** — the audience following the contribution walkthrough.
   ![Audience at WordCamp Kathmandu 2026](data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1024'%20height='512'%3E%3Crect%20width='1024'%20height='512'%20fill='%23e9e9e9'/%3E%3Ctext%20x='512'%20y='256'%20font-family='sans-serif'%20font-size='34'%20text-anchor='middle'%20fill='%23777777'%3EPhoto%20pending%20upload%3C/text%3E%3C/svg%3E)

5. **The community** — fellow speakers, organizers, and contributors; and the
   full circle to this repository via PR #1497.
   ![Community of contributors at WordCamp Kathmandu 2026](data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='1024'%20height='512'%3E%3Crect%20width='1024'%20height='512'%20fill='%23e9e9e9'/%3E%3Ctext%20x='512'%20y='256'%20font-family='sans-serif'%20font-size='34'%20text-anchor='middle'%20fill='%23777777'%3EPhoto%20pending%20upload%3C/text%3E%3C/svg%3E)

## Talk Metadata (scraped from the WordCamp site)

Source: official WordCamp Kathmandu 2026 speaker and session pages, scraped
for reuse. All links verified resolving at scrape time.

- Event: WordCamp Kathmandu 2026
- Session: Prompt Smarter, Not Harder
- Session page: https://kathmandu.wordcamp.org/2026/session/prompt-smarter-not-harder/
- Dates: September 18-19, 2026
- Venue: Alice Receptions, Gairidhara, Kathmandu
- Headshot: https://kathmandu.wordcamp.org/2026/files/2026/07/DSC02604-scaled.jpg
- Speaker profiles:
  - GitHub: https://github.com/WHOISABHISHEKADHIKARI
  - LinkedIn: https://www.linkedin.com/in/whoisabhishekadhikari/
  - WordPress: https://profiles.wordpress.org/abhu1254/
  - Web: https://krishihimalaya.com/

## Related Community Skills

- `prompt-engineering`
- `prompt-engineering-patterns`
- `linkedin-profile-optimizer` (demonstrated in Demo 5)
- `cv-generator` (demonstrated in Demo 6)