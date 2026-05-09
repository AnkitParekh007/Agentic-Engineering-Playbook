import type { ToolDefinition } from './types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function executeTool(tool: ToolDefinition, task: string): Promise<string> {
  await delay(80);

  if (tool.name === 'knowledge_search') {
    return `Knowledge search found a grounded internal answer for: ${task}`;
  }

  if (tool.name === 'create_task') {
    return `Task created successfully for request: ${task}`;
  }

  return `Summary sent successfully for request: ${task}`;
}
