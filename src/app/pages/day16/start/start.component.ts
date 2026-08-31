import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day16-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 16 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The exact end-of-Day-15 BingeBoard, ready to run — so you spend today's time on switchMap, not on retyping four days of prior code.</p>
      </div>

      <div class="info-box">
        <strong>Two ways to get there:</strong> clone and run a real project (fastest, and the only way that's actually type-checked), or copy each file below into your own project if you'd rather keep building on what you already have.
      </div>

      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li><strong>Clone the teaching site's repo</strong>, which includes this starter under <code>starters/bingeboard-day16/</code>.</li>
          <li><strong>Install and run it:</strong> <code>cd starters/bingeboard-day16 && npm install && npm start</code>.</li>
          <li><strong>Open</strong> the URL <code>ng serve</code> prints (usually <code>http://localhost:4200</code>).</li>
        </ul>
        <app-code-block lang="typescript" [code]="cloneCommand" />
        <p style="margin-top: 8px;">
          Prefer to browse the files first? View them directly on GitHub:
          <a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day16" target="_blank" rel="noopener">starters/bingeboard-day16</a>.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>
          Already have Day 15's BingeBoard building in your own project? You can skip Option A entirely —
          just use the checklist below to confirm your version matches. If you'd rather copy this exact
          reference implementation file-by-file instead, expand each file below.
        </p>

        <h4 style="margin-top: 20px;">App shell</h4>
        <app-collapsible icon="📄" label="src/app/app.ts">
          <app-code-block lang="typescript" [code]="appTsCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.config.ts">
          <app-code-block lang="typescript" [code]="appConfigCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.routes.ts">
          <app-code-block lang="typescript" [code]="appRoutesCode" />
        </app-collapsible>

        <h4 style="margin-top: 20px;">Models &amp; services</h4>
        <app-collapsible icon="📄" label="src/app/models/show.ts">
          <app-code-block lang="typescript" [code]="showModelCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/core/shows.service.ts">
          <app-code-block lang="typescript" [code]="showsServiceStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/core/watchlist.service.ts">
          <app-code-block lang="typescript" [code]="watchlistServiceCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/core/guards/watchlist.guard.ts">
          <app-code-block lang="typescript" [code]="watchlistGuardCode" />
        </app-collapsible>

        <h4 style="margin-top: 20px;">Shared</h4>
        <app-collapsible icon="📄" label="src/app/shared/show-card.ts">
          <app-code-block lang="typescript" [code]="showCardCode" />
        </app-collapsible>

        <h4 style="margin-top: 20px;">Pages</h4>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.ts">
          <app-code-block lang="typescript" [code]="browseStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/show-detail/show-detail.ts">
          <app-code-block lang="typescript" [code]="showDetailStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/stats/stats.ts">
          <app-code-block lang="typescript" [code]="statsStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/watchlist/watchlist.ts">
          <app-code-block lang="typescript" [code]="watchlistPageCode" />
        </app-collapsible>
      </section>

      <section class="lesson-framework">
        <h3>What this code already does</h3>
        <ul>
          <li><strong>Day 9:</strong> route params (<code>show/:id</code>), a <code>hasWatchlistGuard</code> protecting <code>/watchlist</code>, and lazy-loaded routes.</li>
          <li><strong>Day 13:</strong> real <code>HttpClient</code> calls against the TVMaze API, a typed + adapted <code>Show</code> model, and Browse's three-state (loading / results / empty-after-search) template.</li>
          <li><strong>Day 14:</strong> an <code>error</code> signal with a Retry button, a graceful <code>404</code> message on Show Detail, and two independent <code>httpResource()</code>s (show + episodes).</li>
          <li><strong>Day 15:</strong> a live ticker and a <code>topRated()</code> stream on Stats (both bridged with <code>toSignal</code>), and a <code>/</code> keyboard shortcut on Browse built with <code>fromEvent</code> + <code>takeUntilDestroyed()</code>.</li>
        </ul>
      </section>

      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Search "office" on Browse (Enter or click) and see real results.</li>
          <li><span class="checkbox">✅</span> Press <code>/</code> anywhere on Browse and confirm the search box gains focus.</li>
          <li><span class="checkbox">✅</span> Visit <code>/stats</code> and watch the ticker increment once per second.</li>
          <li><span class="checkbox">✅</span> Confirm the Top Rated list on <code>/stats</code> only shows shows rated ≥ 8.</li>
          <li><span class="checkbox">✅</span> Visit a show id of <code>999999999</code> and see "That show doesn't exist."</li>
        </ul>
      </section>

      <div class="warning-box">
        If any of those checks fail, don't push forward into Day 16 yet — go back to the specific day/act that built it (Day 13 for live search, Day 14 for <code>httpResource</code>, Day 15 for the ticker/top-rated/keyboard shortcut) and get it working first. Everything today builds on top of this exact state.
      </div>

      <div class="nav-footer">
        <a routerLink="/day15/lab" class="btn-secondary">← Day 15 Lab</a>
        <a routerLink="/day16/act1" class="btn-primary">Act 1: The Race Condition →</a>
      </div>
    </div>
  `
})
export class Day16StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day16
npm install
npm start`;

  appTsCode = `import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  template: \`
    <header class="app-nav">
      <span class="brand">📺 BingeBoard</span>
      <nav>
        <a routerLink="/">Browse</a>
        <a routerLink="/stats">Stats</a>
        <a routerLink="/watchlist">Watchlist</a>
      </nav>
    </header>
    <main>
      <router-outlet />
    </main>
  \`,
  styles: [\`
    .app-nav {
      display: flex; align-items: center; gap: 24px;
      padding: 14px 24px; border-bottom: 1px solid #2a2d35;
    }
    .brand { font-weight: 700; }
    nav { display: flex; gap: 16px; }
    nav a { text-decoration: none; }
  \`]
})
export class App {}`;

  appConfigCode = `import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes, withComponentInputBinding())]
};`;

  appRoutesCode = `import { Routes } from '@angular/router';
import { hasWatchlistGuard } from './core/guards/watchlist.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/browse/browse').then(m => m.Browse),
    title: 'Browse · BingeBoard'
  },
  {
    path: 'show/:id',
    loadComponent: () => import('./pages/show-detail/show-detail').then(m => m.ShowDetail),
    title: 'Show · BingeBoard'
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats').then(m => m.Stats),
    title: 'Stats · BingeBoard'
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./pages/watchlist/watchlist').then(m => m.Watchlist),
    canActivate: [hasWatchlistGuard],
    title: 'Watchlist · BingeBoard'
  }
];`;

  showModelCode = `// BingeBoard's app-facing Show model, plus the minimal TVMaze API shapes we
// actually consume and the adapter that translates between them.
//
// This is the Day 13 Act 2 pattern: model only what you read, then convert
// once at the boundary so the rest of the app never touches TVMaze's naming.
// (Kept in one file here for a small starter project — in the lesson it's
// split across show.model.ts / tvmaze.model.ts / show.adapter.ts.)

export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
  summary: string;
  runtime: number;
}

export interface TvMazeShow {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string | null; // contains HTML!
  runtime: number | null;
}

export interface TvMazeSearchResult {
  score: number;
  show: TvMazeShow;
}

export interface TvMazeEpisode {
  id: number;
  season: number;
  number: number;
}

export function toShow(tv: TvMazeShow): Show {
  return {
    id: tv.id,
    name: tv.name,
    genre: tv.genres[0] ?? 'Unknown',
    rating: tv.rating.average ?? 0,
    imageUrl: tv.image?.medium ?? '',
    summary: tv.summary ?? '',
    runtime: tv.runtime ?? 0
  };
}`;

  showsServiceStartCode = `import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TvMazeEpisode, TvMazeSearchResult, TvMazeShow, toShow } from '../models/show';

// The end-of-Day-15 ShowsService: real HTTP, typed + adapted responses.
// search() and byId() are used by Browse/ShowDetail's HttpClient + subscribe()
// path; episodes() backs the Day 13 lab task and Day 14's second httpResource;
// topRated() backs the Day 15 lab's Stats page list (Task 2).
@Injectable({ providedIn: 'root' })
export class ShowsService {
  private http = inject(HttpClient);
  private readonly base = 'https://api.tvmaze.com';

  search(query: string) {
    return this.http
      .get<TvMazeSearchResult[]>(\`\${this.base}/search/shows\`, { params: { q: query } })
      .pipe(map(results => results.map(r => toShow(r.show))));
  }

  byId(id: number) {
    return this.http.get<TvMazeShow>(\`\${this.base}/shows/\${id}\`).pipe(map(toShow));
  }

  episodes(id: number) {
    return this.http.get<TvMazeEpisode[]>(\`\${this.base}/shows/\${id}/episodes\`);
  }

  topRated(query: string) {
    return this.search(query).pipe(
      map(shows =>
        shows
          .filter(show => show.rating >= 8)
          .map(show => ({ name: show.name, rating: show.rating }))
      )
    );
  }
}`;

  watchlistServiceCode = `import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'bingeboard.watchlist';

function loadInitial(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

// Day 9's watchlist, localStorage-backed. Watchlist just needs to know which
// show ids are saved — the Watchlist page re-fetches each show by id.
@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private ids = signal<number[]>(loadInitial());

  readonly all = this.ids.asReadonly();
  readonly count = computed(() => this.ids().length);

  has(id: number) {
    return this.ids().includes(id);
  }

  toggle(id: number) {
    this.ids.update(list => (list.includes(id) ? list.filter(x => x !== id) : [...list, id]));
    this.persist();
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids()));
  }
}`;

  watchlistGuardCode = `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../watchlist.service';

// Day 9 Act 3's guard: /watchlist only makes sense once something is on it.
export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);

  return watchlist.count() > 0 ? true : router.createUrlTree(['/']);
};`;

  showCardCode = `import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../models/show';
import { WatchlistService } from '../core/watchlist.service';

// The card Browse renders per result. Runtime badge is guarded per the
// Day 13 lab task — 0/missing runtime hides the badge instead of showing
// a meaningless "~0 min/ep".
@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <article class="show-card">
      <a [routerLink]="['/show', show().id]" class="poster-link">
        @if (show().imageUrl) {
          <img [src]="show().imageUrl" [alt]="show().name" />
        } @else {
          <div class="poster-fallback">{{ show().name }}</div>
        }
      </a>
      <div class="show-card-body">
        <a [routerLink]="['/show', show().id]" class="show-title">{{ show().name }}</a>
        <p class="show-meta">
          <span>⭐ {{ show().rating }}</span>
          <span>{{ show().genre }}</span>
          @if (show().runtime) {
            <span class="runtime-badge">~{{ show().runtime }} min/ep</span>
          }
        </p>
        <button type="button" (click)="watchlistSvc.toggle(show().id)">
          @if (watchlistSvc.has(show().id)) {
            ★ On Watchlist
          } @else {
            ☆ Add to Watchlist
          }
        </button>
      </div>
    </article>
  \`,
  styles: [\`
    .show-card {
      background: #1c1f26;
      border: 1px solid #2a2d35;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .poster-link { display: block; }
    img { width: 100%; height: 260px; object-fit: cover; display: block; }
    .poster-fallback {
      width: 100%; height: 260px; display: flex; align-items: center; justify-content: center;
      background: #2a2d35; color: #9a9a9a; text-align: center; padding: 12px;
    }
    .show-card-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
    .show-title { font-weight: 600; color: #e6e6e6; text-decoration: none; }
    .show-meta { display: flex; gap: 10px; align-items: center; font-size: 13px; color: #b0b0b0; flex-wrap: wrap; }
    .runtime-badge { background: #2a2d35; border-radius: 6px; padding: 2px 6px; }
    button {
      background: #2a2d35; border: 1px solid #3e3e42; color: #e6e6e6;
      border-radius: 6px; padding: 6px 10px; align-self: flex-start;
    }
  \`]
})
export class ShowCard {
  show = input.required<Show>();
  watchlistSvc = inject(WatchlistService);
}`;

  browseStartCode = `import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, fromEvent } from 'rxjs';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';
import { ShowCard } from '../../shared/show-card';

// End-of-Day-15 Browse: Day 13's three-state search (loading/results/empty)
// plus Day 14's error signal + retry loop, plus the Day 15 lab's '/' keyboard
// shortcut (Task 4). The Enter/click search wiring below is what Day 16
// Act 2 replaces with a debounced switchMap pipeline — don't "fix" it early.
@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [ShowCard],
  template: \`
    <section class="browse">
      <h1>Browse</h1>

      <div class="search-row">
        <input
          #searchInput
          placeholder="Search all of television… (press / to focus)"
          (keyup.enter)="runSearch(searchInput.value)"
        />
        <button type="button" (click)="runSearch(searchInput.value)">Search</button>
      </div>

      @if (loading()) {
        <p class="muted">Searching…</p>
      } @else if (error()) {
        <div class="error-box">
          <p>{{ error() }}</p>
          <button type="button" (click)="runSearch(lastTerm())">Retry</button>
        </div>
      } @else if (shows().length) {
        <div class="grid">
          @for (show of shows(); track show.id) {
            <app-show-card [show]="show" />
          }
        </div>
      } @else if (searched()) {
        <p class="muted">No shows matched. Try another title.</p>
      }
    </section>
  \`,
  styles: [\`
    .browse { padding: 24px; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; max-width: 480px; }
    .search-row input { flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
    .search-row button { padding: 8px 14px; border-radius: 6px; border: 1px solid #3e3e42; background: #2a2d35; color: #e6e6e6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  \`]
})
export class Browse {
  private showsSvc = inject(ShowsService);

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  shows = signal<Show[]>([]);
  loading = signal(false);
  searched = signal(false);
  error = signal<string | null>(null);
  lastTerm = signal('');

  constructor() {
    // Day 15 lab Task 4 — press '/' anywhere to focus the search box.
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(e => e.key === '/'),
        takeUntilDestroyed()
      )
      .subscribe(e => {
        e.preventDefault();
        this.searchInput()?.nativeElement.focus();
      });
  }

  runSearch(term: string) {
    if (!term.trim()) return;

    this.lastTerm.set(term);
    this.loading.set(true);
    this.error.set(null);

    this.showsSvc.search(term).subscribe({
      next: shows => {
        this.shows.set(shows);
        this.loading.set(false);
        this.searched.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Could not reach the show database. Check your connection and retry.');
      }
    });
  }
}`;

  showDetailStartCode = `import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TvMazeEpisode, TvMazeShow, toShow } from '../../models/show';
import { WatchlistService } from '../../core/watchlist.service';

// End-of-Day-14 ShowDetail: two independent httpResource()s (show + episodes,
// Day 14 lab Task 2) instead of a nested subscribe, and a graceful 404 branch
// (Day 14 lab Task 1) distinct from the generic connection-error message.
@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <section class="detail-main">
      @if (showRes.isLoading()) {
        <p class="muted">Loading show…</p>
      } @else if (showRes.error(); as err) {
        @if (isNotFound(err)) {
          <div class="not-found-box">
            <h2>That show doesn't exist (maybe it was cancelled?)</h2>
            <a routerLink="/">← Back to Browse</a>
          </div>
        } @else {
          <div class="error-box">
            <p>Could not reach the show database.</p>
            <button type="button" (click)="showRes.reload()">Retry</button>
          </div>
        }
      } @else if (show(); as s) {
        <article class="detail-card">
          <h1>{{ s.name }}</h1>
          <p>⭐ {{ s.rating }} · {{ s.genre }}</p>
          <div class="summary" [innerHTML]="s.summary"></div>
          <button type="button" (click)="watchlistSvc.toggle(s.id)">
            @if (watchlistSvc.has(s.id)) {
              ★ On Watchlist
            } @else {
              ☆ Add to Watchlist
            }
          </button>
        </article>
      }
    </section>

    <section class="episodes-panel">
      <h2>Episodes</h2>

      @if (episodesRes.isLoading()) {
        <p class="muted">Loading episode list…</p>
      } @else if (episodesRes.error()) {
        <div class="error-box">
          <p>Could not load episodes.</p>
          <button type="button" (click)="episodesRes.reload()">Retry</button>
        </div>
      } @else if (episodesRes.hasValue()) {
        <p>{{ episodesRes.value().length }} episodes.</p>
      }
    </section>
  \`,
  styles: [\`
    .detail-main, .episodes-panel { padding: 24px; max-width: 720px; }
    .summary { margin: 12px 0; line-height: 1.5; }
  \`]
})
export class ShowDetail {
  id = input.required<string>();

  watchlistSvc = inject(WatchlistService);

  private readonly base = 'https://api.tvmaze.com';

  showRes = httpResource<TvMazeShow>(() => \`\${this.base}/shows/\${this.id()}\`);
  episodesRes = httpResource<TvMazeEpisode[]>(() => \`\${this.base}/shows/\${this.id()}/episodes\`);

  show = computed(() => (this.showRes.hasValue() ? toShow(this.showRes.value()) : undefined));

  isNotFound(err: unknown): boolean {
    return (err as { status?: number })?.status === 404;
  }
}`;

  statsStartCode = `import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { ShowsService } from '../../core/shows.service';

// End-of-Day-15 Stats: the "Now Watching" ticker (Day 15 lab Task 1) and the
// Top-Rated stream (Day 15 lab Task 2). Day 16 doesn't touch this page.
@Component({
  selector: 'app-stats',
  standalone: true,
  template: \`
    <section class="stats">
      <h1>Stats</h1>

      <p class="ticker">
        You have been on this page for {{ secondsOnPage() }} seconds
        ({{ minutesEquivalent() }} minutes of TV).
      </p>

      <h2>Top Rated Shows</h2>
      @if (topRated().length) {
        <ul>
          @for (show of topRated(); track show.name) {
            <li>{{ show.name }} — ⭐ {{ show.rating }}</li>
          }
        </ul>
      } @else {
        <p class="muted">No 8+ rated shows found yet.</p>
      }
    </section>
  \`,
  styles: [\`
    .stats { padding: 24px; }
    .ticker { color: #9a9a9a; }
  \`]
})
export class Stats {
  private showsSvc = inject(ShowsService);

  // Day 15 lab Task 1 — live ticker bridged into a signal.
  secondsOnPage = toSignal(interval(1000), { initialValue: 0 });
  minutesEquivalent = computed(() => (this.secondsOnPage() / 60).toFixed(2));

  // Day 15 lab Task 2 — operator-composed stream bridged into a signal.
  topRated = toSignal(this.showsSvc.topRated('office'), { initialValue: [] as { name: string; rating: number }[] });
}`;

  watchlistPageCode = `import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';
import { WatchlistService } from '../../core/watchlist.service';

// Day 9's guarded /watchlist page: re-fetch each saved id from the live API.
@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <section class="watchlist">
      <h1>Watchlist</h1>
      @if (shows().length) {
        <ul>
          @for (show of shows(); track show.id) {
            <li>
              <a [routerLink]="['/show', show.id]">{{ show.name }}</a>
            </li>
          }
        </ul>
      } @else {
        <p class="muted">Nothing saved yet.</p>
      }
    </section>
  \`,
  styles: [\`
    .watchlist { padding: 24px; }
  \`]
})
export class Watchlist {
  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);

  private loaded = signal<Show[]>([]);
  shows = this.loaded.asReadonly();

  constructor() {
    for (const id of this.watchlistSvc.all()) {
      this.showsSvc.byId(id).subscribe(show => this.loaded.update(list => [...list, show]));
    }
  }
}`;
}
