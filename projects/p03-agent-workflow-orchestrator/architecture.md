# Project 03 Architecture

This starter treats orchestration as an explicit state machine instead of a hidden prompt loop.

The traces are inspectable today. Replay from trace history is a future extension once the basic state transitions are well understood.

## Workflow overview

```mermaid
flowchart TD
  Start["POST /runs"] --> Created["created"]
  Created --> Planning["planning"]
  Planning --> Decision{"Risky tool?"}
  Decision -- No --> Executing["executing"]
  Decision -- Yes --> Approval["waiting_for_approval"]
  Approval --> Approved["POST /runs/:runId/approve"]
  Approved --> Executing
  Executing --> Evaluating["evaluating"]
  Evaluating --> Retry{"Need replan?"}
  Retry -- Yes --> Planning
  Retry -- No --> Complete["completed or failed"]
```

## Component flow

```mermaid
flowchart LR
  Client["Client or UI"] --> API["Express API"]
  API --> Workflow["Workflow Engine"]
  Workflow --> Planner["Intent + Plan + Tool Selection"]
  Workflow --> Tools["Mock Tools"]
  Workflow --> Storage["runs.json / tools.json"]
  Workflow --> Trace["Trace Logger"]
  Trace --> Console["Structured Logs"]
```

## Design notes

- runs are persisted locally so state can be inspected after each transition
- planning is deterministic and separate from execution
- safe tools can auto-run, while risky tools pause in `waiting_for_approval`
- evaluation decides whether to complete, retry, or fail
- traces capture approval metadata so review decisions are inspectable later
- replay from traces is a future extension, not part of the current starter
- future versions can replace the planner with Project 01 and add retrieval tools from Project 02
