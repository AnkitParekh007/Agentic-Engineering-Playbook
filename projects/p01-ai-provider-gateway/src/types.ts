export type ChatRole = 'system' | 'user' | 'assistant';

export type ChatMessage = {
  role: ChatRole;
  content: string;
};

export type StructuredAnswer = {
  answer: string;
  confidence: number;
  needsHumanReview: boolean;
};

export type ProviderMetadata = {
  provider: string;
  model: string;
  estimatedCostUsd?: number;
};

export type ChatCompletion = ProviderMetadata & {
  message: ChatMessage;
};

export type StreamChunk = {
  token: string;
  done: false;
};

export type StructuredCompletion = ProviderMetadata & {
  output: StructuredAnswer;
};

export type TraceResult = {
  requestId: string;
  provider: string;
  model: string;
  latencyMs: number;
  success: boolean;
  estimatedCostUsd?: number;
  error?: string;
};
