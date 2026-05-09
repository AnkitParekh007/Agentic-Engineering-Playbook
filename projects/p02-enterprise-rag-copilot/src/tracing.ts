import type { TraceResult } from './types';

export function logTrace(trace: TraceResult): void {
  console.log(
    JSON.stringify({
      event: 'rag_copilot_trace',
      timestamp: new Date().toISOString(),
      ...trace,
    }),
  );
}
