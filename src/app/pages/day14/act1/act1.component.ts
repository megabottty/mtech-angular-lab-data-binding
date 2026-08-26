import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day14-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 14 · Act 1 of 3</span>
        <h1>🚨 Errors in the Subscribe World</h1>
        <p class="subtitle">Yesterday we handled loading. Today: what happens when the network says no?</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 13's BingeBoard is fully working — live search on Browse with the three-state (loading/results/empty) template, and a Detail page fetching by id over real HTTP. If either of those isn't working yet, finish Day 13's lab before continuing; everything below adds to that code.
      </div>

      <app-mental-model-card [models]="models" />

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's docs on
        <a href="https://angular.dev/guide/http/making-requests" target="_blank" rel="noopener">HTTP error handling</a>.
        The section on <code>HttpErrorResponse</code> pairs directly with Step 3 below.
      </div>

      <div class="info-box">
        <strong>Warm-up drill — do this now, before reading further:</strong> start from yesterday's Browse, open DevTools, switch the Network tab to <code>Offline</code>, and search for anything. Watch what happens. The eternal <code>Searching…</code> message is the bug this entire act exists to fix.
      </div>

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Upgrade Day 13's happy-path-only HTTP code so the UI can admit failure, explain failure, and give the user a real recovery path.</li>
          <li><strong>Why It Matters:</strong> Production apps are not judged by how they behave when everything works. They are judged by whether they stay honest and usable when the network, the server, or the request goes sideways. This is the line between a demo and a product.</li>
          <li><strong>Build Steps:</strong> Break Browse on purpose → add an <code>error</code> signal and a retry loop → classify failures so the user message matches the actual problem.</li>
          <li><strong>Expected Outcome:</strong> You can explain the three questions every data-fetching UI must answer and implement the first practical error-handling version with <code>.subscribe(&#123; next, error &#125;)</code>.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Errors in the Subscribe World)</p>
        <p><strong>Next step:</strong> Act 2 (httpResource — The Declarative Way)</p>
        <p><strong>Time:</strong> About 30 minutes, plus whatever time you spend deliberately breaking your own app — budget for that, it's the point.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d14-act1-warmup-problem" [stepNumber]="1" title="The Warm-Up — Breaking It On Purpose">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>Day 13 gave Browse an honest loading state, but it still quietly assumes success forever. You just watched this yourself in the warm-up above: with the network offline, <code>Searching…</code> stays on screen because <code>loading.set(false)</code> only ever runs inside the success callback — and if the request never succeeds, that line never runs.</p>

        <p style="margin-top: 12px;">That infinite spinner is not a neutral default. It is a lie: the request already failed, the app knows nothing useful anymore, and the user deserves a new message plus a way forward instead of endless fake progress.</p>

        <p style="margin-top: 12px;">This is the entire Day 14 framing. Every real data-fetching UI must answer three questions: what shows while we wait (Day 13 solved that), what shows if it fails (today), and how the user recovers (also today).</p>

        <div class="think-about-it">
          <p class="tai-q">What should a good app do right now, instead of an eternal spinner?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the three honest states">
          <p>A good app should immediately clear the loading state, display a clear message explaining that the request failed, and offer a Retry button so the user has an actual path forward. Continuing to show a spinner after the request has already failed is dishonest — it promises ongoing progress when there is none. The three honest states are: loading while work is in progress, a result when it succeeds, and a failure message with a recovery option when it does not.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>The spec you're building to:</strong> tell the user something went wrong, offer a retry path, and never keep pretending work is still happening when the request has already failed.
        </div>

        <div class="warning-box">Networks fail, servers fail, and users type ids that do not exist. The difference between a toy and a production app is almost entirely about what happens on that unhappy path.</div>

        <app-collapsible icon="🧩" label="Deep Dive — why an eternal spinner is a real bug, not just ugly">
          <p>A spinner makes a promise: "work is still in progress." When the request is already dead, that promise becomes false information. The UI is no longer merely incomplete; it is actively misleading the user about reality.</p>
          <p style="margin-top: 12px;">That is why error handling is part of correctness, not just polish. Honest state means the screen's story matches the actual state of the network request. This is worth internalizing as a general principle beyond today's specific bug: any time your UI can get "stuck" showing a state that no longer matches reality, that's a correctness bug, even if nothing ever throws an exception.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've personally watched your own app get stuck on "Searching…" forever with the network offline. You can articulate the three questions every data-fetching UI must answer and explain why an eternal spinner is a bug, not a neutral default.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d14-act1-error-signal" [stepNumber]="2" title="Adding an error Signal + Retry to Browse">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>The smallest honest upgrade is to admit a fourth state: failure. Keep Day 13's loading, results, and empty-after-search model, then add an <code>error</code> signal that starts as <code>null</code>, gets cleared before each new request, and becomes a user-facing message only if the HTTP call fails.</p>

        <p style="margin-top: 12px;">There is also a deliberate little gap you'll need to catch for yourself: the retry button needs memory. A careful builder notices that the component must store the most recent search term in <code>lastTerm</code>, or the UI can say "Retry" without actually knowing what to retry.</p>

        <p style="margin-top: 12px;">The snippet below zooms in on the new error-handling lines, so your Day 13 blank-term guard can still sit above it. Focus on the observer-object form of <code>.subscribe(...)</code>: named <code>next</code> and <code>error</code> handlers in one object, which is the modern, preferred style — you'll see exactly why in Act 3.</p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> update your <code>Browse</code> component's <code>runSearch</code> method:</p>

        <app-code-block lang="typescript" [code]="runSearchWithErrorCode" />

        <div class="warning-box">Careful reader trap: the code above only works as a real retry experience if you also add and maintain <code>lastTerm</code> as a signal on the component. The button cannot magically remember the user's last query unless the component remembers it first.</div>

        <p style="margin-top: 12px;"><strong>Then</strong> add the error branch to your template, right after the empty-results branch:</p>

        <app-code-block lang="html" [code]="errorStateTemplateCode" />

        <div class="info-box">
          <strong>Style note that matters:</strong> prefer <code>.subscribe(&#123; next: ..., error: ... &#125;)</code> over the older positional form <code>.subscribe(nextFn, errorFn)</code>. Act 3 later treats the positional-callback version as a bug to spot and fix — so getting used to the observer-object form now saves you from unlearning a habit in two days.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Try the full loop yourself: go offline, search, confirm the friendly error appears, go back online, and click Retry. Does it work end to end — and if not, what's missing?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what the working loop looks like, and the most common miss">
          <p>When the browser is offline, the error callback fires with <code>status: 0</code>, <code>loading.set(false)</code> clears the spinner, and <code>error.set(...)</code> displays the friendly message. When you click Retry, <code>runSearch(lastTerm())</code> re-runs the request using the stored last search term — so you never have to retype anything. Coming back online and clicking Retry should produce real results and clear the error message, completing the full recovery loop. If clicking Retry does nothing or reruns an empty search, the most likely cause is a missing or unset <code>lastTerm</code> signal — that's the trap called out above.</p>
        </app-collapsible>

        <app-collapsible icon="💡" label="Hint — Where exactly does lastTerm belong?">
          <p>Add <code>lastTerm = signal('');</code> alongside your other component signals, then set it at the very top of <code>runSearch(term)</code> before the request leaves. That way the retry button can re-run the exact term that most recently failed.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Go offline, search, and see a friendly error message replace the spinner — not an eternal "Searching…". Go back online, click Retry, and see real results appear without retyping anything. You can add an error signal, use the observer-object subscribe form, and build a working retry button that remembers the last search term.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d14-act1-taxonomy" [stepNumber]="3" title="Error Taxonomy — Not All Failures Are Equal">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>Once you can catch failure at all, the next maturity jump is noticing that the error object is not one generic blob. Open the browser console, inspect the <code>HttpErrorResponse</code>, and ask yourself the production question: <em>what kind of failure is this?</em></p>

        <p style="margin-top: 12px;">Three categories matter immediately. <code>status: 0</code> means the request never really made it out at all — offline, DNS trouble, or a CORS block. <code>4xx</code> means the client asked badly or asked for something missing, so try it live: call <code>byId(999999999)</code> on your own detail page and see the failure — this should produce a specific "show not found" style message. <code>5xx</code> means the server broke its side of the bargain, so the honest message becomes "try again shortly."</p>

        <p style="margin-top: 12px;">This distinction is not academic trivia. Knowing how to separate <code>0</code>, <code>4xx</code>, and <code>5xx</code> already sounds more production-ready in a job interview or a code review, because the UI stops flattening different problems into one lazy sentence.</p>

        <div class="think-about-it">
          <p class="tai-q">If you see "Something went wrong" as your only error message, what useful information is being hidden from you about what to do next?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what a flattened message hides">
          <p>A generic message hides both the cause and the correct recovery action. A <code>status: 0</code> failure means the request never left the device, so you should check your connection — retrying immediately is pointless. A <code>404</code> means the show genuinely does not exist, so retrying will never help; you should go back to Browse instead. A <code>500</code> means the server broke, so "try again in a moment" is the right advice. Flattening all three into one message strips away exactly the information that would tell the user what to do next.</p>
        </app-collapsible>

        <p style="margin-top: 12px;"><strong>Try this yourself:</strong> temporarily call your service with a bogus id and log what comes back:</p>

        <app-code-block lang="typescript" [code]="errorTaxonomyCode" />

        <div class="info-box">
          <strong>Three buckets worth memorizing:</strong>
          <ul>
            <li><code>status: 0</code> — the request never left the building. Tell the user to check the connection.</li>
            <li><code>4xx</code> — our fault as the client, including a real <code>404</code> not-found. Be specific: "show not found" beats "unknown error."</li>
            <li><code>5xx</code> — the server failed. Tell the user to try again shortly.</li>
          </ul>
        </div>

        <div class="warning-box">Do not flatten every failure into one generic "Oops." Different failure categories deserve different user-facing messages and different recovery advice.</div>

        <app-collapsible icon="🧩" label="Deep Dive — what lives inside HttpErrorResponse?">
          <p><code>HttpErrorResponse</code> gives you a numeric <code>.status</code> plus an <code>.error</code> payload, which is the parsed response body when the server actually sent one. Those two clues are what you inspect to decide whether the problem is "offline," "bad request / not found," or "server exploded."</p>
          <app-code-block lang="typescript" [code]="httpErrorInspectionCode" />
        </app-collapsible>

        <app-collapsible icon="💡" label="Hint — a tiny preview of retry(1), for later">
          <p>RxJS has a one-line operator named <code>retry(1)</code> that automatically re-attempts a flaky request once before your error handler runs — useful for a request that failed because of a brief network hiccup rather than a real problem. This is worth knowing exists, but don't reach for it yet; Day 15 is where pipe operators get the full treatment, and <code>retry</code> will make a lot more sense once you understand what <code>.pipe()</code> is actually doing.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Trigger a real <code>404</code> against your own app (try a huge, nonexistent id) and confirm you can read <code>.status</code> from the console. You can distinguish <code>status: 0</code>, <code>4xx</code>, and <code>5xx</code> failures and explain why each deserves a different user-facing message.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day13/lab" class="btn-secondary">← Day 13 Lab</a>
        <a routerLink="/day14/act2" class="btn-primary">Act 2: httpResource — The Declarative Way →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'HttpErrorResponse',
      plainEnglish: 'The error object HttpClient hands you when a request fails.',
      analogy: '📨 A returned-package slip explaining why delivery did not happen.'
    },
    {
      concept: 'status: 0',
      plainEnglish: 'The request never really left the building.',
      analogy: '🚪 The courier never made it out the front door.'
    },
    {
      concept: '4xx vs 5xx',
      plainEnglish: 'Who owns the mistake changes what message the user deserves.',
      analogy: '🧭 Wrong address versus a broken warehouse are not the same problem.'
    },
    {
      concept: 'retry button',
      plainEnglish: 'A do-over the user controls, not an eternal wait.',
      analogy: '🔁 Pressing resend after the wifi comes back.'
    }
  ];

  runSearchWithErrorCode = `error = signal<string | null>(null);
lastTerm = signal('');

runSearch(term: string) {
  this.lastTerm.set(term);
  this.loading.set(true);
  this.error.set(null);
  this.showsSvc.search(term).subscribe({
    next: shows => { this.shows.set(shows); this.loading.set(false); this.searched.set(true); },
    error: () => {
      this.loading.set(false);
      this.error.set('Could not reach the show database. Check your connection and retry.');
    },
  });
}`;

  errorStateTemplateCode = `} @else if (error()) {
  <div class="error-box">
    <p>{{ error() }}</p>
    <button (click)="runSearch(lastTerm())">Retry</button>
  </div>
}`;

  errorTaxonomyCode = `import { HttpErrorResponse } from '@angular/common/http';

messageForError(err: HttpErrorResponse): string {
  if (err.status === 0) {
    return 'Could not reach the show database. Check your connection.';
  }

  if (err.status >= 400 && err.status < 500) {
    return 'That show was not found.';
  }

  return 'The server had a problem. Try again shortly.';
}`;

  httpErrorInspectionCode = `this.showsSvc.byId(999999999).subscribe({
  next: show => this.show.set(show),
  error: (err: HttpErrorResponse) => {
    console.log('status', err.status);
    console.log('payload', err.error);
  }
});

// Tiny preview for later:
// this.showsSvc.byId(999999999).pipe(retry(1))`;
}
