# BingeBoard — Day 15 Starting Point

A real, runnable Angular 21 app in the exact state Day 14 left it. This is
what "copy the working Act 3/lab code into your project" produces, already
typed and wired, so you can start Day 15 without retyping Days 9, 13, and 14.

## Run it

```bash
npm install
npm start
```

Then open the URL `ng serve` prints (usually `http://localhost:4200`).

## What already works

- **Browse** (`/`) — live search against the real TVMaze API. Three-state
  template (loading / results / empty-after-search) from Day 13, plus an
  `error` signal and a Retry button that remembers your last search term
  from Day 14.
- **Show Detail** (`/show/:id`) — two independent `httpResource()`s (the
  show itself, and its episode list) instead of a nested `subscribe()`. A
  real `404` (try id `999999999`) shows "That show doesn't exist" instead of
  the generic connection-error message.
- **Watchlist** (`/watchlist`) — guarded by `hasWatchlistGuard`: you can't
  visit it with an empty list. Add a show from Browse or Detail first.
- **Stats** (`/stats`) — intentionally empty. Day 15 is where this page
  gets its first Observable-backed feature.

## What Day 15 adds

Nothing here uses RxJS operators beyond what `HttpClient` and `httpResource`
already do internally. Day 15 is where you meet `interval`, `map`, `filter`,
`toSignal`, `takeUntilDestroyed`, and the async pipe — and where `Stats`
finally gets used for something.

## Verify before you start Day 15

- [ ] Search "office" on Browse and see real results.
- [ ] Open a show's detail page and see its episode count load.
- [ ] Visit `/show/999999999` and see "That show doesn't exist."
- [ ] In DevTools, switch the Network tab to Offline, search again, and see
      the friendly error message — then go back online and click Retry.

If any of those don't work, something in this starter or your environment
is off — fix it before layering Day 15 on top.

## Project layout

```
src/app/
  models/show.ts            Show, TvMazeShow, TvMazeSearchResult, TvMazeEpisode, toShow()
  core/shows.service.ts      search(), byId(), episodes() — real HttpClient calls
  core/watchlist.service.ts  localStorage-backed watchlist
  core/guards/watchlist.guard.ts
  shared/show-card.ts        the card Browse renders per result
  pages/browse/browse.ts
  pages/show-detail/show-detail.ts
  pages/stats/stats.ts
  pages/watchlist/watchlist.ts
```
