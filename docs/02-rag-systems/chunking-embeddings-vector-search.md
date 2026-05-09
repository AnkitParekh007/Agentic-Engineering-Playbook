# Chunking, Embeddings, and Vector Search

## Chunking

Chunking splits documents into smaller units that can be retrieved independently.

Good chunks are:

- focused
- not too small
- not too large
- metadata-rich
- easy to cite

## Embeddings

Embeddings convert text into vectors so similar text can be searched semantically.

## Metadata

Every chunk should store:

```ts
export interface ChunkMetadata {
  sourceId: string;
  sourceType: 'doc' | 'ticket' | 'code' | 'transcript';
  title: string;
  url?: string;
  createdAt?: string;
  updatedAt?: string;
  section?: string;
}
```
