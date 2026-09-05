# BingeBoard — Day 5 Starter

This is the state of the BingeBoard project at the **end of Day 4**, so you
can jump straight into Day 5 without retyping four days of prior code.

## What already works

- **Day 1/2:** the project itself (`ng new bingeboard`) and a `ShowCard`
  component with property binding for the poster/title/rating, event
  binding for "Mark as watched," and class/style bindings that react to
  it.
- **Day 2 Lab:** a `hype` counter and a disabled-aware "Reset hype" button.
- **Day 3:** `ShowCard` is fully signal-based — `watched` and
  `episodesWatched` as `signal()`s, `minutesWatched`/`hours`/`bingeLevel`
  and the weekly-budget values as `computed()`s, a `linkedSignal()`
  `nextEpisode` that resets when `season` changes, and an `effect()` that
  persists the episode count to `localStorage`.
- **Day 4 Act 1:** `src/app/models/show.ts` (the `Show` interface) and a
  `shows` signal holding 8 real shows, rendered with `@for` + `track` +
  `@empty`.
- **Day 4 Act 2:** an `@if`/`@else` list summary and a `@switch` genre
  badge on every card.
- **Day 4 Act 3:** `FormsModule` + `[(ngModel)]` wired to a `searchTerm`
  signal, with a `filteredShows` computed driving the list.
- **Day 4 Lab:** a genre `<select>` filter, ratings-guard badges
  ("Proceed with caution" / "Certified banger"), a "Showing X of Y shows"
  result count with a Clear-filters empty state, and a sort dropdown —
  all folded into the same `filteredShows` computed.

## What Day 5 adds

Right now `app.html` renders each show as raw `<article class="card">`
markup, and `ShowCard` is a separate component that only ever knows about
one hardcoded show. Day 5 fixes that split: you'll give `ShowCard` an
`input()` so the parent can pass any show into it, an `output()` so the
child can tell the parent when something happened, and a `model()` for
two-way state — then replace the raw markup in the list with
`<app-show-card [show]="show" />`.

## Verify before you start

```bash
npm install
npm start
```

Then open http://localhost:4200 and confirm:

- [ ] Eight show cards render, each with a poster, name, genre, and rating.
- [ ] Typing in the filter box narrows the list as you type.
- [ ] Picking a genre from the dropdown narrows it further, and the two
      filters work together.
- [ ] The "Showing X of Y shows" count updates as you filter.
- [ ] Filtering to something with no matches shows the empty state, and
      "Clear filters" brings the full list back.
- [ ] Switching the sort dropdown to "Sort by rating" reorders the list.
- [ ] Emily in Paris shows "Proceed with caution"; Bluey and Shogun show
      "Certified banger."
- [ ] The watch tracker at the bottom still counts episodes and survives a
      page refresh.

If any of those don't work, go back to Day 4's Acts/Lab before starting
Day 5 — Day 5 assumes this exact state.
