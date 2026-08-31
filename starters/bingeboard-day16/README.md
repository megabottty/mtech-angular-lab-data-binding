# BingeBoard — Day 16 Starting Point

A real, runnable Angular 21 app in the exact state Day 15 left it. This is
what "copy the working lab code into your project" produces, already typed
and wired, so you can start Day 16 without retyping Days 9, 13, 14, and 15.

## Run it

```bash
npm install
npm start
```

Then open the URL `ng serve` prints (usually `http://localhost:4200`).

## What already works

- **Browse** (`/`) — live search against the real TVMaze API, fired on Enter
  or a button click (Day 13's three-state template + Day 14's `error` signal
  and Retry button that remembers your last search term). Press `/` anywhere
  on the page to focus the search box (Day 15 lab, Task 4).
- **Show Detail** (`/show/:id`) — two independent `httpResource()`s (the
  show itself, and its episode list) instead of a nested `subscribe()`. A
  real `404` (try id `999999999`) shows "That show doesn't exist" instead of
  the generic connection-error message.
- **Watchlist** (`/watchlist`) — guarded by `hasWatchlistGuard`: you can't
  visit it with an empty list. Add a show from Browse or Detail first.
- **Stats** (`/stats`) — a live "you've been on this page for N seconds"
  ticker built with `interval` + `toSignal` (Day 15 lab, Task 1), and a
  "Top Rated Shows" list built with `ShowsService.topRated()` — a
  `.pipe(map(...))` stream bridged into a signal (Day 15 lab, Task 2).

## What Day 16 adds

Browse's search is still the "old" way: fired imperatively on Enter or a
click, with no debouncing, no cancellation, and — if you throttle your
network and type quickly — a real race condition where a stale response can
overwrite fresher results. Day 16 replaces that entire wiring with a
`Subject` + `debounceTime` + `distinctUntilChanged` + `switchMap` pipeline:
the canonical "live search" pattern almost every serious web app uses.

## Verify before you start Day 16

- [ ] Search "office" on Browse (Enter or click) and see real results.
- [ ] Press `/` anywhere on Browse and confirm the search box gains focus.
- [ ] Visit `/stats` and watch the ticker increment once per second.
- [ ] Confirm the Top Rated list on `/stats` only shows shows rated ≥ 8.
- [ ] Visit `/show/999999999` and see "That show doesn't exist."

If any of those don't work, something in this starter or your environment
is off — fix it before layering Day 16 on top.

## Project layout

```
src/app/
  models/show.ts            Show, TvMazeShow, TvMazeSearchResult, TvMazeEpisode, toShow()
  core/shows.service.ts      search(), byId(), episodes(), topRated() — real HttpClient calls
  core/watchlist.service.ts  localStorage-backed watchlist
  core/guards/watchlist.guard.ts
  shared/show-card.ts        the card Browse renders per result
  pages/browse/browse.ts     imperative search + '/' keyboard shortcut
  pages/show-detail/show-detail.ts
  pages/stats/stats.ts       ticker + top-rated list
  pages/watchlist/watchlist.ts
```
