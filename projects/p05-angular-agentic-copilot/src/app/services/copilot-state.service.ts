import { Injectable, computed, effect, signal } from '@angular/core';
import type {
  ActivityItem,
  ApprovalRequest,
  ChatMessage,
  CopilotEnvironment,
  CopilotMode,
  CopilotModel,
  CopilotSession,
} from '../models/copilot.models';

const STORAGE_KEY = 'p05-angular-agentic-copilot-state';

type PersistedState = {
  sessions: CopilotSession[];
  activeSessionId: string;
  mode: CopilotMode;
  model: CopilotModel;
  environment: CopilotEnvironment;
};

@Injectable({ providedIn: 'root' })
export class CopilotStateService {
  readonly sessions = signal<CopilotSession[]>([]);
  readonly activeSessionId = signal<string>('');
  readonly mode = signal<CopilotMode>('Ask');
  readonly model = signal<CopilotModel>('Mock');
  readonly environment = signal<CopilotEnvironment>('playground');
  readonly currentSession = computed(() =>
    this.sessions().find((session) => session.id === this.activeSessionId()) ?? null,
  );

  constructor() {
    this.load();

    effect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      const state: PersistedState = {
        sessions: this.sessions(),
        activeSessionId: this.activeSessionId(),
        mode: this.mode(),
        model: this.model(),
        environment: this.environment(),
      };

      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    });

    if (this.sessions().length === 0) {
      this.createSession();
    }
  }

  createSession(): void {
    const session: CopilotSession = {
      id: crypto.randomUUID(),
      title: 'New Session',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [],
      activities: [],
      pendingApproval: null,
    };

    this.sessions.update((sessions) => [session, ...sessions]);
    this.activeSessionId.set(session.id);
  }

  switchSession(sessionId: string): void {
    this.activeSessionId.set(sessionId);
  }

  deleteSession(sessionId: string): void {
    this.sessions.update((sessions) => sessions.filter((session) => session.id !== sessionId));
    if (this.activeSessionId() === sessionId) {
      const nextSession = this.sessions()[0];
      if (nextSession) {
        this.activeSessionId.set(nextSession.id);
      } else {
        this.createSession();
      }
    }
  }

  setMode(mode: CopilotMode): void {
    this.mode.set(mode);
  }

  setModel(model: CopilotModel): void {
    this.model.set(model);
  }

  setEnvironment(environment: CopilotEnvironment): void {
    this.environment.set(environment);
  }

  addUserMessage(content: string): void {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };

    this.patchCurrentSession((session) => {
      session.messages = [...session.messages, message];
      if (session.title === 'New Session') {
        session.title = content.slice(0, 32) || 'New Session';
      }
      return session;
    });
  }

  beginAssistantMessage(): string {
    const id = crypto.randomUUID();
    const message: ChatMessage = {
      id,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      streaming: true,
    };

    this.patchCurrentSession((session) => {
      session.messages = [...session.messages, message];
      return session;
    });

    return id;
  }

  appendAssistantChunk(messageId: string, chunk: string): void {
    this.patchCurrentSession((session) => {
      session.messages = session.messages.map((message) =>
        message.id === messageId
          ? { ...message, content: `${message.content}${chunk}` }
          : message,
      );
      return session;
    });
  }

  completeAssistantMessage(messageId: string): void {
    this.patchCurrentSession((session) => {
      session.messages = session.messages.map((message) =>
        message.id === messageId ? { ...message, streaming: false } : message,
      );
      return session;
    });
  }

  addActivity(activity: ActivityItem): void {
    this.patchCurrentSession((session) => {
      session.activities = [activity, ...session.activities].slice(0, 24);
      return session;
    });
  }

  setApproval(approval: ApprovalRequest | null): void {
    this.patchCurrentSession((session) => {
      session.pendingApproval = approval;
      return session;
    });
  }

  private patchCurrentSession(mutator: (session: CopilotSession) => CopilotSession): void {
    const currentId = this.activeSessionId();
    this.sessions.update((sessions) =>
      sessions.map((session) => {
        if (session.id !== currentId) {
          return session;
        }

        const nextSession = mutator({
          ...session,
          messages: [...session.messages],
          activities: [...session.activities],
        });

        return {
          ...nextSession,
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  }

  private load(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as PersistedState;
      this.sessions.set(parsed.sessions ?? []);
      this.activeSessionId.set(parsed.activeSessionId ?? '');
      this.mode.set(parsed.mode ?? 'Ask');
      this.model.set(parsed.model ?? 'Mock');
      this.environment.set(parsed.environment ?? 'playground');
    } catch {
      this.sessions.set([]);
      this.activeSessionId.set('');
    }
  }
}
