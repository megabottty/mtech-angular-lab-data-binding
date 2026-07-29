import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../core/services/auth.service';
import { ProgressService } from '../core/services/progress.service';
import { environment } from '../../environments/environment';

const ALL_STEPS = [
  'act1-for', 'act1-track', 'act1-empty',
  'act2-if', 'act2-switch',
  'act3-oneway-down', 'act3-oneway-up', 'act3-twoway',
  'act4-signals', 'act4-computed', 'act4-full',
  'lab-task1', 'lab-task2', 'lab-task3'
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
          <div class="nav-section-label">Lessons</div>
          <a routerLink="/lesson/1" routerLinkActive="active" class="nav-item">
            🔁 Act 1 — &#64;for &amp; track
          </a>
          <a routerLink="/lesson/2" routerLinkActive="active" class="nav-item">
            🚦 Act 2 — &#64;if &amp; &#64;switch
          </a>
          <a routerLink="/lesson/3" routerLinkActive="active" class="nav-item">
            📡 Act 3 — [(ngModel)]
          </a>
          <a routerLink="/lesson/4" routerLinkActive="active" class="nav-item">
            ⚡ Act 4 — computed()
          </a>
          <a routerLink="/lesson/5" routerLinkActive="active" class="nav-item lab">
            🛠️ Student Lab
          </a>
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

    .topbar-right { margin-left: auto; }
    .user-info { display: flex; align-items: center; gap: 10px; }
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

  sidebarOpen = signal(false);
  totalSteps = ALL_STEPS.length;

  completedCount = computed(() => {
    const set = this.progressService.completedSteps();
    return ALL_STEPS.filter(id => set.has(id)).length;
  });

  progressPercent = computed(() => Math.round((this.completedCount() / this.totalSteps) * 100));

  isTeacher = computed(() => {
    return this.authService.uid === environment.teacherUid;
  });

  async signIn() {
    await this.authService.signInWithGoogle();
  }

  async signOut() {
    await this.authService.signOut();
  }
}
