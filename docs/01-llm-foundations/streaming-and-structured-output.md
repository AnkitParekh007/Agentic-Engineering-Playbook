# Streaming and Structured Output

Production AI apps need both human-friendly streaming and machine-readable output.

## Streaming use cases

- chat response tokens
- execution progress
- tool call status
- approval request
- final result

## Structured output use cases

- plans
- task graphs
- test cases
- bug reports
- extracted entities

## Example schema

```ts
export interface AgentPlan {
  goal: string;
  steps: Array<{
    id: string;
    title: string;
    tool?: string;
    requiresApproval: boolean;
  }>;
  riskLevel: 'low' | 'medium' | 'high';
}
```
