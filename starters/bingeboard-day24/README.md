# BingeBoard — Day 24 Starting Point

A real, runnable Angular 21 app in the exact state Day 23 left it, plus
Day 23's own Act and Lab deliverables: a working `npm test`, and real
spec files covering every pure function and pipe Day 23 taught you to
test. Like the prior starters, this one needs your own Firebase config
pasted into `environment.ts` before anything Firebase-related works.

## Run it

```bash
npm install
```

(The `.npmrc` in this folder sets `legacy-peer-deps=true` — `@angular/fire`'s
latest stable release still peer-declares Angular 20, one version behind
this project's Angular 21. That's a version-lag issue on the library's side,
not a real incompatibility; the flag just tells npm not to block on it.)

**Then, before `npm start`:** open `src/environments/environment.ts` and
paste in your own Firebase project's config from Day 18, and enable the
Google provider under Authentication → Sign-in method in the console
(Day 21 Act 1).

```bash
npm start
```

**And to run the test suite this starter already ships with:**

```bash
npm test
```

## What already works

- **Days 9-17:** route params, lazy-loaded pages, route guards, real HTTP,
  `httpResource`, RxJS streams, race-proof typeaheads, and custom pipes.
- **Day 18:** BingeBoard connects to your own Firebase project with live
  Shows of the Week and announcements panels.
- **Day 19-20:** Watchlist and Reviews are fully Firestore-backed, with
  Reviews reading through a real server-side query (`where`/`orderBy`/`limit`).
- **Day 21 — real users:** Google sign-in/out, private per-user watchlists,
  route guards with return-URL preservation, authored reviews with
  author-only delete, and locked-down Firestore rules.
- **Day 22 — shipped:** real per-route `title`s, a favicon, a meta
  description, and no stray `console.log` calls.
- **Day 23 — a working test suite:** the `test` architect target
  (`angular.json`), the `vitest`/`jsdom` dev dependencies and
  `tsconfig.spec.json` (`package.json`/`tsconfig.json`), and five real,
  green spec files — `utils/binge-level.spec.ts`,
  `pipes/runtime.pipe.spec.ts`, `pipes/time-ago.pipe.spec.ts` (including
  the week-scale branch Act 2's TDD cycle added to `time-ago.pipe.ts`
  itself), `models/show.spec.ts`, and `validators/review-validators.spec.ts`.
  Run `npm test` right now — all 20 tests pass before you've touched a
  single file today.

## What's new for Day 24

One revived service, wired into the real app instead of sitting as dead
code — today's whole point is testing services and components with
fakes, and a pure signal-based service with a real call site is the
simplest possible thing to start with:

- **`src/app/core/recently-viewed.service.ts`** — `RecentlyViewedService`,
  the exact Day 7 lab service (a `signal<Show[]>`, `record()` keeps the 5
  most recent shows with no duplicates). It shipped in the Day 7-12
  starters, then quietly dropped out when Day 13 rewrote Browse's search
  around real HTTP — nobody ever wired it back in. It's revived here with
  two small, real call sites: `ShowDetail` calls `recentlySvc.record(s)`
  in an `effect()` whenever a show finishes loading, and `Browse` renders
  a "Recently viewed" strip above the search box using the same
  `<app-show-card>` Browse's own search results use. No new UI framework,
  no new pattern — just a genuinely untested piece of app state, which is
  exactly what Act 1 needs.

No `GreetingService` was added — nothing in today's material needed a
second from-scratch fake target once `RecentlyViewedService` (a
zero-dependency service) and `ShowsService`/`ShowCard`/`AuthService`
(services with real dependencies to fake) were already covering both ends
of the DI-fake spectrum this lesson teaches.

Everything already in the app that Day 24 tests but doesn't change:
`ShowCard` (`src/app/shared/show-card.ts`), `ShowsService`
(`src/app/core/shows.service.ts`), `AuthService`
(`src/app/core/auth.service.ts`), `WatchlistService`
(`src/app/core/watchlist.service.ts`), `hasWatchlistGuard`
(`src/app/core/guards/watchlist.guard.ts`), and `Browse`'s search error
path (`src/app/pages/browse/browse.ts`).

## Verify before you start Day 24

- [ ] `npm start` runs, and the browser tab title changes per route.
- [ ] `npm test` runs clean with **5 test files, 20 tests, all passing**.
- [ ] Opening any show's detail page, then going back to Browse, shows
      that show under a new "Recently viewed" strip above the search box.
- [ ] Visiting a made-up path (e.g. `/nope`) still renders the in-app 404
      page.

## Project layout

```
src/environments/environment.ts   YOUR Firebase config goes here
src/app/
  models/show.ts                   Show, TvMazeShow, toShow() adapter
  models/show.spec.ts
  utils/binge-level.ts
  utils/binge-level.spec.ts
  validators/review-validators.ts  noShouting(), a pure ValidatorFn
  validators/review-validators.spec.ts
  pipes/runtime.pipe.ts
  pipes/runtime.pipe.spec.ts
  pipes/rating-badge.pipe.ts
  pipes/time-ago.pipe.ts           now handles a week-scale branch
  pipes/time-ago.pipe.spec.ts
  core/shows.service.ts
  core/watchlist.service.ts
  core/reviews.service.ts
  core/auth.service.ts
  core/featured.service.ts
  core/announcements.service.ts
  core/recently-viewed.service.ts  NEW — Day 24's first TestBed target
  core/guards/watchlist.guard.ts
  core/guards/auth.guard.ts
  shared/show-card.ts
  pages/browse/browse.ts           now renders a "Recently viewed" strip
  pages/suggest/suggest.ts
  pages/show-detail/show-detail.ts  now records every loaded show
  pages/stats/stats.ts
  pages/watchlist/watchlist.ts
  pages/not-found/not-found.ts
  app.ts
public/favicon.ico
angular.json                      has a "test" architect target
tsconfig.spec.json                 NEW
```
