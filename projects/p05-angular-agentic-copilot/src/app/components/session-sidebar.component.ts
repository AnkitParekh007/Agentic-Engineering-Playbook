import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { CopilotSession } from '../models/copilot.models';

@Component({
  selector: 'app-session-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="sidebar-shell">
      <div class="sidebar-head">
        <p class="eyebrow">Sessions</p>
        <button class="ghost-button" type="button" (click)="create.emit()">New</button>
      </div>

      <button
        class="session-item"
        type="button"
        *ngFor="let session of sessions"
        [class.active]="session.id === activeSessionId"
        (click)="select.emit(session.id)"
      >
        <div class="session-copy">
          <strong>{{ session.title }}</strong>
          <span>{{ session.messages.length }} messages</span>
        </div>
        <span class="delete-chip" (click)="onDelete($event, session.id)">Delete</span>
      </button>
    </aside>
  `,
  styles: [`
    .sidebar-shell {
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
      height: 100%;
    }

    .sidebar-head {
      align-items: center;
      display: flex;
      justify-content: space-between;
    }

    .eyebrow {
      color: var(--text-soft);
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      margin: 0;
      text-transform: uppercase;
    }

    .ghost-button {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border);
      border-radius: 999px;
      color: var(--text);
      padding: 0.45rem 0.8rem;
    }

    .session-item {
      align-items: center;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid transparent;
      border-radius: 18px;
      color: inherit;
      display: flex;
      justify-content: space-between;
      padding: 0.9rem;
      text-align: left;
      width: 100%;
    }

    .session-item.active {
      background: rgba(95, 225, 255, 0.1);
      border-color: var(--border);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
    }

    .session-copy {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      min-width: 0;
    }

    .session-copy strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .session-copy span,
    .delete-chip {
      color: var(--text-soft);
      font-size: 0.82rem;
    }

    .delete-chip {
      border-left: 1px solid rgba(255, 255, 255, 0.08);
      padding-left: 0.8rem;
    }
  `],
})
export class SessionSidebarComponent {
  @Input({ required: true }) sessions: CopilotSession[] = [];
  @Input({ required: true }) activeSessionId = '';
  @Output() create = new EventEmitter<void>();
  @Output() select = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onDelete(event: Event, sessionId: string): void {
    event.stopPropagation();
    this.delete.emit(sessionId);
  }
}
