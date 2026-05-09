# Guardrails, Permissions, and Approvals

## Permission model

```ts
export interface ToolPermissionPolicy {
  toolName: string;
  allowedRoles: string[];
  requiresApproval: boolean;
  allowedEnvironments: Array<'local' | 'playground' | 'test' | 'prod'>;
}
```

## Approval model

Approval should include:

- requested action
- tool name
- input preview
- risk level
- reason
- approve/deny buttons
- audit log entry
