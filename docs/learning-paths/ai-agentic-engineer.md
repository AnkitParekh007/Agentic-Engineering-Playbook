---
sidebar_position: 2
title: "Learning Path: AI Agentic Engineer"
description: "A structured path for software engineers building production-grade autonomous agents, RAG systems, and tool-integrated AI workflows."
---

# Learning Path: AI Agentic Engineer

This is the core path for engineers who want to design, build, and operate production AI agents — systems that use tools, retrieve information, execute multi-step plans, and run reliably in enterprise environments.

## Who this is for

- software engineers with 2+ years of backend or full-stack experience
- developers who have used LLM APIs and want to go further
- engineers tasked with building internal AI products
- anyone preparing for an AI engineering role in 2025–2026

## What you will be able to build by the end

- a provider-agnostic LLM gateway with retry, tracing, and structured outputs
- a RAG pipeline with local evals and citation quality measurement
- a multi-step agent orchestrator with approval states and inspectable traces
- a safe enterprise tool layer using MCP-style patterns
- an operator-facing copilot UI with real-time agent state
- a production hardening plan covering security, evals, observability, and deployment

---

## The path

### Phase 1: LLM runtime and provider abstractions (1–2 weeks)

Before building agents, you need a solid model integration layer.

| Topic | Resource |
|---|---|
| LLM Foundations Overview | [Overview](../llm-foundations/overview) |
| Prompt Contracts | [Prompt Contracts](../llm-foundations/prompt-contracts) |
| Streaming and Structured Outputs | [Streaming and Structured Output](../llm-foundations/streaming-and-structured-output) |

**Build:** [P01 — AI Provider Gateway](../../projects/p01-ai-provider-gateway/README.md)

Outcome: a TypeScript module that normalises calls to OpenAI, Anthropic, and a local model behind a single interface. Add streaming and structured JSON output. Run `npm run smoke`.

**Key concepts to internalize:**
- why provider abstraction matters (vendor lock-in, cost routing, fallback)
- how streaming works at the HTTP and SDK level
- how `zod` schema validation locks model output to a contract

---

### Phase 2: Retrieval and grounded answers (2 weeks)

Agents that only use parametric knowledge hallucinate. RAG grounds them.

| Topic | Resource |
|---|---|
| RAG Overview | [Overview](../rag-systems/overview) |
| Chunking, Embeddings, Vector Search | [Chunking and Embeddings](../rag-systems/chunking-embeddings-vector-search) |
| Hybrid Search, Reranking, Citations | [Hybrid Search](../rag-systems/hybrid-search-reranking-citations) |

**Build:** [P02 — Enterprise RAG Copilot](../../projects/p02-enterprise-rag-copilot/README.md)

Outcome: a document retrieval pipeline with chunking, embedding, vector search, reranking, and citation output. Run `npm run eval` to measure retrieval quality.

**Key concepts to internalize:**
- chunk size trade-offs (granularity vs context)
- why BM25 + vector hybrid beats pure vector search on most enterprise datasets
- citation accuracy as a first-class eval metric

---

### Phase 3: Agent orchestration (2 weeks)

Single LLM calls are not agents. Agents plan, use tools, retry, and ask for help.

| Topic | Resource |
|---|---|
| Agent Frameworks Overview | [Overview](../agent-frameworks/overview) |
| LangGraph State Machines | [LangGraph State Machines](../agent-frameworks/langgraph-state-machines) |
| CrewAI, OpenAI ADK, and Multi-Agent | [CrewAI and OpenAI ADK](../agent-frameworks/crewai-openai-agents-adk) |

**Build:** [P03 — Agent Workflow Orchestrator](../../projects/p03-agent-workflow-orchestrator/README.md)

Outcome: a LangGraph-based workflow with planning, tool execution, retry logic, human approval nodes, and trace output. Run `npm run eval`.

**Key concepts to internalize:**
- state machine design for agent workflows
- how to model approval checkpoints as graph edges
- why inspectable traces are not optional in enterprise agents

---

### Phase 4: Tool calling and MCP (1 week)

Safe tool use is the difference between a useful agent and a dangerous one.

| Topic | Resource |
|---|---|
| Tool Calling Patterns | [Tool Calling Patterns](../tool-calling-mcp/tool-calling-patterns) |
| MCP Server and Client Basics | [MCP Basics](../tool-calling-mcp/mcp-server-client-basics) |

**Build:** [P04 — MCP Enterprise Toolkit](../../projects/p04-mcp-enterprise-toolkit/README.md)

Outcome: an MCP-style tool server with read-only enforcement, parameter validation, audit logging, and safe error surfaces. Run `npm run eval`.

**Key concepts to internalize:**
- why read-only by default is the right starting policy
- how MCP separates resource description from execution
- audit logging as a compliance requirement, not an afterthought

---

### Phase 5: Agentic UI (1 week)

Agents need operator interfaces. A terminal is not a product.

| Topic | Resource |
|---|---|
| Agentic UI Overview | [Overview](../agentic-ui/overview) |
| AG-UI Event Streams | [AG-UI Protocol](../agentic-ui/ag-ui-event-streams) |
| Angular Copilot UX Patterns | [UX Patterns](../agentic-ui/angular-copilot-ux-patterns) |

**Build:** [P05 — Angular Agentic Copilot](../../projects/p05-angular-agentic-copilot/README.md)

Outcome: an Angular copilot shell that consumes agent event streams, renders plan states, and handles approval flows.

---

### Phase 6: Security (1 week)

Production agents face adversarial inputs, over-privileged tool access, and regulatory scrutiny.

| Topic | Resource |
|---|---|
| Guardrails, Permissions, Approvals | [Guardrails](../production-security/guardrails-permissions-approvals) |
| Prompt Injection Threat Model | [Prompt Injection](../production-security/prompt-injection-threat-model) |
| Enterprise Readiness Checklist | [Checklist](../production-security/enterprise-readiness-checklist) |

**Build:** Add input validation, a deny-list guardrail, and rate limiting to P01 or P03. Document the threat model for your orchestrator.

---

### Phase 7: Evals and observability (1 week)

You cannot improve what you cannot measure.

| Topic | Resource |
|---|---|
| Agent Evaluation Methods | [Eval Methods](../evals-observability/agent-evaluation-methods) |
| Traces, Metrics, and Costs | [Observability](../evals-observability/traces-metrics-costs) |

**Build:** Add LangSmith or OpenTelemetry tracing to P03. Write an eval that measures tool call accuracy and plan completion rate.

---

### Phase 8: Deployment (1 week)

| Topic | Resource |
|---|---|
| Docker and CI/CD | [Docker and CI](../cloud-deployment/docker-and-ci-cd) |
| AWS Free Tier Path | [AWS Path](../cloud-deployment/aws-free-tier-path) |

**Build:** Containerise P02 or P03. Add a GitHub Actions workflow that runs the eval suite on each push and posts results as a check.

---

## Completion criteria

You are done when you can demonstrate and explain:

- a production provider gateway with structured outputs and retry
- a grounded RAG pipeline with measurable citation quality
- a multi-step orchestrator with approval states and trace output
- a safe MCP tool layer with audit logging
- an agent UI with real-time state
- at least one eval suite measuring output quality
- a deployment pipeline that runs evals in CI

## Timeline

Focused learner (2–3 hours per day): **8–12 weeks**  
Part-time learner (5–7 hours per week): **16–20 weeks**

## Portfolio output

By the end of this path you have 4–6 GitHub repos that demonstrate production-grade AI engineering across the full stack. Write a brief case study for each. This is the portfolio that gets AI engineering interviews.

See [Portfolio Strategy](../career-monetization/portfolio-strategy) for how to present this work.
