# Guardrails, Permissions, and Approvals

## Beginner explanation

Guardrails limit what the agent can do. Permissions decide who is allowed to trigger certain actions. Approvals add a human checkpoint before sensitive work executes.

## Production explanation

These controls must live in application logic, not only in prompts. A reliable system checks policy before execution, records approval decisions, and keeps dangerous operations outside the model’s direct control.

## Real-world enterprise example

A finance assistant can read invoice history directly, but updating payment status requires both role-based permission and human approval from a finance manager.

## Mermaid diagram

```mermaid
flowchart LR
  A["Requested action"] --> B["Policy engine"]
  B --> C["Role check"]
  C --> D["Approval gate"]
  D --> E["Execute tool"]
  E --> F["Audit log"]
```

## TypeScript example

```ts
export function canExecute(role: string, toolName: string) {
  const writeTools = new Set(['update_invoice_status', 'send_customer_email']);
  return !writeTools.has(toolName) || role === 'manager';
}
```

## Python example

```python
def approval_required(tool_name: str) -> bool:
    return tool_name in {"update_invoice_status", "send_customer_email"}
```

## Common mistakes

- assuming prompt instructions are enough to enforce policy
- giving approval meaning only in chat language, not structured state
- not recording who approved what and when
- overusing approvals so heavily that the product becomes unusable

## Mini exercise

Define one policy table for your project with columns for tool, risk, required role, and approval rule.

## Project assignment

Add a permission matrix and approval record format to one of your projects.

## Interview questions

- What should application code enforce that prompts should not?
- How do you keep approvals useful without creating too much friction?
- Which actions should remain fully human-only?

## Monetization angle

Governance is often the difference between a pilot and a procurement-ready AI system. This work supports enterprise delivery, security reviews, and internal platform adoption.
