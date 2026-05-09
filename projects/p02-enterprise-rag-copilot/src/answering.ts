import { citedAnswerSchema } from './schemas';
import type { CitedAnswer, SearchResult } from './types';

export function buildCitedAnswer(query: string, results: SearchResult[], minScore = 0.15): CitedAnswer {
  if (results.length === 0 || results[0].hybridScore < minScore) {
    return {
      answer: `I do not have enough grounded evidence to answer: ${query}`,
      confidence: 0,
      citations: [
        {
          chunkId: 'no-evidence',
          documentId: 'no-evidence',
          title: 'No supporting chunk found',
        },
      ],
      grounded: false,
    };
  }

  const topResults = results.slice(0, Math.min(results.length, 3));
  const summary = topResults
    .map((result) => result.chunk.content)
    .join(' ')
    .trim();

  const citations = topResults.map((result) => ({
    chunkId: result.chunk.id,
    documentId: result.chunk.documentId,
    title: result.chunk.title,
  }));

  const confidence = Number(
    Math.min(
      0.95,
      topResults.reduce((total, result) => total + result.hybridScore, 0) / topResults.length,
    ).toFixed(2),
  );

  return citedAnswerSchema.parse({
    answer: `Grounded answer for "${query}": ${summary}`,
    confidence,
    citations,
    grounded: true,
  });
}
