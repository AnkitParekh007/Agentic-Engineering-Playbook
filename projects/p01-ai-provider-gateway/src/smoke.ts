import { config } from './config';
import { createProvider } from './providers';
import { chatRequestSchema } from './schemas';

const provider = createProvider();
const parsed = chatRequestSchema.parse({
  messages: [{ role: 'user', content: 'Smoke check the gateway import path.' }],
});

console.log(
  JSON.stringify({
    ok: true,
    provider: provider.name,
    model: provider.model,
    providerSetting: config.provider,
    messageCount: parsed.messages.length,
  }),
);
