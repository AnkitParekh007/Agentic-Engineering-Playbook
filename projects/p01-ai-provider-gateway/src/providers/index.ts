import { config } from '../config';
import type { AIProvider } from './ai-provider';
import { MockProvider } from './mock-provider';
import { OpenAIProvider } from './openai-provider';

export function createProvider(): AIProvider {
  if (config.provider === 'openai') {
    return new OpenAIProvider(config.model, config.openAIApiKey);
  }

  return new MockProvider(config.model);
}
