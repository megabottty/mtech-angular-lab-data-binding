# BingeBoard — Day 9 starting point

This carries forward the routed BingeBoard from Day 8 and includes the
catalog, detail-page, guard, and lazy-route foundation used in Day 9. Clone
it, install, run, and you are ready to study how route parameters,
programmatic navigation, guards, and lazy loading fit together.

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
- **Day 7** — `WatchlistService` owns the watchlist, `Header` consumes the
  singleton through `inject()`, and localStorage keeps the watchlist after a
  refresh.
- **Day 8** — Home, Browse, Watchlist, About, and NotFound are routed pages.
  The app is a header/outlet/footer shell with active links and SPA
  navigation.

## What Day 9's foundation adds

- A `ShowsService` catalog and `/show/:id` detail page with input-bound route
  parameters.
- Programmatic navigation, a functional watchlist guard, and a lazy Stats
  route.

## Verify before you start

- ✅ Eight show cards render on the page.
- ✅ Search, genre, sort, rating, and watchlist actions work.
- ✅ The header badge updates when you add or remove a show.
- ✅ The watchlist survives a browser refresh.
- ✅ `/browse` links to `/show/:id` detail pages.
- ✅ `/stats` is redirected to Browse until the watchlist has an item.
- ✅ `/stats` loads as a separate lazy chunk when you visit it.
