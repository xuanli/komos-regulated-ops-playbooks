# Vercel Serverless Task Router

This example receives a regulated operations case in a Vercel serverless route and queues a Komos browser automation task.

Use it when a Next.js or Vercel app owns intake and Komos owns the browser workflow.

Supporting Komos links:

* [Komos API docs](https://docs.komos.ai/api-reference/introduction)
* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)

## Files

* `api/komos/run.js` contains the serverless route handler.

## Environment Variables

Set these in Vercel project settings:

* `KOMOS_API_KEY`
* `KOMOS_TASK_ID`

## Request

```json
{
  "case_id": "ELIG-8821",
  "workflow_type": "insurance_eligibility_verification",
  "portal": "payer_portal",
  "subject": {
    "member_id": "M123456789",
    "service_date": "2026-05-22"
  }
}
```

