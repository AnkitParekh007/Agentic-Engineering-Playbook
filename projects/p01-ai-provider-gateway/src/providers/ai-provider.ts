import type { ChatMessage, ChatCompletion, StreamChunk, StructuredCompletion } from '../types';

export interface AIProvider {
  readonly name: string;
  readonly model: string;
  chat(messages: ChatMessage[]): Promise<ChatCompletion>;
  streamChat(messages: ChatMessage[]): AsyncGenerator<StreamChunk, void, void>;
  structuredOutput(messages: ChatMessage[]): Promise<StructuredCompletion>;
}
