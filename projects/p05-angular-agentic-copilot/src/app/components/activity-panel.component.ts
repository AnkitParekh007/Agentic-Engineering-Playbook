import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import type { ActivityItem, ApprovalRequest } from '../models/copilot.models';
import { ApprovalCardComponent } from './approval-card.component';

@Component({
  selector: 'app-activity-panel',
  standalone: true,
  imports: [CommonModule, ApprovalCardComponent],
  template: `
    <aside class="panel-shell">
      <div class="panel-head">
        <p class="eyebrow">Activity</p>
        <span>{{ activities.length }} events</span>
      </div>

      <app-approval-card
        [approval]="approval"
        (approve)="approve.emit($event)"
        (reject)="reject.emit($event)"
      ></app-approval-card>

      <div class="timeline">
        <article class="timeline-item" *ngFor="let activity of activities">
          <div class="status-dot" [class.blocked]="activity.status === 'blocked'"></div>
          <div class="timeline-copy">
            <strong>{{ activity.title }}</strong>
            <span>{{ activity.stage }}</span>
            <p>{{ activity.detail }}</p>
          </div>
        </article>
      </div>
    </aside>
  `,
  styles: [`
    .panel-shell {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      height: 100%;
    }

    .panel-head {
      align-items: center;
      color: var(--text-soft);
      display: flex;
      font-size: 0.82rem;
      justify-content: space-between;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    .eyebrow {
      margin: 0;
    }

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 0.9rem;
      overflow: auto;
      padding-right: 0.2rem;
    }

    .timeline-item {
      display: flex;
      gap: 0.75rem;
    }

    .status-dot {
      background: var(--success);
      border-radius: 999px;
      height: 0.7rem;
      margin-top: 0.35rem;
      width: 0.7rem;
    }

    .status-dot.blocked {
      background: var(--warn);
    }

    .timeline-copy {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 18px;
      flex: 1;
      padding: 0.9rem;
    }

    .timeline-copy strong,
    .timeline-copy span,
    .timeline-copy p {
      display: block;
    }

    .timeline-copy span {
      color: var(--text-soft);
      font-size: 0.8rem;
      margin-top: 0.25rem;
      text-transform: uppercase;
    }

    .timeline-copy p {
      color: var(--text-soft);
      line-height: 1.5;
      margin: 0.55rem 0 0;
    }
  `],
})
export class ActivityPanelComponent {
  @Input({ required: true }) activities: ActivityItem[] = [];
  @Input({ required: true }) approval: ApprovalRequest | null = null;
  @Output() approve = new EventEmitter<string>();
  @Output() reject = new EventEmitter<string>();
}
