# Zapier Zap Notes

Use this Zap when Zapier owns the intake trigger and Komos owns the browser workflow.

Supporting Komos links:

* [Komos API docs](https://docs.komos.ai/api-reference/introduction)
* [FCRA adverse action automation](https://www.komos.ai/use-cases/fcra-adverse-action-automation)
* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)

## Zap

1. Choose a trigger from Airtable, Salesforce, HubSpot, Zendesk, Gmail, or Webhooks by Zapier.
2. Add Webhooks by Zapier.
3. Use Custom Request.
4. Set method to `POST`.
5. Set URL to `https://api.komos.ai/public/v1/tasks/{taskId}/runs`.
6. Add an `Authorization` header with `Bearer <KOMOS_API_KEY>`.
7. Send the regulated ops case fields as JSON.
8. Store the returned run id back on the source record.

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

This pattern is strongest for teams that already rely on Zapier for intake routing but need Komos for portal work that Zapier cannot do through APIs alone.
