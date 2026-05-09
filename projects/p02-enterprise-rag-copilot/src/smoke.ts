import { buildCitedAnswer } from './answering';
import { createApp } from './app';
import { chunkDocument } from './chunking';
import { config } from './config';
import { rankChunks } from './retrieval';
import { readDocuments } from './storage';

async function run(): Promise<void> {
  const app = await createApp();
  const documents = await readDocuments();
  const sampleDocument = documents[0];
  if (!sampleDocument) {
    throw new Error('Smoke test failed: no sample documents were found.');
  }

  const chunks = chunkDocument(sampleDocument, config.chunkSize, config.chunkOverlap);
  if (chunks.length === 0) {
    throw new Error('Smoke test failed: chunking produced no chunks.');
  }

  const results = rankChunks(sampleDocument.title, chunks, 2);
  if (results.length === 0) {
    throw new Error('Smoke test failed: retrieval produced no ranked results.');
  }

  const answer = buildCitedAnswer(sampleDocument.title, results);
  if (!answer.grounded) {
    throw new Error('Smoke test failed: cited answer was not grounded.');
  }

  console.log(
    JSON.stringify({
      ok: true,
      appLoaded: Boolean(app),
      documentCount: documents.length,
      chunkCount: chunks.length,
      sampleResultCount: results.length,
      sampleConfidence: answer.confidence,
      topChunkId: results[0]?.chunk.id,
    }),
  );
}

void run();
