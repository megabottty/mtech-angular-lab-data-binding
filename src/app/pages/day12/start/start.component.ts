import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day12-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 12 · Starting Point</span>
        <h1>🎬 Get the Validated BingeBoard Running</h1>
        <p class="subtitle">Start with the complete Day 11 review form: validation, dynamic tags, accessible errors, and a signal-based service are all ready for a forms-landscape survey.</p>
      </div>

      <div class="info-box">
        <strong>Two ways to get there:</strong> run the Day 12 starter, or bring the exact end-of-Day-11 files into your own project.
      </div>

      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li>Clone the teaching site's repository.</li>
          <li>Install the starter's own dependencies, then run it.</li>
          <li>Open <code>http://localhost:4200</code>.</li>
        </ul>
        <app-code-block lang="bash" [code]="cloneCommand" />
        <p><a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day12" target="_blank" rel="noopener">Browse starter files on GitHub</a>.</p>
      </section>

      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>Copy these exact starter files over an end-of-Day-11 project before continuing. They include the full validation experience that Day 12 uses for comparison.</p>
        <h4>Project configuration</h4>
        <app-collapsible icon="📄" label="angular.json"><app-code-block lang="json" [code]="starter_angular_jsonCode" /></app-collapsible>
        <app-collapsible icon="📄" label="package.json"><app-code-block lang="json" [code]="starter_package_jsonCode" /></app-collapsible>
        <app-collapsible icon="📄" label="tsconfig.app.json"><app-code-block lang="json" [code]="starter_tsconfig_app_jsonCode" /></app-collapsible>
        <app-collapsible icon="📄" label="tsconfig.json"><app-code-block lang="json" [code]="starter_tsconfig_jsonCode" /></app-collapsible>

        <h4>src/app</h4>
        <app-collapsible icon="📄" label="src/app/app.css"><app-code-block lang="css" [code]="starter_src_app_app_cssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.html"><app-code-block lang="html" [code]="starter_src_app_app_htmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.routes.ts"><app-code-block lang="typescript" [code]="starter_src_app_app_routes_tsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.ts"><app-code-block lang="typescript" [code]="starter_src_app_app_tsCode" /></app-collapsible>

        <h4>src/app/guards</h4>
        <app-collapsible icon="📄" label="src/app/guards/has-watchlist.ts"><app-code-block lang="typescript" [code]="starter_src_app_guards_has_watchlist_tsCode" /></app-collapsible>

        <h4>src/app/header</h4>
        <app-collapsible icon="📄" label="src/app/header/header.css"><app-code-block lang="css" [code]="starter_src_app_header_header_cssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/header/header.html"><app-code-block lang="html" [code]="starter_src_app_header_header_htmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/header/header.ts"><app-code-block lang="typescript" [code]="starter_src_app_header_header_tsCode" /></app-collapsible>

        <h4>src/app/models</h4>
        <app-collapsible icon="📄" label="src/app/models/review.ts"><app-code-block lang="typescript" [code]="starter_src_app_models_review_tsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/models/show.ts"><app-code-block lang="typescript" [code]="starter_src_app_models_show_tsCode" /></app-collapsible>

        <h4>src/app/pages/about</h4>
        <app-collapsible icon="📄" label="src/app/pages/about/about.ts"><app-code-block lang="typescript" [code]="starter_src_app_pages_about_about_tsCode" /></app-collapsible>

        <h4>src/app/pages/browse</h4>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.css"><app-code-block lang="css" [code]="starter_src_app_pages_browse_browse_cssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.html"><app-code-block lang="html" [code]="starter_src_app_pages_browse_browse_htmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.ts"><app-code-block lang="typescript" [code]="starter_src_app_pages_browse_browse_tsCode" /></app-collapsible>

        <h4>src/app/pages/home</h4>
        <app-collapsible icon="📄" label="src/app/pages/home/home.ts"><app-code-block lang="typescript" [code]="starter_src_app_pages_home_home_tsCode" /></app-collapsible>

        <h4>src/app/pages/not-found</h4>
        <app-collapsible icon="📄" label="src/app/pages/not-found/not-found.ts"><app-code-block lang="typescript" [code]="starter_src_app_pages_not_found_not_found_tsCode" /></app-collapsible>

        <h4>src/app/pages/show-detail</h4>
        <app-collapsible icon="📄" label="src/app/pages/show-detail/show-detail.ts"><app-code-block lang="typescript" [code]="starter_src_app_pages_show_detail_show_detail_tsCode" /></app-collapsible>

        <h4>src/app/pages/stats</h4>
        <app-collapsible icon="📄" label="src/app/pages/stats/stats.ts"><app-code-block lang="typescript" [code]="starter_src_app_pages_stats_stats_tsCode" /></app-collapsible>

        <h4>src/app/pages/watchlist</h4>
        <app-collapsible icon="📄" label="src/app/pages/watchlist/watchlist.ts"><app-code-block lang="typescript" [code]="starter_src_app_pages_watchlist_watchlist_tsCode" /></app-collapsible>

        <h4>src/app/panel</h4>
        <app-collapsible icon="📄" label="src/app/panel/panel.css"><app-code-block lang="css" [code]="starter_src_app_panel_panel_cssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/panel/panel.html"><app-code-block lang="html" [code]="starter_src_app_panel_panel_htmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/panel/panel.ts"><app-code-block lang="typescript" [code]="starter_src_app_panel_panel_tsCode" /></app-collapsible>

        <h4>src/app/rating-stars</h4>
        <app-collapsible icon="📄" label="src/app/rating-stars/rating-stars.ts"><app-code-block lang="typescript" [code]="starter_src_app_rating_stars_rating_stars_tsCode" /></app-collapsible>

        <h4>src/app/review-form</h4>
        <app-collapsible icon="📄" label="src/app/review-form/review-form.html"><app-code-block lang="html" [code]="starter_src_app_review_form_review_form_htmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/review-form/review-form.ts"><app-code-block lang="typescript" [code]="starter_src_app_review_form_review_form_tsCode" /></app-collapsible>

        <h4>src/app/services</h4>
        <app-collapsible icon="📄" label="src/app/services/recently-viewed.ts"><app-code-block lang="typescript" [code]="starter_src_app_services_recently_viewed_tsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/services/reviews.ts"><app-code-block lang="typescript" [code]="starter_src_app_services_reviews_tsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/services/shows.ts"><app-code-block lang="typescript" [code]="starter_src_app_services_shows_tsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/services/watchlist.ts"><app-code-block lang="typescript" [code]="starter_src_app_services_watchlist_tsCode" /></app-collapsible>

        <h4>src/app/show-card</h4>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.css"><app-code-block lang="css" [code]="starter_src_app_show_card_show_card_cssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.html"><app-code-block lang="html" [code]="starter_src_app_show_card_show_card_htmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.ts"><app-code-block lang="typescript" [code]="starter_src_app_show_card_show_card_tsCode" /></app-collapsible>

        <h4>src/app/validators</h4>
        <app-collapsible icon="📄" label="src/app/validators/review-validators.ts"><app-code-block lang="typescript" [code]="starter_src_app_validators_review_validators_tsCode" /></app-collapsible>

        <h4>src/app/watchlist-panel</h4>
        <app-collapsible icon="📄" label="src/app/watchlist-panel/watchlist-panel.ts"><app-code-block lang="typescript" [code]="starter_src_app_watchlist_panel_watchlist_panel_tsCode" /></app-collapsible>

        <h4>src</h4>
        <app-collapsible icon="📄" label="src/index.html"><app-code-block lang="html" [code]="starter_src_index_htmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/main.ts"><app-code-block lang="typescript" [code]="starter_src_main_tsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/styles.css"><app-code-block lang="css" [code]="starter_src_styles_cssCode" /></app-collapsible>
      </section>

      <section class="lesson-framework">
        <h3>What this code already does</h3>
        <ul>
          <li><strong>Days 2–4:</strong> a signal-based show catalog with control flow, filtering, sorting, and two-way binding.</li>
          <li><strong>Day 5:</strong> reusable components connected with <code>input()</code>, <code>output()</code>, and <code>model()</code>.</li>
          <li><strong>Day 6:</strong> content projection, reusable panels, and component-scoped styling.</li>
          <li><strong>Day 7:</strong> singleton services and a persistent watchlist.</li>
          <li><strong>Day 8:</strong> a routed application shell with page components and a fallback route.</li>
          <li><strong>Day 9:</strong> route parameters, navigation, a functional guard, and lazy-loaded pages.</li>
          <li><strong>Day 10:</strong> a reactive <code>ReviewForm</code>, a <code>Review</code> model, and a signal-based reviews service.</li>
          <li><strong>Day 11:</strong> built-in and custom validators, cross-field and array rules, timely accessible errors, and a failed-submit summary.</li>
        </ul>
      </section>

      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Open a show detail page and submit a complete review.</li>
          <li><span class="checkbox">✅</span> Interact with an empty review field and see a specific error only after interaction.</li>
          <li><span class="checkbox">✅</span> Add tags, then verify duplicate tags block submission.</li>
          <li><span class="checkbox">✅</span> Check "Contains spoilers" and verify a short review body needs more detail.</li>
          <li><span class="checkbox">✅</span> Attempt to submit an invalid review and see the error summary.</li>
        </ul>
      </section>

      <div class="warning-box">If a check fails, return to Day 11 before continuing with today's acts.</div>

      <div class="nav-footer">
        <a routerLink="/day11/lab" class="btn-secondary">← Day 11 Lab</a>
        <a routerLink="/day12/act1" class="btn-primary">Act 1: Template-Driven Forms →</a>
      </div>
    </div>
  `
})
export class Day12StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day12
npm install
npm start`;

  starter_angular_jsonCode = `{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "cli": {
    "packageManager": "npm",
    "analytics": false
  },
  "newProjectRoot": "projects",
  "projects": {
    "bingeboard": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": ["src/styles.css"]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "1MB",
                  "maximumError": "2MB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "bingeboard:build:production"
            },
            "development": {
              "buildTarget": "bingeboard:build:development"
            }
          },
          "defaultConfiguration": "development"
        }
      }
    }
  }
}
`;

  starter_package_jsonCode = `{
  "name": "bingeboard-day12-starter",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build"
  },
  "dependencies": {
    "@angular/common": "^21.2.0",
    "@angular/compiler": "^21.2.0",
    "@angular/core": "^21.2.0",
    "@angular/forms": "^21.2.0",
    "@angular/platform-browser": "^21.2.0",
    "@angular/router": "^21.2.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0"
  },
  "devDependencies": {
    "@angular/build": "^21.2.19",
    "@angular/cli": "^21.2.19",
    "@angular/compiler-cli": "^21.2.0",
    "typescript": "~5.9.2"
  }
}
`;

  starter_src_app_app_cssCode = `main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filters input,
.filters select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
}

.result-count {
  color: var(--muted);
  font-size: 14px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin: 16px 0 32px;
}

/* NOTE: there is deliberately no .card or .watchlist rule here.
   Those elements live inside ShowCard and WatchlistPanel, and view
   encapsulation means a rule written here can never reach them.
   Their styles live in show-card.css and in WatchlistPanel's own
   styles array. (This is Day 6 Act 3's second debug-it bug.) */

.badge {
  display: inline-block;
  background: var(--border);
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 12px;
  margin-right: 4px;
}

.badge.caution { background: #4a3524; color: #e0a76a; }
.badge.banger { background: #23402f; color: #6ed3a5; }

.empty-state {
  padding: 24px;
  border: 1px dashed var(--border);
  border-radius: 8px;
}

.tracker {
  border-top: 1px solid var(--border);
  padding-top: 16px;
}

.recent-show {
  margin: 4px;
  padding: 6px 10px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--surface);
  color: var(--text);
}
`;

  starter_src_app_app_htmlCode = `<app-header />

<main>
  <app-panel title="My watchlist">
    <app-watchlist-panel [shows]="watchlist()" (remove)="removeShow($event)">
      <!-- written in App's template, so it binds to App's data -->
      <p empty-state>
        Nothing yet - go browse all {{ shows().length }} shows!
      </p>
    </app-watchlist-panel>
  </app-panel>

  <app-panel title="Browse shows">
    <button panel-actions (click)="clearFilters()">Clear filters</button>

    <section class="filters">
      <input placeholder="Filter shows…" [(ngModel)]="searchTerm" />

      <select [(ngModel)]="selectedGenre">
        @for (genre of genres(); track genre) {
          <option [value]="genre">{{ genre }}</option>
        }
      </select>

      <select [(ngModel)]="sortBy">
        <option value="name">Sort by name</option>
        <option value="rating">Sort by rating</option>
      </select>
    </section>

    <p class="result-count">
      Showing {{ filteredShows().length }} of {{ shows().length }} shows
    </p>

    @if (shows().length > 3) {
      <p>{{ shows().length }} shows — you're building quite a list.</p>
    } @else {
      <p>Just getting started.</p>
    }

    <div class="card-grid">
      @for (show of filteredShows(); track show.id) {
        <app-show-card
          [show]="show"
          [alreadyAdded]="watchlistIds().has(show.id)"
          [myRating]="ratings()[show.id] ?? 0"
          (myRatingChange)="setRating(show.id, $event)"
          (addToWatchlist)="addShow($event)"
          (viewed)="recordView($event)"
        />
      } @empty {
        <div class="empty-state">
          <p>No shows match those filters.</p>
          <button (click)="clearFilters()">Clear filters</button>
        </div>
      }
    </div>
  </app-panel>

  <app-panel title="Recently viewed">
    @for (show of recentlyViewed(); track show.id) {
      <button class="recent-show" (click)="recordView(show)">{{ show.name }}</button>
    } @empty {
      <p class="muted">Click a show's poster to start your history.</p>
    }
  </app-panel>
</main>
`;

  starter_src_app_app_routes_tsCode = `import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Browse } from './pages/browse/browse';
import { hasWatchlistGuard } from './guards/has-watchlist';

export const routes: Routes = [
  { path: '', component: Home, title: 'BingeBoard' },
  { path: 'browse', component: Browse, title: 'Browse · BingeBoard' },
  {
    path: 'show/:id',
    loadComponent: () => import('./pages/show-detail/show-detail').then(m => m.ShowDetail),
    title: 'Show · BingeBoard'
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./pages/watchlist/watchlist').then(m => m.Watchlist),
    title: 'My Watchlist · BingeBoard'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About · BingeBoard'
  },
  {
    path: 'stats',
    canActivate: [hasWatchlistGuard],
    loadComponent: () => import('./pages/stats/stats').then(m => m.Stats),
    title: 'Stats · BingeBoard'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: 'Lost? · BingeBoard'
  }
];
`;

  starter_src_app_app_tsCode = `import { Component } from '@angular/core';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: \`<app-header /><main><router-outlet /></main><footer>Made for your next great binge.</footer>\`
})
export class App {}
`;

  starter_src_app_guards_has_watchlist_tsCode = `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist';

export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);
  return watchlist.count() > 0 ? true : router.createUrlTree(['/browse']);
};
`;

  starter_src_app_header_header_cssCode = `.app-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  font-weight: 700;
  letter-spacing: 0.2px;
}

.watchlist-badge {
  color: var(--muted);
  font-size: 14px;
}

nav { display: flex; align-items: center; gap: 16px; }
nav a { color: var(--text); text-decoration: none; }
nav a.active { color: var(--accent); font-weight: 700; }
`;

  starter_src_app_header_header_htmlCode = `<header class="app-nav">
  <span class="brand">📺 BingeBoard</span>
  <nav>
    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
    <a routerLink="/browse" routerLinkActive="active">Browse</a>
    <a routerLink="/watchlist" routerLinkActive="active">My Watchlist ({{ count() }})</a>
    <a routerLink="/about" routerLinkActive="active">About</a>
    <button (click)="surprise()">🎲 Surprise me</button>
  </nav>
</header>
`;

  starter_src_app_header_header_tsCode = `import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistService } from '../services/watchlist';
import { ShowsService } from '../services/shows';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  count = inject(WatchlistService).count;
  private router = inject(Router);
  private shows = inject(ShowsService);
  surprise() {
    const all = this.shows.all();
    const pick = all[Math.floor(Math.random() * all.length)];
    this.router.navigate(['/show', pick.id]);
  }
}
`;

  starter_src_app_models_review_tsCode = `export interface Review {
  showId: number;
  rating: number;
  headline: string;
  body: string;
  spoilers: boolean;
  createdAt: Date;
}
`;

  starter_src_app_models_show_tsCode = `export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
}
`;

  starter_src_app_pages_about_about_tsCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: \`<h1>About BingeBoard</h1><p>A small Angular app for learning how real features fit together.</p>\`
})
export class About {}
`;

  starter_src_app_pages_browse_browse_cssCode = `.filters { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.filters input, .filters select { padding: 8px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); }
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
`;

  starter_src_app_pages_browse_browse_htmlCode = `<app-panel title="Browse shows">
  <section class="filters">
    <input placeholder="Filter shows..." [(ngModel)]="searchTerm" />
    <select [(ngModel)]="selectedGenre">@for (genre of genres(); track genre) { <option [value]="genre">{{ genre }}</option> }</select>
    <select [(ngModel)]="sortBy"><option value="name">Sort by name</option><option value="rating">Sort by rating</option></select>
  </section>
  <p>Showing {{ filteredShows().length }} of {{ shows().length }} shows</p>
  <div class="card-grid">
    @for (show of filteredShows(); track show.id) {
      <app-show-card [show]="show" [alreadyAdded]="watchlistIds().has(show.id)" [myRating]="ratings()[show.id] ?? 0" (myRatingChange)="setRating(show.id, $event)" (addToWatchlist)="addShow($event)" (viewed)="recordView($event)" />
    } @empty { <p>No shows match those filters. <button (click)="clearFilters()">Clear filters</button></p> }
  </div>
</app-panel>
`;

  starter_src_app_pages_browse_browse_tsCode = `import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowCard } from '../../show-card/show-card';
import { Panel } from '../../panel/panel';
import { ShowsService } from '../../services/shows';
import { WatchlistService } from '../../services/watchlist';
import { RecentlyViewedService } from '../../services/recently-viewed';
import { Show } from '../../models/show';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [FormsModule, ShowCard, Panel],
  templateUrl: './browse.html',
  styleUrl: './browse.css'
})
export class Browse {
  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);
  private recentlySvc = inject(RecentlyViewedService);
  shows = this.showsSvc.all;
  searchTerm = signal('');
  selectedGenre = signal('All');
  sortBy = signal<'name' | 'rating'>('name');
  ratings = signal<Record<number, number | undefined>>({});
  genres = computed(() => ['All', ...new Set(this.shows().map(show => show.genre))]);
  filteredShows = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const genre = this.selectedGenre();
    return this.shows().filter(show => show.name.toLowerCase().includes(term)).filter(show => genre === 'All' || show.genre === genre).sort((a, b) => this.sortBy() === 'name' ? a.name.localeCompare(b.name) : b.rating - a.rating);
  });
  watchlist = this.watchlistSvc.watchlist;
  watchlistIds = computed(() => new Set(this.watchlist().map(show => show.id)));
  recentlyViewed = this.recentlySvc.recent;
  addShow(show: Show) { this.watchlistSvc.add(show); }
  removeShow(show: Show) { this.watchlistSvc.remove(show.id); }
  setRating(id: number, value: number) { this.ratings.update(map => ({ ...map, [id]: value })); }
  clearFilters() { this.searchTerm.set(''); this.selectedGenre.set('All'); }
  recordView(show: Show) { this.recentlySvc.record(show); }
}
`;

  starter_src_app_pages_home_home_tsCode = `import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: \`<h1>Welcome to BingeBoard</h1><p>Find your next great show and keep your queue in one place.</p><p>You're tracking {{ count() }} shows.</p><a routerLink="/browse">Browse shows</a> <a routerLink="/watchlist">Open watchlist</a>\`
})
export class Home {
  count = inject(WatchlistService).count;
}
`;

  starter_src_app_pages_not_found_not_found_tsCode = `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: \`<h1>Lost?</h1><p>This page was cancelled after one season.</p><a routerLink="/">Take me home</a>\`
})
export class NotFound {}
`;

  starter_src_app_pages_show_detail_show_detail_tsCode = `import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowsService } from '../../services/shows';
import { WatchlistService } from '../../services/watchlist';
import { ReviewsService } from '../../services/reviews';
import { ReviewForm } from '../../review-form/review-form';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink, ReviewForm],
  template: \`
    @if (show(); as selected) {
      <img [src]="selected.imageUrl" [alt]="selected.name" width="240" />
      <h1>{{ selected.name }}</h1>
      <p>{{ selected.genre }} · ⭐ {{ selected.rating }}</p>
      <button [disabled]="onList()" (click)="add()">{{ onList() ? 'On your watchlist' : '+ Add to watchlist' }}</button>

      @if (prevShowId() !== null && nextShowId() !== null) {
        <nav class="detail-nav">
          <a [routerLink]="['/show', prevShowId()]">← Previous show</a>
          <a [routerLink]="['/show', nextShowId()]">Next show →</a>
        </nav>
      }

      <app-review-form [showId]="selected.id" />

      <h2>Reviews</h2>
      @if (reviews().length === 0) {
        <p class="empty-state">No reviews yet — be the first!</p>
      } @else {
        @for (review of reviews(); track review.createdAt; let i = $index) {
          <article class="review-card">
            <p>⭐ {{ review.rating }}/10 — <strong>{{ review.headline }}</strong></p>
            @if (review.spoilers && !isRevealed(i)) {
              <p><em>Contains spoilers.</em> <button type="button" (click)="reveal(i)">Reveal review</button></p>
            } @else {
              <p>{{ review.body }}</p>
            }
          </article>
        }
      }
    } @else {
      <h1>Show not found</h1>
      <p>That show is not in the catalog.</p>
      <a routerLink="/browse">Back to Browse</a>
    }
  \`
})
export class ShowDetail {
  id = input.required<string>();
  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);
  private reviewsSvc = inject(ReviewsService);
  show = computed(() => this.showsSvc.byId(Number(this.id())));
  reviews = computed(() => this.reviewsSvc.forShow(Number(this.id()))());
  onList = computed(() => {
    const selected = this.show();
    return selected ? this.watchlistSvc.has(selected.id) : false;
  });

  revealed = signal(new Set<number>());

  isRevealed(index: number) {
    return this.revealed().has(index);
  }

  reveal(index: number) {
    this.revealed.update(current => new Set(current).add(index));
  }

  currentIndex = computed(() =>
    this.showsSvc.all().findIndex(s => s.id === this.show()?.id)
  );

  prevShowId = computed(() => {
    const shows = this.showsSvc.all();
    const index = this.currentIndex();
    if (index === -1 || shows.length === 0) return null;
    return shows[(index - 1 + shows.length) % shows.length].id;
  });

  nextShowId = computed(() => {
    const shows = this.showsSvc.all();
    const index = this.currentIndex();
    if (index === -1 || shows.length === 0) return null;
    return shows[(index + 1) % shows.length].id;
  });

  add() {
    const selected = this.show();
    if (selected) this.watchlistSvc.add(selected);
  }
}
`;

  starter_src_app_pages_stats_stats_tsCode = `import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  template: \`<h1>Your stats</h1><p>You are tracking {{ count() }} shows.</p>\`
})
export class Stats {
  count = inject(WatchlistService).count;
}
`;

  starter_src_app_pages_watchlist_watchlist_tsCode = `import { Component, inject } from '@angular/core';
import { WatchlistPanel } from '../../watchlist-panel/watchlist-panel';
import { WatchlistService } from '../../services/watchlist';
import { Show } from '../../models/show';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [WatchlistPanel],
  template: \`<h1>My Watchlist</h1><app-watchlist-panel [shows]="shows()" (remove)="remove($event)"><p empty-state>Nothing saved yet. Go browse some shows!</p></app-watchlist-panel>\`
})
export class Watchlist {
  private service = inject(WatchlistService);
  shows = this.service.watchlist;
  remove(show: Show) { this.service.remove(show.id); }
}
`;

  starter_src_app_panel_panel_cssCode = `:host {
  display: block;
  margin-block: 1.5rem;
}

:host(.danger) .panel-header {
  background: #4a1f1f;
  color: #ff9d9d;
}

.panel {
  border: 1px solid var(--border, #2a2d35);
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface, #1c1f26);
}

.panel-header h2 { font-size: 16px; margin: 0; }

.header-actions { display: flex; align-items: center; gap: 8px; }

.toggle {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  transition: transform 150ms ease;
}

/* @if removes the body from the DOM entirely, so there is nothing to
   animate there - rotate the chevron instead */
.toggle.collapsed {
  transform: rotate(-90deg);
}

.panel-body { padding: 16px; }

@media (prefers-reduced-motion: reduce) {
  .toggle { transition: none; }
}
`;

  starter_src_app_panel_panel_htmlCode = `<section class="panel">
  <header class="panel-header">
    <h2>{{ title() }}</h2>

    <span class="header-actions">
      <ng-content select="[panel-actions]" />
      <button
        type="button"
        class="toggle"
        [class.collapsed]="!expanded()"
        (click)="toggle()"
        [attr.aria-expanded]="expanded()"
        [attr.aria-label]="expanded() ? 'Collapse panel' : 'Expand panel'"
      >▾</button>
    </span>
  </header>

  @if (expanded()) {
    <div class="panel-body">
      <ng-content />
    </div>
  }
</section>
`;

  starter_src_app_panel_panel_tsCode = `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {
  title = input.required<string>();

  // the panel's own business - no input, no output
  expanded = signal(true);

  toggle() {
    this.expanded.update(open => !open);
  }
}
`;

  starter_src_app_rating_stars_rating_stars_tsCode = `import { Component, model } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  template: \`
    <span class="stars">
      @for (star of [1, 2, 3, 4, 5]; track star) {
        <button
          type="button"
          class="star"
          [class.filled]="star <= rating()"
          (click)="rating.set(star)"
        >★</button>
      }
    </span>
  \`,
  styles: [\`
    .star {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      color: #555;
      padding: 0 2px;
    }
    .star.filled { color: #f5c518; }
  \`]
})
export class RatingStars {
  rating = model(0);
}
`;

  starter_src_app_review_form_review_form_htmlCode = `<form [formGroup]="reviewForm" (ngSubmit)="submit()">
  @if (submitAttempted() && errorSummary.length > 0) {
    <div class="error-box" role="alert" aria-live="polite">
      <p>Please fix these fields before posting:</p>
      <ul>
        @for (field of errorSummary; track field) {
          <li>{{ field }} needs attention.</li>
        }
      </ul>
    </div>
  }

  <label>
    Rating (0-10)
    <input type="number" formControlName="rating" min="0" max="10" [attr.aria-invalid]="showError(reviewForm.controls.rating)" />
  </label>
  @if (showError(reviewForm.controls.rating)) {
    <p class="field-error">Rating must be between 0 and 10.</p>
  }

  <label>
    Headline
    <input type="text" formControlName="headline" maxlength="80" placeholder="Sum it up in one line" [attr.aria-invalid]="showError(reviewForm.controls.headline)" />
  </label>
  <p class="char-count" [class.over-limit]="reviewForm.controls.headline.value.length > 80">
    {{ reviewForm.controls.headline.value.length }}/80 characters
  </p>
  @if (showError(reviewForm.controls.headline)) {
    <p class="field-error">
      @if (reviewForm.controls.headline.hasError('required')) { A headline is required. }
      @if (reviewForm.controls.headline.hasError('maxlength')) { Keep the headline under 80 characters. }
      @if (reviewForm.controls.headline.hasError('noShouting')) { Try not to shout in the headline. }
    </p>
  }

  <label>
    Full review
    <textarea formControlName="body" rows="4" placeholder="What did you think?" [attr.aria-invalid]="showError(reviewForm.controls.body)"></textarea>
  </label>
  @if (showError(reviewForm.controls.body)) {
    <p class="field-error">Write at least 20 characters.</p>
  }

  <label class="checkbox-row">
    <input type="checkbox" formControlName="spoilers" />
    Contains spoilers
  </label>
  @if (showError(reviewForm) && reviewForm.hasError('spoilersNeedDetail')) {
    <p class="field-error">Spoiler reviews need at least 50 characters.</p>
  }

  <div formArrayName="tags">
    <p>Tags</p>
    @for (tag of tags.controls; track $index; let i = $index) {
      <label>
        Tag {{ i + 1 }}
        <input type="text" [formControlName]="i" maxlength="20" />
        <button type="button" (click)="removeTag(i)">Remove tag</button>
      </label>
      @if (showError(tag)) {
        <p class="field-error">Tags need 2 to 20 characters.</p>
      }
    }
  </div>
  <button type="button" (click)="addTag()" [disabled]="tags.length >= 5">+ Add tag</button>
  @if (showError(tags) && tags.hasError('duplicateTags')) {
    <p class="field-error">Each tag must be unique.</p>
  }

  <div class="quick-fill-row">
    <button type="button" (click)="quickFillTen()">10/10, loved it</button>
    <button type="button" (click)="recommendPreset()">👍 Recommend</button>
  </div>

  <button type="submit" [disabled]="reviewForm.invalid">Post review</button>
</form>
`;

  starter_src_app_review_form_review_form_tsCode = `import { Component, inject, input, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReviewsService } from '../services/reviews';
import { noShouting, spoilersNeedDetail, tagsValidator } from '../validators/review-validators';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.html'
})
export class ReviewForm {
  showId = input.required<number>();

  private fb = inject(FormBuilder);
  private reviewsSvc = inject(ReviewsService);
  submitAttempted = signal(false);

  reviewForm = this.fb.nonNullable.group(
    {
      rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
      headline: ['', [Validators.required, Validators.maxLength(80), noShouting()]],
      body: ['', [Validators.required, Validators.minLength(20)]],
      spoilers: false,
      tags: this.fb.array<FormControl<string>>([], { validators: tagsValidator() })
    },
    { validators: spoilersNeedDetail() }
  );

  get tags() {
    return this.reviewForm.controls.tags;
  }

  showError(control: AbstractControl) {
    return control.invalid && (control.touched || control.dirty || this.submitAttempted());
  }

  get errorSummary(): string[] {
    const messages: string[] = [];
    if (this.reviewForm.controls.rating.invalid) messages.push('Rating');
    if (this.reviewForm.controls.headline.invalid) messages.push('Headline');
    if (this.reviewForm.controls.body.invalid) messages.push('Full review');
    if (this.reviewForm.controls.tags.invalid) messages.push('Tags');
    if (this.reviewForm.hasError('spoilersNeedDetail')) messages.push('Spoiler detail');
    return messages;
  }

  submit() {
    this.submitAttempted.set(true);
    this.reviewForm.markAllAsTouched();
    if (this.reviewForm.invalid) return;

    const raw = this.reviewForm.getRawValue();

    this.reviewsSvc.add({
      showId: this.showId(),
      rating: raw.rating,
      headline: raw.headline,
      body: raw.body,
      spoilers: raw.spoilers,
      createdAt: new Date()
    });

    this.reviewForm.reset();
    this.submitAttempted.set(false);
  }

  quickFillTen() {
    this.reviewForm.patchValue({ rating: 10 });
  }

  recommendPreset() {
    this.reviewForm.patchValue({
      rating: 9,
      headline: 'Highly recommend'
    });
  }

  addTag() {
    if (this.tags.length < 5) {
      this.tags.push(this.fb.nonNullable.control('', [
        Validators.minLength(2),
        Validators.maxLength(20)
      ]));
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }
}
`;

  starter_src_app_services_recently_viewed_tsCode = `import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class RecentlyViewedService {
  private items = signal<Show[]>([]);
  readonly recent = this.items.asReadonly();

  record(show: Show) {
    this.items.update(list => [
      show,
      ...list.filter(item => item.id !== show.id)
    ].slice(0, 5));
  }
}
`;

  starter_src_app_services_reviews_tsCode = `import { Injectable, signal, computed } from '@angular/core';
import { Review } from '../models/review';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private reviews = signal<Review[]>([]);

  readonly all = this.reviews.asReadonly();

  forShow(showId: number) {
    return computed(() => this.reviews().filter(r => r.showId === showId));
  }

  add(review: Review) {
    this.reviews.update(current => [...current, review]);
  }
}
`;

  starter_src_app_services_shows_tsCode = `import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private shows = signal<Show[]>([
    { id: 1, name: 'Severance', genre: 'Drama', rating: 8.7, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371406.jpg' },
    { id: 2, name: 'The Bear', genre: 'Drama', rating: 8.6, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/629/1574642.jpg' },
    { id: 3, name: 'Bluey', genre: 'Kids', rating: 9.5, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/512/1281879.jpg' },
    { id: 4, name: 'Slow Horses', genre: 'Thriller', rating: 8.2, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/637/1593462.jpg' },
    { id: 5, name: 'The Last of Us', genre: 'Thriller', rating: 8.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/563/1409008.jpg' },
    { id: 6, name: 'Shogun', genre: 'Drama', rating: 9.1, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/506/1265637.jpg' },
    { id: 7, name: 'Ted Lasso', genre: 'Comedy', rating: 8.4, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/634/1585930.jpg' },
    { id: 8, name: 'Emily in Paris', genre: 'Comedy', rating: 6.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/604/1510920.jpg' }
  ]);

  readonly all = this.shows.asReadonly();

  byId(id: number) {
    return this.all().find(show => show.id === id);
  }
}
`;

  starter_src_app_services_watchlist_tsCode = `import { Injectable, computed, effect, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly storageKey = 'bingeboard-watchlist';
  private items = signal<Show[]>(this.load());

  readonly watchlist = this.items.asReadonly();
  readonly count = computed(() => this.items().length);

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    });
  }

  add(show: Show) {
    this.items.update(list =>
      list.some(item => item.id === show.id) ? list : [...list, show]
    );
  }

  remove(id: number) {
    this.items.update(list => list.filter(show => show.id !== id));
  }

  has(id: number) {
    return this.items().some(show => show.id === id);
  }

  private load(): Show[] {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return [];

    try {
      return JSON.parse(saved) as Show[];
    } catch (error) {
      console.warn('Ignoring invalid saved watchlist', error);
      return [];
    }
  }
}
`;

  starter_src_app_show_card_show_card_cssCode = `.card {
  border: 1px solid var(--border, #2a2d35);
  border-radius: 10px;
  padding: 1rem;
  background: var(--surface, #1c1f26);
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
  .card:hover { transform: none; }
}

.card.watched {
  opacity: 0.55;
}

.card.watched h3::after {
  content: ' ✓';
  color: green;
}

.card.hot {
  border-color: #f44747;
  box-shadow: 0 0 12px rgba(244, 71, 71, 0.6);
}

.card.over-budget {
  border-color: #f44747;
  box-shadow: 0 0 0 2px rgba(244, 71, 71, 0.3);
}

.over-budget-text {
  color: #f44747;
}
`;

  starter_src_app_show_card_show_card_htmlCode = `<article class="card"
         [class.watched]="watched()"
         [class.hot]="hype >= 5"
         [class.over-budget]="isOverBudget()"
         [class.compact]="compact()">

  @if (!compact()) {
    <a [routerLink]="['/show', show().id]" (click)="viewed.emit(show())">
      <img [src]="show().imageUrl" [alt]="show().name" width="140" />
    </a>
  }

  <h3>{{ show().name }}</h3>
  <p>{{ show().genre }} · ⭐ {{ show().rating }}</p>

  @switch (show().genre) {
    @case ('Kids') { <span class="badge">👨‍👩‍👧 Family</span> }
    @case ('Thriller') { <span class="badge">🔪 Edge of seat</span> }
    @default { <span class="badge">📺 {{ show().genre }}</span> }
  }

  @if (show().rating < 7) {
    <span class="badge caution">⚠️ Proceed with caution</span>
  } @else if (show().rating >= 9) {
    <span class="badge banger">🏆 Certified banger</span>
  }

  @if (!compact()) {
    <p>Your rating:</p>
    <app-rating-stars [(rating)]="myRating" />

    <button (click)="add()" [disabled]="alreadyAdded()">
      @if (alreadyAdded()) {
        On your watchlist
      } @else {
        + Add to watchlist
      }
    </button>

    <button (click)="toggleWatched()">
      {{ watched() ? 'Watched ✓' : 'Mark as watched' }}
    </button>

    <p>Episodes: {{ episodesWatched() }} · {{ hours() }} hrs</p>
    <button (click)="watchEpisode()">+1 episode</button>

    <p>Binge level: {{ bingeLevel() }}</p>
    <p [class.over-budget-text]="isOverBudget()">{{ minutesRemaining() }} minutes left this week</p>

    <p>S{{ season() }} · next up: E{{ nextEpisode() }}</p>
    <button (click)="nextEpisode.update(e => e + 1)">skip</button>
    <button (click)="season.update(s => s + 1)">next season →</button>

    <button (dblclick)="hype = hype + 1">🔥 {{ hype }}</button>
    <button (click)="hype = 0" [disabled]="hype === 0">Reset hype</button>
  }
</article>
`;

  starter_src_app_show_card_show_card_tsCode = `import { Component, signal, computed, effect, linkedSignal, input, output, model } from '@angular/core';
import { Show } from '../models/show';
import { RatingStars } from '../rating-stars/rating-stars';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RatingStars, RouterLink],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  show = input.required<Show>();
  compact = input(false);
  alreadyAdded = input(false);

  addToWatchlist = output<Show>();
  viewed = output<Show>();
  myRating = model(0);

  episodeMinutes = 50;

  watched = signal(false);

  // keyed per show, so eight cards don't fight over one localStorage entry
  episodesWatched = linkedSignal(() =>
    Number(localStorage.getItem(\`episodes-\${this.show().id}\`) ?? 0)
  );

  minutesWatched = computed(() => this.episodesWatched() * this.episodeMinutes);
  hours = computed(() => (this.minutesWatched() / 60).toFixed(1));

  bingeLevel = computed(() => {
    const n = this.episodesWatched();
    if (n === 0) return 'Not started';
    if (n < 5) return 'Casual';
    if (n < 10) return 'Invested';
    return 'Send help';
  });

  weeklyBudgetMinutes = signal(300);
  minutesRemaining = computed(() => this.weeklyBudgetMinutes() - this.minutesWatched());
  isOverBudget = computed(() => this.minutesRemaining() < 0);

  season = signal(1);
  nextEpisode = linkedSignal(() => {
    this.season();
    return 1;
  });

  hype = 0;

  constructor() {
    effect(() => {
      localStorage.setItem(\`episodes-\${this.show().id}\`, String(this.episodesWatched()));
    });
  }

  add() {
    this.addToWatchlist.emit(this.show());
  }

  watchEpisode() {
    this.episodesWatched.update(n => n + 1);
  }

  toggleWatched() {
    this.watched.update(w => !w);
  }
}
`;

  starter_src_app_validators_review_validators_tsCode = `import { AbstractControl, FormArray, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noShouting(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    const letters = value.replace(/[^a-zA-Z]/g, '');
    return letters.length >= 3 && value === value.toUpperCase()
      ? { noShouting: true }
      : null;
  };
}

export function spoilersNeedDetail(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const spoilers = group.get('spoilers')?.value === true;
    const body = String(group.get('body')?.value ?? '');
    return spoilers && body.trim().length < 50
      ? { spoilersNeedDetail: true }
      : null;
  };
}

export function tagsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tags = (control as FormArray<FormControl<string>>).value
      .map(tag => tag.trim().toLowerCase())
      .filter(Boolean);

    if (tags.length > 5) return { maxTags: true };
    return new Set(tags).size !== tags.length ? { duplicateTags: true } : null;
  };
}
`;

  starter_src_app_watchlist_panel_watchlist_panel_tsCode = `import { Component, input, output } from '@angular/core';
import { Show } from '../models/show';

@Component({
  selector: 'app-watchlist-panel',
  standalone: true,
  imports: [],
  template: \`
    <section class="watchlist">
      <h2>Your watchlist ({{ shows().length }})</h2>
      @for (show of shows(); track show.id) {
        <p class="row">
          {{ show.name }}
          <button (click)="remove.emit(show)" aria-label="Remove">✕</button>
        </p>
      } @empty {
        <ng-content select="[empty-state]" />
      }
    </section>
  \`,
  styles: [\`
    .row { display: flex; justify-content: space-between; align-items: center; }
    .row button { background: none; border: none; color: #f44747; cursor: pointer; }
  \`]
})
export class WatchlistPanel {
  shows = input.required<Show[]>();
  remove = output<Show>();
}
`;

  starter_src_index_htmlCode = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>BingeBoard</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
</head>
<body>
  <app-root></app-root>
</body>
</html>
`;

  starter_src_main_tsCode = `import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, { providers: [provideRouter(routes, withComponentInputBinding())] }).catch(err => console.error(err));
`;

  starter_src_styles_cssCode = `/* BingeBoard - global styles.
   The app-wide look lives here; component-specific look lives in the
   component's own stylesheet (that is view encapsulation, Day 6 Act 3). */

:root {
  --bg: #14161b;
  --surface: #1c1f26;
  --border: #2a2d35;
  --text: #e6e6e6;
  --muted: #9aa0aa;
  --accent: #4fc3f7;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.5;
  background: var(--bg);
  color: var(--text);
}

h1, h2, h3 { line-height: 1.25; }

a {
  color: var(--accent);
}

button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

input,
button {
  font-family: inherit;
  font-size: 14px;
}

button {
  cursor: pointer;
}

.muted {
  color: var(--muted);
}

.error-box {
  background: #2a1a1a;
  border: 1px solid #5c1a1a;
  color: #f4a3a3;
  border-radius: 8px;
  padding: 12px 16px;
  margin: 12px 0;
}

.not-found-box {
  background: #2a2a1a;
  border: 1px solid #5c4a00;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
}
`;

  starter_tsconfig_app_jsonCode = `/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": ["src/**/*.ts"],
  "exclude": ["src/**/*.spec.ts"]
}
`;

  starter_tsconfig_jsonCode = `/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    }
  ]
}
`;
}
