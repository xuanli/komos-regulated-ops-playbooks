# Regulated Ops Fixtures

These fixtures show portable Komos task run requests and results for regulated operations queues.

Use them to test queue integrations, router code, and reviewer handoffs before connecting real portals or sensitive production data.

## Fixtures

| Fixture | Use case | Supporting Komos page |
| --- | --- | --- |
| [cra-county-court-search.request.json](cra-county-court-search.request.json) | CRA county court search intake | [Background screening automation](https://www.komos.ai/solutions/background-screening) |
| [cra-county-court-search.result.json](cra-county-court-search.result.json) | CRA court search result with evidence | [Background screening automation](https://www.komos.ai/solutions/background-screening) |
| [fcra-adverse-action.request.json](fcra-adverse-action.request.json) | FCRA adverse action notice queue | [FCRA adverse action automation](https://www.komos.ai/use-cases/fcra-adverse-action-automation) |
| [fcra-adverse-action.result.json](fcra-adverse-action.result.json) | Adverse action packet result | [FCRA adverse action automation](https://www.komos.ai/use-cases/fcra-adverse-action-automation) |
| [insurance-eligibility.request.json](insurance-eligibility.request.json) | Payer portal eligibility check | [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification) |
| [insurance-eligibility.result.json](insurance-eligibility.result.json) | Eligibility result with coverage evidence | [Insurance eligibility verification](https://www.komos.ai/use-cases/insurance-eligibility-verification) |
| [bank-reconciliation.request.json](bank-reconciliation.request.json) | Bank portal statement reconciliation | [Finance and banking operations](https://www.komos.ai/solutions/finance) |
| [bank-reconciliation.result.json](bank-reconciliation.result.json) | Reconciliation result with statement evidence | [Finance and banking operations](https://www.komos.ai/solutions/finance) |

## Validation

Each fixture follows the shared [regulated task run schema](../schemas/regulated-task-run.schema.json).

The fields are deliberately synthetic. Keep regulated production identifiers, consumer report data, PHI, bank account details, and credentials in the system of record. Send only the fields needed for the browser automation task.
