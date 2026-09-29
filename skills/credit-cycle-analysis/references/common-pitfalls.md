# Common Pitfalls


- **Problem:** a static mapping is described as a completed workspace build.
  **Solution:** deliver manual mappings without a connection; claim a live change only
  after the authorized tool operation succeeds.
- **Problem:** asked all six questions in one message.
  **Solution:** ask one, wait, and drop any the first answer already covered.
- **Problem:** contractual terms were written into the actual collection days, so a 42 day cycle
  reported as 30.
  **Solution:** `Contractual Terms Days` and `Actual Collection/Payment Days` are separate fields.
  Where the dates do not exist, the actual figure is `Unknown`.
- **Problem:** one `Aging Bucket` sat on the party row and the aging position was wrong every time
  a party had two live invoices.
  **Solution:** a party holds several buckets at once. Bucket **amounts** go on the party-period
  row; the single `Aging Bucket` goes on the invoice/bill detail row.
- **Problem:** the common movement field was called `Total Billed`, so the creditor rows read as if
  suppliers were billed.
  **Solution:** the neutral names are `Credit Movement` and `Settlement` for both sides.
- **Problem:** the closing balance was nudged so the row would tie.
  **Solution:** record the difference, set `Reconciliation Status`, and leave the component alone.
  A forced tie is inherited by the next period and hides the break that caused it.
- **Problem:** a positive `Cycle Gap Days` was reported as a problem in a monthly note.
  **Solution:** the gap is descriptive. State the direction and the size and leave the judgement
  with the business.
- **Problem:** days were turned into money with no basis, and the number was quoted as a funding
  requirement.
  **Solution:** compute it only when the monetary basis exists, and always write `Calculation
  Basis` next to it.
- **Problem:** a credit limit and a utilisation percentage appeared on supplier rows.
  **Solution:** `Customer Credit Limit` and `Customer Credit Utilisation %` are customer-only.
  Leave both blank on a `Supplier/Creditor` row.
- **Problem:** a due date was reconstructed from the payment terms because the invoice had none.
  **Solution:** a missing due date is `Unknown`, and the row is not aged. Terms are an agreement,
  not a fact about the invoice.
- **Problem:** a benchmark was inserted from general knowledge and presented as the target.
  **Solution:** the benchmark is the user’s figure, explicitly selected, or labelled a proposed
  default. Nothing else.
- **Problem:** an invoice settled in three payments was dated from the last payment only.
  **Solution:** use the weighted settlement calculation, and record in `Measurement Basis` that it
  was used.
- **Problem:** a trend was assigned on the strength of one period.
  **Solution:** `Cycle Trend` is `Unknown` without a comparable prior period.
- **Problem:** a calculated field was left blank with no status recorded, so the blank read as
  zero in the next report.
  **Solution:** a blank is `Unknown`, and `Data Quality Status` says why.
- **Problem:** the two cycles were measured differently and then compared.
  **Solution:** same period, same basis, same calculation. If the bases differ, the difference
  between the two cycles means nothing.
- **Problem:** a field existed in the CSV but not in the SQL, or was defined differently in the
  JSON Schema.
  **Solution:** derive all four from one field dictionary. A field that is in one artifact and
  missing or different in another is the defect.
- **Problem:** built a full system when one dataset was asked for.
  **Solution:** build what was requested and name the other two datasets as available.
- **Problem:** all four artifacts drift apart.
  **Solution:** derive all four from the field list in this file, never by hand.
- **Problem:** Notion import shows every column as Text.
  **Solution:** that is expected. Apply the property mapping table once, after import, and add the
  Select options then.
