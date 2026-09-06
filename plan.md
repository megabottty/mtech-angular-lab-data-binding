# Teaching day build plan & status

Tracks each self-paced teaching day's implementation status: lesson pages
(acts + lab), starter project, and deployment. See
`.claude/skills/new-teaching-day/SKILL.md` for the pattern every day follows.

| Day | Lesson pages | Starter (`starters/bingeboard-dayN`) | Deployment |
| --- | --- | --- | --- |
| 1–9 | ✅ Shipped | ✅ (Day 1, 3–9; Day 2 has none) | ✅ Committed to `main` |
| **10 — Reactive Forms I: The Review Form** | ✅ Built this pass — `/day10/start`, Act 1 (template-driven vs. reactive, FormGroup/FormControl by hand, FormBuilder), Act 2 (Review model, ReviewsService, ReviewForm + getRawValue()/reset()), Act 3 (reviews on Show Detail, spoiler reveal, quick-fill, 3-bug Debug It), Lab (4 tasks + stretch) | ✅ Built and verified this pass — copy-forward of `bingeboard-day9` plus Day 9's own lab deliverables (prev/next nav, all non-Home/Browse routes lazy-loaded); `npm install && npm run build` verified clean | ⏳ Left in working tree only — not committed or pushed per task instructions |
| 11–12 | — Intentionally does not exist. The curriculum jumps from Day 9 straight to Day 13; Day 10 was the first day filling that gap. Days 11–12 remain unbuilt. | — | — |
| 13–21 | ✅ Shipped (Day 13 predates the `starters/` convention on lesson pages but has its own starter) | ✅ | ✅ Committed to `main` |

## Day 10 notes

- **Scope decision:** 3 acts + 1 lab, matching the standard pattern (not a
  half-lecture day).
- **Starter delta from Day 9:** Day 9's starter already baked in the
  catalog/guard/lazy-route foundation, so the only carry-forward deltas
  applied were Day 9's own **lab** deliverables — prev/next show
  navigation on `ShowDetail`, and converting every route except Home/Browse
  to `loadComponent`. Day 9 lab's guard-then-unguard exercise (Task 3)
  intentionally leaves `/watchlist` unguarded, so no change was needed
  there; the inline not-found state (Task 2) was already present.
- **Day 10's own build (Review model, ReviewsService, ReviewForm) is
  intentionally *not* baked into the `bingeboard-day10` starter** — that's
  what today's Acts build from this starting point, per the skill's
  starter-represents-the-day's-starting-line rule.
- **Downstream days (13–21) were left untouched.** Day 19's lab already
  independently introduces its own from-scratch `ReviewsService`/`Review`
  model as a solo rebuild exercise (predating this insertion); Day 10's
  new Reviews feature is a separate, earlier arc and was not threaded
  forward into the Day 13+ starters or lessons, since the task scope was
  limited to Day 10 itself.
- **Wiring completed:** `app.routes.ts`, `shell-layout.component.ts`
  (`DAY_GROUPS` + `ALL_STEPS`), `dashboard.component.ts` (`ALL_STEPS`),
  `shell-layout.component.spec.ts` (day id list, item count, header count),
  and `landing.component.ts` (new Day 10 section between Day 9 and Day 13).
- **Verification run this pass:** starter `npm install && npm run build`
  (clean, 5 lazy chunks); root `npm run build`; targeted
  `ng test --include=src/app/layout/shell-layout.component.spec.ts`.
