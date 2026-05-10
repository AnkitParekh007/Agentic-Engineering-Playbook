import type { BrowserEnvironment, ScenarioName, TestRunStatus, TraceEvent } from './types';

export function traceStep(input: {
  runId: string;
  scenario: ScenarioName;
  environment: BrowserEnvironment;
  targetUrl: string;
  status: TestRunStatus;
  step: string;
  success: boolean;
  startedAt: number;
  message?: string;
}): TraceEvent {
  const event: TraceEvent = {
    runId: input.runId,
    scenario: input.scenario,
    environment: input.environment,
    targetUrl: input.targetUrl,
    status: input.status,
    latencyMs: Date.now() - input.startedAt,
    step: input.step,
    success: input.success,
    message: input.message,
  };

  console.log(JSON.stringify({ event: 'qa_browser_trace', ...event }));
  return event;
}
