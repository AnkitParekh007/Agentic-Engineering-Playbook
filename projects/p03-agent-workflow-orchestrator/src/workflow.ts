import crypto from 'node:crypto';
import { config } from './config';
import { buildPlan, detectIntent, selectTool } from './planner';
import { approvalRequestSchema, workflowRunSchema, type ApprovalRequest } from './schemas';
import { findRunById, readTools, saveRun } from './storage';
import { executeTool } from './tools';
import { logTrace } from './tracing';
import type { ToolDefinition, TraceEvent, WorkflowRun } from './types';

function nowIso(): string {
  return new Date().toISOString();
}

function appendTrace(
  run: WorkflowRun,
  step: string,
  state: WorkflowRun['state'],
  success: boolean,
  selectedTool?: string,
  message?: string,
  latencyMs = 0,
): WorkflowRun {
  const trace: TraceEvent = {
    runId: run.id,
    step,
    state,
    selectedTool,
    latencyMs,
    success,
    message,
  };
  logTrace(trace);
  run.traces.push(trace);
  run.updatedAt = nowIso();
  return run;
}

function createEmptyRun(task: string): WorkflowRun {
  return workflowRunSchema.parse({
    id: crypto.randomUUID(),
    task,
    intent: 'pending',
    plan: [],
    state: 'created',
    retryCount: 0,
    requiresApproval: false,
    approvalStatus: 'not_required',
    traces: [],
    createdAt: nowIso(),
    updatedAt: nowIso(),
  });
}

async function evaluateRun(run: WorkflowRun): Promise<WorkflowRun> {
  const evaluationStart = Date.now();
  run.state = 'evaluating';
  appendTrace(run, 'evaluate', 'evaluating', true, run.selectedTool);

  if (run.toolOutput && run.toolOutput.length > 0) {
    run.state = 'completed';
    run.finalResponse = `Workflow completed successfully. Result: ${run.toolOutput}`;
    appendTrace(
      run,
      'finalize',
      'completed',
      true,
      run.selectedTool,
      'Evaluation passed.',
      Date.now() - evaluationStart,
    );
    return saveRun(run);
  }

  if (run.retryCount < config.maxRetries) {
    run.retryCount += 1;
    run.state = 'planning';
    appendTrace(
      run,
      'replan',
      'planning',
      true,
      run.selectedTool,
      'Evaluation requested a retry.',
      Date.now() - evaluationStart,
    );
    return continueWorkflow(run);
  }

  run.state = 'failed';
  run.failureReason = 'Evaluation failed after max retries.';
  appendTrace(
    run,
    'fail',
    'failed',
    false,
    run.selectedTool,
    run.failureReason,
    Date.now() - evaluationStart,
  );
  return saveRun(run);
}

async function executeApprovedTool(run: WorkflowRun, tool: ToolDefinition): Promise<WorkflowRun> {
  const executionStart = Date.now();
  run.state = 'executing';
  appendTrace(run, 'execute', 'executing', true, tool.name);
  run.toolOutput = await executeTool(tool, run.task);
  appendTrace(
    run,
    'tool_result',
    'executing',
    true,
    tool.name,
    run.toolOutput,
    Date.now() - executionStart,
  );
  return evaluateRun(run);
}

export async function continueWorkflow(run: WorkflowRun): Promise<WorkflowRun> {
  const planStart = Date.now();
  const tools = await readTools();
  const intent = detectIntent(run.task);
  const plan = buildPlan(run.task, intent);
  const selectedTool = selectTool(intent, tools);

  run.intent = intent;
  run.plan = plan;
  run.selectedTool = selectedTool.name;
  run.requiresApproval = selectedTool.riskLevel === 'risky';
  if (selectedTool.riskLevel === 'risky' && run.approvalStatus !== 'approved') {
    run.approvalStatus = 'pending';
  } else if (selectedTool.riskLevel === 'safe') {
    run.approvalStatus = 'not_required';
  }
  run.state = 'planning';

  appendTrace(
    run,
    'plan',
    'planning',
    true,
    selectedTool.name,
    `Intent detected: ${intent}`,
    Date.now() - planStart,
  );

  if (selectedTool.riskLevel === 'risky' && run.approvalStatus !== 'approved') {
    run.state = 'waiting_for_approval';
    appendTrace(
      run,
      'await_approval',
      'waiting_for_approval',
      true,
      selectedTool.name,
      'Run paused pending approval.',
    );
    return saveRun(run);
  }

  return executeApprovedTool(run, selectedTool);
}

export async function createWorkflowRun(task: string): Promise<WorkflowRun> {
  const run = createEmptyRun(task);
  appendTrace(run, 'create', 'created', true, undefined, 'Run created.');
  await saveRun(run);
  return continueWorkflow(run);
}

export async function getWorkflowRun(runId: string): Promise<WorkflowRun | undefined> {
  return findRunById(runId);
}

export async function approveWorkflowRun(runId: string, payload: ApprovalRequest): Promise<WorkflowRun> {
  approvalRequestSchema.parse(payload);
  const run = await findRunById(runId);
  if (!run) {
    throw new Error(`Run not found: ${runId}`);
  }

  if (run.state !== 'waiting_for_approval') {
    throw new Error(`Run ${runId} is not waiting for approval.`);
  }

  if (!payload.approved) {
    run.state = 'failed';
    run.approvalStatus = 'rejected';
    run.failureReason = 'Approval was rejected.';
    appendTrace(run, 'approval_rejected', 'failed', false, run.selectedTool, run.failureReason);
    return saveRun(run);
  }

  run.approvalStatus = 'approved';
  appendTrace(run, 'approval_granted', 'waiting_for_approval', true, run.selectedTool, 'Approval granted.');
  return continueWorkflow(run);
}
