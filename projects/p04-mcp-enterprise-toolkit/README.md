# Project 04: MCP Enterprise Toolkit

This starter is a beginner-friendly but production-shaped MCP-style enterprise tool layer. It exposes a small set of read-only tools and resources through a local HTTP server so learners can understand safe tool integration before adding real connectors, auth, or a full MCP transport.

The runtime is fully local and does not require paid APIs. All tools are read-only in v1, inputs are validated with Zod, and the server logs audit metadata for every invocation.

## MCP-style vs real MCP

This starter teaches MCP concepts through a simple HTTP server first. It is intentionally MCP-style, not a full MCP implementation yet.

What is already modeled here:

- `tools`: explicit tool registry with names, schemas, and safety metadata
- `resources`: typed resource surfaces that a client can inspect
- `schemas`: narrow input validation and machine-readable result shapes

What is simplified for learning:

- `transports`: this starter uses plain HTTP, not MCP stdio or other protocol transports
- `clients`: requests are made with cURL or any HTTP client, not a dedicated MCP client yet

Future versions can keep the same tool and resource concepts while adding real MCP transport and client support.

## What this project teaches

- how to define tool metadata and narrow input schemas
- how to expose tools and resources through a simple MCP-style server
- how to keep early enterprise integrations read-only and inspectable
- how to validate invocation payloads before running tool handlers
- how to log audit events for tool usage

## Architecture

The service has five main layers:

1. `src/app.ts`
   Defines the HTTP API for tool and resource access.
2. `src/storage.ts`
   Loads the local tool registry from `data/tools.json`.
3. `src/resources.ts`
   Defines the mock enterprise resource registry.
4. `src/toolkit.ts`
   Validates tool inputs, rejects unsafe operations, and runs the tool handlers.
5. `src/audit.ts`
   Emits audit events for each invocation.

See [architecture.md](./architecture.md) for the system diagrams.

## Project structure

```text
projects/p04-mcp-enterprise-toolkit/
|-- data/
|   `-- tools.json
|-- evals/
|   |-- run-eval.ts
|   `-- scenarios.json
|-- examples/
|   `-- curl.md
|-- src/
|   |-- app.ts
|   |-- audit.ts
|   |-- config.ts
|   |-- resources.ts
|   |-- schemas.ts
|   |-- server.ts
|   |-- smoke.ts
|   |-- storage.ts
|   |-- toolkit.ts
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

The server starts on `http://localhost:4004` by default.

## Environment variables

```env
PORT=4004
```

## API surface

### `GET /health`

Returns service status plus tool and resource counts.

### `GET /tools`

Returns the local tool registry with metadata such as `inputSchema`, `riskLevel`, `readOnly`, and `requiresApproval`.

### `POST /tools/:toolName/invoke`

Validates the request, rejects unsafe operations, and executes the named tool if it exists.

### `GET /resources`

Returns the mock enterprise resource registry.

### `GET /resources/:resourceId`

Returns the full resource payload for one registry entry.

## Available tools

- `file_search`
- `jira_readonly_mock`
- `github_readonly_mock`
- `database_readonly_mock`

All tools are read-only in v1.

## Available resources

- `docs`
- `tickets`
- `repos`
- `database_tables`

## Common MCP and tooling mistakes

- exposing broad tools without explicit input schemas
- mixing read and write behavior in the same early tool surface
- allowing unknown tool names to pass through to handlers
- skipping audit metadata for enterprise integrations
- pretending a local mock toolkit is already a full MCP server

## Error categories

Failed invocations stay beginner-friendly but include a simple error category when useful:

- `UNKNOWN_TOOL`
- `WRITE_BLOCKED`
- `INVALID_INPUT`

## Smoke check

```bash
npm run smoke
```

This verifies that the app, tool registry, and one known read-only tool can be loaded and invoked locally.

## Minimal eval

```bash
npm run eval
```

The eval verifies that:

- a known read-only tool succeeds
- an unknown tool fails
- invalid input fails
- resource lookup succeeds

## How this connects to Project 03

Project 03 teaches orchestration and approvals. Project 04 provides the safe enterprise tool layer that an orchestrator can call.

Later iterations can connect Project 03 tool execution to this server and upgrade the mock connectors to real systems. The goal here is to make the tool contract, safety model, and audit trail easy to inspect first.
