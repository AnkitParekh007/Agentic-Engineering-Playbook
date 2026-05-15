# Project 04 Architecture

This starter is a small MCP-style local server, not a full MCP implementation. The goal is to make the tool contract and safety boundary inspectable before adding transport or auth complexity.

## Request flow

```mermaid
flowchart TD
  Client["Client or Orchestrator"] --> API["Express API"]
  API --> Registry["Tool Registry"]
  API --> Resources["Resource Registry"]
  API --> Safety["Safety Layer"]
  Safety --> Handlers["Read-only Tool Handlers"]
  API --> Audit["Audit Logger"]
  Audit --> Console["Structured Logs"]
```

## Resource view

```mermaid
flowchart LR
  Docs["docs"] --> Search["file_search"]
  Tickets["tickets"] --> Jira["jira_readonly_mock"]
  Repos["repos"] --> GitHub["github_readonly_mock"]
  Tables["database_tables"] --> DB["database_readonly_mock"]
```

## Tool, policy, and runtime flow

```mermaid
sequenceDiagram
  participant Client as Client / Orchestrator
  participant API as Express API
  participant Schema as Tool schema validator
  participant Policy as Safety policy gate
  participant Registry as Tool + resource registry
  participant Handler as Read-only handler
  participant Audit as Audit logger

  Client->>API: Invoke tool or read resource
  API->>Registry: Resolve tool/resource metadata
  Registry-->>API: Schema, risk level, read-only flag
  API->>Schema: Validate payload
  Schema-->>API: Valid input or INVALID_INPUT
  API->>Policy: Check read-only and approval boundary
  Policy-->>API: Allow read-only / block write
  API->>Handler: Execute safe handler
  Handler-->>API: Machine-readable result
  API->>Audit: Record request ID, tool, status, latency
  API-->>Client: Result or structured error
```

This view is the learner-facing safety contract: every invocation resolves metadata first, validates input before work starts, blocks writes in the policy gate, and records the outcome in audit logs.

## Design notes

- all tools are read-only in v1
- unknown tools are rejected before handler execution
- write operations are explicitly blocked
- input payloads are validated per tool
- audit logs capture request ID, tool name, success, latency, and result count
- a future version can replace this HTTP shape with a fuller MCP transport while keeping the same safety concepts

## Future extensions

- real MCP stdio transport
- MCP client examples
- auth
- approval-gated write tools
- persistent audit store
