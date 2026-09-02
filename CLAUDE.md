# mtech-angular-lab-data-binding

An interactive, step-by-step Angular tutorial site for beginners, built **in Angular** so
students can inspect the source of the site they're learning from. The course now spans
**Days 5, 9, 13–20**, moving from control flow and two-way binding through routing, HTTP,
RxJS, pipes, and three days of Firebase/Firestore.

## Commands

```bash
npm install
npm start           # ng serve, http://localhost:4200
npm run build       # ng build -> dist/mtech/browser
npm run watch       # ng build --watch --configuration development
npm test            # ng test (Vitest via @angular/build:unit-test)
```

Run a single spec: `ng test --include=src/app/app.spec.ts` (globs work too, e.g.
`--include=src/app/pages/**/*.spec.ts`).

**Known pre-existing test failure:** `app.spec.ts`'s "should render title" fails on a clean
checkout — that one is expected. Any *other* failure is real.

No ESLint config exists; `prettier` is a devDependency but there's no committed
`.prettierrc` — match the formatting already present in the file you're editing.

## Stack

Angular 21 (standalone components, signals), `@angular/fire` 20 / `firebase` 12, RxJS 7.8,
`highlight.js` for code samples, TypeScript 5.9, Vitest for tests.

## Firebase / environments

The app depends on `src/environments/environment.ts` and `environment.prod.ts` (both
gitignored) exporting a `firebaseConfig` object and a `teacherUid` string. Copy
`src/environments/environment.example.ts` to create them locally — the app will not
build/serve without these files present. `teacherUid` gates the `/dashboard` route (see
`core/guards/teacher.guard.ts`) and the sidebar's teacher nav section (see
`shell-layout.component.ts`).

## Shape of the site

| Day | Topic | Pages |
|---|---|---|
| 5 | Control Flow & Two-Way Binding | `/lesson/1`–`/lesson/5` (legacy path; acts 1–4 + lab) |
| 9 | Routing II — Params, Navigation, Guards & Lazy Loading | `/day9/act1`–`act4` + `/day9/lab` |
| 13 | HTTP I — Real Data from a Real API | `/day13/act1`–`act4` + `/day13/lab` |
| 14 | HTTP II — Errors, Resilience & `httpResource` | `/day14/act1`–`act3` + `/day14/lab` |
| 15 | RxJS I — Streams, Operators & Living with Signals | `/day15/start` + `act1`–`act3` + `lab` |
| 16 | RxJS II — `switchMap` & the Live Search Every App Needs | `/day16/start` + `act1`–`act3` + `lab` |
| 17 | Pipes + The Great Refactor Lab | `/day17/start` + `act1`–`act2` + `lab` (**2 acts, not 3 — intentional**) |
| 18 | Firebase I — A Real Database | `/day18/start` + `act1`–`act3` + `lab` |
| 19 | Firebase II — Full CRUD | `/day19/start` + `act1`–`act3` + `lab` |
| 20 | Firebase III — Queries, Ordering & a First Look at Security Rules | `/day20/start` + `act1`–`act3` + `lab` |

Notes:
- Day 5 lives at the legacy `/lesson/N` path, not `/day5/...`.
- Days 15–20 each have a `/dayN/start` page and a matching `starters/bingeboard-dayN/`
  runnable project; Days 5–14 do not.

## Architecture

- **Routing** (`app.routes.ts`): all routes are lazy-loaded (`loadComponent`) and nested
  under a single `ShellLayoutComponent` (sidebar + topbar shell).
- **Auth** (`core/services/auth.service.ts`): wraps `@angular/fire/auth` Google sign-in.
  Exposes a signal-based `user` (via `toSignal`) and getters (`isLoggedIn`, `uid`,
  `displayName`, `photoUrl`). Always go through this service rather than injecting `Auth`
  directly in components.
- **Progress tracking** (`core/services/progress.service.ts`): tracks which lesson-step
  IDs a signed-in user has completed, persisted to Firestore under `progress/{uid}`. Uses
  an `effect()` in the constructor to reload progress whenever `AuthService`'s user
  changes. Firestore writes always merge (`setDoc(..., { merge: true })`) and go through
  this service — components never call Firestore APIs directly.
- **Starter code** (`starters/`): each teaching day from Day 15 onward has a matching
  `starters/bingeboard-dayN/` — a small, self-contained Angular project (own
  `package.json`/`angular.json`, `npm install && npm start`) holding the exact
  end-of-previous-day state, so a student can start the day without retyping prior days.
  It's surfaced through that day's `/dayN/start` page.

## The invariants that break silently

Each of these has caused a real, silent bug in this repo before — treat them as load-bearing:

1. **`ALL_STEPS` exists in two places** — `src/app/layout/shell-layout.component.ts` (drives
   the progress bar) and `src/app/pages/dashboard/dashboard.component.ts` (teacher stats).
   The two arrays must stay membership-identical (order can differ) whenever a step is
   added or removed.
2. **`stepId`s are a persistence key**, not a label. Pattern: `dN-actM-topic` for acts,
   `dN-lab-topic` for lab tasks (or `actN-topic` for the legacy Day 5 pages). They're
   stored in Firestore at `progress/{uid}.completedSteps` — **never rename a shipped
   stepId**; it silently orphans saved student progress.
3. **`shell-layout.component.spec.ts`** checks the sidebar in three separate places:
   the list of day-group ids, each day's item count, and — in a *different* `it()` block —
   a hardcoded total `.day-group-header` count. All three need updating together when
   `DAY_GROUPS` changes; the last one has been missed before.
4. **`/dayN/start` pages carry no `stepId`s** and must stay out of `ALL_STEPS` — they're
   setup pages, not graded lesson steps.
5. **Literal `{{ }}` in lesson prose** must use Angular's string-literal escape hatch
   (`<code>{{ "{{ show().runtime }}" }}</code>`), not HTML entities — entities decode back
   into real braces before Angular's template compiler runs and fail the build with
   `NG5002`/`NG8004`. Full detail in the skill referenced below (§4).

## Conventions

- All components are **standalone** with **inline `template`/`styles`** (no separate
  `.html`/`.css` files) — intentional, so lesson content and markup live together.
- State uses Angular **signals** (`signal()`, `computed()`, `effect()`, `toSignal()`), not
  `BehaviorSubject`/manual subscriptions. New components should follow this, not introduce
  RxJS state management.
- Angular's `@for`/`@if`/`@switch` control-flow syntax is used throughout, not
  `*ngFor`/`*ngIf`, consistent with what the lessons themselves teach.
- Lesson pages are built from shared components in `shared/components/`: `app-lesson-step`
  (numbered step with completion toggle), `app-code-block` (syntax-highlighted, copy
  button), `app-collapsible` (hint/answer/deep-dive panels), `app-mental-model-card`
  (concept → plain-English → analogy). Reuse these rather than writing one-off markup.
- Code samples shown to students are plain string properties on the component class (e.g.
  `forSolution`, `trackAnswer`), fed into `<app-code-block [code]="..." lang="...">`. Name
  them descriptively after what they demonstrate, not `code1`/`code2`.

## Agent setup — how work on this repo is done

- **`.claude/skills/new-teaching-day/SKILL.md`** is the canonical, non-optional procedure
  for adding or converting a teaching day: starter project → `/dayN/start` page → acts →
  lab → a five-file wiring checklist (`app.routes.ts`, `shell-layout.component.ts`'s
  `DAY_GROUPS`/`ALL_STEPS`, `dashboard.component.ts`'s `ALL_STEPS`,
  `shell-layout.component.spec.ts`, `landing.component.ts`) → verification steps. Invoke it
  with `/new-teaching-day` rather than reproducing the pattern by eye from an existing day —
  it encodes gotchas (escaping rules, the spec's hidden third assertion, starter-copying
  rules for what does/doesn't carry forward from a prior day's lab) that aren't obvious
  from reading one example day.
- **`.github/copilot-instructions.md`** documents the same architecture for GitHub
  Copilot. Keep it in sync with this file when the architecture changes — they should
  never disagree about routes, `ALL_STEPS`, or the wiring checklist.
- **Voice rules** for all student-facing copy: second person only (never "students",
  "instructor", "the class", "out loud"); every "Think About It" answer is hidden behind
  an `<app-collapsible>`, never inline; straight quotes only, no curly `" "`/`' '`;
  difficulty badges are `🟡 Easy` / `⚡ Medium` / `🔴 Hard`. Full voice and template-order
  rules live in the skill above — this file only summarizes.
