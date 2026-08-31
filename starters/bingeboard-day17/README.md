# BingeBoard — Day 17 Starting Point

A real, runnable Angular 21 app in the exact state Day 16 left it. This is
what "copy the working lab code into your project" produces, already typed
and wired, so you can start Day 17 without retyping Days 9, 13, 14, 15, and 16.

## Run it

```bash
npm install
npm start
```

Then open the URL `ng serve` prints (usually `http://localhost:4200`).

## What already works

- **Browse** (`/`) — live-as-you-type search: `Subject` + `debounceTime` +
  `distinctUntilChanged` + `switchMap` (with `catchError` inside the
  projection), race-proof under network throttling, gated so nothing fires
  below 2 characters (Day 16 Acts + lab Tier 1). Press `/` anywhere on the
  page to focus the search box (Day 15 lab).
- **Suggest a Show** (`/suggest`) — the same typeahead shape rebuilt solo:
  type a show name and get "Did you mean *The Office*?" if a close match
  already exists (Day 16 lab's capstone task).
- **Show Detail** (`/show/:id`) — two independent `httpResource()`s (the
  show itself, and its episode list). A real `404` (try id `999999999`)
  shows "That show doesn't exist" instead of the generic connection-error
  message.
- **Watchlist** (`/watchlist`) — guarded by `hasWatchlistGuard`: you can't
  visit it with an empty list. Add a show from Browse or Detail first.
- **Stats** (`/stats`) — a live "you've been on this page for N seconds"
  ticker (`interval` + `toSignal`), and a "Top Rated Shows" list built with
  `ShowsService.topRated()`.

## What Day 17 adds

Nothing here formats a date, a number, or a rating for display — every raw
value renders exactly as the API or a signal produces it. Day 17 is where
you meet built-in pipes (`date`, `number`, `titlecase`), write your first
custom pipe, and then spend most of the day on a structured refactor pass
over everything built so far. No new HTTP or RxJS surface today.

## Verify before you start Day 17

- [ ] Search "office" on Browse and see real results, race-proof under
      Slow 3G throttling.
- [ ] Type a single character on Browse and see the "type at least 2
      characters" hint, with no request fired.
- [ ] Visit `/suggest`, type "office", and see "Did you mean The Office?"
- [ ] Visit `/stats` and confirm the ticker and Top Rated list both work.
- [ ] Visit `/show/999999999` and see "That show doesn't exist."

If any of those don't work, something in this starter or your environment
is off — fix it before layering Day 17 on top.

## Project layout

```
src/app/
  models/show.ts            Show, TvMazeShow, TvMazeSearchResult, TvMazeEpisode, toShow()
  core/shows.service.ts      search(), byId(), episodes(), topRated() — real HttpClient calls
  core/watchlist.service.ts  localStorage-backed watchlist
  core/guards/watchlist.guard.ts
  shared/show-card.ts        the card Browse renders per result
  pages/browse/browse.ts     the full Day 16 typeahead pipeline + '/' shortcut
  pages/suggest/suggest.ts   the same pipeline shape, solo rebuild
  pages/show-detail/show-detail.ts
  pages/stats/stats.ts       ticker + top-rated list
  pages/watchlist/watchlist.ts
```
