import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day8-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 8 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The exact end-of-Day-7 BingeBoard — a one-page app with a real watchlist service and persistence — ready to split into routes without retyping seven days of prior code.</p>
      </div>
      <div class="info-box"><strong>Two ways to get there:</strong> clone and run the real starter, or copy the reference files below into your own Day 7 project.</div>
      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li><strong>Clone the teaching site's repo</strong>, which includes this starter under <code>starters/bingeboard-day8/</code>.</li>
          <li><strong>Install and run it:</strong> <code>cd starters/bingeboard-day8 && npm install && npm start</code>.</li>
          <li><strong>Open</strong> <code>http://localhost:4200</code>.</li>
        </ul>
        <app-code-block lang="bash" [code]="cloneCommand" />
        <p style="margin-top: 8px;">Browse the files on GitHub: <a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day8" target="_blank" rel="noopener">starters/bingeboard-day8</a>.</p>
      </section>
      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>Already have Day 7 working? Confirm the checklist below. To compare file-by-file, expand the reference files.</p>
        <h4>App shell</h4>
        <app-collapsible icon="📄" label="src/app/app.ts"><app-code-block lang="typescript" file="src/app/app.ts" [code]="appTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.html"><app-code-block lang="html" file="src/app/app.html" [code]="appHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.css"><app-code-block lang="css" file="src/app/app.css" [code]="appCssCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/styles.css"><app-code-block lang="css" file="src/styles.css" [code]="stylesCssCode" /></app-collapsible>
        <h4>Services</h4>
        <app-collapsible icon="📄" label="src/app/services/watchlist.ts"><app-code-block lang="typescript" file="src/app/services/watchlist.ts" [code]="watchlistCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/services/recently-viewed.ts"><app-code-block lang="typescript" file="src/app/services/recently-viewed.ts" [code]="recentlyViewedCode" /></app-collapsible>
        <h4>Header</h4>
        <app-collapsible icon="📄" label="src/app/header/header.ts"><app-code-block lang="typescript" file="src/app/header/header.ts" [code]="headerTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/header/header.html"><app-code-block lang="html" file="src/app/header/header.html" [code]="headerHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/header/header.css"><app-code-block lang="css" file="src/app/header/header.css" [code]="headerCssCode" /></app-collapsible>
        <h4>Supporting components</h4>
        <app-collapsible icon="📄" label="src/app/models/show.ts"><app-code-block lang="typescript" file="src/app/models/show.ts" [code]="showCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.ts"><app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="showCardTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.html"><app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="showCardHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/watchlist-panel/watchlist-panel.ts"><app-code-block lang="typescript" file="src/app/watchlist-panel/watchlist-panel.ts" [code]="watchlistPanelCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/panel/panel.ts"><app-code-block lang="typescript" file="src/app/panel/panel.ts" [code]="panelTsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/panel/panel.html"><app-code-block lang="html" file="src/app/panel/panel.html" [code]="panelHtmlCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/panel/panel.css"><app-code-block lang="css" file="src/app/panel/panel.css" [code]="panelCssCode" /></app-collapsible>
      </section>
      <section class="lesson-framework">
        <h3>What this code already does</h3>
        <ul>
          <li><strong>Days 2–4:</strong> signal-based cards, eight real shows, control flow, search, genre filtering, sorting, and two-way binding.</li>
          <li><strong>Day 5:</strong> reusable <code>ShowCard</code>, <code>RatingStars</code>, and <code>WatchlistPanel</code> components.</li>
          <li><strong>Day 6:</strong> collapsible <code>Panel</code>, content projection, projected empty state, and component-scoped styling.</li>
          <li><strong>Day 7:</strong> <code>WatchlistService</code> owns state, <code>Header</code> shares its singleton count, and localStorage persists the list.</li>
        </ul>
      </section>
      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Eight cards render and the filters work.</li>
          <li><span class="checkbox">✅</span> Adding and removing shows updates the header badge.</li>
          <li><span class="checkbox">✅</span> The watchlist survives a refresh.</li>
          <li><span class="checkbox">✅</span> The app is still one page with no <code>&lt;router-outlet&gt;</code> yet — that is today's starting problem.</li>
        </ul>
      </section>
      <div class="warning-box">If any check fails, return to Day 7 before refactoring. Day 8 changes the app's structure, so start from a known-good state.</div>
      <div class="nav-footer"><a routerLink="/day7/lab" class="btn-secondary">← Day 7 Lab</a><a routerLink="/day8/act1" class="btn-primary">Act 1: The Router's Three Pieces →</a></div>
    </div>
  `
})
export class Day8StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day8
npm install
npm start`;

  appTsCode = `import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowCard } from './show-card/show-card';
import { WatchlistPanel } from './watchlist-panel/watchlist-panel';
import { Panel } from './panel/panel';
import { Show } from './models/show';
import { Header } from './header/header';
import { WatchlistService } from './services/watchlist';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ShowCard, WatchlistPanel, Panel, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  shows = signal<Show[]>([
    { id: 1, name: 'Severance',      genre: 'Drama',    rating: 8.7, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371406.jpg' },
    { id: 2, name: 'The Bear',       genre: 'Drama',    rating: 8.6, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/629/1574642.jpg' },
    { id: 3, name: 'Bluey',          genre: 'Kids',     rating: 9.5, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/512/1281879.jpg' },
    { id: 4, name: 'Slow Horses',    genre: 'Thriller', rating: 8.2, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/637/1593462.jpg' },
    { id: 5, name: 'The Last of Us', genre: 'Thriller', rating: 8.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/563/1409008.jpg' },
    { id: 6, name: 'Shogun',         genre: 'Drama',    rating: 9.1, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/506/1265637.jpg' },
    { id: 7, name: 'Ted Lasso',      genre: 'Comedy',   rating: 8.4, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/634/1585930.jpg' },
    { id: 8, name: 'Emily in Paris', genre: 'Comedy',   rating: 6.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/604/1510920.jpg' }
  ]);

  searchTerm = signal('');
  selectedGenre = signal('All');
  sortBy = signal<'name' | 'rating'>('name');

  genres = computed(() => ['All', ...new Set(this.shows().map(s => s.genre))]);

  filteredShows = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const genre = this.selectedGenre();

    return this.shows()
      .filter(s => s.name.toLowerCase().includes(term))
      .filter(s => genre === 'All' || s.genre === genre)
      .sort((a, b) =>
        this.sortBy() === 'name'
          ? a.name.localeCompare(b.name)
          : b.rating - a.rating
      );
  });

  private watchlistSvc = inject(WatchlistService);
  watchlist = this.watchlistSvc.watchlist;
  watchlistIds = computed(() => new Set(this.watchlist().map(s => s.id)));

  ratings = signal<Record<number, number | undefined>>({});

  addShow(show: Show) {
    this.watchlistSvc.add(show);
  }

  removeShow(show: Show) {
    this.watchlistSvc.remove(show.id);
  }

  setRating(id: number, value: number) {
    this.ratings.update(map => ({ ...map, [id]: value }));
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedGenre.set('All');
  }
}`;

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
        />
      } @empty {
        <div class="empty-state">
          <p>No shows match those filters.</p>
          <button (click)="clearFilters()">Clear filters</button>
        </div>
      }
    </div>
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
}`;

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

  watchlistCode = `import { Injectable, computed, effect, signal } from '@angular/core';
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
  recentlyViewedCode = `import { Injectable, signal } from '@angular/core';
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

  headerTsCode = `import { Component, inject } from '@angular/core';
import { WatchlistService } from '../services/watchlist';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  count = inject(WatchlistService).count;
}`;

  headerHtmlCode = `<header class="app-nav">
  <span class="brand">📺 BingeBoard</span>
  <span class="watchlist-badge">My Watchlist ({{ count() }})</span>
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
}`;

  showCode = `export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
}`;

  showCardTsCode = `import { Component, signal, computed, effect, linkedSignal, input, output, model } from '@angular/core';
import { Show } from '../models/show';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RatingStars],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  show = input.required<Show>();
  compact = input(false);
  alreadyAdded = input(false);

  addToWatchlist = output<Show>();
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
    <img [src]="show().imageUrl" [alt]="show().name" width="140" />
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
}
