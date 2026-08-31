import { Component, inject, signal, computed, effect } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from '../core/services/auth.service';
import { ProgressService } from '../core/services/progress.service';
import { environment } from '../../environments/environment';

const ALL_STEPS = [
  'act1-for', 'act1-track', 'act1-empty',
  'act2-if', 'act2-switch',
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
  'd16-lab-min-viable-query', 'd16-lab-suggest-a-show', 'd16-lab-loading-audit', 'd16-lab-stretch-exhaustmap'
];

interface DayNavItem {
  path: string;
  label: string;
  isLab?: boolean;
}

interface DayGroup {
  id: string;
  label: string;
  /** URL prefix used to auto-expand this group when a matching route is active. */
  prefix: string;
  items: DayNavItem[];
}

// Add a new entry here for each future teaching day — the sidebar accordion
// renders itself from this list, no template changes needed.
const DAY_GROUPS: DayGroup[] = [
  {
    id: 'day5',
    label: '📘 Day 5 — Data Binding',
    prefix: '/lesson',
    items: [
      { path: '/lesson/1', label: '🔁 Act 1 — @for & track' },
      { path: '/lesson/2', label: '🚦 Act 2 — @if & @switch' },
      { path: '/lesson/3', label: '📡 Act 3 — [(ngModel)]' },
      { path: '/lesson/4', label: '⚡ Act 4 — computed()' },
      { path: '/lesson/5', label: '🛠️ Student Lab', isLab: true }
    ]
  },
  {
    id: 'day9',
    label: '🧭 Day 9 — Routing',
    prefix: '/day9',
    items: [
      { path: '/day9/act1', label: '🔗 Act 1 — Route Params' },
      { path: '/day9/act2', label: '🚀 Act 2 — Navigation' },
      { path: '/day9/act3', label: '🛡️ Act 3 — Guards' },
      { path: '/day9/act4', label: '📦 Act 4 — Lazy Loading' },
      { path: '/day9/lab', label: '🛠️ Student Lab', isLab: true }
    ]
  },
  {
    id: 'day13',
    label: '🌐 Day 13 — HTTP I',
    prefix: '/day13',
    items: [
      { path: '/day13/act1', label: '🌐 Act 1 — HttpClient & the Mental Model' },
      { path: '/day13/act2', label: '🧩 Act 2 — Typing & Adapting the API' },
      { path: '/day13/act3', label: '🔍 Act 3 — Browse Goes Live' },
      { path: '/day13/act4', label: '🎬 Act 4 — Detail Page Goes Live' },
      { path: '/day13/lab', label: '🛠️ Student Lab', isLab: true }
    ]
  },
  {
    id: 'day14',
    label: '🚨 Day 14 — HTTP II',
    prefix: '/day14',
    items: [
      { path: '/day14/act1', label: '🚨 Act 1 — Errors & Retry' },
      { path: '/day14/act2', label: '📡 Act 2 — httpResource' },
      { path: '/day14/act3', label: '🐛 Act 3 — Debug It' },
      { path: '/day14/lab', label: '🛠️ Student Lab', isLab: true }
    ]
  },
  {
    id: 'day15',
    label: '🌊 Day 15 — RxJS I',
    prefix: '/day15',
    items: [
      { path: '/day15/start', label: '🎬 Starting Point' },
      { path: '/day15/act1', label: '🌊 Act 1 — Stream Mental Model' },
      { path: '/day15/act2', label: '🔀 Act 2 — Operators in the Wild' },
      { path: '/day15/act3', label: '🧭 Act 3 — Router Streams & Debug It' },
      { path: '/day15/lab', label: '🛠️ Student Lab', isLab: true }
    ]
  },
  {
    id: 'day16',
    label: '🏁 Day 16 — RxJS II',
    prefix: '/day16',
    items: [
      { path: '/day16/start', label: '🎬 Starting Point' },
      { path: '/day16/act1', label: '🏁 Act 1 — The Race Condition' },
      { path: '/day16/act2', label: '🎯 Act 2 — Building the Typeahead' },
      { path: '/day16/act3', label: '🗺️ Act 3 — Operator Family & Closing the Loop' },
      { path: '/day16/lab', label: '🛠️ Student Lab', isLab: true }
    ]
  }
];

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="shell">
      <!-- Sidebar -->
      <aside class="sidebar" [class.open]="sidebarOpen()">
        <div class="sidebar-header">
          <span class="logo">⚡ Angular Lab</span>
          <button class="close-sidebar" (click)="sidebarOpen.set(false)">✕</button>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" class="nav-item">
            🏠 Home
          </a>
          @for (day of dayGroups; track day.id) {
            <div class="day-group">
              <button
                class="day-group-header"
                [class.expanded]="isExpanded(day.id)"
                (click)="toggleDay(day.id)"
                [attr.aria-expanded]="isExpanded(day.id)"
              >
                <span class="chevron">{{ isExpanded(day.id) ? '▾' : '▸' }}</span>
                <span class="day-label">{{ day.label }}</span>
              </button>
              @if (isExpanded(day.id)) {
                <div class="day-items">
                  @for (item of day.items; track item.path) {
                    <a
                      [routerLink]="item.path"
                      routerLinkActive="active"
                      class="nav-item child"
                      [class.lab]="item.isLab"
                    >
                      {{ item.label }}
                    </a>
                  }
                </div>
              }
            </div>
          }
          @if (isTeacher()) {
            <div class="nav-section-label">Teacher</div>
            <a routerLink="/dashboard" routerLinkActive="active" class="nav-item teacher">
              📊 Dashboard
            </a>
          }
        </nav>
      </aside>

      <!-- Main content area -->
      <div class="main">
        <!-- Top bar -->
        <header class="topbar">
          <button class="menu-btn" (click)="sidebarOpen.update(v => !v)">☰</button>
          
          <!-- Progress bar (only show if logged in) -->
          @if (authService.isLoggedIn) {
            <div class="progress-area">
              <div class="progress-bar-outer">
                <div class="progress-bar-inner" [style.width.%]="progressPercent()"></div>
              </div>
              <span class="progress-label">{{ completedCount() }} / {{ totalSteps }} steps</span>
            </div>
          }

          <div class="topbar-right">
            @if (authService.isLoggedIn) {
              <div class="user-info">
                @if (authService.photoUrl) {
                  <img [src]="authService.photoUrl" class="avatar" [alt]="authService.displayName" />
                }
                <span class="user-name">{{ authService.displayName }}</span>
                <button class="btn-signout" (click)="signOut()">Sign Out</button>
              </div>
            } @else {
              <button class="btn-signin" (click)="signIn()">Sign in with Google</button>
            }
            @if (authService.error(); as authError) {
              <div class="warning-box auth-error">{{ authError }}</div>
            }
          </div>
        </header>

        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .shell { display: flex; height: 100vh; overflow: hidden; background: #1e1e1e; }

    /* Sidebar */
    .sidebar {
      width: 240px;
      background: #252526;
      border-right: 1px solid #3e3e42;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      transition: transform 0.3s;
      z-index: 100;
    }
    .sidebar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #3e3e42;
    }
    .logo { font-weight: 700; font-size: 16px; color: #4fc3f7; }
    .close-sidebar { display: none; background: transparent; border: none; color: #858585; cursor: pointer; font-size: 18px; }

    .sidebar-nav { flex: 1; overflow-y: auto; padding: 8px 0; }
    .nav-item {
      display: block;
      padding: 10px 16px;
      color: #cccccc;
      text-decoration: none;
      font-size: 13px;
      transition: background 0.15s;
      border-left: 3px solid transparent;
    }
    .nav-item:hover { background: #2d2d30; }
    .nav-item.active { background: #2d2d30; border-left-color: #007acc; color: #ffffff; }
    .nav-item.lab { color: #c3e88d; }
    .nav-item.teacher { color: #ff9d00; }
    .nav-section-label {
      padding: 16px 16px 4px;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #858585;
    }

    /* Day accordion groups */
    .day-group { margin: 4px 0; }
    .day-group-header {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      border: none;
      padding: 12px 16px 12px 12px;
      color: #a8a8a8;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      text-align: left;
      transition: color 0.15s, background 0.15s;
    }
    .day-group-header:hover { color: #ffffff; background: #2d2d30; }
    .day-group-header.expanded { color: #4fc3f7; }
    .day-group-header .chevron { font-size: 10px; width: 10px; flex-shrink: 0; }
    .day-group-header .day-label { flex: 1; white-space: normal; line-height: 1.3; }
    .day-items { display: flex; flex-direction: column; }
    .nav-item.child { padding-left: 34px; font-size: 12.5px; }

    /* Top bar */
    .topbar {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 10px 20px;
      background: #2d2d30;
      border-bottom: 1px solid #3e3e42;
      flex-shrink: 0;
    }
    .menu-btn {
      background: transparent;
      border: none;
      color: #cccccc;
      font-size: 20px;
      cursor: pointer;
      display: none;
    }
    .progress-area { display: flex; align-items: center; gap: 10px; flex: 1; }
    .progress-bar-outer {
      height: 6px;
      background: #3e3e42;
      border-radius: 3px;
      flex: 1;
      max-width: 300px;
    }
    .progress-bar-inner {
      height: 100%;
      background: linear-gradient(90deg, #4fc3f7, #4ec9b0);
      border-radius: 3px;
      transition: width 0.5s ease;
    }
    .progress-label { font-size: 12px; color: #858585; white-space: nowrap; }

    .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
    .user-info { display: flex; align-items: center; gap: 10px; }
    .auth-error {
      margin: 0;
      padding: 6px 12px;
      font-size: 12px;
      max-width: 280px;
    }
    .avatar { width: 28px; height: 28px; border-radius: 50%; border: 2px solid #4fc3f7; }
    .user-name { font-size: 13px; color: #cccccc; }
    .btn-signout {
      background: transparent; border: 1px solid #3e3e42; color: #858585;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .btn-signout:hover { background: #3e3e42; color: #cccccc; }
    .btn-signin {
      background: #4285f4; border: none; color: white;
      padding: 7px 16px; border-radius: 6px; cursor: pointer;
      font-size: 13px; font-weight: 600;
    }
    .btn-signin:hover { background: #3367d6; }

    /* Main */
    .main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .content { flex: 1; overflow-y: auto; padding: 32px; }

    /* Mobile */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        top: 0; left: 0; bottom: 0;
        transform: translateX(-100%);
      }
      .sidebar.open { transform: translateX(0); }
      .close-sidebar { display: block; }
      .menu-btn { display: block; }
      .content { padding: 16px; }
    }
  `]
})
export class ShellLayoutComponent {
  protected authService = inject(AuthService);
  private progressService = inject(ProgressService);
  private router = inject(Router);

  sidebarOpen = signal(false);
  totalSteps = ALL_STEPS.length;
  dayGroups = DAY_GROUPS;

  // Which day-group accordions are open. Seeded from the current URL so a
  // direct link/refresh lands with the right group already expanded.
  private expandedDays = signal<Set<string>>(new Set(this.matchingDayIds(this.router.url)));

  constructor() {
    // Auto-expand (never auto-collapse) whichever day's page is currently active,
    // on every navigation — not just initial load — so this also works when a
    // student navigates via a lesson page's own prev/next links or the address bar.
    const navigationEnd = toSignal(
      this.router.events.pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd)),
      { initialValue: null }
    );

    effect(() => {
      const event = navigationEnd();
      const url = event ? event.urlAfterRedirects : this.router.url;
      const matches = this.matchingDayIds(url);
      if (matches.length === 0) return;

      this.expandedDays.update(current => {
        const next = new Set(current);
        matches.forEach(id => next.add(id));
        return next;
      });
    });
  }

  private matchingDayIds(url: string): string[] {
    return DAY_GROUPS.filter(day => url.startsWith(day.prefix)).map(day => day.id);
  }

  isExpanded(dayId: string): boolean {
    return this.expandedDays().has(dayId);
  }

  toggleDay(dayId: string): void {
    this.expandedDays.update(current => {
      const next = new Set(current);
      if (next.has(dayId)) {
        next.delete(dayId);
      } else {
        next.add(dayId);
      }
      return next;
    });
  }

  completedCount = computed(() => {
    const set = this.progressService.completedSteps();
    return ALL_STEPS.filter(id => set.has(id)).length;
  });

  progressPercent = computed(() => Math.round((this.completedCount() / this.totalSteps) * 100));

  isTeacher = computed(() => {
    return this.authService.uid === environment.teacherUid;
  });

  async signIn() {
    // AuthService already records the failure in authService.error() for the
    // template to show — catch here too so a failed sign-in doesn't also
    // surface as an unhandled promise rejection in the console.
    try {
      await this.authService.signInWithGoogle();
    } catch {
      // handled via authService.error()
    }
  }

  async signOut() {
    try {
      await this.authService.signOut();
    } catch {
      // handled via authService.error()
    }
  }
}
