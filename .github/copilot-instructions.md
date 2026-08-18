# mtech-angular-lab-data-binding

An interactive, step-by-step Angular tutorial site for beginners — built **in Angular**, so students can inspect the source of the site they're learning from. Each lesson page (`Act 1`–`Act 5`) teaches one Angular concept (`@for`/`track`, `@if`/`@switch`, `[(ngModel)]`, `computed()`/signals) using in-page lesson steps, hints, and collapsible answers.

## Commands

```bash
npm install
npm start           # ng serve, http://localhost:4200
npm run build       # ng build -> dist/mtech/browser
npm run watch       # ng build --watch --configuration development
npm test            # ng test (Vitest via @angular/build:unit-test)
```

Run a single spec file: `ng test --include=src/app/app.spec.ts` (glob patterns also work, e.g. `--include=src/app/pages/**/*.spec.ts`).

No ESLint config exists; `prettier` is a devDependency but there is no committed `.prettierrc`, so match the formatting already present in the file you're editing.

## Firebase / environments

The app depends on `src/environments/environment.ts` and `environment.prod.ts` (both gitignored), which export a `firebaseConfig` object and a `teacherUid` string. Copy `src/environments/environment.example.ts` to create them locally — the app will not build/serve without these files present. `teacherUid` gates the `/dashboard` route (see `teacher.guard.ts`) and the sidebar's teacher nav section (see `shell-layout.component.ts`).

## Architecture

- **Routing** (`app.routes.ts`): all routes are lazy-loaded (`loadComponent`) and nested under a single `ShellLayoutComponent` (sidebar + topbar shell). Lesson pages live at `/lesson/1`..`/lesson/5`; `/dashboard` is teacher-only via `teacherGuard`.
- **Auth** (`core/services/auth.service.ts`): wraps `@angular/fire/auth` Google sign-in. Exposes a signal-based `user` (via `toSignal`) and getters (`isLoggedIn`, `uid`, `displayName`, `photoUrl`). Always go through this service rather than injecting `Auth` directly in components.
- **Progress tracking** (`core/services/progress.service.ts`): tracks which lesson-step IDs a signed-in user has completed, persisted to Firestore under `progress/{uid}`. Uses an `effect()` in the constructor to reload progress whenever `AuthService`'s user changes. `ShellLayoutComponent` maintains a hardcoded `ALL_STEPS` array of every step ID across all lessons to compute overall progress percentage — **when adding/removing a lesson step, update `ALL_STEPS` in `shell-layout.component.ts` to keep the progress bar accurate.**
- **Lesson step IDs**: each `<app-lesson-step stepId="...">` usage must use a unique, stable string ID (pattern: `actN-topic`, e.g. `act1-for`, `act3-twoway`, `lab-task1`). These IDs are the persistence key in Firestore and the membership key in `ALL_STEPS` — don't rename an existing stepId without treating it as a breaking change to saved student progress.

## Conventions

- All components are **standalone** with **inline `template`/`styles`** (no separate `.html`/`.css` files) — this is intentional so the lesson content, code samples, and UI markup live together in one file per lesson/component.
- State uses Angular **signals** (`signal()`, `computed()`, `effect()`, `toSignal()`), not `BehaviorSubject`/manual subscriptions. New components should follow this pattern rather than introducing RxJS state management.
- Lesson pages (`pages/lesson/actN/*.component.ts`) are built from shared building blocks in `shared/components/`: `app-lesson-step` (numbered step wrapper with a completion toggle), `app-code-block` (syntax-highlighted code with copy button, via `highlight.js`), `app-collapsible` (hint/answer/deep-dive panels), and `app-mental-model-card` (concept → plain-English → analogy summary shown at the top of each lesson). Reuse these instead of writing new one-off markup for lesson content.
- Code samples shown to students are plain string properties on the component class (e.g. `forSolution`, `trackAnswer`), passed into `<app-code-block [code]="..." lang="...">`. Keep new lesson snippets as class properties named descriptively after what they demonstrate, not generic names like `code1`.
- Angular's `@for`/`@if`/`@switch` control-flow syntax is used throughout (not `*ngFor`/`*ngIf`), consistent with what the lessons themselves teach.
- Firestore writes always merge (`setDoc(..., { merge: true })`) and go through `ProgressService` — components never call Firestore APIs directly.
