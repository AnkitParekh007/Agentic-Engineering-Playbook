import { Injectable } from '@angular/core';
import { concat, from, map, Observable, of } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import type {
  ActivityItem,
  ApprovalRequest,
  CopilotEnvironment,
  CopilotMode,
  CopilotModel,
  MockRuntimeEvent,
} from '../models/copilot.models';

@Injectable({ providedIn: 'root' })
export class MockAgentApiService {
  runPrompt(
    prompt: string,
    mode: CopilotMode,
    model: CopilotModel,
    environment: CopilotEnvironment,
  ): Observable<MockRuntimeEvent> {
    const needsApproval =
      mode === 'Agent' &&
      (environment === 'prod' ||
        /approve|leadership|finance|send|deploy|production/i.test(prompt));

    const activities = this.baseActivities(mode, environment);
    const responseText = this.buildResponse(prompt, mode, model, environment);

    const activityEvents = activities.map((activity, index) =>
      of<MockRuntimeEvent>({ type: 'activity', activity }).pipe(delay(120 * (index + 1))),
    );

    if (needsApproval) {
      const approval: ApprovalRequest = {
        id: crypto.randomUUID(),
        title: 'Approval required',
        toolName: 'send_summary',
        summary: `The mock agent wants to continue with a sensitive action in ${environment}.`,
        requestedAt: new Date().toISOString(),
      };

      const blockedActivity = this.activity(
        'approval_required',
        'Approval required',
        `Execution paused before sending the final action in ${environment}.`,
        'blocked',
      );

      return concat(
        ...activityEvents,
        of<MockRuntimeEvent>({ type: 'activity', activity: blockedActivity }).pipe(delay(160)),
        this.chunkText('I prepared the next action and need your approval before continuing.'),
        of<MockRuntimeEvent>({
          type: 'approval',
          approval,
          notice: 'Approval required before the agent can continue.',
        }).pipe(delay(120)),
        of<MockRuntimeEvent>({ type: 'done' }).pipe(delay(30)),
      );
    }

    return concat(
      ...activityEvents,
      this.chunkText(responseText),
      of<MockRuntimeEvent>({
        type: 'activity',
        activity: this.activity(
          'completed',
          'Completed',
          `Response finished with ${model}.`,
          'completed',
        ),
      }).pipe(delay(90)),
      of<MockRuntimeEvent>({ type: 'done' }).pipe(delay(30)),
    );
  }

  resolveApproval(
    approved: boolean,
    reason: string,
    environment: CopilotEnvironment,
  ): Observable<MockRuntimeEvent> {
    if (!approved) {
      return concat(
        of<MockRuntimeEvent>({
          type: 'activity',
          activity: this.activity(
            'approval_required',
            'Rejected',
            reason || 'The approval request was rejected.',
            'blocked',
          ),
        }).pipe(delay(80)),
        this.chunkText('I did not execute the action because the approval was rejected.'),
        of<MockRuntimeEvent>({ type: 'done' }).pipe(delay(30)),
      );
    }

    return concat(
      of<MockRuntimeEvent>({
        type: 'activity',
        activity: this.activity(
          'tool_call',
          'Tool call resumed',
          `Approval accepted. Continuing in ${environment}.`,
          'running',
        ),
      }).pipe(delay(120)),
      this.chunkText(
        `Approval accepted. I resumed the mock action in ${environment} and completed the requested workflow successfully.`,
      ),
      of<MockRuntimeEvent>({
        type: 'activity',
        activity: this.activity(
          'completed',
          'Completed',
          'The approved action finished successfully.',
          'completed',
        ),
      }).pipe(delay(80)),
      of<MockRuntimeEvent>({ type: 'done' }).pipe(delay(30)),
    );
  }

  private baseActivities(mode: CopilotMode, environment: CopilotEnvironment): ActivityItem[] {
    const activities: ActivityItem[] = [
      this.activity('planning', 'Planning', `Building a ${mode.toLowerCase()} response path.`, 'completed'),
    ];

    if (mode !== 'Ask') {
      activities.push(
        this.activity('retrieval', 'Retrieval', 'Mock retrieval and evidence lookup completed.', 'completed'),
      );
    }

    if (mode === 'Agent') {
      activities.push(
        this.activity('tool_call', 'Tool call', `Prepared tool activity for ${environment}.`, 'completed'),
      );
    }

    return activities;
  }

  private buildResponse(
    prompt: string,
    mode: CopilotMode,
    model: CopilotModel,
    environment: CopilotEnvironment,
  ): string {
    if (mode === 'Plan') {
      return `Plan generated with ${model} in ${environment}: 1. Understand the request. 2. Gather evidence. 3. Choose the safest tool path. 4. Return a concise execution summary for "${prompt}".`;
    }

    if (mode === 'Agent') {
      return `Agent mode with ${model} in ${environment}: I reviewed the request, simulated retrieval, checked the tool path, and completed a safe mock workflow for "${prompt}".`;
    }

    return `Ask mode with ${model} in ${environment}: here is a concise mock answer for "${prompt}".`;
  }

  private chunkText(text: string): Observable<MockRuntimeEvent> {
    return from(text.split(' ')).pipe(
      concatMap((token) =>
        of(token).pipe(
          delay(36),
          map(
            (value) =>
              ({
                type: 'chunk',
                chunk: `${value} `,
              }) satisfies MockRuntimeEvent,
          ),
        ),
      ),
    );
  }

  private activity(
    stage: ActivityItem['stage'],
    title: string,
    detail: string,
    status: ActivityItem['status'],
  ): ActivityItem {
    return {
      id: crypto.randomUUID(),
      stage,
      title,
      detail,
      status,
      createdAt: new Date().toISOString(),
    };
  }
}
