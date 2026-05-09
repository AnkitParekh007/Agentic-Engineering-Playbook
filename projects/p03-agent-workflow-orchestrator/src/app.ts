import express, { type Request, type Response } from 'express';
import { ZodError } from 'zod';
import { config } from './config';
import { approvalRequestSchema, runRequestSchema } from './schemas';
import { readRuns, readTools } from './storage';
import { approveWorkflowRun, createWorkflowRun, getWorkflowRun } from './workflow';

export async function createApp() {
  const app = express();
  app.use(express.json());

  app.get('/health', async (_request: Request, response: Response) => {
    const [runs, tools] = await Promise.all([readRuns(), readTools()]);
    response.json({
      ok: true,
      runCount: runs.length,
      toolCount: tools.length,
      maxRetries: config.maxRetries,
    });
  });

  app.post('/runs', async (request: Request, response: Response) => {
    try {
      const payload = runRequestSchema.parse(request.body);
      const run = await createWorkflowRun(payload.task);
      response.status(201).json(run);
    } catch (error) {
      handleError(error, response);
    }
  });

  app.get('/runs/:runId', async (request: Request, response: Response) => {
    const run = await getWorkflowRun(request.params.runId);
    if (!run) {
      response.status(404).json({ error: `Run not found: ${request.params.runId}` });
      return;
    }
    response.json(run);
  });

  app.post('/runs/:runId/approve', async (request: Request, response: Response) => {
    try {
      const payload = approvalRequestSchema.parse(request.body);
      const run = await approveWorkflowRun(request.params.runId, payload);
      response.json(run);
    } catch (error) {
      handleError(error, response);
    }
  });

  return app;
}

function handleError(error: unknown, response: Response): void {
  const message = error instanceof Error ? error.message : 'Unknown error';
  const details = error instanceof ZodError ? error.flatten() : undefined;

  const statusCode =
    error instanceof ZodError
      ? 400
      : message.includes('not found')
        ? 404
        : message.includes('not waiting for approval')
          ? 409
          : 500;

  response.status(statusCode).json({
    error: message,
    details,
  });
}
