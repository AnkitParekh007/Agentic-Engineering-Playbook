import type { TraceResult } from './types';

export function logTrace(trace: TraceResult): void {
  console.log(
    JSON.stringify({
      event: 'ai_gateway_trace',
      timestamp: new Date().toISOString(),
      ...trace,
    }),
  );
}
