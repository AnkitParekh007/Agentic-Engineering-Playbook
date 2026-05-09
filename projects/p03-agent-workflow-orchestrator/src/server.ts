import { config } from './config';
import { ensureDataFiles } from './storage';
import { createApp } from './app';

async function startServer(): Promise<void> {
  await ensureDataFiles();
  const app = await createApp();
  app.listen(config.port, () => {
    console.log(
      JSON.stringify({
        event: 'agent_workflow_orchestrator_started',
        port: config.port,
        maxRetries: config.maxRetries,
      }),
    );
  });
}

void startServer();
