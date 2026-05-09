# Layer 1: LLM Foundations

Before using agent frameworks, you must understand how LLM applications work directly.

## Concepts

- providers
- chat messages
- system prompts
- tool calling
- structured output
- streaming
- retries
- token usage
- cost tracking
- error handling

## Real-life example

A support agent receives a user question, identifies intent, calls an order-status tool, streams progress to the UI, and returns a structured response.

```mermaid
sequenceDiagram
  participant U as User
  participant UI as App UI
  participant API as AI Gateway
  participant LLM as LLM Provider
  participant Tool as Business Tool

  U->>UI: Ask question
  UI->>API: POST /ai/chat
  API->>LLM: Prompt + tool schema
  LLM-->>API: Tool call request
  API->>Tool: Execute tool
  Tool-->>API: Result
  API->>LLM: Tool result
  LLM-->>API: Final answer
  API-->>UI: Stream response
```
