# Project 06: QA Browser Agent

This starter is a beginner-friendly but production-shaped QA browser agent. It uses a small Express service plus Playwright to validate safe browser scenarios, capture evidence, and persist local reports without touching real credentials or destructive workflows.

The runtime is local-first and safe by default. You can run dry-run evaluations, inspect JSON reports, and later connect the same patterns to orchestration and UI layers from earlier projects.

## What this project teaches

- how to wrap Playwright in a small TypeScript service instead of a one-off script
- how to model browser QA requests, reports, and environment policy with Zod
- how to add strict safety for URLs, timeouts, and production dry-run behavior
- how to store screenshots and reports locally for inspection
- how to keep browser automation deterministic enough for starter evals and CI

## Architecture

The service is split into six layers:

1. `src/app.ts`
   Defines the HTTP API for creating and inspecting test runs.
2. `src/service.ts`
   Validates requests, applies safety policy, coordinates execution, and persists results.
3. `src/runner.ts`
   Launches Playwright, opens the target, runs the selected scenario, and captures a screenshot.
4. `src/scenarios.ts`
   Defines mock-safe scenario fixtures and the checks that each scenario runs.
5. `src/storage.ts`
   Persists run summaries, report JSON files, and screenshot paths locally.
6. `src/tracing.ts`
   Emits structured trace events with run ID, scenario, environment, target URL, status, and latency.

See [architecture.md](./architecture.md) for diagrams.

## Project structure

```text
projects/p06-qa-browser-agent/
|-- data/
|   `-- test-runs.json
|-- evals/
|   |-- run-eval.ts
|   `-- scenarios.json
|-- examples/
|   `-- curl.md
|-- reports/
|-- screenshots/
|-- src/
|   |-- app.ts
|   |-- config.ts
|   |-- runner.ts
|   |-- scenarios.ts
|   |-- schemas.ts
|   |-- server.ts
|   |-- service.ts
|   |-- smoke.ts
|   |-- storage.ts
|   |-- tracing.ts
|   `-- types.ts
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

The service starts on `http://localhost:4006` by default.

## Safety model

Project 06 stays intentionally strict:

- `prod` runs are dry-run only by default
- destructive requests are blocked through `actionIntent: "mutate"`
- only `mock://` targets and configured hosts are allowed
- each environment has a timeout policy
- screenshots and reports stay local in this project

This is deliberate. The starter teaches safe QA automation structure before adding real credentials, production systems, or mutation flows.

## Artifact folders

The `reports/` and `screenshots/` folders are intentionally kept in the repo with `.gitkeep` files so learners can see where evidence lands after a run.

- generated `reports/*.json` files are ignored from Git
- generated `screenshots/*.png` files are ignored from Git
- only the placeholder `.gitkeep` files stay committed

## Supported scenarios

- `homepage_smoke`
- `login_form_visual_check`
- `navigation_check`

Each scenario can run against a `mock://` target for deterministic local development.

## API surface

### `GET /health`

Returns service status, run count, and environment policy.

### `POST /test-runs`

Creates and executes a test run.

### `GET /test-runs/:runId`

Returns the saved run summary.

### `GET /test-runs/:runId/report`

Returns the saved JSON report.

## API examples

See [examples/curl.md](./examples/curl.md).

## Quality checks

### `npm run smoke`

```bash
npm run smoke
```

This verifies that the app loads and a dry-run playground scenario produces a saved report.

### `npm run eval`

```bash
npm run eval
```

The eval verifies that:

- a playground dry run succeeds
- a destructive prod request is blocked
- an invalid external URL is rejected

### `npm run browser-smoke`

```bash
npm run browser-smoke
```

This is an optional local Playwright execution check. It launches Chromium, runs `navigation_check` against `mock://navigation` with `environment: "test"` and `dryRun: false`, then confirms that the run completed and a screenshot file exists.

For real Playwright execution, install the local browser once:

```bash
npx playwright install chromium
```

CI does not run `browser-smoke` yet. The default CI path stays dry-run-safe so the repo can validate the request model, safety policy, and artifact pipeline without depending on a browser install or external targets.

In practice:

- `smoke` verifies local wiring and dry-run report generation
- `eval` verifies policy behavior and deterministic safe scenarios
- `browser-smoke` is the optional local proof that Playwright can launch Chromium and save a screenshot

## How this connects to Projects 03 and 05

- Project 03 provides the orchestration layer that can later trigger QA runs, approvals, and retries.
- Project 05 provides the operator UI that can later visualize run status, screenshots, and reports.

Today Project 06 stays backend-first and local so the browser automation contract is easy to inspect before wiring it into a larger agentic system.
