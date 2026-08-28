import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day15-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 15 · Act 1 of 3</span>
        <h1>🌊 The Stream Mental Model</h1>
        <p class="subtitle">Signals hold a current value. Observables model values that arrive over time — and understanding the difference changes how you build everything.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 14's BingeBoard is fully working — real HTTP search and error handling on Browse, and a Detail page built on <code>httpResource</code> with a graceful 404. If that isn't running yet, visit the <a routerLink="/day15/start">Day 15 Starting Point</a> first — it gets you a working copy in minutes, either by cloning a runnable starter or copying the files directly.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's docs on
        <a href="https://angular.dev/ecosystem/rxjs-interop" target="_blank" rel="noopener">RxJS interop</a> —
        the section on <code>toSignal</code> pairs directly with Step 3 below.
      </div>

      <app-mental-model-card [models]="models" />

      <div class="info-box">
        <strong>Warm-up — the loose thread from Day 13:</strong> back then you wrote
        <code>this.http.get&lt;TvMazeSearchResult[]&gt;(...).pipe(map(results =&gt; results.map(r =&gt; toShow(r.show))))</code>
        with only a passing explanation of what <code>.pipe(map(...))</code> actually does.
        Today the box opens. Observables have been present in BingeBoard all along without ceremony —
        every <code>HttpClient</code> call returns one, <code>httpResource</code> wraps one internally,
        and Angular's own router fires one for every URL change. You have been using streams without
        realizing it. Now you will see exactly what they are and why they behave the way they do.
      </div>

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Understand the fundamental distinction between a Signal (current value) and an Observable (values arriving over time), read marble diagrams, and know what "lazy" means for a stream.</li>
          <li><strong>Why It Matters:</strong> Most Angular bugs involving Observables — eternal spinners, stale data, memory leaks — trace back to a confused mental model about when streams start, when they stop, and who is responsible for cleanup.</li>
          <li><strong>Build Steps:</strong> Build the stream mental model → witness the classic navigation-leak bug → learn the two modern fixes that make leaks nearly impossible.</li>
          <li><strong>Expected Outcome:</strong> You can explain what an Observable is, draw a marble diagram, reproduce the classic memory-leak bug, and apply <code>toSignal</code> or <code>takeUntilDestroyed</code> to prevent it.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (The Stream Mental Model)</p>
        <p><strong>Next step:</strong> Act 2 (Operators — Transforming Streams)</p>
        <p><strong>Time:</strong> About 30–35 minutes, including the live leak demo — don't rush past actually watching the console keep ticking.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d15-act1-stream-model" [stepNumber]="1" title="The Core Distinction — Signals vs. Streams">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          A <strong>Signal</strong> is a box. At any moment you can open the box and read whatever is inside —
          one current value, synchronously available right now. That is exactly how BingeBoard's
          <code>shows</code>, <code>loading</code>, and <code>error</code> signals work: you call
          <code>shows()</code> and you instantly get the current array.
        </p>

        <p style="margin-top: 12px;">
          An <strong>Observable</strong> is fundamentally different. It does not hold a value — it
          <em>models values arriving over time</em>. Think of it as a river: the water (values) flows
          continuously, and you decide when to step in and start listening. Some rivers run briefly
          (an HTTP response: one payload, then done). Others run forever (a clock tick, a search-box
          keystroke stream, a WebSocket channel, a router URL change).
        </p>

        <p style="margin-top: 12px;">
          Things that are inherently streams: every keystroke a user types in a search box, every
          tick of a <code>setInterval</code> timer, every WebSocket message arriving from a server,
          every URL change as the user navigates. An HTTP response is a very short stream — one
          value followed by a completion signal — but it is still a stream. That is why
          <code>HttpClient.get()</code> returns an Observable and not a Promise: Angular wanted
          a single, composable primitive for everything time-related, whether it delivers once or
          a thousand times.
        </p>

        <h4 style="margin-top: 20px;">Reading Marble Diagrams</h4>

        <p>
          The RxJS community represents streams as horizontal timelines called <em>marble diagrams</em>.
          Each circle (marble) on the line is one emitted value; the arrow at the right means "still
          running"; a vertical bar means "completed." Here is <code>interval(1000)</code> — it emits
          an incrementing integer every second, forever:
        </p>

        <app-code-block lang="typescript" [code]="marbleDiagramCode" />

        <p style="margin-top: 12px;">
          Now pipe that through a <code>filter</code> (keep only even numbers) and a
          <code>map</code> (format as a label). Each operator transforms what flows downstream —
          the original stream is untouched:
        </p>

        <app-code-block lang="typescript" [code]="marblePipeCode" />

        <p style="margin-top: 12px;">
          The <strong><code>$</code> suffix</strong> (e.g. <code>ticks$</code>, <code>evenSeconds$</code>)
          is a naming convention used by the Angular and RxJS communities to signal "this variable
          holds a stream." TypeScript does not enforce it — it is purely a visual cue for human readers.
          When you see <code>$</code> at the end of a name, your brain should read it as "the
          <code>ticks</code> stream" rather than "the current tick value."
        </p>

        <p style="margin-top: 12px;">
          Notice also that <strong>nothing logs to the console</strong> until the last line —
          the one that calls <code>.subscribe()</code>. This is the single most important trait
          of Observables and the source of endless beginner confusion.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Try it yourself first: why does nothing print to the console until <code>.subscribe()</code> is called?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why nothing runs until subscribe()">
          <p>
            Observables are <em>lazy</em> (or "cold") by default. The pipeline you build with
            <code>.pipe(filter(...), map(...))</code> is purely a <em>description</em> of a
            computation — a blueprint, not a running machine. No timers start, no HTTP requests
            fire, no callbacks execute until someone calls <code>.subscribe()</code>. This is
            intentional: it means you can compose, transform, share, and pass around a stream
            definition freely without incurring any side effects. The moment you subscribe,
            Angular/RxJS "turns on the tap" and the described pipeline starts executing.
            This is also why Day 13's <code>search()</code> appeared to do nothing — without a
            subscriber at the end, the entire HttpClient pipeline was just a blueprint sitting in
            memory.
          </p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — What does 'cold' Observable really mean?">
          <p>
            An Observable is called <em>cold</em> when each subscriber gets its own independent
            execution of the producer logic. If two components both subscribe to the same
            <code>interval(1000)</code> stream, they each get their own separate timer — two
            timers running independently, each starting from zero at the moment of subscription.
            This is in contrast to a <em>hot</em> Observable, where the producer runs regardless
            of how many subscribers exist and latecomers only receive values emitted after they
            joined (a WebSocket message stream is hot: messages arrive whether you are subscribed
            or not, and you only see the ones that arrive after you connect).
          </p>
          <p style="margin-top: 12px;">
            Most of what you write in Angular — <code>HttpClient</code> calls, <code>interval</code>,
            <code>fromEvent</code> — produces cold Observables. Understanding cold vs. hot is
            important background for operators like <code>shareReplay</code>, which you will meet
            in Act 2.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Paste the <code>evenSeconds$</code> snippet into your own console (or a scratch component) and confirm nothing logs until the <code>.subscribe()</code> line runs. You can explain the difference between a Signal (synchronous current value) and an Observable (values over time), read a marble diagram, and explain why Observables do nothing until <code>.subscribe()</code> is called.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d15-act1-leak-demo" [stepNumber]="2" title="The Leak, Demonstrated Live">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Here is the scenario every Angular developer eventually encounters. You build a Stats page
          and add a live clock ticker using <code>interval(1000)</code>:
        </p>

        <app-code-block lang="typescript" [code]="leakDemoCode" />

        <p style="margin-top: 12px;">
          While you are on the Stats page, the console happily prints
          <code>t+0s</code>, <code>t+2s</code>, <code>t+4s</code>… Now navigate away to Browse.
          Open the console. <strong>The log keeps printing.</strong>
        </p>

        <p style="margin-top: 12px;">
          This is the classic Angular memory-leak bug. When Angular destroys a component it removes
          the DOM nodes and runs lifecycle hooks — but it has <em>no idea</em> that your component
          holds a live subscription to an interval. That subscription is still alive, still holding
          a callback closure that references the now-destroyed component, and still firing every two
          seconds. The component is gone from the screen but it lingers in memory, kept alive by the
          subscription's internal reference chain.
        </p>

        <p style="margin-top: 12px;">
          Over repeated navigations — back to Stats, away, back again — a new subscription is
          created each time and the old one is never cleaned up. After five round-trips you have
          five independent tickers all running in the background. The application slows down and
          the console becomes a waterfall.
        </p>

        <h4 style="margin-top: 20px;">Fix #1 — The Manual Way: <code>ngOnDestroy</code></h4>

        <p>
          The traditional remedy is to keep a reference to the <code>Subscription</code> object and
          call <code>.unsubscribe()</code> when the component is destroyed. This is exactly the
          cleanup pattern from Day 6 — now you know <em>why</em> it existed:
        </p>

        <app-code-block lang="typescript" [code]="ngOnDestroyFixCode" />

        <p style="margin-top: 12px;">
          This works correctly. When Angular calls <code>ngOnDestroy</code>, the subscription is
          terminated, the timer stops, and the component can be garbage-collected. The downside is
          ceremony: every component with a subscription must implement <code>OnDestroy</code>, keep
          a reference to each subscription (or group them in an array or a <code>Subject</code>),
          and remember to call <code>unsubscribe</code>. Forgetting is catastrophically silent —
          there is no compile-time error, just a slow leak in production.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Before opening the answer: what actually "leaks" when you forget to unsubscribe — is it a memory leak in the traditional sense?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what actually leaks">
          <p>
            Yes, and it is also an effect leak. When you subscribe to an Observable without
            unsubscribing, the Observable's internal subscriber list keeps a live reference to
            your callback closure. That closure captured the component instance (via <code>this</code>
            or a signal call), so the garbage collector cannot reclaim the component object — the
            reference chain from the timer → subscription → callback → component is unbroken.
            But the damage is not only memory: any side effects in that callback — console logs,
            service calls, signal writes, analytics events — keep firing after the component is gone.
            With repeated navigation the number of simultaneous background subscriptions grows
            unboundedly, and each one is invisible to Angular's own change-detection system.
          </p>
        </app-collapsible>

        <div class="warning-box">Forgetting to unsubscribe is silently catastrophic. The app builds, tests pass, and the leak only manifests in production under real navigation patterns.</div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Add the leaky ticker to a real page, navigate away, and watch the console keep logging. Then add the <code>ngOnDestroy</code> + <code>unsubscribe()</code> fix and confirm the log stops the instant you navigate away. You can explain why the leak happens at the reference-chain level and apply the manual fix correctly.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d15-act1-tosignal-fix" [stepNumber]="3" title="Fix #2 — The Modern Way: toSignal and takeUntilDestroyed">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Manual <code>ngOnDestroy</code> management works, but Angular 19 shipped two stable,
          public APIs that make leaks nearly impossible to write by accident.
          <strong><code>toSignal</code> and <code>takeUntilDestroyed</code> are stable, public API
          since Angular v19</strong> — not experimental, not developer-preview, production-ready
          today.
        </p>

        <h4 style="margin-top: 16px;"><code>toSignal</code> — Subscribe Once, Read Everywhere</h4>

        <p>
          <code>toSignal</code> is the single most useful RxJS-era API for a signals-era developer.
          It subscribes to an Observable for you, stores the latest emitted value as a Signal, and
          — critically — <em>automatically unsubscribes</em> when the component is destroyed. Internally
          it uses Angular's <code>DestroyRef</code>, so no <code>ngOnDestroy</code> hook is needed.
        </p>

        <app-code-block lang="typescript" [code]="toSignalFixCode" />

        <p style="margin-top: 12px;">
          The template reads <code>{{ "{{ ticks() }}" }}</code> — a plain signal call. Computed signals
          can build on top of it: <code>computed(() => ticks().toUpperCase())</code> just works.
          The subscription is invisible to the developer; cleanup is guaranteed. Pass
          <code>&#123; initialValue: 't+0s' &#125;</code> so the Signal has a defined value before the
          first emission arrives (without it the Signal's type includes <code>undefined</code> and
          templates need a guard).
        </p>

        <h4 style="margin-top: 20px;"><code>takeUntilDestroyed</code> — Leak Protection for Raw Subscriptions</h4>

        <p>
          Sometimes you <em>still</em> need a raw <code>.subscribe()</code>: when each emission
          should trigger an imperative side effect rather than just hold the latest value. For example,
          showing a toast notification, calling a service method, sending an analytics event, or
          writing to a signal from an <code>effect()</code> callback. For those cases,
          <code>takeUntilDestroyed()</code> is your one-liner safety net:
        </p>

        <app-code-block lang="typescript" [code]="takeUntilDestroyedCode" />

        <p style="margin-top: 12px;">
          <code>takeUntilDestroyed()</code> is a <code>MonoTypeOperatorFunction</code> — it sits
          inside <code>.pipe()</code> and completes the Observable automatically when the calling
          injection context (component, directive, or service) is destroyed. It must be called in
          an injection context (a field initializer or constructor); if you need to call it later
          (inside a method), pass a <code>DestroyRef</code> explicitly.
        </p>

        <div class="think-about-it">
          <p class="tai-q">If <code>toSignal</code> already prevents leaks automatically, why would you ever still reach for <code>takeUntilDestroyed()</code> + raw <code>.subscribe()</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — when a signal isn't the right shape">
          <p>
            Because <code>toSignal</code> models <em>state</em> — it answers "what is the latest value
            of this stream right now?" But not every subscription is about reading a value in a
            template. When each emission should fire an imperative side effect — calling a service
            method, showing a toast, dispatching an event, writing an analytics ping — you need
            raw <code>.subscribe()</code> with a callback that runs on every item. A Signal cannot
            express "do this action on each value"; it only holds the current value. For those
            one-off-effect subscriptions you still need <code>takeUntilDestroyed()</code> to
            guarantee cleanup, because the subscription is not going through <code>toSignal</code>'s
            automatic <code>DestroyRef</code> wiring.
          </p>
        </app-collapsible>

        <app-collapsible icon="💡" label="Hint — Which one do I reach for first?">
          <p>
            Use this decision tree: <strong>"Do I need to read the latest value in a template or
            computed?"</strong> → <code>toSignal</code>. <strong>"Do I need to run a side effect
            on every emission?"</strong> → <code>takeUntilDestroyed()</code> + raw
            <code>.subscribe()</code>. In practice, <code>toSignal</code> handles roughly 80% of
            the Observable-in-a-component use cases you will encounter in modern Angular.
          </p>
        </app-collapsible>

        <div class="info-box">
          <strong>The big picture:</strong> Signals and Observables are complementary, not competing.
          Observables model async, time-based, multi-value streams with rich operator composition.
          Signals model synchronous, always-readable current state. <code>toSignal</code> is the
          bridge that lets you consume a stream's latest value as if it were a signal — combining
          the expressiveness of RxJS with the simplicity of Angular's reactive primitives.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Replace your leaky ticker with the <code>toSignal</code> field-initializer version and confirm navigating away stops the ticker with no <code>ngOnDestroy</code> written. You can apply <code>toSignal</code> to convert an Observable into a Signal with automatic cleanup, and use <code>takeUntilDestroyed()</code> when a raw subscription is still the right tool.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day14/lab" class="btn-secondary">← Day 14 Lab</a>
        <a routerLink="/day15/act2" class="btn-primary">Act 2: Operators — Transforming Streams →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'Signal',
      plainEnglish: 'A box holding the current value — readable synchronously at any time.',
      analogy: '🫙 A jar with today\'s soup: open the lid and it\'s right there.'
    },
    {
      concept: 'Observable',
      plainEnglish: 'A stream of values arriving over time — you listen for what flows past.',
      analogy: '🏞️ A river you can dip into: the water keeps moving whether you\'re watching or not.'
    },
    {
      concept: 'Operator',
      plainEnglish: 'A pure function that transforms one stream into a new stream.',
      analogy: '🔬 A filter in the river that only lets certain things pass downstream.'
    },
    {
      concept: 'Subscription',
      plainEnglish: 'The act of starting to listen to a stream — what makes it actually run.',
      analogy: '🚰 Turning on the tap: nothing flows until you do this.'
    }
  ];

  marbleDiagramCode = `// interval(1000) emits an incrementing integer every second, forever.
// Marble diagram — each number is one emitted value, arrow = still running:
//
//  ──0───1───2───3───4───5───▶
//
import { interval } from 'rxjs';

const ticks$ = interval(1000);
// Nothing is running yet. This is just a description of a stream.`;

  marblePipeCode = `import { interval, map, filter } from 'rxjs';

const ticks$ = interval(1000);           // ──0───1───2───3───4───5──▶

const evenSeconds$ = ticks$.pipe(
  filter(n => n % 2 === 0),             // ──0───────2───────4──────▶
  map(n => \`t+\${n}s\`),                  // ──"t+0s"──"t+2s"──"t+4s"▶
);

// Still nothing logged. The pipeline is a blueprint, not a running machine.

const sub = evenSeconds$.subscribe(v => console.log(v));
// NOW it starts. Console: "t+0s" … "t+2s" … "t+4s" …

// RxJS 7 note: operators (map, filter, etc.) are re-exported from the root
// 'rxjs' package. The older 'rxjs/operators' path still works but is RxJS 6 style.`;

  leakDemoCode = `import { Component, OnInit } from '@angular/core';
import { interval, map, filter } from 'rxjs';

const evenSeconds$ = interval(1000).pipe(
  filter(n => n % 2 === 0),
  map(n => \`t+\${n}s\`),
);

@Component({ selector: 'app-stats', standalone: true, template: \`<p>Stats Page</p>\` })
export class Stats implements OnInit {
  ngOnInit() {
    // BUG: subscription is created but never stored or cleaned up.
    evenSeconds$.subscribe(v => console.log(v));
  }
}

// Navigate away from Stats → the console keeps printing FOREVER.
// The component is gone from the screen, but the subscription is still alive.`;

  ngOnDestroyFixCode = `import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { interval, map, filter } from 'rxjs';

const evenSeconds$ = interval(1000).pipe(
  filter(n => n % 2 === 0),
  map(n => \`t+\${n}s\`),
);

@Component({ selector: 'app-stats', standalone: true, template: \`<p>Stats Page</p>\` })
export class Stats implements OnDestroy {
  // Store a reference so we can unsubscribe later.
  private sub: Subscription = evenSeconds$.subscribe(v => console.log(v));

  ngOnDestroy() {
    // Day 6's cleanup hook, now with its true purpose fully explained.
    this.sub.unsubscribe();
  }
}

// Now navigation away from Stats terminates the ticker immediately.`;

  toSignalFixCode = `import { Component, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval, map, filter } from 'rxjs';

const evenSeconds$ = interval(1000).pipe(
  filter(n => n % 2 === 0),
  map(n => \`t+\${n}s\`),
);

@Component({
  selector: 'app-stats',
  standalone: true,
  template: \`
    <p>Current tick: {{ ticks() }}</p>
    <p>Uppercase: {{ ticksUpper() }}</p>
  \`
})
export class Stats {
  // toSignal subscribes for you AND unsubscribes when the component is destroyed.
  // No ngOnDestroy needed. initialValue gives the signal a defined value before
  // the first emission arrives (without it, the type is Signal<string | undefined>).
  ticks = toSignal(evenSeconds$, { initialValue: 't+0s' });

  // Because ticks is now a Signal, computed() works on it directly.
  ticksUpper = computed(() => this.ticks().toUpperCase());
}`;

  takeUntilDestroyedCode = `import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval, map, filter } from 'rxjs';
import { NotificationService } from '../core/services/notification.service';
import { inject } from '@angular/core';

const evenSeconds$ = interval(1000).pipe(
  filter(n => n % 2 === 0),
  map(n => \`t+\${n}s\`),
);

@Component({ selector: 'app-stats', standalone: true, template: \`<p>Stats Page</p>\` })
export class Stats {
  private notifications = inject(NotificationService);

  constructor() {
    // Use takeUntilDestroyed when each emission triggers an imperative side effect
    // rather than just reading the latest value in a template.
    // Must be called in an injection context (constructor or field initializer).
    evenSeconds$.pipe(
      takeUntilDestroyed()   // completes automatically when Stats is destroyed
    ).subscribe(v => {
      this.notifications.show(\`Tick: \${v}\`);  // side effect on every emission
    });
  }
}`;
}
