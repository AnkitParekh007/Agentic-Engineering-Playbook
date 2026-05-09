import { z } from 'zod';

export const documentSchema = z.object({
  id: z.string().min(1).optional(),
  title: z.string().min(1),
  content: z.string().min(1),
  source: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)).default([]),
});

export const storedDocumentSchema = documentSchema.extend({
  id: z.string().min(1),
  createdAt: z.string().datetime(),
});

export const chunkSchema = z.object({
  id: z.string().min(1),
  documentId: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  source: z.string().min(1).optional(),
  tags: z.array(z.string().min(1)),
  tokenCount: z.number().int().positive(),
  chunkIndex: z.number().int().nonnegative(),
  createdAt: z.string().datetime(),
});

export const addDocumentsRequestSchema = z.object({
  documents: z.array(documentSchema).min(1),
});

export const ingestRequestSchema = z.object({
  documentIds: z.array(z.string().min(1)).optional(),
});

export const searchRequestSchema = z.object({
  query: z.string().min(1),
  topK: z.number().int().positive().max(10).optional(),
});

export const askRequestSchema = searchRequestSchema.extend({
  minScore: z.number().min(0).max(1).optional(),
});

export const citedAnswerSchema = z.object({
  answer: z.string().min(1),
  confidence: z.number().min(0).max(1),
  citations: z
    .array(
      z.object({
        chunkId: z.string().min(1),
        documentId: z.string().min(1),
        title: z.string().min(1),
      }),
    )
    .min(1),
  grounded: z.boolean(),
});

export type AddDocumentsRequest = z.infer<typeof addDocumentsRequestSchema>;
export type IngestRequest = z.infer<typeof ingestRequestSchema>;
export type SearchRequest = z.infer<typeof searchRequestSchema>;
export type AskRequest = z.infer<typeof askRequestSchema>;
