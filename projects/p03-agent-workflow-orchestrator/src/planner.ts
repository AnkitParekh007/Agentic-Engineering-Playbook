import type { ToolDefinition } from './types';

export function detectIntent(task: string): string {
  const normalized = task.toLowerCase();
  if (normalized.includes('create') || normalized.includes('follow-up') || normalized.includes('task')) {
    return 'task_creation';
  }
  if (normalized.includes('send') || normalized.includes('share') || normalized.includes('summary to')) {
    return 'communication';
  }
  return 'knowledge_request';
}

export function buildPlan(task: string, intent: string): string[] {
  if (intent === 'task_creation') {
    return [
      'Understand the requested action item.',
      'Prepare a task creation payload.',
      'Pause for approval before creating the task.',
      'Evaluate the task creation result.',
    ];
  }

  if (intent === 'communication') {
    return [
      'Draft the summary message.',
      'Send the summary with a safe mock tool.',
      'Evaluate whether the summary was delivered.',
    ];
  }

  return [
    'Interpret the knowledge request.',
    'Run the knowledge search tool.',
    'Evaluate whether the returned summary answers the request.',
  ];
}

export function selectTool(intent: string, tools: ToolDefinition[]): ToolDefinition {
  const preferredToolName =
    intent === 'task_creation'
      ? 'create_task'
      : intent === 'communication'
        ? 'send_summary'
        : 'knowledge_search';

  const selectedTool = tools.find((tool) => tool.name === preferredToolName);
  if (!selectedTool) {
    throw new Error(`No tool definition found for ${preferredToolName}.`);
  }

  return selectedTool;
}
