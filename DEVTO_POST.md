# Dev.to Post Draft — Agentic Engineering Playbook

**Title:** I open-sourced a production AI engineering curriculum with 6 runnable systems

**Tags:** `ai`, `typescript`, `opensource`, `webdev`

**Cover image:** Use `static/img/social-card.svg` or a screenshot of the live docs

---

## Body

### I wanted to learn how to build production AI systems. So I built a curriculum.

Not a collection of notebooks. Not a list of tutorials. A full, project-first curriculum with 6 working TypeScript systems that cover the path from raw LLM API to deployed, observable, secure AI applications.

It's called **Agentic Engineering Playbook** — open source, MIT licensed, and live now.

[Live docs →](https://ankitparekh007.github.io/Agentic-Engineering-Playbook/)  
[GitHub →](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook)

---

### What the problem was

Most AI learning material is one of two things:

1. **Conceptual overviews** — great for understanding the landscape, useless for shipping systems
2. **Framework tutorials** — teach you how to use LangChain in 15 minutes, but not what to do when it breaks in production, or how to measure whether the output is any good

I wanted something in the middle: concrete enough to run, real enough to extend, and honest about the hard parts — security, evals, observability, deployment.

---

### What I built

**8 curriculum layers, 6 runnable projects:**

#### Layer 1 — LLM Runtime: P01 AI Provider Gateway

A TypeScript module that normalises calls to OpenAI, Anthropic, and local models behind a single interface. Supports streaming, structured outputs, retry logic, and basic tracing.

Why it matters: provider lock-in is real. A clean abstraction layer makes your agent portable and cost-optimisable.

```typescript
// normalised call across providers
const response = await gateway.complete({
  model: 'claude-3-5-sonnet',
  messages: [...],
  schema: z.object({ summary: z.string(), confidence: z.number() })
});
// response.summary and response.confidence are always typed
```

#### Layer 2 — RAG Systems: P02 Enterprise RAG Copilot

A document retrieval pipeline with chunking, embedding, BM25 + vector hybrid search, reranking, citation output, and local retrieval evals.

Why it matters: pure vector search fails on enterprise datasets. BM25 hybrid + reranking closes the gap on exact-match queries (error codes, IDs, file names).

#### Layer 3 — Agent Orchestration: P03 Agent Workflow Orchestrator

A LangGraph-based workflow with planning nodes, tool execution, retry logic, human-in-the-loop approval checkpoints, and OpenTelemetry-compatible trace output.

Why it matters: single LLM calls are not agents. Real agents need inspectable state. If you can't trace what an agent decided and why, you can't debug it or trust it in production.

#### Layer 4 — Tools & MCP: P04 MCP Enterprise Toolkit

A tool server following MCP patterns — read-only by default, parameter validation via Zod, audit logging, and safe error surfaces that don't leak internal state.

Why it matters: agents with unconstrained tool access are a security incident waiting to happen. Every enterprise tool layer needs explicit permission boundaries.

#### Layer 5 — Agentic UI: P05 Angular Agentic Copilot + P06 QA Browser Agent

An Angular shell that consumes agent event streams (AG-UI protocol) and renders plan state, tool calls, approvals, and citations in real-time. Plus a QA browser agent using Playwright with dry-run safety and evidence capture.

Why it matters: most agent demos live in the terminal. Enterprise operators need a UI that shows them what the agent is doing and lets them intervene.

---

### What I learned building this

**1. Evals are the hardest part to teach**

Writing a retrieval eval that measures citation precision is much harder to explain than writing the retrieval code itself. Most tutorials skip it entirely. This playbook doesn't — every project that produces output has an eval suite.

**2. Security is not a layer you add at the end**

Prompt injection, over-privileged tool access, and missing audit trails are architectural problems, not configuration problems. The security layer in this curriculum is in the main path, not an appendix.

**3. TypeScript is the right default for AI engineering tutorials**

Python is excellent for ML research and data pipelines. TypeScript is better for teaching patterns that need to be deployed in web backends and frontends. This repo uses TypeScript for all 6 projects, with the note that Python is preferable for eval frameworks and data work.

**4. The UI layer is where most enterprise AI projects actually fail**

Building a working agent backend is tractable. Building a UI that surfaces agent state in a way operators trust is where most projects stall. P05 attempts to address this with real streaming patterns, not a simple chat box.

---

### How to use it

```bash
git clone https://github.com/AnkitParekh007/Agentic-Engineering-Playbook.git
cd Agentic-Engineering-Playbook
npm install
npm run start
```

Or read the [live docs](https://ankitparekh007.github.io/Agentic-Engineering-Playbook/) without cloning anything.

Each project has its own README, architecture notes, and smoke test:

```bash
cd projects/p01-ai-provider-gateway
npm install && npm run typecheck && npm run build && npm run smoke
```

---

### Contributing

Good-first-issues are labelled and scoped. If you want to add a chapter, there is a guide. If you want to propose a project, there is a template.

[Contributor Quick Start](https://ankitparekh007.github.io/Agentic-Engineering-Playbook/docs/start-here/contributor-quick-start)

---

### What's next

- eval layer for P05 Angular copilot
- Python-first RAG variant for data engineering teams
- video walkthroughs for each project
- community weekly challenges

If this is useful, star it, watch it, or open a good-first-issue. All feedback welcome.

[GitHub →](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook)

---

*Built with Docusaurus 3, TypeScript, LangGraph, Playwright, and Angular 18.*
