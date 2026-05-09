import fs from 'node:fs/promises';
import path from 'node:path';
import { createWorkflowRun } from '../src/workflow';

type EvalScenario = {
  id: string;
  task: string;
  expectedState: string;
};

async function loadScenarios(): Promise<EvalScenario[]> {
  const filePath = path.resolve(process.cwd(), 'evals', 'scenarios.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as EvalScenario[];
}

async function run(): Promise<void> {
  const scenarios = await loadScenarios();
  let passed = 0;

  for (const scenario of scenarios) {
    const workflowRun = await createWorkflowRun(scenario.task);
    const success = workflowRun.state === scenario.expectedState;

    if (success) {
      passed += 1;
    }

    console.log(
      JSON.stringify({
        id: scenario.id,
        success,
        expectedState: scenario.expectedState,
        actualState: workflowRun.state,
        selectedTool: workflowRun.selectedTool ?? null,
      }),
    );
  }

  console.log(
    JSON.stringify({
      event: 'workflow_eval_summary',
      passed,
      total: scenarios.length,
      failed: scenarios.length - passed,
    }),
  );

  if (passed !== scenarios.length) {
    throw new Error(`Evaluation failed: passed ${passed} of ${scenarios.length} scenarios.`);
  }
}

void run();
