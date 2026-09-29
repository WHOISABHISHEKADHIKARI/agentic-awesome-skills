---
name: json-schema-manual
description: 'JSON Schema Manual: draft 2020-12 validation schema from a confirmed field list, with required and enum values only where confirmed. Use for an API or import contract.'
category: business
risk: safe
source: self
source_type: self
date_added: "2026-09-28"
author: WHOISABHISHEKADHIKARI
tags: [json, json-schema, validation, schema, operations, data, helper]
tools: []
source_repo: WHOISABHISHEKADHIKARI/sme-ops-system-builder
---

# JSON Schema Manual

**What it is:** a draft 2020-12 schema over a field list someone already confirmed -
validating structure, never inventing business rules.

## Overview

Produces JSON Schema from a confirmed canonical field list, for validation, API
contracts, import and export structures, form generation, and schema documentation.

JSON Schema validates structure. It does not compute, decide or imply. This is a helper:
it defines no table of its own and renders whatever field list the active module already
confirmed, so the property names here are the names that module uses in its CSV, SQL,
spreadsheet and Notion mapping.

Layer: n/a. Fits: every stage. Table code: n/a - it renders the active module's table.

## When to Use This Skill

- I need a JSON Schema
- validate this payload before it goes in
- make an API contract for this table
- document the shape of this import file
- generate a form from this schema
- turn the agreed fields into a schema

Also use it when a module has confirmed a field list and the user wants the contract for
the system that will read it, rather than the table itself.

Do not use it to add validation the business has not asked for. A schema is a promise
about what a payload may contain, and every restriction in it rejects real data.

## How It Works

Follow the shared execution contract. The module-specific rules below define only domain fields, decisions, calculations, and safety constraints.

### Step 1 - Identify intent

Read the request and pick the intent before asking anything.

- "I need a schema" -> a strict or permissive schema, per Step 5.
- "something rejected my payload" -> review or fix: only the rule that caused it.
- "which fields are required" -> advice: answer from the confirmed field list, and offer
  the schema rather than emitting one.

Build only what was requested. A fix does not become a rewrite, and advice does not become
a file.

### Step 2 - Ask only what is missing

Reuse everything already confirmed, including by the module that owns the field list: the
property names and types, the select options, the date and currency fields, the
calculated fields, the statuses and the IDs. Never ask again for information the user has
already supplied.

Ask one short question per message, and only when the answer changes the schema:

> **Q:** Should the schema reject unknown fields, or allow them?

Nothing else is worth a question. Requiredness, options and formats come from the
confirmed field list, not from a new round of asking.

### Step 3 - Hold the internal context

Hold the answers in this shape. It stays internal - it is not shown to the user unless
they ask, and it never carries a value the user did not give.

```yaml
module: json-schema-manual
intent: null            # set in Step 1, one of: schema, review, fix, advice
source_module: null     # the module whose field list this renders
draft: "https://json-schema.org/draft/2020-12/schema"
additional_properties: null   # false | true - asked once, then held
example_instances: false
confirmed_facts: []     # only what the user actually said
open_questions: []      # the unanswered ones, in the order worth asking
```

`source_module` is the one field this skill needs that a module skill does not have. If it
is unknown, ask which table the contract is for, because a schema built from a guess
rejects the real data.

### Step 4 - Recommend the smallest workflow

Build an already requested artifact without asking again. For advice-only requests, give a short recommendation and offer the relevant artifact.

**Recommended approach:** one object schema, one property per confirmed field, no
`required` entry the field list does not mark as required, and no `enum` the field list
does not define. Strictness only where the contract is closed.

**Why this one:** a schema's damage is asymmetric. A property it omits passes data nobody
reviewed; a property it marks required, or an `enum` it invents, rejects data that was
perfectly valid. Confirm the closed rules and stay silent on the rest.

**Workflow:** Field list confirmed -> Properties typed -> Requiredness applied from the
source -> (validated) -> Published as the contract

### Step 5 - Build only on request

Once the user asks, emit the schema as data only. Keep prose outside machine-readable data; provide file links and material limitations separately. Property names come from the confirmed field list, identical to the CSV, SQL,
spreadsheet and Notion names, in the same order. Never rename a property independently.

Default draft:

```text
https://json-schema.org/draft/2020-12/schema
```

#### Type mapping

| Canonical type | JSON Schema |
|---|---|
| id | `integer` or `string`, matching the confirmed source |
| title | `string` |
| text | `string` |
| long_text | `string` |
| number | `number` |
| currency | `number` |
| percentage | `number` |
| date | `string`, `format: date` |
| datetime | `string`, `format: date-time` |
| checkbox | `boolean` |
| select | `string` |
| multi_select | `array` of `string` |
| url | `string`, `format: uri` |
| email | `string`, `format: email` |
| phone | `string` |
| relation | `string` or `integer`, matching the confirmed reference key |
| files | `array` or `string`, only when the source structure defines it |

#### Required

A property goes in `required` only when the parent skill marks it required, or the user
explicitly confirms it. Unknown requiredness means optional, and requiredness is never
inferred from what a business obviously needs - a calculated value is never required when
its source may legitimately be missing.

#### Select options

`enum` only for confirmed options:

```json
{
  "Status": {
    "type": "string",
    "enum": ["Draft", "Filed", "Paid"]
  }
}
```

Never invent an enum value. Where options are a starting set rather than a confirmed
taxonomy, leave the property a plain `string` and say the options are not yet fixed.

#### Additional properties

`"additionalProperties": false` only when the contract is meant to be strict:

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "...",
  "type": "object",
  "properties": {},
  "required": []
}
```

If strictness is unknown and it matters, ask the one question in Step 2. Otherwise follow
the parent skill's convention.

#### Null handling

Do not add `null` to a type automatically. Allow it only where the parent schema
explicitly distinguishes null from missing. For unknown or optional data, prefer omission
over invented null semantics - a validator that accepts `null` where the data model has no
such value is a rule nobody agreed to.

#### Examples and descriptions

No `examples`, no instance data, and no `description` beyond what the source field
definition supports. Examples only when the user asks for them, and then obviously fake.
A description that invents meaning becomes the spec, and the spec then rejects real data.

#### Calculated fields

A calculated output field is represented by its data type and nothing else. The schema
does not carry the calculation, and a consumer that reads the field gets the value the
producing system computed - never one this schema invents.

#### Before you hand it over

```
Property names exactly match the canonical fields?
Types aligned with the source?
Every `required` entry supported by the source?
Every `enum` confirmed?
No invented formats?
No fake examples?
No schema drift against the other artifacts?
```

## Field Reference

This skill has no Field Reference of its own, and it must not grow one. The active
module's Field Reference is the single source: its property names here, its CSV columns,
its SQL columns and its Notion properties are the same field list, so a payload that
validates is a payload the module can read.

If the field list is not in front of you, read `skills/<slug>/SKILL.md` for the module in
play. If it is missing or ambiguous, ask which table the contract is for and stop.

## Input Modules

A helper has no field list of its own, so its input is a module: the Field Reference
that module already confirmed. Read that section - field names, types, order,
requiredness, options and calculations - and render exactly that. The list below is
every module that owns a field list, grouped by the layer its catalog gives it, and it
is generated from those catalogs and the module files, so it cannot name a module that
does not exist. `references/catalog.md` is the index to show a user; the module's own
`SKILL.md` holds the field list.

**Layer 1: Foundation** - 6 modules

- `skills/access-matrix/SKILL.md` - Access Matrix (16 fields)
- `skills/organization-design/SKILL.md` - Organization Design (13 fields)
- `skills/policy-acknowledgement/SKILL.md` - Policy Acknowledgement (12 fields)
- `skills/policy-library/SKILL.md` - Policy Library (14 fields)
- `skills/sop-company-wiki/SKILL.md` - SOP & Company Wiki (12 fields)
- `skills/accounting-software-selection/SKILL.md` - Accounting Software Selection (57 fields)

**Layer 2: Acquire** - 3 modules

- `skills/candidate-talent-pool/SKILL.md` - Candidate Talent Pool (17 fields)
- `skills/recruitment-pipeline/SKILL.md` - Recruitment Pipeline (21 fields)
- `skills/salary-benchmarking/SKILL.md` - Salary Benchmarking (13 fields)

**Layer 3: Onboard** - 9 modules

- `skills/asset-it-management/SKILL.md` - Asset & IT Management (19 fields)
- `skills/buddy-program-manager/SKILL.md` - Buddy Program Manager (12 fields)
- `skills/company-email-accounts/SKILL.md` - Company Email & Accounts (23 fields)
- `skills/intern-program/SKILL.md` - Intern Program (20 fields)
- `skills/offer-appointment/SKILL.md` - Offer & Appointment (18 fields)
- `skills/onboarding-playbook/SKILL.md` - Onboarding Playbook (9 fields)
- `skills/people-directory/SKILL.md` - People Directory (28 fields)
- `skills/pre-boarding/SKILL.md` - Pre-boarding (14 fields)
- `skills/probation-tracker/SKILL.md` - Probation Tracker (19 fields)

**Layer 4: Manage** - 15 modules

- `skills/360-feedback-system/SKILL.md` - 360° Feedback System (11 fields)
- `skills/attendance/SKILL.md` - Attendance (15 fields)
- `skills/capacity-workload-planner/SKILL.md` - Capacity & Workload Planner (12 fields)
- `skills/disciplinary-pip-tracker/SKILL.md` - Disciplinary & PIP Tracker (17 fields)
- `skills/expense-management/SKILL.md` - Expense Management (18 fields)
- `skills/issue-grievance-tracker/SKILL.md` - Issue & Grievance Tracker (19 fields)
- `skills/kpi-tracker/SKILL.md` - KPI Tracker (18 fields)
- `skills/leave-management/SKILL.md` - Leave Management (17 fields)
- `skills/okr-system/SKILL.md` - OKR System (20 fields)
- `skills/payroll-finance/SKILL.md` - Payroll & Finance (19 fields)
- `skills/performance-management/SKILL.md` - Performance Management (22 fields)
- `skills/team-calendar/SKILL.md` - Team Calendar (13 fields)
- `skills/time-tracking/SKILL.md` - Time Tracking (20 fields)
- `skills/expense-accounting/SKILL.md` - Expense Accounting (22 fields)
- `skills/salary-wage-accounting/SKILL.md` - Salary & Wage Accounting (27 fields)

**Layer 5: Develop** - 9 modules

- `skills/competency-matrix/SKILL.md` - Competency Matrix (9 fields)
- `skills/course-upskilling-requests/SKILL.md` - Course & Upskilling Requests (22 fields)
- `skills/gamification-engine/SKILL.md` - Gamification Engine (11 fields)
- `skills/knowledge-base/SKILL.md` - Knowledge Base (12 fields)
- `skills/learning-career-development/SKILL.md` - Learning & Career Development (19 fields)
- `skills/mentorship-program/SKILL.md` - Mentorship Program (16 fields)
- `skills/promotion-upgrade-requests/SKILL.md` - Promotion & Upgrade Requests (25 fields)
- `skills/recognition-rewards/SKILL.md` - Recognition & Rewards (14 fields)
- `skills/skill-gap-analysis/SKILL.md` - Skill Gap Analysis (14 fields)

**Layer 6: Engage** - 7 modules

- `skills/announcement-board/SKILL.md` - Announcement Board (13 fields)
- `skills/culture-retention/SKILL.md` - Culture & Retention (18 fields)
- `skills/dei-dashboard/SKILL.md` - DEI Dashboard (11 fields)
- `skills/employee-suggestion-hub/SKILL.md` - Employee Suggestion Hub (13 fields)
- `skills/events-activities/SKILL.md` - Events & Activities (20 fields)
- `skills/health-wellness/SKILL.md` - Health & Wellness (13 fields)
- `skills/internal-communication/SKILL.md` - Internal Communication (12 fields)

**Layer 7: Protect** - 13 modules

- `skills/admin-access-register/SKILL.md` - Admin Access Register (22 fields)
- `skills/audit-log/SKILL.md` - Audit Log (11 fields)
- `skills/board-governance/SKILL.md` - Board & Governance (16 fields)
- `skills/contract-document-renewal/SKILL.md` - Contract & Document Renewal (16 fields)
- `skills/data-privacy-controls/SKILL.md` - Data Privacy Controls (12 fields)
- `skills/document-management-system/SKILL.md` - Document Management System (13 fields)
- `skills/esop-equity-tracker/SKILL.md` - ESOP & Equity Tracker (14 fields)
- `skills/legal-compliance-vault/SKILL.md` - Legal & Compliance Vault (12 fields)
- `skills/tax-register/SKILL.md` - Tax Register (21 fields)
- `skills/template-library/SKILL.md` - Template Library (9 fields)
- `skills/source-document-filing/SKILL.md` - Source Document & Filing (22 fields)
- `skills/tds-booking-payment/SKILL.md` - TDS Booking & Payment (25 fields)
- `skills/audit-preparation/SKILL.md` - Audit Preparation (19 fields)

**Layer 8: Operate** - 16 modules

- `skills/budget-cash-flow/SKILL.md` - Budget & Cash Flow (15 fields)
- `skills/clients-accounts/SKILL.md` - Clients & Accounts (21 fields)
- `skills/invoices-billing/SKILL.md` - Invoices & Billing (26 fields)
- `skills/payments-received/SKILL.md` - Payments Received (13 fields)
- `skills/project-based-performance/SKILL.md` - Project-Based Performance (14 fields)
- `skills/projects-work-management/SKILL.md` - Projects & Work Management (22 fields)
- `skills/remote-work-tracker/SKILL.md` - Remote Work Tracker (12 fields)
- `skills/vendor-contractor-management/SKILL.md` - Vendor & Contractor Management (14 fields)
- `skills/purchase-accounting/SKILL.md` - Purchase Accounting (29 fields)
- `skills/sales-accounting/SKILL.md` - Sales Accounting (33 fields)
- `skills/receipt-accounting/SKILL.md` - Receipt Accounting (23 fields)
- `skills/payment-accounting/SKILL.md` - Payment Accounting (24 fields)
- `skills/petty-cash-management/SKILL.md` - Petty Cash Management (24 fields)
- `skills/day-book/SKILL.md` - Day Book (31 fields)
- `skills/party-ledger-reconciliation/SKILL.md` - Party / Ledger Reconciliation (27 fields)
- `skills/inventory-stock-reconciliation/SKILL.md` - Inventory / Stock Reconciliation (28 fields)

**Layer 9: Analyze** - 7 modules

- `skills/advanced-analytics-dashboard/SKILL.md` - Advanced Analytics Dashboard (11 fields)
- `skills/data-export-engine/SKILL.md` - Data Export Engine (11 fields)
- `skills/notification-reminder-hub/SKILL.md` - Notification & Reminder Hub (12 fields)
- `skills/reports-analytics/SKILL.md` - Reports & Analytics (11 fields)
- `skills/stakeholder-investor-reports/SKILL.md` - Stakeholder & Investor Reports (10 fields)
- `skills/monthly-closing-statements/SKILL.md` - Monthly Closing & Statements (32 fields)
- `skills/credit-cycle-analysis/SKILL.md` - Debtor & Creditor Credit-Cycle Analysis (33 fields)

**Layer 10: Exit** - 2 modules

- `skills/alumni-re-hire-tracker/SKILL.md` - Alumni & Re-hire Tracker (12 fields)
- `skills/offboarding-exit/SKILL.md` - Offboarding & Exit (18 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 1: Foundation** - 1 module

- `skills/accounting-software-selection/SKILL.md` - Accounting Software Selection (57 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 2: Document** - 1 module

- `skills/source-document-filing/SKILL.md` - Source Document & Filing (22 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 3: Record** - 4 modules

- `skills/purchase-accounting/SKILL.md` - Purchase Accounting (29 fields)
- `skills/sales-accounting/SKILL.md` - Sales Accounting (33 fields)
- `skills/receipt-accounting/SKILL.md` - Receipt Accounting (23 fields)
- `skills/payment-accounting/SKILL.md` - Payment Accounting (24 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 4: Cash** - 2 modules

- `skills/petty-cash-management/SKILL.md` - Petty Cash Management (24 fields)
- `skills/day-book/SKILL.md` - Day Book (31 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 5: Expense & Payroll** - 2 modules

- `skills/expense-accounting/SKILL.md` - Expense Accounting (22 fields)
- `skills/salary-wage-accounting/SKILL.md` - Salary & Wage Accounting (27 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 6: Statutory** - 1 module

- `skills/tds-booking-payment/SKILL.md` - TDS Booking & Payment (25 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 7: Reconcile** - 2 modules

- `skills/party-ledger-reconciliation/SKILL.md` - Party / Ledger Reconciliation (27 fields)
- `skills/inventory-stock-reconciliation/SKILL.md` - Inventory / Stock Reconciliation (28 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 8: Close & Analyse** - 2 modules

- `skills/monthly-closing-statements/SKILL.md` - Monthly Closing & Statements (32 fields)
- `skills/credit-cycle-analysis/SKILL.md` - Debtor & Creditor Credit-Cycle Analysis (33 fields)

**Sub-pack `accounting-audit-system-builder` - Layer 9: Audit** - 1 module

- `skills/audit-preparation/SKILL.md` - Audit Preparation (19 fields)

**Sub-pack `brand-growth-system-builder` - Layer 1: Foundation** - 1 module

- `skills/free-design-resources/SKILL.md` - Free Design Resources (18 fields)

**Sub-pack `brand-growth-system-builder` - Layer 2: Brand Design** - 3 modules

- `skills/design-theme-guide/SKILL.md` - Design Theme Guide (24 fields)
- `skills/logo-image-design/SKILL.md` - Logo & Image Design (20 fields)
- `skills/brand-kit-print-collateral/SKILL.md` - Brand Kit & Print Collateral (23 fields)

**Sub-pack `brand-growth-system-builder` - Layer 3: Acquire** - 4 modules

- `skills/business-website-setup/SKILL.md` - Business Website Setup (24 fields)
- `skills/gbp-local-seo-intent/SKILL.md` - GBP & Local SEO Intent (26 fields)
- `skills/seo-directory-backlinks/SKILL.md` - SEO Directories & Backlinks (22 fields)
- `skills/linktree-link-hub/SKILL.md` - Link-in-Bio Hub (16 fields)

**Sub-pack `brand-growth-system-builder` - Layer 6: Engage** - 3 modules

- `skills/business-email-template/SKILL.md` - Business Email Templates (22 fields)
- `skills/presentation-deck/SKILL.md` - Presentation Deck (18 fields)
- `skills/social-media-setup/SKILL.md` - Social Media Setup (22 fields)

**Sub-pack `brand-growth-system-builder` - Layer 7: Protect** - 1 module

- `skills/code-of-conduct/SKILL.md` - Professional Code of Conduct (17 fields)

**Sub-pack `brand-growth-system-builder` - Layer 8: Operate** - 1 module

- `skills/observability-cloud-planning/SKILL.md` - Cloud and Observability Planning (24 fields)

If the user has not named a module, ask which one before building: a file rendered from
a guess is the guess again, in a format the user did not choose.

## Select Options

`enum` values are the confirmed taxonomy, never a starting set presented as final. Where
the business has not settled its options, the property stays a `string` and the mapping
notes that the options are open - a schema is a contract, and an unconfirmed list becomes
a rejection waiting for a real record.

## Relations

A relation is a reference key: `string` or `integer`, matching whatever the source uses
as the key. The schema does not describe the target table, does not check that the target
exists, and cannot express the link as a reference. Do not add a property for the target's
fields; that is a second schema, and the user has not asked for one.

## Examples

**Prompt**

```
Give me a JSON Schema for the invoices table so our API can validate a payload.
```

**Answered in one message, no intake needed** - the field list was already confirmed:

```
Read skills/invoices-billing/SKILL.md for the field list, then emit the draft 2020-12
object schema with those properties in that order, `required` carrying only the fields the
module marks required, and `additionalProperties: false` only if the payload is closed.
```

**Prompt**

```
The API rejected a payload because Amount was a string.
```

**Fix only** - one rule, no rewrite:

> `Amount` is `number` in the schema, so `"1250.50"` fails. Send it unquoted. The same
> applies to every numeric field, and dates stay ISO strings in `format: date`.

**Documented shape** - a strict schema over a confirmed field list. The properties below
are a documentation example: emit the real field list, not this one.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Invoice Register",
  "type": "object",
  "additionalProperties": false,
  "properties": {
      "Invoice ID": { "type": "string" },
      "Client": { "type": "string" },
      "Invoice Date": { "type": "string", "format": "date" },
      "Total": { "type": "number" },
      "Status": { "type": "string", "enum": ["Draft", "Sent", "Paid", "Overdue"] }
  },
  "required": ["Client", "Total", "Status"]
}
```

## Best Practices

- One question per message, and only one that changes the contract.
- Reuse everything already confirmed, including by the module that owns the list.
- Exact property names, in the same order, in every artifact of the same field list.
- No guessed `required` entries, no invented `enum` values, no invented formats.
- Strictness only where the contract is closed.
- No example objects, and no descriptions that invent meaning.
- Output only what was asked for: no CSV, no SQL, no mapping beside it.

## Limitations

- It validates structure. It does not check a value against a database, confirm that a
  client exists, or compute anything.
- A schema is only as good as the field list behind it, and it cannot repair a list that
  was never confirmed.
- Formats such as `date` and `email` are annotations: many validators treat them as
  advisory, so a payload that validates may still be wrong.
- No versioning, no publication, no registry, and no CI wiring. That is the consuming
  system's job.
- Cross-field rules - a due date after an invoice date, a total equal to a sum - are not
  expressible here and are not checked.
- Nothing is verified until the user validates a real payload against it.

## Security & Safety Notes

Never put a secret in a schema. Never embed password, token, API key, banking or health values as defaults or examples.
A requested schema may describe a sensitive field without containing its real value.

Never put real personal data in an `examples` block. Examples are obviously fake, and a
schema is published in places a spreadsheet is not.

If the user pastes a real payload to debug it, describe the failing rule instead of
echoing unnecessary personal data. Do not claim that deleting a message erases service storage.

## Common Pitfalls

- **Problem:** fields the business treats as mandatory are not in `required`.
  **Solution:** requiredness comes from the confirmed field list, not from intuition. If
  the user confirms it, it is added; if not, it stays optional and rejecting real data is
  the worse failure.
- **Problem:** an `enum` rejects a status the business actually uses.
  **Solution:** use `enum` only for a confirmed taxonomy. Where the options are a starting
  set, the property is a plain `string`.
- **Problem:** `"null"` is allowed everywhere, or nowhere it should be.
  **Solution:** allow `null` only where the source distinguishes null from missing.
  Otherwise omit the field instead of sending an invented null.
- **Problem:** the schema has `additionalProperties: false` and the sender is a partner
  whose payload carries one extra field.
  **Solution:** that strictness is a decision, not a default. Ask once, and loosen it
  where the contract is open.
- **Problem:** a calculation is expected of a computed field.
  **Solution:** the schema carries the type only. The producing system computes the
  value, and this skill does not restate the rule.
- **Problem:** the property names differ from the module's.
  **Solution:** they come from the module's Field Reference. A renamed property is a
  renamed column, and the two files stop being the same field list.

## Related Skills

- [Module Catalog](../../CATALOG.md) - find the relevant module, then read its skill.
- @csv-manual-export - the same field list as a file for a system that reads CSV.
- @spreadsheet-manual-build - the same field list as a formatted workbook.

## Reusable Prompt

```
I need a JSON Schema for [database], from the fields we already agreed.
Do not ask me for anything I have already told you.
Give me a draft 2020-12 object schema with one property per field, the same names and order
as the rest of the outputs, `required` only for the fields we confirmed as required, and
`enum` only for options we have actually settled. Tell me separately if strictness would
reject a valid payload. No examples unless I ask.
```
