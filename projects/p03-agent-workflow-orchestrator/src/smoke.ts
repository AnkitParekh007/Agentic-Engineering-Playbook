import { createApp } from './app';
import { readTools } from './storage';
import { createWorkflowRun } from './workflow';

async function run(): Promise<void> {
  const app = await createApp();
  const tools = await readTools();
  const workflowRun = await createWorkflowRun('Summarize the incident update process for me');

  if (tools.length === 0) {
    throw new Error('Smoke test failed: no tools were loaded.');
  }

  if (workflowRun.state !== 'completed') {
    throw new Error(`Smoke test failed: expected completed run, got ${workflowRun.state}.`);
  }

  console.log(
    JSON.stringify({
      ok: true,
      appLoaded: Boolean(app),
      toolCount: tools.length,
      runId: workflowRun.id,
      state: workflowRun.state,
      selectedTool: workflowRun.selectedTool,
    }),
  );
}

void run();
