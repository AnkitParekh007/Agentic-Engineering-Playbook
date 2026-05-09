# Agentic Engineering Playbook

[![Build](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/actions/workflows/ci.yml/badge.svg)](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/actions/workflows/ci.yml)
[![Deploy](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/actions/workflows/deploy-pages.yml)
[![License](https://img.shields.io/github/license/AnkitParekh007/Agentic-Engineering-Playbook)](./LICENSE)
[![Docs](https://img.shields.io/badge/docs-live%20site-00c2ff)](https://ankitparekh007.github.io/Agentic-Engineering-Playbook/)
[![Status](https://img.shields.io/badge/status-launch%20ready-46e8d2)](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook)

A GitBook-style open-source learning platform for developers who want to become AI Agentic Engineers by building real systems.

Live docs: [ankitparekh007.github.io/Agentic-Engineering-Playbook](https://ankitparekh007.github.io/Agentic-Engineering-Playbook/)

## What this is

Agentic Engineering Playbook is a practical Docusaurus curriculum focused on production-grade AI application development. It covers the path from direct LLM API usage to RAG, orchestration, MCP, agentic UI, production security, evals, observability, deployment, and commercialization.

## Quick start

```bash
npm install
npm run start
npm run build
```

For a production-faithful local preview:

```bash
npm run build
npm run serve
```

Open the local site and start with the roadmap:

- [Learning Path](./docs/start-here/learning-path.md)
- [Project Ladder](./docs/start-here/project-ladder.md)

## Screenshot / social preview

![Agentic Engineering Playbook social preview](./static/img/social-card.svg)

## What you will build

1. AI Provider Gateway
2. Enterprise RAG Copilot
3. Agent Workflow Orchestrator
4. MCP Enterprise Toolkit
5. Angular Agentic Copilot
6. QA Browser Agent

Project 01 now includes runnable starter code in [projects/p01-ai-provider-gateway](./projects/p01-ai-provider-gateway/README.md). It ships with a mock-first TypeScript gateway service, structured output validation, streaming simulation, and trace logging.

Project 02 now includes runnable starter code in [projects/p02-enterprise-rag-copilot](./projects/p02-enterprise-rag-copilot/README.md). It ships with local document storage, chunking, hybrid retrieval, citations, a mock-first grounded answer flow, and a minimal retrieval eval.

## Who it is for

- software engineers moving into AI product engineering
- full-stack developers building internal copilots
- founders validating agentic products
- consultants building enterprise AI delivery capability

## Why this repo is useful

- project-first instead of notes-first
- practical enterprise examples
- TypeScript-first with Python where useful
- security, evals, observability, and deployment included in the main path
- designed to create hiring signal, consulting leverage, and product-ready ideas

## 90-day roadmap

### Days 1-30

- finish LLM foundations and provider gateway work
- learn prompt contracts, structured outputs, and streaming
- publish the first architecture note and demo

### Days 31-60

- build the enterprise RAG copilot
- add retrieval quality thinking, citations, and evals
- document tradeoffs, metrics, and failure modes

### Days 61-90

- build orchestration, MCP, agentic UI, and deployment layers
- add approvals, traces, and production hardening
- package the strongest projects into portfolio-ready public assets

## Repository structure

```text
docs/        Curriculum chapters and roadmap content
projects/    Project briefs and starter implementations
src/         Docusaurus site source
static/      Site assets
templates/   Reusable prompts, checklists, and diagrams
```

## Deployment

The repository includes:

- CI build validation on `push` and `pull_request`
- GitHub Pages deployment from `main`
- a Docusaurus config already aligned to `AnkitParekh007/Agentic-Engineering-Playbook`

If GitHub Pages is not live yet, enable it in repository settings and choose **GitHub Actions** as the source.

## Contributing

Contributions are welcome for curriculum accuracy, code examples, diagrams, Docusaurus improvements, and starter project scaffolding.

- Read [CONTRIBUTING.md](./CONTRIBUTING.md)
- Open an issue for curriculum gaps or implementation bugs
- Send a PR for docs fixes, build improvements, or new examples

## Launch and community CTA

If this repository is useful:

- star it to support the project
- watch it for roadmap updates
- fork it to build your own learning track or internal variant
- share it with developers who want to move from AI demos to real systems

## License

MIT
