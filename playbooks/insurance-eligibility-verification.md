# Insurance Eligibility Verification Playbook

This playbook describes a Komos task for eligibility teams that verify member coverage in payer portals and return structured evidence to an operations queue.

Supporting Komos pages:

* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Browser automation tools](https://www.komos.ai/browser-automation-tools)
* [Komos homepage](https://www.komos.ai/)

## Workflow

1. Receive a patient or member verification request.
2. Open the payer portal with the correct credentials and tenant context.
3. Search by member id, name, date of birth, and service date.
4. Capture coverage status, plan name, copay, deductible, prior authorization flags, and evidence.
5. Return structured output to the queue.
6. Escalate exceptions when the portal asks for MFA, shows a policy mismatch, or returns conflicting member data.

## Task Input

```json
{
  "case_id": "ELIG-8821",
  "payer": "Example Health Plan",
  "member": {
    "member_id": "M123456789",
    "first_name": "Example",
    "last_name": "Member",
    "date_of_birth": "1985-04-12"
  },
  "service_date": "2026-05-22",
  "return_fields": [
    "coverage_status",
    "plan_name",
    "copay",
    "deductible_remaining",
    "prior_authorization_required",
    "evidence_url"
  ]
}
```

## Task Output

```json
{
  "case_id": "ELIG-8821",
  "status": "completed",
  "coverage_status": "active",
  "plan_name": "Example PPO",
  "copay": "$25",
  "deductible_remaining": "$300",
  "prior_authorization_required": false,
  "evidence_url": "https://files.example.com/evidence/ELIG-8821.pdf",
  "exception_reason": null
}
```

## Control Points

* Preserve screenshots or PDFs for every completed check.
* Return clear exception categories instead of free text whenever possible.
* Never make a coverage decision from incomplete portal data.
* Route portal outage, MFA, and mismatch cases to a human queue.
