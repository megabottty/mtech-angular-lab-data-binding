# BingeBoard — Day 4 Starter

This is the state of the BingeBoard project at the **end of Day 3**, so you
can jump straight into Day 4 without retyping three days of prior code.

## What already works

- **Day 1/2:** the project itself (`ng new bingeboard`), a `ShowCard`
  component rendered twice from `app.ts`, each instance owning its own
  independent state.
- **Day 2 Acts 1-2:** property binding for the poster/title/rating, event
  binding for "Mark as watched," and class/style bindings that react to
  it.
- **Day 2 Lab:** a `hype` counter (double-click to increment, `.hot` class
  at 5+) and a disabled-aware "Reset hype" button.
- **Day 3 Act 1:** `watched` and `episodesWatched` converted from plain
  properties to `signal()`s.
- **Day 3 Act 2:** `minutesWatched` and `hours` as `computed()`s derived
  from `episodesWatched`, read with `()` everywhere they're used.
- **Day 3 Act 3:** a `linkedSignal()`-based `nextEpisode` that resets to 1
  whenever `season` changes.
- **Day 3 Lab:** a `bingeLevel` computed label, a `weeklyBudgetMinutes`
  budget with `minutesRemaining`/`isOverBudget` computeds and an
  over-budget style, and an `effect()` that persists `episodesWatched` to
  `localStorage` (and restores it on load).

## What Day 4 adds

Day 4 moves from one hardcoded `ShowCard` pair to a real, data-driven,
filterable **array** of shows: a `Show` interface, a `shows` signal array,
`@for`/`track`/`@empty`, `@if`/`@else`, `@switch`, and `[(ngModel)]` +
`computed()` for a live search filter. None of that is in this starter yet
— that's what you'll build across Day 4's Acts and Lab.

## Verify before you start

```bash
npm install
npm start
```

Then open http://localhost:4200 and confirm:

- [ ] Two show cards render side by side, each with a poster, title, and
      rating.
- [ ] Clicking "+1 episode" on one card updates its own episode count,
      hours, and binge level — the other card is unaffected.
- [ ] Watching enough episodes to pass 300 minutes flips a card into its
      over-budget style.
- [ ] Clicking "skip" bumps the episode number; clicking "next season →"
      snaps it back to 1.
- [ ] Refreshing the page keeps each card's episode count instead of
      resetting it to zero.

If any of those don't work, go back to Day 3's Acts/Lab before starting
Day 4 — Day 4 assumes this exact state.
