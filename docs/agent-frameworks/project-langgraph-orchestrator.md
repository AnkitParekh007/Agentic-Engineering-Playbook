import ProjectStatusCard from '@site/src/components/ProjectStatusCard';

# Project: Agent Workflow Orchestrator

- **Difficulty:** Advanced
- **Primary stack:** TypeScript or Python workflow runtime
- **Estimated duration:** 2 weeks
- **Primary hiring signal:** orchestration and state management
- **Primary monetization signal:** internal automation framework

## Problem statement

Teams need AI workflows that can reason, retrieve, call tools, request approval, and recover from failure without disappearing into one large prompt.

## Project implementation

<ProjectStatusCard
  project="Agent Workflow Orchestrator"
  status="Runnable"
  folderHref="https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p03-agent-workflow-orchestrator"
  stack={['TypeScript', 'Express', 'State machine runtime']}
  commands={[
    'npm install',
    'npm run typecheck',
    'npm run build',
    'npm run smoke',
    'npm run eval',
  ]}
  proves="Agent runs can be modeled as explicit state transitions with approvals, retries, and inspectable traces instead of hidden prompt loops."
  next="Swap the deterministic planner for a real orchestrator runtime and connect tool execution to Projects 02 and 04."
/>

## Core workflows

- intake a business task
- build or refine a plan
- call tools or retrieval nodes
- request approval for sensitive actions
- finalize a structured result

## Milestones

1. Define graph state and node contract
2. Add planning and retrieval nodes
3. Add tool node and approval node
4. Add checkpoints, replay, and failure handling

## Acceptance criteria

- workflow state is explicit and serializable
- approvals are first-class state transitions
- tool errors can be distinguished from model errors
- at least one run can be inspected from trace data

## Starter implementation

Starter code is now available in [`projects/p03-agent-workflow-orchestrator`](https://github.com/AnkitParekh007/Agentic-Engineering-Playbook/tree/main/projects/p03-agent-workflow-orchestrator). The current starter uses a local state machine, mock tools, approval gating, inspectable traces, and a minimal eval so learners can understand orchestration fundamentals before adding framework complexity.

## Portfolio packaging

Share the graph diagram, run timeline, approval flow, and one failure recovery example.

## Monetization path

This can evolve into a reusable workflow engine for operations, customer support, internal copilots, or agent platform consulting.
