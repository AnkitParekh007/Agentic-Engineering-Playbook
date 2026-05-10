import ProjectStatusCard from '@site/src/components/ProjectStatusCard';

# Project: AI Provider Gateway

- **Difficulty:** Intermediate
- **Primary stack:** TypeScript API, optional Python worker
- **Estimated duration:** 1 to 2 weeks
- **Primary hiring signal:** LLM backend architecture
- **Primary monetization signal:** reusable AI platform starter

## Problem statement

Teams need one API surface for model calls, not provider-specific logic scattered across the product.

## Project implementation

<ProjectStatusCard
  project="AI Provider Gateway"
  status="Runnable"
  folderHref="https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p01-ai-provider-gateway"
  stack={['TypeScript', 'Express', 'Zod']}
  commands={[
    'npm install',
    'npm run typecheck',
    'npm run build',
    'npm run smoke',
  ]}
  proves="One gateway can normalize model access, structured outputs, streaming, and trace-aware runtime behavior."
  next="Wire the OpenAI adapter to a real provider, then add fallback routing and rate-aware policies."
/>

## Core workflows

- accept normalized chat requests
- route to a selected provider
- stream partial output
- validate final structured output
- log cost, latency, and errors

## Architecture

```mermaid
flowchart LR
  A["Client"] --> B["Gateway API"]
  B --> C["Provider adapter"]
  C --> D["Model provider"]
  B --> E["Schema validator"]
  B --> F["Trace store"]
```

## Milestones

1. Single provider, single schema, non-streaming response
2. Add streaming transport
3. Add second provider adapter
4. Add tracing, retries, and fallback strategy

## Acceptance criteria

- one endpoint supports validated JSON output
- one streamed endpoint emits partial tokens or events
- at least two provider adapters share one interface
- every run logs latency and estimated cost

## Starter implementation note

The starter code under `projects/p01-ai-provider-gateway` includes a runnable `MockProvider` and an `OpenAIProvider` placeholder. The OpenAI adapter is intentionally not wired to the real API yet, so the default learning path should stay on `PROVIDER=mock` until you implement the provider-specific client.

## Portfolio packaging

Show provider abstraction design, schema validation, trace screenshots, and a side-by-side provider comparison.

## Monetization path

This project can become an internal gateway product, consulting accelerator, or open-core template with enterprise logging and guardrails.
