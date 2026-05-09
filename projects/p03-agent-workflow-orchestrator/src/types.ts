export type RunState =
  | 'created'
  | 'planning'
  | 'waiting_for_approval'
  | 'executing'
  | 'evaluating'
  | 'completed'
  | 'failed';

export type RiskLevel = 'safe' | 'risky';

export type ToolDefinition = {
  name: 'knowledge_search' | 'create_task' | 'send_summary';
  description: string;
  riskLevel: RiskLevel;
};

export type TraceEvent = {
  runId: string;
  step: string;
  state: RunState;
  selectedTool?: string;
  latencyMs: number;
  success: boolean;
  message?: string;
  approvalReason?: string;
  approvedBy?: string;
  approvedAt?: string;
};

export type WorkflowRun = {
  id: string;
  task: string;
  intent: string;
  plan: string[];
  selectedTool?: string;
  state: RunState;
  retryCount: number;
  requiresApproval: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'not_required';
  approvalReason?: string;
  approvedBy?: string;
  approvedAt?: string;
  toolOutput?: string;
  finalResponse?: string;
  failureReason?: string;
  traces: TraceEvent[];
  createdAt: string;
  updatedAt: string;
};
