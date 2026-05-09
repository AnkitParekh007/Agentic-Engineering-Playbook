import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-composer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form class="composer-shell" (ngSubmit)="submitPrompt()">
      <textarea
        [(ngModel)]="prompt"
        name="prompt"
        rows="3"
        [disabled]="busy"
        placeholder="Message the copilot..."
      ></textarea>
      <button type="submit" [disabled]="busy || !prompt.trim()">
        {{ busy ? 'Running...' : 'Send' }}
      </button>
    </form>
  `,
  styles: [`
    .composer-shell {
      align-items: flex-end;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: 24px;
      display: flex;
      gap: 0.8rem;
      padding: 0.9rem;
    }

    textarea {
      background: transparent;
      border: none;
      color: var(--text);
      flex: 1;
      min-height: 4.8rem;
      outline: none;
      resize: vertical;
    }

    button {
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      border: none;
      border-radius: 999px;
      color: #04111c;
      font-weight: 800;
      padding: 0.85rem 1.2rem;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }
  `],
})
export class ComposerComponent {
  @Input() busy = false;
  @Output() submitMessage = new EventEmitter<string>();

  prompt = '';

  submitPrompt(): void {
    const nextPrompt = this.prompt.trim();
    if (!nextPrompt) {
      return;
    }
    this.submitMessage.emit(nextPrompt);
    this.prompt = '';
  }
}
