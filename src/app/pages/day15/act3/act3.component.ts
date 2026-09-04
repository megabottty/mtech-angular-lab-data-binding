import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day15-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 15 · Act 3 of 3</span>
        <h1>🧭 Router Streams &amp; Debug It</h1>
        <p class="subtitle">Lift the lid on what Day 9's route-param sugar is built on — then hunt down the bug that costs real companies real money.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Understand that <code>ActivatedRoute.paramMap</code> is a real <code>Observable&lt;ParamMap&gt;</code> that <code>withComponentInputBinding()</code> wraps — and diagnose the "racing timers" subscription leak before you copy that pattern anywhere.</li>
          <li><strong>Why It Matters:</strong> Stacked subscriptions are one of the most expensive bug classes in production Angular apps — websocket handlers, analytics pings, and live tickers all suffer from the same pattern. Recognising it early is worth more than memorising operator names.</li>
          <li><strong>Build Steps:</strong> Read the router-param stream with <code>paramMap</code> + <code>toSignal</code> → inspect what Day 9's input binding is sugar for → diagnose a multi-visit subscription leak → fix it with a field-initializer <code>toSignal</code> → note today's operator surface and the <code>$</code> suffix convention.</li>
          <li><strong>Expected Outcome:</strong> You can trace a route param all the way from the URL to a signal, explain why a field-initializer subscription can't stack the way an <code>ngOnInit</code> subscription can, and articulate when you'd ever reach past input binding to <code>paramMap</code> directly.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Router Streams &amp; Debug It)</p>
        <p><strong>Next step:</strong> Student Lab — bring RxJS streams into BingeBoard on your own.</p>
        <p><strong>Time:</strong> About 25–30 minutes. Don't rush the racing-timers bug — tracing it yourself is most of the value.</p>
      </section>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's
        <a href="https://angular.dev/api/router/ActivatedRoute" target="_blank" rel="noopener"><code>ActivatedRoute</code></a>
        reference, specifically the <code>paramMap</code> property.
      </div>

      <!-- Step 1: Router params as a stream -->
      <app-lesson-step stepId="d15-act3-router-stream" [stepNumber]="1" title="Router Params as a Stream — A Taste, No Drill">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>
          Day 9 taught you to declare <code>id = input.required&lt;string&gt;()</code> on <code>ShowDetail</code> and let <code>withComponentInputBinding()</code> populate it automatically from the URL.
          That API is modern, clean, and the right default for new code.
          But it is worth lifting the hood once to see what's underneath — both to demystify a thousand blog posts that still do it the "classic way," and to understand the one situation where you'd reach for the stream directly.
        </p>
        <p style="margin-top: 12px;">
          <code>ActivatedRoute.paramMap</code> is a real <code>Observable&lt;ParamMap&gt;</code> — not a simplified teaching abstraction, not a one-time read.
          It emits a brand-new <code>ParamMap</code> snapshot <em>every time</em> the route's parameters change while the same component instance stays mounted.
          Calling <code>.pipe(map(p =&gt; p.get('id')))</code> extracts just the <code>'id'</code> segment from each snapshot as a <code>string | null</code>.
          Wrapping the whole chain in <code>toSignal()</code> bridges that stream into a signal you can read with <code>id()</code> anywhere — including inside a <code>computed()</code>.
        </p>
        <app-code-block lang="typescript" [code]="paramMapCode" />
        <div class="info-box">
          <strong>Day 9 connection:</strong> <code>input.required&lt;string&gt;()</code> + <code>withComponentInputBinding()</code> is syntactic sugar over exactly this stream.
          The router reads <code>paramMap</code>, extracts the named segments, and hands them to your component as inputs so you don't have to inject <code>ActivatedRoute</code> yourself.
          Understanding this lets you read "classic" code in tutorials and older codebases — it works, Angular still supports it, and now you know what it's doing.
        </div>
        <div class="think-about-it">
          <p class="tai-q">If <code>withComponentInputBinding()</code> already gives us the <code>id</code> as a plain input, why would we ever reach for <code>ActivatedRoute.paramMap</code> directly in new code?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the one case where paramMap still wins">
          <p>Mostly you wouldn't — for simple route params, input binding is the modern default and is easier to test and reason about. The one case where <code>paramMap</code> is genuinely more powerful is when you need to react to the same parameter <em>changing</em> on a component instance that stays mounted across navigations: input binding delivers the resolved value but doesn't tell you whether it just changed or stayed the same, whereas <code>paramMap</code> as a stream lets you run side effects (like cancelling an in-flight request) on each new emission. You'd also reach for it when maintaining or reading an older codebase — pre-Angular-17 code that predates component input binding — where injecting <code>ActivatedRoute</code> and subscribing to <code>paramMap</code> was the canonical, correct approach.</p>
        </app-collapsible>
        <app-collapsible icon="🧩" label="Deep Dive — What is ParamMap, exactly?">
          <p><code>ParamMap</code> is an Angular interface that wraps the URL's parameter segment into a typed object with a <code>.get(key)</code> method (returns <code>string | null</code>) and a <code>.getAll(key)</code> method (returns <code>string[]</code> for multi-value params). It's immutable — each navigation emits a brand-new snapshot instead of mutating the previous one — which is why it plays perfectly with RxJS: each emission is a new, safe value you can map over without worrying about accidental mutation.</p>
          <p style="margin-top: 12px;">The stream emits its first <code>ParamMap</code> synchronously on subscription (at field-initializer time when used with <code>toSignal</code>), so <code>toSignal</code> can give the signal a real initial value right away rather than returning <code>undefined</code> for the first render.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Wire up the <code>paramMap</code> snippet above on your own Detail page and confirm <code>id()</code> updates as you navigate between shows. You can trace the chain from URL segment → <code>paramMap</code> Observable → <code>.pipe(map(...))</code> → <code>toSignal</code> → readable signal, and explain that Day 9's <code>input.required</code> binding is sugar over this exact mechanism.</div>
      </app-lesson-step>

      <!-- Step 2: The racing-timers debug -->
      <app-lesson-step stepId="d15-act3-debug-racing-timers" [stepNumber]="2" title="Bug — Racing Timers (The Subscription Leak That Costs Real Money)">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>
          You're building the <code>Stats</code> page — the one from Day 9's warm-up.
          You want to show a live "seconds on this page" counter, so you start an <code>interval(1000)</code> inside <code>ngOnInit</code>.
          It works on the first visit. On the second visit it still works.
          By the third visit, the displayed number is jumping erratically — sometimes it increments by one, sometimes it skips, sometimes it ticks backwards relative to what you expect.
          You add a <code>console.log</code> and are confused: why are there three separate count sequences firing at the same time?
        </p>
        <h4 style="margin-top: 16px;">The buggy code</h4>
        <app-code-block lang="typescript" [code]="buggyTimerCode" />
        <p style="margin-top: 12px;">
          Here is what actually happens: every time the user navigates <em>to</em> the <code>Stats</code> page, Angular calls <code>ngOnInit</code> on the freshly-created component instance.
          Each call to <code>ngOnInit</code> creates a brand-new <code>interval(1000)</code> Observable and subscribes to it — but it never stores that subscription reference, so there is no way to call <code>.unsubscribe()</code> in <code>ngOnDestroy</code>.
          The old subscription keeps running invisibly in the background: its closure still holds a reference to <code>this.seconds</code> (the signal on the now-destroyed component instance), and it keeps firing every second, calling <code>this.seconds.set(n)</code>.
          After three round trips you have three independent timers — each with its own private <code>n</code> counter, each unaware of the others — all racing to write the same signal.
          Whichever timer's callback ran last "wins" that render cycle, producing the erratic jumping the student sees.
        </p>
        <div class="warning-box">
          <strong>Stakes, not just trivia:</strong> this exact bug — in production apps — looks like piling websocket message handlers (each page visit adds a new handler, none removed), duplicate analytics events, or runaway polling loops.
          Real companies have shipped hotfixes for this pattern. Meeting it here, where it's cheap to diagnose, is the whole point.
        </div>
        <h4 style="margin-top: 16px;">The diagnosis checklist</h4>
        <p>Work through this in order:</p>
        <ol style="margin-left: 20px; margin-top: 8px; line-height: 1.8;">
          <li><strong>WHY does it happen?</strong> — Each <code>ngOnInit</code> call starts a NEW subscription. The old subscriptions were never torn down. After three navigations, three independent timers each hold a closure over their own <code>n</code> variable and the <em>same</em> signal reference, and all three fire every second with different values.</li>
          <li><strong>Rewrite it:</strong> convert to a field-initializer <code>toSignal</code> (see below).</li>
          <li><strong>EXPLAIN why the field-initializer version can't stack the same way</strong> (the key conceptual win — see below).</li>
        </ol>
        <h4 style="margin-top: 16px;">The fix</h4>
        <app-code-block lang="typescript" [code]="fixedTimerCode" />
        <div class="info-box" style="margin-top: 12px;">
          <strong>Why the field-initializer can't stack:</strong>
          A field initializer runs exactly <strong>once</strong>, at construction time — when the component instance is first created.
          Angular creates a brand-new component instance on each navigation to the route, and destroys the old instance when the user navigates away.
          <code>toSignal</code>'s automatic cleanup via <code>DestroyRef</code> ensures the ONE subscription tied to that ONE instance is torn down when that instance is destroyed.
          There is no path by which a second timer can "leak forward" into the next navigation's instance the way an <code>ngOnInit</code>-based raw subscribe can — the old instance (and its timer) are gone before the new instance is ever created.
        </div>
        <div class="think-about-it">
          <p class="tai-q">Could this same bug happen with <code>ngOnDestroy</code> correctly calling <code>sub.unsubscribe()</code> — just with a small delay before teardown?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — no, and here's the actual boundary">
          <p>No. If <code>ngOnDestroy</code> correctly calls <code>sub.unsubscribe()</code> on the subscription object stored in a class field, the bug is fully fixed — there's no "delay" ambiguity, because Angular calls <code>ngOnDestroy</code> synchronously during the component-destruction phase, before the route finishes activating the next instance. The bug isn't inherently about <code>ngOnInit</code> or <code>ngOnDestroy</code> — it's about having a subscription with no matching teardown. The practical reason <code>toSignal</code> is preferred isn't that <code>ngOnDestroy</code> can't be made correct (it can), it's that <code>toSignal</code> makes forgetting the teardown <em>impossible by construction</em>, whereas manual <code>ngOnDestroy</code> correctness depends entirely on the developer remembering to track the subscription in a field and remember to call <code>unsubscribe()</code> on it.</p>
        </app-collapsible>
        <app-collapsible icon="✅" label="Show Answer — Full before-and-after comparison">
          <p><strong>Before (buggy):</strong> a new subscription per <code>ngOnInit</code> call, never cleaned up.</p>
          <app-code-block lang="typescript" [code]="buggyTimerCode" />
          <p style="margin-top: 12px;"><strong>After (correct — field initializer):</strong> one subscription per component instance, cleaned up automatically when the instance is destroyed.</p>
          <app-code-block lang="typescript" [code]="fixedTimerCode" />
          <p style="margin-top: 12px;"><strong>Also correct (but manual):</strong> store the subscription, unsubscribe in <code>ngOnDestroy</code>. Works, but requires you to remember the teardown every time.</p>
          <app-code-block lang="typescript" [code]="manualUnsubCode" />
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Reproduce the racing-timers bug in your own Stats page (navigate away and back 3 times), then rewrite it as a field-initializer <code>toSignal</code> and confirm the count stops racing. You can explain why multiple <code>ngOnInit</code>-based subscriptions stack up across navigations, and articulate why the fix makes the leak impossible by construction rather than just making it correct by discipline.</div>
      </app-lesson-step>

      <!-- Step 3: Operator scope note -->
      <app-lesson-step stepId="d15-act3-operator-scope-note" [stepNumber]="3" title="Closing Note — Operator Scope &amp; the $ Suffix">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>
          Today's operator surface was deliberately tiny: <code>map</code>, <code>filter</code>, <code>interval</code>, <code>fromEvent</code>.
          That's enough to build real reactive features and to understand the patterns that matter most.
          Tomorrow's entire act is dedicated to <code>switchMap</code> — the operator that transforms one stream into another and automatically cancels in-flight work when a new value arrives.
          It will make much more sense after today's foundation.
          <strong>Resist the urge to look it up early</strong> — its power is only visible once you have a concrete problem (like cancelling a stale search request) to solve with it.
        </p>
        <p style="margin-top: 12px;">
          One more thing while we're here: you may see variables named with a trailing <code>$</code> in RxJS tutorials — <code>seconds$</code>, <code>paramMap$</code>, <code>click$</code>.
          This is a naming convention borrowed from RxJS's own documentation style, signalling "this is a stream" to whoever reads the code.
          That's all it is.
        </p>
        <div class="think-about-it">
          <p class="tai-q">Does naming a variable with a trailing <code>$</code> change how TypeScript or Angular treats it?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — it's convention only">
          <p>No — it's purely a human-readability convention. TypeScript has no special handling for identifiers ending in <code>$</code>; it treats <code>seconds$</code> exactly the same as <code>seconds</code> at the type-system and compiler level. Angular's template compiler and change-detection engine are equally unaware of it. The <code>$</code> suffix is a strong community convention borrowed from RxJS's own documentation style — a signal to human readers that the variable holds an Observable — and nothing more.</p>
        </app-collapsible>
        <app-collapsible icon="🧩" label="Deep Dive — When is the $ suffix still worth using?">
          <p>In a codebase that mixes plain values, signals, and Observables in the same class, the <code>$</code> suffix provides real value: at a glance you know <code>search$</code> needs to be subscribed to or piped before it does anything, whereas <code>results</code> or <code>results$</code>-less is probably already a resolved value or signal. Some teams adopt it as a lint rule for Observable fields precisely because it prevents "oops, I forgot to subscribe" mistakes. Others drop it entirely and rely on TypeScript's type inference to make the distinction obvious. Neither is wrong — the important thing is that your team picks one convention and applies it consistently.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state plainly that the <code>$</code> suffix is a convention with no runtime effect, and explain why <code>switchMap</code> is being deliberately saved for tomorrow rather than introduced today.</div>
      </app-lesson-step>

      <div class="info-box">
        <strong>Day 15 Acts complete.</strong> You've gone from "what even is an Observable?" to reading router params as a live stream, composing operators in a real service, and diagnosing a subscription leak that breaks production apps.
        Head to the Student Lab to apply all three acts independently on BingeBoard.
      </div>

      <div class="nav-footer">
        <a routerLink="/day15/act2" class="btn-secondary">← Act 2: Operators in the Wild</a>
        <a routerLink="/day15/lab" class="btn-primary">Student Lab: Your Turn →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'ActivatedRoute.paramMap',
      plainEnglish: "The URL's params as a live stream — a new snapshot emits every time the address changes.",
      analogy: '📬 A mail slot that drops a new letter in every time the address changes.'
    },
    {
      concept: 'toSignal bridge',
      plainEnglish: 'Turns an Observable stream into a signal you read like any other reactive value.',
      analogy: '📥 A mailbox that always shows the last letter received — you check it once, not watch the slot.'
    },
    {
      concept: 'race condition',
      plainEnglish: 'Multiple overlapping subscriptions competing to write the same state with their own independent counter.',
      analogy: '⏰ Three alarm clocks set for different times, all trying to wake the same person.'
    },
    {
      concept: 'field initializer',
      plainEnglish: 'Code that runs exactly once at construction — one subscription per component instance, not one per visit.',
      analogy: '🏠 Wiring done once when the house is built, not redone every time someone visits.'
    }
  ];

  paramMapCode = `import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

// Inside ShowDetail (or any route-aware component):
private route = inject(ActivatedRoute);

// ActivatedRoute.paramMap is a real Observable<ParamMap>.
// It emits a new ParamMap every time the route's parameters change.
// .pipe(map(p => p.get('id'))) extracts just the 'id' segment as string | null.
// toSignal() bridges that stream into a signal readable anywhere, including computed().
id = toSignal(this.route.paramMap.pipe(map(p => p.get('id'))));

// Compare with Day 9's sugar — same result, no ActivatedRoute injection needed:
// id = input.required<string>();  // (requires withComponentInputBinding() in app config)`;

  buggyTimerCode = `import { Component, OnInit, signal } from '@angular/core';
import { interval } from 'rxjs';

export class Stats implements OnInit {
  seconds = signal(0);

  constructor() {}

  ngOnInit() {
    // BUG: a brand-new subscription every time this component mounts.
    // Old subscriptions are NEVER torn down — they keep firing in the background.
    interval(1000).subscribe(n => this.seconds.set(n));
  }
  // No ngOnDestroy. No stored subscription reference.
  // After 3 navigations to this page: 3 timers, all racing to set seconds().
}`;

  fixedTimerCode = `import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

export class Stats {
  // Field initializer: runs ONCE at construction.
  // toSignal wires up automatic cleanup via DestroyRef —
  // when this component instance is destroyed, the subscription is torn down.
  // A new instance on the next navigation gets its own fresh subscription.
  seconds = toSignal(interval(1000), { initialValue: 0 });
}`;

  manualUnsubCode = `import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { interval, Subscription } from 'rxjs';

export class Stats implements OnInit, OnDestroy {
  seconds = signal(0);
  private sub!: Subscription;  // must remember to track this

  ngOnInit() {
    this.sub = interval(1000).subscribe(n => this.seconds.set(n));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();  // must remember to call this — correct, but manual
  }
}`;
}
