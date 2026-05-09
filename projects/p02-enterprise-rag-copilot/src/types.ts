export type StoredDocument = {
  id: string;
  title: string;
  content: string;
  source?: string;
  tags: string[];
  createdAt: string;
};

export type ChunkRecord = {
  id: string;
  documentId: string;
  title: string;
  content: string;
  source?: string;
  tags: string[];
  tokenCount: number;
  chunkIndex: number;
  createdAt: string;
};

export type SearchResult = {
  chunk: ChunkRecord;
  keywordScore: number;
  semanticScore: number;
  hybridScore: number;
};

export type Citation = {
  chunkId: string;
  documentId: string;
  title: string;
};

export type CitedAnswer = {
  answer: string;
  confidence: number;
  citations: Citation[];
  grounded: boolean;
};

export type TraceResult = {
  requestId: string;
  query: string;
  retrievedChunkCount: number;
  latencyMs: number;
  confidence: number;
  topChunkId?: string;
};
