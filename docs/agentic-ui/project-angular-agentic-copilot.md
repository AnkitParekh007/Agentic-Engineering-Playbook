import CommandCard from '@site/src/components/CommandCard';
import ProjectStatusCard from '@site/src/components/ProjectStatusCard';

# Project: Angular Agentic Copilot

- **Difficulty:** Advanced
- **Primary stack:** Angular frontend with agent event API
- **Estimated duration:** 2 weeks
- **Primary hiring signal:** AI product UX
- **Primary monetization signal:** premium copilot UI starter

## Problem statement

Many AI products fail because the UI hides system state. This project makes agent work visible, inspectable, and operable.

## Project implementation

<ProjectStatusCard
  status="Runnable"
  folderHref="https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p05-angular-agentic-copilot"
  stack={['Angular', 'TypeScript', 'local mock runtime']}
  proves="A copilot UI can make plans, activity, approvals, and streaming output visible before any real backend is wired in."
  nextUpgrade="Replace the mock runtime with adapters to Projects 01 through 04 and add real screenshots for the landing page."
/>

<CommandCard
  title="Core commands"
  commands={[
    'npm install',
    'npm run start',
    'npm run build',
    'npm run smoke',
  ]}
/>

## Core workflows

- task submission and session history
- streamed answer rendering
- event timeline and plan view
- approval card interactions
- evidence and source browsing

## Milestones

1. Chat shell and session state
2. Event stream timeline
3. Approval cards and source panel
4. Run logs, failure states, and polish

## Acceptance criteria

- the UI renders live execution events
- approvals are actionable and stateful
- users can inspect evidence behind answers
- error and retry states are visible

## Starter implementation

Starter code is now available in [`projects/p05-angular-agentic-copilot`](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p05-angular-agentic-copilot). The current starter provides a local Angular copilot shell with `localStorage`-backed session state, a mock streaming runtime, activity timelines, an approval card flow, and environment-aware execution context.

The current version is intentionally front-end first:

- session state persists locally so learners can inspect multi-session UX without adding a backend
- assistant output streams into the thread with a mock typewriter runtime
- approval requests appear as visible cards in the right panel with approve, reject, and reason input
- the UI stays decoupled from real APIs so it can later connect cleanly to Projects 01 through 04

## Portfolio packaging

Capture timeline views, approval flows, mobile responsiveness, and a full demo path from request to final output.

## Monetization path

This can become a design system starter, front-end consulting offer, or paid template for AI copilot products.
