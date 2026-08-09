# Portfolio Role — Agentic Engineering Playbook

This repository is the **systems learning and architecture curriculum** layer of the portfolio.

It should prove breadth across the AI engineering stack without competing with the focused flagship products.

## What it proves

The six-project ladder demonstrates how architectural concerns accumulate:

```text
Provider gateway
  -> streaming + structured outputs + provider abstraction
RAG copilot
  -> retrieval + citations + evaluation
Workflow orchestrator
  -> plans + state + approvals + retries
MCP toolkit
  -> governed tool interfaces + audit
Angular agentic copilot
  -> operator-facing AI UX
QA browser agent
  -> execution safety + evidence capture
```

## Relationship to the flagship repositories

- [`frontend-ai-patterns`](https://github.com/AnkitParekh007/frontend-ai-patterns) goes deeper on trustworthy AI frontend contracts.
- [`ngx-copilot-platform`](https://github.com/AnkitParekh007/ngx-copilot-platform) goes deeper on full-stack Angular copilot platform architecture.
- [`agent-studio`](https://github.com/AnkitParekh007/agent-studio) goes deeper on governed agent lifecycle and runtime publication.
- [`org-ai-force`](https://github.com/AnkitParekh007/org-ai-force) goes deeper on enterprise workspace/orchestration concerns.

## Maintainer principle

Keep this project **project-first, runnable, and honest about production boundaries**. New chapters should deepen architecture decisions, testing, security, evaluation or observability rather than inflate the curriculum with shallow examples.
