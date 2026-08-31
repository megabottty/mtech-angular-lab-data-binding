# BingeBoard — Day 18 Starting Point

A real, runnable Angular 21 app in the exact state Day 17 left it. This is
what "copy the working lab code into your project" produces, already typed
and wired, so you can start Day 18 without retyping Days 9, 13, 14, 15, 16,
and 17.

## Run it

```bash
npm install
npm start
```

Then open the URL `ng serve` prints (usually `http://localhost:4200`).

## What already works

- **Browse** (`/`) — the full Day 16 typeahead pipeline, plus Day 17's
  `runtime` and `ratingBadge` pipes formatting every card's runtime and
  rating instead of showing raw numbers.
- **Suggest a Show** (`/suggest`) — the same typeahead shape rebuilt solo.
- **Show Detail** (`/show/:id`) — two independent `httpResource()`s, a
  graceful `404` for a genuinely missing show.
- **Watchlist** (`/watchlist`) — guarded by `hasWatchlistGuard`.
- **Stats** (`/stats`) — a live ticker and a Top Rated Shows list.
- **A real 404 page** — any unmatched URL now shows a real "That page
  doesn't exist" screen instead of a blank one (Day 17 lab, Tier 3).

## What's deliberately *not* here

Day 17's lab had four tiers; only Tier 1's pipes and Tier 3's 404 page
carried forward as concrete code:
- **`timeAgo` pipe** — Day 17 described it against a "reviews" feature
  that was never actually built in this course's real code, only referenced
  hypothetically in lecture prose. Day 18 is where a real timestamp shows
  up for the first time (`announcements`), and it's handled there instead.
- **Tier 2 (debt paydown)** — a self-audit with nothing concrete to apply
  to an already-clean reference starter.
- **Tier 4 (the `highlight` pipe stretch)** — an explicit stretch task with
  two valid, divergent conclusions (a sanitized pipe vs. a component
  pivot) — same treatment as this course's other optional stretch tasks.

## What Day 18 adds

Everything so far has stored data either in memory, in `localStorage`, or
fetched read-only from TVMaze. Day 18 is where BingeBoard gets a real cloud
database — Firestore, via AngularFire — and you'll set up **your own**
Firebase project to do it. That setup is personal to you and can't be
pre-provisioned in this starter; the lesson itself walks you through it.

## Verify before you start Day 18

- [ ] Search "office" on Browse and see results with formatted runtime
      (e.g. "1h 2m") and a rating verdict (e.g. "Certified banger") on
      each card.
- [ ] Visit a nonsense URL like `/this-page-does-not-exist` and see the
      real 404 page.
- [ ] Visit `/stats` and confirm the ticker and Top Rated list both work.
- [ ] Have a Google account ready — Day 18 has you create your own
      Firebase project, so you'll need to be signed in to
      console.firebase.google.com.

If any of the app checks fail, something in this starter or your
environment is off — fix it before layering Day 18 on top.

## Project layout

```
src/app/
  models/show.ts               Show, TvMazeShow, TvMazeSearchResult, TvMazeEpisode, toShow()
  pipes/runtime.pipe.ts         Day 17 Act 2 — minutes -> "1h 2m"
  pipes/rating-badge.pipe.ts    Day 17 lab Tier 1 — number -> verdict string
  core/shows.service.ts         search(), byId(), episodes(), topRated()
  core/watchlist.service.ts     localStorage-backed watchlist
  core/guards/watchlist.guard.ts
  shared/show-card.ts           the card Browse renders per result
  pages/browse/browse.ts        the full Day 16 typeahead pipeline + '/' shortcut
  pages/suggest/suggest.ts      the same pipeline shape, solo rebuild
  pages/show-detail/show-detail.ts
  pages/stats/stats.ts          ticker + top-rated list
  pages/watchlist/watchlist.ts
  pages/not-found/not-found.ts  the ** wildcard 404 page
```
