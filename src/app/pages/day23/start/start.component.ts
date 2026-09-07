import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day23-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 23 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The end-of-Day-22 BingeBoard, now with real titles, a favicon, and a meta description — plus two small, real pieces of logic that have never had a single test written against them: <code>bingeLevel()</code> and <code>noShouting()</code>.</p>
      </div>
      <div class="info-box"><strong>Two ways to get there:</strong> run the reference starter (fastest), or compare every source file below with your own project.</div>
      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul><li>Clone the teaching repository, then enter <code>starters/bingeboard-day23/</code>.</li><li>Run <code>npm install</code>, paste your own Firebase config into <code>src/environments/environment.ts</code>, then run <code>npm start</code>.</li></ul>
        <app-code-block lang="bash" [code]="cloneCommand" />
        <p>Browse it on GitHub: <a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day23" target="_blank" rel="noopener">starters/bingeboard-day23</a>.</p>
      </section>
      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>Expand every source file to copy or compare the exact end-of-Day-22 reference implementation.</p>
        @for (group of starterGroups; track group.folder) {
          <h4 style="margin-top: 20px;">{{ group.folder }}</h4>
          @for (file of group.files; track file.path) {
            <app-collapsible icon="📄" [label]="file.path"><app-code-block [lang]="file.lang" [code]="file.code" /></app-collapsible>
          }
        }
      </section>
      <section class="lesson-framework"><h3>What this code already does</h3><ul><li><strong>Days 9-17:</strong> routing, guards, real HTTP, typeahead, pipes, and a 404 page.</li><li><strong>Days 18-20:</strong> Firestore reads, watchlist CRUD, authored reviews via a server-side query.</li><li><strong>Day 21:</strong> Google sign-in, per-user watchlists, route guards with return-URL preservation, and Firestore rules that enforce ownership.</li><li><strong>Day 22:</strong> a real production build, real route titles, a favicon, a meta description, and a live Firebase Hosting URL.</li></ul></section>
      <section class="lesson-framework"><h3>Verify before you start</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> <code>npm start</code> runs and every route's browser tab title is descriptive.</li><li><span class="checkbox">✅</span> Show Detail's episode line reads something like <code>12 episodes · Quick Watch</code>.</li><li><span class="checkbox">✅</span> No test files exist yet anywhere in <code>src/</code> — today changes that.</li></ul></section>
      <div class="warning-box">If a check fails, return to the day and act that built it before continuing. Day 23 does not change any app behavior — it writes the first tests against behavior that already exists.</div>
      <div class="nav-footer"><a routerLink="/day22/lab" class="btn-secondary">← Day 22 Lab</a><a routerLink="/day23/act1" class="btn-primary">Act 1: Why Tests Matter →</a></div>
    </div>
  `
})
export class Day23StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day23
npm install
# paste your Firebase config into src/environments/environment.ts
npm start`;

  starterGroups = [
    { folder: 'App shell', files: [
      { path: 'src/app/app.ts', lang: 'typescript', code: `import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AnnouncementsService } from './core/announcements.service';
import { AuthService } from './core/auth.service';

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
  \`,
  styles: [\`
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
  \`]
})
export class App {
  // Day 18 lab, Task 2 -- a full solo rep, rendered in the app shell so
  // every page shows it.
  announcementsSvc = inject(AnnouncementsService);

  // Day 21 Act 1 -- three-state header, plus Lab Task 3's return-URL
  // handoff: \`signedInGuard\` stashes a \`returnUrl\` query param before
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
}` },
      { path: 'src/app/app.config.ts', lang: 'typescript', code: `import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};` },
      { path: 'src/app/app.routes.ts', lang: 'typescript', code: `import { Routes } from '@angular/router';
import { hasWatchlistGuard } from './core/guards/watchlist.guard';
import { signedInGuard } from './core/guards/auth.guard';

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
    canActivate: [signedInGuard],
    title: 'Stats · BingeBoard'
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./pages/watchlist/watchlist').then(m => m.Watchlist),
    canActivate: [signedInGuard, hasWatchlistGuard],
    title: 'Watchlist · BingeBoard'
  },
  {
    path: 'suggest',
    loadComponent: () => import('./pages/suggest/suggest').then(m => m.Suggest),
    canActivate: [signedInGuard],
    title: 'Suggest a Show · BingeBoard'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: '404 · BingeBoard'
  }
];` },
    ] },
    { folder: 'Core', files: [
      { path: 'src/app/core/auth.service.ts', lang: 'typescript', code: `import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';

// Day 21 Act 1 -- Google sign-in wrapped as one shared service. \`user\`
// starts \`undefined\` while Firebase restores a saved session, then
// settles to a \`User\` or \`null\`. Never read it once and cache the result;
// every consumer should read the signal live.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  readonly user = toSignal(user(this.auth));
  readonly isLoggedIn = computed(() => this.user() !== undefined && this.user() !== null);

  async signIn() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
    } catch (error) {
      // A blocked or dismissed popup is a normal failure, not a crash --
      // Day 21 Act 1 asks the header to render a friendly message here.
      console.error('Sign-in did not finish.', error);
    }
  }

  signOut() {
    return signOut(this.auth);
  }
}` },
      { path: 'src/app/core/watchlist.service.ts', lang: 'typescript', code: `import { computed, inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore, collection, collectionData, query, where,
  addDoc, deleteDoc, doc, updateDoc,
} from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { Show } from '../models/show';
import { AuthService } from './auth.service';

// End-of-Day-21 WatchlistService: migrated from localStorage to Firestore
// on Day 19 (watchlist, count, has, add, remove; setNote/toggleWatched
// from Act 3 and the Day 19 lab's watched field), then made per-user on
// Day 21 -- every document now carries an \`ownerId\`, and reads are a
// query scoped to the current uid instead of the whole collection.
interface WatchlistDoc {
  ownerId: string;
  showId: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
  summary: string;
  runtime: number;
  addedAt: string;
  watched: boolean;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private firestore = inject(Firestore);
  private authSvc = inject(AuthService);
  private col = collection(this.firestore, 'watchlist');

  // R -- Day 21 Act 2: switch to a fresh, owner-scoped query stream every
  // time the signed-in user changes, or to an empty stream when signed out.
  private items = toSignal(
    toObservable(this.authSvc.user).pipe(
      switchMap(currentUser => currentUser
        ? collectionData(
            query(this.col, where('ownerId', '==', currentUser.uid)),
            { idField: 'docId' }
          ) as Observable<(WatchlistDoc & { docId: string })[]>
        : of([]))
    ),
    { initialValue: [] }
  );

  // Public surface -- unchanged shape from Day 19 Act 1's contract.
  readonly watchlist = computed(() =>
    this.items().map(d => ({
      id: d.showId, name: d.name, genre: d.genre,
      rating: d.rating, imageUrl: d.imageUrl, summary: d.summary,
      runtime: d.runtime,
    } satisfies Show))
  );
  readonly count = computed(() => this.items().length);
  readonly watchedCount = computed(() => this.items().filter(d => d.watched).length);

  // Raw entries, for the Watchlist page's richer UI (docId, addedAt, watched, note).
  readonly entries = this.items;

  has(id: number) {
    return this.items().some(d => d.showId === id);
  }

  // C
  async add(show: Show) {
    if (this.has(show.id)) return;
    const currentUser = this.authSvc.user();
    if (!currentUser) throw new Error('Sign in before adding a show.');
    await addDoc(this.col, {
      ownerId: currentUser.uid,
      showId: show.id, name: show.name, genre: show.genre,
      rating: show.rating, imageUrl: show.imageUrl, summary: show.summary,
      runtime: show.runtime ?? 0,
      addedAt: new Date().toISOString(),
      watched: false,
    });
  }

  // D -- we need the Firestore document id, so look it up from the live signal.
  async remove(showId: number) {
    const entry = this.items().find(d => d.showId === showId);
    if (!entry) return;
    await deleteDoc(doc(this.firestore, 'watchlist', entry.docId));
  }

  // U -- Day 19 Act 3's note field.
  async setNote(showId: number, note: string) {
    const entry = this.items().find(d => d.showId === showId);
    if (!entry) return;
    await updateDoc(doc(this.firestore, 'watchlist', entry.docId), { note });
  }

  // U -- Day 19 lab Task 1's watched toggle.
  async toggleWatched(showId: number) {
    const entry = this.items().find(d => d.showId === showId);
    if (!entry) return;
    await updateDoc(doc(this.firestore, 'watchlist', entry.docId), { watched: !entry.watched });
  }
}` },
      { path: 'src/app/core/reviews.service.ts', lang: 'typescript', code: `import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore, addDoc, collection, collectionData, deleteDoc, doc, limit, orderBy, query, where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Day 19 lab Task 2 built this service from scratch, Firestore-backed
// from day one. Day 20 added the server-side query (where/orderBy/limit).
// Day 21 lab Task 1 adds authorship: every review now carries \`ownerId\`,
// \`authorName\`, and \`authorPhoto\`, and only the author may delete their
// own review (enforced by the Firestore rule, not just this UI).
export interface Review {
  id: string;
  showId: number;
  text: string;
  rating: number;
  createdAt: string;
  ownerId: string;
  authorName: string;
  authorPhoto: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private firestore = inject(Firestore);
  private authSvc = inject(AuthService);
  private col = collection(this.firestore, 'reviews');

  forShow(showId: number) {
    const reviewsForShow = query(
      this.col,
      where('showId', '==', showId),
      orderBy('createdAt', 'desc'),
      limit(10),
    );
    return toSignal(
      collectionData(reviewsForShow, { idField: 'id' }) as Observable<Review[]>,
      { initialValue: [] }
    );
  }

  async add(showId: number, text: string, rating: number) {
    const currentUser = this.authSvc.user();
    if (!currentUser) throw new Error('Sign in before writing a review.');
    await addDoc(this.col, {
      showId,
      text,
      rating,
      createdAt: new Date().toISOString(),
      ownerId: currentUser.uid,
      authorName: currentUser.displayName ?? 'Anonymous',
      authorPhoto: currentUser.photoURL ?? '',
    });
  }

  async delete(reviewId: string) {
    await deleteDoc(doc(this.firestore, 'reviews', reviewId));
  }
}` },
      { path: 'src/app/core/shows.service.ts', lang: 'typescript', code: `import { inject, Injectable } from '@angular/core';
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
}` },
      { path: 'src/app/core/featured.service.ts', lang: 'typescript', code: `import { inject, Injectable } from '@angular/core';
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
}` },
      { path: 'src/app/core/announcements.service.ts', lang: 'typescript', code: `import { computed, inject, Injectable } from '@angular/core';
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
}` },
      { path: 'src/app/core/guards/auth.guard.ts', lang: 'typescript', code: `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

// Day 21 Act 2 + Lab Task 3 -- redirect signed-out visitors home, but
// remember where they were headed so sign-in can return them there
// instead of always landing on Browse.
export const signedInGuard: CanActivateFn = (_route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  return authSvc.isLoggedIn()
    ? true
    : router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
};` },
      { path: 'src/app/core/guards/watchlist.guard.ts', lang: 'typescript', code: `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../watchlist.service';

// Day 9 Act 3's guard: /watchlist only makes sense once something is on it.
export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);

  return watchlist.count() > 0 ? true : router.createUrlTree(['/']);
};` },
    ] },
    { folder: 'Models, pipes, and shared', files: [
      { path: 'src/app/models/show.ts', lang: 'typescript', code: `// BingeBoard's app-facing Show model, plus the minimal TVMaze API shapes we
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
}` },
      { path: 'src/app/pipes/runtime.pipe.ts', lang: 'typescript', code: `import { Pipe, PipeTransform } from '@angular/core';

// Day 17 Act 2 — turns raw minutes ("62") into "1h 2m".
@Pipe({ name: 'runtime' })
export class RuntimePipe implements PipeTransform {
  transform(minutes: number | null | undefined): string {
    if (!minutes) return '—';
    const h = Math.floor(minutes / 60), m = minutes % 60;
    return h ? \`\${h}h \${m ? m + 'm' : ''}\`.trim() : \`\${m}m\`;
  }
}` },
      { path: 'src/app/pipes/rating-badge.pipe.ts', lang: 'typescript', code: `import { Pipe, PipeTransform } from '@angular/core';

// Day 17 lab Tier 1 — a number becomes a verdict.
@Pipe({ name: 'ratingBadge' })
export class RatingBadgePipe implements PipeTransform {
  transform(rating: number | null | undefined): string {
    if (!rating) return 'Unrated';
    if (rating >= 8) return 'Certified banger';
    if (rating >= 6) return 'Solid';
    return 'Proceed with caution';
  }
}` },
      { path: 'src/app/pipes/time-ago.pipe.ts', lang: 'typescript', code: `import { Pipe, PipeTransform } from '@angular/core';

// Day 17 lab Tier 1 -- finally gets a real attachment point on Day 19's
// watchlist addedAt field. Handles just-now, singular/plural, and a
// future-dated value (clock skew) gracefully.
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    const seconds = (Date.now() - date.getTime()) / 1000;

    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return \`\${minutes} minute\${minutes === 1 ? '' : 's'} ago\`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return \`\${hours} hour\${hours === 1 ? '' : 's'} ago\`;

    const days = Math.floor(hours / 24);
    return \`\${days} day\${days === 1 ? '' : 's'} ago\`;
  }
}` },
      { path: 'src/app/shared/show-card.ts', lang: 'typescript', code: `import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../models/show';
import { WatchlistService } from '../core/watchlist.service';
import { AuthService } from '../core/auth.service';
import { RuntimePipe } from '../pipes/runtime.pipe';
import { RatingBadgePipe } from '../pipes/rating-badge.pipe';

// The card Browse renders per result. Runtime is formatted through the
// Day 17 runtime pipe ("—" for 0/missing instead of a meaningless
// "~0 min/ep"), and the rating gets a ratingBadge verdict alongside it.
// Day 21 lab Task 2 -- signed-out visitors see an inline sign-in nudge
// instead of a dead or hidden Add to Watchlist button.
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
        @if (authSvc.isLoggedIn()) {
          <button type="button" (click)="toggleWatchlist()">
            @if (watchlistSvc.has(show().id)) {
              ★ On Watchlist
            } @else {
              ☆ Add to Watchlist
            }
          </button>
        } @else {
          <button type="button" class="signin-nudge-btn" (click)="authSvc.signIn()">Sign in to save</button>
        }
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
    .signin-nudge-btn { color: #82aaff; border-color: #2a4a7a; }
  \`]
})
export class ShowCard {
  show = input.required<Show>();
  watchlistSvc = inject(WatchlistService);
  authSvc = inject(AuthService);

  toggleWatchlist() {
    const s = this.show();
    if (this.watchlistSvc.has(s.id)) {
      this.watchlistSvc.remove(s.id);
    } else {
      this.watchlistSvc.add(s);
    }
  }
}` },
    ] },
    { folder: 'Utils and validators — new for Day 23', files: [
      { path: 'src/app/utils/binge-level.ts', lang: 'typescript', code: `// Day 3's lab taught this exact branching logic as a computed() signal
// inside ShowCard, driven by a fake episodesWatched counter: 0 episodes,
// 1-4, 5-9, 10+. Now that Show Detail has a real episode count from the
// TVMaze API (episodesRes.value().length), the same idea is worth having
// again -- but this time as a plain, exported function with no component,
// no signal, and no Angular import at all. That's what makes it the
// easiest possible thing to unit test: call it, check what comes back.
//
// Thresholds here are illustrative, not scientifically tuned -- the point
// is the shape of the function, not the exact cutoffs.
export type BingeLevel = 'Quick Watch' | 'Full-Season Binge' | 'Marathon';

export function bingeLevel(episodeCount: number): BingeLevel {
  if (episodeCount <= 12) return 'Quick Watch';
  if (episodeCount <= 50) return 'Full-Season Binge';
  return 'Marathon';
}` },
      { path: 'src/app/validators/review-validators.ts', lang: 'typescript', code: `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Day 11 Act 2 built this as a reactive-forms ValidatorFn attached to a
// review headline field. The review form itself has since moved to a
// simpler template-driven flow (Day 19 rebuilt Reviews on Firestore with
// a plain <textarea>/<input>, no FormGroup, no headline field at all), so
// this validator is not wired to today's UI. It's kept here because it's
// real, previously-shipped app logic, and -- being a plain function that
// takes a control-like value and returns null or an errors object -- it's
// exactly as easy to unit test as bingeLevel: no component, no DOM, no
// TestBed required.
export function noShouting(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = String(control.value ?? '');
    const letters = value.replace(/[^a-zA-Z]/g, '');
    return letters.length >= 3 && value === value.toUpperCase()
      ? { noShouting: true }
      : null;
  };
}` },
    ] },
    { folder: 'Pages', files: [
      { path: 'src/app/pages/browse/browse.ts', lang: 'typescript', code: `import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
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
}` },
      { path: 'src/app/pages/show-detail/show-detail.ts', lang: 'typescript', code: `import { httpResource } from '@angular/common/http';
import { Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show, TvMazeEpisode, TvMazeShow, toShow } from '../../models/show';
import { WatchlistService } from '../../core/watchlist.service';
import { ReviewsService } from '../../core/reviews.service';
import { AuthService } from '../../core/auth.service';
import { bingeLevel } from '../../utils/binge-level';

// End-of-Day-21 ShowDetail: two independent httpResource()s (show +
// episodes), a graceful 404 branch, add()/remove() against the per-user
// WatchlistService, a review form + list backed by ReviewsService with
// authored reviews and author-only delete (Day 21 lab Task 1), and a
// sign-in nudge in place of the form/watchlist button for signed-out
// visitors (Day 21 lab Task 2).
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
          @if (authSvc.isLoggedIn()) {
            <button type="button" (click)="toggleWatchlist(s)">
              @if (watchlistSvc.has(s.id)) {
                ★ On Watchlist
              } @else {
                ☆ Add to Watchlist
              }
            </button>
          } @else {
            <div class="signin-nudge">
              <p>Sign in to add this show to your watchlist.</p>
              <button type="button" (click)="authSvc.signIn()">Sign in with Google</button>
            </div>
          }
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
        <p>{{ episodesRes.value().length }} episodes · {{ bingeLevel(episodesRes.value().length) }}</p>
      }
    </section>

    <section class="reviews-panel">
      <h2>Reviews</h2>

      @for (r of reviews(); track r.id) {
        <article class="review-card">
          <div class="review-author">
            <img [src]="r.authorPhoto" [alt]="r.authorName" class="avatar" />
            <strong>{{ r.authorName }}</strong>
          </div>
          <p>⭐ {{ r.rating }}</p>
          <p>{{ r.text }}</p>
          @if (r.ownerId === authSvc.user()?.uid) {
            <button type="button" (click)="reviewsSvc.delete(r.id)">Delete</button>
          }
        </article>
      } @empty {
        <p class="muted">No reviews yet — be the first.</p>
      }

      @if (authSvc.isLoggedIn()) {
        <form class="review-form" (submit)="submitReview($event)">
          <textarea #reviewText placeholder="Write a review…" required></textarea>
          <input #reviewRating type="number" min="1" max="10" placeholder="Rating (1-10)" required />
          <button type="submit">Post Review</button>
        </form>
      } @else {
        <div class="signin-nudge">
          <p>Sign in to write a review.</p>
          <button type="button" (click)="authSvc.signIn()">Sign in with Google</button>
        </div>
      }
    </section>
  \`,
  styles: [\`
    .detail-main, .episodes-panel, .reviews-panel { padding: 24px; max-width: 720px; }
    .summary { margin: 12px 0; line-height: 1.5; }
    .review-card { padding: 8px 0; border-top: 1px solid #2a2d35; }
    .review-author { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .review-author .avatar { width: 20px; height: 20px; border-radius: 50%; }
    .review-form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; margin-top: 16px; }
    .review-form textarea, .review-form input { padding: 8px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
    .signin-nudge { padding: 12px; border: 1px dashed #3e3e42; border-radius: 8px; margin-top: 12px; }
  \`]
})
export class ShowDetail {
  id = input.required<string>();

  watchlistSvc = inject(WatchlistService);
  reviewsSvc = inject(ReviewsService);
  authSvc = inject(AuthService);

  // Exposed so the template can call it directly -- templates only see
  // component instance members, not bare module-level imports.
  bingeLevel = bingeLevel;

  reviewText = viewChild<ElementRef<HTMLTextAreaElement>>('reviewText');
  reviewRating = viewChild<ElementRef<HTMLInputElement>>('reviewRating');

  private readonly base = 'https://api.tvmaze.com';

  showRes = httpResource<TvMazeShow>(() => \`\${this.base}/shows/\${this.id()}\`);
  episodesRes = httpResource<TvMazeEpisode[]>(() => \`\${this.base}/shows/\${this.id()}/episodes\`);

  show = computed(() => (this.showRes.hasValue() ? toShow(this.showRes.value()) : undefined));

  // forShow() returns a computed(); reading it inside this outer computed()
  // means \`reviews\` re-derives correctly whenever the route id changes.
  reviews = computed(() => this.reviewsSvc.forShow(Number(this.id()))());

  isNotFound(err: unknown): boolean {
    return (err as { status?: number })?.status === 404;
  }

  toggleWatchlist(s: Show) {
    if (this.watchlistSvc.has(s.id)) {
      this.watchlistSvc.remove(s.id);
    } else {
      this.watchlistSvc.add(s);
    }
  }

  submitReview(event: Event) {
    event.preventDefault();
    const text = this.reviewText()?.nativeElement.value.trim();
    const rating = Number(this.reviewRating()?.nativeElement.value);
    if (!text || !rating) return;
    this.reviewsSvc.add(Number(this.id()), text, rating);
    if (this.reviewText()) this.reviewText()!.nativeElement.value = '';
    if (this.reviewRating()) this.reviewRating()!.nativeElement.value = '';
  }
}` },
      { path: 'src/app/pages/watchlist/watchlist.ts', lang: 'typescript', code: `import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../core/watchlist.service';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

// End-of-Day-19 Watchlist: entries now come straight from Firestore
// documents (Day 19 migration) instead of re-fetching each show by id --
// the document already carries name/rating/genre/imageUrl/runtime. Adds
// the watched checkbox + "N of M watched" (Day 19 lab Task 1), a note
// input (Day 19 Act 3), and "Added N days ago" via Day 17's timeAgo pipe
// (Day 19 lab Task 3).
@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [RouterLink, TimeAgoPipe],
  template: \`
    <section class="watchlist">
      <h1>Watchlist</h1>

      @if (watchlistSvc.entries().length) {
        <p class="muted">{{ watchlistSvc.watchedCount() }} of {{ watchlistSvc.count() }} watched</p>

        <ul>
          @for (entry of watchlistSvc.entries(); track entry.docId) {
            <li class="entry">
              <a [routerLink]="['/show', entry.showId]">{{ entry.name }}</a>
              <span class="muted">Added {{ entry.addedAt | timeAgo }}</span>

              <label class="watched-toggle">
                <input
                  type="checkbox"
                  [checked]="entry.watched"
                  (change)="watchlistSvc.toggleWatched(entry.showId)"
                />
                Watched
              </label>

              <input
                class="note-input"
                placeholder="Add a note…"
                [value]="entry.note ?? ''"
                (blur)="saveNote(entry.showId, $event)"
              />
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
    .entry { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-top: 1px solid #2a2d35; flex-wrap: wrap; }
    .watched-toggle { display: flex; align-items: center; gap: 4px; font-size: 13px; }
    .note-input { padding: 4px 8px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
  \`]
})
export class Watchlist {
  watchlistSvc = inject(WatchlistService);

  saveNote(showId: number, event: FocusEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.watchlistSvc.setNote(showId, value);
  }
}` },
      { path: 'src/app/pages/stats/stats.ts', lang: 'typescript', code: `import { Component, computed, inject } from '@angular/core';
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
}` },
      { path: 'src/app/pages/suggest/suggest.ts', lang: 'typescript', code: `import { Component, inject, signal } from '@angular/core';
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
}` },
      { path: 'src/app/pages/not-found/not-found.ts', lang: 'typescript', code: `import { Component } from '@angular/core';
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
export class NotFound {}` },
    ] },
    { folder: 'Project files', files: [
      { path: 'src/environments/environment.ts', lang: 'typescript', code: `// Fill this in with YOUR OWN Firebase project's config from Day 18.
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
};` },
      { path: 'src/index.html', lang: 'html', code: `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>BingeBoard</title>
  <base href="/" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Track shows you're watching, get recommendations, and never lose your place." />
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
</head>
<body>
  <app-root></app-root>
</body>
</html>` },
      { path: 'src/main.ts', lang: 'typescript', code: `import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch(err => console.error(err));` },
      { path: 'src/styles.css', lang: 'css', code: `/* BingeBoard — global styles.
   Deliberately minimal: this is a teaching starter, not a design system.
   Feel free to restyle anything as you work through Day 15. */

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: #14161a;
  color: #e6e6e6;
}

a {
  color: #4fc3f7;
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
  color: #9a9a9a;
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
}` },
    ] },
  ];
}
