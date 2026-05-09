import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { ApprovalRequest } from '../models/copilot.models';

@Component({
  selector: 'app-approval-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="approval-card" *ngIf="approval">
      <p class="eyebrow">Approval Required</p>
      <h3>{{ approval.title }}</h3>
      <p>{{ approval.summary }}</p>
      <textarea
        [(ngModel)]="reason"
        rows="3"
        placeholder="Add an approval reason"
      ></textarea>
      <div class="actions">
        <button type="button" class="approve" (click)="approve.emit(reason)">Approve</button>
        <button type="button" class="reject" (click)="reject.emit(reason)">Reject</button>
      </div>
    </section>
  `,
  styles: [`
    .approval-card {
      background: rgba(255, 207, 112, 0.08);
      border: 1px solid rgba(255, 207, 112, 0.24);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      padding: 1rem;
    }

    .eyebrow {
      color: var(--warn);
      font-size: 0.76rem;
      letter-spacing: 0.08em;
      margin: 0;
      text-transform: uppercase;
    }

    h3,
    p {
      margin: 0;
    }

    p:last-of-type {
      color: var(--text-soft);
      line-height: 1.55;
    }

    textarea {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      color: var(--text);
      padding: 0.8rem;
      resize: vertical;
    }

    .actions {
      display: flex;
      gap: 0.75rem;
    }

    .approve,
    .reject {
      border: none;
      border-radius: 999px;
      padding: 0.7rem 1rem;
    }

    .approve {
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #04111c;
      font-weight: 700;
    }

    .reject {
      background: rgba(255, 138, 138, 0.14);
      color: #ffd1d1;
    }
  `],
})
export class ApprovalCardComponent {
  @Input({ required: true }) approval: ApprovalRequest | null = null;
  @Output() approve = new EventEmitter<string>();
  @Output() reject = new EventEmitter<string>();

  reason = '';
}
