# BingeBoard — Day 6 Starter

This is the state of the BingeBoard project at the **end of Day 5**, so you
can jump straight into Day 6 without retyping five days of prior code.

## What already works

- **Day 1/2:** the project itself (`ng new bingeboard`), plus property,
  event, class, and style bindings on the show card, and a hype counter
  with a disabled-aware reset button.
- **Day 3:** the card is fully signal-based — `signal()` state,
  `computed()` derived values (hours, binge level, weekly budget), a
  `linkedSignal()` that resets when `season` changes, and an `effect()`
  that persists the episode count to `localStorage`.
- **Day 4:** `src/app/models/show.ts`, a `shows` signal holding 8 real
  shows, `@for` + `track` + `@empty`, an `@if`/`@else` summary, `@switch`
  genre badges, ratings-guard badges, and `FormsModule` + `[(ngModel)]`
  driving a combined search / genre / sort `filteredShows` computed with a
  result count and a Clear-filters empty state.
- **Day 5 Act 1:** `ShowCard` takes `show = input.required<Show>()` and
  renders whatever show the parent hands it — the raw `<article>` markup
  is gone from `app.html`.
- **Day 5 Act 2:** `ShowCard` emits `addToWatchlist = output<Show>()`, and
  `App` owns a `watchlist` signal with a duplicate guard.
- **Day 5 Act 3:** a `RatingStars` component built on `model()`, two-way
  bound with `[(rating)]`.
- **Day 5 Lab:** a `WatchlistPanel` component with a `remove` output, an
  optional `compact` input on the card, an `alreadyAdded` input computed
  by the parent from a `watchlistIds` Set, and per-show star ratings held
  in `App` so they survive filtering.

## What Day 6 adds

Day 5 taught you to pass **data** into a component. Day 6 teaches you to
pass **markup** into one: `<ng-content>` and content projection, so you can
build a reusable `Panel` frame that wraps anything. You'll also meet
lifecycle hooks (`ngOnInit`, `ngOnDestroy`) by watching cards get born and
destroyed as you filter, and learn why your component CSS never leaks —
style encapsulation and `:host`.

## Verify before you start

```bash
npm install
npm start
```

Then open http://localhost:4200 and confirm:

- [ ] Eight show cards render, each with a poster, name, genre, and rating.
- [ ] Typing in the filter box, picking a genre, and switching the sort
      dropdown all narrow/reorder the list, and work together.
- [ ] "Add to watchlist" on a card puts it in the watchlist panel at the
      top, and immediately greys out that card's button.
- [ ] Clicking ✕ in the watchlist panel removes the show and re-enables
      the card's button.
- [ ] Clicking a star sets that show's rating, and the rating is still
      there after you filter the card away and bring it back.
- [ ] The episode counter still works and survives a page refresh.

If any of those don't work, go back to Day 5's Acts/Lab before starting
Day 6 — Day 6 assumes this exact state.
