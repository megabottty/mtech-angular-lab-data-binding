import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day14-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 14 · Act 3 of 3</span>
        <h1>🐛 Debug It — Resilience Instincts</h1>
        <p class="subtitle">Three bugs everyone should meet today, in class, where they're cheap.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Debug three realistic HTTP/resilience mistakes and turn them into habits students can reuse in code reviews and live bug hunts.</li>
          <li><strong>Why It Matters:</strong> Resilient apps fail honestly. The real skill is not just writing the happy path once; it is spotting subtle async and error-handling mistakes before users do.</li>
          <li><strong>Build Steps:</strong> Diagnose a compile-time <code>httpResource</code> type error caused by passing a value instead of a function → flag the deprecated positional <code>subscribe()</code> style → catch the missing loading reset that creates an eternal spinner.</li>
          <li><strong>Expected Outcome:</strong> You can explain the “recipe, not a value” rule for <code>httpResource</code>, rewrite old <code>subscribe(next, error)</code> code into an observer object, and audit every terminal branch for proper loading cleanup.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Debug It &amp; Resilience Instincts)</p>
        <p><strong>Next step:</strong> Student Lab — apply all of today's error-handling and <code>httpResource</code> ideas on your own.</p>
      </section>

      <app-lesson-step stepId="d14-act3-debug-resource" [stepNumber]="1" title="Bug 1 — A String Instead of a Function">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>This first "bug" doesn't even make it to the browser — and that's the lesson. It looks like an easy typo (forgetting the arrow function), but <code>httpResource</code>'s first parameter is typed to require a function, so TypeScript stops you at compile time, not at runtime.</p>
        <p style="margin-top: 12px;">Try the snippet below in your editor and watch the red squiggly line appear immediately under the string argument.</p>
        <h4>Buggy snippet</h4>
        <app-code-block lang="typescript" [code]="buggyResourceCode" />
        <div class="info-box">
          <strong>The compiler error, roughly:</strong> "Argument of type 'string' is not assignable to parameter of type '() =&gt; string | undefined'." TypeScript is telling you, in its own words, exactly the mental model we want: <code>httpResource</code> wants a <strong>recipe</strong> (a function it can re-run), not a frozen value.
        </div>
        <p style="margin-top: 12px;">The fix is one pair of parentheses and one arrow — but the idea underneath is the whole lesson. Angular can only track which signals were read while producing the request if you hand it executable code it can call again on every change.</p>
        <h4>Corrected snippet</h4>
        <app-code-block lang="typescript" [code]="resourceFixCode" />
        <div class="ask-class">If TypeScript catches this before the app even runs, why is it still worth walking through as a "bug"?</div>
        <div class="info-box">
          <strong>Answer to listen for:</strong> because the compile error only tells you <em>what</em> is wrong syntactically, not <em>why</em> the API is shaped that way. Understanding "recipe, not a value" is what lets you reason about resources correctly everywhere else, including cases the type checker can't catch for you.
        </div>
        <app-collapsible icon="🧩" label="Deep Dive — What exactly is Angular tracking here?">
          <p>When <code>httpResource(() =&gt; \`...&#36;&#123;this.id()&#125;...\`)</code> runs that function, Angular observes that the function read the <code>id</code> signal. That dependency link lets Angular call the function again later when <code>id</code> changes and then refetch the new URL.</p>
          <p style="margin-top: 12px;">A plain string could never provide this — which is exactly why the type signature forbids it outright, rather than accepting it and silently failing to refetch at runtime.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in your own words, why <code>httpResource</code>'s first argument must be a function and not a plain value — and why TypeScript enforces that at compile time rather than leaving it as a runtime footgun.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d14-act3-debug-subscribe-style" [stepNumber]="2" title="Bug 2 — The Deprecated subscribe() Style">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Not every bug throws an exception. Some are code-review bugs: the app runs, but the code is written in an older style that makes intent harder to read and maintenance easier to botch.</p>
        <p style="margin-top: 12px;">This positional multi-callback form of <code>.subscribe(next, error)</code> still technically works in current RxJS, but it is a deprecated/discouraged style. New code should prefer the observer-object form from Act 1 because named properties are clearer than positional argument order you have to remember.</p>
        <h4>Buggy snippet</h4>
        <app-code-block lang="typescript" [code]="buggySubscribeStyleCode" />
        <p style="margin-top: 12px;">The modern rewrite is more self-documenting immediately: you can scan <code>next</code> and <code>error</code> by name instead of mentally mapping “first callback means success, second callback means failure.”</p>
        <app-code-block lang="typescript" [code]="subscribeStyleFixCode" />
        <div class="ask-class">If both versions still work today, why should a code reviewer still ask for the observer-object rewrite?</div>
        <app-collapsible icon="✅" label="Show Answer — Observer-object form">
          <p>Because the observer object is clearer, easier to extend, and aligned with the style new RxJS code should use going forward. “Works” is not the same as “good enough to keep teaching and copying.”</p>
          <app-code-block lang="typescript" [code]="subscribeStyleFixCode" />
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can recognize the deprecated positional-callback <code>subscribe()</code> style and rewrite it as an observer object.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d14-act3-debug-loading-reset" [stepNumber]="3" title="Bug 3 — The Eternal Spinner Strikes Back">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>Now we get to the bug that hurts real users most often because the code looks almost correct. The request fails, the error branch does something, and everyone relaxes — except the loading flag never resets, so the UI tells a half-true story forever.</p>
        <p style="margin-top: 12px;">That is the exact bug from Act 1's warm-up where the offline demo kept saying <code>Searching…</code> forever. The difference now is that students can point to the precise missing line in a code review instead of only describing the symptom they saw in the browser.</p>
        <h4>Buggy snippet</h4>
        <app-code-block lang="typescript" [code]="buggyFullSnippetCode" />
        <div class="info-box">
          <strong>Act 1 connection:</strong> this is why the error handler set <code>loading.set(false)</code> <strong>first</strong>, before setting the error message. Both branches of <code>subscribe</code> — success and failure — must reset loading every time, with no exceptions.
        </div>
        <div class="ask-class">In your own words, write the one-sentence code-review comment you'd leave on a pull request containing this bug.</div>
        <div class="warning-box">This is the single most common bug in real-world error handling code — an unhappy path that was almost right, just missing one line. Reviewing your own error branches as carefully as your success branches is a habit, not a talent.</div>
        <app-collapsible icon="✅" label="Show Answer — the correct dual-branch handling">
          <p>The important structure is not just “use the observer object.” The deeper rule is that every terminal branch cleans up loading before doing its branch-specific work.</p>
          <app-code-block lang="typescript" [code]="loadingResetFixCode" />
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can audit any <code>subscribe</code>- or resource-based fetch and verify every terminal branch (success <strong>and</strong> failure) correctly resets loading state.</div>
      </app-lesson-step>

      <div class="info-box">
        <strong>Quick recap:</strong> Today you added error handling and retry to <code>Browse</code>, met <code>httpResource</code> as a declarative alternative to <code>ngOnInit</code> + <code>subscribe</code>, and debugged three realistic resilience bugs. Head to the Student Lab to apply all of it independently.
      </div>

      <div class="nav-footer">
        <a routerLink="/day14/act2" class="btn-secondary">← Act 2: httpResource</a>
        <a routerLink="/day14/lab" class="btn-primary">Student Lab: Your Turn →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'resource recipe',
      plainEnglish: 'Give httpResource a function it can rerun when signals change.',
      analogy: '🧾 A recipe card the cook can use again for each new order.'
    },
    {
      concept: 'observer object',
      plainEnglish: 'Name subscribe callbacks explicitly instead of relying on argument order.',
      analogy: '🏷️ Labeled bins instead of two unlabeled boxes on the floor.'
    },
    {
      concept: 'dual-branch cleanup',
      plainEnglish: 'Success and failure both must turn loading off.',
      analogy: '🛑 Turning off the dashboard warning light no matter how the trip ends.'
    },
    {
      concept: 'resilience instinct',
      plainEnglish: 'Read unhappy paths as carefully as happy paths.',
      analogy: '🧯 A fire drill you practice before the smoke appears.'
    }
  ];

  buggyResourceCode = `showRes = httpResource<TvMazeShow>(\`https://api.tvmaze.com/shows/\${this.id()}\`);  // bug 1`;

  resourceFixCode = `showRes = httpResource<TvMazeShow>(() => \`https://api.tvmaze.com/shows/\${this.id()}\`);`;

  buggySubscribeStyleCode = `this.showsSvc.search(term).subscribe(
  shows => this.shows.set(shows),
  err => this.error.set('failed')     // bug 2 (style)
);`;

  subscribeStyleFixCode = `this.showsSvc.search(term).subscribe({
  next: shows => this.shows.set(shows),
  error: err => this.error.set('failed')
});`;

  buggyFullSnippetCode = `this.showsSvc.search(term).subscribe(
  shows => this.shows.set(shows),
  err => this.error.set('failed')     // bug 2 (style) — and where's loading reset? (bug 3)
);`;

  loadingResetFixCode = `this.loading.set(true);
this.showsSvc.search(term).subscribe({
  next: shows => {
    this.loading.set(false);
    this.shows.set(shows);
  },
  error: err => {
    this.loading.set(false);
    this.error.set('failed');
  }
});`;
}
