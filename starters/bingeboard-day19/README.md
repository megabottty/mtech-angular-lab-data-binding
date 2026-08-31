# BingeBoard — Day 19 Starting Point

A real, runnable Angular 21 app in the exact state Day 18 left it. This is
the **first starter in this course that needs a manual step before it does
anything Firestore-related** — every day before this one worked with
nothing more than `npm install && npm start`. Not today.

## Run it

```bash
npm install
```

**Then, before `npm start`:** open `src/environments/environment.ts` and
paste in your own Firebase project's config from Day 18 (Firebase Console
→ Project Settings → Your apps → Web app). The placeholder values that
ship in this file will let the app *build*, but every Firestore call will
fail at runtime until you do this.

```bash
npm start
```

Then open the URL `ng serve` prints (usually `http://localhost:4200`).

## What already works

- **Browse** (`/`) — the full Day 16 typeahead pipeline with Day 17's
  formatting pipes, plus Day 18's **"Shows of the week" panel**, reading
  your own `shows-of-the-week` collection live.
- **An announcements banner** in the app shell (every page) — Day 18 lab's
  full solo rep, reading your own `announcements` collection, sorted
  newest-first, with `Timestamp.toDate()` correctly converted before the
  `date` pipe touches it.
- **Suggest a Show** (`/suggest`), **Show Detail** (`/show/:id`),
  **Watchlist** (`/watchlist`), **Stats** (`/stats`), and a real **404**
  page — all unchanged from Day 18.

## What's deliberately *not* here

- **Day 18 lab Task 4** (the `effect()`-driven "just updated" flash) —
  stretch task, same treatment as this course's other optional stretches.
- **Day 18 Act 3's buggy snippets** — those were throwaway debugging
  examples, not code meant to carry forward; `FeaturedService` here already
  reflects the correct, "after" version.

## What Day 19 adds

Everything Firestore-related so far has been read-only. Day 19 completes
the other three CRUD verbs — Create, Update, Delete — and migrates
`WatchlistService` from `localStorage` to Firestore, keeping its exact
public surface so nothing else in the app has to change.

## Verify before you start Day 19

- [ ] You've pasted your own Firebase config into `environment.ts` — not
      still the placeholder values.
- [ ] Browse's "Shows of the week" panel shows your real documents.
- [ ] The announcements banner at the top of every page shows your real
      messages with correctly formatted dates (not a runtime error).
- [ ] Search "office" on Browse and see results with formatted runtime
      and rating badges.
- [ ] Visit a nonsense URL and see the real 404 page.

If any of those fail, fix them before layering Day 19 on top — most
failures at this point trace back to the config paste-in above.

## Project layout

```
src/environments/environment.ts   YOUR Firebase config goes here
src/app/
  models/show.ts
  pipes/runtime.pipe.ts
  pipes/rating-badge.pipe.ts
  core/shows.service.ts
  core/watchlist.service.ts        still localStorage-backed -- Day 19 migrates this
  core/featured.service.ts         Day 18 Act 2 -- live read #1
  core/announcements.service.ts    Day 18 lab -- live read #2, sorted
  core/guards/watchlist.guard.ts
  shared/show-card.ts
  pages/browse/browse.ts           search + "Shows of the week"
  pages/suggest/suggest.ts
  pages/show-detail/show-detail.ts
  pages/stats/stats.ts
  pages/watchlist/watchlist.ts
  pages/not-found/not-found.ts
  app.ts                           announcements banner lives here
```
