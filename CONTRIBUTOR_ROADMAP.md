# Contributor Roadmap — Agentic Engineering Playbook

This document describes where the project is heading and where contributions are most needed. It is a living document — updated as priorities shift.

Last updated: 2026-05-14

---

## Current state

| Area | Status |
|---|---|
| 8-layer curriculum | Mostly complete — all layers have at least one chapter |
| 6 runnable projects (P01–P06) | Complete and CI-validated |
| Docusaurus site + GitHub Pages | Live |
| Contributing guides | Complete |
| Learning paths | Added (Angular AI Engineer, AI Agentic Engineer) |
| Issue templates | Complete |
| Community features | Weekly challenges, project submission template |
| Evals layer | Partial — P02, P03, P04, P06 have evals; P01 and P05 do not |
| Observability chapters | Partial — two chapters; need deeper examples |
| Diagrams | Sparse — most chapters need Mermaid diagrams |

---

## Priority 1: Curriculum gaps (highest impact for learners)

These are chapters that exist as stubs or are missing entirely. A contributor who fills one of these meaningfully improves the playbook for everyone.

| Chapter | Layer | Notes |
|---|---|---|
| Structured output validation deep-dive | Layer 1 | Zod, JSON schema, retry on schema failure |
| Embedding model selection guide | Layer 2 | When to use OpenAI vs local vs domain-specific embeddings |
| Multi-agent coordination patterns | Layer 3 | Supervisor, parallel, hierarchical patterns |
| MCP resource vs tool distinction | Layer 4 | Clear conceptual chapter with examples |
| Eval metrics glossary | Layer 7 | Precision, recall, RAGAS, G-eval, LLM-as-judge explained |
| Cost optimisation patterns | Layer 7 | Caching, model routing, prompt compression |
| Kubernetes deployment path | Layer 8 | For teams that have moved past Docker Compose |

---

## Priority 2: Diagrams (high impact, accessible to contributors)

Almost every chapter would benefit from a Mermaid diagram. These are good-first-issues for contributors who are comfortable with systems thinking but may not want to write a full chapter.

| Chapter | Diagram needed |
|---|---|
| rag-systems/chunking-embeddings-vector-search | Data flow: document → chunks → embeddings → index |
| agent-frameworks/langgraph-state-machines | State machine: planning → execution → approval → complete |
| tool-calling-mcp/mcp-server-client-basics | Sequence: client request → MCP server → tool execution → response |
| production-security/prompt-injection-threat-model | Threat model: attack vectors and mitigations |
| evals-observability/agent-evaluation-methods | Eval pipeline: test case → agent run → scoring → report |

Open a [diagram request issue](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/issues/new?template=diagram_request.md) to claim one.

---

## Priority 3: Project extensions (intermediate contributors)

These are extensions to existing projects — not full new projects. Good for contributors who want code-first work.

| Project | Extension | Skill |
|---|---|---|
| P01 Gateway | Add cost tracking per request | TypeScript, token counting |
| P01 Gateway | Add LangSmith tracing | Observability |
| P02 RAG Copilot | Add metadata filtering | Vector DBs |
| P02 RAG Copilot | Add streaming citations | Streaming, citations |
| P03 Orchestrator | Add multi-agent supervisor pattern | LangGraph |
| P05 Angular Copilot | Add eval suite | Angular testing |
| P05 Angular Copilot | Add session cost tracker in UI | Angular, signals |

---

## Priority 4: New projects (advanced contributors)

These are fully new projects not yet in the playbook. They need a proposal issue first.

| Project idea | Layer | Notes |
|---|---|---|
| Python RAG pipeline | Layer 2 | For teams using Python/FastAPI backends |
| Voice agent shell | Layer 5 | Whisper + TTS + streaming |
| Slack/Teams copilot connector | Layer 4 | Common enterprise integration pattern |
| Agent monitoring dashboard | Layer 7 | Real-time traces, cost, and eval dashboard |

---

## Priority 5: Infrastructure and tooling (maintainer-level)

These need deeper repo knowledge and are tracked separately:

- Add PR size labeller to CI
- Add link-checker step to CI
- Add Algolia DocSearch configuration
- Add contributor wall to README

---

## How to contribute

1. Pick a task from the priorities above or from [good-first-issues](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/labels/good%20first%20issue)
2. Comment on the issue to claim it
3. Follow the [Contributor Quick Start](./docs/start-here/contributor-quick-start.md)
4. Open a PR — maintainers review within a few days

Questions? Open a [Discussion](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/discussions).
