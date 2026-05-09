import express, { type Request, type Response } from 'express';
import { getResource, listResources } from './resources';
import { ensureDataFiles } from './storage';
import { invokeToolByName, listTools } from './toolkit';

export async function createApp() {
  await ensureDataFiles();
  const app = express();
  app.use(express.json());

  app.get('/health', async (_request: Request, response: Response) => {
    const tools = await listTools();
    const resources = listResources();
    response.json({
      ok: true,
      toolCount: tools.length,
      resourceCount: resources.length,
    });
  });

  app.get('/tools', async (_request: Request, response: Response) => {
    response.json(await listTools());
  });

  app.post('/tools/:toolName/invoke', async (request: Request, response: Response) => {
    try {
      const result = await invokeToolByName(request.params.toolName, request.body);
      response.json(result);
    } catch (error) {
      handleError(error, response);
    }
  });

  app.get('/resources', (_request: Request, response: Response) => {
    response.json(listResources());
  });

  app.get('/resources/:resourceId', (request: Request, response: Response) => {
    const resource = getResource(request.params.resourceId);
    if (!resource) {
      response.status(404).json({
        errorId: `resource_${request.params.resourceId}`,
        error: `Unknown resource: ${request.params.resourceId}`,
      });
      return;
    }
    response.json(resource);
  });

  return app;
}

function handleError(error: unknown, response: Response): void {
  const statusCode =
    typeof error === 'object' && error && 'statusCode' in error && typeof error.statusCode === 'number'
      ? error.statusCode
      : 500;

  const requestId =
    typeof error === 'object' && error && 'requestId' in error && typeof error.requestId === 'string'
      ? error.requestId
      : undefined;

  const details =
    typeof error === 'object' && error && 'details' in error
      ? error.details
      : undefined;

  response.status(statusCode).json({
    requestId,
    error: error instanceof Error ? error.message : 'Unknown error',
    details,
  });
}
