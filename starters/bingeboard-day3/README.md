# BingeBoard — Day 3 Starter

This is the state of the BingeBoard project at the **end of Day 2**, so you
can jump straight into Day 3 without retyping Day 2's build-along and lab.

## What already works (from Day 2)

- The project itself: scaffolded fresh via `ng new bingeboard` (Day 2 Act 1),
  replacing the Day 1 `job-tracker` project entirely.
- A `ShowCard` component (`src/app/show-card/`) generated with
  `ng generate component show-card`, rendered from `app.ts`.
- **Property binding** (Act 1): the poster image (`[src]`, `[alt]`) and the
  title/rating are bound from plain class properties (`title`, `imageUrl`,
  `rating`).
- **Event binding** (Act 2): a "Mark as watched" button calls
  `toggleWatched()`, which flips the `watched` boolean.
- **Class and style binding** (Act 2): `[class.watched]` dims the card and
  adds a checkmark; `[style.borderColor]` turns the border green once
  watched.
- **Hype meter** (Lab Task 1): a `hype` counter that increments on
  double-click and adds a `.hot` class at 5+.
- **Reset button** (Lab Task 2): resets `hype` to 0, disabled when it's
  already 0.
- **Two cards** (Lab Task 3): `app.ts` renders `<app-show-card />` twice, to
  show that each component instance owns its own state independently.

## What Day 3 adds

Day 3 converts `ShowCard`'s plain properties (`watched`, `hype` /
`episodesWatched`) into **signals**, and introduces `computed()`,
`effect()`, and `linkedSignal()`. None of that is in this starter yet —
that's what you'll build across Day 3's Acts and Lab.

## Verify before you start

```bash
npm install
npm start
```

Then open http://localhost:4200 and confirm:

- [ ] Two show cards render side by side, each with a poster, title, and
      rating.
- [ ] Clicking "Mark as watched" on one card dims only that card and turns
      its border green — the other card is unaffected.
- [ ] Double-clicking the 🔥 button increments its own card's hype count,
      and the card gets a red glow once hype reaches 5.
- [ ] "Reset hype" is disabled at 0 and clears the count back to 0 when
      hype is above 0.

If any of those don't work, go back to Day 2's Acts/Lab before starting
Day 3 — Day 3 assumes this exact state.
