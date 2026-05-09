import { buildCitedAnswer } from './answering';
import { createApp } from './app';
import { rankChunks } from './retrieval';
import { readChunks, readDocuments } from './storage';

async function run(): Promise<void> {
  const app = await createApp();
  const [documents, chunks] = await Promise.all([readDocuments(), readChunks()]);
  const results = rankChunks('travel policy meals', chunks, 2);
  const answer =
    results.length > 0
      ? buildCitedAnswer('travel policy meals', results)
      : { answer: 'No chunks available yet', confidence: 0, citations: [], grounded: false };

  console.log(
    JSON.stringify({
      ok: true,
      appLoaded: Boolean(app),
      documentCount: documents.length,
      chunkCount: chunks.length,
      sampleResultCount: results.length,
      sampleConfidence: answer.confidence,
    }),
  );
}

void run();
