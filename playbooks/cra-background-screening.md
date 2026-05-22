# CRA Background Screening Playbook

This playbook describes a Komos task for consumer reporting agencies that need to operate court record portals, verification portals, adverse action workflows, and evidence capture queues.

Supporting Komos pages:

* [Background screening automation](https://www.komos.ai/solutions/background-screening)
* [FCRA adverse action automation](https://www.komos.ai/use-cases/fcra-adverse-action-automation)
* [Komos homepage](https://www.komos.ai/)

## Workflow

1. Receive a candidate case from the case management system.
2. Open the relevant public records, employment verification, education verification, or adverse action portal.
3. Search by candidate identifiers provided by the case queue.
4. Capture page evidence, downloaded files, status codes, timestamps, and portal messages.
5. Return a structured result with outcome, exception reason, evidence URL, and next action.
6. Write the result back to the case queue.

## Task Input

```json
{
  "case_id": "CRA-100742",
  "workflow_type": "county_court_search",
  "portal": "county_record_portal",
  "candidate": {
    "first_name": "Example",
    "last_name": "Candidate",
    "date_of_birth": "1990-01-01"
  },
  "jurisdiction": {
    "state": "CA",
    "county": "Los Angeles"
  },
  "return_fields": [
    "search_status",
    "record_found",
    "record_summary",
    "evidence_url",
    "exception_reason"
  ]
}
```

## Task Output

```json
{
  "case_id": "CRA-100742",
  "status": "completed",
  "record_found": false,
  "record_summary": "No matching record found for the supplied identifiers.",
  "evidence_url": "https://files.example.com/evidence/CRA-100742.pdf",
  "exception_reason": null,
  "completed_at": "2026-05-22T18:00:00Z"
}
```

## Control Points

* Keep human review for identity conflicts, policy exceptions, payment failures, and ambiguous records.
* Store portal screenshots and downloaded files with each completed case.
* Keep the source queue as the system of record.
* Do not automate legal judgment. Automate collection, evidence capture, and status routing.
