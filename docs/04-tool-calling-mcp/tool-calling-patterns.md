# Tool Calling Patterns

## Pattern 1: Read-only tools

Safest starting point.

Examples:

- search docs
- read tickets
- list deployments
- query read replica

## Pattern 2: Approval-gated tools

Require human approval before execution.

Examples:

- create ticket
- update status
- send email
- run production test

## Pattern 3: Dangerous tools

Usually disabled or heavily restricted.

Examples:

- delete data
- change permissions
- deploy to production
- modify billing

## Tool definition

```ts
export interface AgentTool {
  name: string;
  description: string;
  inputSchema: unknown;
  riskLevel: 'low' | 'medium' | 'high';
  requiresApproval: boolean;
  execute(input: unknown): Promise<unknown>;
}
```
