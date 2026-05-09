import { z } from 'zod';

export const toolDefinitionSchema = z.object({
  name: z.enum(['file_search', 'jira_readonly_mock', 'github_readonly_mock', 'database_readonly_mock']),
  description: z.string().min(1),
  inputSchema: z.record(z.string(), z.unknown()),
  riskLevel: z.enum(['low', 'medium', 'high']),
  readOnly: z.boolean(),
  requiresApproval: z.boolean(),
});

export const invocationRequestSchema = z.object({
  operation: z.enum(['read', 'write']).default('read'),
  input: z.record(z.string(), z.unknown()),
});

export const invocationResultSchema = z.object({
  requestId: z.string().min(1),
  toolName: z.enum(['file_search', 'jira_readonly_mock', 'github_readonly_mock', 'database_readonly_mock']),
  success: z.boolean(),
  readOnly: z.boolean(),
  resultCount: z.number().int().nonnegative(),
  data: z.array(z.unknown()).optional(),
  error: z.string().optional(),
  errorCode: z.enum(['UNKNOWN_TOOL', 'WRITE_BLOCKED', 'INVALID_INPUT']).optional(),
});

export const resourceDefinitionSchema = z.object({
  id: z.enum(['docs', 'tickets', 'repos', 'database_tables']),
  name: z.string().min(1),
  description: z.string().min(1),
  itemCount: z.number().int().nonnegative(),
  items: z.array(z.record(z.string(), z.unknown())),
});

export const auditEventSchema = z.object({
  requestId: z.string().min(1),
  toolName: z.string().min(1),
  success: z.boolean(),
  latencyMs: z.number().int().nonnegative(),
  readOnly: z.boolean(),
  resultCount: z.number().int().nonnegative(),
});

export const fileSearchInputSchema = z.object({
  query: z.string().min(1),
  path: z.string().min(1).optional(),
});

export const jiraReadonlyInputSchema = z.object({
  query: z.string().min(1),
  status: z.string().min(1).optional(),
});

export const githubReadonlyInputSchema = z.object({
  query: z.string().min(1),
  repo: z.string().min(1).optional(),
});

export const databaseReadonlyInputSchema = z.object({
  table: z.string().min(1),
  filter: z.string().min(1).optional(),
});

export type InvocationRequest = z.infer<typeof invocationRequestSchema>;
