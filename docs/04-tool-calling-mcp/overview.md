# Layer 4: Tool Calling and MCP

Agents become useful when they can call tools.

## Tool examples

- search documents
- read Jira tickets
- create test plans
- run browser tests
- query database
- send notifications
- update workflows

## Tool lifecycle

```mermaid
sequenceDiagram
  participant Agent
  participant Policy
  participant Tool
  participant Log

  Agent->>Policy: Can I call this tool?
  Policy-->>Agent: Allowed / approval required / denied
  Agent->>Tool: Execute tool
  Tool-->>Agent: Tool result
  Agent->>Log: Store audit event
```
