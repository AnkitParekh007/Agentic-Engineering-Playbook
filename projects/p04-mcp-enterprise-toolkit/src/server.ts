import { config } from './config';
import { createApp } from './app';

async function startServer(): Promise<void> {
  const app = await createApp();
  app.listen(config.port, () => {
    console.log(
      JSON.stringify({
        event: 'mcp_enterprise_toolkit_started',
        port: config.port,
      }),
    );
  });
}

void startServer();
