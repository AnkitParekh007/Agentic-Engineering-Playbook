import dotenv from 'dotenv';
import path from 'node:path';
import { environmentConfigSchema } from './schemas';
import type { BrowserEnvironment, EnvironmentConfig } from './types';

dotenv.config();

const allowedHosts = (process.env.P06_ALLOWED_HOSTS ?? 'localhost,127.0.0.1')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

const storageRoot = path.resolve(process.env.P06_STORAGE_ROOT ?? process.cwd());

const environmentConfigs: Record<BrowserEnvironment, EnvironmentConfig> = {
  playground: environmentConfigSchema.parse({
    environment: 'playground',
    forceDryRun: false,
    allowedHosts,
    timeoutMs: Number(process.env.P06_PLAYGROUND_TIMEOUT_MS ?? 8000),
  }),
  test: environmentConfigSchema.parse({
    environment: 'test',
    forceDryRun: false,
    allowedHosts,
    timeoutMs: Number(process.env.P06_TEST_TIMEOUT_MS ?? 6000),
  }),
  prod: environmentConfigSchema.parse({
    environment: 'prod',
    forceDryRun: true,
    allowedHosts,
    timeoutMs: Number(process.env.P06_PROD_TIMEOUT_MS ?? 4000),
  }),
};

export const config = {
  port: Number(process.env.PORT ?? 4006),
  dataFilePath: path.join(storageRoot, 'data', 'test-runs.json'),
  reportsDir: path.join(storageRoot, 'reports'),
  screenshotsDir: path.join(storageRoot, 'screenshots'),
  environmentConfigs,
};

export function getEnvironmentConfig(environment: BrowserEnvironment): EnvironmentConfig {
  return config.environmentConfigs[environment];
}
