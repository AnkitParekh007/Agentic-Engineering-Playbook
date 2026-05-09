export type RiskLevel = 'low' | 'medium' | 'high';

export type ToolName =
  | 'file_search'
  | 'jira_readonly_mock'
  | 'github_readonly_mock'
  | 'database_readonly_mock';

export type ToolDefinition = {
  name: ToolName;
  description: string;
  inputSchema: Record<string, unknown>;
  riskLevel: RiskLevel;
  readOnly: boolean;
  requiresApproval: boolean;
};

export type InvocationRequest = {
  operation?: 'read' | 'write';
  input: Record<string, unknown>;
};

export type InvocationResult = {
  requestId: string;
  toolName: ToolName;
  success: boolean;
  readOnly: boolean;
  resultCount: number;
  data?: unknown[];
  error?: string;
  errorCode?: 'UNKNOWN_TOOL' | 'WRITE_BLOCKED' | 'INVALID_INPUT';
};

export type ResourceDefinition = {
  id: 'docs' | 'tickets' | 'repos' | 'database_tables';
  name: string;
  description: string;
  itemCount: number;
  items: Record<string, unknown>[];
};

export type AuditEvent = {
  requestId: string;
  toolName: string;
  success: boolean;
  latencyMs: number;
  readOnly: boolean;
  resultCount: number;
};
