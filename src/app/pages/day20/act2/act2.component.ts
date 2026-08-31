import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day20-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 20 · Act 2 of 3</span>
        <h1>🧭 The Index Moment, and Query vs. Computed</h1>
        <p class="subtitle">Firestore refuses some queries outright — and it hands you the exact fix.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://firebase.google.com/docs/firestore/query-data/index-overview" target="_blank" rel="noopener">Firestore's index overview</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Recognize a composite-index error on sight, understand why Firestore demands one, and build a real decision framework for choosing a server-side query over a client-side <code>computed()</code>.</li>
          <li><strong>Why It Matters:</strong> The index error looks alarming the first time you see it — a wall of red text mid-console. It's actually one of the friendliest errors you'll ever get: Firestore tells you precisely what index it needs and hands you a link to create it in one click.</li>
          <li><strong>Build Steps:</strong> Trigger the error on purpose, on your own terms → read what it's actually telling you → build a rule of thumb for query vs. computed and stress-test it against real pages in this app.</li>
          <li><strong>Expected Outcome:</strong> Seeing this error in the wild (weeks from now, in a totally different project) no longer feels like a crisis.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (The Index Moment, and Query vs. Computed)</p>
        <p><strong>Next step:</strong> Act 3 (Security Rules: Read Before You Write, and Debug It)</p>
        <p><strong>Time:</strong> About 20 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d20-act2-index-error" [stepNumber]="1" title="Triggering the Composite Index Error, On Purpose">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Act 1's query filtered on <code>showId</code> and sorted on <code>createdAt</code> — two
          <em>different</em> fields, combined in one query. Firestore calls this a compound query, and it
          doesn't just improvise an efficient way to answer it on the spot. <strong>Do this:</strong> if your
          Act 1 query is already running cleanly, temporarily add a second <code>where</code> clause —
          for example <code>where('rating', '&gt;=', 5)</code> alongside the existing
          <code>where('showId', ...)</code> and <code>orderBy('createdAt', ...)</code> — and reload the page.
        </p>

        <div class="think-about-it">
          <p class="tai-q">What shows up in your browser console?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a FirebaseError with a build-it-for-me link">
          <p>
            A <code>FirebaseError: The query requires an index.</code> message, followed by a long URL
            pointing at the Firebase console. That URL isn't a generic "go read the docs" link — it's
            pre-filled with the exact composite index this exact query needs. Click it, click "Create
            Index," wait roughly a minute while Firestore builds it in the background, then reload. The
            error is gone and the query runs.
          </p>
        </app-collapsible>

        <div class="info-box">
          <strong>Why Firestore works this way:</strong> a single-field filter or sort is cheap because
          Firestore automatically maintains an index for every field on every document. The moment you
          combine <em>multiple</em> fields in one query — filter on one, sort on another, or filter on two —
          Firestore needs a purpose-built index for that exact combination, and it refuses to silently build
          one for you at query time (that would mean unpredictable latency and cost on a random request).
          Instead it tells you up front, by name, exactly what to build.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've seen the real composite-index error in your own console, read its message, and used its link to build the index — you now recognize this error on sight instead of panicking at it.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d20-act2-query-vs-computed" [stepNumber]="2" title="Query vs. Computed — A Real Decision Framework">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          You now have two legitimate tools for "show me a subset of the data" — a Firestore
          <code>query()</code>, or a plain <code>computed()</code> filtering data you already have in
          memory. Neither one is universally correct.
        </p>

        <app-code-block lang="typescript" [code]="decisionCode" />

        <div class="think-about-it">
          <p class="tai-q">Walk through this app's own pages with that framework. Should Browse's search box (filtering shows you've already fetched, as you type) use a query or a computed? What about the reviews list on Show Detail?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — two different right answers">
          <p>
            <strong>Browse's search box</strong> should stay a <code>computed()</code> (or the
            <code>debounceTime</code>/<code>switchMap</code> pipeline from Day 16, if it's re-querying an
            API) — the show list is already small and already in memory; a full server round trip on every
            keystroke would be slower, not faster, and Browse never had a "collection" in the Firestore
            sense to query in the first place. <strong>The reviews list</strong> is exactly the query case
            from Act 1 — a Firestore collection that could genuinely grow large, filtered down to one show's
            reviews, sorted, capped. Same underlying question, "show me a subset," two different correct
            tools depending on where the data already lives and how big it could get.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Given any new filtering requirement in this app, you can decide query-vs-computed in under a minute and explain why in one sentence.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day20/act1" class="btn-secondary">← Act 1: Queries — Filtering and Sorting on the Server</a>
        <a routerLink="/day20/act3" class="btn-primary">Act 3: Security Rules — Read Before You Write →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'composite index',
      plainEnglish: 'A purpose-built lookup structure Firestore needs when a query combines more than one field.',
      analogy: '📇 A library\'s card catalog sorted by author works for author lookups; finding "mysteries by authors after 1990" needs a catalog built for that specific combination.'
    },
    {
      concept: 'the index-creation link',
      plainEnglish: 'The error message hands you a URL pre-filled with the exact index your exact query needs.',
      analogy: '🔧 A check-engine light that also prints the replacement part number.'
    },
    {
      concept: 'query vs. computed',
      plainEnglish: 'A query asks the server; a computed() filters data already sitting in memory. Pick based on where the data lives and how big the source collection could get.',
      analogy: '🧺 Asking the warehouse to ship you the right box vs. digging through a box already on your desk.'
    }
  ];

  decisionCode = `// Reach for a Firestore query() when:
//  - the source collection could grow large (hundreds+ documents)
//  - you only ever need a narrow slice of it for this view
//  - the data doesn't already live in memory for another reason

// Reach for a computed() when:
//  - the data is already loaded in memory for another reason
//  - the source collection is small, or bounded by design
//  - the filter is highly specific to one UI (e.g. as-you-type search)
//    and re-querying the server on every keystroke would be wasteful`;
}
