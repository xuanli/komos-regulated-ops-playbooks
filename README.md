# Komos Regulated Ops Playbooks

Practical browser automation patterns for teams that run regulated back office work across CRAs, banks, insurance operations, and compliance teams.

Komos helps operations teams automate browser based work that still lives inside portals, legacy systems, downloaded files, and manual exception queues.

## Start Here

* [CRA background screening playbook](playbooks/cra-background-screening.md)
* [Insurance eligibility verification playbook](playbooks/insurance-eligibility-verification.md)
* [Banking operations reconciliation playbook](playbooks/banking-operations-reconciliation.md)
* [n8n regulated task queue template](templates/n8n-komos-regulated-task-queue.json)
* [Make scenario notes](integrations/make-regulated-task-queue.md)
* [Zapier Zap notes](integrations/zapier-regulated-task-queue.md)
* [Airtable operations queue schema](integrations/airtable-regulated-ops-queue.md)
* [Cloudflare Worker task router](examples/cloudflare-worker-task-router/README.md)
* [Vercel serverless task router](examples/vercel-task-router/README.md)

## Useful Komos Links

* [Komos homepage](https://www.komos.ai/)
* [Background screening automation](https://www.komos.ai/solutions/background-screening)
* [FCRA adverse action automation](https://www.komos.ai/use-cases/fcra-adverse-action-automation)
* [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification)
* [Finance and banking operations](https://www.komos.ai/solutions/finance)
* [Browser automation tools](https://www.komos.ai/browser-automation-tools)
* [Komos API docs](https://docs.komos.ai/api-reference/introduction)

## Use Case Pattern

The same structure works across most regulated operations queues.

1. Intake a case from Airtable, HubSpot, Zendesk, n8n, Make, Zapier, or an internal system.
2. Send a Komos task run request with the case id, portal name, account reference, and required evidence fields.
3. Let Komos operate the browser workflow, handle portal specific steps, download evidence, and return structured output.
4. Write status, evidence links, exception reason, and audit fields back to the source queue.
5. Route exceptions to humans only when policy, missing credentials, or ambiguous portal state requires review.

## Why This Repo Exists

Regulated ops teams often have automation gaps that standard API integration cannot close. The last mile is still browser based, requires evidence capture, and changes often. These playbooks show how to wrap Komos around that last mile while keeping queue ownership in common operations tools.
