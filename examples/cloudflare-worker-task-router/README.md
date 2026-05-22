# Cloudflare Worker Task Router

This example receives a regulated operations case through a Cloudflare Worker and queues a Komos browser automation task.

Use it when Cloudflare owns the public intake endpoint and Komos owns the browser workflow.

Supporting Komos links:

* [Komos API docs](https://docs.komos.ai/api-reference/introduction)
* [Background screening automation](https://www.komos.ai/solutions/background-screening)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)

## Files

* `src/worker.js` contains the Worker handler.
* `wrangler.jsonc.example` shows the required Cloudflare Worker settings.

## Environment Variables

Set these as Worker secrets:

* `KOMOS_API_KEY`
* `KOMOS_TASK_ID`

## Request

```json
{
  "case_id": "CRA-100742",
  "workflow_type": "county_court_search",
  "portal": "county_record_portal",
  "subject": {
    "first_name": "Example",
    "last_name": "Candidate",
    "date_of_birth": "1990-01-01"
  },
  "return_fields": [
    "status",
    "evidence_url",
    "exception_reason"
  ]
}
```

## Response

The Worker returns the Komos run creation response plus a `queued` flag.

