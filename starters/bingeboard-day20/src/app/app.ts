import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AnnouncementsService } from './core/announcements.service';

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
}
