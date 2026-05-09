import type { TraceEvent } from './types';

export function logTrace(trace: TraceEvent): void {
  console.log(
    JSON.stringify({
      event: 'workflow_trace',
      timestamp: new Date().toISOString(),
      ...trace,
    }),
  );
}
