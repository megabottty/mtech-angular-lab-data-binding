# BingeBoard — Day 21 Starting Point

A real, runnable Angular 21 app in the exact state Day 20 left it. Like
the prior starters, this one needs your own Firebase config pasted into
`environment.ts` before anything Firestore-related works.

## Run it

```bash
npm install
```

(The `.npmrc` in this folder sets `legacy-peer-deps=true` — `@angular/fire`'s
latest stable release still peer-declares Angular 20, one version behind
this project's Angular 21. That's a version-lag issue on the library's side,
not a real incompatibility; the flag just tells npm not to block on it.)

**Then, before `npm start`:** open `src/environments/environment.ts` and
paste in your own Firebase project's config from Day 18.

```bash
npm start
```

## What already works

- **Days 9-17:** route params, lazy-loaded pages, route guards, real HTTP,
  `httpResource`, RxJS streams, race-proof typeaheads, and custom pipes.
- **Day 18:** BingeBoard connects to your own Firebase project with live
  Shows of the Week and announcements panels.
- **Day 19:** Watchlist is fully migrated to Firestore:
  `WatchlistService` reads/writes real documents with `add()`/`remove()`/
  `setNote()`/`toggleWatched()` — the old `localStorage`-backed
  `toggle()`/`all()` surface is gone. `ShowCard` and `ShowDetail` call
  `add()`/`remove()` directly now.
- **The Watchlist page** shows each entry's watched checkbox, a note
  input, "Added N days ago" (Day 17's `timeAgo` pipe, finally with real
  data to work on), and a live "N of M watched" count.
- **Day 20:** `ReviewsService.forShow()` is a live, server-side Firestore
  query: it filters each show's reviews, orders newest first, and limits the
  result to 10 instead of downloading the whole collection. Your Firestore
  project may need the composite index Firebase links to in the console.
- Reviews remain Firestore-backed with a form and list on Show Detail.
- Everything else — Browse's typeahead, `/suggest`, `httpResource`-based
  Show Detail, Stats, and the Firebase panels — remains available.

## What Day 21 adds

Day 21 turns this shared demo into a real multi-user app. You will add
Google sign-in, expose Firebase's user stream as a signal, give every
watchlist document an owner, query only the current user's data, guard
private pages, and replace Firestore test mode with ownership rules.

## Verify before you start Day 21

- [ ] You've pasted your own Firebase config into `environment.ts`.
- [ ] Add a show to your watchlist, check it as watched, add a note —
      all three persist after a page reload.
- [ ] Post a review on any show's detail page and see it appear below the
      form, newest first.
- [ ] In the Firebase console, confirm that Day 20's required review query
      index has finished building if Firestore prompted you to create one.

## Project layout

```
src/environments/environment.ts   YOUR Firebase config goes here
src/app/
  models/show.ts
  pipes/runtime.pipe.ts
  pipes/rating-badge.pipe.ts
  pipes/time-ago.pipe.ts           Day 17's pipe, finally in use
  core/shows.service.ts
  core/watchlist.service.ts        Firestore-backed as of Day 19
  core/reviews.service.ts          Day 20 server-side review query
  core/featured.service.ts
  core/announcements.service.ts
  core/guards/watchlist.guard.ts
  shared/show-card.ts
  pages/browse/browse.ts
  pages/suggest/suggest.ts
  pages/show-detail/show-detail.ts  now with a review form + list
  pages/stats/stats.ts
  pages/watchlist/watchlist.ts      watched checkbox, note, timeAgo
  pages/not-found/not-found.ts
  app.ts
```
