import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

async function run(): Promise<void> {
  const storageRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'p06-browser-smoke-'));
  process.env.P06_STORAGE_ROOT = storageRoot;

  const { createTestRun, fetchTestReport } = await import('./service');

  const runResult = await createTestRun({
    scenario: 'navigation_check',
    environment: 'test',
    targetUrl: 'mock://navigation',
    dryRun: false,
    actionIntent: 'observe',
  });

  const report = await fetchTestReport(runResult.id);

  if (runResult.status !== 'completed') {
    throw new Error(`Browser smoke failed: expected completed run but saw ${runResult.status}.`);
  }

  if (!runResult.screenshotPath) {
    throw new Error('Browser smoke failed: screenshot path was not set.');
  }

  await fs.access(runResult.screenshotPath);

  if (!report || report.dryRun) {
    throw new Error('Browser smoke failed: expected a non-dry-run report.');
  }

  console.log(
    JSON.stringify({
      ok: true,
      runId: runResult.id,
      status: runResult.status,
      screenshotPath: runResult.screenshotPath,
      reportPath: runResult.reportPath,
    }),
  );
}

void run();
