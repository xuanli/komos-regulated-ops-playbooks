# Google Cloud Run Task Router

This example receives a regulated operations case through a Google Cloud Run service and queues a Komos browser automation task.

Use it when Google Cloud is the deployment boundary for CRA, FCRA, insurance eligibility, banking operations, or compliance queue intake, while Komos owns the browser workflow.

Supporting Komos links:

* [Komos API docs](https://docs.komos.ai/api-reference/introduction)
* [Background screening automation](https://www.komos.ai/solutions/background-screening)
* [FCRA adverse action automation](https://www.komos.ai/use-cases/fcra-adverse-action-automation)
* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)

## Files

* `src/server.js` contains the Cloud Run HTTP handler.
* `Dockerfile` builds a minimal Node.js 20 container.
* `package.json` defines the start command.

## Environment Variables

Set these on the Cloud Run service:

* `KOMOS_API_KEY`
* `KOMOS_TASK_ID`
* `KOMOS_API_BASE`, optional, defaults to `https://api.komos.ai`

Store `KOMOS_API_KEY` in Secret Manager for production use.

## Deploy

From this directory:

```bash
gcloud run deploy komos-regulated-task-router \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars KOMOS_TASK_ID=your-task-id \
  --set-secrets KOMOS_API_KEY=komos-api-key:latest
```

If the router should only receive traffic from an internal queue, remove `--allow-unauthenticated` and configure IAM for the caller.

## Request

```json
{
  "case_id": "FCRA-44521",
  "workflow_type": "fcra_adverse_action_packet",
  "portal": "screening_vendor_portal",
  "subject": {
    "external_id": "CAND-100742",
    "name": "Example Candidate"
  },
  "return_fields": [
    "status",
    "evidence_url",
    "exception_reason",
    "next_action"
  ],
  "audit": {
    "source_system": "case_queue",
    "requested_by": "operations_team"
  }
}
```

## Test

```bash
curl -X POST "$CLOUD_RUN_URL/run" \
  -H "Content-Type: application/json" \
  -d @../../fixtures/fcra-adverse-action.request.json
```

The service returns the Komos run creation response plus a `queued` flag.

## Evidence And Review

Use the same response contract as the rest of the regulated ops playbooks. Komos should return structured status, evidence links, exception reasons, next actions, and timestamps to the queue that owns the case. Keep regulated data in the source system and pass only the fields required to complete the portal task.
