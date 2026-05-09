# LangGraph-Style State Machines

A state machine makes an agent predictable.

## Example state

```ts
export interface AgentState {
  userMessage: string;
  intent?: string;
  retrievedContext?: string[];
  plan?: AgentPlan;
  toolResults?: ToolResult[];
  errors?: string[];
  finalAnswer?: string;
}
```

## Example nodes

- Intent node
- Retrieval node
- Planner node
- Tool executor node
- Evaluator node
- Final response node

## Why this matters

Stateful orchestration helps with:

- retries
- debugging
- approvals
- resumability
- observability
