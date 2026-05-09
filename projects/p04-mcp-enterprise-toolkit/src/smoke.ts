import { createApp } from './app';
import { getResource } from './resources';
import { listTools, invokeToolByName } from './toolkit';

async function run(): Promise<void> {
  const app = await createApp();
  const tools = await listTools();
  const result = await invokeToolByName('file_search', {
    operation: 'read',
    input: { query: 'travel' },
  });
  const resource = getResource('docs');

  if (tools.length === 0) {
    throw new Error('Smoke test failed: no tools loaded.');
  }

  if (!result.success || result.resultCount === 0) {
    throw new Error('Smoke test failed: expected file_search to return results.');
  }

  if (!resource) {
    throw new Error('Smoke test failed: docs resource missing.');
  }

  console.log(
    JSON.stringify({
      ok: true,
      appLoaded: Boolean(app),
      toolCount: tools.length,
      resourceCount: resource.itemCount,
      resultCount: result.resultCount,
    }),
  );
}

void run();
