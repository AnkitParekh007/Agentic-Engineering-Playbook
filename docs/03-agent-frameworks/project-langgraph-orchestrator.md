# Project: Agent Workflow Orchestrator

## Goal

Build a graph-based orchestrator that can plan, execute tools, evaluate results, and replan.

## Workflow

```mermaid
flowchart TD
  User --> Intent
  Intent --> Retrieval
  Retrieval --> Planner
  Planner --> PermissionCheck
  PermissionCheck --> ToolExecutor
  ToolExecutor --> Evaluator
  Evaluator -->|pass| Final
  Evaluator -->|fail| Replanner
  Replanner --> ToolExecutor
```

## Features

- state object
- nodes
- conditional edges
- retries
- failure handling
- approval gate
- trace view

## Portfolio output

Create a visual trace page showing each agent step.
