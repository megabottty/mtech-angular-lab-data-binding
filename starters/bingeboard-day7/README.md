# BingeBoard — Day 7 starting point

This is BingeBoard exactly as it stands at the **end of Day 6**. Clone it,
install, run, and you are ready to start Day 7 without retyping six days of
work.

```bash
npm install
npm start
```

Then open http://localhost:4200.

## What already works

- **Day 2** — the project itself, plus a `ShowCard` rendering one hardcoded
  show with interpolation and property/event binding.
- **Day 3** — all card state is signal-based: `signal()`, `computed()`,
  `effect()`, and a `linkedSignal()` for the season picker.
- **Day 4** — a `shows` array of 8 real shows rendered with `@for` /
  `track` / `@empty`, `@if` / `@else`, a `@switch` genre badge, and a live
  filter bar (search + genre + sort) built on `[(ngModel)]` and one
  `computed()`.
- **Day 5** — `ShowCard` is a real reusable component: `input.required<Show>()`,
  a `compact` and `alreadyAdded` input, an `addToWatchlist` output, and a
  two-way `myRating` model. `RatingStars` and `WatchlistPanel` came out of
  the same day. `App` owns the `watchlist` and `ratings` state.
- **Day 6** — a reusable `Panel` component built on `<ng-content>`, with a
  multi-slot `[panel-actions]` header slot and its own collapse toggle.
  `WatchlistPanel` projects a custom empty state. Global CSS custom
  properties, a real card grid, a sticky header bar, and hover polish.

## What Day 7 adds

Day 7 is about **services and dependency injection** — giving state a home
that is not a component:

- A `WatchlistService` that owns the watchlist array and its rules, with a
  private writable signal exposed through `asReadonly()`.
- `inject()`, and what `providedIn: 'root'` actually means.
- Proving the singleton: a `Header` component showing a live watchlist
  count, sharing state with the cards through nothing but the service.
- In the lab: a `RecentlyViewedService`, and `localStorage` persistence so
  the watchlist survives a refresh.

## Verify before you start

Click through these before Act 1 — if any fail, the day will not line up.

- ✅ Eight show cards render in a responsive grid.
- ✅ Typing in the filter box narrows the list live.
- ✅ The genre and sort dropdowns work, and **Clear filters** (in the
  Browse panel's header) resets them.
- ✅ "Add to watchlist" moves a show into the watchlist panel, and the
  button becomes disabled for that show.
- ✅ The ✕ button in the watchlist panel removes a show.
- ✅ With an empty watchlist, you see "Nothing yet - go browse all 8
  shows!" — that text lives in `app.html`, projected into `WatchlistPanel`.
- ✅ The ▾ button in either panel header collapses and expands that panel.

If something is broken, go back to the day and act that built it rather
than patching it here.

## A deliberate omission

Day 6's Act 2 had you add `console.log` calls to `ShowCard`'s `ngOnInit`
and `ngOnDestroy`, and Lab task 3 had you add a "seconds on screen" ticker.
Those were **lifecycle proofs, not product features** — they exist to make
birth and death visible in the console, and eight cards logging every
second gets noisy fast. They are intentionally not carried into this
starter. If you still have them in your own copy, deleting them now is the
right call.
