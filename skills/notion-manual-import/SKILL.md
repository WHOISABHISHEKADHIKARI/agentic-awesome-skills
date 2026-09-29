---
name: notion-manual-import
description: 'Notion Manual Import: the Notion step for any module - CSV, property mapping, import steps and verification for the field list the active module confirmed. Use whenever the user picks Notion.'
category: business
risk: safe
source: self
source_type: self
date_added: "2026-09-28"
author: WHOISABHISHEKADHIKARI
tags: [notion, csv, import, manual, operations, template, helper]
tools: []
source_repo: WHOISABHISHEKADHIKARI/sme-ops-system-builder
---

# Notion Manual Import

**What it is:** the Notion step for every module - a CSV, a property mapping and the
click-path to import, for a user who will upload the database themselves. Any module that
gets a selected Notion output routes that step here, so the mapping and the import steps
exist in exactly one place.

## Overview

Prepares a database so the user can upload it into Notion by hand. It handles the
confirmed fields, the CSV, the Notion property mapping, select and status options, the
manual import steps, and the post-import verification.

This is a helper: it defines no table of its own and renders whatever field list the
active module already confirmed, so its CSV and mapping are derived, never re-invented.
It is the Notion workflow, not a consolation prize - the module confirms the fields and
hands the Notion step to this file.

Manual outputs need no workspace connection. A requested live build uses the shared
contract to verify available tools and the destination before making changes.

Layer: n/a. Fits: every stage. Table code: n/a - it renders the active module's table.

## When to Use This Skill

- upload this to Notion
- give me a Notion template
- I will upload it manually
- create a CSV for Notion
- give me Notion import instructions
- Notion is not connected
- set this up in Notion
- make this Notion-ready
- show me how to create this database manually

Use it whenever the user selects Notion as an output, whatever module is active. Also use
it when another skill produces a database structure but direct Notion creation is
unavailable, or whenever the user requests a manual route.

This helper owns the mapping for both manual output and an authorized connected build.

## How It Works

Follow the shared execution contract. The module-specific rules below define only domain fields, decisions, calculations, and safety constraints.

### Step 1 - Identify intent

Read the request and pick the intent before asking anything.

- "I will upload it myself", "Notion is not connected", "show me how" -> manual setup; go
  to Step 2.
- "just give me the CSV" -> import file only. Output: CSV alone.
- "I already have the CSV, what do I set" -> mapping only. Output: property mapping alone.
- "it imported but everything is Text" -> fix existing import. Output: correction
  instructions for the properties that are wrong, and nothing else unless asked.
- "Notion connected" -> verify tool access. Continue a previously requested workspace
  build only if the required tools and destination are available; otherwise explain the blocker.

Never rebuild everything when a correction is what was asked for.

### Step 2 - Ask only what is missing

Skip anything the user already answered, in any earlier message, including answers given
to the module skill that owns the field list. Reuse the database name, the field names and
types, the select options, the statuses, the relations, the currency fields, the date
fields and the IDs. Never ask for information the user has already provided.

Ask one short question per message, and only when the answer changes the output:

> **Q:** Do you want an empty template or example rows?

If it does not materially change the requested output, do not ask, and default to no
example rows:

```yaml
example_rows: false
```

### Step 3 - Hold the internal context

Hold the answers in this shape. It stays internal - it is not shown to the user unless
they ask, and it never carries a value the user did not give.

```yaml
module: notion-manual-import
intent: null              # set in Step 1, one of: manual setup, import file, mapping, fix
source_module: null       # the module whose field list this renders
notion_connected: null    # true | false | unknown - never assumed either way
requested_outputs: []     # csv | mapping | instructions | verification
example_rows: false
confirmed_facts: []       # only what the user actually said
open_questions: []        # the unanswered ones, in the order worth asking
```

`source_module` is the only field this skill needs that a module skill does not have. If
it is unknown, ask which database to prepare, because a CSV without a confirmed field list
is a guess.

### Step 4 - Recommend the smallest workflow

Produce an already requested output without asking again. For advice-only requests, give a short recommendation and offer the relevant output.

**Recommended approach:** One CSV with a header of the exact field names, one property
mapping table beside it, and the import click-path. Nothing else is needed to get a
working database.

**Why this one:** a CSV carries no types, so the import is the easy half and the property
configuration is the half that silently goes wrong. Doing the mapping up front is the
difference between a database that filters and one that is a wall of Text.

**Workflow:** Field list confirmed -> CSV exported -> Database created -> CSV imported ->
Properties converted -> Verified

Never force a connected integration and never force automation. For a requested connected build, use available tools under the shared contract.

### Step 5 - Build only on request

Once the user asks, emit only the pieces they requested, as data only. Keep prose outside machine-readable data; provide file links and material limitations separately. Every column name comes from the source module's field list, in
the same order, in the CSV and in the mapping.

For a manual request, emit the requested files or mapping directly. For a live request,
verify tools and destination, apply this mapping, and report only confirmed changes.

#### CSV

UTF-8, with a byte order mark so Excel opens the text correctly. The first row holds the
exact field names. Do not add fake records.

```csv
Field 1,Field 2,Field 3
```

Example rows only when the user explicitly asked for them, and then obviously fake.

#### Property mapping

CSV cannot preserve Notion property types, so the mapping is always emitted separately,
in this shape:

| CSV column | Notion property | After import |
|---|---|---|
| Name | Title | Set as database title |
| Description | Text | Leave as Text |
| Status | Select | Convert to Select |
| Due Date | Date | Convert to Date |
| Amount | Number | Set number format |
| Notes | Text | Leave as Text |

Use the actual confirmed fields, not this illustration.

#### Property type rules

| Canonical type | Notion property |
|---|---|
| id | Text to preserve source IDs; separate Unique ID only if requested |
| title | Title |
| text | Text |
| long_text | Text |
| number | Number |
| currency | Number with currency format |
| percentage | Number; convert 0–100 to a fraction before percent formatting |
| date | Date |
| datetime | Date |
| checkbox | Checkbox |
| select | Select |
| multi_select | Multi-select |
| url | URL |
| email | Email |
| phone | Phone |
| person | Person |
| relation | Relation |
| files | Files |

Never map money to Text. Never map dates to Text unless the source explicitly requires
it. A currency format is a format choice, never a currency assumption: do not pick the
currency for the user.

#### Manual import steps

Give the shortest click-path that works. Notion's labels move between versions, so name
the action and say the label may differ rather than claiming a button exists.

1. Use Notion’s CSV import action to create a database from the file.
2. Confirm the destination and imported column mapping; do not first create a duplicate database.
3. For an existing database, use its CSV merge/import action only when intended and check for duplicates.
4. Verify the properties below. For a header-only file that the importer rejects, create
   the properties manually instead of adding fake business records.

Check [Notion’s import guidance](https://www.notion.com/help/import-data-into-notion)
for the current UI and supported relation mapping.

#### Property configuration order

After import, tell the user to convert properties in this order, and only the ones that
exist:

```text
Title
→ Dates
→ Numbers
→ Currency
→ Select fields
→ Status fields
→ IDs
→ Relations
```

#### Select options

For every `select` or `multi_select` field, list only the confirmed options, as
suggestions the user adds after import. Do not invent statuses.

#### IDs

Preserve imported identifiers as Text. A Notion Unique ID is a separate generated
property, not a replacement for external IDs or the required Title property. Use it only
when requested, and never invent a prefix. Map exactly one suitable existing field to
Title; if none is suitable, disclose the technical title field needed for Notion.

#### Relations

A CSV import does not create a working relation. If a field is a relation:

1. import the base database first
2. import the related database
3. convert the field to Relation
4. select the target database
5. verify the linked records by hand

Never pretend a text column became a working relation automatically.

#### Calculations

Do not place business calculations inside the CSV unless explicitly requested. For a
value such as `Net Tax Payable`, `Days to Due`, `Balance`, `Variance` or `Total`, decide
first whether the source module defines it as an entered value, a formula, or something
computed elsewhere, and preserve that. Never invent a formula. If the parent skill says a
calculation belongs in accounting or tax software, that rule stands.

#### Output modes

| The user asks for | Emit |
|---|---|
| the CSV | the CSV alone |
| the mapping | the mapping alone |
| instructions | the shortest useful manual setup steps |
| everything | CSV, mapping, options, import steps, verification checklist |

#### Verification

After the import, ask the user to verify the database name, the field names, the property
types, the date and currency formatting, the select and status options, the ID setup and
the relations. The imported database is not verified until those match the source schema.

## Field Reference

This skill has no Field Reference of its own, and it must not grow one. The active
module's Field Reference is the single source: its CSV header, its SQL, its JSON Schema
and its Notion mapping are the four artifacts, and this skill reformats the same field
list for a manual import rather than defining a fifth.

If the source module's field list is not in front of you, read `skills/<slug>/SKILL.md`
for the module in play. If it is missing or ambiguous, ask which database to prepare and
stop - a header built from a guess imports as a wall of Text that the user then has to
fix by hand.

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

Option lists belong to the source module, not to this skill. Emit them as a starting set
to add after import, and never as a confirmed taxonomy. Where the user has supplied their
own values, the user's values win.

## Relations

Relations are configured after both databases exist, in the order above. In a manual
import the target database has to exist first, so a relation column arrives as Text and
is converted by hand. Say so rather than promising a working link.

## Examples

**Prompt**

```
Notion is not connected. I want to build my tax register myself - what do I do?
```

**Answered in one message, no intake needed** - the module and the route were both named:

```
Read skills/tax-register/SKILL.md for the field list, then emit the header-only CSV, the
property mapping and the import steps.
```

**Prompt**

```
I already imported my tax register but every column came in as Text.
```

**Mapping only** - correction instructions, no rebuild:

> Convert `Tax Period Start` and `Tax Period End` to Date, `Tax Collected on Sales`,
> `Tax Paid on Purchases`, `Withholding Tax Deducted`, `Withholding Tax Paid to Us` and
> `Net Tax Payable` to Number and set the currency format to the currency your business
> uses, `Status` and `Tax Type` to Select, and `Tax ID` to Unique ID with the prefix from
> the source schema. Leave `Tax Period`, `Tax Filing Reference` and `Notes` as Text.

**Documented shape** - a tax register field list, header-only CSV and mapping. The rows
below are documentation examples only. Emit empty templates unless the user explicitly
requests examples.

```csv
Tax Record,Tax Type,Tax Period,Tax Period Start,Tax Period End,Tax Collected on Sales,Tax Paid on Purchases,Withholding Tax Deducted,Withholding Tax Paid to Us,Net Tax Payable,Currency,Tax Filing Due Date,Filed Date,Payment Date,Tax Filing Reference,Prepared By,Reviewed By,Days to Due,Status,Notes,Tax ID
```

| CSV column | Notion property | After import |
|---|---|---|
| Tax Record | Title | Use as database title |
| Tax Type | Select | Add confirmed tax types |
| Tax Period | Text | Leave as Text |
| Tax Period Start | Date | Convert to Date |
| Tax Period End | Date | Convert to Date |
| Tax Collected on Sales | Number | Set currency format |
| Tax Paid on Purchases | Number | Set currency format |
| Withholding Tax Deducted | Number | Set currency format |
| Withholding Tax Paid to Us | Number | Set currency format |
| Net Tax Payable | Number | Set currency format |
| Currency | Text | Leave as Text |
| Tax Filing Due Date | Date | Convert to Date |
| Filed Date | Date | Convert to Date |
| Payment Date | Date | Convert to Date |
| Tax Filing Reference | Text | Leave as Text |
| Prepared By | Text | Leave as Text |
| Reviewed By | Text | Leave as Text |
| Days to Due | Number | Convert to Number |
| Status | Select | Add confirmed statuses |
| Notes | Text | Leave as Text |
| Tax ID | Unique ID | Prefer automatic ID |

## Best Practices

- One question per message, and only one that changes the output.
- Reuse everything already confirmed, including by the module skill that owns the list.
- Keep CSV and Notion field names identical, in the same order.
- Emit the mapping with the CSV every time; a header alone is not an import.
- Recommend the smallest useful solution and never force a connection or an automation.
- No sample records by default, and none that could be mistaken for real ones.
- Separate data storage from business calculations.
- Distinguish the properties Notion sets on import from the ones the user configures.

## Limitations

- It formats another module's schema. It never decides the schema, and it does not create
  the database.
- Everything here is text. Nothing is uploaded, created, converted or connected by this
  skill, and no claim of a completed Notion action may be made on its behalf.
- Property names in the Notion UI change between versions. The click-path is described by
  action, and the user verifies the label.
- Relations, rollups, formulas, permissions and sharing are configured by hand afterwards.
- Select options are a starting set, not the business's confirmed taxonomy.
- A currency format is not a currency. The user names the currency.
- Legal, tax and payroll review is still required before the imported database drives
  real decisions.

## Security & Safety Notes

Never request a Notion password, an authentication token, an API secret, a private
integration secret, or a pasted export of someone's whole workspace.

Never claim the CSV was uploaded, that a database was created, that properties were
changed, or that relations were connected, unless the action actually completed through
an authorized tool. Tool availability depends on the host; manual instructions alone are not evidence of a write.

When data is supplied for a requested review or conversion, use only the necessary
fields and avoid repeating sensitive identifiers. Template requests remain empty by default.
Do not claim that removing a message erases service storage.

## Common Pitfalls

- **Problem:** every column imported as Text and the user assumes the import failed.
  **Solution:** that is normal. A CSV carries no types. Apply the property mapping once,
  after import, in the order above.
- **Problem:** dates or money behave as free text in the new database.
  **Solution:** convert those properties to Date and to Number with the format the user
  names. Never map money to Text.
- **Problem:** select options are missing, or invented.
  **Solution:** add only the options the confirmed schema defines, and let the user rename
  them to match how the business talks.
- **Problem:** the ID column is plain text, or IDs are generated for records that have
  none.
  **Solution:** convert to Unique ID with the source prefix where that fits, or keep the
  imported value as Text. Never mint production IDs.
- **Problem:** relation columns do not link.
  **Solution:** the target database has to exist first. Import both, then convert the
  column to Relation by hand and verify the links.
- **Problem:** the whole table was rebuilt when a conversion was all that was needed.
  **Solution:** emit only the corrections that were asked for.
- **Problem:** the user is told a Notion action happened.
  **Solution:** this skill only emits text. Say the user does the import and the
  configuration, and say which step they are on.

## Related Skills

- [Module Catalog](../../CATALOG.md) - find the relevant module, then read its skill.
- @template-library - where a reusable starting template belongs once one is proven.

## Reusable Prompt

```
I want to put [database] into Notion by hand, without connecting an integration.
Read the field list I already have and do not ask me for anything I have already told you.
Give me a CSV with a header of the exact field names, the Notion property mapping beside
it, the shortest import steps, and what to verify afterwards. No example rows unless I ask.
```
