import { structuredAnswerSchema } from '../schemas';
import type { ChatMessage, ChatCompletion, StreamChunk, StructuredCompletion } from '../types';
import type { AIProvider } from './ai-provider';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function latestUserMessage(messages: ChatMessage[]): string {
  const lastUserMessage = [...messages].reverse().find((message) => message.role === 'user');
  return lastUserMessage?.content ?? 'No user message provided.';
}

export class MockProvider implements AIProvider {
  readonly name = 'mock';
  readonly model: string;

  constructor(model: string) {
    this.model = model;
  }

  async chat(messages: ChatMessage[]): Promise<ChatCompletion> {
    await delay(120);
    const prompt = latestUserMessage(messages);

    return {
      provider: this.name,
      model: this.model,
      message: {
        role: 'assistant',
        content: `Mock response for: ${prompt}`,
      },
    };
  }

  async *streamChat(messages: ChatMessage[]): AsyncGenerator<StreamChunk, void, void> {
    const prompt = latestUserMessage(messages);
    const tokens = [
      'Mock',
      'stream',
      'for:',
      ...prompt.split(/\s+/).filter(Boolean),
    ];

    for (const token of tokens) {
      await delay(110);
      yield { token, done: false };
    }

    await delay(70);
    yield { token: '', done: true };
  }

  async structuredOutput(messages: ChatMessage[]): Promise<StructuredCompletion> {
    await delay(140);
    const prompt = latestUserMessage(messages);

    const output = structuredAnswerSchema.parse({
      answer: `Structured mock summary for: ${prompt}`,
      confidence: 0.82,
      needsHumanReview: prompt.toLowerCase().includes('urgent'),
    });

    return {
      provider: this.name,
      model: this.model,
      output,
    };
  }
}
