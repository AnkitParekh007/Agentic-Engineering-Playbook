import { createApp } from './app';
import { config } from './config';

async function main(): Promise<void> {
  const app = await createApp();
  app.listen(config.port, () => {
    console.log(`Project 06 QA Browser Agent listening on http://localhost:${config.port}`);
  });
}

void main();
