# Community Showcase Triage Rubric

Showcases are **written creations** contributors share to promote this community.
They are not events, not attendance reports, and not claims. The core concern is
**provenance**: everything published here must be provably authored by the
submitter. This doc is the rubric the `triage-showcase` workflow applies after
`validate-showcase` labels a PR `ready-for-triage`.

## Identity model

- The submitting GitHub **account that opened the issue is the author**.
  `author.handle` in the showcase file is written by the draft automation from
  the issue author and is **not** user-editable.
- Anything the submitter mentions in the write-up must be backed by a `proof`
  link; mentions without proof go to human review.

## Labels

| Label | Meaning |
|---|---|
| `showcase-submission` | Applied to every auto-drafted showcase PR. |
| `ready-for-triage` | Validation passed. Applied by `validate-showcase`. |
| `auto-approve-eligible` | Proof machine-verified and rules passed; maintainer spot-check can merge. |
| `needs-human-review` | Proof unverifiable or flagged for human judgment. |
| `showcase-reject` | Proof contradicted or disqualifying signals; commented reason. Closed after 14 days without activity. |
| `showcase-stale` | Applied by the scheduled closer before closing an untouched rejected PR. |

## Hard reject (machine-decidable)

- **Missing proof**: no `proof` link at all.
- **Misattribution**: a GitHub-hosted proof link (repo owner, PR author, commit
  author) clearly resolves to a different account than `author.handle`.
- **New-account+attribution mismatch flavoring**: placeholder/filler summary,
  URL shorteners, or known spam domains in `summary` or `proof`.

## Needs human review

These are not disqualifying; a maintainer confirms authorship or judgment:

- Proof links are **non-GitHub** content (`published` article pages) — identity
  cannot be machine-checked.
- GitHub API proof check was **rate-limited or unavailable**.
- The GitHub proof link could not be found (404) or the account has no visible
  authored artifact.
- The submitter account is **newer than 14 days**.
- `summary` exceeds 900 characters or the file contains code fences / embedded
  HTML (unusual for a write-up).
- More than 3 proof links, or the claims in `summary` mention other people,
  tools, or communities without a supporting proof link.

## Auto-approve

One or more GitHub-hosted proof links machine-verify against `author.handle`,
every rule passes, and `related_skills` reference real community skills. The bot
labels `auto-approve-eligible` and adds a checklist so a maintainer can
spot-check and merge.

## Model-assisted review (optional, off by default)

Rule-based triage and the machine proof check are the merge authority. Any
model-assisted review is advisory and must run inside a maintainer's own local
environment, never as an inline prompt that executes contributor content inside
a workflow. Update this section if such a harness ships.

## Merging

- `auto-approve-eligible` PRs: maintainer spot-checks and squash-merges.
- `needs-human-review` PRs: maintainer reviews diff **and** verifies authorship
  of the proof links before merging.
- `showcase-reject` PRs: closed automatically after 14 days without activity; a
  contributor can reopen by pushing a fix that passes the rules.