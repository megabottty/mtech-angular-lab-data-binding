import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day16-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Ship the Search Every App Needs</h1>
        <p class="subtitle">
          About 55 minutes. 4 tasks. Refine the typeahead, rebuild it solo in a new context, audit its
          honesty under real network conditions, and guard against double-submits.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Get the end-of-Day-16-Acts BingeBoard working before starting — Browse's search should already be
          the <code>Subject</code> + <code>debounceTime</code> + <code>distinctUntilChanged</code> +
          <code>switchMap</code> pipeline from Acts 1-2, with <code>catchError</code> placed inside the
          <code>switchMap</code> projection. If that isn't working yet, finish Act 2 first — this lab builds
          directly on top of it.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Independently extend, rebuild, and audit the typeahead pattern — proving you can reproduce it in a
            new context, not just follow steps someone else worked out.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            The typeahead pattern shows up constantly, but always with small variations — a minimum query
            length here, a duplicate check there, an honesty audit under real network conditions everywhere.
            Today's build-along showed you the pattern once; this lab is where it becomes a habit.
          </li>
          <li>
            <strong>Build Steps:</strong>
            minimum viable query → suggest-a-show duplicate check (solo rebuild) → loading truthfulness audit →
            stretch: exhaustMap double-submit guard.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            You can place operators correctly inside a stream pipeline without a worked example in front of
            you, and defend exactly why each one sits where it does.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 16 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> Task 1 is about 10 minutes. Task 2 is the big one — budget 20-25 minutes, it's the assessment exercise. Task 3 is about 10 minutes. Task 4 is a stretch; skip it if you're short on time.</p>
      </section>

      <app-lesson-step
        stepId="d16-lab-min-viable-query"
        [stepNumber]="'Task 1'"
        title="Minimum Viable Query"
      >
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: <code>filter()</code> placement inside a pipe, gating a stream on a condition, idle vs. empty-result UI states.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Don't search until the trimmed term is at least 2 characters. Below that, clear any existing
          results and show an idle hint ("Type at least 2 characters to search") instead of firing a request
          or showing a stale result set.
        </p>
        <p style="margin-top: 12px;">
          This is a real product requirement, not busywork: a single letter almost never narrows a TV-show
          catalog usefully, and firing a request for every one-character keystroke wastes bandwidth and API
          quota for results nobody wants.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Where should <code>filter()</code> go — before <code>debounceTime</code>, or after it? Try both and see if you can tell the difference.</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — before is strictly better, and here's why">
          <p>
            Both technically work — a too-short term gets blocked either way, and no request ever fires for
            it. But placing <code>filter()</code> <strong>before</strong> <code>debounceTime</code> rejects
            the too-short term immediately, with no wait at all. Placing it <strong>after</strong>
            <code>debounceTime</code> means the pipe still starts a 300ms timer for every short keystroke
            before finally dropping the value — wasted work for a term you already knew was too short the
            instant it arrived. There's no scenario where "after" is better; "before" is strictly more
            efficient and exactly as correct.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a <code>currentTerm = signal('')</code> set immediately (no debounce) inside <code>onType()</code>, alongside the existing <code>this.searchTerms.next(term)</code> call.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add <code>tooShort = computed(() =&gt; this.currentTerm().length &gt; 0 &amp;&amp; this.currentTerm().length &lt; 2)</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Add <code>filter(term =&gt; term.length &gt;= 2)</code> as the very first operator in your search pipeline, before <code>debounceTime</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>In the template, render the idle hint when <code>tooShort()</code> is true, before your existing loading/error/results/empty branches.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Typing a single character shows "Type at least 2 characters to
          search" and fires no network request. Typing a second character clears the hint and searches
          normally after the debounce window. You can place a <code>filter()</code> correctly to gate a
          stream on a condition, with a reason for exactly where it sits.
        </div>

        <app-collapsible icon="💡" label="Hint — keep the idle-hint signal separate from the search pipeline">
          <p>
            Don't try to make the search pipeline itself emit an "idle" state — that mixes two concerns.
            Drive the hint from a plain signal set synchronously in <code>onType()</code>, and let the search
            pipeline stay focused purely on "when do I actually fire a request."
          </p>
          <app-code-block lang="typescript" [code]="task1Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <p>Complete Browse additions — the idle-hint signal, the gated pipeline, and the template branch.</p>
          <h4>TypeScript:</h4>
          <app-code-block lang="typescript" [code]="task1TsAnswer" />
          <h4 style="margin-top: 16px">HTML:</h4>
          <app-code-block lang="html" [code]="task1HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d16-lab-suggest-a-show"
        [stepNumber]="'Task 2'"
        title="Suggest-a-Show Duplicate Check — Full Stack, Solo"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: rebuilding the full typeahead pattern in a brand-new context, from memory, with no worked example in front of you.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A new <code>/suggest</code> feature in your own project: as the user types a show name, check
          TVMaze via <code>ShowsService.search()</code> and, if a close match already exists, show
          "Did you mean <em>The Office (2005)</em>?" instead of letting them submit a duplicate suggestion.
          If nothing close is found, show "No matching show found — looks like a new suggestion!"
        </p>
        <p style="margin-top: 12px;">
          There is intentionally very little hand-holding here — this is the assessment exercise for the
          whole day. You've now built the <code>Subject</code> + <code>debounceTime</code> +
          <code>distinctUntilChanged</code> + <code>switchMap</code> + <code>catchError</code> pipeline once,
          in Browse. Prove you can build the same shape again, on your own, against a different feature and a
          different question ("does a close match exist?" instead of "what are the results?").
        </p>

        <div class="warning-box">
          <strong>This is not fuzzy string matching.</strong> A real "did you mean" feature in production
          would likely use a proper string-similarity algorithm. For today, an honest, simple heuristic is
          the right scope: a case-insensitive exact match, or the typed term appearing as a substring of an
          existing show's name (so typing "office" flags a match against "The Office"). Say so explicitly in
          your own code comments — pretending a heuristic is more sophisticated than it is would be the wrong
          lesson to take from today.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Your new component's pipeline will look extremely similar to Browse's. Is that duplication a problem worth fixing today?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — recognized duplication is not the same as premature abstraction">
          <p>
            Not today, and that's a deliberate call, not laziness. The two pipelines currently do genuinely
            different things — one returns a full result list, the other returns a yes/no-ish "did you mean"
            answer — so extracting a shared helper right now risks building the wrong abstraction before you
            know what actually varies between the two use cases. The right instinct is to notice the
            duplication (you clearly did, since you're asking), and revisit it once a third similar feature
            appears and the real shared shape becomes obvious. Two instances of a pattern is a coincidence
            worth watching; three is usually when extracting a shared utility earns its complexity.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Create a new <code>Suggest</code> component with its own <code>Subject&lt;string&gt;</code>, <code>onType()</code>, and an input bound to it.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Build the same pipe shape as Browse: <code>filter</code> (length ≥ 2) → <code>debounceTime(300)</code> → <code>distinctUntilChanged()</code> → <code>switchMap</code> (search, with <code>catchError</code> inside) → derive the match.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Inside the <code>switchMap</code>, after the search resolves, check the results for a close match using the heuristic above and map to a small result shape like <code>&#123; match: Show | null &#125;</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Render "Did you mean <em>X</em>?" when a match is found, or the "looks like a new suggestion" message when it isn't.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Typing "office" on <code>/suggest</code> shows "Did you mean
          The Office?" (or similar); typing a title that doesn't exist shows the new-suggestion message; the
          whole thing is debounced, deduped, and race-proof under Slow 3G, exactly like Browse. You can
          reproduce the full typeahead pattern from memory in a new context.
        </div>

        <app-collapsible icon="💡" label="Hint — the match-checking heuristic">
          <p>Keep it to one honest, clearly-commented function:</p>
          <app-code-block lang="typescript" [code]="task2Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <p>One complete, reasonable implementation. Yours doesn't need to match exactly — the pipeline shape is what matters.</p>
          <h4>TypeScript:</h4>
          <app-code-block lang="typescript" [code]="task2TsAnswer" />
          <h4 style="margin-top: 16px">HTML:</h4>
          <app-code-block lang="html" [code]="task2HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d16-lab-loading-audit"
        [stepNumber]="'Task 3'"
        title="Loading Truthfulness Audit"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>tap()</code> placement relative to <code>debounceTime</code> and <code>switchMap</code>, honest loading state.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Nothing new to add — this task is an audit. Throttle to Slow 3G, type a longer show title briskly,
          and watch your loading indicator closely. Does it flip on the instant you start typing (before the
          debounce window even elapses), or only once a request has genuinely been sent? Does it ever flash
          off before the response has actually arrived?
        </p>
        <p style="margin-top: 12px;">
          A dishonest loading indicator is worse than none at all — it teaches users to distrust it, the same
          way Day 14 taught you that an eternal spinner is a lie the UI tells.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Below are two placements for the same two <code>tap()</code> calls. Which one is honest, and which one lies?</p>
        </div>
        <app-code-block lang="typescript" [code]="loadingAuditBothCode" />
        <app-collapsible icon="✅" label="Show Answer — Version B is honest, Version A lies">
          <p>
            <strong>Version A is dishonest.</strong> Both <code>tap()</code> calls sit before
            <code>switchMap</code>, squeezed between <code>distinctUntilChanged()</code> and the actual
            request. That means <code>loading</code> flips to <code>true</code> and immediately back to
            <code>false</code> <em>before the request has even been sent</em> — the indicator briefly
            flashes and then disappears while the real network wait is still ahead of it, telling the user
            "done" long before anything is actually done.
          </p>
          <p style="margin-top: 12px;">
            <strong>Version B is honest.</strong> The first <code>tap()</code> (setting <code>loading</code>
            true) sits right before <code>switchMap</code>, so it fires the instant a real search is about to
            start — after debounce and dedupe have already decided this term is worth searching for. The
            second <code>tap()</code> (setting <code>loading</code> false) sits <em>after</em>
            <code>switchMap</code>, inside the same operator chain as the response itself, so it only fires
            once the inner Observable — the real request, or its <code>catchError</code> fallback — has
            actually resolved. The indicator's on/off states now match reality.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Confirm your own pipeline matches Version B, not Version A.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Under Slow 3G, type briskly and confirm the spinner appears only once per settled search, staying visible for the entire real network wait.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Confirm the spinner never appears for keystrokes that get debounced away before a request fires.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Under Slow 3G, the loading indicator appears exactly once per
          settled search term and stays visible for the entire real wait — never flickering on debounced
          keystrokes, never disappearing before the response has arrived. You can place <code>tap()</code>
          calls correctly around a <code>switchMap</code> to keep loading state honest.
        </div>
      </app-lesson-step>

      <app-lesson-step
        stepId="d16-lab-stretch-exhaustmap"
        [stepNumber]="'Task 4 (Stretch)'"
        title="exhaustMap in Anger — the Double-Submit Guard"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: <code>exhaustMap</code>, ignoring triggers while an inner stream is in flight, comparing an operator solution to a hand-rolled boolean guard.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Below is a small, self-contained <code>ReviewForm</code> — not wired into your shared BingeBoard
          project, just a scratch component to practice on. Its submit button currently allows double-posts
          if clicked twice quickly.
        </p>

        <app-code-block lang="typescript" [code]="reviewFormBuggyCode" />

        <p style="margin-top: 12px;">
          <strong>First, prove the bug:</strong> paste this into a scratch component, click "Submit Review"
          twice fast, and watch the console log "Review submitted" twice — two separate in-flight requests,
          both of which will complete.
        </p>

        <div class="think-about-it">
          <p class="tai-q">A simple boolean flag (<code>submitting = false</code>, set true on click, false when the request resolves) would also fix this. Is that an acceptable solution?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — yes, and it's worth comparing side by side">
          <p>
            Yes — a hand-rolled boolean guard is a completely legitimate fix, and if you reached for it
            first, that's a good sign, not a wrong answer. It solves the exact same problem: ignore new
            clicks while one submission is in flight. The operator version's advantage isn't correctness,
            it's composability and consistency — once you have a <code>Subject</code> of submit attempts,
            <code>exhaustMap</code> expresses the same guard declaratively, without a manual flag to
            remember to reset (including remembering to reset it in an error path, which boolean-flag
            versions frequently forget). Both are worth knowing; reach for whichever fits the surrounding
            code's style.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Reproduce the double-post bug first, before fixing anything.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a <code>Subject&lt;string&gt;</code> for submit attempts, and pipe it through <code>exhaustMap</code> instead of calling <code>.subscribe()</code> directly from the click handler.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Guard the subscription with <code>takeUntilDestroyed()</code>, same as any other raw <code>.subscribe()</code> you've built this course.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Click twice fast again and confirm only one "Review submitted" log appears.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Clicking Submit twice fast produces exactly one request and
          one "Review submitted" log, no matter how quickly you double-click. You can apply
          <code>exhaustMap</code> to a real double-submit scenario and explain why it's the right operator
          for this shape, versus <code>switchMap</code> or <code>mergeMap</code>.
        </div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <p>The fixed version, side by side with the bug.</p>
          <app-code-block lang="typescript" [code]="reviewFormFixedCode" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day16/act3" class="btn-secondary">← Act 3: The Operator Family &amp; Closing the Loop</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Live typeahead search on Browse: debounced, deduped, race-proof, and error-resilient — verified under Slow 3G</li>
          <li><span class="checkbox">✅</span> You can narrate the pipeline from memory and say precisely why <code>catchError</code> sits where it does</li>
          <li><span class="checkbox">✅</span> You rebuilt the same pattern solo, against a different question, on <code>/suggest</code></li>
          <li><span class="checkbox">✅</span> You can match all four mapping operators (<code>switchMap</code>/<code>concatMap</code>/<code>mergeMap</code>/<code>exhaustMap</code>) to a new scenario without looking it up</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 16: RxJS II. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Recognize a race condition, name it precisely, and reproduce it on demand under network throttling.</li>
          <li>✅ Build the canonical typeahead: <code>Subject</code> + <code>debounceTime</code> + <code>distinctUntilChanged</code> + <code>switchMap</code>.</li>
          <li>✅ Place <code>catchError</code> correctly and explain why its position changes whether a stream survives a failure.</li>
          <li>✅ Match <code>switchMap</code>/<code>concatMap</code>/<code>mergeMap</code>/<code>exhaustMap</code> to the scenario each one fits.</li>
          <li>✅ Apply <code>switchMap</code> to route params and connect it directly to how <code>httpResource</code> behaves.</li>
          <li>✅ Turn a nested-subscribe pattern into a single clean pipe — and know exactly what to say about it in a code review.</li>
        </ul>
        <a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .lab-label { background: #4ec9b0 !important; color: #1e1e1e !important; }
    .lab-intro {
      background: #1a2e4a;
      border: 1px solid #2a4a7a;
      border-radius: 10px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .lab-intro h3 { color: #82aaff; margin-bottom: 8px; }
    .lab-intro p { font-size: 14px; color: #b0c8e0; }

    .task-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .difficulty {
      font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 12px;
    }
    .difficulty.easy { background: #1a2e1a; color: #4ec9b0; border: 1px solid #2a5c2a; }
    .difficulty.medium { background: #2a2a1a; color: #ff9d00; border: 1px solid #5c4a00; }
    .difficulty.hard { background: #2a1a1a; color: #f44747; border: 1px solid #5c1a1a; }
    .concepts { font-size: 12px; color: #858585; }

    .task-steps { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
    .task-step {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; color: #cccccc;
    }
    .step-dot {
      width: 24px; height: 24px; background: #3e3e42;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 12px; font-weight: 700;
      flex-shrink: 0; color: #4fc3f7;
    }

    .checkpoint-card { margin-top: 32px; }

    .completion-card {
      background: linear-gradient(135deg, #1a2e1a, #0d1f0d);
      border: 2px solid #4ec9b0;
      border-radius: 12px;
      padding: 32px;
      margin-top: 40px;
      text-align: center;
    }
    .completion-card h2 { font-size: 28px; margin-bottom: 12px; }
    .completion-card p { color: #a0d0a0; margin-bottom: 16px; }
    .complete-list {
      list-style: none;
      padding: 0;
      display: inline-block;
      text-align: left;
    }
    .complete-list li {
      padding: 6px 0;
      font-size: 14px;
      color: #c3e88d;
    }
  `]
})
export class Day16LabComponent {
  task1Hint = `// Two separate concerns, kept separate on purpose:
currentTerm = signal('');                                   // drives the idle-hint UI, no debounce
tooShort = computed(() => this.currentTerm().length > 0 && this.currentTerm().length < 2);

onType(term: string) {
  const trimmed = term.trim();
  this.currentTerm.set(trimmed);   // immediate — feeds the hint
  this.searchTerms.next(trimmed);  // debounced — feeds the actual search
}`;

  task1TsAnswer = `private searchTerms = new Subject<string>();

currentTerm = signal('');
tooShort = computed(() => this.currentTerm().length > 0 && this.currentTerm().length < 2);

loading = signal(false);
error = signal<string | null>(null);

results = toSignal(
  this.searchTerms.pipe(
    filter(term => term.length >= 2),        // gate BEFORE debounceTime
    debounceTime(300),
    distinctUntilChanged(),
    tap(() => { this.loading.set(true); this.error.set(null); }),
    switchMap(term =>
      this.showsSvc.search(term).pipe(
        catchError(() => {
          this.error.set('Search failed — check your connection.');
          return of([]);
        })
      )
    ),
    tap(() => this.loading.set(false)),
  ),
  { initialValue: [] as Show[] }
);

onType(term: string) {
  const trimmed = term.trim();
  this.currentTerm.set(trimmed);
  this.searchTerms.next(trimmed);
}`;

  task1HtmlAnswer = `<input placeholder="Search all of television…" (input)="onType(searchInput.value)" #searchInput />

@if (tooShort()) {
  <p class="muted">Type at least 2 characters to search.</p>
} @else if (loading()) {
  <p class="muted">Searching…</p>
} @else if (error()) {
  <div class="error-box"><p>{{ error() }}</p></div>
} @else if (results().length) {
  <div class="grid">
    @for (show of results(); track show.id) {
      <app-show-card [show]="show" />
    }
  </div>
} @else if (currentTerm().length >= 2) {
  <p class="muted">No shows matched. Try another title.</p>
}`;

  task2Hint = `// Honest heuristic, not real fuzzy matching — say so in your own comment too.
function findCloseMatch(typed: string, results: Show[]): Show | null {
  const needle = typed.toLowerCase();
  return results.find(s => {
    const name = s.name.toLowerCase();
    return name === needle || name.includes(needle);
  }) ?? null;
}`;

  task2TsAnswer = `import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, filter, debounceTime, distinctUntilChanged, switchMap, map, catchError, of } from 'rxjs';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';

// Honest heuristic, not real fuzzy string matching (see the Hint above).
function findCloseMatch(typed: string, results: Show[]): Show | null {
  const needle = typed.toLowerCase();
  return results.find(s => {
    const name = s.name.toLowerCase();
    return name === needle || name.includes(needle);
  }) ?? null;
}

@Component({
  selector: 'app-suggest',
  standalone: true,
  templateUrl: './suggest.html',
})
export class Suggest {
  private showsSvc = inject(ShowsService);
  private typedTerms = new Subject<string>();

  currentTerm = signal('');
  tooShort = signal(false);

  match = toSignal(
    this.typedTerms.pipe(
      filter(term => term.length >= 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.showsSvc.search(term).pipe(
          map(results => findCloseMatch(term, results)),
          catchError(() => of(null)),
        )
      ),
    ),
    { initialValue: null as Show | null }
  );

  onType(term: string) {
    const trimmed = term.trim();
    this.currentTerm.set(trimmed);
    this.tooShort.set(trimmed.length > 0 && trimmed.length < 2);
    this.typedTerms.next(trimmed);
  }
}`;

  task2HtmlAnswer = `<input placeholder="Name a show…" (input)="onType(nameInput.value)" #nameInput />

@if (tooShort()) {
  <p class="muted">Type at least 2 characters.</p>
} @else if (currentTerm().length >= 2) {
  @if (match(); as m) {
    <p>Did you mean <em>{{ m.name }}</em>?</p>
  } @else {
    <p class="muted">No matching show found — looks like a new suggestion!</p>
  }
}`;

  loadingAuditBothCode = `// ── Version A ────────────────────────────────────────────────────────
this.searchTerms.pipe(
  filter(term => term.length >= 2),
  debounceTime(300),
  distinctUntilChanged(),
  tap(() => this.loading.set(true)),
  tap(() => this.loading.set(false)),   // <-- both taps before switchMap even starts
  switchMap(term => this.showsSvc.search(term)),
)

// ── Version B ────────────────────────────────────────────────────────
this.searchTerms.pipe(
  filter(term => term.length >= 2),
  debounceTime(300),
  distinctUntilChanged(),
  tap(() => this.loading.set(true)),
  switchMap(term =>
    this.showsSvc.search(term).pipe(catchError(() => of([])))
  ),
  tap(() => this.loading.set(false)),   // <-- fires only once the inner Observable resolves
)`;

  reviewFormBuggyCode = `import { Component, inject } from '@angular/core';
import { ReviewsService } from '../core/reviews.service';   // a small scratch service — POST returns Observable<void>

@Component({
  selector: 'app-review-form',
  standalone: true,
  template: \`
    <textarea #reviewText></textarea>
    <button (click)="submitReview(reviewText.value)">Submit Review</button>
  \`
})
export class ReviewForm {
  private reviewsSvc = inject(ReviewsService);

  submitReview(text: string) {
    // BUG: nothing stops a second click while the first request is still in flight.
    this.reviewsSvc.post(text).subscribe(() => {
      console.log('Review submitted');
    });
  }
}`;

  reviewFormFixedCode = `import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, exhaustMap } from 'rxjs';
import { ReviewsService } from '../core/reviews.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  template: \`
    <textarea #reviewText></textarea>
    <button (click)="submitReview(reviewText.value)">Submit Review</button>
  \`
})
export class ReviewForm {
  private reviewsSvc = inject(ReviewsService);
  private submits = new Subject<string>();

  constructor() {
    this.submits.pipe(
      exhaustMap(text => this.reviewsSvc.post(text)),   // ignores clicks while one POST is in flight
      takeUntilDestroyed(),
    ).subscribe(() => console.log('Review submitted'));
  }

  submitReview(text: string) {
    this.submits.next(text);
  }
}`;
}
