---
name: accounting-software-selection
description: 'Scores shortlisted accounting packages against 57 evidence-backed fields, emitted as CSV, SQL, JSON Schema or Notion on request. Use for choosing accounting software.'
category: business
risk: safe
source: self
source_type: self
date_added: '2026-09-26'
author: WHOISABHISHEKADHIKARI
tags:
- sme
- accounting
- audit
- finance
- database
- csv
- notion
- sql
- evaluation
tools: []
source_repo: WHOISABHISHEKADHIKARI/sme-ops-system-builder
---

# Accounting Software Selection

**What it is:** The evidence behind a software purchase, recorded so the decision is arguable - and the decision itself still belongs to the business.

## Overview

Works out the smallest useful **Accounting Software Selection** setup for the business in front
of it, then builds it only when asked. The default output is a short recommendation, not a
spreadsheet. Artifacts - CSV, SQL DDL, JSON Schema, Notion mapping - are produced on
request, from one field list so they cannot drift apart.

For a Nepal trading, manufacturing or services business, this is the record that makes the
purchase arguable: requirements ranked, a candidate shortlist, the same demo tests run
against every candidate, the evidence behind every score, cost split so first-year and
three-year totals can be compared, and the evaluation status, selection decision,
rejection reason and deal-breaker flag kept as four separate fields instead of one
opinion. It is an evaluation and decision-support tool, not a bookkeeping, tax-filing,
legal or procurement system.

Four guardrails shape every row.

**Nothing is invented, and nothing is asserted without a source.** Never supply a vendor
capability, a price, a compliance status, a demo result or a stakeholder score that the
user or a named source did not give. What nobody has verified is `Untested` for a
capability and an empty cost cell with `Unknown` in `Notes` for a price. A capability
nobody has looked at is `Untested`; it is not `1 Missing`, and a blank is never filled
with a plausible number so the row looks finished.

**This skill never selects.** It may summarise the evidence, name the requirements a
candidate fails, and state that a Must-have is failed. It must not declare a package the
best option, announce a winner, state a compliance conclusion or record an approval. The
business fills `Selection Decision` itself.

**Fact and opinion stay apart.** The thirty capability fields carry what the vendor
documented or demonstrated. The three `Rating` fields carry the named evaluator's own
judgement. A brochure claim is never copied into a Rating, and an evaluator's impression
is never written into a capability field. An average across evaluators is not objective
truth and a score never becomes a recommendation.

**Nepal tax and statutory claims need cited, current evidence.** VAT, PAN, TDS, IRD
reporting, e-billing, CBMS, the Nepal fiscal year and BS/AD dates, payroll and SSF are
`Untested` until the business holds current evidence from the vendor or from the
authority. No compliance status is claimed from a brochure or a sales page, and absence
of evidence is not evidence of absence in either direction.

Layer: Layer 1: Foundation. Fits: Growth stage. Table code: n/a.

## When to Use This Skill

- accounting software selection
- accounting and erp software comparison
- vendor demo evaluation sheet
- accounting package quotation tracker
- three year software cost comparison

Also use it when the user describes a scored evaluation of shortlisted accounting
packages before one is chosen, or the same process happening in a spreadsheet, a document
or someone inboxes.

Do not use it for: day-to-day bookkeeping once a package is live, tax filing, vendor
contracting or legal advice. This skill produces empty templates only - it never holds or
processes real employee, customer, supplier or vendor data.

## How It Works

Follow the shared execution contract. The module-specific rules below define only domain fields, decisions, calculations, and safety constraints.

### Step 1 - Identify intent

Read the request and pick the intent before asking anything.

- "set up" or "build" or "create" -> the user wants artifacts; go to Step 2.
- "compare" or "which one should we pick" -> the user wants an evaluation; capture the shortlist, then Step 2.
- "our process is ..." or "it is in a sheet" -> the user wants to move an existing evaluation; capture it, then Step 2.
- "is this right" or "review" or "audit" -> the user wants a check, not a build; answer from what they share.
- "report" or "how do I ..." -> advice question; answer directly and offer the build only if it helps.

Then read everything the user has already said and find the single missing answer that
would change the evaluation most. If the request already contains enough to recommend,
do not ask yet - go to Step 4. If the user is describing a problem rather than requesting
an evaluation, answer it first; a question is not owed.

One message, one short question, no batching. Open with:

> **Q:** Which accounting or ERP packages are currently on your shortlist?

Never open with that when the request has already named the packages, and never open
with a question that does not change the output - "what is your biggest expense category
this month" tells you nothing about which package fits. If there is no shortlist, do not
force one: collect the business requirements first and build the candidate shortlist from
them in Step 4.

Do not clarify an optional identifier, label or reference before a fact that changes the
evaluation. `Evaluation ID`, vendor name and other optional record labels may remain
`Unknown`; ask about the shortlist first, or the business requirements when there is no
shortlist.

### Step 2 - Ask only what is missing

Treat ambiguous replies as unanswered and ask which explicit option the user means. Record unknown values as `Unknown`; `Unknown` is not zero. A record must not be `Done` when a required check fails.

Skip anything the user already answered, in any earlier message. Ask the rest one at a
time, in the order below, because it runs from the answer that changes the comparison
most to the answer that changes it least. Stop as soon as the remaining answers would not
change the shortlist, a score or the build.

1. **Shortlist** - which packages, or that there is none and one has to be built from the requirements.
2. **What the business does** - trading, manufacturing, services, or a mix. This decides which of the 35 categories are worth scoring at all.
3. **Scale** - people, transactions a month, companies, branches, warehouses. Only ask if the answer would change the shortlist.
4. **Requirements and their priority** - ask for the list, then ask for each one to be ranked Must-have, Should-have, Nice-to-have or Not required. The deal-breaker rule needs that ranking before anything is scored.
5. **Nepal requirements** - VAT, PAN, TDS, IRD reporting, e-billing or CBMS, Nepal fiscal year and BS/AD dates, payroll, SSF. Do not assume a package supports any of them.
6. **Platform** - cloud or on-premise, permissions, approvals, maker-checker, backup, security, API, integrations, data export, migration, customization, local support, training.
7. **Money** - which currency, and whether a written quotation is in hand. Take a price only from a quotation.
8. **Outcome** - CSV, SQL DDL, JSON Schema, Notion mapping, a go-live checklist, or just the evaluation. Build nothing that was not asked for.

An answer that does not choose is not an answer. `yes`, `maybe`, `same`, `okay` and `fine`
to a multiple-choice question are rejected, and the choice is re-asked explicitly:

> **Q:** For the accounting scope, which do you mean: **general ledger and bank
> reconciliation only**, or **general ledger, receivables, payables and fixed assets**?

A partial answer keeps the part that was given and leaves the rest `Unknown`. Never fill
the gap.

Never invent an answer. Record it as `Unknown` and carry on, and never re-ask the same
unknown. `Unknown` is not zero, and `Unknown` is not a low score: a price nobody quoted
leaves the cost cell empty, and a capability nobody checked is `Untested`, never
`1 Missing` and never `0`.

### Step 3 - Hold the internal context

Hold the answers in this shape. It stays internal - it is not shown to the user unless
they ask, and it never carries a value the user did not give.

```yaml
module: accounting-software-selection
intent: null            # set in Step 1, one of: set up, compare, review, report, import
scale: null             # Starter | Growth | Scale, only if the answer changes it
areas:
  "Shortlist": null
  "Business activities": null
  "Requirements priority": null
  "Nepal requirements": null
  "Platform and money": null
requirement_priority: null   # each need as Must-have | Should-have | Nice-to-have | Not required
candidates: []          # shortlist, each with its own row and its own evidence
unverified: []          # every capability still Untested and every cost still Unknown
requested_outputs: []   # csv | sql | json | notion | xlsx - requested formats only
confirmed_facts: []     # only what the user actually said
open_questions: []      # the unanswered ones, in the order worth asking
```

`unverified` is the list that must be visible before any recommendation is made. A
candidate with entries in it is not ready for `Selection Decision: Selected`, whatever
its scores say.

### Step 4 - Recommend the smallest workflow

Give a short recommendation, then ask whether to build it. Do not build unprompted, and
do not name a preferred package in it.

**Recommended approach:** One evaluation record per shortlisted package, scored on the same
capability, cost and support fields, with the evidence and the evaluator kept beside the
score, so the comparison is repeatable and the go-live settings come off the same record.

**Why this one:** Software decisions get argued on memory. Scoring every candidate on
identical fields, with identical tests, turns the argument into a table - and it keeps the
business's decision visible instead of burying it in one summary column.

**Workflow:** Requirements → Candidate Shortlist → Vendor Demo → Standardized Tests → Stakeholder Evaluation → Cost/TCO Review → Business Decision → Configuration → Migration → Training → Go-live

**Shortlist:** If the user has no shortlist, build one from the confirmed requirements.
Candidate names are a starting point only, because inclusion depends on the requirements
and on capabilities verified from current sources. Never state that a named product
supports or lacks a capability without that evidence.

**Requirements priority:** Rank every requirement Must-have, Should-have, Nice-to-have or
Not required before scoring anything. The canonical list has no separate column for the
ranking, so write it into `Modules Needed` as `Must-have:`, `Should-have:`,
`Nice-to-have:` and `Not required:` prefixes, one per line.

**Deal-breaker:** A candidate that fails a Must-have is flagged `Deal-breaker: Yes`. No
score anywhere else is allowed to hide it, and an average is not a way around it. `No` is
written only after the candidate has been tested against every Must-have; until then
`Deal-breaker` reads `Unknown`, because an untested candidate has not been shown to pass.

**Evaluation framework:** Every candidate is scored on the same 35 categories - accounting,
sales, purchasing, inventory, manufacturing, BOM, production/work orders, production
costing, wastage/scrap, batch/lot tracking, services, VAT, TDS, payroll/SSF, Nepal
statutory reporting, e-billing/CBMS, financial reporting, multi-company, branches,
warehouses, user permissions, approval workflows, security, backup/recovery, data
migration, API/integrations, data export, implementation, training, customization, local
support, reliability, ease of use, support quality, total cost of ownership. The 33
scored fields cover the 35 categories: `Data Backup & Security` carries both security and
backup/recovery and is scored once, so when a demonstration showed the two at different
levels, write the difference in `Notes` rather than averaging them.

**Scoring and evidence:** 1 Missing or unusable, 2 Major limitations, 3 Adequate, 4
Strong, 5 Comprehensive - plus `Not Required` for a capability the business does not need
and `Untested` for one nobody has checked. A score is written only from vendor
documentation, a vendor demonstration, a trial, an actual test transaction, the written
quotation, or a named evaluator's assessment, and the evidence goes in `Evidence/Source`
with the person in `Evaluated By` and the date it was gathered. `Untested` is not
`1 Missing`: nobody looking is a gap in the evaluation, not a finding.

**Fact and opinion:** the thirty capability fields hold what the vendor documented or
demonstrated. `Reliability Rating`, `Ease of Use Rating` and `Support Quality Rating` hold
the evaluator's own opinion and use the same 1-5 scale with the same meanings, so
`Untested` and `Not Required` stay recordable - a bare number could not say `Untested`,
and a number with no label is a score nobody can check. Never copy one into the other.

**Stakeholders:** Finance/accounts, operations, manufacturing, management, IT/admin, sales
and purchasing can each assess. Keep each evaluator's view attached to their own record
or in their own words and show the spread; an average across evaluators is not objective
truth. If the business wants every evaluator's view kept as a separate row, repeat the
same `Software` value with a different `Evaluated By` - never merge them into one number.

**Standard demo tests:** Every candidate attempts the same script - journal, ledger
posting, bank reconciliation, trial balance, profit and loss, balance sheet; customer,
quotation, invoice, VAT invoice, return, receipt; supplier, purchase order, purchase
invoice, VAT purchase, return, payment; stock receipt, issue, warehouse transfer,
adjustment, valuation; BOM, production order, raw-material consumption, finished goods,
wastage/scrap, production cost; service item, customer/project, service invoice, expense
allocation, profitability; VAT, TDS, statutory report, e-billing/CBMS; payroll run, SSF
calculation, payroll accounting entry; users, permissions, approval workflow,
backup/restore; master data, opening balances, opening inventory, reconciliation. A test
nobody ran is `Untested` on that category and `Not Tested` in `Demo Test Result`; the
count actually attempted goes in `Test Transactions Run`.

**Cost, currency and the totals:** Split the cost into the lines the vendor quotes -
licence or subscription, implementation, customization, training, annual renewal, and any
configuration, data migration, hardware, ongoing support, per-user, per-branch or
per-module fee. The row carries columns for the first-year lines this table holds
(`Licence Cost`, `Implementation Cost`, `Customization Cost`, `Training Cost`) and for
`Annual Renewal`; every other quoted line has no column here, so record the amount and
its source in `Evidence/Source` and add it into `First-Year Cost`, or add the columns
deliberately to all four artifacts. Never fold an unquoted cost into `Licence Cost` to
make a total work.

- `First-Year Cost` = `Licence Cost` + `Implementation Cost` + `Customization Cost` + `Training Cost`, plus any other first-year line the vendor quoted.
- `Three-Year TCO` = `First-Year Cost` + (2 x `Annual Renewal`), on a three-year horizon. Change the horizon and the formula if the business sets a different one, and say which horizon was used.

Calculate a total only when every line in it is a number the business actually holds. If
one line is missing, the total is `Unknown` and stays empty - a total built on a guessed
line is a fabricated price. Where a calculated total does not equal the sum of its parts,
record the difference in `Notes` and say which line is unverified. Never change a
component to force the total to agree.

**Money basis:** every cost field holds a plain number with no currency symbol, recorded
exactly as the quotation states it. **NPR is a default, not a rule** - it applies to a
Nepalese cost unless the user names another currency, and then theirs wins; record which
currency each amount is in, beside the quotation, in `Evidence/Source`. Whether a
quotation is tax-inclusive or tax-exclusive is the vendor's statement and is never
assumed: do not add VAT, do not strip it, do not net a deduction out of a fee. Round once,
at the end - each component is written exactly as quoted, and only `First-Year Cost` and
`Three-Year TCO` are rounded, to two decimal places, after the addition.

**Go-live checklist:** On request, a separate checklist covering finance, sales,
purchasing, inventory, manufacturing, services, payroll, Nepal compliance, security,
migration and training, then user acceptance testing, issue resolution, final
reconciliation, management sign-off, final backup, go-live date and post-go-live support.
It is a list the business carries out with the vendor; nothing on it is done here.

**Controls before a decision is recorded:**

- `Evaluation Status` may be `Evaluated` while some capabilities are `Untested`, and that is legitimate only when `Notes` names them. It may not be `Evaluated` while a Must-have is `Untested`: an untested must-have is tested or downgraded with a reason, never scored around.
- `Selection Decision` may not read `Selected` while `Deal-breaker` is `Yes`, and may not read `Selected` while a Must-have is `Untested`.
- `Selection Decision` and `Rejection Reason` are the business's to write. Summarise the evidence and state the deal-breaker; leave the decision open.
- The score is not the verdict. A high total with a failed Must-have is still a failed Must-have.

Then ask: "Want me to build the CSV, SQL DDL, JSON Schema, Notion mapping, or an Excel
workbook from these confirmed rules?"

### Step 5 - Build only on request

Once the user asks for it, derive the fields from the confirmed context and emit the
artifacts as data only, in the order they were asked for. No preamble, no summary, no
closing line. All four come from the single field list in this file, so they cannot drift
apart, and a field never appears in one artifact and not the others.

**A selected Notion output is rendered by `notion-manual-import`, so route the
Notion step there.** When the user selects Notion, hand that step to
@notion-manual-import: it holds the CSV, the property
mapping, the import steps and the verification checklist, and it renders the Field
Reference below instead of defining a table of its own. Do not restate the mapping
here and do not improvise the import steps. Manual CSV and mapping outputs need no
connection. For requested workspace changes, follow the shared contract: verify actual
tool access and the target before writing. A user saying "connected" is not tool evidence.
Never ask for a Notion password or token.

The SQL below is written in PostgreSQL-flavoured DDL. `SERIAL PRIMARY KEY` and
`TIMESTAMP DEFAULT NOW()` are PostgreSQL-specific; on another engine use that engine's
identity column and default-timestamp syntax. `created_at` and `updated_at` are
maintained by the database and are not business fields - they are the only permitted
artifact-only addition, and they stay out of the CSV, the JSON Schema and the Notion
mapping. The DDL carries no index so it runs unchanged anywhere; on a live database
index `Evaluation Status` and `Software`, which are the two columns the sheet is filtered
and reported on.

The example row is fictional and must stay that way: identifiers use the `-EXAMPLE-`
pattern and every name reads `Example ...`. It shows a fully evaluated candidate so the
shape is visible, and the compliance fields deliberately read `Untested` - that is what
they are until the business holds current evidence. For an Excel-compatible CSV, use UTF-8 with a byte order mark so Excel opens the text correctly. A CSV is not an `.xlsx` workbook; create `.xlsx` only when the user requests a workbook. A
CSV carries no types, so after it, name the columns that need a number, date or currency
format applied. Copy the shape, never the values.

```csv
Evaluation ID,Software,Vendor,Business Activities,Modules Needed,Deployment Type,Accounting Coverage,Sales Support,Purchase Support,Inventory Support,Manufacturing Support,BOM Support,Production/Work Order Support,Production Costing,Wastage/Scrap Tracking,Batch/Lot Tracking,Service Management,VAT Support,TDS Support,Payroll/SSF Support,IRD/Statutory Reporting,E-Billing/CBMS Support,Financial Reporting,Multi-Company Support,Branch Support,Warehouse Support,User Access Control,Approval Workflow,Data Backup & Security,Migration Support,Integration/API,Data Export,After-Sales Support,Implementation Support,Training,Customization,Reliability Rating,Ease of Use Rating,Support Quality Rating,Demo Date,Demo Test Result,Test Transactions Run,Licence Cost,Implementation Cost,Customization Cost,Training Cost,Annual Renewal,First-Year Cost,Three-Year TCO,Evaluation Status,Deal-breaker,Selection Decision,Rejection Reason,Evaluated By,Evidence/Source,Notes,Selection ID
EVAL-EXAMPLE-001,Example Product,Example Vendor,Trading and manufacturing,Must-have: general ledger; Must-have: inventory; Must-have: manufacturing; Should-have: multi-branch; Not required: service management,Cloud,5 Comprehensive,4 Strong,4 Strong,5 Comprehensive,4 Strong,4 Strong,3 Adequate,4 Strong,2 Major limitations,2 Major limitations,Not Required,Untested,Untested,Untested,Untested,Untested,4 Strong,Not Required,4 Strong,4 Strong,4 Strong,3 Adequate,4 Strong,4 Strong,2 Major limitations,4 Strong,2 Major limitations,3 Adequate,3 Adequate,2 Major limitations,4 Strong,4 Strong,2 Major limitations,2026-07-18,Partially Passed,25,480000.00,120000.00,65000.00,45000.00,240000.00,710000.00,1190000.00,Evaluated,No,Not Selected,Poor Support,Example Evaluator,ILLUSTRATIVE - vendor demo 2026-07-18; 25 test transactions; written quotation dated 2026-07-25; the three ratings are the evaluator's own view,VAT / TDS / payroll-SSF / IRD reporting / e-billing left Untested - no current evidence held. Service management and multi-company Not required by this business. Ratings are the evaluator's opinion not vendor claims.,(blank)
```

```sql
CREATE TABLE accounting_software_selection (
  evaluation_id VARCHAR(255),
  software VARCHAR(255),
  vendor VARCHAR(255),
  business_activities TEXT,
  modules_needed TEXT,
  deployment_type VARCHAR(100),
  accounting_coverage VARCHAR(100),
  sales_support VARCHAR(100),
  purchase_support VARCHAR(100),
  inventory_support VARCHAR(100),
  manufacturing_support VARCHAR(100),
  bom_support VARCHAR(100),
  production_work_order_support VARCHAR(100),
  production_costing VARCHAR(100),
  wastage_scrap_tracking VARCHAR(100),
  batch_lot_tracking VARCHAR(100),
  service_management VARCHAR(100),
  vat_support VARCHAR(100),
  tds_support VARCHAR(100),
  payroll_ssf_support VARCHAR(100),
  ird_statutory_reporting VARCHAR(100),
  e_billing_cbms_support VARCHAR(100),
  financial_reporting VARCHAR(100),
  multi_company_support VARCHAR(100),
  branch_support VARCHAR(100),
  warehouse_support VARCHAR(100),
  user_access_control VARCHAR(100),
  approval_workflow VARCHAR(100),
  data_backup_security VARCHAR(100),
  migration_support VARCHAR(100),
  integration_api VARCHAR(100),
  data_export VARCHAR(100),
  after_sales_support VARCHAR(100),
  implementation_support VARCHAR(100),
  training VARCHAR(100),
  customization VARCHAR(100),
  reliability_rating VARCHAR(100),
  ease_of_use_rating VARCHAR(100),
  support_quality_rating VARCHAR(100),
  demo_date DATE,
  demo_test_result VARCHAR(100),
  test_transactions_run NUMERIC,
  licence_cost NUMERIC(14,2),
  implementation_cost NUMERIC(14,2),
  customization_cost NUMERIC(14,2),
  training_cost NUMERIC(14,2),
  annual_renewal NUMERIC(14,2),
  first_year_cost NUMERIC(14,2),
  three_year_tco NUMERIC(14,2),
  evaluation_status VARCHAR(100) NOT NULL,
  deal_breaker VARCHAR(100) NOT NULL,
  selection_decision VARCHAR(100),
  rejection_reason VARCHAR(100),
  evaluated_by VARCHAR(255),
  evidence_source VARCHAR(255),
  notes TEXT,
  selection_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT cost_lines_non_negative CHECK (
    licence_cost >= 0 AND implementation_cost >= 0
    AND customization_cost >= 0 AND training_cost >= 0
    AND annual_renewal >= 0 AND first_year_cost >= 0
    AND three_year_tco >= 0
  ),
  CONSTRAINT evaluation_status_values CHECK (evaluation_status IN
    ('Not Evaluated', 'Demo Scheduled', 'Demo Completed', 'Testing', 'Evaluated')),
  CONSTRAINT deal_breaker_values CHECK (deal_breaker IN ('Yes', 'No', 'Unknown'))
);
```

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "Accounting Software Selection",
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "Evaluation ID": {
      "type": "string"
    },
    "Software": {
      "type": "string"
    },
    "Vendor": {
      "type": "string"
    },
    "Business Activities": {
      "type": "string"
    },
    "Modules Needed": {
      "type": "string"
    },
    "Deployment Type": {
      "type": "string"
    },
    "Accounting Coverage": {
      "type": "string"
    },
    "Sales Support": {
      "type": "string"
    },
    "Purchase Support": {
      "type": "string"
    },
    "Inventory Support": {
      "type": "string"
    },
    "Manufacturing Support": {
      "type": "string"
    },
    "BOM Support": {
      "type": "string"
    },
    "Production/Work Order Support": {
      "type": "string"
    },
    "Production Costing": {
      "type": "string"
    },
    "Wastage/Scrap Tracking": {
      "type": "string"
    },
    "Batch/Lot Tracking": {
      "type": "string"
    },
    "Service Management": {
      "type": "string"
    },
    "VAT Support": {
      "type": "string"
    },
    "TDS Support": {
      "type": "string"
    },
    "Payroll/SSF Support": {
      "type": "string"
    },
    "IRD/Statutory Reporting": {
      "type": "string"
    },
    "E-Billing/CBMS Support": {
      "type": "string"
    },
    "Financial Reporting": {
      "type": "string"
    },
    "Multi-Company Support": {
      "type": "string"
    },
    "Branch Support": {
      "type": "string"
    },
    "Warehouse Support": {
      "type": "string"
    },
    "User Access Control": {
      "type": "string"
    },
    "Approval Workflow": {
      "type": "string"
    },
    "Data Backup & Security": {
      "type": "string"
    },
    "Migration Support": {
      "type": "string"
    },
    "Integration/API": {
      "type": "string"
    },
    "Data Export": {
      "type": "string"
    },
    "After-Sales Support": {
      "type": "string"
    },
    "Implementation Support": {
      "type": "string"
    },
    "Training": {
      "type": "string"
    },
    "Customization": {
      "type": "string"
    },
    "Reliability Rating": {
      "type": "string"
    },
    "Ease of Use Rating": {
      "type": "string"
    },
    "Support Quality Rating": {
      "type": "string"
    },
    "Demo Date": {
      "type": "string",
      "format": "date"
    },
    "Demo Test Result": {
      "type": "string"
    },
    "Test Transactions Run": {
      "type": "number"
    },
    "Licence Cost": {
      "type": "number"
    },
    "Implementation Cost": {
      "type": "number"
    },
    "Customization Cost": {
      "type": "number"
    },
    "Training Cost": {
      "type": "number"
    },
    "Annual Renewal": {
      "type": "number"
    },
    "First-Year Cost": {
      "type": "number"
    },
    "Three-Year TCO": {
      "type": "number"
    },
    "Evaluation Status": {
      "type": "string"
    },
    "Deal-breaker": {
      "type": "string"
    },
    "Selection Decision": {
      "type": "string"
    },
    "Rejection Reason": {
      "type": "string"
    },
    "Evaluated By": {
      "type": "string"
    },
    "Evidence/Source": {
      "type": "string"
    },
    "Notes": {
      "type": "string"
    },
    "Selection ID": {
      "type": "integer"
    }
  },
  "required": [
    "Evaluation Status",
    "Deal-breaker"
  ]
}
```

```markdown
| CSV column | Notion property | Set after import |
|---|---|---|
| Evaluation ID | Title | Use as the database title |
| Software | Text | Leave as Text |
| Vendor | Text | Leave as Text |
| Business Activities | Text | Leave as Text |
| Modules Needed | Text | Leave as Text |
| Deployment Type | Select (add options after import) | Convert to Select, add options: "Cloud", "On-premise", "Hybrid" |
| Accounting Coverage | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Sales Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Purchase Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Inventory Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Manufacturing Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| BOM Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Production/Work Order Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Production Costing | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Wastage/Scrap Tracking | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Batch/Lot Tracking | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Service Management | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| VAT Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| TDS Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Payroll/SSF Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| IRD/Statutory Reporting | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| E-Billing/CBMS Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Financial Reporting | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Multi-Company Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Branch Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Warehouse Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| User Access Control | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Approval Workflow | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Data Backup & Security | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Migration Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Integration/API | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Data Export | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| After-Sales Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Implementation Support | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Training | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Customization | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Reliability Rating | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Ease of Use Rating | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Support Quality Rating | Select (add options after import) | Convert to Select, add options: "1 Missing", "2 Major limitations", "3 Adequate", "4 Strong", "5 Comprehensive", "Not Required", "Untested" |
| Demo Date | Date | Convert to Date |
| Demo Test Result | Select (add options after import) | Convert to Select, add options: "Not Tested", "Partially Passed", "Passed", "Failed" |
| Test Transactions Run | Number | Convert to Number |
| Licence Cost | Number (format: currency) | Convert to Number, set format to Currency |
| Implementation Cost | Number (format: currency) | Convert to Number, set format to Currency |
| Customization Cost | Number (format: currency) | Convert to Number, set format to Currency |
| Training Cost | Number (format: currency) | Convert to Number, set format to Currency |
| Annual Renewal | Number (format: currency) | Convert to Number, set format to Currency |
| First-Year Cost | Number (format: currency) | Convert to Number, set format to Currency |
| Three-Year TCO | Number (format: currency) | Convert to Number, set format to Currency |
| Evaluation Status | Select (add options after import) | Convert to Select, add options: "Not Evaluated", "Demo Scheduled", "Demo Completed", "Testing", "Evaluated" |
| Deal-breaker | Select (add options after import) | Convert to Select, add options: "Yes", "No", "Unknown" |
| Selection Decision | Select (add options after import) | Convert to Select, add options: "Selected", "Shortlisted", "Not Selected", "Rejected" |
| Rejection Reason | Select (add options after import) | Convert to Select, add options: "Cost", "Missing Capability", "Poor Fit", "Poor Support", "Implementation Risk", "Security Risk", "User Experience", "Other" |
| Evaluated By | Text | Leave as Text |
| Evidence/Source | Text | Leave as Text |
| Notes | Text | Leave as Text |
| Selection ID | Text (preserve source ID) | Keep imported IDs as Text; optionally add a separate Unique ID property |
```

## Field Reference

| # | Field | Type | SQL | JSON Schema | Notion | CSV example |
|---:|---|---|---|---|---|---|
| 1 | Evaluation ID | `text` | `VARCHAR(255)` | `string` | `Text` | `EVAL-EXAMPLE-001` |
| 2 | Software | `text` | `VARCHAR(255)` | `string` | `Text` | `Example Product` |
| 3 | Vendor | `text` | `VARCHAR(255)` | `string` | `Text` | `Example Vendor` |
| 4 | Business Activities | `long_text` | `TEXT` | `string` | `Text` | `Trading and manufacturing` |
| 5 | Modules Needed | `long_text` | `TEXT` | `string` | `Text` | `Must-have: general ledger; Must-have: inventory; Must-have: manufacturing; Should-have: multi-branch; Not required: service management` |
| 6 | Deployment Type | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Cloud` |
| 7 | Accounting Coverage | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `5 Comprehensive` |
| 8 | Sales Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 9 | Purchase Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 10 | Inventory Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `5 Comprehensive` |
| 11 | Manufacturing Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 12 | BOM Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 13 | Production/Work Order Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `3 Adequate` |
| 14 | Production Costing | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 15 | Wastage/Scrap Tracking | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `2 Major limitations` |
| 16 | Batch/Lot Tracking | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `2 Major limitations` |
| 17 | Service Management | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Not Required` |
| 18 | VAT Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Untested` |
| 19 | TDS Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Untested` |
| 20 | Payroll/SSF Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Untested` |
| 21 | IRD/Statutory Reporting | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Untested` |
| 22 | E-Billing/CBMS Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Untested` |
| 23 | Financial Reporting | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 24 | Multi-Company Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Not Required` |
| 25 | Branch Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 26 | Warehouse Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 27 | User Access Control | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 28 | Approval Workflow | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `3 Adequate` |
| 29 | Data Backup & Security | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 30 | Migration Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 31 | Integration/API | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `2 Major limitations` |
| 32 | Data Export | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 33 | After-Sales Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `2 Major limitations` |
| 34 | Implementation Support | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `3 Adequate` |
| 35 | Training | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `3 Adequate` |
| 36 | Customization | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `2 Major limitations` |
| 37 | Reliability Rating | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 38 | Ease of Use Rating | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `4 Strong` |
| 39 | Support Quality Rating | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `2 Major limitations` |
| 40 | Demo Date | `date` | `DATE` | `string, format: date` | `Date` | `2026-07-18` |
| 41 | Demo Test Result | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Partially Passed` |
| 42 | Test Transactions Run | `number` | `NUMERIC` | `number` | `Number` | `25` |
| 43 | Licence Cost | `currency` | `NUMERIC(14,2)` | `number` | `Number (format: currency)` | `480000.00` |
| 44 | Implementation Cost | `currency` | `NUMERIC(14,2)` | `number` | `Number (format: currency)` | `120000.00` |
| 45 | Customization Cost | `currency` | `NUMERIC(14,2)` | `number` | `Number (format: currency)` | `65000.00` |
| 46 | Training Cost | `currency` | `NUMERIC(14,2)` | `number` | `Number (format: currency)` | `45000.00` |
| 47 | Annual Renewal | `currency` | `NUMERIC(14,2)` | `number` | `Number (format: currency)` | `240000.00` |
| 48 | First-Year Cost | `currency` | `NUMERIC(14,2)` | `number` | `Number (format: currency)` | `710000.00` |
| 49 | Three-Year TCO | `currency` | `NUMERIC(14,2)` | `number` | `Number (format: currency)` | `1190000.00` |
| 50 | Evaluation Status | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Evaluated` |
| 51 | Deal-breaker | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `No` |
| 52 | Selection Decision | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Not Selected` |
| 53 | Rejection Reason | `select` | `VARCHAR(100)` | `string` | `Select (add options after import)` | `Poor Support` |
| 54 | Evaluated By | `text` | `VARCHAR(255)` | `string` | `Text` | `Example Evaluator` |
| 55 | Evidence/Source | `text` | `VARCHAR(255)` | `string` | `Text` | `ILLUSTRATIVE - vendor demo 2026-07-18; 25 test transactions; written quotation dated 2026-07-25; the three ratings are the evaluator's own view` |
| 56 | Notes | `long_text` | `TEXT` | `string` | `Text` | `VAT / TDS / payroll-SSF / IRD reporting / e-billing left Untested - no current evidence held. Service management and multi-company Not required by this business. Ratings are the evaluator's opinion not vendor claims.` |
| 57 | Selection ID | `id` | `SERIAL PRIMARY KEY` | `integer` | `Text (preserve source ID)` | `(blank)` |

The table above is the single source of truth. The CSV, SQL, JSON Schema and Notion
mapping are all derived from it - never edit one without the others. 57 fields:
`id` | 1, `text` | 5, `long_text` | 3, `select` | 39, `number` | 1, `currency` | 7, `date` | 1.

**Three groups, kept apart on purpose.** Rows 7 to 36 are the vendor's documented or
demonstrated capability; rows 37 to 39 are the named evaluator's own opinion; rows 40
onward are the evidence, the cost and the decision. Keep the first two apart - a brochure
claim is not a Rating, and an evaluator's impression is not a capability.

**What is required, and what is deliberately not.** The JSON Schema requires only
`Evaluation Status` and `Deal-breaker`, because a record has to say where the candidate
sits in the funnel and whether a Must-have has failed, and neither answer is optional
(`Unknown` is one of the values `Deal-breaker` takes). Everything else is deliberately
not required, because its source can legitimately be missing: `Evaluation ID`, `Software`
and `Vendor` are free text and are recorded as soon as the candidate exists;
`Deployment Type` and the capability fields are `Untested` or `Not Required` until someone
checks; `Demo Date`, `Demo Test Result` and `Test Transactions Run` are empty until a
demonstration happens; every cost field is empty until a quotation is in hand;
`First-Year Cost` and `Three-Year TCO` are calculated, and a calculated value is never
required when its parts may be missing; and `Selection Decision` and `Rejection Reason`
are empty until the business decides, which is the point of keeping them apart from
`Evaluation Status`.

**Percentages and dates.** There is no percentage field in this table. The 1-5 scale is
written with its meaning (`4 Strong`), never as a bare number, so a score can be read
without the legend. Dates are ISO `YYYY-MM-DD`.

**Technical fields.** `Selection ID` is a database identifier only. It exists so the
target database can address a row, it is left blank in the example, and it is not a
business reference - do not print it on a quotation or quote it to a vendor.

## Select Options

Every list below is a starting set for a spreadsheet that has to be imported, not the
business's confirmed taxonomy. Rename the options to match how the business talks, and if
the user supplied their own values, theirs win. In Notion, add the options after import.

**Deployment Type**

```
Cloud | On-premise | Hybrid
```
**Accounting Coverage**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Sales Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Purchase Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Inventory Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Manufacturing Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**BOM Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Production/Work Order Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Production Costing**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Wastage/Scrap Tracking**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Batch/Lot Tracking**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Service Management**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**VAT Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**TDS Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Payroll/SSF Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**IRD/Statutory Reporting**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**E-Billing/CBMS Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Financial Reporting**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Multi-Company Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Branch Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Warehouse Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**User Access Control**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Approval Workflow**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Data Backup & Security**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Migration Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Integration/API**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Data Export**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**After-Sales Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Implementation Support**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Training**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Customization**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Reliability Rating**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Ease of Use Rating**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Support Quality Rating**

```
1 Missing | 2 Major limitations | 3 Adequate | 4 Strong | 5 Comprehensive | Not Required | Untested
```
**Demo Test Result**

```
Not Tested | Partially Passed | Passed | Failed
```
**Evaluation Status**

```
Not Evaluated | Demo Scheduled | Demo Completed | Testing | Evaluated
```
**Deal-breaker**

```
Yes | No | Unknown
```
**Selection Decision**

```
Selected | Shortlisted | Not Selected | Rejected
```
**Rejection Reason**

```
Cost | Missing Capability | Poor Fit | Poor Support | Implementation Risk | Security Risk | User Experience | Other
```

## Relations

Link fields: none

This table is standalone. `Software`, `Vendor` and `Evaluated By` are names, not links -
a shortlist legitimately contains packages the business has no register of, and the same
evaluator may score several candidates. `Evidence/Source` holds the reference to a vendor
document, a demonstration or a quotation. It becomes a relation only when the business
also runs a quotation or demo register and the reference points at a real row there; then
add it to all four artifacts deliberately, or keep it as text and say so.

## Examples

**Prompt**

```
We are replacing our accounting package and cannot tell which one actually covers payroll and what it costs over three years.
```

**Context first** - one short question per message, nothing already answered:

> **Q:** Which accounting or ERP packages are on the shortlist?
> **A:** One cloud product and one on-premise product.
>
> **Q:** Is payroll a must-have for the business?
> **A:** It is either a must-have or nothing. I do not know yet - the owner has not said.
>
> **Q:** Does anyone hold a written quotation?
> **A:** One so far. The renewal is not in it.

**Recommended next step** - offered, not built, and naming no winner:

> One evaluation record per shortlisted package, scored on the same capability, cost and
> support fields, with the evidence and the evaluator kept beside the score.
>
> Payroll is still unranked, and the deal-breaker rule needs that ranking before anything
> is scored - so it is the next question, and it changes which of the two candidates can
> survive. The second product has no quotation, so its cost cells stay empty and its
> `Deal-breaker` reads `Unknown` until the renewal is quoted; do not fill either from
> a price we do not hold.
>
> Workflow: Requirements → Candidate Shortlist → Vendor Demo → Standardized Tests → Stakeholder Evaluation → Cost/TCO Review → Business Decision → Configuration → Migration → Training → Go-live
>
> Want the CSV, SQL DDL, JSON Schema and Notion mapping for this?

## Best Practices

- Rank every requirement Must-have, Should-have, Nice-to-have or Not required before scoring anything, so the deal-breaker rule has something to bite on.
- Score every candidate on the same 35 categories and the same demo tests, or the table is a list of opinions rather than a comparison.
- Never write a score without its evidence, and never let a high total carry a failed Must-have. Flag it `Deal-breaker: Yes` and let the business decide.
- Use `Untested` for anything nobody has checked, and never `1 Missing` for it. A capability that was never looked at has no score at all.
- Record the evidence behind the important scores in `Evidence/Source` - what kind of source, and dated - and who supplied it in `Evaluated By`, so a number can be traced back.
- Keep the vendor's documented capability and the evaluator's opinion in different fields. Do not average evaluators into a verdict, and do not turn a score into a recommendation.
- Compare three years, not one, and only from figures the business actually holds. An incomplete cost line means the total is `Unknown`.
- Write an empty cell, never a quoted price nobody has given you, and `Unknown` in `Notes` if a reader needs to know it was checked.
- Build when requested; recommend and offer a build for advice-only requests.
- A batched intake reads as a form and gets guessed at.
- Keep every field name identical across CSV, SQL, JSON Schema and Notion.
- Money fields are `currency`, never `text`. Dates are `date`, never free text.
- If the user requests an example row, keep it obviously fake so nobody imports it as real data.

## Limitations

- Empty template only. It does not score for you, run the demos, verify a vendor's claims or turn a quotation into a TCO.
- It never selects the package. It records the decision the business makes in `Selection Decision`, with `Rejection Reason` and `Deal-breaker` beside it; it does not make the decision and it names no preferred package.
- Not a bookkeeping, tax-filing, legal or procurement system. Quotations, contracts and purchase orders stay in the vendor's own process.
- It cannot verify Nepal IRD, VAT, TDS, e-billing, CBMS or SSF handling for you. Those stay `Untested` until the business holds current evidence from the vendor or the authority.
- It does not confirm that a product does what a vendor page says. That needs a named human verifier and a dated source.
- A go-live checklist is a list the business carries out with the vendor. Chart of accounts, tax configuration, users, inventory, opening balances and the test entry are not done by this skill.
- `Software`, `Vendor` and `Evaluated By` are free text, so a duplicated package or evaluator is a data-entry problem this table cannot catch.
- No relation fields. There is no link to a quotation, demo or product register.
- Select options are a starting set. Rename them to match how the business talks.
- No automation, reminders or sync. Those need the integration layer.
- Procurement, tax and legal review is still required before this drives a real purchase.

## Security & Safety Notes

- Never invent vendor capabilities, prices, compliance status, demo results or stakeholder scores. If nobody supplied it, it stays `Untested` or the cost cell stays empty, and the gap is recorded in `Notes`.
- Every vendor capability, every price and every compliance claim needs a named human verifier and a dated source before it is recorded as a fact. This skill cannot confirm that a product does what a page says it does, and it must not present an unverified claim as a finding.
- Never claim Nepal IRD, VAT, TDS, e-billing, CBMS or SSF compliance without current evidence from a reliable source. Absence of evidence is not evidence of absence either way.
- Keep the vendor's documented fact and the stakeholder's opinion apart. One field for what the vendor showed, one for what the evaluator thinks of it, and never a blend of the two.
- Never declare a winner or a preferred package, and never record `Selection Decision: Selected` yourself. Summarise the evidence and let the business decide; a score is not a recommendation.
- Record only prices the user actually holds, and keep the currency explicit - NPR unless the user names another, in which case theirs is used and recorded beside the quotation.
- Keep the example row fictional: identifiers use the `-EXAMPLE-` pattern and every name reads `Example ...`. Never paste a real quotation, vendor contact, employee list, PAN or VAT number, bank detail or salary into the chat - generate the template and tell the user to delete the pasted data.
- Local reads, generation commands, and validation are part of a requested artifact build.
  External writes, messages, provisioning, and publication require authorization for that
  action and target; existing explicit authorization does not need to be repeated.
- A purchase this record supports still goes through the business's own procurement, tax and legal review, and the decision is signed off by a named human.

## Common Pitfalls

- **Problem:** a static mapping is described as a completed workspace build.
  **Solution:** deliver manual mappings without a connection; claim a live change only
  after the authorized tool operation succeeds.
- **Problem:** treated the average score as the answer.
  **Solution:** an average hides disagreement. Keep each evaluator's assessment separate and show the spread.
- **Problem:** let a strong score in one category hide a failed Must-have.
  **Solution:** flag `Deal-breaker: Yes` on the failed requirement, whatever the total says.
- **Problem:** wrote `1 Missing` for a capability nobody had got round to testing.
  **Solution:** `Untested`. Nobody looking is a gap in the evaluation, not a finding about the product.
- **Problem:** filled a capability field from a brochure.
  **Solution:** record it only from documentation, a demonstration, a trial, a test transaction or the quotation, and name the source and its date in `Evidence/Source`.
- **Problem:** wrote `Deal-breaker: No` on a candidate nobody had finished testing.
  **Solution:** `Unknown` until every Must-have has been tested. `No` asserts something nobody has checked.
- **Problem:** wrote a score with no evidence, or evidence with no date.
  **Solution:** `Evidence/Source` carries what kind of source it was and when it was gathered; a score nobody can trace is deleted, not kept.
- **Problem:** averaged two evaluators into one rating.
  **Solution:** keep each view on its own record or in their own words. The spread is the finding.
- **Problem:** scored security and backup/recovery as one number when the demonstration disagreed.
  **Solution:** `Data Backup & Security` is one field, so write the disagreement in `Notes` instead of averaging it away.
- **Problem:** used one `Recommendation` column for a decision, a reason and a caveat.
  **Solution:** `Evaluation Status`, `Selection Decision`, `Rejection Reason` and `Deal-breaker` are four fields for exactly that reason. Do not merge them.
- **Problem:** made the three-year total work by adjusting a cost line.
  **Solution:** record the difference in `Notes` and name the unverified line. A total that needs a component changed to balance is not a total.
- **Problem:** wrote a plausible price into an empty cost cell so the row looked finished.
  **Solution:** leave the cell empty and put `Unknown` in `Notes`. A total with a guessed line in it is a fabricated price.
- **Problem:** assumed NPR because the business is in Nepal.
  **Solution:** NPR is the default only. If the user names another currency, use theirs and record it beside the quotation.
- **Problem:** took `maybe` or `same` as an answer to a multiple-choice question.
  **Solution:** re-ask as an explicit choice, and keep only the part of a partial answer that was actually given.
- **Problem:** opened with the shortlist question when the request had already named the packages.
  **Solution:** read the request first and ask only what would change the evaluation.
- **Problem:** built a go-live checklist when only the comparison was asked for.
  **Solution:** build what was requested; mention the checklist and the parent skill separately.
- **Problem:** asked all the questions in one message.
  **Solution:** ask one, wait, and drop any the first answer already covered.
- **Problem:** all four artifacts drift apart.
  **Solution:** derive all four from the Field Reference, never by hand.
- **Problem:** Notion import shows every column as Text.
  **Solution:** that is expected. Apply the property mapping table once, after import.

## Related Skills

- [Accounting & Audit System Builder](../accounting-audit-system-builder/SKILL.md) - routes to this skill and the other accounting modules.
- @purchase-accounting - the entry flow the chosen package has to support.
- @sales-accounting - the entry flow the chosen package has to support.
- @salary-wage-accounting - the payroll module being evaluated here.
- @tds-booking-payment - the withholding module being evaluated here.
- @monthly-closing-statements - the reporting output being evaluated here.
- @credit-cycle-analysis - the receivables and payables work being evaluated here.

## Reusable Prompt

```
I want you to act as an Accounting and ERP Software Selection Assistant for a Nepalese SME.
Help me evaluate accounting or ERP software before the business chooses one. It may trade, manufacture, provide services, or a combination of these.

Ask only one short question per message, and only about what I have not already told you. Never ask again for something I have already answered. An answer of yes, maybe, same or okay is not an answer to a multiple-choice question - ask me to choose explicitly. Never invent missing information. If I do not know, record it as Unknown and carry on. Never turn Unknown into zero, a low score or a plausible-looking value.

Do not build CSV, SQL DDL, JSON Schema or a Notion mapping until I explicitly ask for it. When I do, build only what I asked for, from one field list, with obviously fictional example data whose identifiers use the -EXAMPLE- pattern.

Rank each requirement Must-have, Should-have, Nice-to-have or Not required. Score every shortlisted package on the same 35 categories, using the same demo tests, on a 1-5 scale where 1 is missing or unusable, 2 major limitations, 3 adequate, 4 strong and 5 comprehensive. Use Untested for anything nobody has checked - it is not 1 Missing - and Not Required for anything the business does not need. Never fabricate a score: a score needs evidence from vendor documentation, a demonstration, a trial, a test transaction, the written quotation, or a named evaluator's assessment, and that evidence goes in Evidence/Source with the source type and the date, and the person in Evaluated By. Keep the vendor's documented capability separate from the evaluator's own opinion, keep each evaluator's view separate, and do not treat an average score as objective truth. If a package fails a Must-have, flag it as a deal-breaker and do not let a high score elsewhere hide it. Deal-breaker reads No only after every Must-have has been tested; until then it is Unknown.

Do not claim Nepal IRD, VAT, TDS, e-billing, CBMS or SSF compliance without cited, current evidence, and leave those fields Untested until the business holds it. Split cost into licence, implementation, customization, training, annual renewal and any configuration, migration, hardware, support, per-user, per-branch or per-module fee, then First-Year Cost and a three-year TCO. Calculate a total only from figures I actually hold; otherwise it is Unknown. Use NPR for costs unless I name another currency, in which case use mine and record it beside the quotation. Never invent a price, and never adjust a component to make a total agree.

Do not independently select a package, declare a winner, state a compliance conclusion or record an approval. Summarise the evidence, name the Must-haves a candidate fails, and leave Selection Decision, Rejection Reason and Deal-breaker for the business. Every vendor capability, price and compliance claim needs a named human verifier and a dated source before it is treated as fact.
```
