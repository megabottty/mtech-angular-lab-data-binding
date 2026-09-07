# BingeBoard — Day 12 starting point

This carries forward the validated reactive-forms BingeBoard from Day 11.
The review form has per-field, cross-field, and list validation with
accessible, timely feedback. Clone it, install, run, and you are ready to
compare that reactive form to template-driven and signal forms.

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
- **Day 10** — a `Review` model and a signal-based `ReviewsService`; a
  standalone `ReviewForm` built with `FormBuilder`, `[formGroup]`, and
  `formControlName`, with no validation attached yet; reviews render on the
  show detail page with a spoiler reveal toggle and a friendly empty
  state; two quick-fill buttons (`10/10, loved it` and `👍 Recommend`); a
  live headline character count.

## What Day 11 added

- `Validators.required`/`min`/`max`/`maxLength`/`minLength` on the review
  form's fields.
- Reading control state (`valid`, `errors`, `touched`, `dirty`) to show
  timely, actionable error messages.
- A custom `noShouting` validator, a cross-field spoilers rule, and a
  repeatable `FormArray` of tags with array-level validation.
- A failed-submit error summary that marks controls touched and explains
  what needs attention.

## What Day 12 adds

- A small template-driven newsletter form and a docs-led signal-forms
  comparison.
- A Suggest-a-show feature using a lazy-loaded route, read-only signal
  service state, validation, newest-first rendering, and an empty state.

## Verify before you start

- ✅ Eight show cards render on the page.
- ✅ Search, genre, sort, rating, and watchlist actions work.
- ✅ The header badge updates when you add or remove a show.
- ✅ The watchlist survives a browser refresh.
- ✅ `/browse` links to `/show/:id` detail pages with prev/next nav.
- ✅ `/stats` is redirected to Browse until the watchlist has an item.
- ✅ A show detail page renders `ReviewForm` above a "Reviews" section.
- ✅ Submitting a review appears immediately in that show's own review list.
- ✅ A spoiler review's body stays hidden until you click "Reveal review."
- ✅ Both quick-fill buttons ("10/10, loved it" and "👍 Recommend") work.
- ✅ Typing into headline updates a live "n/60 characters" count.
- ✅ An empty or invalid review shows timely, specific feedback after you
  interact with a field or attempt to submit.
- ✅ Add up to five unique tags; a duplicate or over-limit tag list blocks
  submission.
- ✅ Checking "Contains spoilers" requires a body with at least 50
  characters.
