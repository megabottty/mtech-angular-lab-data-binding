# BingeBoard — Day 20 Starting Point

A real, runnable Angular 21 app in the exact state Day 19 left it. Like
Day 19's starter, this one needs your own Firebase config pasted into
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

- **Watchlist is fully migrated to Firestore** (Day 19's whole point):
  `WatchlistService` reads/writes real documents with `add()`/`remove()`/
  `setNote()`/`toggleWatched()` — the old `localStorage`-backed
  `toggle()`/`all()` surface is gone. `ShowCard` and `ShowDetail` call
  `add()`/`remove()` directly now.
- **The Watchlist page** shows each entry's watched checkbox, a note
  input, "Added N days ago" (Day 17's `timeAgo` pipe, finally with real
  data to work on), and a live "N of M watched" count.
- **Reviews exist for the first time** — `ReviewsService`, built from
  scratch and Firestore-backed, with a review form + list on Show Detail.
  One schema note: this service uses `rating` and `createdAt` fields —
  slightly different from how Day 19's lesson described it (`postedAt`,
  no `rating`) — because Day 20's query work needs to sort by both. If you
  built Day 19's version with different field names, this is a normal
  "the schema grew a field" moment: just rename them in your own project,
  Firestore has no migration to run.
- Everything else — Browse's typeahead, `/suggest`, `httpResource`-based
  Show Detail, Stats, the Firebase panels — unchanged from Day 19.

## What's deliberately *not* here

- **Day 19 lab Task 4** (optimistic UX / pending state on `add()`) —
  stretch task, same treatment as this course's other optional stretches.

## What Day 20 adds

`ReviewsService.forShow()` currently reads the *entire* `reviews`
collection and filters client-side — fine for a handful of reviews, a real
problem at scale. Day 20 replaces that with a real server-side Firestore
query: `where`, `orderBy`, `limit`. You'll also meet your first composite
index error, learn when to query vs. when a `computed()` is enough, and
read (not yet write) real Firestore security rules.

## Verify before you start Day 20

- [ ] You've pasted your own Firebase config into `environment.ts`.
- [ ] Add a show to your watchlist, check it as watched, add a note —
      all three persist after a page reload.
- [ ] The Watchlist page shows "Added just now" (or similar) next to a
      show you just added.
- [ ] Post a review on any show's detail page and see it appear in the
      list below the form.

## A quick favor before Act 1

Day 20's query demos need more than one or two reviews to actually show
anything interesting. Before starting, post 8-10 reviews across 2-3
different shows, with a mix of ratings — either through the review form
you just verified above, or by adding documents directly in the Firestore
console. Act 1 asks you to do exactly this as its first step, so it's fine
to wait and do it there instead.

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
  core/reviews.service.ts          new -- Day 19 lab, built from scratch
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
