import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService, StudentProgress } from '../../core/services/progress.service';

const ALL_STEPS = [
  'act1-for', 'act1-track', 'act1-track-deep', 'act1-empty',
  'act2-if', 'act2-switch', 'act2-choose',
  'act3-oneway-down', 'act3-oneway-up', 'act3-twoway',
  'act4-signals', 'act4-computed', 'act4-full',
  'lab-task1', 'lab-task2', 'lab-task3',
  'd9-act1-service', 'd9-act1-route-param', 'd9-act1-detail-page', 'd9-act1-debug',
  'd9-act2-navigate', 'd9-act2-rule',
  'd9-act3-guard-create', 'd9-act3-guard-wire',
  'd9-act4-lazy-convert', 'd9-act4-verify',
  'd9-lab-prevnext', 'd9-lab-notfound', 'd9-lab-guard-watchlist', 'd9-lab-stretch',
  'd13-act1-problem', 'd13-act1-httpclient', 'd13-act1-observable-model',
  'd13-act2-typing', 'd13-act2-adapter', 'd13-act2-service', 'd13-act2-subscribe-fires',
  'd13-act3-browse-component', 'd13-act3-three-state', 'd13-act3-debug',
  'd13-act4-detail-live', 'd13-act4-innerhtml', 'd13-act4-pitfalls',
  'd13-lab-runtime', 'd13-lab-recent-searches', 'd13-lab-season-count', 'd13-lab-stretch-watchlist',
  'd14-act1-warmup-problem', 'd14-act1-error-signal', 'd14-act1-taxonomy',
  'd14-act2-resource-intro', 'd14-act2-detail-rebuild', 'd14-act2-which-one-when',
  'd14-act3-debug-resource', 'd14-act3-debug-subscribe-style', 'd14-act3-debug-loading-reset',
  'd14-lab-404-grace', 'd14-lab-episodes-resource', 'd14-lab-skeleton-screens', 'd14-lab-stretch-interceptors',
  'd15-act1-stream-model', 'd15-act1-leak-demo', 'd15-act1-tosignal-fix',
  'd15-act2-map-real-work', 'd15-act2-async-pipe', 'd15-act2-signals-vs-observables',
  'd15-act3-router-stream', 'd15-act3-debug-racing-timers', 'd15-act3-operator-scope-note',
  'd15-lab-ticker', 'd15-lab-top-rated', 'd15-lab-leak-hunt', 'd15-lab-stretch-keydown',
  'd16-act1-naive-search', 'd16-act1-race-condition', 'd16-act1-switchmap-insight',
  'd16-act2-subject-debounce', 'd16-act2-switchmap-catcherror', 'd16-act2-verify-cleanup',
  'd16-act3-operator-family', 'd16-act3-route-params-switchmap', 'd16-act3-debug-nested-subscribe',
  'd16-lab-min-viable-query', 'd16-lab-suggest-a-show', 'd16-lab-loading-audit', 'd16-lab-stretch-exhaustmap',
  'd17-act1-pipes-you-already-used', 'd17-act1-builtin-sweep', 'd17-act1-purity',
  'd17-act2-custom-runtime-pipe', 'd17-act2-taxonomy', 'd17-act2-debug-shout-pipe',
  'd17-lab-tier1-pipes-in-anger', 'd17-lab-tier2-debt-paydown', 'd17-lab-tier3-polish-sprint', 'd17-lab-tier4-stretch-highlight',
  'd18-act1-baas-tradeoff', 'd18-act1-create-project', 'd18-act1-seed-console',
  'd18-act2-install-wire', 'd18-act2-featured-service', 'd18-act2-render-home',
  'd18-act3-realtime-demo', 'd18-act3-debug-three-bugs',
  'd18-lab-console-fluency', 'd18-lab-announcements-solo', 'd18-lab-sorted-display', 'd18-lab-stretch-realtime-indicator',
  'd19-act1-service-contract', 'd19-act1-crud-verbs', 'd19-act1-document-shape',
  'd19-act2-read-computed', 'd19-act2-add-create', 'd19-act2-remove-delete',
  'd19-act3-update-setnote', 'd19-act3-prove-contract', 'd19-act3-debug-three-bugs',
  'd19-lab-watched-toggle', 'd19-lab-reviews-solo', 'd19-lab-added-when', 'd19-lab-stretch-optimistic-ux',
  'd20-act1-why-query', 'd20-act1-seed-reviews', 'd20-act1-reviews-for-show',
  'd20-act2-index-error', 'd20-act2-query-vs-computed',
  'd20-act3-read-test-mode-rule', 'd20-act3-destination-rule', 'd20-act3-debug-bug1', 'd20-act3-debug-bug2',
  'd20-lab-top-rated-toggle', 'd20-lab-featured-curated', 'd20-lab-count-badge', 'd20-lab-stretch-pagination'
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dash-header">
        <h1>📊 Teacher Dashboard</h1>
        <p class="dash-subtitle">Live student progress — refreshes automatically</p>
        <button class="btn-refresh" (click)="load()" [disabled]="loading()">
          {{ loading() ? '⏳ Loading...' : '🔄 Refresh' }}
        </button>
      </div>

      @if (loading()) {
        <div class="loading-state">Loading student data...</div>
      } @else if (students().length === 0) {
        <div class="empty-state">
          <p>No students have signed in yet.</p>
          <p>Students appear here after they log in with Google and mark their first step complete.</p>
        </div>
      } @else {
        <!-- Summary cards -->
        <div class="summary-row">
          <div class="summary-card">
            <div class="summary-value">{{ students().length }}</div>
            <div class="summary-label">Students</div>
          </div>
          <div class="summary-card">
            <div class="summary-value">{{ avgCompletionPercent() }}%</div>
            <div class="summary-label">Avg Completion</div>
          </div>
          <div class="summary-card">
            <div class="summary-value">{{ studentsFinished() }}</div>
            <div class="summary-label">Fully Completed</div>
          </div>
          <div class="summary-card warning">
            <div class="summary-value">{{ studentsStuck() }}</div>
            <div class="summary-label">Need Help (0 steps)</div>
          </div>
        </div>

        <!-- Per-step progress -->
        <div class="section">
          <h2>Step Completion Overview</h2>
          <div class="step-grid">
            @for (step of allSteps; track step) {
              <div class="step-item">
                <div class="step-name">{{ step }}</div>
                <div class="step-bar-outer">
                  <div class="step-bar-inner" [style.width.%]="stepPercent(step)"></div>
                </div>
                <div class="step-count">{{ stepCount(step) }}/{{ students().length }}</div>
              </div>
            }
          </div>
        </div>

        <!-- Student table -->
        <div class="section">
          <h2>All Students</h2>
          <div class="table-wrapper">
            <table class="student-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Email</th>
                  <th>Progress</th>
                  <th>Steps Done</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                @for (s of sortedStudents(); track s.uid) {
                  <tr [class.complete]="s.completedSteps.length === totalSteps">
                    <td>{{ s.displayName }}</td>
                    <td class="email">{{ s.email }}</td>
                    <td>
                      <div class="mini-bar-outer">
                        <div class="mini-bar-inner" [style.width.%]="studentPercent(s)"></div>
                      </div>
                      <span class="pct">{{ studentPercent(s) }}%</span>
                    </td>
                    <td class="count">{{ s.completedSteps.length }} / {{ totalSteps }}</td>
                    <td class="last-active">{{ formatDate(s.lastActive) }}</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .dashboard { max-width: 1000px; }
    .dash-header { margin-bottom: 28px; }
    .dash-header h1 { margin-bottom: 6px; }
    .dash-subtitle { color: #858585; margin-bottom: 12px; }
    .btn-refresh {
      background: transparent; border: 1px solid #3e3e42; color: #cccccc;
      padding: 7px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    .btn-refresh:hover:not(:disabled) { background: #3e3e42; }
    .btn-refresh:disabled { opacity: 0.5; cursor: not-allowed; }

    .loading-state, .empty-state {
      text-align: center; padding: 60px 20px; color: #858585;
    }

    .summary-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 32px;
    }
    @media (max-width: 700px) { .summary-row { grid-template-columns: repeat(2, 1fr); } }
    .summary-card {
      background: #252526; border: 1px solid #3e3e42; border-radius: 10px;
      padding: 20px; text-align: center;
    }
    .summary-card.warning { border-color: #5c3800; background: #2a1a00; }
    .summary-value { font-size: 32px; font-weight: 700; color: #4fc3f7; }
    .summary-card.warning .summary-value { color: #ff9d00; }
    .summary-label { font-size: 12px; color: #858585; margin-top: 4px; }

    .section { margin-bottom: 40px; }
    .section h2 { font-size: 16px; margin-bottom: 16px; color: #cccccc; }

    .step-grid { display: flex; flex-direction: column; gap: 8px; }
    .step-item { display: grid; grid-template-columns: 180px 1fr 60px; gap: 12px; align-items: center; font-size: 13px; }
    .step-name { font-family: monospace; color: #89ddff; }
    .step-bar-outer { height: 8px; background: #3e3e42; border-radius: 4px; }
    .step-bar-inner { height: 100%; background: linear-gradient(90deg, #4fc3f7, #4ec9b0); border-radius: 4px; transition: width 0.5s; }
    .step-count { color: #858585; text-align: right; }

    .table-wrapper { overflow-x: auto; }
    .student-table { width: 100%; border-collapse: collapse; font-size: 14px; }
    .student-table th {
      background: #2d2d30; color: #858585; padding: 10px 14px;
      text-align: left; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .student-table td {
      padding: 12px 14px; border-bottom: 1px solid #3e3e42; color: #cccccc;
    }
    .student-table tr:hover td { background: #252526; }
    .student-table tr.complete td { color: #4ec9b0; }
    .email { color: #858585; font-size: 13px; }
    .count { font-family: monospace; }
    .last-active { color: #858585; font-size: 12px; }

    .mini-bar-outer {
      display: inline-block; width: 80px; height: 6px;
      background: #3e3e42; border-radius: 3px; vertical-align: middle; margin-right: 8px;
    }
    .mini-bar-inner { height: 100%; background: #4fc3f7; border-radius: 3px; }
    .pct { font-size: 12px; color: #858585; }
  `]
})
export class DashboardComponent implements OnInit {
  private progressService = inject(ProgressService);

  students = signal<StudentProgress[]>([]);
  loading = signal(true);
  allSteps = ALL_STEPS;
  totalSteps = ALL_STEPS.length;

  ngOnInit() {
    this.load();
  }

  async load() {
    this.loading.set(true);
    this.students.set(await this.progressService.getAllStudentProgress());
    this.loading.set(false);
  }

  sortedStudents() {
    return [...this.students()].sort((a, b) => b.completedSteps.length - a.completedSteps.length);
  }

  studentPercent(s: StudentProgress): number {
    return Math.round((s.completedSteps.length / this.totalSteps) * 100);
  }

  avgCompletionPercent(): number {
    const list = this.students();
    if (!list.length) return 0;
    const total = list.reduce((sum, s) => sum + s.completedSteps.length, 0);
    return Math.round((total / (list.length * this.totalSteps)) * 100);
  }

  studentsFinished(): number {
    return this.students().filter(s => s.completedSteps.length === this.totalSteps).length;
  }

  studentsStuck(): number {
    return this.students().filter(s => s.completedSteps.length === 0).length;
  }

  stepCount(stepId: string): number {
    return this.students().filter(s => s.completedSteps.includes(stepId)).length;
  }

  stepPercent(stepId: string): number {
    const list = this.students();
    if (!list.length) return 0;
    return Math.round((this.stepCount(stepId) / list.length) * 100);
  }

  formatDate(d: Date | null): string {
    if (!d) return 'Never';
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }
}
