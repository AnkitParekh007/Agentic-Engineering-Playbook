# Layer 8: Cloud Deployment

## Beginner explanation

Deployment is how a local prototype becomes a team-usable system. You need environments, secrets, containers, CI/CD, and a way to debug runtime failures.

## Production explanation

Agentic systems add deployment complexity because they depend on model providers, vector stores, browser runtimes, background jobs, and observability infrastructure. Deployment planning should cover scaling, rollout strategy, and failure isolation.

## Enterprise example

A support copilot runs as a containerized API with separate staging and production environments, managed secrets, CI checks, and dashboards for latency, errors, and spend.

## Architecture diagram

```mermaid
flowchart LR
  A["GitHub push"] --> B["CI pipeline"]
  B --> C["Unit and integration tests"]
  C --> D["Build container"]
  D --> E["Deploy to staging"]
  E --> F["Smoke tests and eval gate"]
  F --> G["Deploy to production"]
```

## TypeScript example

```ts
export function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}
```

## Python example

```python
import os

def require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Missing environment variable: {name}")
    return value
```

## Common mistakes

- treating local `.env` setup as a deployment strategy
- no staging environment for prompts, tools, and retrieval changes
- shipping browser or background dependencies without container validation
- no release rollback story

## Mini exercise

Write the exact environment variables, external services, and smoke tests required to deploy one of your projects.

## Project assignment

Containerize your chosen project, add a CI workflow outline, and document staging versus production configuration.

## Interview questions

- What makes deploying an agentic app harder than a standard CRUD API?
- Which dependencies should be validated in CI before deployment?
- How would you control spend during an early production rollout?

## Monetization angle

Deployment closes the credibility gap between demos and buying decisions. Many teams will pay for “productionization” even if they already built a prototype internally.
