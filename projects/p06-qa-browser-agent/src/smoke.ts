import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

async function run(): Promise<void> {
  const storageRoot = await fs.mkdtemp(path.join(os.tmpdir(), 'p06-smoke-'));
  process.env.P06_STORAGE_ROOT = storageRoot;

  const [{ createApp }, { createTestRun, fetchTestReport }] = await Promise.all([
    import('./app'),
    import('./service'),
  ]);

  const app = await createApp();
  const run = await createTestRun({
    scenario: 'homepage_smoke',
    environment: 'playground',
    targetUrl: 'mock://homepage',
    dryRun: true,
  });
  const report = await fetchTestReport(run.id);

  if (!app) {
    throw new Error('Smoke test failed: app did not load.');
  }

  if (run.status !== 'completed') {
    throw new Error(`Smoke test failed: expected completed run but saw ${run.status}.`);
  }

  if (!report || !report.dryRun || report.checks.length === 0) {
    throw new Error('Smoke test failed: expected dry-run report with checks.');
  }

  console.log(
    JSON.stringify({
      ok: true,
      runId: run.id,
      status: run.status,
      dryRun: report.dryRun,
      checkCount: report.checks.length,
    }),
  );
}

void run();
