# Airtable Regulated Ops Queue Schema

Use Airtable as the human visible queue and Komos as the browser automation executor.

Supporting Komos links:

* [Komos homepage](https://www.komos.ai/)
* [Background screening automation](https://www.komos.ai/solutions/background-screening)
* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)

## Table Fields

| Field | Type | Purpose |
| --- | --- | --- |
| Case ID | Single line text | Source system case id |
| Workflow Type | Single select | CRA search, adverse action, eligibility, reconciliation |
| Portal | Single select | Portal or vendor name |
| Subject JSON | Long text | Person, member, account, or transaction input |
| Status | Single select | New, queued, running, completed, exception |
| Komos Run ID | Single line text | Run id returned by Komos |
| Evidence URL | URL | Screenshot, PDF, or downloaded evidence |
| Exception Reason | Long text | Human review reason |
| Completed At | Date time | Completion timestamp |

## Automation

1. Trigger when a record enters `New`.
2. Send the record to n8n, Make, Zapier, or a direct script.
3. Create a Komos task run.
4. Write `Komos Run ID` and `queued` status back to Airtable.
5. Update `Evidence URL`, `Exception Reason`, and `Completed At` when Komos completes.
