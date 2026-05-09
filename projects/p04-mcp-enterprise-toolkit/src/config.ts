import path from 'node:path';
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4004),
});

const parsed = envSchema.parse(process.env);

export const config = {
  port: parsed.PORT,
  dataDir: path.resolve(process.cwd(), 'data'),
};
