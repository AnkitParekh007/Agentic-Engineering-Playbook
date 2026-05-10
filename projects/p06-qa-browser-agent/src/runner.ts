import path from 'node:path';
import { chromium } from 'playwright';
import { getScenarioDescription, loadScenarioTarget, executeScenario } from './scenarios';
import type { ScenarioCheck, TestReport, TestRunRequest, TraceEvent } from './types';

export async function runBrowserScenario(input: {
  runId: string;
  request: Required<TestRunRequest>;
  timeoutMs: number;
  screenshotsDir: string;
  traces: TraceEvent[];
}): Promise<Pick<TestReport, 'summary' | 'checks' | 'screenshotPath'>> {
  const screenshotPath = path.join(input.screenshotsDir, `${input.runId}.png`);
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage();
    await loadScenarioTarget(page, input.request.scenario, input.request.targetUrl, input.timeoutMs);
    const checks = await executeScenario(page, input.request.scenario);
    await page.screenshot({ path: screenshotPath, fullPage: true });

    return {
      summary: buildSummary(input.request.scenario, input.request.targetUrl, checks),
      checks,
      screenshotPath,
    };
  } finally {
    await browser.close();
  }
}

export function createDryRunSummary(request: Required<TestRunRequest>): Pick<TestReport, 'summary' | 'checks'> {
  const checks: ScenarioCheck[] = [
    {
      name: 'dry_run_plan_created',
      success: true,
      detail: `Dry run prepared for ${getScenarioDescription(request.scenario)}`,
    },
  ];

  return {
    summary: `Dry run only for ${request.scenario} against ${request.targetUrl}. No browser was launched.`,
    checks,
  };
}

function buildSummary(scenario: string, targetUrl: string, checks: ScenarioCheck[]): string {
  const passed = checks.filter((check) => check.success).length;
  return `Scenario ${scenario} completed against ${targetUrl}. Passed ${passed} of ${checks.length} checks.`;
}
