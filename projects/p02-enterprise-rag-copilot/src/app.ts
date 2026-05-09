import crypto from 'node:crypto';
import express, { type Request, type Response } from 'express';
import { ZodError } from 'zod';
import { buildCitedAnswer } from './answering';
import { chunkDocument } from './chunking';
import { config } from './config';
import {
  addDocumentsRequestSchema,
  askRequestSchema,
  ingestRequestSchema,
  searchRequestSchema,
  storedDocumentSchema,
} from './schemas';
import { rankChunks } from './retrieval';
import { ensureDataFiles, readChunks, readDocuments, writeChunks, writeDocuments } from './storage';
import { logTrace } from './tracing';
import type { StoredDocument } from './types';

export async function createApp() {
  await ensureDataFiles();
  const app = express();
  app.use(express.json());

  app.get('/health', async (_request: Request, response: Response) => {
    const [documents, chunks] = await Promise.all([readDocuments(), readChunks()]);
    response.json({
      ok: true,
      documentCount: documents.length,
      chunkCount: chunks.length,
    });
  });

  app.post('/documents', async (request: Request, response: Response) => {
    try {
      const payload = addDocumentsRequestSchema.parse(request.body);
      const existingDocuments = await readDocuments();
      const existingDocumentIds = new Set(existingDocuments.map((document) => document.id));
      const incomingDocumentIds = payload.documents
        .map((document) => document.id)
        .filter((documentId): documentId is string => Boolean(documentId));
      const duplicateIncomingIds = incomingDocumentIds.filter((documentId) =>
        existingDocumentIds.has(documentId),
      );

      if (duplicateIncomingIds.length > 0) {
        response.status(409).json({
          error: `Document ID already exists: ${duplicateIncomingIds.join(', ')}`,
        });
        return;
      }

      const createdDocuments = payload.documents.map((document, index) =>
        storedDocumentSchema.parse({
          ...document,
          id: document.id ?? crypto.randomUUID(),
          createdAt: new Date(Date.now() + index).toISOString(),
        }),
      );

      await writeDocuments([...existingDocuments, ...createdDocuments]);

      response.status(201).json({
        insertedCount: createdDocuments.length,
        documents: createdDocuments,
      });
    } catch (error) {
      handleError(error, response);
    }
  });

  app.post('/ingest', async (request: Request, response: Response) => {
    try {
      const payload = ingestRequestSchema.parse(request.body ?? {});
      const allDocuments = await readDocuments();
      const targetDocuments =
        payload.documentIds && payload.documentIds.length > 0
          ? allDocuments.filter((document) => payload.documentIds?.includes(document.id))
          : allDocuments;

      const nextChunks = targetDocuments.flatMap((document) =>
        chunkDocument(document, config.chunkSize, config.chunkOverlap),
      );
      const existingChunks = await readChunks();
      const retainedChunks = existingChunks.filter(
        (chunk) => !targetDocuments.some((document) => document.id === chunk.documentId),
      );

      await writeChunks([...retainedChunks, ...nextChunks]);

      response.json({
        ingestedDocumentCount: targetDocuments.length,
        chunkCount: nextChunks.length,
      });
    } catch (error) {
      handleError(error, response);
    }
  });

  app.post('/search', async (request: Request, response: Response) => {
    const requestId = crypto.randomUUID();
    const startedAt = Date.now();

    try {
      const payload = searchRequestSchema.parse(request.body);
      const chunks = await readChunks();
      const results = rankChunks(payload.query, chunks, payload.topK ?? config.defaultTopK);
      const latencyMs = Date.now() - startedAt;
      const confidence = Number((results[0]?.hybridScore ?? 0).toFixed(2));

      logTrace({
        requestId,
        query: payload.query,
        retrievedChunkCount: results.length,
        latencyMs,
        confidence,
        topChunkId: results[0]?.chunk.id,
      });

      response.json({
        requestId,
        query: payload.query,
        retrievedChunkCount: results.length,
        latencyMs,
        confidence,
        results,
      });
    } catch (error) {
      handleRagError(error, requestId, startedAt, '', response);
    }
  });

  app.post('/ask', async (request: Request, response: Response) => {
    const requestId = crypto.randomUUID();
    const startedAt = Date.now();

    try {
      const payload = askRequestSchema.parse(request.body);
      const chunks = await readChunks();
      const results = rankChunks(payload.query, chunks, payload.topK ?? config.defaultTopK);
      const answer = buildCitedAnswer(payload.query, results, payload.minScore);
      const latencyMs = Date.now() - startedAt;

      logTrace({
        requestId,
        query: payload.query,
        retrievedChunkCount: results.length,
        latencyMs,
        confidence: answer.confidence,
        topChunkId: results[0]?.chunk.id,
      });

      response.json({
        requestId,
        answer,
        retrievedChunkCount: results.length,
        latencyMs,
      });
    } catch (error) {
      handleRagError(error, requestId, startedAt, '', response);
    }
  });

  return app;
}

function handleError(error: unknown, response: Response): void {
  const message = error instanceof Error ? error.message : 'Unknown error';
  const details = error instanceof ZodError ? error.flatten() : undefined;

  response.status(error instanceof ZodError ? 400 : 500).json({
    error: message,
    details,
  });
}

function handleRagError(
  error: unknown,
  requestId: string,
  startedAt: number,
  query: string,
  response: Response,
): void {
  const latencyMs = Date.now() - startedAt;
  const message = error instanceof Error ? error.message : 'Unknown error';
  const details = error instanceof ZodError ? error.flatten() : undefined;

  logTrace({
    requestId,
    query,
    retrievedChunkCount: 0,
    latencyMs,
    confidence: 0,
  });

  response.status(error instanceof ZodError ? 400 : 500).json({
    requestId,
    error: message,
    details,
    latencyMs,
  });
}
