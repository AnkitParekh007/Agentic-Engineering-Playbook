import { z } from 'zod';

export const runRequestSchema = z.object({
  task: z.string().min(1),
});

export const runStateSchema = z.enum([
  'created',
  'planning',
  'waiting_for_approval',
  'executing',
  'evaluating',
  'completed',
  'failed',
]);

export const toolDefinitionSchema = z.object({
  name: z.enum(['knowledge_search', 'create_task', 'send_summary']),
  description: z.string().min(1),
  riskLevel: z.enum(['safe', 'risky']),
});

export const approvalRequestSchema = z.object({
  approved: z.boolean(),
  reason: z.string().min(1).optional(),
  approvedBy: z.string().min(1).optional(),
});

export const traceEventSchema = z.object({
  runId: z.string().min(1),
  step: z.string().min(1),
  state: runStateSchema,
  selectedTool: z.string().optional(),
  latencyMs: z.number().int().nonnegative(),
  success: z.boolean(),
  message: z.string().optional(),
  approvalReason: z.string().optional(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().datetime().optional(),
});

export const workflowRunSchema = z.object({
  id: z.string().min(1),
  task: z.string().min(1),
  intent: z.string().min(1),
  plan: z.array(z.string()),
  selectedTool: z.string().optional(),
  state: runStateSchema,
  retryCount: z.number().int().nonnegative(),
  requiresApproval: z.boolean(),
  approvalStatus: z.enum(['pending', 'approved', 'rejected', 'not_required']),
  approvalReason: z.string().optional(),
  approvedBy: z.string().optional(),
  approvedAt: z.string().datetime().optional(),
  toolOutput: z.string().optional(),
  finalResponse: z.string().optional(),
  failureReason: z.string().optional(),
  traces: z.array(traceEventSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type RunRequest = z.infer<typeof runRequestSchema>;
export type ApprovalRequest = z.infer<typeof approvalRequestSchema>;
