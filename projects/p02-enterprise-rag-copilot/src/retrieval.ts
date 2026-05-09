import { config } from './config';
import type { ChunkRecord, SearchResult } from './types';

function tokenize(input: string): string[] {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1);
}

function uniqueTokens(input: string): string[] {
  return [...new Set(tokenize(input))];
}

function keywordScore(query: string, content: string): number {
  const queryTokens = uniqueTokens(query);
  const contentTokens = new Set(uniqueTokens(content));
  if (queryTokens.length === 0) {
    return 0;
  }

  const matches = queryTokens.filter((token) => contentTokens.has(token)).length;
  return matches / queryTokens.length;
}

function hashToken(token: string): number {
  let hash = 0;
  for (const character of token) {
    hash = (hash * 31 + character.charCodeAt(0)) % 9973;
  }
  return hash;
}

function vectorize(input: string, dimensions = 16): number[] {
  const vector = new Array<number>(dimensions).fill(0);
  for (const token of tokenize(input)) {
    const bucket = hashToken(token) % dimensions;
    vector[bucket] += 1;
  }
  return vector;
}

function cosineSimilarity(left: number[], right: number[]): number {
  let dot = 0;
  let leftMagnitude = 0;
  let rightMagnitude = 0;

  for (let index = 0; index < left.length; index += 1) {
    dot += left[index] * right[index];
    leftMagnitude += left[index] ** 2;
    rightMagnitude += right[index] ** 2;
  }

  if (leftMagnitude === 0 || rightMagnitude === 0) {
    return 0;
  }

  return dot / (Math.sqrt(leftMagnitude) * Math.sqrt(rightMagnitude));
}

function semanticScore(query: string, content: string): number {
  return cosineSimilarity(vectorize(query), vectorize(content));
}

export function rankChunks(query: string, chunks: ChunkRecord[], topK = config.defaultTopK): SearchResult[] {
  return chunks
    .map((chunk) => {
      const exact = keywordScore(query, chunk.content);
      const semantic = semanticScore(query, chunk.content);
      const hybrid = Number((exact * 0.55 + semantic * 0.45).toFixed(4));

      return {
        chunk,
        keywordScore: Number(exact.toFixed(4)),
        semanticScore: Number(semantic.toFixed(4)),
        hybridScore: hybrid,
      };
    })
    .sort((left, right) => right.hybridScore - left.hybridScore)
    .slice(0, topK);
}
