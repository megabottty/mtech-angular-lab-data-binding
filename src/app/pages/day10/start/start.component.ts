import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day10-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 10 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The routed, lazy-loaded BingeBoard foundation for reactive forms — Day 9's catalog, guard, and prev/next navigation, ready for a Review form.</p>
      </div>

      <div class="info-box">
        <strong>Two ways to get there:</strong> clone and run the Day 10 starter, or compare the reference files below with your end-of-Day-9 project.
      </div>

      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li>Clone the teaching site's repository.</li>
          <li>Run <code>cd starters/bingeboard-day10 && npm install && npm start</code>.</li>
          <li>Open <code>http://localhost:4200</code>.</li>
        </ul>
        <app-code-block lang="bash" [code]="cloneCommand" />
        <p><a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day10" target="_blank" rel="noopener">Browse starter files on GitHub</a>.</p>
      </section>

      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>Day 9 should leave you with a routed BingeBoard: a catalog service, a <code>/show/:id</code> detail page with prev/next navigation, a functional watchlist guard on <code>/stats</code>, and every route except Home and Browse lazy-loaded. Every file below is the exact end-of-Day-9 state — copy it in before following the acts.</p>

        <h4>App shell &amp; bootstrap</h4>
        <app-collapsible icon="📄" label="src/main.ts"><app-code-block lang="typescript" file="src/main.ts" [code]="mainTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/index.html"><app-code-block lang="html" file="src/index.html" [code]="indexHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/styles.css"><app-code-block lang="css" file="src/styles.css" [code]="stylesCssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.ts"><app-code-block lang="typescript" file="src/app/app.ts" [code]="appTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.html"><app-code-block lang="html" file="src/app/app.html" [code]="appHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.css"><app-code-block lang="css" file="src/app/app.css" [code]="appCssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.routes.ts"><app-code-block lang="typescript" file="src/app/app.routes.ts" [code]="appRoutesCode" /></app-collapsible>

        <h4>Model &amp; guard</h4>
        <app-collapsible icon="📄" label="src/app/models/show.ts"><app-code-block lang="typescript" file="src/app/models/show.ts" [code]="showModelCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/guards/has-watchlist.ts"><app-code-block lang="typescript" file="src/app/guards/has-watchlist.ts" [code]="guardCode" /></app-collapsible>

        <h4>Header</h4>
        <app-collapsible icon="📄" label="src/app/header/header.ts"><app-code-block lang="typescript" file="src/app/header/header.ts" [code]="headerTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/header/header.html"><app-code-block lang="html" file="src/app/header/header.html" [code]="headerHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/header/header.css"><app-code-block lang="css" file="src/app/header/header.css" [code]="headerCssCode" /></app-collapsible>

        <h4>Panel (reusable collapsible + projection)</h4>
        <app-collapsible icon="📄" label="src/app/panel/panel.ts"><app-code-block lang="typescript" file="src/app/panel/panel.ts" [code]="panelTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/panel/panel.html"><app-code-block lang="html" file="src/app/panel/panel.html" [code]="panelHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/panel/panel.css"><app-code-block lang="css" file="src/app/panel/panel.css" [code]="panelCssCode" /></app-collapsible>

        <h4>Show card</h4>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.ts"><app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="showCardTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.html"><app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="showCardHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.css"><app-code-block lang="css" file="src/app/show-card/show-card.css" [code]="showCardCssCode" /></app-collapsible>

        <h4>Other reusable components</h4>
        <app-collapsible icon="📄" label="src/app/rating-stars/rating-stars.ts"><app-code-block lang="typescript" file="src/app/rating-stars/rating-stars.ts" [code]="ratingStarsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/watchlist-panel/watchlist-panel.ts"><app-code-block lang="typescript" file="src/app/watchlist-panel/watchlist-panel.ts" [code]="watchlistPanelCode" /></app-collapsible>

        <h4>Services</h4>
        <app-collapsible icon="📄" label="src/app/services/shows.ts"><app-code-block lang="typescript" file="src/app/services/shows.ts" [code]="showsServiceCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/services/watchlist.ts"><app-code-block lang="typescript" file="src/app/services/watchlist.ts" [code]="watchlistServiceCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/services/recently-viewed.ts"><app-code-block lang="typescript" file="src/app/services/recently-viewed.ts" [code]="recentlyViewedServiceCode" /></app-collapsible>

        <h4>Pages</h4>
        <app-collapsible icon="📄" label="src/app/pages/home/home.ts"><app-code-block lang="typescript" file="src/app/pages/home/home.ts" [code]="homePageCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/about/about.ts"><app-code-block lang="typescript" file="src/app/pages/about/about.ts" [code]="aboutPageCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/not-found/not-found.ts"><app-code-block lang="typescript" file="src/app/pages/not-found/not-found.ts" [code]="notFoundPageCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/stats/stats.ts"><app-code-block lang="typescript" file="src/app/pages/stats/stats.ts" [code]="statsPageCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/watchlist/watchlist.ts"><app-code-block lang="typescript" file="src/app/pages/watchlist/watchlist.ts" [code]="watchlistPageCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.ts"><app-code-block lang="typescript" file="src/app/pages/browse/browse.ts" [code]="browseTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.html"><app-code-block lang="html" file="src/app/pages/browse/browse.html" [code]="browseHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.css"><app-code-block lang="css" file="src/app/pages/browse/browse.css" [code]="browseCssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/show-detail/show-detail.ts"><app-code-block lang="typescript" file="src/app/pages/show-detail/show-detail.ts" [code]="showDetailPageCode" /></app-collapsible>
      </section>

      <section class="lesson-framework">
        <h3>What this code already does</h3>
        <ul>
          <li><strong>Days 2–4:</strong> signal-based show cards, eight real shows, control flow, live search, genre filtering, sorting, and two-way binding.</li>
          <li><strong>Day 5:</strong> reusable <code>ShowCard</code>, <code>RatingStars</code>, and <code>WatchlistPanel</code> components using <code>input()</code>, <code>output()</code>, and <code>model()</code>.</li>
          <li><strong>Day 6:</strong> reusable collapsible <code>Panel</code>, content projection, component-scoped styling.</li>
          <li><strong>Day 7:</strong> <code>WatchlistService</code> owns the watchlist as a singleton, persisted to localStorage.</li>
          <li><strong>Day 8:</strong> a routed header/outlet/footer shell with Home, Browse, Watchlist, About, and NotFound pages.</li>
          <li><strong>Day 9:</strong> a <code>ShowsService</code> catalog, a <code>/show/:id</code> detail page with prev/next navigation and an inline not-found state, a functional watchlist guard on <code>/stats</code>, and every route except Home and Browse lazy-loaded.</li>
        </ul>
      </section>

      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Home, Browse, Watchlist, About, and a garbage URL resolve.</li>
          <li><span class="checkbox">✅</span> Adding on Browse appears on Watchlist and survives refresh.</li>
          <li><span class="checkbox">✅</span> Browse cards link to a show detail page with working prev/next links.</li>
          <li><span class="checkbox">✅</span> Visiting Stats without a watchlist redirects to Browse.</li>
          <li><span class="checkbox">✅</span> Every route except Home and Browse arrives as a separate lazy chunk.</li>
        </ul>
      </section>

      <div class="warning-box">If a check fails, return to Day 9 before continuing with today's acts.</div>

      <div class="nav-footer">
        <a routerLink="/day9/lab" class="btn-secondary">← Day 9 Lab</a>
        <a routerLink="/day10/act1" class="btn-primary">Act 1: Template-Driven vs. Reactive Forms →</a>
      </div>
    </div>
  `
})
export class Day10StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day10
npm install
npm start`;
  mainTsCode = `import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, { providers: [provideRouter(routes, withComponentInputBinding())] }).catch(err => console.error(err));`;
  indexHtmlCode = `<!doctype html>
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
</html>`;
  stylesCssCode = `/* BingeBoard - global styles.
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
}`;
  appTsCode = `import { Component } from '@angular/core';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: \`<app-header /><main><router-outlet /></main><footer>Made for your next great binge.</footer>\`
})
export class App {}`;
  appHtmlCode = `<app-header />

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
</main>`;
  appCssCode = `main {
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
}`;
  appRoutesCode = `import { Routes } from '@angular/router';
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
];`;
  showModelCode = `export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
}`;
  guardCode = `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist';

export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);
  return watchlist.count() > 0 ? true : router.createUrlTree(['/browse']);
};`;
  headerTsCode = `import { Component, inject } from '@angular/core';
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
}`;
  headerHtmlCode = `<header class="app-nav">
  <span class="brand">📺 BingeBoard</span>
  <nav>
    <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
    <a routerLink="/browse" routerLinkActive="active">Browse</a>
    <a routerLink="/watchlist" routerLinkActive="active">My Watchlist ({{ count() }})</a>
    <a routerLink="/about" routerLinkActive="active">About</a>
    <button (click)="surprise()">🎲 Surprise me</button>
  </nav>
</header>`;
  headerCssCode = `.app-nav {
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
nav a.active { color: var(--accent); font-weight: 700; }`;
  panelTsCode = `import { Component, input, signal } from '@angular/core';

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
}`;
  panelHtmlCode = `<section class="panel">
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
</section>`;
  panelCssCode = `:host {
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
}`;
  showCardTsCode = `import { Component, signal, computed, effect, linkedSignal, input, output, model } from '@angular/core';
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
}`;
  showCardHtmlCode = `<article class="card"
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
</article>`;
  showCardCssCode = `.card {
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
}`;
  ratingStarsCode = `import { Component, model } from '@angular/core';

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
}`;
  watchlistPanelCode = `import { Component, input, output } from '@angular/core';
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
}`;
  showsServiceCode = `import { Injectable, signal } from '@angular/core';
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
}`;
  watchlistServiceCode = `import { Injectable, computed, effect, signal } from '@angular/core';
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
}`;
  recentlyViewedServiceCode = `import { Injectable, signal } from '@angular/core';
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
}`;
  homePageCode = `import { Component, inject } from '@angular/core';
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
}`;
  aboutPageCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  template: \`<h1>About BingeBoard</h1><p>A small Angular app for learning how real features fit together.</p>\`
})
export class About {}`;
  notFoundPageCode = `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: \`<h1>Lost?</h1><p>This page was cancelled after one season.</p><a routerLink="/">Take me home</a>\`
})
export class NotFound {}`;
  statsPageCode = `import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  template: \`<h1>Your stats</h1><p>You are tracking {{ count() }} shows.</p>\`
})
export class Stats {
  count = inject(WatchlistService).count;
}`;
  watchlistPageCode = `import { Component, inject } from '@angular/core';
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
}`;
  browseTsCode = `import { Component, computed, inject, signal } from '@angular/core';
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
}`;
  browseHtmlCode = `<app-panel title="Browse shows">
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
</app-panel>`;
  browseCssCode = `.filters { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.filters input, .filters select { padding: 8px 10px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg); color: var(--text); }
.card-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }`;
  showDetailPageCode = `import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowsService } from '../../services/shows';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink],
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
  show = computed(() => this.showsSvc.byId(Number(this.id())));
  onList = computed(() => {
    const selected = this.show();
    return selected ? this.watchlistSvc.has(selected.id) : false;
  });

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
}`;
}
