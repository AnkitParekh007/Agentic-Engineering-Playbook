import express, { type Request, type Response } from 'express';
import { getEnvironmentConfig } from './config';
import { createTestRun, fetchTestReport, fetchTestRun } from './service';
import { ensureStorage, readRuns } from './storage';

export async function createApp() {
  await ensureStorage();
  const app = express();
  app.use(express.json());

  app.get('/health', async (_request: Request, response: Response) => {
    const runs = await readRuns();
    response.json({
      ok: true,
      runCount: runs.length,
      environments: {
        playground: getEnvironmentConfig('playground'),
        test: getEnvironmentConfig('test'),
        prod: getEnvironmentConfig('prod'),
      },
    });
  });

  app.post('/test-runs', async (request: Request, response: Response) => {
    try {
      const run = await createTestRun(request.body);
      response.status(201).json(run);
    } catch (error) {
      handleError(error, response);
    }
  });

  app.get('/test-runs/:runId', async (request: Request, response: Response) => {
    const run = await fetchTestRun(request.params.runId);
    if (!run) {
      response.status(404).json({
        requestId: `test_run_${request.params.runId}`,
        error: `Test run not found: ${request.params.runId}`,
      });
      return;
    }

    response.json(run);
  });

  app.get('/test-runs/:runId/report', async (request: Request, response: Response) => {
    const report = await fetchTestReport(request.params.runId);
    if (!report) {
      response.status(404).json({
        requestId: `report_${request.params.runId}`,
        error: `Report not found for run: ${request.params.runId}`,
      });
      return;
    }

    response.json(report);
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
