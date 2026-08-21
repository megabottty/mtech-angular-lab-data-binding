import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day15-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 15 · Act 2 of 3</span>
        <h1>🔀 Operators in the Wild</h1>
        <p class="subtitle">The code you already wrote — finally explained line by line.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Distinguish RxJS stream operators from JavaScript Array methods, read the <code>async</code> pipe fluently, and articulate precisely when signals are the right tool versus when Observables are the right tool.</li>
          <li><strong>Why It Matters:</strong> Every existing Angular codebase you touch will have <code>| async</code>, <code>.pipe(map(...))</code>, and Observable-heavy services. Reading that code confidently — without confusing the two <code>map</code>s — is a professional baseline.</li>
          <li><strong>Build Steps:</strong> Re-examine Day 13's real <code>search()</code> with full annotation → walk the async pipe lifecycle → settle the Signals-vs-Observables question head-on.</li>
          <li><strong>Expected Outcome:</strong> You can identify which <code>map</code> is the RxJS operator and which is the Array method on the same line, explain what <code>| async</code> does and when not to use it for new code, and give a precise example of something that must be modeled as a stream.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 — Operators in the Wild</p>
        <p><strong>Next step:</strong> Act 3 — building a live ticker and top-rated list that put these ideas to work.</p>
      </section>

      <!-- ─── Step 1: map on real work ─── -->
      <app-lesson-step stepId="d15-act2-map-real-work" [stepNumber]="1" title="Yesterday's Magic, Today's Vocabulary">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>
          You have been looking at this line since Day 13 and it has been doing real work for BingeBoard ever since.
          Now that you understand what <code>.pipe()</code> is and what RxJS operators are, let us read it together
          slowly and name every part out loud.
        </p>
        <p>
          Here is the exact <code>search()</code> method from <code>ShowsService</code>, unchanged from Day 13:
        </p>
        <app-code-block lang="typescript" [code]="searchMethodCode" />
        <p>
          There are <strong>two different things named <code>map</code></strong> on that single line, and this
          confuses everyone at least once. Let us label them explicitly so there is no ambiguity:
        </p>
        <app-code-block lang="typescript" [code]="twoMapsAnnotatedCode" />
        <p>
          The <strong>outer <code>map</code></strong> — the one passed to <code>.pipe()</code> — is an
          <em>RxJS stream operator</em>. It transforms the single value that the HTTP Observable eventually
          emits. The HTTP call delivers one big emission: a <code>TvMazeSearchResult[]</code> array.
          The RxJS <code>map</code> operator intercepts that emission and converts it into something else
          before passing it downstream. It operates on the <em>stream level</em> — on what comes out of the
          Observable.
        </p>
        <p>
          The <strong>inner <code>map</code></strong> — <code>results.map(r =&gt; toShow(r.show))</code> —
          is the plain JavaScript <em>Array method</em> you have known since before Angular existed.
          It runs synchronously, right now, on the array that arrived as the emission's value,
          and it converts each <code>TvMazeSearchResult</code> wrapper into our clean <code>Show</code> shape.
          It operates on the <em>value level</em> — on the contents of that one array.
        </p>
        <p>
          So reading inside-out: the RxJS <code>map</code> says "whenever the HTTP Observable delivers
          something, run this function on it." That function receives the full results array and then
          immediately turns the JavaScript <code>Array.map()</code> crank to adapt each item.
          Two jobs, two <code>map</code>s, each at a completely different layer.
        </p>
        <div class="think-about-it">
          <p class="tai-q">How would you explain, to someone who has never seen this line before, why there are two <code>.map(...)</code> calls stacked here and what each one is doing?</p>
          <p class="tai-a">The outer <code>map</code> is the RxJS stream operator: it tells Angular "when the HTTP Observable fires its one emission — an array from TVMaze — run this transformation function on that emitted value before anyone downstream receives it." The inner <code>map</code> is the JavaScript Array method: once the stream operator hands us that array, we iterate over it synchronously and convert each raw <code>TvMazeSearchResult</code> wrapper into BingeBoard's own <code>Show</code> shape using the <code>toShow</code> adapter. The outer one operates at the stream level (what the Observable emits), the inner one operates at the data level (each item inside what was emitted) — completely different jobs that happen to share the same four-letter name.</p>
        </div>
        <div class="info-box">
          <strong>Good news:</strong> this two-layer pattern is extremely common in real Angular codebases. Once you see it clearly once, you will never confuse the two <code>map</code>s again. The presence of <code>.pipe()</code> is always your signal that you are in RxJS operator territory.
        </div>
        <app-collapsible icon="🧩" label="Deep Dive — The same line, fully expanded line-by-line">
          <p>If you unpack the one-liner into verbose form, every step becomes obvious:</p>
          <app-code-block lang="typescript" [code]="expandedSearchCode" />
          <p>
            <code>rawSearch$</code> is the lazy Observable from HttpClient — nothing has happened yet.
            The RxJS <code>map</code> operator transforms its future emission inside <code>.pipe()</code>.
            That transformation function receives the emitted array, then runs the JavaScript
            <code>Array.map()</code> to adapt each element.
            The compact one-liner is just these three steps written inline.
          </p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can point at a line containing <code>.pipe(map(results =&gt; results.map(...)))</code> and explain out loud — with distinct labels — what the outer <code>map</code> does versus what the inner <code>map</code> does.</div>
      </app-lesson-step>

      <!-- ─── Step 2: async pipe ─── -->
      <app-lesson-step stepId="d15-act2-async-pipe" [stepNumber]="2" title="The async Pipe — For Reading Legacy Code">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>
          Before <code>toSignal</code> and <code>httpResource</code> existed, Angular teams had a different
          leak-proof workhorse for connecting Observables to templates: the <code>async</code> pipe.
          You will encounter it in every existing Angular codebase you touch, so you need to read it fluently —
          even if you are writing <code>toSignal</code> in new code.
        </p>
        <p>
          The pattern looks like this. In the component class, you simply hold the Observable in a field
          without subscribing to it yourself:
        </p>
        <app-code-block lang="typescript" [code]="asyncPipeClassCode" />
        <p>Then the template does the subscribing, re-rendering, and cleanup for you:</p>
        <app-code-block lang="html" [code]="asyncPipeTemplateCode" />
        <p>
          Let us be precise about what <code>| async</code> actually does, because the template syntax
          is deceptively compact. When Angular first evaluates the bound expression, the pipe subscribes
          to the Observable. Every time the Observable emits a new value, the pipe triggers
          change detection and the template re-renders with the new value. When the component is destroyed,
          the pipe automatically unsubscribes — no <code>takeUntilDestroyed</code>, no explicit cleanup,
          no memory leak. That is why teams called it the leak-proof workhorse: it was the standard
          lifecycle-safe option for roughly half a decade before signals arrived.
        </p>
        <p>
          Position clearly: <strong>you will see this pattern in every existing Angular codebase you touch.
          Read it fluently. For new code, prefer <code>toSignal</code> or <code>httpResource</code>.</strong>
        </p>
        <div class="think-about-it">
          <p class="tai-q">If <code>| async</code> already prevents memory leaks automatically — just like <code>toSignal</code> does — why does this lesson recommend <code>toSignal</code> and <code>httpResource</code> for new code instead?</p>
          <p class="tai-a">The leak prevention is similar, but the tradeoffs differ in important ways. First, <code>| async</code> only works inside templates — you cannot build a <code>computed()</code> signal on top of the value, or read the current result from TypeScript code outside the template. Second, there is a subtle re-subscription bug: if you write <code>*ngIf="search('office') | async as shows"</code> inline (calling the function in the template expression instead of storing it in a field), Angular re-subscribes every time change detection runs, firing a fresh HTTP request on every cycle. Third, <code>toSignal</code> integrates with the rest of a signals-based component — you can derive computeds, combine values, and read them synchronously — whereas <code>async</code> pipe values live only in the template's local binding scope. These are real technical tradeoffs, not a "async pipe is broken" story.</p>
        </div>
        <div class="warning-box">
          <strong>The inline-expression trap:</strong> always store the Observable in a class field
          (<code>shows$ = this.showsSvc.search('office')</code>), then bind that field in the template.
          Never call a method directly in the template expression like
          <code>(showsSvc.search('office') | async)</code> — that creates a new subscription
          on every change-detection cycle.
        </div>
        <app-collapsible icon="💡" label="Hint — Reading the as keyword">
          <p>
            The <code>&#64;if (shows$ | async; as shows)</code> syntax means: "subscribe to <code>shows$</code>;
            when it emits a non-null value, bind that value to the local variable <code>shows</code> inside
            this block." It is Angular's built-in null-guarding + local-variable pattern for Observables in templates.
          </p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can read a template using <code>| async</code>, explain the three things it does (subscribe, re-render, unsubscribe), and explain why <code>toSignal</code> is preferred in new signals-based components.</div>
      </app-lesson-step>

      <!-- ─── Step 3: Signals vs. Observables ─── -->
      <app-lesson-step stepId="d15-act2-signals-vs-observables" [stepNumber]="3" title="Signals vs. Observables — Different Axes, Not Better/Worse">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>
          Students reliably ask this question, and it deserves a precise, head-on answer:
          <em>"Why do Observables exist at all if signals are better?"</em>
          The honest answer is that signals are not universally better — they solve fundamentally different problems.
        </p>
        <p>
          <strong>Signals model state.</strong> A signal holds a current value you can read synchronously,
          right now, at any moment. It always answers the question "what is the value at this instant?"
          Component state — loading flags, selected items, form input values, the current show id —
          is a perfect fit for signals. The value exists; you read it.
        </p>
        <p>
          <strong>Observables model events over time.</strong> An Observable represents a sequence of
          things that may happen — zero times, once, many times, or never. It answers the question
          "what has happened, and what will happen next?" HTTP responses are the entry-level example:
          one emission, eventually. But the deeper value of Observables is for genuinely time-based
          streams where there is no single "current value," only a sequence of discrete occurrences.
        </p>
        <p>
          Angular uses each where it fits: component state goes to signals; HTTP reads are increasingly
          served by <code>httpResource</code> (which bridges the two); but genuinely event-driven streams —
          router navigation events, WebSocket messages, UI event streams like keystrokes — remain
          naturally Observable, because there is no single "current keystroke" to hold in a signal.
        </p>
        <app-code-block lang="typescript" [code]="signalsVsObservablesCode" />
        <div class="think-about-it">
          <p class="tai-q">Give one example of something that must be modeled as a stream of events over time, and explain why a signal alone could not represent it as naturally.</p>
          <p class="tai-a">Keystrokes in a search box are a canonical example. Each keystroke is a discrete event that fires at a moment in time. With an Observable, you can use operators like <code>debounceTime(300)</code> to wait for the user to pause, <code>distinctUntilChanged()</code> to skip re-firing for the same value, and <code>switchMap()</code> to cancel the previous HTTP request when a new term arrives — a sequence of coordinated time-based logic. A signal can only hold "the current value of the input field." It cannot naturally represent "the last three keystrokes that arrived within 300 ms" or "cancel any in-flight search when a new keystroke arrives" — those are temporal relationships between events, which is exactly what Observables model.</p>
        </div>
        <div class="info-box">
          <strong>The framing to internalize:</strong> "not better/worse — different axes."
          Signals are a synchronous state container. Observables are an asynchronous event sequence.
          <code>toSignal()</code> and <code>takeUntilDestroyed()</code> are exactly the bridge between
          the two worlds — they let you consume an Observable's events and land them into signal state,
          so the rest of your component can reason synchronously.
        </div>
        <app-collapsible icon="🧩" label="Deep Dive — The debounced search pipeline, annotated">
          <p>
            Here is what the keystroke example looks like fully wired with RxJS operators.
            This is Day 15 Act 3 territory, but seeing it here gives the mental model concrete shape:
          </p>
          <app-code-block lang="typescript" [code]="debouncedSearchCode" />
          <p>
            A signal holding the current input value triggers the Observable pipeline via
            <code>toObservable()</code>. Each operator applies a transformation or timing rule.
            <code>toSignal()</code> at the end lands the result back into signal space for the template.
            Neither piece alone would handle all three concerns: signals own the "current value,"
            Observables own the "time-based coordination," and the interop utilities bridge them.
          </p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state the precise difference between signals (state) and Observables (events over time), give a concrete example of each, and explain why "toSignal" is a bridge, not a replacement.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day15/act1" class="btn-secondary">← Act 1: Observables &amp; the Stream Mental Model</a>
        <a routerLink="/day15/act3" class="btn-primary">Act 3: Building the Live Ticker →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'map (RxJS operator)',
      plainEnglish: 'Transforms each value the stream emits before passing it downstream.',
      analogy: '🏭 A machine on a conveyor belt that relabels every box that passes through.'
    },
    {
      concept: 'map (Array method)',
      plainEnglish: 'Transforms each element of an array, synchronously, all at once, right now.',
      analogy: '🧺 Sorting an entire basket of apples in one go before putting them on the shelf.'
    },
    {
      concept: 'async pipe',
      plainEnglish: 'Template syntax that subscribes to an Observable, re-renders on each emission, and unsubscribes automatically when the component is destroyed.',
      analogy: '🍱 An auto-refilling display case — it keeps itself fresh and cleans up when the shop closes.'
    },
    {
      concept: 'Signal vs. Observable',
      plainEnglish: 'A signal holds a current value (state); an Observable models a sequence of events over time.',
      analogy: '🌡️ A thermostat reading (signal) vs. a weather radio broadcast (Observable) — one tells you now, the other tells you what has been happening.'
    }
  ];

  // ── Step 1 code blocks ──────────────────────────────────────────────────

  searchMethodCode = `// ShowsService — exactly as written in Day 13
search(query: string) {
  return this.http
    .get<TvMazeSearchResult[]>(\`\${this.base}/search/shows\`, { params: { q: query } })
    .pipe(map(results => results.map(r => toShow(r.show))));
}`;

  twoMapsAnnotatedCode = `// OUTER map ──────────────────────────────────────────────────────────────
//   This is the RxJS stream operator imported from 'rxjs'.
//   It wraps the Observable: "when the HTTP call emits its value, run this
//   function on that value before passing it to the subscriber."
//
// INNER map ──────────────────────────────────────────────────────────────
//   This is the plain JavaScript Array.prototype.map() method.
//   It runs synchronously inside the transformation function, converting
//   each TvMazeSearchResult item into our app's Show shape.

.pipe(
  map(           // <── OUTER: RxJS operator — acts on the stream emission
    results =>   //     receives the TvMazeSearchResult[] array
      results.map(  // <── INNER: Array method — acts on each element
        r => toShow(r.show)
      )
  )
)`;

  expandedSearchCode = `search(query: string) {
  // Step 1 — lazy Observable from HttpClient; nothing fires yet
  const rawSearch$ = this.http
    .get<TvMazeSearchResult[]>(\`\${this.base}/search/shows\`, { params: { q: query } });

  // Step 2 — RxJS stream operator: transform the future emission
  const adapted$ = rawSearch$.pipe(
    map((results: TvMazeSearchResult[]) => {
      // Step 3 — JavaScript Array method: adapt each element in the array
      return results.map((r: TvMazeSearchResult) => toShow(r.show));
    })
  );

  return adapted$; // still lazy — nothing has happened until .subscribe()
}`;

  // ── Step 2 code blocks ──────────────────────────────────────────────────

  asyncPipeClassCode = `// In the component class — no .subscribe() call needed
export class BrowseOldStyle {
  private showsSvc = inject(ShowsService);

  // Store the Observable in a field — do NOT call .subscribe() yourself.
  // The async pipe in the template will do it for you.
  shows$ = this.showsSvc.search('office');
}`;

  asyncPipeTemplateCode = `<!-- The async pipe subscribes, re-renders on each emission,
     and unsubscribes automatically when the component is destroyed. -->
@if (shows$ | async; as shows) {
  @for (show of shows; track show.id) {
    <app-show-card [show]="show" />
  }
}`;

  // ── Step 3 code blocks ──────────────────────────────────────────────────

  signalsVsObservablesCode = `// ── Signals: state you can read right now ──────────────────────────────
loading = signal(false);          // Is the page loading? Read it any time.
selectedId = signal<number>(1);   // Which show is selected? Always has a value.

// ── Observables: events that happen over time ────────────────────────────
// A single HTTP response — one emission, eventually:
show$ = this.showsSvc.byId(1);    // Emits once; no "current value" until it does.

// Router navigation events — may fire many times during the app's life:
// this.router.events is Observable<Event> — each navigation is a discrete occurrence.

// WebSocket messages — fires as often as the server sends data:
// fromEvent(socket, 'message') — each message is an event in a potentially infinite stream.

// ── toSignal: the bridge ─────────────────────────────────────────────────
// Converts an Observable's emissions into signal state so your
// template can reason synchronously about the latest arrived value.
showSignal = toSignal(this.showsSvc.byId(1), { initialValue: undefined });`;

  debouncedSearchCode = `import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

export class Browse {
  private showsSvc = inject(ShowsService);

  // Signal holds the current input value (state)
  searchTerm = signal('');

  // Observable pipeline handles the time-based coordination
  results = toSignal(
    toObservable(this.searchTerm).pipe(
      debounceTime(300),          // wait for the user to pause typing
      distinctUntilChanged(),     // skip if the value did not actually change
      switchMap(term =>           // cancel prior request, start a new one
        term ? this.showsSvc.search(term) : of([])
      )
    ),
    { initialValue: [] as Show[] }
  );
}`;
}
