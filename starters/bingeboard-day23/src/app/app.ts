import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AnnouncementsService } from './core/announcements.service';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <header class="app-nav">
      <span class="brand">📺 BingeBoard</span>
      <nav>
        <a routerLink="/">Browse</a>
        <a routerLink="/stats">Stats</a>
        <a routerLink="/watchlist">Watchlist</a>
        <a routerLink="/suggest">Suggest a Show</a>
      </nav>
      <div class="auth-area">
        @if (authSvc.user() === undefined) {
          <span class="auth-loading">Checking sign-in…</span>
        } @else if (authSvc.user(); as currentUser) {
          <img [src]="currentUser.photoURL ?? ''" [alt]="currentUser.displayName ?? 'Profile'" class="avatar">
          <span>{{ currentUser.displayName }}</span>
          <button type="button" (click)="authSvc.signOut()">Sign out</button>
        } @else {
          <button type="button" (click)="signIn()">Sign in with Google</button>
        }
      </div>
    </header>

    @if (announcementsSvc.sorted().length) {
      <div class="announcement-banner">
        @for (a of announcementsSvc.sorted(); track a.id) {
          <p>{{ a.message }} — {{ a.postedAt.toDate() | date: 'MMM d' }}</p>
        }
      </div>
    }

    <main>
      <router-outlet />
    </main>
  `,
  styles: [`
    .app-nav {
      display: flex; align-items: center; gap: 24px;
      padding: 14px 24px; border-bottom: 1px solid #2a2d35;
    }
    .brand { font-weight: 700; }
    nav { display: flex; gap: 16px; }
    nav a { text-decoration: none; }
    .auth-area { display: flex; align-items: center; gap: 8px; margin-left: auto; }
    .auth-loading { font-size: 13px; color: #858585; }
    .avatar { width: 24px; height: 24px; border-radius: 50%; }
    .announcement-banner {
      padding: 8px 24px; background: #1a2e4a; border-bottom: 1px solid #2a4a7a;
      font-size: 13px; color: #b0c8e0;
    }
    .announcement-banner p { margin: 2px 0; }
  `]
})
export class App {
  // Day 18 lab, Task 2 -- a full solo rep, rendered in the app shell so
  // every page shows it.
  announcementsSvc = inject(AnnouncementsService);

  // Day 21 Act 1 -- three-state header, plus Lab Task 3's return-URL
  // handoff: `signedInGuard` stashes a `returnUrl` query param before
  // redirecting home, and a successful sign-in sends the visitor back.
  authSvc = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  async signIn() {
    await this.authSvc.signIn();
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (returnUrl?.startsWith('/') && !returnUrl.startsWith('//')) {
      this.router.navigateByUrl(returnUrl);
    }
  }
}
