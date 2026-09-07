# BingeBoard — Day 25 Starting Point

A real, runnable Angular 21 app in the exact state Day 24 left it: the
Day 23 testing baseline, plus a real service spec, component spec, HTTP
spec, and guard spec proving Day 24's four testing techniques against
this app's own code. Like the prior starters, this one needs your own
Firebase config pasted into `environment.ts` before anything
Firebase-related works.

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

Run the test suite (no Firebase config needed — every test here fakes
its Firestore/Auth-backed neighbors):

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
- **Day 23 — a first real test suite:** `ng test` wired up, and passing
  spec files for `toShow()`, `TimeAgoPipe`, and `noShouting()`.
- **Day 24 — Angular-aware tests:** four more spec files, each proving
  one of Day 24's techniques against this app's real code instead of a
  standalone example:
  - `src/app/core/recently-viewed.service.spec.ts` — a fresh `TestBed`
    instance per test, no fakes needed (zero constructor dependencies).
  - `src/app/shared/show-card.spec.ts` — a component contract test:
    set the `show` input, render, read the DOM, and prove a click calls
    a faked `WatchlistService`/`AuthService` instead of the real ones.
  - `src/app/core/shows.service.spec.ts` — an `HttpTestingController`
    test: `expectOne`, `flush` a canned TVMaze response, assert the
    mapped `Show`, and `verify()` in `afterEach` that nothing leaked.
  - `src/app/core/guards/auth.guard.spec.ts` — `signedInGuard` tested
    with `TestBed.runInInjectionContext`, both signed-in (`true`) and
    signed-out (a `UrlTree` redirect) outcomes, no real navigation.

## What's new for Day 25

Day 25 adds no production feature and no new spec file to this starter —
it's a lab day. You'll add your own spec files (and read/fix a
deliberately broken one) directly in your own copy of this project as
you work through the Safety Net Lab, then spend Act 2 planning the
capstone project that starts on Day 26.

## Verify before you start Day 25

- [ ] `npm install` finishes with no ERESOLVE error.
- [ ] `npm test` runs and shows passing specs for `RecentlyViewedService`,
      `ShowCard`, `ShowsService`, and `signedInGuard`, alongside the
      Day 23 specs (`toShow`, `TimeAgoPipe`, `noShouting`).
- [ ] `npm start` runs, and Show Detail still records a recently-viewed
      entry when you open a show.
- [ ] You can find your project's coverage command
      (`ng test -- --coverage`, see Day 23's stretch task) even if you
      haven't run it yet — Day 25 Act 1 uses it as a map, not a score.

## Project layout

```
src/environments/environment.ts   YOUR Firebase config goes here
src/app/
  models/show.ts                   Show, TvMazeShow, toShow() adapter
  utils/binge-level.ts             pure function, tested since Day 24
  validators/review-validators.ts  noShouting(), a pure ValidatorFn
  pipes/runtime.pipe.ts
  pipes/rating-badge.pipe.ts
  pipes/time-ago.pipe.ts
  core/shows.service.ts
  core/shows.service.spec.ts        NEW — HttpTestingController
  core/watchlist.service.ts
  core/reviews.service.ts
  core/auth.service.ts
  core/featured.service.ts
  core/announcements.service.ts
  core/recently-viewed.service.ts
  core/recently-viewed.service.spec.ts  NEW — a fresh TestBed instance
  core/guards/watchlist.guard.ts
  core/guards/auth.guard.ts
  core/guards/auth.guard.spec.ts    NEW — runInInjectionContext
  shared/show-card.ts
  shared/show-card.spec.ts          NEW — input/DOM/DI-fake contract test
  pages/browse/browse.ts
  pages/suggest/suggest.ts
  pages/show-detail/show-detail.ts  today's "test the real app" target
  pages/stats/stats.ts
  pages/watchlist/watchlist.ts
  pages/not-found/not-found.ts
  app.ts
public/favicon.ico
```
