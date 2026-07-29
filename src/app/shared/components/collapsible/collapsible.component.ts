import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-collapsible',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="collapsible" [class.open]="open()">
      <button class="collapsible-trigger" (click)="toggle()">
        <span class="trigger-icon">{{ icon }}</span>
        <span class="trigger-label">{{ label }}</span>
        <span class="chevron">{{ open() ? '▲' : '▼' }}</span>
      </button>
      <div class="collapsible-body" [class.visible]="open()">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .collapsible {
      border: 1px solid #3e3e42;
      border-radius: 8px;
      margin: 12px 0;
      overflow: hidden;
    }
    .collapsible.open { border-color: var(--accent); }

    .collapsible-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 10px;
      background: #252526;
      border: none;
      padding: 12px 16px;
      cursor: pointer;
      color: #cccccc;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      transition: background 0.2s;
    }
    .collapsible-trigger:hover { background: #2d2d30; }

    .trigger-icon { font-size: 18px; }
    .trigger-label { flex: 1; }
    .chevron { font-size: 11px; color: #858585; }

    .collapsible-body {
      display: none;
      padding: 16px;
      background: #1e1e1e;
      border-top: 1px solid #3e3e42;
    }
    .collapsible-body.visible { display: block; }
  `]
})
export class CollapsibleComponent {
  @Input() label = '';
  @Input() icon = '💡';

  open = signal(false);

  toggle() {
    this.open.update(v => !v);
  }
}
