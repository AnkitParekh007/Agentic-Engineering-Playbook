import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';
import { reportSchema, testRunResultSchema } from './schemas';
import type { TestReport, TestRunResult } from './types';

export async function ensureStorage(): Promise<void> {
  await fs.mkdir(path.dirname(config.dataFilePath), { recursive: true });
  await fs.mkdir(config.reportsDir, { recursive: true });
  await fs.mkdir(config.screenshotsDir, { recursive: true });

  try {
    await fs.access(config.dataFilePath);
  } catch {
    await fs.writeFile(config.dataFilePath, '[]\n', 'utf-8');
  }
}

export async function readRuns(): Promise<TestRunResult[]> {
  await ensureStorage();
  const raw = await fs.readFile(config.dataFilePath, 'utf-8');
  const parsed = JSON.parse(raw) as unknown[];
  return parsed.map((item) => testRunResultSchema.parse(item));
}

export async function writeRuns(runs: TestRunResult[]): Promise<void> {
  await ensureStorage();
  await fs.writeFile(config.dataFilePath, `${JSON.stringify(runs, null, 2)}\n`, 'utf-8');
}

export async function appendRun(run: TestRunResult): Promise<void> {
  const runs = await readRuns();
  runs.unshift(testRunResultSchema.parse(run));
  await writeRuns(runs);
}

export async function updateRun(run: TestRunResult): Promise<void> {
  const runs = await readRuns();
  const nextRuns = runs.some((item) => item.id === run.id)
    ? runs.map((item) => (item.id === run.id ? testRunResultSchema.parse(run) : item))
    : [testRunResultSchema.parse(run), ...runs];
  await writeRuns(nextRuns);
}

export async function getRun(runId: string): Promise<TestRunResult | null> {
  const runs = await readRuns();
  return runs.find((run) => run.id === runId) ?? null;
}

export async function writeReport(report: TestReport): Promise<string> {
  await ensureStorage();
  const validated = reportSchema.parse(report);
  const filePath = path.join(config.reportsDir, `${report.runId}.json`);
  await fs.writeFile(filePath, `${JSON.stringify(validated, null, 2)}\n`, 'utf-8');
  return filePath;
}

export async function readReport(runId: string): Promise<TestReport | null> {
  await ensureStorage();
  const filePath = path.join(config.reportsDir, `${runId}.json`);
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return reportSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}
