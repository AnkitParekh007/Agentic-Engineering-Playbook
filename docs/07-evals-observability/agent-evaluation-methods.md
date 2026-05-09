# Agent Evaluation Methods

## Evaluation types

| Eval type | Purpose |
|---|---|
| Unit eval | tests one prompt or tool |
| RAG eval | tests retrieval and citations |
| Workflow eval | tests full agent path |
| Security eval | tests prompt injection and risky tools |
| UX eval | tests usefulness and clarity |

## Example evaluation case

```ts
export interface EvalCase {
  id: string;
  input: string;
  expectedBehavior: string;
  forbiddenBehavior?: string;
  requiredSources?: string[];
}
```
