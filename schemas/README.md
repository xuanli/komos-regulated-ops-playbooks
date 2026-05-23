# Regulated Task Run Schema

This folder defines a portable request and response contract for Komos task runs in regulated operations queues.

Use the schema when a queue, router, or integration needs to trigger a browser automation task and write structured evidence back to the source system.

## Files

* [regulated-task-run.schema.json](regulated-task-run.schema.json) validates a task run request and the expected result envelope.

## Supported Use Cases

The schema is intentionally broad enough for:

* CRA background screening and FCRA adverse action work.
* Banking operations reconciliation.
* Insurance eligibility verification.
* Compliance review queues that need evidence capture from browser portals.

## Request Pattern

```json
{
  "case_id": "CRA-100742",
  "workflow_type": "county_court_search",
  "portal": "county_record_portal",
  "subject": {
    "external_id": "SUBJECT-123",
    "name": "Example Candidate",
    "date_of_birth": "1990-01-01"
  },
  "inputs": {
    "jurisdiction": "Los Angeles County",
    "state": "CA"
  },
  "return_fields": [
    "status",
    "evidence_url",
    "exception_reason",
    "next_action"
  ],
  "audit": {
    "source_system": "case_queue",
    "requested_by": "ops@example.com"
  }
}
```

## Response Pattern

```json
{
  "case_id": "CRA-100742",
  "status": "completed",
  "outputs": {
    "record_found": false,
    "evidence_url": "https://files.example.com/evidence/CRA-100742.pdf"
  },
  "exception_reason": null,
  "next_action": "close_case",
  "completed_at": "2026-05-23T04:15:00Z"
}
```

## Related Komos Pages

* [Background screening automation](https://www.komos.ai/solutions/background-screening)
* [FCRA adverse action automation](https://www.komos.ai/use-cases/fcra-adverse-action-automation)
* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)
