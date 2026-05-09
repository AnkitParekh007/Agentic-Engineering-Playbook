# Project: AI Provider Gateway

## Goal

Build a small provider gateway that abstracts OpenAI, Anthropic, and local models.

## Features

- `POST /ai/chat`
- `POST /ai/chat/stream`
- `POST /ai/structured-output`
- provider switch
- retry policy
- timeout policy
- token usage logging
- trace ID per request

## Architecture

```mermaid
flowchart TD
  Client --> Controller
  Controller --> ProviderRouter
  ProviderRouter --> OpenAIProvider
  ProviderRouter --> AnthropicProvider
  ProviderRouter --> LocalProvider
  Controller --> TraceLogger
  Controller --> CostTracker
```

## Portfolio output

Publish this as your first repo and explain why provider abstraction matters for enterprise AI applications.
