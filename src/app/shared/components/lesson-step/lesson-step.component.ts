import { Component, Input, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../../../core/services/progress.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-lesson-step',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lesson-step" [class.completed]="isCompleted()">
      <div class="step-header">
        <div class="step-number">
          @if (isCompleted()) {
            <span class="check">✅</span>
          } @else {
            <span class="num">{{ stepNumber }}</span>
          }
        </div>
        <h3 class="step-title">{{ title }}</h3>
        <div class="step-actions">
          @if (authService.isLoggedIn) {
            @if (isCompleted()) {
              <button class="btn-undo" (click)="toggleComplete()">Undo</button>
            } @else {
              <button class="btn-complete" (click)="toggleComplete()">Mark Complete</button>
            }
          } @else {
            <span class="login-hint">Sign in to track progress</span>
          }
        </div>
      </div>
      <div class="step-body">
        <ng-content />
      </div>
    </div>
  `,
  styles: [`
    .lesson-step {
      border: 1px solid #3e3e42;
      border-radius: 10px;
      margin: 24px 0;
      overflow: hidden;
      transition: border-color 0.3s;
    }
    .lesson-step.completed { border-color: #4ec9b0; }

    .step-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 14px 20px;
      background: #252526;
      border-bottom: 1px solid #3e3e42;
    }
    .completed .step-header { border-bottom-color: #4ec9b0; background: #1a2e2a; }

    .step-number {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #3e3e42;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .completed .step-number { background: transparent; }
    .num { color: #cccccc; font-weight: 700; font-size: 14px; }
    .check { font-size: 20px; }

    .step-title {
      flex: 1;
      margin: 0;
      color: #cccccc;
      font-size: 16px;
    }
    .completed .step-title { color: #4ec9b0; }

    .step-actions { display: flex; align-items: center; }

    .btn-complete {
      background: transparent;
      border: 1px solid #4ec9b0;
      color: #4ec9b0;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }
    .btn-complete:hover { background: #4ec9b0; color: #1e1e1e; }

    .btn-undo {
      background: transparent;
      border: 1px solid #858585;
      color: #858585;
      padding: 6px 14px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.2s;
    }
    .btn-undo:hover { background: #3e3e42; color: #cccccc; }

    .login-hint { font-size: 12px; color: #858585; font-style: italic; }

    .step-body { padding: 20px; }
  `]
})
export class LessonStepComponent {
  @Input({ required: true }) stepId!: string;
  @Input() stepNumber: number | string = '';
  @Input() title = '';

  protected progressService = inject(ProgressService);
  protected authService = inject(AuthService);

  isCompleted = signal(false);

  constructor() {
    effect(() => {
      this.isCompleted.set(this.progressService.isCompleted(this.stepId));
    });
  }

  async toggleComplete() {
    if (this.isCompleted()) {
      await this.progressService.markIncomplete(this.stepId);
    } else {
      await this.progressService.markComplete(this.stepId);
    }
    this.isCompleted.set(this.progressService.isCompleted(this.stepId));
  }
}
