# Project 06 Architecture

This starter treats browser QA as a safe, local automation service instead of an unconstrained agent.

The current version is intentionally small: it uses Playwright, local files, mock-safe scenarios, and dry-run protections so learners can understand the execution model before adding real environments.

## Workflow overview

```mermaid
flowchart TD
  Request["POST /test-runs"] --> Validate["Validate request + safety policy"]
  Validate --> Allowed{"Allowed URL and non-destructive?"}
  Allowed -- No --> Rejected["rejected or dry-run report"]
  Allowed -- Yes --> DryRun{"Dry run?"}
  DryRun -- Yes --> Plan["Write dry-run report"]
  DryRun -- No --> Browser["Launch Playwright browser"]
  Browser --> Scenario["Load scenario target + run checks"]
  Scenario --> Evidence["Capture screenshot + report JSON"]
  Plan --> Evidence
  Evidence --> Status["GET /test-runs/:runId + /report"]
```

## Component flow

```mermaid
flowchart LR
  Client["Client or UI"] --> API["Express API"]
  API --> Service["Run service"]
  Service --> Safety["Safety guardrails"]
  Service --> Runner["Playwright runner"]
  Runner --> MockPages["Mock scenario pages"]
  Service --> Storage["test-runs.json / reports / screenshots"]
  Service --> Trace["Trace logger"]
```

## Design notes

- `prod` is dry-run only by default
- destructive requests are blocked instead of executed
- only allowed hosts and `mock://` targets are accepted
- reports and screenshots stay local to the project
- evals stay deterministic by using temporary storage roots and dry-run-safe inputs
- future versions can connect this agent to Project 03 orchestration and Project 05 operator UI
