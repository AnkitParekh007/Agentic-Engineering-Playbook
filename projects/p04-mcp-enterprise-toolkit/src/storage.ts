import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';
import { toolDefinitionSchema } from './schemas';
import type { ToolDefinition } from './types';

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
  await ensureFile(toolsPath, '[]\n');
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw.trim().length > 0 ? raw : '[]') as T;
}

export async function readTools(): Promise<ToolDefinition[]> {
  await ensureDataFiles();
  const parsed = await readJsonFile<ToolDefinition[]>(toolsPath);
  return parsed.map((tool) => toolDefinitionSchema.parse(tool));
}
