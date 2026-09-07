# BingeBoard — Day 23 Starting Point

A real, runnable Angular 21 app in the exact state Day 22 left it, plus
Day 22's own lab deliverables (real route titles, a favicon, a meta
description, and a clean console). Like the prior starters, this one
needs your own Firebase config pasted into `environment.ts` before
anything Firebase-related works.

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
- **Day 22 — shipped:**
  - Every route has a real, descriptive `title` (Browse, Show, Stats,
    Watchlist, Suggest a Show, 404).
  - `index.html` has a real favicon (`public/favicon.ico`) and a
    `<meta name="description">`.
  - No stray `console.log` calls.
  - The wildcard (`**`) route still renders the in-app 404 page instead of
    a host-level error, the exact thing Day 22's SPA rewrite depends on.

## What's new for Day 23

Two small, real, previously-untested pieces of app logic — today's whole
point is that they were never covered by a single test until now:

- **`src/app/utils/binge-level.ts`** — a plain, exported `bingeLevel()`
  function with no Angular import at all. It's Day 3's lab
  branching logic (0 episodes, 1-4, 5-9, 10+) reborn as a pure function
  against a *real* episode count, wired into Show Detail's episode count
  line (`{{ episodesRes.value().length }} episodes · {{ bingeLevel(...) }}`).
- **`src/app/validators/review-validators.ts`** — Day 11 Act 2's
  `noShouting()` reactive-forms validator, kept as a standalone pure
  function. It isn't wired into today's simpler, template-driven review
  form (that form has no headline field to attach it to), but it's real,
  previously-shipped logic and, like `bingeLevel`, needs no component or
  DOM to test.

Everything already in the app that Day 23 tests but doesn't change:
`RuntimePipe` (`src/app/pipes/runtime.pipe.ts`), `TimeAgoPipe`
(`src/app/pipes/time-ago.pipe.ts`), and the `toShow()` adapter
(`src/app/models/show.ts`).

Day 23 itself adds no new npm dependency to this starter — Act 1 walks
through wiring up the `test` architect target and the `vitest`/`jsdom`
dev dependencies that the main teaching site already uses, entirely in
your own copy of this project.

## Verify before you start Day 23

- [ ] `npm start` runs, and the browser tab title changes per route.
- [ ] The favicon shows in the browser tab.
- [ ] View source (or the Network tab) shows a `<meta name="description">`
      tag in the page head.
- [ ] Visiting a made-up path (e.g. `/nope`) renders the in-app 404 page.
- [ ] Show Detail's episode count line reads like
      `12 episodes · Quick Watch` (the exact wording depends on the show).

## Project layout

```
src/environments/environment.ts   YOUR Firebase config goes here
src/app/
  models/show.ts                   Show, TvMazeShow, toShow() adapter
  utils/binge-level.ts             NEW — pure function, Day 23's first test target
  validators/review-validators.ts  NEW — noShouting(), a pure ValidatorFn
  pipes/runtime.pipe.ts
  pipes/rating-badge.pipe.ts
  pipes/time-ago.pipe.ts
  core/shows.service.ts
  core/watchlist.service.ts
  core/reviews.service.ts
  core/auth.service.ts
  core/featured.service.ts
  core/announcements.service.ts
  core/guards/watchlist.guard.ts
  core/guards/auth.guard.ts
  shared/show-card.ts
  pages/browse/browse.ts
  pages/suggest/suggest.ts
  pages/show-detail/show-detail.ts  now calls bingeLevel() next to the episode count
  pages/stats/stats.ts
  pages/watchlist/watchlist.ts
  pages/not-found/not-found.ts
  app.ts
public/favicon.ico                  Day 22 lab Task 1
```
