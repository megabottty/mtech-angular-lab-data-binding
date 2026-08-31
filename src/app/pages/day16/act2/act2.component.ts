import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day16-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 16 · Act 2 of 3</span>
        <h1>🎯 Building the Typeahead</h1>
        <p class="subtitle">Five operators, assembled one at a time, produce the search box practically every serious web app ships.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> RxJS's
        <a href="https://rxjs.dev/api/operators/debounceTime" target="_blank" rel="noopener"><code>debounceTime</code></a>
        and
        <a href="https://rxjs.dev/api/operators/distinctUntilChanged" target="_blank" rel="noopener"><code>distinctUntilChanged</code></a>
        reference pages.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Assemble the canonical typeahead pipeline operator by operator — <code>Subject</code>, <code>debounceTime</code>, <code>distinctUntilChanged</code>, <code>switchMap</code>, <code>tap</code> — and place <code>catchError</code> correctly.</li>
          <li><strong>Why It Matters:</strong> This exact five-operator shape (or something extremely close to it) runs the search box of practically every serious web app you've ever used. Building it once, understanding every line, is one of the highest-leverage things you'll do this course.</li>
          <li><strong>Build Steps:</strong> Introduce <code>Subject</code> + debounce + dedupe → add <code>switchMap</code> + loading + the <code>catchError</code>-placement demo → verify under Slow 3G and delete the old plumbing.</li>
          <li><strong>Expected Outcome:</strong> You can build the full typeahead pipeline from memory and explain precisely why <code>catchError</code>'s position inside vs. outside <code>switchMap</code> changes whether one failed search kills the search box forever.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Building the Typeahead)</p>
        <p><strong>Next step:</strong> Act 3 (The Operator Family &amp; Closing the Loop)</p>
        <p><strong>Time:</strong> About 40 minutes. This is the conceptual heart of the day — build incrementally and test after each operator, don't paste the final version and hope.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d16-act2-subject-debounce" [stepNumber]="1" title="A Stream You Push Into — Subject, debounceTime, distinctUntilChanged">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Every stream you've built so far has produced its own values — <code>interval</code> ticks on its
          own, <code>HttpClient</code> emits when the network responds. Today you need a stream whose values
          <em>you</em> push into it by hand, on every keystroke. That's a <code>Subject</code>: both an
          Observable you can subscribe to, and an object with a <code>.next(value)</code> method you call
          yourself to feed it new values.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> replace your Browse component's search wiring with a
          <code>Subject</code> and an <code>onType()</code> method:</p>

        <app-code-block lang="typescript" [code]="subjectDebounceCode" />

        <app-code-block lang="html" [code]="onTypeTemplateCode" />

        <p style="margin-top: 12px;">
          Two new operators, one honest sentence each. <code>debounceTime(300)</code> waits for 300ms of
          silence after the last keystroke before letting a value through — type continuously and nothing
          passes until you pause. <code>distinctUntilChanged()</code> compares each value to the
          <em>previous</em> value that made it through, and drops it if they're identical — so retyping the
          exact same term (or debouncing down to a term you already searched) doesn't fire a duplicate request.
        </p>

        <div class="think-about-it">
          <p class="tai-q">If you typed "office" and then immediately deleted and retyped "office" again within the debounce window, would distinctUntilChanged fire a second request?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — trace what distinctUntilChanged actually compares">
          <p><code>distinctUntilChanged()</code> only compares each value to the single most recent value that passed through it — not to everything ever typed. If "office" already passed through and was the last value seen, then typing "office" again (even after deleting and retyping) produces the identical string, so <code>distinctUntilChanged()</code> drops it and no second request fires. But if something else passed through in between — say you typed "office", then "the bear", then "office" again — the comparison is against "the bear" (the most recent value), not against "office" from earlier, so the second "office" passes through and does fire a request. It's a comparison against the last value, not a full history lookup.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Typing into the search box no longer fires a request per keystroke — open the Network tab and confirm requests only appear about 300ms after you stop typing, and never twice in a row for the identical term.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d16-act2-switchmap-catcherror" [stepNumber]="2" title="switchMap, Loading State, and Where catchError Actually Belongs">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Now connect the debounced, deduped term stream to the actual search — with <code>switchMap</code>,
          exactly as you modeled it in Act 1. Add <code>tap</code> to flip the loading flag as a side effect,
          without touching the values flowing through the pipe. Here is the complete pipeline:
        </p>

        <app-code-block lang="typescript" [code]="fullTypeaheadCode" />

        <p style="margin-top: 12px;">
          Read <code>tap</code> literally as "do this side effect, then pass the value through unchanged." It
          never transforms what flows downstream — it only lets you peek at the stream and react, which is
          exactly what flipping <code>loading</code> needs.
        </p>

        <h4 style="margin-top: 20px;">The subtlest lesson of the day — where catchError goes</h4>

        <p>
          Look closely at where <code>catchError</code> sits in the snippet above: <strong>inside</strong> the
          <code>switchMap</code> projection, wrapped around just <code>this.showsSvc.search(term)</code>. That
          placement is not arbitrary — it is the single most consequential line in this whole pipeline. Compare
          the two placements side by side:
        </p>

        <app-code-block lang="typescript" [code]="catchErrorPlacementCode" />

        <div class="warning-box">
          <strong>Try this yourself:</strong> build the "outside" version, go offline, search once (it fails),
          then go back online and search again. Notice that nothing happens — no request fires, no error,
          nothing. The search box is now permanently broken until the whole component is destroyed and
          recreated (e.g. by navigating away and back).
        </div>

        <div class="think-about-it">
          <p class="tai-q">Why does one failed search permanently kill the "outside" version, but the "inside" version recovers and searches again just fine?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the Observable contract that explains everything">
          <p>
            Every Observable follows one unbreakable contract: it can emit any number of values, and then
            optionally <em>terminate</em> exactly once — either by completing successfully, or by erroring.
            Once an Observable errors, it is permanently done; no further values, ever, to that subscriber.
          </p>
          <p style="margin-top: 12px;">
            In the "outside" version, <code>catchError</code> sits after <code>switchMap</code> on the whole
            composed pipeline. When a search fails, the error propagates up through <code>switchMap</code> into
            that outer pipeline, which then errors. The outer <code>catchError</code> does catch it and
            substitutes a fallback (like <code>of([])</code>) — but that fallback observable emits once and
            <em>completes</em>, and completion is also terminal. The entire pipeline — including the
            <code>debounceTime</code>/<code>distinctUntilChanged</code>/<code>switchMap</code> machinery
            upstream of it — is now finished. Future <code>.next()</code> calls on your <code>Subject</code>
            go nowhere, because nothing is listening anymore.
          </p>
          <p style="margin-top: 12px;">
            In the "inside" version, <code>catchError</code> sits inside the <code>switchMap</code> projection,
            wrapping only that one search's inner Observable. When that inner Observable errors,
            <code>catchError</code> substitutes a fallback for <em>that inner Observable only</em>. The inner
            Observable completes (having recovered), but the <strong>outer</strong> pipeline — the one built
            from your <code>Subject</code>, <code>debounceTime</code>, <code>distinctUntilChanged</code>, and
            <code>switchMap</code> — never saw an error at all, so it's still alive and ready to project a
            brand-new inner Observable the next time you type.
          </p>
        </app-collapsible>

        <div class="info-box">
          <strong>The rule to keep forever:</strong> when a failure should be recoverable — the stream should
          stay alive to try again — put <code>catchError</code> as close to the thing that can fail as
          possible, typically inside a <code>switchMap</code>/<code>mergeMap</code>/<code>concatMap</code>
          projection. Put it on the outer pipeline only when a failure should genuinely end the whole stream.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Build the "outside" version, confirm it breaks the search box permanently after one offline failure, then switch to the "inside" version and confirm a failed search recovers cleanly on the next keystroke.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d16-act2-verify-cleanup" [stepNumber]="3" title="Verify Under Slow 3G, Then Delete the Old Plumbing">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Re-run Act 1's exact torture test: Network tab → Slow 3G → type "severance" briskly. This time, watch
          the Network tab for cancelled requests (every keystroke except your last should show as cancelled),
          and confirm the results on screen always match what you actually finished typing — never a shorter,
          stale prefix.
        </p>

        <p style="margin-top: 12px;">
          Once you've confirmed it, delete Act 1's now-dead code: the old <code>runSearch()</code> method (if
          you haven't already folded its logic into the new pipeline), the <code>(keyup.enter)</code> binding,
          and the standalone Search button's click handler — the <code>Subject</code>-driven pipeline is now
          the only path a search can take.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Kill the throttle and search again on a fast connection. Does the debounce delay feel noticeable? Should it?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — 300ms is a deliberate, felt-but-invisible tradeoff">
          <p>On a fast connection, 300ms is short enough that most users experience it as "results appear right after I stop typing" rather than as a perceptible lag — but it's not zero, and that's intentional. Without any debounce, a fast typist would fire a request per keystroke even on a fast network, wasting bandwidth and hammering the API for queries the user never intended to stop on. 300ms is a common, well-tested default; some products tune it lower (200ms) for a snappier feel or higher (400-500ms) for slower typers or more expensive backend queries. The number is a product decision, not a law of physics — but some non-zero debounce is almost always correct for a live search box.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Under Slow 3G, typing "severance" briskly shows cancelled requests for every prefix except the last, and the final on-screen results always match your actual finished query. The old Enter/click search plumbing is gone from your component.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day16/act1" class="btn-secondary">← Act 1: The Race Condition</a>
        <a routerLink="/day16/act3" class="btn-primary">Act 3: The Operator Family &amp; Closing the Loop →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'Subject',
      plainEnglish: 'A stream you feed values into yourself, by calling .next(value) — our keystroke firehose.',
      analogy: '📢 A megaphone you speak into whenever you want, instead of a radio that broadcasts on its own schedule.'
    },
    {
      concept: 'debounceTime',
      plainEnglish: 'Wait for a pause in activity before letting a value through.',
      analogy: '⏳ An elevator door that waits a beat before closing, in case one more person is coming.'
    },
    {
      concept: 'distinctUntilChanged',
      plainEnglish: 'Drop a value if it is identical to the last one that got through.',
      analogy: '🔁 A bouncer who only turns away someone who just walked in a second ago wearing the exact same outfit.'
    },
    {
      concept: 'catchError placement',
      plainEnglish: 'Catching close to the failure recovers just that attempt; catching far away can end the whole stream.',
      analogy: '🧯 A small fire extinguished in one room vs. evacuating and locking the entire building.'
    }
  ];

  subjectDebounceCode = `import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

export class Browse {
  private searchTerms = new Subject<string>();

  onType(term: string) {
    this.searchTerms.next(term.trim());
  }

  // Building incrementally — this doesn't search yet, just proves the
  // debounce/dedupe stage works. Step 2 adds switchMap.
  constructor() {
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(term => console.log('Would search for:', term));
  }
}`;

  onTypeTemplateCode = `<input placeholder="Search all of television…" (input)="onType(searchInput.value)" #searchInput />`;

  fullTypeaheadCode = `import { Subject, debounceTime, distinctUntilChanged, tap, switchMap, catchError, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { signal } from '@angular/core';

export class Browse {
  private showsSvc = inject(ShowsService);
  private searchTerms = new Subject<string>();

  loading = signal(false);
  error = signal<string | null>(null);

  results = toSignal(
    this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.loading.set(true); this.error.set(null); }),
      switchMap(term =>
        this.showsSvc.search(term).pipe(
          catchError(() => {                                    // <-- INSIDE switchMap
            this.error.set('Search failed — check your connection.');
            return of([]);   // recovers; outer pipeline stays alive
          })
        )
      ),
      tap(() => this.loading.set(false)),
    ),
    { initialValue: [] as Show[] }
  );

  onType(term: string) {
    this.searchTerms.next(term.trim());
  }
}`;

  catchErrorPlacementCode = `// ── INSIDE the switchMap projection — recovers, stream stays alive ──────
switchMap(term =>
  this.showsSvc.search(term).pipe(
    catchError(() => of([]))   // only THIS search recovers
  )
)

// ── OUTSIDE, on the whole composed pipeline — kills it forever ─────────
this.searchTerms.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.showsSvc.search(term)),
  catchError(() => of([]))     // catches once, then the ENTIRE pipeline
)                               // — including debounceTime/distinctUntilChanged —
                                // is complete. No future .next() ever reaches it.`;
}
