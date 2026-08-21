import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day15-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — RxJS in the Real App</h1>
        <p class="subtitle">
          55 minutes. 4 tasks. Wire live timers, operator pipelines, a leak hunt, and a keyboard
          shortcut into BingeBoard — building real muscle memory with Observables and signals.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Copy the working Act 3 code (Stats page with lazy guard, ShowsService with
          <code>search()</code>, Browse with four-state template) into your project before
          starting. You will add to <code>Stats</code>, <code>ShowsService</code>, and the
          <code>Header</code> component across these four tasks.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Independently apply <code>toSignal</code>, <code>computed</code>, RxJS pipe operators,
            subscription teardown patterns, and <code>fromEvent</code> to real BingeBoard features.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Production Angular apps use every one of these patterns daily — timed UI feedback,
            search transformations, memory-safe subscriptions, and keyboard shortcuts are standard
            engineering expectations, not bonuses.
          </li>
          <li>
            <strong>Build Steps:</strong>
            live page ticker → top-rated stream → leak hunt and fix → stretch keyboard shortcut.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            Students can bridge Observables into signals, compose operators inside
            <code>.pipe()</code>, identify and fix a real subscription leak two different ways,
            and wire a DOM event stream safely with automatic teardown.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 15 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
      </section>

      <!-- ─── TASK 1 ─────────────────────────────────────────────────── -->
      <app-lesson-step
        stepId="d15-lab-ticker"
        [stepNumber]="'Task 1'"
        title="'Now Watching' Ticker"
      >
        <div class="task-meta">
          <span class="difficulty easy">🟢 Easy</span>
          <span class="concepts">Concepts: <code>interval()</code>, <code>toSignal</code>, <code>computed()</code>, component lifecycle.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a live "you've been on this page for <em>N</em> seconds" ticker to the
          <code>Stats</code> page. Wire it using <code>interval(1000)</code> bridged into a signal
          with <code>toSignal</code> as a class field initializer. Then add a
          <code>computed()</code> that derives a fun second number: how many minutes of television
          the user has hypothetically watched in that time (using 60 seconds = 1 minute of runtime,
          so <code>minutesEquivalent = seconds / 60</code>).
        </p>
        <p style="margin-top: 10px;">
          This is the simplest possible live-stream-to-signal bridge, and it shows students exactly
          how reactive derived state chains: <code>interval</code> emits → <code>toSignal</code>
          holds the latest tick as a signal → <code>computed</code> derives a second value from it
          → both update in the template automatically with zero manual subscription management.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Navigate away from Stats and back — the ticker resets to 0 instead of
          continuing where it left off. Why?</p>
          <p class="tai-a">Navigating away destroys the <code>Stats</code> component instance —
          Angular unmounts it from the DOM and tears down all of its state, including the
          <code>toSignal</code>-created subscription to <code>interval(1000)</code>. Navigating
          back creates a <em>brand new</em> <code>Stats</code> instance with a brand new field
          initializer that starts the interval fresh from 0. This is expected component lifecycle
          behaviour, not a bug — if you want persistence across navigations you would need to move
          the state into a service that lives outside the component tree.</p>
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Import <code>interval</code> from <code>'rxjs'</code> and <code>toSignal</code>
            from <code>'&#64;angular/core/rxjs-interop'</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a field initializer:
            <code>secondsOnPage = toSignal(interval(1000), &#123; initialValue: 0 &#125;)</code>.
            Because <code>toSignal</code> is called outside a constructor it must be in an injection
            context — a field initializer satisfies that automatically.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Add a <code>computed()</code> field that divides <code>secondsOnPage()</code> by
            60 and uses <code>.toFixed(2)</code> so the decimal is readable.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Render both in the template using interpolation:
            <code>secondsOnPage()</code> for the raw count and
            <code>minutesEquivalent()</code> for the derived string, e.g.
            "You have been on this page for <em>N</em> seconds (<em>M</em> minutes of TV)."</span>
          </div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The Stats page shows a
        counter that increments once per second; navigating away and back resets it to 0.
        </div>

        <app-collapsible icon="💡" label="Hint — field initializer + toSignal">
          <p>
            <code>toSignal</code> with an <code>initialValue</code> option returns
            <code>Signal&lt;number&gt;</code> (not <code>Signal&lt;number | undefined&gt;</code>),
            so you can use it directly in a <code>computed()</code> without a null-guard.
          </p>
          <app-code-block lang="typescript" [code]="task1Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <p>Add the following to your <code>Stats</code> component class and template:</p>
          <h4>TypeScript:</h4>
          <app-code-block lang="typescript" [code]="task1TsAnswer" />
          <h4 style="margin-top: 16px">HTML (inside your Stats template):</h4>
          <app-code-block lang="html" [code]="task1HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <!-- ─── TASK 2 ─────────────────────────────────────────────────── -->
      <app-lesson-step
        stepId="d15-lab-top-rated"
        [stepNumber]="'Task 2'"
        title="Top-Rated Stream"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>.pipe()</code>, <code>map()</code> operator, composing stream transformations, <code>toSignal</code>.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a <code>topRated(query: string)</code> method to <code>ShowsService</code> that
          returns an <code>Observable</code> of only the high-quality results: shows with a
          <code>rating &gt;= 8</code>, projected down to just
          <code>&#123; name, rating &#125;</code>. Build the transformation using RxJS's
          <code>.pipe()</code> with a <code>map()</code> operator rather than chaining Array
          methods directly on the result after subscribing.
        </p>
        <p style="margin-top: 10px;">
          <strong>A note on honesty:</strong> since <code>ShowsService.search()</code> emits
          <code>Show[]</code> as a single array per emission (not one show at a time),
          the <code>filter</code> and <code>map</code> inside your <code>.pipe(map(...))</code>
          are Array methods operating on that batch — not the per-item RxJS stream operators you'd
          use on a true multi-emission stream like <code>interval</code>. The value of
          <code>.pipe()</code> here is composability and chainability on the stream itself: you can
          add retry logic, error handling, or debouncing in the same pipe later without touching
          the caller. That is the real operator practice lesson — and yes, calling
          <code>.filter().map()</code> on the array after subscribing would also work. The
          instructor brief says to say so honestly, so: both approaches work; using
          <code>.pipe()</code> is a better habit for anything you intend to extend.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Could you have solved this with the array's own <code>.filter()</code>
          and <code>.map()</code> inside the component instead of inside <code>.pipe()</code> in
          the service? What is actually different?</p>
          <p class="tai-a">Yes — you could subscribe to <code>search()</code> in the component,
          receive the <code>Show[]</code> array, and call <code>.filter().map()</code> on it there.
          The result would be identical on screen. The real difference is ownership and
          composability: putting the transformation inside a <code>.pipe()</code> in the service
          means the service "owns" what "top rated" means and the component never sees raw
          unfiltered data. It also means you can bolt on retry, caching, or logging operators in
          the same pipe later, close to the data source, without touching any component. That
          architectural discipline — keep transformation logic in the service — is what
          <code>.pipe()</code> is really teaching here.</p>
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add <code>topRated(query: string): Observable&lt;&#123; name: string; rating: number &#125;[]&gt;</code>
            to <code>ShowsService</code>. Return <code>this.search(query).pipe(map(shows =&gt; shows.filter(...).map(...)))</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>In <code>Stats</code>, inject <code>ShowsService</code> and create a
            <code>topRated</code> signal via <code>toSignal(this.showsSvc.topRated('office'), &#123; initialValue: [] &#125;)</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Render the list in the template using Angular's <code>&#64;for</code> control
            flow. Show each show's name and rating.</span>
          </div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Stats renders a
        "Top Rated Shows" list that only includes shows with rating ≥ 8, showing name and rating
        side by side.
        </div>

        <app-collapsible icon="💡" label="Hint — service method shape">
          <p>The <code>map</code> operator receives the whole <code>Show[]</code> array. Use
          Array's own <code>.filter()</code> and <code>.map()</code> inside it:</p>
          <app-code-block lang="typescript" [code]="task2Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <p>Service method and Stats component wiring:</p>
          <h4>ShowsService addition:</h4>
          <app-code-block lang="typescript" [code]="task2ServiceAnswer" />
          <h4 style="margin-top: 16px">Stats component addition:</h4>
          <app-code-block lang="typescript" [code]="task2TsAnswer" />
          <h4 style="margin-top: 16px">HTML:</h4>
          <app-code-block lang="html" [code]="task2HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <!-- ─── TASK 3 ─────────────────────────────────────────────────── -->
      <app-lesson-step
        stepId="d15-lab-leak-hunt"
        [stepNumber]="'Task 3'"
        title="Leak Hunt"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Challenge</span>
          <span class="concepts">Concepts: subscription lifecycle, memory leaks, <code>ngOnDestroy</code>, <code>takeUntilDestroyed()</code>, async pipe.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Your instructor hands you a <code>LeakyComponent</code> with three subscriptions
          side-by-side. One of them leaks. Your job: identify the leaky one, prove it with console
          logging, then fix it two different ways.
        </p>

        <app-code-block lang="typescript" [code]="leakyComponentCode" />

        <p style="margin-top: 12px;">
          Prove the leak: add a <code>console.log</code> inside Subscription C's callback. Navigate
          away from the page and back several times. Each round trip should add another active
          subscriber — you will see the log fire twice, then three times, then four times per
          navigation, as ghost instances accumulate without ever unsubscribing.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why don't Subscription A (async pipe) and Subscription B
          (<code>toSignal</code>) leak, but Subscription C does?</p>
          <p class="tai-a">The async pipe and <code>toSignal</code> both have automatic teardown
          built in as a first-class feature: the async pipe unsubscribes when Angular destroys the
          component that hosts it, and <code>toSignal</code> internally uses
          <code>takeUntilDestroyed()</code> to complete the source Observable when the injection
          context is destroyed. Subscription C is a bare <code>.subscribe()</code> call in
          <code>ngOnInit</code> with no teardown mechanism attached — the Observable keeps emitting
          and the callback keeps firing forever, even after Angular has torn down the component and
          removed it from the screen. Every navigation cycle adds one more ghost subscriber that
          never gets cleaned up, which is the definition of a memory and side-effect leak.</p>
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Copy the <code>LeakyComponent</code> snippet above into your project.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a <code>console.log('Subscription C fired')</code> inside C's callback.
            Navigate away and back 3 times. Confirm the log fires more times each round.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Fix it <strong>way (a)</strong>: store the <code>Subscription</code> in a
            field and call <code>.unsubscribe()</code> in <code>ngOnDestroy</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Fix it <strong>way (b)</strong>: pipe through
            <code>takeUntilDestroyed()</code> — remove the field and <code>ngOnDestroy</code>
            entirely.</span>
          </div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> With either fix, the
        console log fires exactly once per navigation back to the page, no matter how many times
        you cycle.
        </div>

        <app-collapsible icon="💡" label="Hint — two fix approaches">
          <p><strong>Way (a)</strong> — manual teardown. Store and unsubscribe:</p>
          <app-code-block lang="typescript" [code]="task3HintA" />
          <p style="margin-top: 12px;"><strong>Way (b)</strong> — <code>takeUntilDestroyed()</code>.
          Call it inside an injection context (constructor or field initializer uses a
          <code>DestroyRef</code> implicitly):</p>
          <app-code-block lang="typescript" [code]="task3HintB" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <p>Here are both complete fixed versions side by side.</p>
          <h4>Fix A — manual unsubscribe:</h4>
          <app-code-block lang="typescript" [code]="task3AnswerA" />
          <h4 style="margin-top: 16px">Fix B — takeUntilDestroyed():</h4>
          <app-code-block lang="typescript" [code]="task3AnswerB" />
          <p style="margin-top: 12px;">
            Fix B is the idiomatic Angular 19+ choice. It is shorter and harder to forget — there
            is no separate <code>ngOnDestroy</code> that could be deleted or missed in a code
            review. Fix A still appears in older codebases, so recognising it on sight is valuable.
          </p>
        </app-collapsible>
      </app-lesson-step>

      <!-- ─── TASK 4 (STRETCH) ────────────────────────────────────────── -->
      <app-lesson-step
        stepId="d15-lab-stretch-keydown"
        [stepNumber]="'Task 4 (Stretch)'"
        title="Keyboard Shortcut — Press / to Search"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Challenge</span>
          <span class="concepts">Concepts: <code>fromEvent()</code>, <code>filter()</code>, <code>takeUntilDestroyed()</code>, imperative DOM effects, <code>viewChild</code>.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Wire a global keyboard shortcut so that pressing <code>/</code> anywhere in BingeBoard
          focuses the search input on <code>Browse</code>. This is a real product touch — GitHub,
          Slack, Notion, and Linear all do exactly this. The pattern is
          <code>fromEvent(document, 'keydown')</code> filtered to <code>e.key === '/'</code>, then
          call <code>e.preventDefault()</code> (to prevent the browser from inserting the
          <code>/</code> character into the input) and imperatively focus the input element.
        </p>
        <p style="margin-top: 10px;">
          Guard the subscription with <code>takeUntilDestroyed()</code> — it must not outlive the
          component. Get a reference to the input element using
          <code>viewChild</code> with a template reference variable.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why guard this <code>subscribe</code> with
          <code>takeUntilDestroyed()</code> instead of converting it to a signal with
          <code>toSignal</code> like the ticker in Task 1?</p>
          <p class="tai-a">Signals model <em>state you read</em> — a value that changes over time
          and that other computed values or the template can derive from. This keyboard handler is
          not a value at all; it is an imperative side effect: "call <code>preventDefault()</code>
          and call <code>focus()</code> on a DOM node." There is no state to expose. Forcing it
          through <code>toSignal</code> would produce an unused signal holding the last
          <code>KeyboardEvent</code> with no template consumer — that is not what signals are for.
          The right model is: use <code>toSignal</code> when you want to read a stream's current
          value reactively; use <code>subscribe</code> + <code>takeUntilDestroyed()</code> when
          you need to perform a one-off action in response to each emission.</p>
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add <code>#searchInput</code> to the <code>&lt;input&gt;</code> in
            <code>Browse</code>'s template and declare
            <code>searchInput = viewChild&lt;ElementRef&gt;('searchInput')</code> in the class.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Import <code>fromEvent</code> from <code>'rxjs'</code>, <code>filter</code>
            from <code>'rxjs'</code>, and <code>takeUntilDestroyed</code> from
            <code>'&#64;angular/core/rxjs-interop'</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>In the <code>Browse</code> constructor, add the <code>fromEvent</code> pipeline
            below. Call <code>takeUntilDestroyed()</code> (no argument needed — the constructor is
            an injection context, so Angular infers the <code>DestroyRef</code> automatically).</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Test: open the app, click somewhere outside the input, press
            <code>/</code> — the input should gain focus without inserting a slash.</span>
          </div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Pressing <code>/</code>
        from anywhere on Browse focuses the search input; pressing it while the input is already
        focused just moves the cursor (or does nothing visually harmful); no ghost listeners
        accumulate across navigations.
        </div>

        <app-collapsible icon="💡" label="Hint — fromEvent pipeline skeleton">
          <p>Put this in the <code>Browse</code> constructor body:</p>
          <app-code-block lang="typescript" [code]="task4Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <p>Complete Browse additions:</p>
          <h4>TypeScript (constructor + field):</h4>
          <app-code-block lang="typescript" [code]="task4TsAnswer" />
          <h4 style="margin-top: 16px">HTML (input element change only):</h4>
          <app-code-block lang="html" [code]="task4HtmlAnswer" />
          <div class="info-box" style="margin-top: 16px">
            <strong>Why <code>e.preventDefault()</code>?</strong>
            Without it, pressing <code>/</code> fires the shortcut AND types a
            <code>/</code> character into the newly focused input — which then triggers a search
            for <code>/</code>. Always call <code>preventDefault()</code> on shortcut keys that
            should not produce character output.
          </div>
        </app-collapsible>
      </app-lesson-step>

      <!-- ─── CHECKPOINT ─────────────────────────────────────────────── -->
      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li>
            <span class="checkbox">✅</span>
            You can read a marble diagram and explain what each operator does to the stream's
            shape and timing.
          </li>
          <li>
            <span class="checkbox">✅</span>
            You know the leak rule: every raw <code>.subscribe()</code> needs exactly one teardown
            mechanism — store + <code>unsubscribe()</code>, async pipe, <code>toSignal</code>, or
            <code>takeUntilDestroyed()</code>.
          </li>
          <li>
            <span class="checkbox">✅</span>
            You used <code>toSignal</code> at least twice (ticker + top-rated) and can explain what
            the <code>initialValue</code> option changes about the return type.
          </li>
          <li>
            <span class="checkbox">✅</span>
            You can articulate when to reach for <code>toSignal</code> (read a stream's value
            reactively) versus <code>subscribe</code> + <code>takeUntilDestroyed()</code>
            (perform a side effect per emission).
          </li>
          <li>
            <span class="checkbox">✅</span>
            You understand why the <code>Stats</code> ticker resets on navigation — and can connect
            that to component lifecycle, not to a bug in the timer itself.
          </li>
        </ul>
      </section>

      <!-- ─── COMPLETION ─────────────────────────────────────────────── -->
      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 15: RxJS I. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Distinguish a stream (Observable) from a snapshot (Signal) and choose the right abstraction for each job.</li>
          <li>✅ Bridge any Observable into a signal with <code>toSignal</code>, including the <code>initialValue</code> trick to avoid <code>| undefined</code> types.</li>
          <li>✅ Compose transformations on a stream with <code>.pipe()</code> and <code>map()</code>/<code>filter()</code> operators.</li>
          <li>✅ Identify the three safe subscription patterns (async pipe, <code>toSignal</code>, <code>takeUntilDestroyed()</code>) and why a bare <code>.subscribe()</code> leaks.</li>
          <li>✅ Use <code>fromEvent</code> to turn any DOM event into a composable, lifecycle-safe stream.</li>
          <li>✅ Read router params as an Observable stream via <code>ActivatedRoute.paramMap</code>.</li>
          <li>✅ Explain why <code>interval</code> resets on navigation and connect it to Angular's component lifecycle.</li>
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
  `],
})
export class Day15LabComponent {

  // ── Task 1 code strings ────────────────────────────────────────────────

  task1Hint = `// In Stats component class
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed } from '@angular/core';

secondsOnPage = toSignal(interval(1000), { initialValue: 0 });
// toSignal with initialValue returns Signal<number>, not Signal<number | undefined>
// so computed() can read it without a null-guard.`;

  task1TsAnswer = `import { Component, computed } from '@angular/core';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-stats',
  standalone: true,
  template: \`...\`,
})
export class StatsComponent {
  // Field initializer — runs in injection context automatically.
  secondsOnPage = toSignal(interval(1000), { initialValue: 0 });

  minutesEquivalent = computed(() =>
    (this.secondsOnPage() / 60).toFixed(2)
  );
}`;

  task1HtmlAnswer = `<p class="ticker">
  You have been on this page for <strong>{{ secondsOnPage() }}</strong> seconds
  ({{ minutesEquivalent() }} minutes of TV equivalent).
</p>`;

  // ── Task 2 code strings ────────────────────────────────────────────────

  task2Hint = `topRated(query: string): Observable<{ name: string; rating: number }[]> {
  return this.search(query).pipe(
    map(shows =>
      shows
        .filter(s => s.rating >= 8)
        .map(s => ({ name: s.name, rating: s.rating }))
    ),
  );
}`;

  task2ServiceAnswer = `// Inside ShowsService — add after the existing search() method
topRated(query: string): Observable<{ name: string; rating: number }[]> {
  return this.search(query).pipe(
    map(shows =>
      shows
        .filter(s => s.rating >= 8)
        .map(s => ({ name: s.name, rating: s.rating }))
    ),
  );
}`;

  task2TsAnswer = `// Inside StatsComponent class — inject ShowsService and bridge via toSignal
import { toSignal } from '@angular/core/rxjs-interop';
import { inject } from '@angular/core';
import { ShowsService } from '../../services/shows.service';

private showsSvc = inject(ShowsService);

topRated = toSignal(
  this.showsSvc.topRated('office'),
  { initialValue: [] as { name: string; rating: number }[] }
);`;

  task2HtmlAnswer = `<section class="top-rated">
  <h3>Top Rated Shows (rating ≥ 8)</h3>
  @for (show of topRated(); track show.name) {
    <div class="show-row">
      <span>{{ show.name }}</span>
      <span class="badge">⭐ {{ show.rating }}</span>
    </div>
  }
  @if (topRated().length === 0) {
    <p>Loading…</p>
  }
</section>`;

  // ── Task 3 code strings ────────────────────────────────────────────────

  leakyComponentCode = `import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { ShowsService } from '../services/shows.service';

export class LeakyComponent implements OnInit {
  constructor(private showsSvc: ShowsService) {}

  // Subscription A — async pipe (safe: Angular unsubscribes when component is destroyed)
  shows$ = this.showsSvc.search('office');

  // Subscription B — toSignal (safe: internally uses takeUntilDestroyed)
  ticks = toSignal(interval(1000));

  // Subscription C — raw .subscribe() in ngOnInit (LEAKS: no teardown attached)
  ngOnInit() {
    this.showsSvc.search('office').subscribe(shows => {
      console.log('Subscription C fired', shows.length);
    });
  }
}`;

  task3HintA = `// Fix A — manual Subscription field + ngOnDestroy
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class FixedComponentA implements OnInit, OnDestroy {
  private sub!: Subscription;

  ngOnInit() {
    this.sub = this.showsSvc.search('office').subscribe(shows => {
      console.log('Fixed A fired', shows.length);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}`;

  task3HintB = `// Fix B — takeUntilDestroyed() in constructor (injection context)
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class FixedComponentB {
  constructor(private showsSvc: ShowsService) {
    this.showsSvc.search('office').pipe(
      takeUntilDestroyed(),   // no argument needed inside constructor
    ).subscribe(shows => {
      console.log('Fixed B fired', shows.length);
    });
  }
}`;

  task3AnswerA = `import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShowsService } from '../services/shows.service';

@Component({ selector: 'app-fixed-a', standalone: true, template: \`...\` })
export class FixedComponentA implements OnInit, OnDestroy {
  private sub!: Subscription;

  constructor(private showsSvc: ShowsService) {}

  ngOnInit() {
    this.sub = this.showsSvc.search('office').subscribe(shows => {
      console.log('Fixed A fired', shows.length);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    // Angular calls this when the component is removed from the DOM.
    // The Subscription is cancelled; no more log fires after this point.
  }
}`;

  task3AnswerB = `import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ShowsService } from '../services/shows.service';

@Component({ selector: 'app-fixed-b', standalone: true, template: \`...\` })
export class FixedComponentB {
  constructor(private showsSvc: ShowsService) {
    // takeUntilDestroyed() must be called in an injection context.
    // The constructor qualifies — Angular infers DestroyRef automatically.
    this.showsSvc.search('office').pipe(
      takeUntilDestroyed(),
    ).subscribe(shows => {
      console.log('Fixed B fired', shows.length);
    });
  }
}`;

  // ── Task 4 code strings ────────────────────────────────────────────────

  task4Hint = `// In Browse constructor (injection context)
fromEvent<KeyboardEvent>(document, 'keydown').pipe(
  filter(e => e.key === '/'),
  takeUntilDestroyed(),     // infers DestroyRef from constructor context
).subscribe(e => {
  e.preventDefault();
  this.searchInput()?.nativeElement.focus();
});`;

  task4TsAnswer = `import { Component, ElementRef, viewChild } from '@angular/core';
import { fromEvent, filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-browse',
  standalone: true,
  // ... other metadata
})
export class BrowseComponent {
  // Template reference variable #searchInput → ElementRef
  searchInput = viewChild<ElementRef>('searchInput');

  constructor(/* inject ShowsService etc. */) {
    fromEvent<KeyboardEvent>(document, 'keydown').pipe(
      filter(e => e.key === '/'),
      takeUntilDestroyed(),
    ).subscribe(e => {
      e.preventDefault();
      this.searchInput()?.nativeElement.focus();
    });
  }
}`;

  task4HtmlAnswer = `<!-- Add the template reference variable to your existing search input -->
<input
  #searchInput
  type="text"
  placeholder="Search shows…"
  (keyup.enter)="onSearch()"
  [(ngModel)]="searchTerm"
/>`;
}
