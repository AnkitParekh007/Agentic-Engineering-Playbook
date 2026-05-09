import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4002),
  CHUNK_SIZE: z.coerce.number().int().positive().default(80),
  CHUNK_OVERLAP: z.coerce.number().int().nonnegative().default(20),
  DEFAULT_TOP_K: z.coerce.number().int().positive().max(10).default(4),
});

const parsed = envSchema.parse(process.env);

export const config = {
  port: parsed.PORT,
  chunkSize: parsed.CHUNK_SIZE,
  chunkOverlap: parsed.CHUNK_OVERLAP,
  defaultTopK: parsed.DEFAULT_TOP_K,
  dataDir: path.resolve(process.cwd(), 'data'),
};
