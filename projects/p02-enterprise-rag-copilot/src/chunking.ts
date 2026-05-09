import type { ChunkRecord, StoredDocument } from './types';

function splitIntoWords(content: string): string[] {
  return content.trim().split(/\s+/).filter(Boolean);
}

export function chunkDocument(
  document: StoredDocument,
  chunkSize: number,
  chunkOverlap: number,
): ChunkRecord[] {
  const words = splitIntoWords(document.content);
  if (words.length === 0) {
    return [];
  }

  const step = Math.max(1, chunkSize - chunkOverlap);
  const chunks: ChunkRecord[] = [];

  for (let start = 0, index = 0; start < words.length; start += step, index += 1) {
    const slice = words.slice(start, start + chunkSize);
    if (slice.length === 0) {
      continue;
    }

    chunks.push({
      id: `${document.id}_chunk_${index + 1}`,
      documentId: document.id,
      title: document.title,
      content: slice.join(' '),
      source: document.source,
      tags: document.tags,
      tokenCount: slice.length,
      chunkIndex: index,
      createdAt: new Date().toISOString(),
    });

    if (start + chunkSize >= words.length) {
      break;
    }
  }

  return chunks;
}
