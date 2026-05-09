# Project 03: Agent Workflow Orchestrator

This starter is a beginner-friendly but production-shaped workflow orchestrator for agent-like tasks. It shows how a run moves through explicit states, how tool selection is separated from execution, and how approvals can pause risky actions before they happen.

The runtime is fully local and does not require paid APIs. Intent detection, planning, tool selection, evaluation, and retries are all deterministic so learners can inspect the mechanics before adding framework or model complexity.

## What this project teaches

- how to represent an agent workflow as explicit run states
- how planning, tool selection, execution, and evaluation fit together
- how to gate risky actions behind approvals
- how to persist runs and tool definitions for inspection
- how to log orchestration traces for replay and debugging

## Architecture

The service has six main layers:

1. `src/app.ts`
   Defines the HTTP API and maps requests onto workflow operations.
2. `src/storage.ts`
   Reads and writes `data/runs.json` and `data/tools.json`.
3. `src/planner.ts`
   Detects intent, drafts a plan, and selects a tool.
4. `src/tools.ts`
   Executes mock tools such as `knowledge_search`, `create_task`, and `send_summary`.
5. `src/workflow.ts`
   Drives state transitions, approvals, retries, and final responses.
6. `src/tracing.ts`
   Emits structured trace events per step.

See [architecture.md](./architecture.md) for the workflow diagrams.

## Project structure

```text
projects/p03-agent-workflow-orchestrator/
|-- data/
|   |-- runs.json
|   `-- tools.json
|-- evals/
|   |-- run-eval.ts
|   `-- scenarios.json
|-- examples/
|   `-- curl.md
|-- src/
|   |-- app.ts
|   |-- config.ts
|   |-- planner.ts
|   |-- schemas.ts
|   |-- server.ts
|   |-- smoke.ts
|   |-- storage.ts
|   |-- tools.ts
|   |-- tracing.ts
|   |-- types.ts
|   `-- workflow.ts
|-- .env.example
|-- architecture.md
|-- package-lock.json
|-- package.json
`-- tsconfig.json
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create your environment file

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

### 3. Start the dev server

```bash
npm run dev
```

The server starts on `http://localhost:4003` by default.

## Environment variables

```env
PORT=4003
MAX_RETRIES=1
```

- `PORT` controls the HTTP port.
- `MAX_RETRIES` controls how many times the workflow can replan after a failed evaluation.

## API surface

### `GET /health`

Returns service status plus current run and tool counts.

### `POST /runs`

Creates a workflow run, performs planning, selects a tool, and either:

- auto-completes safe actions
- pauses for approval on risky actions
- fails if evaluation cannot recover

### `GET /runs/:runId`

Returns the full stored run, including state, plan, traces, and tool outputs.

### `POST /runs/:runId/approve`

Approves a waiting run and resumes execution for the selected risky tool.

## Workflow states

- `created`
- `planning`
- `waiting_for_approval`
- `executing`
- `evaluating`
- `completed`
- `failed`

The key idea is that state is explicit and serializable. You should be able to inspect the JSON file and understand where the workflow is and why.

## Example tasks

- `Summarize the incident update process for me`
- `Create a follow-up task for the finance team to review travel receipts`
- `Send a summary of the travel policy to leadership`

See [examples/curl.md](./examples/curl.md) for copy-paste requests.

## Common agent orchestration mistakes

- hiding workflow state inside one large prompt
- letting risky actions execute without a first-class approval state
- mixing planning logic directly into tool code
- failing to capture trace events for replay and debugging
- skipping evaluation and retry logic after tool execution

## Smoke check

```bash
npm run smoke
```

This loads the app, planner, tool registry, and workflow engine, then verifies that a safe task can complete end to end without starting the HTTP server.

## Minimal eval

```bash
npm run eval
```

The eval runs a small set of local scenarios to verify that safe runs complete and risky runs pause for approval. This is the first step toward orchestration quality measurement.

## How this connects to Project 01 and Project 02

This project teaches orchestration before adding framework complexity.

- Project 01 gives you a provider gateway for model calls.
- Project 02 gives you a RAG copilot for grounded retrieval.
- Project 03 shows how a runtime can plan, choose tools, pause for approval, retry, and finalize a response.

Later iterations can route planning or evaluation through Project 01 and connect retrieval tools to Project 02, but the core state machine should be understandable first.
