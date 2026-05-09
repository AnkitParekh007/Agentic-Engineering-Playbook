# AG-UI Event Streams

An agentic frontend should receive structured events, not only final text.

## Example events

```ts
export type AgentEvent =
  | { type: 'message.delta'; text: string }
  | { type: 'tool.started'; toolName: string; input: unknown }
  | { type: 'tool.completed'; toolName: string; result: unknown }
  | { type: 'approval.requested'; approvalId: string; reason: string }
  | { type: 'agent.completed'; finalAnswer: string };
```

## UI behavior

- render deltas as streaming chat
- render tools in timeline
- render approvals as cards
- render final result as summary
