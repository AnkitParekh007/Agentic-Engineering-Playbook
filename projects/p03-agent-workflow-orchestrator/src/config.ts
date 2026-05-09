import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4003),
  MAX_RETRIES: z.coerce.number().int().nonnegative().default(1),
});

const parsed = envSchema.parse(process.env);

export const config = {
  port: parsed.PORT,
  maxRetries: parsed.MAX_RETRIES,
  dataDir: path.resolve(process.cwd(), 'data'),
};
