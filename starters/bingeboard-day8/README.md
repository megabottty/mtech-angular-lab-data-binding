# BingeBoard — Day 8 starting point

This is BingeBoard exactly as it stands at the **end of Day 7**. Clone it,
install, run, and you are ready to turn the one-page app into a routed app
without retyping seven days of work.

```bash
npm install
npm start
```

Then open http://localhost:4200.

## What already works

- **Days 2–4** — signal-based show cards, eight real shows, control flow,
  live search, genre filtering, sorting, and two-way binding.
- **Day 5** — reusable `ShowCard`, `RatingStars`, and `WatchlistPanel`
  components using `input()`, `output()`, and `model()`.
- **Day 6** — reusable collapsible `Panel`, content projection, projected
  empty state, component-scoped styling, and a responsive card grid.
- **Day 7** — `WatchlistService` owns the watchlist, `App` and `Header`
  consume the same singleton through `inject()`, and localStorage keeps the
  watchlist after a refresh.

## What Day 8 adds

Day 8 moves this one-page app into four places:

- `/` — Home
- `/browse` — the filterable show list
- `/watchlist` — saved shows
- any unknown URL — a friendly 404

You will create the route table, put `<router-outlet />` in the shell, add
`routerLink` and `routerLinkActive`, and prove that navigation does not reload
the document.

## Verify before you start

- ✅ Eight show cards render on the page.
- ✅ Search, genre, sort, rating, and watchlist actions work.
- ✅ The header badge updates when you add or remove a show.
- ✅ The watchlist survives a browser refresh.
- ✅ The app still has one page right now — there is no router outlet yet.

The last check is intentional. Day 8 starts by turning the working page into a
shell and moving its sections into route components.
