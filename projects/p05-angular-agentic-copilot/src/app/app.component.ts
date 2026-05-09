import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import type {
  CopilotEnvironment,
  CopilotMode,
  CopilotModel,
  MockRuntimeEvent,
} from './models/copilot.models';
import { SessionSidebarComponent } from './components/session-sidebar.component';
import { ChatThreadComponent } from './components/chat-thread.component';
import { ActivityPanelComponent } from './components/activity-panel.component';
import { ComposerComponent } from './components/composer.component';
import { CopilotStateService } from './services/copilot-state.service';
import { MockAgentApiService } from './services/mock-agent-api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SessionSidebarComponent,
    ChatThreadComponent,
    ActivityPanelComponent,
    ComposerComponent,
  ],
  template: `
    <main class="shell">
      <section class="column sidebar">
        <app-session-sidebar
          [sessions]="state.sessions()"
          [activeSessionId]="state.activeSessionId()"
          (create)="state.createSession()"
          (select)="state.switchSession($event)"
          (delete)="state.deleteSession($event)"
        ></app-session-sidebar>
      </section>

      <section class="column center">
        <header class="toolbar">
          <div class="title-block">
            <p class="eyebrow">Angular Agentic Copilot</p>
            <h1>Local mock runtime, inspectable UX</h1>
          </div>

          <div class="toolbar-controls">
            <label>
              <span>Mode</span>
              <select [ngModel]="state.mode()" (ngModelChange)="state.setMode($event)">
                <option *ngFor="let option of modes" [ngValue]="option">{{ option }}</option>
              </select>
            </label>

            <label>
              <span>Model</span>
              <select [ngModel]="state.model()" (ngModelChange)="state.setModel($event)">
                <option *ngFor="let option of models" [ngValue]="option">{{ option }}</option>
              </select>
            </label>

            <label>
              <span>Environment</span>
              <select [ngModel]="state.environment()" (ngModelChange)="state.setEnvironment($event)">
                <option *ngFor="let option of environments" [ngValue]="option">{{ option }}</option>
              </select>
            </label>
          </div>
        </header>

        <app-chat-thread [messages]="state.currentSession()?.messages ?? []"></app-chat-thread>

        <app-composer [busy]="busy" (submitMessage)="sendPrompt($event)"></app-composer>
      </section>

      <section class="column panel">
        <app-activity-panel
          [activities]="state.currentSession()?.activities ?? []"
          [approval]="state.currentSession()?.pendingApproval ?? null"
          (approve)="handleApproval(true, $event)"
          (reject)="handleApproval(false, $event)"
        ></app-activity-panel>
      </section>
    </main>
  `,
  styles: [`
    .shell {
      display: grid;
      gap: 1rem;
      grid-template-columns: 280px minmax(0, 1fr) 340px;
      height: 100vh;
      padding: 1rem;
    }

    .column {
      backdrop-filter: blur(20px);
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow);
      min-height: 0;
      padding: 1rem;
    }

    .center {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .toolbar {
      align-items: flex-start;
      display: flex;
      gap: 1rem;
      justify-content: space-between;
    }

    .title-block h1,
    .title-block p {
      margin: 0;
    }

    .eyebrow {
      color: var(--text-soft);
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      margin-bottom: 0.45rem;
      text-transform: uppercase;
    }

    .title-block h1 {
      font-size: clamp(1.4rem, 2vw, 2rem);
      letter-spacing: -0.03em;
    }

    .toolbar-controls {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(3, minmax(120px, 1fr));
    }

    .toolbar-controls label {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .toolbar-controls span {
      color: var(--text-soft);
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .toolbar-controls select {
      background: var(--surface-alt);
      border: 1px solid var(--border);
      border-radius: 14px;
      color: var(--text);
      padding: 0.7rem 0.8rem;
    }

    @media (max-width: 1200px) {
      .shell {
        grid-template-columns: 240px minmax(0, 1fr);
      }

      .panel {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 860px) {
      .shell {
        grid-template-columns: 1fr;
        height: auto;
        min-height: 100vh;
      }

      .toolbar {
        flex-direction: column;
      }

      .toolbar-controls {
        grid-template-columns: 1fr;
        width: 100%;
      }
    }
  `],
})
export class AppComponent {
  readonly state = inject(CopilotStateService);
  private readonly mockApi = inject(MockAgentApiService);

  readonly modes: CopilotMode[] = ['Ask', 'Plan', 'Agent'];
  readonly models: CopilotModel[] = ['Mock', 'OpenAI placeholder', 'Local placeholder'];
  readonly environments: CopilotEnvironment[] = ['playground', 'test', 'prod'];

  busy = false;
  private activeMessageId: string | null = null;
  private subscription?: Subscription;

  sendPrompt(prompt: string): void {
    if (this.busy) {
      return;
    }

    this.busy = true;
    this.state.addUserMessage(prompt);
    this.activeMessageId = this.state.beginAssistantMessage();

    this.consumeEvents(
      this.mockApi.runPrompt(prompt, this.state.mode(), this.state.model(), this.state.environment()),
    );
  }

  handleApproval(approved: boolean, reason: string): void {
    if (this.busy || !this.state.currentSession()?.pendingApproval) {
      return;
    }

    this.busy = true;
    this.state.setApproval(null);
    this.activeMessageId = this.state.beginAssistantMessage();
    this.consumeEvents(this.mockApi.resolveApproval(approved, reason, this.state.environment()));
  }

  private consumeEvents(stream$: import('rxjs').Observable<MockRuntimeEvent>): void {
    this.subscription?.unsubscribe();
    this.subscription = stream$.subscribe({
      next: (event) => this.handleEvent(event),
      error: () => {
        if (this.activeMessageId) {
          this.state.appendAssistantChunk(this.activeMessageId, 'Something went wrong in the mock runtime.');
          this.state.completeAssistantMessage(this.activeMessageId);
        }
        this.busy = false;
      },
    });
  }

  private handleEvent(event: MockRuntimeEvent): void {
    if (event.type === 'activity') {
      this.state.addActivity(event.activity);
      return;
    }

    if (event.type === 'chunk' && this.activeMessageId) {
      this.state.appendAssistantChunk(this.activeMessageId, event.chunk);
      return;
    }

    if (event.type === 'approval') {
      if (this.activeMessageId) {
        this.state.appendAssistantChunk(this.activeMessageId, event.notice);
        this.state.completeAssistantMessage(this.activeMessageId);
      }
      this.activeMessageId = null;
      this.state.setApproval(event.approval);
      this.busy = false;
      return;
    }

    if (event.type === 'done') {
      if (this.activeMessageId) {
        this.state.completeAssistantMessage(this.activeMessageId);
      }
      this.activeMessageId = null;
      this.busy = false;
    }
  }
}
