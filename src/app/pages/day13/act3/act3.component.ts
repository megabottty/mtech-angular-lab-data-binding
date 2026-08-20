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
          <li><strong>Learning Goal:</strong> Wire the Browse page to live API results and build an honest template that distinguishes loading, success, and “searched but empty.”</li>
          <li><strong>Why It Matters:</strong> This is where asynchronous UI stops being theory. Students must feel the timing gap and learn to represent it correctly on screen.</li>
          <li><strong>Build Steps:</strong> Add three signals in <code>Browse</code> → render the three-state template with control flow → debug the classic “subscribe does not wait” mistake.</li>
          <li><strong>Expected Outcome:</strong> You can justify why a live search page needs separate loading, results, and searched state, then place every <code>set()</code> call at the correct async moment.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Browse Goes Live)</p>
        <p><strong>Next step:</strong> Act 4 (Detail Page Goes Live)</p>
      </section>

      <app-lesson-step stepId="d13-act3-browse-component" [stepNumber]="1" title="Browse Component — loading, shows, searched Signals">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>The Browse page now owns three separate questions, so it needs three separate signals. <code>shows</code> stores the current result list and starts as an empty array because we have not received anything yet. <code>loading</code> flips to true right before the request leaves and flips back to false only when the response actually lands.</p>
        <p style="margin-top: 12px;"><code>searched</code> is the subtle one. Its entire job is to separate “the student has not searched yet” from “the student searched and got zero matches.” Without that distinction, an empty-state message appears on first page load and lies to the user.</p>
        <div class="ask-class">Why do we need THREE signals here instead of just <code>shows</code> alone? What would go wrong with only one?</div>
        <app-code-block lang="typescript" [code]="browseLiveCode" />
        <div class="info-box">
          <strong>Why this shape is so common:</strong> arrays tell you what data you have, but they do not tell you whether you are still waiting or whether the search has never happened yet. Those are different UI facts, so they deserve different state.
        </div>
        <app-collapsible icon="🧩" label="Deep Dive — Why an empty array is not enough">
          <p>An empty array is ambiguous. It could mean “we just opened the page,” “the request is still in flight,” or “the search finished and found nothing.” The UI cannot speak clearly if one value is trying to represent all three stories at once.</p>
          <p style="margin-top: 12px;">That is the real lesson here: good state names match distinct user-facing situations. When the state model is honest, the template becomes simple and the empty message becomes correct.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain the job of <code>shows</code>, <code>loading</code>, and <code>searched</code> and why each represents a different UI truth.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d13-act3-three-state" [stepNumber]="2" title="The Three-State Template Pattern">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>The template now asks three questions in order: are we loading, do we have results, or did we search and come up empty? That ordering matters because the screen must tell the truth about the most immediate state first. If the results check came later or the searched check came earlier, the wrong message would flash at the wrong time.</p>
        <p style="margin-top: 12px;">The <code>#q</code> name is a template reference variable. For today, that simply means “grab the live input element so we can read its current <code>value</code> when Enter is pressed or the button is clicked,” without introducing <code>[(ngModel)]</code>.</p>
        <div class="ask-class">When the page first renders before any search has run, which branch should win — and why?</div>
        <app-code-block lang="html" [code]="browseThreeStateHtmlCode" />
        <div class="info-box">
          <strong>The professional pattern:</strong> loading → results → empty-after-search. Production UIs live by this three-state pattern, and the order of the <code>&#64;else if</code> chain matters. <code>searched()</code> belongs last, after checking <code>shows().length</code>, or the page would show “no results” on the very first render before anyone searched.
        </div>
        <div class="warning-box">We are deliberately NOT wiring live-as-you-type search today. Firing <code>runSearch()</code> on every keystroke creates a subtle bug: overlapping requests can resolve out of order, so old results may overwrite newer intent. We fix that properly on a later RxJS day with <code>switchMap</code> — anticipation is pedagogy.</div>
        <app-collapsible icon="💡" label="Hint — Why use #q instead of ngModel here?">
          <p>This lesson's goal is async state, not form APIs. A template reference variable keeps the input story tiny: the DOM already knows the current value, so we read <code>q.value</code> at the exact moment the event fires.</p>
        </app-collapsible>
        <app-collapsible icon="✅" label="Show Answer — What to try in the live app">
          <p>Search <code>office</code>. Real posters, real ratings. This is the day the app becomes real, so let the room play for a minute and notice that the loading text, result grid, and empty message each appear at different moments for good reasons.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can build and justify a loading/results/empty template whose branch order matches the real async timeline.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d13-act3-debug" [stepNumber]="3" title="Debug It — The Async Bug of the Week">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>This is the moment students finally feel what “asynchronous” means in code instead of in vocabulary words. The first bug is a type bug: treating the Observable itself as if it were already the resolved array. The second bug is deeper: putting <code>loading.set(false)</code> after <code>.subscribe(...)</code> as if subscribe waits.</p>
        <h4>Buggy snippet A</h4>
        <app-code-block lang="typescript" [code]="buggyObservableCode" />
        <h4 style="margin-top: 16px;">Buggy snippet B</h4>
        <app-code-block lang="typescript" [code]="buggyLoadingTimingCode" />
        <app-collapsible icon="🧩" label="Bug 1 — The type error is the teacher">
          <p><code>search(term)</code> returns an <code>Observable&lt;Show[]&gt;</code>, not a <code>Show[]</code>. TypeScript catches this loudly at <code>this.shows.set(shows)</code> because the signal expects the resolved array, not the Observable wrapper.</p>
          <p style="margin-top: 12px;">Read that error together. It is not noise — it is the language telling you that you have described “a value that will arrive later,” not “the data is already here right now.”</p>
        </app-collapsible>
        <app-collapsible icon="💡" label="Bug 2 — subscribe() registers the callback and keeps going">
          <p>Even after fixing Bug 1 by moving the array write into <code>.subscribe(...)</code>, many students leave <code>this.loading.set(false)</code> outside the callback. That line then runs synchronously right after <code>.subscribe()</code> is called, before the response has arrived, so the loading message disappears immediately.</p>
          <p style="margin-top: 12px;">Walk the timeline on the board: call <code>search()</code> → call <code>subscribe()</code> and register the callback → <code>subscribe()</code> returns immediately → <code>loading.set(false)</code> runs NOW (wrong) → time passes → the HTTP response finally arrives → the callback runs later.</p>
        </app-collapsible>
        <div class="warning-box">Do not rush this. This is the single most important “this is what asynchronous actually means” moment of the week — the callback runs later, and code written after <code>.subscribe(...)</code> in your method runs immediately, not after the callback.</div>
        <div class="ask-class">If <code>.subscribe()</code> doesn't block, what guarantees the callback function eventually runs at all, and why is it safe to put <code>loading.set(false)</code> inside it?</div>
        <app-collapsible icon="✅" label="Show Answer — Correct runSearch() timing">
          <p>The fix is to place every state update that depends on the response inside the subscription callback, because that callback is the first moment the data actually exists.</p>
          <app-code-block lang="typescript" [code]="correctedRunSearchCode" />
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can place <code>set()</code> calls on the correct side of <code>.subscribe(...)</code> and explain why timing, not just syntax, makes the UI correct.</div>
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
      analogy: '⏳ The “order placed” screen while the food has not reached the table yet.'
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
