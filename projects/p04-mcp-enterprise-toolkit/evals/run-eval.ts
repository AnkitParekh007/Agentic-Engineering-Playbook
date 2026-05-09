import fs from 'node:fs/promises';
import path from 'node:path';
import { getResource } from '../src/resources';
import { invokeToolByName } from '../src/toolkit';

type EvalScenario =
  | {
      id: string;
      kind: 'invoke';
      toolName: string;
      payload: unknown;
      expectedSuccess: boolean;
    }
  | {
      id: string;
      kind: 'resource';
      resourceId: string;
      expectedSuccess: boolean;
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
    let success = false;
    let detail: string | null = null;

    if (scenario.kind === 'invoke') {
      try {
        const result = await invokeToolByName(scenario.toolName, scenario.payload);
        success = scenario.expectedSuccess ? result.success : false;
        detail = scenario.expectedSuccess ? `${result.resultCount}` : 'unexpected success';
      } catch (error) {
        success = !scenario.expectedSuccess;
        detail = error instanceof Error ? error.message : 'Unknown error';
      }
    } else {
      const resource = getResource(scenario.resourceId);
      success = scenario.expectedSuccess ? Boolean(resource) : !resource;
      detail = resource ? `${resource.itemCount}` : 'not found';
    }

    if (success) {
      passed += 1;
    }

    console.log(
      JSON.stringify({
        id: scenario.id,
        success,
        detail,
      }),
    );
  }

  console.log(
    JSON.stringify({
      event: 'mcp_eval_summary',
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
