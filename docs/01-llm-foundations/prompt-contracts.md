# Prompt Contracts

A prompt contract defines exactly what the model is allowed to do and what format it must return.

## Basic contract

```ts
export interface PromptContract<TOutput> {
  role: 'ask' | 'plan' | 'agent';
  system: string;
  user: string;
  tools?: ToolDefinition[];
  outputSchema?: TOutput;
  safetyRules: string[];
}
```

## Example

```ts
const contract = {
  role: 'plan',
  system: 'You are a careful planning agent. Do not execute tools.',
  user: 'Create a migration plan for Angular module federation.',
  safetyRules: ['Never claim execution happened', 'Return steps only']
};
```

## Practice task

Create three prompt contracts:

1. Ask mode
2. Plan mode
3. Agent mode
