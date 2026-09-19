This template shapes every `docs/community/showcases/*.md` file in this repository. A showcase is a **written creation** a contributor shares to promote this community — a skill, guide, tutorial, template, workflow, integration, or bundle. It is consumed by the showcase automation, which pours the contributor's issue-form answers into the placeholders below and opens a pull request.

Do not hand-edit files under `docs/community/showcases/`. New showcases go through the [showcase submission form](../../.github/ISSUE_TEMPLATE/showcase-submission.yml).

```markdown
---
title: "{{TITLE}}"
date: "{{DATE}}"
type: {{TYPE}}
summary: "{{SUMMARY}}"
proof:
{{PROOF}}
related_skills: [{{RELATED_SKILLS}}]
tags: [{{TAGS}}]
author:
  name: "{{AUTHOR_NAME}}"
  handle: "{{AUTHOR_HANDLE}}"
---

# {{TITLE}}

## What I Made

Two or three sentences describing the written creation and who it helps.

## How It Showcases This Community

How this content uses, builds on, or promotes the community's skills and
practices. Be specific and reference the community skills it leans on.

## Provenance

This content was authored by me and is verified at the proof links above. The
submitter's GitHub handle is locked to the account that opened the submission,
and GitHub-hosted proof links are machine-checked against that handle.

## Related Community Skills

- `{{RELATED_SKILLS}}`
```

### Front matter reference

| Key | Required | Description |
|---|---|---|
| `title` | yes | Title of the written creation, 8–120 characters. |
| `date` | yes | Publication date in `YYYY-MM-DD`. Must be a real day. |
| `type` | yes | One of `skill`, `tutorial`, `guide`, `article`, `template`, `workflow`, `integration`, `bundle`, `other`. Written creations only. |
| `summary` | yes | 2–4 sentences, 100–1200 characters. |
| `proof.repo` | no | A GitHub repository you authored (`https://github.com/<handle>/<repo>`). |
| `proof.pull_request` | no | A pull request you authored. |
| `proof.commit` | no | A commit you authored. |
| `proof.published` | no | One or more published, non-GitHub pages you authored (article, deck, demo page, profile page). GitHub-hosted links are machine-verified against your handle; published pages are resolved and confirmed by a maintainer. |
| `related_skills` | yes | Community skill IDs this content uses; each must exist in `skills/`. |
| `tags` | no | Comma-separated lowercase tags, up to 6. |
| `author.name` | no | Display name. |
| `author.handle` | yes (auto) | Locked to the submitting GitHub account; not user-editable. |

### The proof gate

Provenance is the main concern of this pipeline. At least one `proof` link is
required. GitHub-hosted proof links (repository owner, pull request author,
commit author) are machine-verified against `author.handle` using the public
GitHub API:

- **Match** → `auto-approve-eligible` after other checks.
- **Definitive mismatch** → rejected for misattribution.
- **Unverifiable** (non-GitHub content, rate-limited, or unavailable) → routed
  to `needs-human-review` so a maintainer confirms authorship manually.

The rubric lives in [`SHOWCASE_TRIAGE.md`](SHOWCASE_TRIAGE.md).