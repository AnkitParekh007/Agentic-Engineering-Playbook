import crypto from 'node:crypto';
import { z } from 'zod';
import { logAudit } from './audit';
import {
  databaseReadonlyInputSchema,
  fileSearchInputSchema,
  githubReadonlyInputSchema,
  invocationRequestSchema,
  invocationResultSchema,
  jiraReadonlyInputSchema,
} from './schemas';
import { getResource } from './resources';
import { readTools } from './storage';
import type { InvocationResult, ToolDefinition, ToolName } from './types';

const inputValidators: Record<ToolName, z.ZodSchema> = {
  file_search: fileSearchInputSchema,
  jira_readonly_mock: jiraReadonlyInputSchema,
  github_readonly_mock: githubReadonlyInputSchema,
  database_readonly_mock: databaseReadonlyInputSchema,
};

function filterByQuery(items: Record<string, unknown>[], query: string): Record<string, unknown>[] {
  const normalizedQuery = query.toLowerCase();
  return items.filter((item) => JSON.stringify(item).toLowerCase().includes(normalizedQuery));
}

async function runHandler(tool: ToolDefinition, input: Record<string, unknown>): Promise<Record<string, unknown>[]> {
  if (tool.name === 'file_search') {
    const parsed = fileSearchInputSchema.parse(input);
    const docs = getResource('docs')?.items ?? [];
    const filtered = filterByQuery(docs, parsed.query);
    if (!parsed.path) {
      return filtered;
    }
    const targetPath = parsed.path;
    return filtered.filter((item) => String(item.path ?? '').includes(targetPath));
  }

  if (tool.name === 'jira_readonly_mock') {
    const parsed = jiraReadonlyInputSchema.parse(input);
    const tickets = getResource('tickets')?.items ?? [];
    const filtered = filterByQuery(tickets, parsed.query);
    if (!parsed.status) {
      return filtered;
    }
    const targetStatus = parsed.status;
    return filtered.filter((item) => String(item.status ?? '') === targetStatus);
  }

  if (tool.name === 'github_readonly_mock') {
    const parsed = githubReadonlyInputSchema.parse(input);
    const repos = getResource('repos')?.items ?? [];
    const filtered = filterByQuery(repos, parsed.query);
    if (!parsed.repo) {
      return filtered;
    }
    const targetRepo = parsed.repo;
    return filtered.filter((item) => String(item.name ?? '') === targetRepo);
  }

  const parsed = databaseReadonlyInputSchema.parse(input);
  const tables = getResource('database_tables')?.items ?? [];
  const filtered = tables.filter((item) => String(item.table ?? '') === parsed.table);
  if (!parsed.filter) {
    return filtered;
  }
  const targetFilter = parsed.filter;
  return filterByQuery(filtered, targetFilter);
}

export async function listTools(): Promise<ToolDefinition[]> {
  return readTools();
}

export async function invokeToolByName(
  toolName: string,
  payload: unknown,
): Promise<InvocationResult> {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();
  const tools = await readTools();
  const tool = tools.find((entry) => entry.name === toolName);

  if (!tool) {
    const latencyMs = Date.now() - startedAt;
    logAudit({
      requestId,
      toolName,
      success: false,
      latencyMs,
      readOnly: true,
      resultCount: 0,
    });
    throw Object.assign(new Error(`Unknown tool: ${toolName}`), { statusCode: 404, requestId });
  }

  try {
    const parsedPayload = invocationRequestSchema.parse(payload);
    if (parsedPayload.operation === 'write') {
      throw Object.assign(
        new Error(`Write operations are not allowed for ${tool.name} in v1.`),
        { statusCode: 403, requestId },
      );
    }

    inputValidators[tool.name].parse(parsedPayload.input);
    const data = await runHandler(tool, parsedPayload.input);
    const result = invocationResultSchema.parse({
      requestId,
      toolName: tool.name,
      success: true,
      readOnly: tool.readOnly,
      resultCount: data.length,
      data,
    });

    logAudit({
      requestId,
      toolName: tool.name,
      success: true,
      latencyMs: Date.now() - startedAt,
      readOnly: tool.readOnly,
      resultCount: data.length,
    });

    return result;
  } catch (error) {
    const latencyMs = Date.now() - startedAt;
    const message = error instanceof Error ? error.message : 'Unknown invocation error';
    logAudit({
      requestId,
      toolName: tool.name,
      success: false,
      latencyMs,
      readOnly: tool.readOnly,
      resultCount: 0,
    });

    if (error instanceof z.ZodError) {
      throw Object.assign(new Error(message), {
        statusCode: 400,
        requestId,
        details: error.flatten(),
      });
    }

    if (typeof error === 'object' && error && 'statusCode' in error) {
      throw error;
    }

    throw Object.assign(new Error(message), { statusCode: 500, requestId });
  }
}
