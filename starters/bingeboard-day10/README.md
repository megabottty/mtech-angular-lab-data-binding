# BingeBoard — Day 10 starting point

This carries forward the routed BingeBoard from Day 9 and includes the
Day 9 lab's prev/next navigation and fully lazy-loaded route table. Clone
it, install, run, and you are ready to study reactive forms — building a
`ReviewForm` with `FormBuilder`, `[formGroup]`, and `formControlName`.

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
- **Day 9** — a `ShowsService` catalog, a `/show/:id` detail page with
  input-bound route parameters, an inline not-found state, a functional
  watchlist guard on `/stats`, and prev/next navigation between shows.
  Every route except Home and Browse is lazy-loaded.

## What Day 10 adds

- A `Review` model and a signal-based `ReviewsService`.
- A standalone `ReviewForm` built with `FormBuilder`, `[formGroup]`, and
  `formControlName`.
- Reviews rendered on the show detail page, with a spoiler reveal toggle.

## Verify before you start

- ✅ Eight show cards render on the page.
- ✅ Search, genre, sort, rating, and watchlist actions work.
- ✅ The header badge updates when you add or remove a show.
- ✅ The watchlist survives a browser refresh.
- ✅ `/browse` links to `/show/:id` detail pages with prev/next nav.
- ✅ `/stats` is redirected to Browse until the watchlist has an item.
- ✅ Every route except Home and Browse loads as a separate lazy chunk.
