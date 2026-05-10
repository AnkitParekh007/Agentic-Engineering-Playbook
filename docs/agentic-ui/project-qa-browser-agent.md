# Project: QA Browser Agent

- **Difficulty:** Advanced
- **Primary stack:** TypeScript backend with Playwright
- **Estimated duration:** 2 weeks
- **Primary hiring signal:** agentic QA automation
- **Primary monetization signal:** internal QA copilot starter

## Problem statement

Many teams want AI agents to validate front-end quality, but they jump straight into risky browser automation without clear safety rules. This project teaches a safer path: explicit scenario contracts, allowed targets, dry-run behavior, and inspectable evidence.

## Core workflows

- accept a browser QA request
- apply environment and safety policy
- run or simulate a Playwright scenario
- capture screenshot and report JSON
- expose run status to other systems

## Milestones

1. request and safety model
2. Playwright runner and local evidence capture
3. reports, traces, and deterministic evals
4. orchestration and UI integration

## Acceptance criteria

- safe playground runs succeed locally
- prod requests are dry-run only or blocked
- invalid targets are rejected
- screenshots and reports are inspectable after each run

## Starter implementation

Starter code is now available in [`projects/p06-qa-browser-agent`](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p06-qa-browser-agent). The current starter provides a local Express service, Playwright runner, strict safety model, mock-safe scenarios, local reports, screenshots, and a minimal evaluation loop.

The current version is intentionally constrained:

- it does not use real credentials
- it does not hit real production systems
- it blocks destructive requests in v1
- it uses dry-run mode and `mock://` targets to keep CI deterministic
- CI stays dry-run-safe by default, while an optional `browser-smoke` script is available for local Playwright validation after installing Chromium

## Portfolio packaging

Show one dry-run flow, one safe executed flow, a report JSON, and a screenshot artifact. The strongest demos pair this backend with Project 05 so the QA run is visible in a copilot-style UI.

## Monetization path

This can become an internal QA automation starter, a browser validation service for agent platforms, or a premium template for teams building safe operator-facing QA agents.
