# LinkedIn Posts — Agentic Engineering Playbook

A library of ready-to-publish posts. Edit for your voice. Never post verbatim — make it yours.

---

## Post 1: Launch announcement

**Best time:** Tuesday or Wednesday, 8–9am your timezone

---

I've open-sourced a full AI engineering curriculum — 8 layers, 6 runnable projects, live docs.

Not tutorials. Not blog posts. Actual TypeScript systems you can clone, run, and extend:

→ P01: AI Provider Gateway (OpenAI + Anthropic + local models, unified interface)
→ P02: Enterprise RAG Copilot (chunking, hybrid search, reranking, citation evals)
→ P03: Agent Workflow Orchestrator (LangGraph, approval states, inspectable traces)
→ P04: MCP Enterprise Toolkit (safe tool interfaces, audit logging, read-only policy)
→ P05: Angular Agentic Copilot (streaming UI, approval flows, AG-UI protocol)
→ P06: QA Browser Agent (Playwright, dry-run safety, evidence capture)

Each project has architecture notes, evals, and CI.

If you're moving from "I use the OpenAI API" to "I build production AI systems" — this is the path.

Live docs → [link]
GitHub → [link]

#AIEngineering #OpenSource #LangChain #RAG #TypeScript

---

## Post 2: Technical insight (RAG)

**Best time:** Thursday, 8am

---

Most RAG demos use pure vector search.

Most production RAG systems use BM25 + vector hybrid with a reranker on top.

Here's why:

Pure vector search optimises for semantic similarity. That's great when the user asks "how does authentication work?" but poor when they ask "show me the error on line 47 of config.yaml."

BM25 handles exact matches — file names, error codes, IDs, proper nouns.

Hybrid search combines both. A reranker (cross-encoder) then re-scores the top-k results against the original query.

The result: dramatically better retrieval on enterprise datasets that mix prose and structured content.

This is covered in the RAG chapter of Agentic Engineering Playbook with a working TypeScript implementation and retrieval evals.

[link to chapter]

#RAG #VectorSearch #LLM #AIEngineering

---

## Post 3: Weekly challenge announcement

**Best time:** Monday, 8am

---

This week's Agentic Engineering Challenge:

Add streaming token counts to the AI Provider Gateway.

Goal: after each streaming response, emit a final usage summary — prompt_tokens, completion_tokens, total_tokens.

OpenAI supports this via stream_options. Anthropic emits message_stop events.

Good for: understanding how LLM cost tracking actually works at the infrastructure level.

Fork → build → share your result with #AgenticPlaybook.

Full challenge brief: [link]

---

## Post 4: Technical insight (agents)

**Best time:** Tuesday, 8am

---

The biggest mistake I see in agent demos:

They treat the agent as a black box and the UI as a display screen.

Production agents need a different model:

The agent emits structured events — PLAN_CREATED, TOOL_CALLED, APPROVAL_REQUIRED, TEXT_DELTA.

The UI is an event consumer. It renders what the agent is doing in real-time, blocks on approvals, and gives operators a way to intervene.

This is the AG-UI protocol pattern. It separates agent runtime from operator experience cleanly.

The Angular copilot in Agentic Engineering Playbook implements this. The agent runs in the backend. The UI listens to its event stream and renders state — live.

[link to chapter]

#AgentDevelopment #AngularDevelopment #AIEngineering #UX

---

## Post 5: Recruiter/career post

**Best time:** Friday, 9am

---

What does an AI engineering portfolio actually look like in 2025?

Not: "I built a ChatGPT wrapper"
Not: "I fine-tuned a model" (unless you can explain why)

Yes:
→ A provider gateway with retry, structured outputs, and traces
→ A RAG pipeline with eval scores attached (precision, recall, citation accuracy)
→ An orchestration runtime with inspectable state and approval flows
→ Evidence of security thinking (what your agent is NOT allowed to do)

Agentic Engineering Playbook is designed to produce exactly this portfolio across 6 projects.

If you're preparing for AI engineering roles this year, this is the path.

[link]

#AIEngineering #SoftwareEngineering #CareerDevelopment #OpenSource

---

## Post 6: Community milestone

**Template — fill in when you hit your first contributor PR**

---

First external PR just landed on Agentic Engineering Playbook.

[Name] added [what they built/fixed].

This is exactly how an open-source curriculum should grow — practitioners improving the material they used.

If you've found the repo useful and want to contribute, the good-first-issue list has scoped tasks ready to pick up.

[link to good first issues]

#OpenSource #AIEngineering #Community

