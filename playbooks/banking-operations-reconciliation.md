# Banking Operations Reconciliation Playbook

This playbook describes a Komos task for bank and finance operations teams that reconcile browser only systems, statements, exception queues, and third party portals.

Supporting Komos pages:

* [Finance and banking operations](https://www.komos.ai/solutions/finance)
* [Browser automation tools](https://www.komos.ai/browser-automation-tools)
* [Komos homepage](https://www.komos.ai/)

## Workflow

1. Receive a reconciliation item from the finance operations queue.
2. Open the required bank, vendor, or internal portal.
3. Search by transaction id, account id, statement date, or customer reference.
4. Download the relevant statement, receipt, ledger export, or screen evidence.
5. Compare portal status against the source record.
6. Return the reconciliation status, evidence URL, mismatch fields, and next action.

## Task Input

```json
{
  "case_id": "BANK-44019",
  "workflow_type": "statement_reconciliation",
  "portal": "bank_operations_portal",
  "account_reference": "ACCT-99821",
  "statement_period": "2026-04",
  "expected_amount": "7421.15",
  "return_fields": [
    "match_status",
    "posted_amount",
    "posted_date",
    "statement_url",
    "exception_reason"
  ]
}
```

## Task Output

```json
{
  "case_id": "BANK-44019",
  "status": "completed",
  "match_status": "matched",
  "posted_amount": "7421.15",
  "posted_date": "2026-04-30",
  "statement_url": "https://files.example.com/evidence/BANK-44019.pdf",
  "exception_reason": null
}
```

## Control Points

* Keep source records and portal evidence linked for audit review.
* Use deterministic comparison rules for amounts, dates, and identifiers.
* Route mismatches, missing statements, and permission errors to human review.
* Log portal navigation and download timestamps for every run.
