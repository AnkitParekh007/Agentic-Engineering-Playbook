import crypto from 'node:crypto';
import express, { type Request, type Response } from 'express';
import { ZodError } from 'zod';
import { config } from './config';
import { createProvider } from './providers';
import { chatRequestSchema, structuredAnswerSchema } from './schemas';
import { logTrace } from './tracing';

const app = express();
const provider = createProvider();

app.use(express.json());

app.get('/health', (_request: Request, response: Response) => {
  response.json({
    ok: true,
    provider: provider.name,
    model: provider.model,
  });
});

app.post('/chat', async (request: Request, response: Response) => {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  try {
    const payload = chatRequestSchema.parse(request.body);
    const result = await provider.chat(payload.messages);
    const latencyMs = Date.now() - startedAt;

    logTrace({
      requestId,
      provider: result.provider,
      model: result.model,
      latencyMs,
      success: true,
    });

    response.json({
      requestId,
      provider: result.provider,
      model: result.model,
      message: result.message,
      latencyMs,
    });
  } catch (error) {
    handleError(error, requestId, startedAt, response);
  }
});

app.post('/chat/stream', async (request: Request, response: Response) => {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  try {
    const payload = chatRequestSchema.parse(request.body);

    response.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache, no-transform');
    response.setHeader('Connection', 'keep-alive');
    response.flushHeaders();

    for await (const chunk of provider.streamChat(payload.messages)) {
      response.write(`data: ${JSON.stringify({ requestId, ...chunk })}\n\n`);
    }

    const latencyMs = Date.now() - startedAt;

    logTrace({
      requestId,
      provider: provider.name,
      model: provider.model,
      latencyMs,
      success: true,
    });

    response.write(
      `data: ${JSON.stringify({
        requestId,
        done: true,
        provider: provider.name,
        model: provider.model,
        latencyMs,
      })}\n\n`,
    );
    response.end();
  } catch (error) {
    handleStreamError(error, requestId, startedAt, response);
  }
});

app.post('/structured-output', async (request: Request, response: Response) => {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  try {
    const payload = chatRequestSchema.parse(request.body);
    const result = await provider.structuredOutput(payload.messages);
    const output = structuredAnswerSchema.parse(result.output);
    const latencyMs = Date.now() - startedAt;

    logTrace({
      requestId,
      provider: result.provider,
      model: result.model,
      latencyMs,
      success: true,
    });

    response.json({
      requestId,
      provider: result.provider,
      model: result.model,
      output,
      latencyMs,
    });
  } catch (error) {
    handleError(error, requestId, startedAt, response);
  }
});

function handleError(
  error: unknown,
  requestId: string,
  startedAt: number,
  response: Response,
): void {
  const latencyMs = Date.now() - startedAt;
  const message = error instanceof Error ? error.message : 'Unknown error';
  const details = error instanceof ZodError ? error.flatten() : undefined;

  logTrace({
    requestId,
    provider: provider.name,
    model: provider.model,
    latencyMs,
    success: false,
    error: message,
  });

  response.status(error instanceof ZodError ? 400 : 500).json({
    requestId,
    error: message,
    details,
    latencyMs,
  });
}

function handleStreamError(
  error: unknown,
  requestId: string,
  startedAt: number,
  response: Response,
): void {
  const latencyMs = Date.now() - startedAt;
  const message = error instanceof Error ? error.message : 'Unknown error';

  logTrace({
    requestId,
    provider: provider.name,
    model: provider.model,
    latencyMs,
    success: false,
    error: message,
  });

  response.write(
    `event: error\ndata: ${JSON.stringify({
      requestId,
      error: message,
      latencyMs,
    })}\n\n`,
  );
  response.end();
}

app.listen(config.port, () => {
  console.log(
    JSON.stringify({
      event: 'ai_gateway_started',
      port: config.port,
      provider: provider.name,
      model: provider.model,
    }),
  );
});
