import crypto from 'node:crypto';
import { ZodError } from 'zod';
import { config, getEnvironmentConfig } from './config';
import { reportSchema, testRunRequestSchema, testRunResultSchema } from './schemas';
import { createDryRunSummary, runBrowserScenario } from './runner';
import { appendRun, getRun, readReport, updateRun, writeReport } from './storage';
import { traceStep } from './tracing';
import type { TestReport, TestRunRequest, TestRunResult, TraceEvent } from './types';

type HttpError = Error & {
  statusCode?: number;
  requestId?: string;
  details?: unknown;
};

export async function createTestRun(payload: unknown): Promise<TestRunResult> {
  const requestId = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  try {
    const parsed = testRunRequestSchema.parse(payload);
    const request: Required<TestRunRequest> = {
      dryRun: parsed.dryRun ?? false,
      actionIntent: parsed.actionIntent ?? 'observe',
      environment: parsed.environment,
      scenario: parsed.scenario,
      targetUrl: parsed.targetUrl,
    };

    const runId = crypto.randomUUID();
    const runStartedAt = Date.now();
    const traces: TraceEvent[] = [];
    const environmentConfig = getEnvironmentConfig(request.environment);

    assertAllowedTarget(request.targetUrl, environmentConfig.allowedHosts);

    if (request.actionIntent === 'mutate') {
      return await rejectRun({
        runId,
        request,
        createdAt,
        requestId,
        failureReason: 'Destructive browser actions are blocked in Project 06 v1.',
        traces,
        runStartedAt,
      });
    }

    const effectiveDryRun = request.dryRun || environmentConfig.forceDryRun;
    let run: TestRunResult = testRunResultSchema.parse({
      id: runId,
      scenario: request.scenario,
      environment: request.environment,
      targetUrl: request.targetUrl,
      dryRun: effectiveDryRun,
      actionIntent: request.actionIntent,
      status: 'created',
      latencyMs: 0,
      reportPath: 'pending',
      createdAt,
      updatedAt: createdAt,
    });

    traces.push(
      traceStep({
        runId,
        scenario: request.scenario,
        environment: request.environment,
        targetUrl: request.targetUrl,
        status: 'created',
        step: 'request_accepted',
        success: true,
        startedAt: runStartedAt,
        message: effectiveDryRun
          ? 'Run accepted in dry-run mode.'
          : 'Run accepted for browser execution.',
      }),
    );

    run = {
      ...run,
      status: 'running',
      updatedAt: new Date().toISOString(),
    };

    await appendRun(run);

    const executionStartedAt = Date.now();
    let reportDraft: Pick<TestReport, 'summary' | 'checks' | 'screenshotPath'>;

    if (effectiveDryRun) {
      traces.push(
        traceStep({
          runId,
          scenario: request.scenario,
          environment: request.environment,
          targetUrl: request.targetUrl,
          status: 'completed',
          step: 'dry_run_only',
          success: true,
          startedAt: executionStartedAt,
          message:
            request.environment === 'prod'
              ? 'Prod is dry-run only by default.'
              : 'Dry run requested explicitly.',
        }),
      );

      reportDraft = createDryRunSummary(request);
    } else {
      traces.push(
        traceStep({
          runId,
          scenario: request.scenario,
          environment: request.environment,
          targetUrl: request.targetUrl,
          status: 'running',
          step: 'launch_browser',
          success: true,
          startedAt: executionStartedAt,
        }),
      );

      reportDraft = await runBrowserScenario({
        runId,
        request,
        timeoutMs: environmentConfig.timeoutMs,
        screenshotsDir: config.screenshotsDir,
        traces,
      });
    }

    const report: TestReport = reportSchema.parse({
      runId,
      scenario: request.scenario,
      environment: request.environment,
      targetUrl: request.targetUrl,
      dryRun: effectiveDryRun,
      summary: reportDraft.summary,
      screenshotPath: reportDraft.screenshotPath,
      checks: reportDraft.checks,
      traces,
      createdAt: new Date().toISOString(),
    });

    const reportPath = await writeReport(report);
    const failedCheck = report.checks.find((check) => !check.success);
    const completedAt = new Date().toISOString();

    run = testRunResultSchema.parse({
      ...run,
      dryRun: effectiveDryRun,
      status: failedCheck ? 'failed' : 'completed',
      latencyMs: Date.now() - runStartedAt,
      reportPath,
      screenshotPath: report.screenshotPath,
      failureReason: failedCheck ? failedCheck.detail : undefined,
      updatedAt: completedAt,
    });

    await updateRun(run);
    return run;
  } catch (error) {
    throw toHttpError(error, requestId);
  }
}

export async function fetchTestRun(runId: string): Promise<TestRunResult | null> {
  return getRun(runId);
}

export async function fetchTestReport(runId: string): Promise<TestReport | null> {
  return readReport(runId);
}

function assertAllowedTarget(targetUrl: string, allowedHosts: string[]): void {
  if (targetUrl.startsWith('mock://')) {
    return;
  }

  let url: URL;
  try {
    url = new URL(targetUrl);
  } catch {
    const error = new Error(`Invalid target URL: ${targetUrl}`) as HttpError;
    error.statusCode = 400;
    throw error;
  }

  if (!allowedHosts.includes(url.hostname)) {
    const error = new Error(`Target host is not allowed: ${url.hostname}`) as HttpError;
    error.statusCode = 400;
    throw error;
  }
}

async function rejectRun(input: {
  runId: string;
  request: Required<TestRunRequest>;
  createdAt: string;
  requestId: string;
  failureReason: string;
  traces: TraceEvent[];
  runStartedAt: number;
}): Promise<TestRunResult> {
  input.traces.push(
    traceStep({
      runId: input.runId,
      scenario: input.request.scenario,
      environment: input.request.environment,
      targetUrl: input.request.targetUrl,
      status: 'rejected',
      step: 'safety_blocked',
      success: false,
      startedAt: input.runStartedAt,
      message: input.failureReason,
    }),
  );

  const report: TestReport = reportSchema.parse({
    runId: input.runId,
    scenario: input.request.scenario,
    environment: input.request.environment,
    targetUrl: input.request.targetUrl,
    dryRun: true,
    summary: input.failureReason,
    checks: [
      {
        name: 'request_blocked',
        success: false,
        detail: input.failureReason,
      },
    ],
    traces: input.traces,
    createdAt: new Date().toISOString(),
  });

  const reportPath = await writeReport(report);
  const run = testRunResultSchema.parse({
    id: input.runId,
    scenario: input.request.scenario,
    environment: input.request.environment,
    targetUrl: input.request.targetUrl,
    dryRun: true,
    actionIntent: input.request.actionIntent,
    status: 'rejected',
    latencyMs: Date.now() - input.runStartedAt,
    reportPath,
    failureReason: input.failureReason,
    createdAt: input.createdAt,
    updatedAt: new Date().toISOString(),
  });

  await appendRun(run);
  return run;
}

function toHttpError(error: unknown, requestId: string): HttpError {
  if (error instanceof ZodError) {
    const httpError = new Error('Invalid test run request.') as HttpError;
    httpError.statusCode = 400;
    httpError.requestId = requestId;
    httpError.details = error.flatten();
    return httpError;
  }

  if (error instanceof Error) {
    const httpError = error as HttpError;
    httpError.requestId ??= requestId;
    httpError.statusCode ??= 500;
    return httpError;
  }

  const httpError = new Error('Unknown error') as HttpError;
  httpError.statusCode = 500;
  httpError.requestId = requestId;
  return httpError;
}
