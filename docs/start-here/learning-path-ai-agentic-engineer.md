# Learning Path: AI Agentic Engineer

This path is for developers who want to become strong at end-to-end agent systems, not only chat interfaces.

## Core outcome

By the end of this path, you should be able to design and ship a production-shaped agent system with tools, retrieval, approvals, traces, evals, and UI visibility.

## Phase 1: Model access and contracts

Start with:

- [LLM Foundations Overview](../llm-foundations/overview.md)
- [Prompt Contracts](../llm-foundations/prompt-contracts.md)
- [Streaming and Structured Output](../llm-foundations/streaming-and-structured-output.md)
- [Project 01: AI Provider Gateway](../llm-foundations/project-ai-provider-gateway.md)

Goal:

- stop thinking in one-off prompts
- start thinking in stable interfaces

## Phase 2: Retrieval and grounded outputs

Study:

- [RAG Systems Overview](../rag-systems/overview.md)
- [Chunking, Embeddings, Vector Search](../rag-systems/chunking-embeddings-vector-search.md)
- [Hybrid Search, Reranking, Citations](../rag-systems/hybrid-search-reranking-citations.md)
- [Project 02: Enterprise RAG Copilot](../rag-systems/project-enterprise-rag-copilot.md)

Goal:

- make agent outputs grounded and inspectable

## Phase 3: Orchestration and stateful behavior

Study:

- [Agent Frameworks Overview](../agent-frameworks/overview.md)
- [LangGraph State Machines](../agent-frameworks/langgraph-state-machines.md)
- [Project 03: Agent Workflow Orchestrator](../agent-frameworks/project-langgraph-orchestrator.md)

Goal:

- move from single-shot completion flows to multi-step agent systems

## Phase 4: Tooling and MCP-style integration

Study:

- [Tools and MCP Overview](../tool-calling-mcp/overview.md)
- [Tool Calling Patterns](../tool-calling-mcp/tool-calling-patterns.md)
- [MCP Server and Client Basics](../tool-calling-mcp/mcp-server-client-basics.md)
- [Project 04: MCP Enterprise Toolkit](../tool-calling-mcp/project-mcp-enterprise-toolkit.md)

Goal:

- understand tool boundaries, permissions, schemas, and resource access

## Phase 5: Agentic UI and operator workflows

Study:

- [Agentic UI Overview](../agentic-ui/overview.md)
- [AG-UI Event Streams](../agentic-ui/ag-ui-event-streams.md)
- [Angular Copilot UX Patterns](../agentic-ui/angular-copilot-ux-patterns.md)
- [Project 05: Angular Agentic Copilot](../agentic-ui/project-angular-agentic-copilot.md)

Goal:

- expose plans, tools, approvals, sources, and status to real users

## Phase 6: Security, evals, observability, and deployment

Study:

- [Production Security Overview](../production-security/overview.md)
- [Agent Evaluation Methods](../evals-observability/agent-evaluation-methods.md)
- [Traces, Metrics, Costs](../evals-observability/traces-metrics-costs.md)
- [Cloud Deployment Overview](../cloud-deployment/overview.md)

Goal:

- make agent systems reviewable, measurable, and shippable

## Portfolio milestone

You are in strong shape when you can show:

- one model gateway
- one grounded RAG system
- one tool-using orchestrator
- one operator-facing UI
- one trace or eval workflow
- one deployment-ready repo with clear docs and checks
