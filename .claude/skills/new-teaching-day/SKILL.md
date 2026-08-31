---
name: new-teaching-day
description: Build a new self-paced teaching day (starter project + /dayN/start page + acts + lab) for this Angular lesson site, following the exact pattern established for Days 15 and 16. Use whenever the user asks to add, build, or convert a day into a self-paced lab, or gives you raw lecture notes for a day and wants it turned into one.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# /new-teaching-day — Build a new self-paced day

This repo's teaching days (15, 16, and everything after) follow one fixed
pattern. This skill is the reference for reproducing it exactly — read it
fully before writing a single file. Deviating from any numbered rule below
is a bug, not a style choice, unless the source material genuinely doesn't
fit (say so explicitly if you deviate, and why).

Everything here was derived by actually building Days 15 and 16 and fixing
what broke. Treat the "gotchas" callouts as load-bearing, not optional —
they're each things that silently broke before being caught.

## 0. Inputs you need before starting

- The day's raw source material (objectives, warm-up, build-along, lab,
  debug-it, checkpoint — whatever shape it arrives in).
- The previous day's number, so you know what `starters/bingeboard-day(N-1)/`
  already contains.
- A decision on act count: the established days use **3 acts + 1 lab**, but
  a day whose source material is explicitly lighter on lecture and heavier
  on lab (a "half-lecture day") can use fewer acts — don't pad a short
  build-along into a third act just to hit a number. Whatever you choose,
  say so and why in your plan.

If any of this is missing or ambiguous, ask before generating content —
guessing at pedagogical structure produces work that has to be redone.

**When a day introduces an external per-student dependency** (Firebase,
or any future service each student sets up under their own account/
credentials): that day's own starter needs **no wiring for it at all** —
per the rule below, a starter represents the state *before* that day's
Acts run, and installing/configuring the dependency is precisely what
those Acts teach. The *next* day's starter is the one affected: it's the
first that can't ship real working data out of the box (every student's
credentials are different), and needs a placeholder-config pattern
(mirroring this repo's own `src/environments/environment.example.ts`)
plus explicit "fill in your own values" instructions in its `/dayN/start`
page, instead of the fully-live clone-and-run experience every prior
starter gave for free.

## 1. The starter project: `starters/bingeboard-dayN/`

**Rule:** `starters/bingeboard-dayN/` = a copy of
`starters/bingeboard-day(N-1)/`, with day N-1's own deliverables applied on
top:

- Whatever day N-1's **Acts** built or changed in the shared app (e.g. Day
  16's Acts replaced Browse's imperative search with the debounced
  `switchMap` pipeline — so Day 17's starter has that pipeline already in
  place, not the pre-Act1 version).
- Whatever day N-1's **Lab** tasks added to the shared app — but **skip**
  any lab task explicitly presented as a standalone scratch snippet never
  wired into the shared app (Day 15's `LeakyComponent`, Day 16's
  `ReviewForm` stretch task). If a lab task says "hand out this snippet" or
  "not wired into your shared project," it does not belong in the next
  day's starter.

Steps:
1. `cp -R starters/bingeboard-day(N-1)/ starters/bingeboard-dayN/`, strip
   `node_modules/`, `dist/`, `.angular/`, `package-lock.json`.
2. Rename `"name"` in `package.json` to `bingeboard-dayN-starter`.
3. Apply the deltas above to the specific files that change. Everything
   else carries over byte-for-byte.
4. Rewrite `README.md`: what already works (one bullet per prior day's
   contribution), what today's day adds, a "Verify before you start"
   checklist.
5. **Verify it for real** — `cd` in, `npm install`, `npm run build`. Fix
   errors before writing a single lesson page; the starter is the
   foundation everything else assumes works.
6. `rm -f package-lock.json` after the install (never commit it — students
   run their own `npm i`).

## 2. The `/dayN/start` page

New `src/app/pages/dayN/start/start.component.ts`, class `DayNStartComponent`.
Same shared imports as an act (`RouterLink`, `CodeBlockComponent`,
`CollapsibleComponent`) but **no** `LessonStepComponent` and **no**
`stepId`s anywhere on this page — it's setup, not a graded step, and must
stay invisible to `ALL_STEPS`.

Structure, top to bottom:
1. `page-header` — `<span class="act-label">Day N · Starting Point</span>`.
2. `info-box` — "Two ways to get there."
3. `lesson-framework` **"Option A — Run the starter (fastest)"**: clone
   command as an `<app-code-block>` class field, install/run steps, a link
   to `starters/bingeboard-dayN` on GitHub.
4. `lesson-framework` **"Option B — Bring your own project"**: every
   starter file, grouped by folder under an `<h4>`, each wrapped in
   `<app-collapsible icon="📄" label="path/to/file.ts">` containing an
   `<app-code-block lang="typescript" [code]="...">`. Generate these class
   fields programmatically (see §6 — do not hand-transcribe files, it's
   how escaping bugs happen) rather than retyping the starter's source.
5. `lesson-framework` **"What this code already does"** — one bullet per
   prior day.
6. `lesson-framework` **"Verify before you start"** —
   `<ul class="task-checklist">` with static `<span class="checkbox">✅</span>`
   items, one per thing a student can click/observe to confirm the starter
   works.
7. `warning-box` — if a check fails, go back to the day/act that built it.
8. `nav-footer` — `← Day (N-1) Lab` / `Act 1: <title> →`.

## 3. Lesson pages (acts + lab) — shared conventions

**Imports** (acts): exactly
`Component, RouterLink, MentalModelCardComponent + MentalModel, CodeBlockComponent, CollapsibleComponent, LessonStepComponent`.
**Imports** (lab): same minus `MentalModelCardComponent` — labs never use
the mental-model card.

**Template order** (acts):
`page-header` → (**Act 1 only**) "Before you start" `info-box` linking to
`/dayN/start` → "📚 Worth reading alongside this act" doc-link `info-box`
→ `<app-mental-model-card [models]="models" />` (4 concepts, each with
`concept`/`plainEnglish`/`analogy`) → `lesson-framework` "Lesson Map"
(Learning Goal / Why It Matters / Build Steps / Expected Outcome) →
`selfguided-panel` (You are here / Next step / **Time:** estimate) →
numbered `<app-lesson-step>`s → `nav-footer`. Acts have **no** `styles`
block.

**Template order** (lab): `page-header` (with
`<span class="act-label lab-label">🛠️ Student Lab</span>`) → `lab-intro`
"🎯 Starting Point" linking to `/dayN/start` → `lesson-framework` "Lab Map"
→ `selfguided-panel` with **Time:** → one `<app-lesson-step>` per
task/tier → `nav-footer` (← last act) → `lesson-framework checkpoint-card`
"Checkpoint" → `completion-card` "🎉 Congratulations!". Labs carry the
57-line lab-only `styles` block verbatim — copy it from any existing lab
file (`.lab-label`, `.lab-intro`, `.task-meta`, `.difficulty.easy/medium/hard`,
`.concepts`, `.task-steps`, `.task-step`, `.step-dot`, `.checkpoint-card`,
`.completion-card`, `.complete-list`). **Gotcha:** forgetting this block
was a real bug once (commit `fd9b978`) — don't retype it, copy it.

**Voice rules** (apply everywhere, no exceptions):
- Every Think About It's answer is **hidden until clicked**:
  `<div class="think-about-it"><p class="tai-q">…</p></div>` immediately
  followed by a sibling `<app-collapsible icon="✅" label="Show Answer — …">`.
  Never put `<p class="tai-a">` inside the `think-about-it` div itself.
- Every `outcome-check` is a concrete, checkable **action**, then a
  "You can …" capability sentence — not knowledge alone. ("You can explain
  X" is not enough by itself; pair it with something the student actually
  did.)
- Second person only. Never "students," "instructor," "the class," "SHOW
  the fix," or "out loud" in a way that implies a live audience — reframe
  as something a solo learner does (a comment, a note to self, silently).
- `Time:` line on every `selfguided-panel`, including the lab's.
- Difficulty badges on lab tasks: `🟡 Easy` / `⚡ Medium` / `🔴 Hard` — not
  `🟢`/`🔴 Challenge` (an earlier, since-corrected style).
- Straight quotes only, no curly `" "` / `' '`.

**stepId rule:** `dN-actM-topic` for acts, `dN-lab-topic` for lab tasks.
Must be globally unique, and once shipped, **never renamed** — it's the
persistence key for saved student progress in Firestore
(`progress/{uid}.completedSteps`).

**Adapting source material that references days this repo doesn't have**
(e.g. notes mentioning "Day 4" or "Day 12" when this repo jumps straight
from Day 9 to Day 13): map to the nearest real equivalent that actually
exists in this repo (check `src/app/pages/` and `ALL_STEPS` for what's real
before assuming a referenced day exists), or — for instructor-only
mechanics like a gap-log spot-check — reframe as something a solo learner
does for themselves.

## 4. Escaping rules (the actual bug class to watch for)

Two different embedding contexts, easy to mix up:

- **Class fields feeding `<app-code-block [code]="...">`**: plain TS
  template literals. Escape only a literal backtick (`` \` ``) and a
  literal `${` (`\${`) if the *sample code itself* contains them (e.g. a
  snippet that itself has a nested template literal). Nothing else needs
  escaping here.
- **Inline `<code>` spans inside the component's own template**: HTML-
  entity-escape `{`→`&#123;`, `}`→`&#125;`, `@`→`&#64;`, `<`→`&lt;`,
  `>`→`&gt;`, `$`→`&#36;`.
- **Gotcha, hit for real on Day 16:** an apostrophe inside a *single-quoted
  TS string* (e.g. a `MentalModel.plainEnglish` value) needs exactly one
  backslash — `keystroke\'s`, not `keystroke\\'s`. Two backslashes is a
  double-escape that produces `\` followed by a string-terminating `'`,
  breaking the file. When in doubt, avoid the apostrophe (rephrase)
  instead of escaping it.
- **Gotcha, hit for real on Day 17 — showing literal `{{ }}` interpolation
  syntax in prose:** entity-escaping each brace individually
  (`&#123;&#123; foo &#125;&#125;`) does **not** work and will fail the
  build with `NG5002`/`NG8004`/`TS2339` errors. HTML entities are decoded
  back into real `{`/`}` characters as part of normal HTML parsing —
  *before* Angular's own template compiler scans that text for
  interpolation delimiters — so `&#123;&#123;` round-trips straight back
  into a real `{{` that Angular then tries to parse and evaluate as an
  expression against the component class.

  The correct escape hatch is Angular's own string-literal trick: type
  **real, unescaped** `{{ }}` delimiters, with the text you want shown
  literally placed *inside them as a quoted string*. To display
  `{{ show().runtime | runtime }}` as inert text, write:
  ```html
  <code>{{ "{{ show().runtime | runtime }}" }}</code>
  ```
  Angular evaluates the string-literal expression between the outer,
  real `{{`/`}}` and renders its text content verbatim — braces and all —
  as inert DOM text. This only applies to *inline prose*; inside a
  code-block class field this never comes up, because that content is
  bound via `[code]` and never re-parsed for interpolation.
- After writing each file, grep it for stray backslashes, for the
  double-brace entity mistake above, and for unescaped special characters
  inside inline `<code>` spans:
  ```bash
  grep -n '\\\\' path/to/file.component.ts
  grep -n '&#123;&#123;\|&#125;&#125;' path/to/file.component.ts
  grep -noE '<code>[^<]*</code>' path/to/file.component.ts \
    | sed 's/<code>//;s/<\/code>//' | grep -E '[{}@$]|Observable<|<[A-Za-z]'
  ```
  All three should return nothing (or only genuinely-intended matches you
  can account for).

## 5. Generating `/dayN/start`'s file-copy fields programmatically

Don't hand-transcribe the starter's files into class-field strings — write
a small Node script that reads each real file, escapes it per §4, and
emits the `field = \`...\`;` block, then splice that into the component
template. This is how Days 15 and 16's start pages were actually built and
it eliminates transcription drift entirely. Sketch:

```js
const files = [{ field: 'appTsCode', file: 'app.ts', label: 'src/app/app.ts' }, /* ... */];
function escapeForTemplateLiteral(src) {
  return src.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}
// read each file relative to starters/bingeboard-dayN/src/app, escape, emit.
```

## 6. The wiring checklist — five files, every single time

Do these in order; each depends on knowing the day's stepIds and route paths.

1. **`src/app/app.routes.ts`** — add one lazy route per page
   (`day(N)/start`, `act1`, `act2`, [`act3`,] `lab`), matching the existing
   `loadComponent: () => import(...).then(m => m.XyzComponent)` shape.
2. **`src/app/layout/shell-layout.component.ts`** — append a `dayN` entry
   to `DAY_GROUPS` (Starting Point + one item per act + lab, `isLab: true`
   on the lab item), and append every new `dN-*` stepId to `ALL_STEPS`.
3. **`src/app/pages/dashboard/dashboard.component.ts`** — append the exact
   same stepIds to its own separate `ALL_STEPS` copy. These two arrays must
   stay byte-identical in content (order can differ, membership can't).
4. **`src/app/layout/shell-layout.component.spec.ts`** — three separate
   things to update, and it is easy to only remember the first:
   - add `'dayN'` to the `dayGroups.map(d => d.id)` expected array,
   - add `component.dayGroups.find(d => d.id === 'dayN')?.items.length`
     with the new day's item count,
   - **bump the hardcoded `.day-group-header` total-count assertion by 1**
     (`expect(el.querySelectorAll('.day-group-header').length).toBe(N)`) —
     this one lives in a *different* `it()` block than the other two and
     was missed once on Day 16.
5. **`src/app/pages/landing/landing.component.ts`** — insert a new
   `<h2 class="day-heading">` + `<p class="day-subheading">` + `.act-cards`
   block immediately after the previous day's closing `</div>`, one
   `.act-card` per page (Starting Point uses `🎬`, lab uses `class="act-card
   lab"` and `🛠️`).

## 7. Verification — run all of these before calling it done

1. Starter: `cd starters/bingeboard-dayN && npm install && npm run build`.
2. Repo root: `npm run build` (confirms every new page compiles *and*
   Angular's template type-checker is happy — this only actually checks
   templates once the pages are wired into routes, so wire first).
3. Repo root: `npm test` — expect exactly one pre-existing, unrelated
   failure (`app.spec.ts`'s "should render title") and nothing else. If
   `shell-layout.component.spec.ts` fails, it's almost always the §6.4
   `.day-group-header` count.
4. Regression grep for leftover instructor voice:
   `grep -rniE "students|instructor|out loud|the class|SHOW the" src/app/pages/dayN/`
   — every hit should be incidental prose, not a direct address.
5. Regression check for curly quotes and stray backslashes (§4).
6. Manual route walk: every page loads, sidebar shows the right item count
   and auto-expands, every Think About It is collapsed by default, every
   code block renders without a leaked `&#123;`-style entity in prose.
