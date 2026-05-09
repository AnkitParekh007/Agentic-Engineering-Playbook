export type CopilotMode = 'Ask' | 'Plan' | 'Agent';
export type CopilotModel = 'Mock' | 'OpenAI placeholder' | 'Local placeholder';
export type CopilotEnvironment = 'playground' | 'test' | 'prod';

export type MessageRole = 'user' | 'assistant';
export type ActivityStage = 'planning' | 'retrieval' | 'tool_call' | 'approval_required' | 'completed';
export type ActivityStatus = 'running' | 'completed' | 'blocked';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: string;
  streaming?: boolean;
}

export interface ActivityItem {
  id: string;
  stage: ActivityStage;
  title: string;
  detail: string;
  status: ActivityStatus;
  createdAt: string;
}

export interface ApprovalRequest {
  id: string;
  title: string;
  toolName: string;
  summary: string;
  requestedAt: string;
}

export interface CopilotSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
  activities: ActivityItem[];
  pendingApproval: ApprovalRequest | null;
}

export type MockRuntimeEvent =
  | { type: 'activity'; activity: ActivityItem }
  | { type: 'chunk'; chunk: string }
  | { type: 'approval'; approval: ApprovalRequest; notice: string }
  | { type: 'done' };
