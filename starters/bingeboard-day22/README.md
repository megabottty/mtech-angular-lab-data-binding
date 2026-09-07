# BingeBoard — Day 22 Starting Point

A real, runnable Angular 21 app in the exact state Day 21 left it. Like
the prior starters, this one needs your own Firebase config pasted into
`environment.ts` before anything Firebase-related works.

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
- **Day 21 — real users:**
  - `AuthService` wraps Google sign-in/out and exposes the current user as
    a signal (`undefined` while booting, then `User | null`).
  - The header shows all three states: checking, signed out (Sign in with
    Google), and signed in (avatar, name, Sign out).
  - Every watchlist document carries an `ownerId`; `WatchlistService` reads
    a per-user Firestore query built with `switchMap` over the auth
    signal, so signing out empties the list and each account sees only
    its own entries.
  - `/watchlist`, `/stats`, and `/suggest` are behind `signedInGuard`,
    which preserves the requested URL as a `returnUrl` query param.
  - **Day 21 lab Task 1:** reviews carry `ownerId`, `authorName`, and
    `authorPhoto`; each review renders its author, and only the author
    sees a Delete button (`ReviewsService.delete()`).
  - **Day 21 lab Task 2:** signed-out visitors see an inline "Sign in to…"
    nudge instead of a dead or hidden Add to Watchlist button or review
    form, on both Browse's `ShowCard` and Show Detail.
  - **Day 21 lab Task 3:** signing in from a guard redirect returns you to
    the page you originally requested (the app shell reads `returnUrl`
    after `signIn()` resolves).
  - Firestore rules are expected to already be locked down per Day 21 Act 3
    (owner-only watchlist writes, authenticated-create reviews, author-only
    review delete, read-only curated collections) — deploy them from the
    Firebase console before testing permission-denied paths.

## What's deliberately *not* here

- **Day 21 lab Task 4** (the `/profile` page) — stretch task, same
  treatment as this course's other optional stretches.

## What Day 22 adds

Everything above only runs on `localhost` so far. Day 22 produces a real
production build (`ng build`), adds a `development` environment file so
`ng serve` and `ng build` can differ, and deploys the result to Firebase
Hosting with the SPA rewrite that makes deep links and refreshes work on
a public URL — paying off Day 8's "why does refreshing `/browse` work on
the dev server?" question for real infrastructure.

## Verify before you start Day 22

- [ ] You've pasted your own Firebase config into `environment.ts` and
      enabled the Google provider in the console.
- [ ] Sign in with Google; the header shows your avatar and name.
- [ ] Add a show to your watchlist while signed in, then sign out and
      confirm the watchlist empties in the header/badge.
- [ ] Visit `/watchlist` while signed out and confirm you're redirected,
      then sign in and land back on `/watchlist`.
- [ ] Post a review and confirm your name/avatar appear on it, with a
      Delete button only on your own review.

## Project layout

```
src/environments/environment.ts   YOUR Firebase config goes here
src/app/
  models/show.ts
  pipes/runtime.pipe.ts
  pipes/rating-badge.pipe.ts
  pipes/time-ago.pipe.ts
  core/shows.service.ts
  core/watchlist.service.ts        per-user query as of Day 21
  core/reviews.service.ts          authored reviews + delete as of Day 21
  core/auth.service.ts             Day 21 Act 1
  core/featured.service.ts
  core/announcements.service.ts
  core/guards/watchlist.guard.ts
  core/guards/auth.guard.ts        Day 21 Act 2 + Lab Task 3
  shared/show-card.ts               sign-in nudge as of Day 21 lab
  pages/browse/browse.ts
  pages/suggest/suggest.ts
  pages/show-detail/show-detail.ts  author identity, delete, sign-in nudge
  pages/stats/stats.ts
  pages/watchlist/watchlist.ts
  pages/not-found/not-found.ts
  app.ts                            three-state header + return-URL handoff
```
