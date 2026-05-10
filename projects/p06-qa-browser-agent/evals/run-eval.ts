import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

type EvalScenario = {
  id: string;
  payload: Record<string, unknown>;
  expectedStatus?: string;
  expectDryRun?: boolean;
  expectedError?: string;
};

async function loadScenarios(): Promise<EvalScenario[]> {
  const filePath = path.resolve(process.cwd(), 'evals', 'scenarios.json');
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as EvalScenario[];
}

async function run(): Promise<void> {
  process.env.P06_STORAGE_ROOT = await fs.mkdtemp(path.join(os.tmpdir(), 'p06-eval-'));

  const [{ createTestRun }, scenarios] = await Promise.all([
    import('../src/service'),
    loadScenarios(),
  ]);

  let passed = 0;

  for (const scenario of scenarios) {
    let success = false;
    let observedStatus: string | undefined;
    let observedDryRun: boolean | undefined;
    let observedError: string | undefined;

    try {
      const run = await createTestRun(scenario.payload);
      observedStatus = run.status;
      observedDryRun = run.dryRun;
      success =
        run.status === scenario.expectedStatus &&
        (scenario.expectDryRun === undefined || run.dryRun === scenario.expectDryRun);
    } catch (error) {
      observedError = error instanceof Error ? error.message : 'Unknown error';
      success = Boolean(
        scenario.expectedError && observedError.toLowerCase().includes(scenario.expectedError.toLowerCase()),
      );
    }

    if (success) {
      passed += 1;
    }

    console.log(
      JSON.stringify({
        id: scenario.id,
        success,
        observedStatus,
        observedDryRun,
        observedError,
      }),
    );
  }

  console.log(
    JSON.stringify({
      event: 'qa_browser_eval_summary',
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
