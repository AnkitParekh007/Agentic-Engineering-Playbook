import { auditEventSchema } from './schemas';
import type { AuditEvent } from './types';

export function logAudit(event: AuditEvent): void {
  const parsed = auditEventSchema.parse(event);
  console.log(
    JSON.stringify({
      event: 'tool_audit',
      timestamp: new Date().toISOString(),
      ...parsed,
    }),
  );
}
