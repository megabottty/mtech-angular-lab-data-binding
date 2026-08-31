import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day19-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 19 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The exact end-of-Day-18 BingeBoard — plus one new step none of the earlier starters needed.</p>
      </div>

      <div class="warning-box">
        <strong>This starter needs one manual step before it does anything Firestore-related:</strong> paste your own Firebase project's config (from Day 18) into <code>src/environments/environment.ts</code>. Every earlier starter in this course worked with nothing but <code>npm install &amp;&amp; npm start</code> — this is the first one that can't, because each student's Firebase project is genuinely their own.
      </div>

      <div class="info-box">
        <strong>Two ways to get there:</strong> clone and run a real project (fastest, and the only way that's actually type-checked), or copy each file below into your own project if you'd rather keep building on what you already have. Either way, the config paste-in step above still applies.
      </div>

      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li><strong>Clone the teaching site's repo</strong>, which includes this starter under <code>starters/bingeboard-day19/</code>.</li>
          <li><strong>Install:</strong> <code>cd starters/bingeboard-day19 && npm install</code>.</li>
          <li><strong>Paste your Firebase config</strong> into <code>src/environments/environment.ts</code> — Firebase Console → Project Settings → Your apps → Web app.</li>
          <li><strong>Then run it:</strong> <code>npm start</code>, and open the URL <code>ng serve</code> prints (usually <code>http://localhost:4200</code>).</li>
        </ul>
        <app-code-block lang="typescript" [code]="cloneCommand" />
        <p style="margin-top: 8px;">
          Prefer to browse the files first? View them directly on GitHub:
          <a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day19" target="_blank" rel="noopener">starters/bingeboard-day19</a>.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>
          Already have Day 18's BingeBoard building in your own project? You can skip Option A entirely —
          just use the checklist below to confirm your version matches. If you'd rather copy this exact
          reference implementation file-by-file instead, expand each file below.
        </p>

        <h4 style="margin-top: 20px;">Your config</h4>
        <app-collapsible icon="📄" label="src/environments/environment.ts">
          <app-code-block lang="typescript" [code]="environmentStartCode" />
        </app-collapsible>

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

        <h4 style="margin-top: 20px;">Models, pipes &amp; services</h4>
        <app-collapsible icon="📄" label="src/app/models/show.ts">
          <app-code-block lang="typescript" [code]="showModelCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/pipes/runtime.pipe.ts">
          <app-code-block lang="typescript" [code]="runtimePipeStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/pipes/rating-badge.pipe.ts">
          <app-code-block lang="typescript" [code]="ratingBadgePipeStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/core/shows.service.ts">
          <app-code-block lang="typescript" [code]="showsServiceStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/core/watchlist.service.ts">
          <app-code-block lang="typescript" [code]="watchlistServiceCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/core/featured.service.ts">
          <app-code-block lang="typescript" [code]="featuredServiceStartCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/core/announcements.service.ts">
          <app-code-block lang="typescript" [code]="announcementsServiceStartCode" />
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
        <app-collapsible icon="📄" label="src/app/pages/suggest/suggest.ts">
          <app-code-block lang="typescript" [code]="suggestStartCode" />
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
        <app-collapsible icon="📄" label="src/app/pages/not-found/not-found.ts">
          <app-code-block lang="typescript" [code]="notFoundStartCode" />
        </app-collapsible>
      </section>

      <section class="lesson-framework">
        <h3>What this code already does</h3>
        <ul>
          <li><strong>Day 9:</strong> route params, a <code>hasWatchlistGuard</code>, and lazy-loaded routes.</li>
          <li><strong>Day 13-14:</strong> real <code>HttpClient</code> calls, a typed + adapted <code>Show</code> model, and <code>httpResource()</code>-based fetching.</li>
          <li><strong>Day 15-16:</strong> a live ticker, a race-proof debounced typeahead, and a <code>/suggest</code> page.</li>
          <li><strong>Day 17:</strong> <code>runtime</code> and <code>ratingBadge</code> pipes, and a real 404 page.</li>
          <li><strong>Day 18:</strong> your own Firebase project, wired with AngularFire; a live "Shows of the week" panel on Browse; an announcements banner in the app shell, sorted newest-first.</li>
        </ul>
      </section>

      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> You've pasted your own Firebase config into <code>environment.ts</code> — not still the placeholder values.</li>
          <li><span class="checkbox">✅</span> Browse's "Shows of the week" panel shows your real documents.</li>
          <li><span class="checkbox">✅</span> The announcements banner shows your real messages with correctly formatted dates.</li>
          <li><span class="checkbox">✅</span> Search "office" on Browse and see results with formatted runtime and rating badges.</li>
        </ul>
      </section>

      <div class="warning-box">
        If any of the app checks fail, don't push forward into Day 19 yet — most failures here trace back to the config paste-in step. Fix that first, then go back to the specific day/act that built whatever else looks wrong.
      </div>

      <div class="nav-footer">
        <a routerLink="/day18/lab" class="btn-secondary">← Day 18 Lab</a>
        <a routerLink="/day19/act1" class="btn-primary">Act 1: The Contract, and the Document Shape →</a>
      </div>
    </div>
  `
})
export class Day19StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day19
npm install
# paste your Firebase config into src/environments/environment.ts, then:
npm start`;

  environmentStartCode = `// Fill this in with YOUR OWN Firebase project's config from Day 18.
// Get these from: Firebase Console -> Project Settings -> Your apps -> Web app.
// Placeholder values below will build fine but every Firestore call will
// fail at runtime until you paste in real ones.
export const environment = {
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};`;

  appTsCode = `import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AnnouncementsService } from './core/announcements.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: \`
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
  \`,
  styles: [\`
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
  \`]
})
export class App {
  // Day 18 lab, Task 2 -- a full solo rep, rendered in the app shell so
  // every page shows it.
  announcementsSvc = inject(AnnouncementsService);
}`;

  appConfigCode = `import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
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
  },
  {
    path: 'suggest',
    loadComponent: () => import('./pages/suggest/suggest').then(m => m.Suggest),
    title: 'Suggest a Show · BingeBoard'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: '404 · BingeBoard'
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

  runtimePipeStartCode = `import { Pipe, PipeTransform } from '@angular/core';

// Day 17 Act 2 — turns raw minutes ("62") into "1h 2m".
@Pipe({ name: 'runtime' })
export class RuntimePipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60), m = minutes % 60;
    return h ? \`\${h}h \${m ? m + 'm' : ''}\`.trim() : \`\${m}m\`;
  }
}`;

  ratingBadgePipeStartCode = `import { Pipe, PipeTransform } from '@angular/core';

// Day 17 lab Tier 1 — a number becomes a verdict.
@Pipe({ name: 'ratingBadge' })
export class RatingBadgePipe implements PipeTransform {
  transform(rating: number | null | undefined): string {
    if (!rating) return 'Unrated';
    if (rating >= 8) return 'Certified banger';
    if (rating >= 6) return 'Solid';
    return 'Proceed with caution';
  }
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

  featuredServiceStartCode = `import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Day 18 Act 2 -- the first live Firestore read. Requires YOUR OWN
// shows-of-the-week collection (see src/environments/environment.ts).
export interface FeaturedShow {
  id: string;
  name: string;
  blurb: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class FeaturedService {
  private firestore = inject(Firestore);

  featured = toSignal(
    collectionData(
      collection(this.firestore, 'shows-of-the-week'),
      { idField: 'id' }
    ) as Observable<FeaturedShow[]>,
    { initialValue: [] }
  );
}`;

  announcementsServiceStartCode = `import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, Timestamp, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Day 18 lab, Tasks 2+3 -- a second collection built solo, sorted newest-first.
export interface Announcement {
  id: string;
  message: string;
  postedAt: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class AnnouncementsService {
  private firestore = inject(Firestore);

  private announcements = toSignal(
    collectionData(
      collection(this.firestore, 'announcements'),
      { idField: 'id' }
    ) as Observable<Announcement[]>,
    { initialValue: [] }
  );

  // Client-side sort is fine at this scale -- see Day 18 lab Task 3 for the
  // tradeoff against query()/orderBy() at the server.
  sorted = computed(() =>
    [...this.announcements()].sort((a, b) => b.postedAt.toMillis() - a.postedAt.toMillis())
  );
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
import { RuntimePipe } from '../pipes/runtime.pipe';
import { RatingBadgePipe } from '../pipes/rating-badge.pipe';

// The card Browse renders per result. Runtime is formatted through the
// Day 17 runtime pipe ("—" for 0/missing instead of a meaningless
// "~0 min/ep"), and the rating gets a ratingBadge verdict alongside it.
@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RouterLink, RuntimePipe, RatingBadgePipe],
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
          <span>⭐ {{ show().rating }} · {{ show().rating | ratingBadge }}</span>
          <span>{{ show().genre }}</span>
          @if (show().runtime) {
            <span class="runtime-badge">{{ show().runtime | runtime }}</span>
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

  browseStartCode = `import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, fromEvent, of, switchMap, tap } from 'rxjs';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';
import { FeaturedService } from '../../core/featured.service';
import { ShowCard } from '../../shared/show-card';

// End-of-Day-18 Browse: the full Day 16 typeahead pipeline (Subject ->
// filter(length >= 2) -> debounceTime -> distinctUntilChanged -> tap
// (loading) -> switchMap with catchError INSIDE the projection -> tap
// (loading false)), the Day 16 lab's minimum-viable-query idle hint, the
// Day 15 lab's '/' keyboard shortcut, and Day 18 Act 2's "Shows of the
// week" panel -- Browse is this app's real '' / home route.
@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [ShowCard],
  template: \`
    <section class="browse">
      <h1>Browse</h1>

      <section class="featured-panel">
        <h2>Shows of the week</h2>
        @for (s of featuredSvc.featured(); track s.id) {
          <article class="featured-card">
            <h3>{{ s.name }}</h3>
            <p>{{ s.blurb }}</p>
          </article>
        } @empty {
          <p class="muted">Nothing featured yet.</p>
        }
      </section>

      <div class="search-row">
        <input
          #searchInput
          placeholder="Search all of television… (press / to focus)"
          (input)="onType(searchInput.value)"
        />
      </div>

      @if (tooShort()) {
        <p class="muted">Type at least 2 characters to search.</p>
      } @else if (loading()) {
        <p class="muted">Searching…</p>
      } @else if (error()) {
        <div class="error-box">
          <p>{{ error() }}</p>
        </div>
      } @else if (results().length) {
        <div class="grid">
          @for (show of results(); track show.id) {
            <app-show-card [show]="show" />
          }
        </div>
      } @else if (currentTerm().length >= 2) {
        <p class="muted">No shows matched. Try another title.</p>
      }
    </section>
  \`,
  styles: [\`
    .browse { padding: 24px; }
    .featured-panel { margin-bottom: 24px; padding: 16px; border: 1px solid #2a2d35; border-radius: 10px; background: #1a1d24; }
    .featured-panel h2 { margin: 0 0 10px; font-size: 16px; }
    .featured-card { padding: 8px 0; border-top: 1px solid #2a2d35; }
    .featured-card:first-of-type { border-top: none; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; max-width: 480px; }
    .search-row input { flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  \`]
})
export class Browse {
  private showsSvc = inject(ShowsService);
  featuredSvc = inject(FeaturedService);

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private searchTerms = new Subject<string>();

  currentTerm = signal('');
  tooShort = computed(() => this.currentTerm().length > 0 && this.currentTerm().length < 2);

  loading = signal(false);
  error = signal<string | null>(null);

  results = toSignal(
    this.searchTerms.pipe(
      filter(term => term.length >= 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.loading.set(true); this.error.set(null); }),
      switchMap(term =>
        this.showsSvc.search(term).pipe(
          catchError(() => {
            this.error.set('Search failed — check your connection.');
            return of([]);
          })
        )
      ),
      tap(() => this.loading.set(false)),
    ),
    { initialValue: [] as Show[] }
  );

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

  onType(term: string) {
    const trimmed = term.trim();
    this.currentTerm.set(trimmed);
    this.searchTerms.next(trimmed);
  }
}`;

  suggestStartCode = `import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';

// Honest heuristic, not real fuzzy string matching — see Day 16's lab Task 2.
function findCloseMatch(typed: string, results: Show[]): Show | null {
  const needle = typed.toLowerCase();
  return results.find(s => {
    const name = s.name.toLowerCase();
    return name === needle || name.includes(needle);
  }) ?? null;
}

// Day 16 lab Task 2 (the capstone): the same typeahead shape as Browse,
// rebuilt solo against a different question — "does a close match exist?"
@Component({
  selector: 'app-suggest',
  standalone: true,
  template: \`
    <section class="suggest">
      <h1>Suggest a Show</h1>
      <p class="muted">Type a show name — we'll check if it's already in the catalog.</p>

      <input placeholder="Name a show…" (input)="onType(nameInput.value)" #nameInput />

      @if (tooShort()) {
        <p class="muted">Type at least 2 characters.</p>
      } @else if (currentTerm().length >= 2) {
        @if (match(); as m) {
          <p>Did you mean <em>{{ m.name }}</em>?</p>
        } @else {
          <p class="muted">No matching show found — looks like a new suggestion!</p>
        }
      }
    </section>
  \`,
  styles: [\`
    .suggest { padding: 24px; max-width: 480px; }
    input { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; margin: 12px 0; }
  \`]
})
export class Suggest {
  private showsSvc = inject(ShowsService);
  private typedTerms = new Subject<string>();

  currentTerm = signal('');
  tooShort = signal(false);

  match = toSignal(
    this.typedTerms.pipe(
      filter(term => term.length >= 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.showsSvc.search(term).pipe(
          map(results => findCloseMatch(term, results)),
          catchError(() => of(null)),
        )
      ),
    ),
    { initialValue: null as Show | null }
  );

  onType(term: string) {
    const trimmed = term.trim();
    this.currentTerm.set(trimmed);
    this.tooShort.set(trimmed.length > 0 && trimmed.length < 2);
    this.typedTerms.next(trimmed);
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

  notFoundStartCode = `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Day 17 lab Tier 3 — a real 404 instead of a blank screen for any
// unmatched URL. Wired as the ** wildcard route, last in app.routes.ts.
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <section class="not-found">
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <a routerLink="/">← Back to Browse</a>
    </section>
  \`,
  styles: [\`
    .not-found { padding: 48px 24px; text-align: center; }
    h1 { font-size: 48px; margin-bottom: 8px; }
  \`]
})
export class NotFound {}`;
}
