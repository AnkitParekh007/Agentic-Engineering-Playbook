# Project 01: AI Provider Gateway

This project is the first code-backed build in the playbook. It gives you a minimal but production-shaped gateway service for model calls, structured outputs, streaming responses, and trace logging.

The default experience uses a local `MockProvider`, so you can run the service without a real API key. The code is intentionally small enough for beginners to follow, but the shape matches how teams usually start an internal AI platform layer.

## What this project teaches

- why an AI provider gateway is useful even before you support multiple providers
- how to define a normalized provider interface
- how to expose standard chat and structured-output endpoints
- how to validate structured JSON with Zod
- how to log request traces with request IDs, latency, provider metadata, and estimated cost
- how to think about streaming as a first-class API path

## Architecture

The service has four main layers:

1. `src/server.ts`
   Receives HTTP requests, validates input, selects the provider, and shapes the API response.
2. `src/providers/`
   Defines the `AIProvider` contract plus the `MockProvider` and `OpenAIProvider` implementations.
3. `src/config.ts`
   Loads environment configuration and keeps startup behavior predictable.
4. `src/tracing.ts`
   Emits simple structured logs for each model call.

See [architecture.md](./architecture.md) for the system diagram.

## Project structure

```text
projects/p01-ai-provider-gateway/
|-- examples/
|   `-- curl.md
|-- src/
|   |-- providers/
|   |   |-- ai-provider.ts
|   |   |-- mock-provider.ts
|   |   `-- openai-provider.ts
|   |-- config.ts
|   |-- schemas.ts
|   |-- server.ts
|   |-- smoke.ts
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

The server starts on `http://localhost:4001` by default.

## Environment variables

```env
PORT=4001
PROVIDER=mock
MODEL=mock-gateway-v1
OPENAI_API_KEY=
```

- `PROVIDER=mock` is the default and requires no API key.
- `PROVIDER=openai` enables a placeholder adapter, not a real OpenAI integration yet.
- `MODEL` is logged on every request.
- `OPENAI_API_KEY` is optional unless you decide to extend the OpenAI implementation.

## API surface

### `GET /health`

Returns current service status and active runtime config.

### `POST /chat`

Accepts chat messages and returns a normalized assistant response.

### `POST /chat/stream`

Streams simulated token events when using the mock provider.

The SSE contract is intentionally simple:

- each streamed chunk is sent as a `data:` event with `requestId`, `token`, and `done: false`
- provider adapters only yield token chunks
- the server is the only place that emits the final `done: true` event
- the final event includes `provider`, `model`, `estimatedCostUsd`, and `latencyMs`

### `POST /structured-output`

Returns a JSON object validated with Zod.

## Example request

```bash
curl -X POST http://localhost:4001/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Explain why provider abstraction matters." }
    ]
  }'
```

See [examples/curl.md](./examples/curl.md) for more examples.

## Example response

```json
{
  "requestId": "9b3d13d0-0fcc-420d-bb05-aac4dbb686d8",
  "provider": "mock",
  "model": "mock-gateway-v1",
  "estimatedCostUsd": 0,
  "message": {
    "role": "assistant",
    "content": "Mock response for: Explain why provider abstraction matters."
  },
  "latencyMs": 123
}
```

## Smoke check

```bash
npm run smoke
```

This script imports the configuration, provider factory, and request schema. It is a small sanity check that the gateway wiring loads correctly without starting the HTTP server.

## How this connects to Layer 1

This starter is the implementation companion for Layer 1: LLM Foundations.

It maps directly to the first layer topics:

- provider gateways
- prompt and message normalization
- structured outputs
- streaming
- trace logging and estimated cost metadata

In the docs, Layer 1 explains the concepts. In this folder, you build the first real service that applies them.

## Beginner-friendly next steps

1. Add a timeout policy around provider calls.
2. Add a second mock mode that returns an intentional failure.
3. Extend the OpenAI provider from placeholder to real API integration.
4. Add unit tests for `MockProvider`.
5. Add one more structured schema for a support workflow.

## Portfolio proof

If you finish this starter well, you can show:

- one provider abstraction
- one structured output endpoint
- one streamed endpoint
- one trace log format that looks platform-ready
