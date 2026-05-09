import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';
import { toolDefinitionSchema, workflowRunSchema } from './schemas';
import type { ToolDefinition, WorkflowRun } from './types';

const runsPath = path.join(config.dataDir, 'runs.json');
const toolsPath = path.join(config.dataDir, 'tools.json');

async function ensureFile(filePath: string, defaultContent: string): Promise<void> {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, defaultContent, 'utf-8');
  }
}

export async function ensureDataFiles(): Promise<void> {
  await fs.mkdir(config.dataDir, { recursive: true });
  await ensureFile(runsPath, '[]\n');
  await ensureFile(
    toolsPath,
    `${JSON.stringify(
      [
        {
          name: 'knowledge_search',
          description: 'Look up internal operational knowledge and return a concise grounded summary.',
          riskLevel: 'safe',
        },
        {
          name: 'create_task',
          description: 'Create a follow-up action item for a team or operator.',
          riskLevel: 'risky',
        },
        {
          name: 'send_summary',
          description: 'Send a summary to a stakeholder or destination list.',
          riskLevel: 'safe',
        },
      ],
      null,
      2,
    )}\n`,
  );
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf-8');
  const normalized = raw.trim().length > 0 ? raw : '[]';
  return JSON.parse(normalized) as T;
}

async function writeJsonFile(filePath: string, value: unknown): Promise<void> {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
}

export async function readRuns(): Promise<WorkflowRun[]> {
  await ensureDataFiles();
  const parsed = await readJsonFile<WorkflowRun[]>(runsPath);
  return parsed.map((run) => workflowRunSchema.parse(run));
}

export async function writeRuns(runs: WorkflowRun[]): Promise<void> {
  await ensureDataFiles();
  await writeJsonFile(runsPath, runs);
}

export async function readTools(): Promise<ToolDefinition[]> {
  await ensureDataFiles();
  const parsed = await readJsonFile<ToolDefinition[]>(toolsPath);
  return parsed.map((tool) => toolDefinitionSchema.parse(tool));
}

export async function writeTools(tools: ToolDefinition[]): Promise<void> {
  await ensureDataFiles();
  await writeJsonFile(toolsPath, tools);
}

export async function findRunById(runId: string): Promise<WorkflowRun | undefined> {
  const runs = await readRuns();
  return runs.find((run) => run.id === runId);
}

export async function saveRun(nextRun: WorkflowRun): Promise<WorkflowRun> {
  const runs = await readRuns();
  const index = runs.findIndex((run) => run.id === nextRun.id);
  if (index >= 0) {
    runs[index] = nextRun;
  } else {
    runs.push(nextRun);
  }
  await writeRuns(runs);
  return nextRun;
}
