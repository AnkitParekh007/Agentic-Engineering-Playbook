# Project 05: Angular Agentic Copilot

This starter is a beginner-friendly but production-shaped Angular UI for an agentic copilot. It focuses on the front-end shell that operators and developers actually use: sessions, streamed answers, tool activity, approvals, and environment-aware execution context.

The app runs entirely locally with a mock API layer. You can explore the copilot UX patterns before wiring the UI to Projects 01 through 04.

## What this project teaches

- how to structure an agentic Angular app into components, services, models, and a mock API layer
- how to build a ChatGPT-style shell with sessions, chat, and side panels
- how to simulate streaming responses and visible activity timelines
- how to model approvals in the UI instead of hiding them in logs
- how to keep copilot state inspectable with a small local state service

## Architecture

The UI is split into five layers:

1. `src/app/components/`
   Reusable UI pieces such as the session sidebar, chat thread, composer, activity panel, and approval card.
2. `src/app/services/copilot-state.service.ts`
   Small local state layer for sessions, messages, activities, approvals, and preferences.
3. `src/app/services/mock-agent-api.service.ts`
   Simulates planning, retrieval, tool events, approvals, and streamed assistant responses.
4. `src/app/models/copilot.models.ts`
   Shared TypeScript contracts for messages, sessions, activities, approvals, and runtime settings.
5. `src/app/app.component.ts`
   Composes the full shell and coordinates interactions between the state service and mock runtime.

See [architecture.md](./architecture.md) for diagrams.

## Project structure

```text
projects/p05-angular-agentic-copilot/
|-- src/
|   |-- app/
|   |   |-- components/
|   |   |-- models/
|   |   `-- services/
|   |-- index.html
|   |-- main.ts
|   `-- styles.css
|-- examples/
|   `-- user-flows.md
|-- architecture.md
|-- angular.json
|-- package-lock.json
|-- package.json
|-- tsconfig.app.json
`-- tsconfig.json
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run start
```

The app runs on the Angular dev server and uses local browser storage for session history.

## UI features

- left session sidebar
- main chat area
- right tool and activity panel
- bottom composer
- mode selector: `Ask`, `Plan`, `Agent`
- model selector: `Mock`, `OpenAI placeholder`, `Local placeholder`
- environment selector: `playground`, `test`, `prod`
- approval card with approve, reject, and approval reason
- streaming simulation with typewriter-style assistant responses

## Session behavior

Session history is stored locally in `localStorage`.

You can:

- create a session
- switch sessions
- delete sessions
- keep separate message and activity history per session

## UI screenshots

This starter includes a placeholder preview asset and a screenshots workspace under [`docs/screenshots`](./docs/screenshots/README.md).

Placeholder preview:

- [`docs/screenshots/copilot-preview-placeholder.svg`](./docs/screenshots/copilot-preview-placeholder.svg)

This is the right place to add real screenshots, GIFs, or short demo captures once you run the UI locally.

Suggested captures:

- Ask mode conversation
- Plan mode response with timeline
- Agent mode request that triggers approval
- Session switching and deletion

## Quality checks

Run the project checks locally with:

```bash
npm run build
npm run smoke
```

## How this connects to Projects 01-04

- Project 01 provides the provider gateway that can later power model selection and streaming.
- Project 02 provides the RAG system that can later feed the retrieval stage and evidence panel.
- Project 03 provides the workflow orchestration model behind approvals, timelines, and execution states.
- Project 04 provides the safe MCP-style tool layer that can later back the tool activity panel.

Today this project uses a mock runtime so the UI can be explored independently. The next step is to replace the mock services with real adapters to the earlier projects.
