import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import type { ChatMessage } from '../models/copilot.models';

@Component({
  selector: 'app-chat-thread',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="thread-shell">
      <div *ngIf="messages.length === 0" class="empty-state">
        <h2>Start an agentic conversation</h2>
        <p>Use Ask for direct questions, Plan for structured thinking, and Agent for timeline plus approvals.</p>
      </div>

      <article
        class="bubble"
        *ngFor="let message of messages"
        [class.user]="message.role === 'user'"
        [class.assistant]="message.role === 'assistant'"
      >
        <div class="bubble-meta">{{ message.role === 'user' ? 'You' : 'Assistant' }}</div>
        <p>
          {{ message.content }}
          <span *ngIf="message.streaming" class="cursor"></span>
        </p>
      </article>
    </section>
  `,
  styles: [`
    .thread-shell {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 1rem;
      min-height: 0;
      overflow: auto;
      padding-right: 0.25rem;
    }

    .empty-state {
      align-items: flex-start;
      background: linear-gradient(135deg, rgba(95, 225, 255, 0.08), rgba(125, 255, 207, 0.08));
      border: 1px solid var(--border);
      border-radius: 24px;
      display: flex;
      flex-direction: column;
      gap: 0.7rem;
      padding: 1.5rem;
    }

    .empty-state h2,
    .empty-state p {
      margin: 0;
    }

    .empty-state p {
      color: var(--text-soft);
      max-width: 48rem;
    }

    .bubble {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 22px;
      max-width: 80%;
      padding: 1rem 1.1rem;
    }

    .bubble.user {
      align-self: flex-end;
      background: rgba(95, 225, 255, 0.12);
      border-color: rgba(95, 225, 255, 0.18);
    }

    .bubble.assistant {
      align-self: flex-start;
    }

    .bubble-meta {
      color: var(--text-soft);
      font-size: 0.78rem;
      margin-bottom: 0.45rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .bubble p {
      line-height: 1.65;
      margin: 0;
      white-space: pre-wrap;
    }

    .cursor {
      animation: blink 1s steps(2, start) infinite;
      background: var(--accent);
      border-radius: 999px;
      display: inline-block;
      height: 1rem;
      margin-left: 0.2rem;
      vertical-align: middle;
      width: 0.2rem;
    }

    @keyframes blink {
      to {
        opacity: 0.2;
      }
    }
  `],
})
export class ChatThreadComponent {
  @Input({ required: true }) messages: ChatMessage[] = [];
}
