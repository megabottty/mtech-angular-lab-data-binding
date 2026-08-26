import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day13-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 13 · Act 3 of 4</span>
        <h1>🔍 Browse Goes Live</h1>
        <p class="subtitle">Loading, results, and empty states — the three-state pattern every production UI needs.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Wire the Browse page to live API results and build an honest template that distinguishes loading, success, and "searched but empty."</li>
          <li><strong>Why It Matters:</strong> This is where asynchronous UI stops being theory and becomes something you feel. You've watched the Network tab from the outside in Act 2 — now you build the screen that has to represent that timing gap correctly, and you'll meet the bug almost everyone meets the first time they try.</li>
          <li><strong>Build Steps:</strong> Add three signals in <code>Browse</code> → render the three-state template with control flow → debug the classic "subscribe does not wait" mistake.</li>
          <li><strong>Expected Outcome:</strong> You can justify why a live search page needs separate loading, results, and searched state, then place every <code>set()</code> call at the correct async moment.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Browse Goes Live)</p>
        <p><strong>Next step:</strong> Act 4 (Detail Page Goes Live)</p>
        <p><strong>Time:</strong> About 35 minutes, including the debugging step — budget real time for Step 3, it's the conceptual heart of the day.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d13-act3-browse-component" [stepNumber]="1" title="Browse Component — loading, shows, searched Signals">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>The Browse page now owns three separate questions, so it needs three separate signals. <code>shows</code> stores the current result list and starts as an empty array because we have not received anything yet. <code>loading</code> flips to true right before the request leaves and flips back to false only when the response actually lands.</p>

        <p style="margin-top: 12px;"><code>searched</code> is the subtle one. Its entire job is to separate "the user has not searched yet" from "the user searched and got zero matches." Without that distinction, an empty-state message appears on first page load and lies to the user — it would claim "no shows matched" before anyone had typed anything at all.</p>

        <div class="think-about-it">
          <p class="tai-q">Why do we need THREE signals here instead of just <code>shows</code> alone? What would go wrong with only one?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why one signal can't carry three meanings">
          <p>An empty <code>shows</code> array is ambiguous — it could mean "the page just loaded and nobody searched yet," "a request is in flight," or "the search finished and found nothing." Each of those is a different UI truth that deserves a different message. <code>loading</code> distinguishes the in-flight state, and <code>searched</code> distinguishes "never searched" from "searched and got zero results," so the template can display exactly the right message at every moment.</p>
        </app-collapsible>

        <p style="margin-top: 12px;"><strong>Do this:</strong> replace your <code>Browse</code> component's fields and add a <code>runSearch</code> method:</p>

        <app-code-block lang="typescript" [code]="browseLiveCode" />

        <div class="info-box">
          <strong>Why this shape is so common:</strong> arrays tell you what data you have, but they do not tell you whether you are still waiting or whether the search has never happened yet. Those are different UI facts, so they deserve different state. You'll see this exact three-signal shape (or its equivalent) in almost every list-fetching screen you ever build, in Angular or anywhere else.
        </div>

        <app-collapsible icon="🧩" label="Deep Dive — is there a name for this pattern?">
          <p>
            Some teams formalize this into one object instead of three separate signals — something like
            <code>&#123; status: 'idle' | 'loading' | 'success' | 'error', data: Show[] &#125;</code> — precisely because
            an empty array is such a notorious source of ambiguity. That's a design choice, not a requirement; three
            separate signals communicate the same three facts and are simpler to read for a page this size. As your
            state grows more complex (more than 3-4 flags), consolidating into one status value becomes worth the
            extra structure.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your <code>Browse</code> component compiles with the three signals and a <code>runSearch()</code> method. You can explain the job of <code>shows</code>, <code>loading</code>, and <code>searched</code> and why each represents a different UI truth. Nothing renders differently yet — Step 2 builds the template that actually uses them.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d13-act3-three-state" [stepNumber]="2" title="The Three-State Template Pattern">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>The template now asks three questions in order: are we loading, do we have results, or did we search and come up empty? That ordering matters because the screen must tell the truth about the most immediate state first. If the results check came later or the searched check came earlier, the wrong message would flash at the wrong time.</p>

        <p style="margin-top: 12px;">
          Step back for a second and notice how much bigger than Angular this pattern actually is. Every list screen
          you have ever used — a search engine, an inbox, a food-delivery app — is answering the same three
          questions: <em>are we still waiting, did we get something, or did we get nothing?</em> Getting this order
          right is not an Angular skill, it's a UI-correctness skill that happens to be expressed in Angular's
          control-flow syntax today.
        </p>

        <p style="margin-top: 12px;">The <code>#q</code> name is a template reference variable. For today, that simply means "grab the live input element so we can read its current <code>value</code> when Enter is pressed or the button is clicked," without introducing <code>[(ngModel)]</code>.</p>

        <div class="think-about-it">
          <p class="tai-q">When the page first renders before any search has run, which branch should win — and why?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — what should be on screen before any search">
          <p>None of the three content branches should win on first render — the page should show nothing (or a prompt to search), because <code>loading()</code> is false, <code>shows().length</code> is zero, and <code>searched()</code> is also false. The <code>searched()</code> guard is the critical one: it ensures the "no results" empty-state message only appears after the user has actually performed a search, not on initial page load.</p>
        </app-collapsible>

        <p style="margin-top: 12px;"><strong>Do this:</strong> replace your Browse template with the search box and the three-branch chain:</p>

        <app-code-block lang="html" [code]="browseThreeStateHtmlCode" />

        <div class="info-box">
          <strong>The professional pattern:</strong> loading → results → empty-after-search. Production UIs live by this three-state pattern, and the order of the <code>&#64;else if</code> chain matters. <code>searched()</code> belongs last, after checking <code>shows().length</code>, or the page would show "no results" on the very first render before anyone searched.
        </div>

        <div class="warning-box">We are deliberately NOT wiring live-as-you-type search today — you press Enter or click Search, on purpose. Firing <code>runSearch()</code> on every keystroke creates a subtle bug: overlapping requests can resolve out of order, so old results may overwrite newer intent (imagine typing "batman" quickly — the request for "bat" could resolve after the request for "batman" and clobber the correct results with stale ones). This isn't laziness on our part; it's a deliberate sequencing decision. Day 15 introduces <code>switchMap</code>, an operator built specifically to solve this, and the fix will make far more sense once you've felt why it's needed.</div>

        <app-collapsible icon="💡" label="Hint — Why use #q instead of ngModel here?">
          <p>This lesson's goal is async state, not form APIs. A template reference variable keeps the input story tiny: the DOM already knows the current value, so we read <code>q.value</code> at the exact moment the event fires.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Run <code>npm start</code> and search "office." You should see "Searching…" briefly, then real posters and real ratings appear. Watch closely — the loading text, result grid, and empty message each appear at a different moment for a specific reason. Try searching for something nonsensical like "zzzqqq" and confirm you see "No shows matched" only after that search, not before you've searched at all.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d13-act3-debug" [stepNumber]="3" title="Debug It — The Async Bug of the Week">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>This step is where "asynchronous" stops being a vocabulary word and becomes something you personally debug. Below are two buggy versions of <code>runSearch()</code>. Try to spot what's wrong in each <em>before</em> opening the answer — this is worth the friction.</p>

        <h4>Buggy snippet A</h4>
        <app-code-block lang="typescript" [code]="buggyObservableCode" />

        <h4 style="margin-top: 16px;">Buggy snippet B</h4>
        <app-code-block lang="typescript" [code]="buggyLoadingTimingCode" />

        <app-collapsible icon="🧩" label="Bug 1 — what's actually wrong, and why TypeScript catches it">
          <p><code>search(term)</code> returns an <code>Observable&lt;Show[]&gt;</code>, not a <code>Show[]</code>. TypeScript catches this loudly at <code>this.shows.set(shows)</code> because the signal expects the resolved array, not the Observable wrapper.</p>
          <p style="margin-top: 12px;">Read that error message carefully instead of skimming past it. It is not noise — it is the language telling you that you have described "a value that will arrive later" (an Observable), not "the data is already here right now" (an array). If you paste snippet A into your own editor, you'll see this error yourself before the app even runs.</p>
        </app-collapsible>

        <app-collapsible icon="💡" label="Bug 2 — the deeper one, and why it survives fixing Bug 1">
          <p>Even after fixing Bug 1 by moving the array write into <code>.subscribe(...)</code>, it's extremely common to leave <code>this.loading.set(false)</code> outside the callback. That line then runs synchronously right after <code>.subscribe()</code> is called, before the response has arrived, so the loading message disappears immediately — often before the request has even reached the server.</p>
          <p style="margin-top: 12px;">Trace the timeline on paper, line by line: call <code>search()</code> → call <code>subscribe()</code> and register the callback → <code>subscribe()</code> returns immediately → <code>loading.set(false)</code> runs NOW (wrong) → time passes → the HTTP response finally arrives → the callback runs later.</p>
        </app-collapsible>

        <div class="warning-box">Do not rush this one. This is the single most important "this is what asynchronous actually means" moment of the week — the callback runs later, and code written after <code>.subscribe(...)</code> in your method runs immediately, not after the callback. If this feels confusing right now, that confusion is the correct reaction; it clears up once you've traced the timeline yourself.</div>

        <div class="think-about-it">
          <p class="tai-q">If <code>.subscribe()</code> doesn't block, what guarantees the callback function eventually runs at all, and why is it safe to put <code>loading.set(false)</code> inside it?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why the callback is the safe place">
          <p>Angular's <code>HttpClient</code> Observable is guaranteed to emit exactly once when the HTTP response arrives and then complete, so the callback will always run when the network delivers the response. It is safe to put <code>loading.set(false)</code> inside the callback precisely because that is the first moment the data actually exists — any code placed after <code>.subscribe()</code> in the method body runs immediately and synchronously, long before the response has arrived, which is why putting <code>loading.set(false)</code> outside the callback clears the spinner too early.</p>
          <app-code-block lang="typescript" [code]="correctedRunSearchCode" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Apply the fix to your real <code>Browse</code> component. Search for something with a slow-loading result and confirm "Searching…" stays visible for the full duration of the request, not just a flash. You can place <code>set()</code> calls on the correct side of <code>.subscribe(...)</code> and explain why timing, not just syntax, makes the UI correct.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day13/act2" class="btn-secondary">← Act 2: Typing &amp; Adapting the API</a>
        <a routerLink="/day13/act4" class="btn-primary">Act 4: Detail Page Goes Live →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'loading',
      plainEnglish: 'A flag that says the request is in flight right now.',
      analogy: '⏳ The "order placed" screen while the food has not reached the table yet.'
    },
    {
      concept: 'searched',
      plainEnglish: 'A flag that says the user has actually attempted a search.',
      analogy: '🔎 A librarian noting that you checked the catalog, even if no book matched.'
    },
    {
      concept: 'three-state UI',
      plainEnglish: 'Render loading, results, and empty-after-search as separate branches.',
      analogy: '🚦 Red, green, and yellow are different signals because drivers need different instructions.'
    },
    {
      concept: 'subscribe callback',
      plainEnglish: 'Code that runs later, when the response finally arrives.',
      analogy: '📬 A delivery notice you act on only when the package reaches your door.'
    }
  ];

  browseLiveCode = `export class Browse {
  private showsSvc = inject(ShowsService);

  shows = signal<Show[]>([]);
  loading = signal(false);
  searched = signal(false);

  runSearch(term: string) {
    if (!term.trim()) return;
    this.loading.set(true);
    this.showsSvc.search(term).subscribe(shows => {
      this.shows.set(shows);
      this.loading.set(false);
      this.searched.set(true);
    });
  }
}`;

  browseThreeStateHtmlCode = `<input #q placeholder="Search all of television…" (keyup.enter)="runSearch(q.value)" />
<button (click)="runSearch(q.value)">Search</button>

@if (loading()) {
  <p class="muted">Searching…</p>
} @else if (shows().length) {
  <div class="grid">
    @for (show of shows(); track show.id) {
      <app-show-card [show]="show" (addToWatchlist)="onAdd($event)" />
    }
  </div>
} @else if (searched()) {
  <p>No shows matched. Try another title.</p>
}`;

  buggyObservableCode = `runSearch(term: string) {
  this.loading.set(true);
  const shows = this.showsSvc.search(term);   // bug 1: this is Observable<Show[]>, not Show[]
  this.shows.set(shows);                      // TypeScript objects loudly here
  this.loading.set(false);                   // bug 2: also wrong timing, even if bug 1 were fixed
}`;

  buggyLoadingTimingCode = `runSearch(term: string) {
  this.loading.set(true);
  this.showsSvc.search(term).subscribe(shows => {
    this.shows.set(shows);
    this.searched.set(true);
  });
  this.loading.set(false);  // bug 2: runs immediately after subscribe(), before data lands
}`;

  correctedRunSearchCode = `runSearch(term: string) {
  if (!term.trim()) return;
  this.loading.set(true);
  this.showsSvc.search(term).subscribe(shows => {
    this.shows.set(shows);
    this.loading.set(false);
    this.searched.set(true);
  });
}`;
}
