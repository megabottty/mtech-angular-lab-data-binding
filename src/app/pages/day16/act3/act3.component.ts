import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day16-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 16 · Act 3 of 3</span>
        <h1>🗺️ The Operator Family &amp; Closing the Loop</h1>
        <p class="subtitle">Four mapping operators, one decision each — then the same switchMap idea applied to the URL itself.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> RxJS's
        <a href="https://rxjs.dev/api/operators/exhaustMap" target="_blank" rel="noopener"><code>exhaustMap</code></a>
        reference and the
        <a href="https://rxjs.dev/api/index/function/concatMap" target="_blank" rel="noopener"><code>concatMap</code></a> /
        <a href="https://rxjs.dev/api/index/function/mergeMap" target="_blank" rel="noopener"><code>mergeMap</code></a>
        pages.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Recognize which of the four mapping operators fits a given scenario, apply <code>switchMap</code> to route params instead of keystrokes, and diagnose the classic nested-subscribe anti-pattern.</li>
          <li><strong>Why It Matters:</strong> <code>switchMap</code> is one member of a small family, and knowing which sibling fits a situation you haven't built yet is worth more than memorizing today's one use case. Nested subscribes are also one of the most common things you'll spot — and now be able to fix — in a real code review.</li>
          <li><strong>Build Steps:</strong> Match scenarios to the right mapping operator (recognition only) → rebuild a route-driven detail page with <code>switchMap</code> → debug the nested-subscribe classic.</li>
          <li><strong>Expected Outcome:</strong> Given a new scenario, you can name the right mapping operator without looking it up, and you can turn a subscribe-inside-subscribe pattern into a single clean pipe.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (The Operator Family &amp; Closing the Loop)</p>
        <p><strong>Next step:</strong> Student Lab — build the full typeahead pattern on your own, twice.</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d16-act3-operator-family" [stepNumber]="1" title="Meet the Rest of the Mapping-Operator Family">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          <code>switchMap</code> is the right choice today because only the latest keystroke's request matters.
          But "cancel the old one" is not always what you want — sometimes you want every request to run, in
          order; sometimes you want them all running in parallel; sometimes you want to ignore new attempts
          entirely while one is still in flight. Each of those is a different, named operator. Today is
          recognition-level only — you'll reach for the docs the day you actually need one of these, and that's
          the right amount of depth for now.
        </p>

        <app-code-block lang="typescript" [code]="operatorFamilyCode" />

        <div class="think-about-it">
          <p class="tai-q">Self-quiz before checking the answer: a user smashes a "Buy Now" button 5 times fast. Which operator prevents 5 orders?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — exhaustMap">
          <p><code>exhaustMap</code>. The first click starts the purchase request; every subsequent click that arrives <em>while that request is still in flight</em> is simply ignored — not queued, not cancelled, not run in parallel. Only once the in-flight request completes does <code>exhaustMap</code> pay attention to a new click again. That's exactly the "ignore new attempts while busy" behavior a double-click guard needs — <code>switchMap</code> would be wrong here (cancelling an in-flight purchase to start a new one could double-charge or leave the order in a weird state), and <code>mergeMap</code> would be worse (all 5 clicks would fire as 5 separate purchase requests in parallel).</p>
        </app-collapsible>

        <div class="info-box">
          <strong>The one-line decision each operator makes:</strong>
          <ul>
            <li><code>switchMap</code> — only the latest matters; cancel everything older.</li>
            <li><code>concatMap</code> — everything matters, in order; queue and run one at a time.</li>
            <li><code>mergeMap</code> — everything matters, independently; run them all in parallel.</li>
            <li><code>exhaustMap</code> — only what's not busy matters; ignore new attempts until the current one finishes.</li>
          </ul>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Given a new one-sentence scenario you haven't seen before, you can name the correct mapping operator and justify it in a sentence, without opening the docs.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d16-act3-route-params-switchmap" [stepNumber]="2" title="Route Params + switchMap — the Pre-httpResource Pattern">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Day 15 Act 3 showed you <code>ActivatedRoute.paramMap</code> as a stream and bridged it into a signal
          with <code>toSignal</code> alone. Today you add one operator to that chain and get something you'll
          recognize instantly: the exact pattern every pre-<code>httpResource</code> Angular codebase uses to
          load a detail page by route param.
        </p>

        <app-code-block lang="typescript" [code]="routeParamSwitchMapCode" />

        <p style="margin-top: 12px;">
          Read it the same way you read Act 1's keystroke pipeline: the <strong>outer</strong> stream is route
          param changes (one emission per navigation to a new id), and <strong>each id</strong> produces an
          <strong>inner</strong> stream — the HTTP call to fetch that show. <code>switchMap</code> cancels the
          previous fetch the instant the URL changes again, so navigating quickly between two shows can never
          leave a stale, abandoned response to flash on screen.
        </p>

        <div class="info-box">
          <strong>The graduation line:</strong> <code>httpResource</code> (Day 14) does exactly this under the
          hood — its URL-recipe function re-runs when a signal it reads changes, and the previous in-flight
          request is abandoned in favor of the new one. You built the manual, explicit version of that same
          idea today. You can now read both dialects: the older subscribe-based codebases you'll maintain, and
          the newer resource-based code you'll write.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Why does this pattern need switchMap at all — what would go wrong with just map instead?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — map can't flatten a stream of streams">
          <p><code>map</code> would transform each route-param emission into an <em>Observable</em> (the HTTP call) — but it wouldn't do anything with that inner Observable, so you'd end up with a stream of un-subscribed Observables instead of a stream of shows. You'd need to manually subscribe to each one yourself, which is exactly the nested-subscribe pattern Step 3 exists to fix. <code>switchMap</code> does two jobs at once: it maps each id to an inner Observable <em>and</em> subscribes to it for you, flattening "a stream of streams" down into a single stream of shows — while also cancelling the previous inner subscription, which <code>map</code> has no concept of at all.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Build the paramMap + switchMap detail-page pattern in your own project, navigate quickly between two different shows, and confirm no stale show ever flashes on screen mid-navigation.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d16-act3-debug-nested-subscribe" [stepNumber]="3" title="Debug It — The Nested-Subscribe Classic">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Day 13's lab warned you this would happen and told you it was fine "for now": at some point you
          wrote a <code>.subscribe()</code> inside another <code>.subscribe()</code>. Here's the shape, almost
          certainly close to something in your own project right now:
        </p>

        <app-code-block lang="typescript" [code]="nestedSubscribeBuggyCode" />

        <p style="margin-top: 12px;">
          Before reading the fix, articulate both defects out loud or in a comment — there are two, and they're
          different kinds of bug.
        </p>

        <div class="think-about-it">
          <p class="tai-q">What are the two separate defects in the nested-subscribe snippet above?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a race condition, and a leak">
          <p>
            <strong>Defect 1 — the same race condition from Act 1, in a new location.</strong> Each call to
            the outer <code>.subscribe()</code> callback starts a brand-new inner <code>.subscribe()</code> to
            <code>byId(...)</code>, and nothing cancels the previous inner subscription when a new route param
            arrives. Navigate quickly between two shows on a throttled connection and you can watch a stale
            show flash on screen — the inner request for the show you navigated <em>away</em> from can resolve
            <em>after</em> the request for the show you're currently viewing.
          </p>
          <p style="margin-top: 12px;">
            <strong>Defect 2 — nothing ever unsubscribes.</strong> Both the outer <code>paramMap</code>
            subscription and every inner <code>byId(...)</code> subscription are bare <code>.subscribe()</code>
            calls with no <code>takeUntilDestroyed()</code>, no stored <code>Subscription</code>, no
            <code>ngOnDestroy</code>. This is exactly Day 15's leak pattern — the subscriptions outlive the
            component.
          </p>
        </app-collapsible>

        <p style="margin-top: 12px;"><strong>The fix</strong> collapses both defects into one clean pipe:</p>

        <app-code-block lang="typescript" [code]="nestedSubscribeFixedCode" />

        <div class="info-box">
          <strong>Your new code-review superpower:</strong> the moment you see <code>subscribe</code> nested
          inside another <code>subscribe</code> in a pull request, you now know exactly what to say — name the
          two defects, and suggest collapsing the nesting into a single <code>.pipe(switchMap(...))</code>
          chain, bridged into a signal with <code>toSignal</code> if a template needs to read it.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Find a nested-subscribe pattern in your own project (or write one on purpose to practice on), name both defects in a comment, and refactor it into a single <code>switchMap</code> pipe bridged with <code>toSignal</code>.</div>
      </app-lesson-step>

      <div class="info-box">
        <strong>Day 16 Acts complete.</strong> You've reproduced and fixed the classic search race condition, built the canonical typeahead pipeline, learned where <code>catchError</code> actually belongs, and closed the loop between route params and <code>switchMap</code>. Head to the Student Lab to apply all of it independently.
      </div>

      <div class="nav-footer">
        <a routerLink="/day16/act2" class="btn-secondary">← Act 2: Building the Typeahead</a>
        <a routerLink="/day16/lab" class="btn-primary">Student Lab: Your Turn →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'concatMap',
      plainEnglish: 'Run every inner stream in order, one at a time — never skip, never overlap.',
      analogy: '🎟️ A single-file queue where the next person only steps up once the current one is fully served.'
    },
    {
      concept: 'mergeMap',
      plainEnglish: 'Run every inner stream immediately and independently, all in parallel.',
      analogy: '🚪 Every guest let in through their own door the moment they arrive, no waiting.'
    },
    {
      concept: 'exhaustMap',
      plainEnglish: 'Ignore new triggers entirely while one inner stream is still in flight.',
      analogy: '🚧 A one-lane bridge that simply turns away new cars until the current one has crossed.'
    },
    {
      concept: 'nested subscribe',
      plainEnglish: 'A .subscribe() call inside another .subscribe() callback — almost always a race condition plus a leak, fixable with one pipe.',
      analogy: '🪆 A matryoshka doll of promises where nobody remembers to close the outer one.'
    }
  ];

  operatorFamilyCode = `// Same shape every time: operator(term => innerObservable)
// The only difference is HOW the inner Observables are handled:

switchMap(term => http.get(...))   // cancel the old, switch to the new
                                    // → search, autocomplete, route-param loads

concatMap(job => http.post(...))   // queue them, run strictly in order
                                    // → sequential saves, ordered steps that must not overlap

mergeMap(id => http.get(...))      // run them all, in parallel, independently
                                    // → firing several independent notifications at once

exhaustMap(click => http.post(...)) // ignore new triggers until the current one finishes
                                    // → the "Buy Now" double-click guard`;

  routeParamSwitchMapCode = `import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

export class ShowDetail {
  private route = inject(ActivatedRoute);
  private showsSvc = inject(ShowsService);

  show = toSignal(
    this.route.paramMap.pipe(
      map(p => Number(p.get('id'))),
      switchMap(id => this.showsSvc.byId(id)),   // cancels the previous fetch on every id change
    )
  );
}`;

  nestedSubscribeBuggyCode = `// The classic nested-subscribe pattern — works, but hides two defects.
this.route.paramMap.subscribe(p => {
  this.showsSvc.byId(Number(p.get('id'))).subscribe(show => {
    this.show.set(show);
  });
});`;

  nestedSubscribeFixedCode = `import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

show = toSignal(
  this.route.paramMap.pipe(
    map(p => Number(p.get('id'))),
    switchMap(id => this.showsSvc.byId(id)),
  )
);
// One pipe. switchMap cancels stale fetches; toSignal subscribes once
// and unsubscribes automatically when the component is destroyed.`;
}
