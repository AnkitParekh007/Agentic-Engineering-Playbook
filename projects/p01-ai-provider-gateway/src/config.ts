import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4001),
  PROVIDER: z.enum(['mock', 'openai']).default('mock'),
  MODEL: z.string().min(1).default('mock-gateway-v1'),
  OPENAI_API_KEY: z.string().optional(),
});

const parsed = envSchema.parse(process.env);

export const config = {
  port: parsed.PORT,
  provider: parsed.PROVIDER,
  model: parsed.MODEL,
  openAIApiKey: parsed.OPENAI_API_KEY,
};
