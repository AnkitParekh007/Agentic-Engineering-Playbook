import type { ChatMessage, ChatCompletion, StreamChunk, StructuredCompletion } from '../types';
import type { AIProvider } from './ai-provider';

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai';
  readonly model: string;
  private readonly apiKey?: string;

  constructor(model: string, apiKey?: string) {
    this.model = model;
    this.apiKey = apiKey;
  }

  async chat(_messages: ChatMessage[]): Promise<ChatCompletion> {
    this.assertConfigured();

    return {
      provider: this.name,
      model: this.model,
      message: {
        role: 'assistant',
        content:
          'OpenAIProvider is a placeholder in this starter. Extend this class with the OpenAI SDK or REST API before using it in production.',
      },
    };
  }

  async *streamChat(_messages: ChatMessage[]): AsyncGenerator<StreamChunk, void, void> {
    this.assertConfigured();
    yield {
      token:
        'OpenAIProvider streaming is intentionally left as the next exercise after the mock implementation.',
      done: false,
    };
    yield { token: '', done: true };
  }

  async structuredOutput(_messages: ChatMessage[]): Promise<StructuredCompletion> {
    this.assertConfigured();
    throw new Error(
      'OpenAIProvider structured output is not implemented in this starter yet. Use PROVIDER=mock for the default demo path.',
    );
  }

  private assertConfigured(): void {
    if (!this.apiKey) {
      throw new Error(
        'OPENAI_API_KEY is required when PROVIDER=openai. The starter defaults to PROVIDER=mock so no key is needed.',
      );
    }
  }
}
