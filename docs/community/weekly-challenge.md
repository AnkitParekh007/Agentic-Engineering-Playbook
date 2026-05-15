---
sidebar_position: 1
title: "Weekly Challenge"
description: "Bite-sized engineering challenges to sharpen your agentic AI skills."
---

# Weekly Challenge

A new challenge ships every week. Each one is scoped to a single session — 1–3 hours of focused, buildable work. Fork a project, complete the challenge, share your result.

## How it works

1. Read the current challenge below
2. Fork the repo or pull the relevant project
3. Build the solution in your own branch
4. Share on LinkedIn or GitHub Discussions with `#AgenticPlaybook`
5. The best implementations get highlighted in the following week's update

## Current challenge

**Week of 2026-05-12: Add streaming token counts to P01**

Project: [P01 — AI Provider Gateway](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p01-ai-provider-gateway)

> **Goal:** Extend the provider gateway to track and emit token usage during streaming responses. The final output should include `prompt_tokens`, `completion_tokens`, and `total_tokens` as a summary event at the end of each stream.

**Acceptance criteria:**
- The gateway accumulates token usage across streaming chunks where the provider supports it (OpenAI and Anthropic both surface this)
- A final `usage` summary event is emitted after the last content chunk
- The existing smoke test still passes: `npm run smoke`
- Add one test in `examples/` that prints the usage summary

**Hints:**
- OpenAI streams `usage` in the final `[DONE]` chunk when `stream_options: { include_usage: true }` is set
- Anthropic emits `message_delta` and `message_stop` events with usage data

**Share your result:** Open a [Discussion](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/discussions) with your branch link and a brief description of what you built.

---

## Past challenges

| Week | Challenge | Project | Skills |
|---|---|---|---|
| 2026-05-05 | Add retry with exponential back-off to P01 | P01 Gateway | resilience, error handling |
| 2026-04-28 | Add metadata filters to P02 retrieval pipeline | P02 RAG Copilot | vector search, filtering |
| 2026-04-21 | Add a human-in-the-loop approval node to P03 | P03 Orchestrator | LangGraph, approvals |
| 2026-04-14 | Write an MCP resource for reading GitHub issues | P04 MCP Toolkit | MCP protocol, tools |
| 2026-04-07 | Add a live typing indicator to P05 Angular copilot | P05 Agentic UI | Angular, AG-UI streams |

---

## Propose a challenge

Have an idea for a good weekly challenge? Open an issue with the label `weekly-challenge`. Good challenges are:

- scoped to 1–3 hours of real work
- tied to a specific project in this playbook
- teachable — completing it produces a skill, not just a PR
- verifiable — there is a clear acceptance criterion

---

## Challenge leaderboard

Consistent contributors who complete 4+ challenges and share their work publicly get a shoutout in the README and contributor wall. No points system — just recognition for people doing real work.
