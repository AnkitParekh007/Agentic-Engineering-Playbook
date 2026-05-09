# Project 01 Architecture

This starter is intentionally small, but the shape mirrors a real AI gateway service.

## Request flow

```mermaid
flowchart TD
  Client["Client or UI"] --> API["Express API"]
  API --> Config["Environment Config"]
  API --> Provider["AIProvider Interface"]
  Provider --> Mock["MockProvider"]
  Provider --> OpenAI["OpenAIProvider Placeholder"]
  API --> Zod["Zod Validation"]
  API --> Trace["Trace Logger"]
  Trace --> Console["Structured Logs"]
  Mock --> Stream["Streaming Simulator"]
```

## Design notes

- The HTTP layer does not know provider-specific details.
- The provider interface keeps chat, streaming, and structured output behavior consistent.
- Zod validation protects the API contract when a caller expects machine-readable JSON.
- Trace logs keep the starter observable from the first day.
- The mock path keeps the project runnable with no paid dependency.
