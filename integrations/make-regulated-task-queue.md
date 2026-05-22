# Make Scenario Notes

Use this scenario when Make owns the intake queue and Komos owns the browser work.

Supporting Komos links:

* [Komos API docs](https://docs.komos.ai/api-reference/introduction)
* [Background screening automation](https://www.komos.ai/solutions/background-screening)
* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)

## Scenario

1. Watch records from Airtable, Google Sheets, HubSpot, Zendesk, or a custom webhook.
2. Add an HTTP module.
3. Send a `POST` request to `https://api.komos.ai/public/v1/tasks/{taskId}/runs`.
4. Add `Authorization: Bearer <KOMOS_API_KEY>`.
5. Send the case fields in the JSON body.
6. Store the returned run id on the source record.
7. Poll for completion or receive a webhook callback from your Komos task setup.

## Example Body

```json
{
  "input": {
    "case_id": "{{case_id}}",
    "workflow_type": "{{workflow_type}}",
    "portal": "{{portal}}",
    "subject": "{{subject}}",
    "return_fields": [
      "status",
      "evidence_url",
      "exception_reason"
    ]
  }
}
```

## Best Fit

This pattern is strongest when Make handles simple routing and notifications, while Komos handles portal login, browser actions, evidence capture, downloaded files, and structured output.
