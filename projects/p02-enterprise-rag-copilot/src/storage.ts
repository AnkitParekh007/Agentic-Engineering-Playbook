import fs from 'node:fs/promises';
import path from 'node:path';
import { config } from './config';
import { chunkSchema, storedDocumentSchema } from './schemas';
import type { ChunkRecord, StoredDocument } from './types';

const documentsPath = path.join(config.dataDir, 'documents.json');
const chunksPath = path.join(config.dataDir, 'chunks.json');

async function ensureFile(filePath: string): Promise<void> {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]\n', 'utf-8');
  }
}

export async function ensureDataFiles(): Promise<void> {
  await fs.mkdir(config.dataDir, { recursive: true });
  await ensureFile(documentsPath);
  await ensureFile(chunksPath);
}

async function readJsonFile<T>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(raw) as T;
}

async function writeJsonFile(filePath: string, value: unknown): Promise<void> {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf-8');
}

export async function readDocuments(): Promise<StoredDocument[]> {
  await ensureDataFiles();
  const parsed = await readJsonFile<StoredDocument[]>(documentsPath);
  return parsed.map((document) => storedDocumentSchema.parse(document));
}

export async function writeDocuments(documents: StoredDocument[]): Promise<void> {
  await ensureDataFiles();
  await writeJsonFile(documentsPath, documents);
}

export async function readChunks(): Promise<ChunkRecord[]> {
  await ensureDataFiles();
  const parsed = await readJsonFile<ChunkRecord[]>(chunksPath);
  return parsed.map((chunk) => chunkSchema.parse(chunk));
}

export async function writeChunks(chunks: ChunkRecord[]): Promise<void> {
  await ensureDataFiles();
  await writeJsonFile(chunksPath, chunks);
}
