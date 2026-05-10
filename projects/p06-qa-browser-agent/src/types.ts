export type BrowserEnvironment = 'playground' | 'test' | 'prod';
export type ScenarioName = 'homepage_smoke' | 'login_form_visual_check' | 'navigation_check';
export type ActionIntent = 'observe' | 'mutate';
export type TestRunStatus = 'created' | 'running' | 'completed' | 'failed' | 'rejected';

export type TestRunRequest = {
  scenario: ScenarioName;
  environment: BrowserEnvironment;
  targetUrl: string;
  dryRun?: boolean;
  actionIntent?: ActionIntent;
};

export type TraceEvent = {
  runId: string;
  scenario: ScenarioName;
  environment: BrowserEnvironment;
  targetUrl: string;
  status: TestRunStatus;
  latencyMs: number;
  step: string;
  success: boolean;
  message?: string;
};

export type ScenarioCheck = {
  name: string;
  success: boolean;
  detail: string;
};

export type TestReport = {
  runId: string;
  scenario: ScenarioName;
  environment: BrowserEnvironment;
  targetUrl: string;
  dryRun: boolean;
  summary: string;
  screenshotPath?: string;
  checks: ScenarioCheck[];
  traces: TraceEvent[];
  createdAt: string;
};

export type TestRunResult = {
  id: string;
  scenario: ScenarioName;
  environment: BrowserEnvironment;
  targetUrl: string;
  dryRun: boolean;
  actionIntent: ActionIntent;
  status: TestRunStatus;
  latencyMs: number;
  reportPath: string;
  screenshotPath?: string;
  failureReason?: string;
  createdAt: string;
  updatedAt: string;
};

export type EnvironmentConfig = {
  environment: BrowserEnvironment;
  forceDryRun: boolean;
  allowedHosts: string[];
  timeoutMs: number;
};
