import { z } from 'zod';

const allowedTargetPattern = /^(mock:\/\/[a-z0-9-]+|https?:\/\/[^\s]+)$/i;

export const testRunRequestSchema = z.object({
  scenario: z.enum(['homepage_smoke', 'login_form_visual_check', 'navigation_check']),
  environment: z.enum(['playground', 'test', 'prod']),
  targetUrl: z
    .string()
    .min(1)
    .refine((value) => allowedTargetPattern.test(value), 'Target URL must use http(s):// or mock://'),
  dryRun: z.boolean().optional(),
  actionIntent: z.enum(['observe', 'mutate']).optional().default('observe'),
});

export const traceEventSchema = z.object({
  runId: z.string().min(1),
  scenario: z.enum(['homepage_smoke', 'login_form_visual_check', 'navigation_check']),
  environment: z.enum(['playground', 'test', 'prod']),
  targetUrl: z.string().min(1),
  status: z.enum(['created', 'running', 'completed', 'failed', 'rejected']),
  latencyMs: z.number().min(0),
  step: z.string().min(1),
  success: z.boolean(),
  message: z.string().optional(),
});

export const scenarioCheckSchema = z.object({
  name: z.string().min(1),
  success: z.boolean(),
  detail: z.string().min(1),
});

export const reportSchema = z.object({
  runId: z.string().min(1),
  scenario: z.enum(['homepage_smoke', 'login_form_visual_check', 'navigation_check']),
  environment: z.enum(['playground', 'test', 'prod']),
  targetUrl: z.string().min(1),
  dryRun: z.boolean(),
  summary: z.string().min(1),
  screenshotPath: z.string().optional(),
  checks: z.array(scenarioCheckSchema),
  traces: z.array(traceEventSchema),
  createdAt: z.string().datetime(),
});

export const environmentConfigSchema = z.object({
  environment: z.enum(['playground', 'test', 'prod']),
  forceDryRun: z.boolean(),
  allowedHosts: z.array(z.string().min(1)),
  timeoutMs: z.number().int().positive(),
});

export const testRunResultSchema = z.object({
  id: z.string().min(1),
  scenario: z.enum(['homepage_smoke', 'login_form_visual_check', 'navigation_check']),
  environment: z.enum(['playground', 'test', 'prod']),
  targetUrl: z.string().min(1),
  dryRun: z.boolean(),
  actionIntent: z.enum(['observe', 'mutate']),
  status: z.enum(['created', 'running', 'completed', 'failed', 'rejected']),
  latencyMs: z.number().min(0),
  reportPath: z.string().min(1),
  screenshotPath: z.string().optional(),
  failureReason: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
