# mtech-angular-lab-data-binding

An interactive, step-by-step Angular tutorial site for beginners — built **in Angular**, so students can inspect the source of the site they're learning from. The course spans **Days 5, 9, 13–20**, each teaching one topic (control flow/two-way binding, routing, HTTP, RxJS, pipes, Firebase/Firestore) through in-page lesson steps, hints, and collapsible answers.

## Commands

```bash
npm install
npm start           # ng serve, http://localhost:4200
npm run build       # ng build -> dist/mtech/browser
npm run watch       # ng build --watch --configuration development
npm test            # ng test (Vitest via @angular/build:unit-test)
```

Run a single spec file: `ng test --include=src/app/app.spec.ts` (glob patterns also work, e.g. `--include=src/app/pages/**/*.spec.ts`).

**Known pre-existing test failure:** `app.spec.ts`'s "should render title" fails on a clean checkout — that one is expected. Any other `npm test` failure is real.

No ESLint config exists; `prettier` is a devDependency but there is no committed `.prettierrc`, so match the formatting already present in the file you're editing.

## Firebase / environments

The app depends on `src/environments/environment.ts` and `environment.prod.ts` (both gitignored), which export a `firebaseConfig` object and a `teacherUid` string. Copy `src/environments/environment.example.ts` to create them locally — the app will not build/serve without these files present. `teacherUid` gates the `/dashboard` route (see `teacher.guard.ts`) and the sidebar's teacher nav section (see `shell-layout.component.ts`).

## Architecture

- **Routing** (`app.routes.ts`): all routes are lazy-loaded (`loadComponent`) and nested under a single `ShellLayoutComponent` (sidebar + topbar shell). Day 5 lives at the legacy `/lesson/1`..`/lesson/5` path; every later day is `/dayN/act1`..`actM` + `/dayN/lab` (Days 15–20 also have `/dayN/start`) for `N` in `9, 13, 14, 15, 16, 17, 18, 19, 20`. `/dashboard` is teacher-only via `teacherGuard`.
- **Auth** (`core/services/auth.service.ts`): wraps `@angular/fire/auth` Google sign-in. Exposes a signal-based `user` (via `toSignal`) and getters (`isLoggedIn`, `uid`, `displayName`, `photoUrl`). Always go through this service rather than injecting `Auth` directly in components.
- **Progress tracking** (`core/services/progress.service.ts`): tracks which lesson-step IDs a signed-in user has completed, persisted to Firestore under `progress/{uid}`. Uses an `effect()` in the constructor to reload progress whenever `AuthService`'s user changes. `ShellLayoutComponent` **and** `dashboard.component.ts` each maintain their own hardcoded `ALL_STEPS` array of every step ID across all lessons — **when adding/removing a lesson step, update `ALL_STEPS` in both files** (membership must match between them; order doesn't matter) to keep the progress bar and teacher dashboard stats accurate.
- **Lesson step IDs**: each `<app-lesson-step stepId="...">` usage must use a unique, stable string ID (pattern: `actN-topic` for Day 5, `dN-actM-topic`/`dN-lab-topic` for every later day, e.g. `act1-for`, `d16-act2-subject-debounce`, `d16-lab-min-viable-query`). These IDs are the persistence key in Firestore and the membership key in both `ALL_STEPS` arrays — don't rename an existing stepId without treating it as a breaking change to saved student progress.
- **Sidebar nav**: `ShellLayoutComponent`'s `DAY_GROUPS` array drives the sidebar accordion for each teaching day. Adding, removing, or reordering an item there requires updating `shell-layout.component.spec.ts` in three places: the expected day-group id list, that day's `dayGroups.find(d => d.id === 'dayN')?.items.length`, and — in a separate `it()` block — a hardcoded total `.day-group-header` count. The last one is easy to miss.
- **Starter code** (`starters/`): each teaching day from **Day 15 onward** has a matching `starters/bingeboard-dayN/` — a small, self-contained Angular project (own `package.json`/`angular.json`, `npm install && npm start`) holding the exact end-of-previous-day state, so a student can start the day without retyping prior days. It's surfaced through a `/dayN/start` page built from the same shared lesson components (`app-code-block`, `app-collapsible`) but with **no `<app-lesson-step>`/`stepId`s** — it's setup, not a graded lesson step, and deliberately stays out of `ALL_STEPS`.
- **Adding a teaching day**: the exact procedure (starter project → `/dayN/start` → acts → lab → the five-file wiring checklist above → verification) is codified in `.claude/skills/new-teaching-day/SKILL.md`. Follow it rather than reproducing the pattern by eye from an existing day — it also covers escaping rules for code samples and literal `{{ }}` in prose.

## Conventions

- All components are **standalone** with **inline `template`/`styles`** (no separate `.html`/`.css` files) — this is intentional so the lesson content, code samples, and UI markup live together in one file per lesson/component.
- State uses Angular **signals** (`signal()`, `computed()`, `effect()`, `toSignal()`), not `BehaviorSubject`/manual subscriptions. New components should follow this pattern rather than introducing RxJS state management.
- Lesson pages (`pages/lesson/actN/*.component.ts`) are built from shared building blocks in `shared/components/`: `app-lesson-step` (numbered step wrapper with a completion toggle), `app-code-block` (syntax-highlighted code with copy button, via `highlight.js`), `app-collapsible` (hint/answer/deep-dive panels), and `app-mental-model-card` (concept → plain-English → analogy summary shown at the top of each lesson). Reuse these instead of writing new one-off markup for lesson content.
- Code samples shown to students are plain string properties on the component class (e.g. `forSolution`, `trackAnswer`), passed into `<app-code-block [code]="..." lang="...">`. Keep new lesson snippets as class properties named descriptively after what they demonstrate, not generic names like `code1`.
- Angular's `@for`/`@if`/`@switch` control-flow syntax is used throughout (not `*ngFor`/`*ngIf`), consistent with what the lessons themselves teach.
- Firestore writes always merge (`setDoc(..., { merge: true })`) and go through `ProgressService` — components never call Firestore APIs directly.
