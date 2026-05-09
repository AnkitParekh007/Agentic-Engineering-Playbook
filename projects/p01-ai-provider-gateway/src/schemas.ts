import { z } from 'zod';

export const chatMessageSchema = z.object({
  role: z.enum(['system', 'user', 'assistant']),
  content: z.string().min(1),
});

export const chatRequestSchema = z.object({
  messages: z.array(chatMessageSchema).min(1),
});

export const structuredAnswerSchema = z.object({
  answer: z.string().min(1),
  confidence: z.number().min(0).max(1),
  needsHumanReview: z.boolean(),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type StructuredAnswer = z.infer<typeof structuredAnswerSchema>;
