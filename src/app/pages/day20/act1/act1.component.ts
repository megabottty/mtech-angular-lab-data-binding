import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day20-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 20 · Act 1 of 3</span>
        <h1>🔍 Queries — Filtering and Sorting on the Server</h1>
        <p class="subtitle">Yesterday you always fetched the whole collection. Today you ask the database a specific question instead.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 19's BingeBoard is fully working — a Firestore-backed watchlist with add/remove/setNote/toggleWatched, and a Reviews feature with a working form. If that isn't running yet, visit the <a routerLink="/day20/start">Day 20 Starting Point</a> first.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Firestore's
        <a href="https://firebase.google.com/docs/firestore/query-data/queries" target="_blank" rel="noopener">simple and compound queries</a>
        and <a href="https://firebase.google.com/docs/firestore/query-data/order-limit-data" target="_blank" rel="noopener">order and limit data</a> guides.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Understand why fetching whole collections stops working at scale, and rebuild <code>ReviewsService</code> to filter, sort, and limit on the server with a real Firestore query.</li>
          <li><strong>Why It Matters:</strong> Every collection you've read so far has been small enough that "download everything, filter in a computed" never hurt. That stops being true the moment a collection grows past a handful of documents — and databases exist specifically to answer narrow questions efficiently instead of handing over everything they know.</li>
          <li><strong>Build Steps:</strong> Seed enough real review data to make today's demos meaningful → feel why "stream the whole collection" breaks down at scale → rebuild <code>reviewsForShow</code> as a real query.</li>
          <li><strong>Expected Outcome:</strong> You can name the concrete costs of client-side filtering at scale, and you can build a <code>where</code>/<code>orderBy</code>/<code>limit</code> query that still updates live.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Queries — Filtering and Sorting on the Server)</p>
        <p><strong>Next step:</strong> Act 2 (The Index Moment, and Query vs. Computed)</p>
        <p><strong>Time:</strong> About 25 minutes, including seeding real data.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d20-act1-why-query" [stepNumber]="1" title="Why 'Stream Everything and Filter' Stops Working">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Imagine your <code>reviews</code> collection has grown to 40,000 documents — a genuinely successful
          app. A show's detail page needs the 10 newest reviews for one specific show. Day 19's approach was:
          stream the entire <code>reviews</code> collection, land it in a signal, filter down to the one show
          with a <code>computed()</code>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">What's actually wrong with that approach once the collection is genuinely large? List every concrete cost you can think of.</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — bandwidth, memory, money, and latency, all at once">
          <p>
            <strong>Bandwidth:</strong> every client downloads all 40,000 documents to display 10. <strong>Memory:</strong>
            every one of those documents sits in the browser's memory, for every user, for a page that only
            needed a tiny slice of it. <strong>Money:</strong> Firestore bills per document read — streaming
            the whole collection to every visitor of every show's detail page is 40,000 billed reads to
            answer a question with a 10-document answer, repeated constantly. <strong>Latency:</strong>
            downloading, parsing, and filtering 40,000 documents client-side is slower than asking a server
            optimized for exactly this kind of lookup to hand you 10 already-correct documents.
          </p>
        </app-collapsible>

        <div class="info-box">
          <strong>The honest nuance:</strong> client-side filtering over a small, already-loaded collection —
          like Browse's text search over results you already fetched — is completely fine, and often the
          right call. The problem is specifically the combination of a large collection and downloading all
          of it just to throw most of it away. Act 2 gives you a real decision framework for telling these two
          situations apart.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can list at least three concrete costs of "stream the whole collection and filter locally" at scale, without needing to look them up.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d20-act1-seed-reviews" [stepNumber]="2" title="Seed Real Data First">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Today's query demos need more than one or two reviews to show anything interesting. <strong>Do
          this now, before continuing:</strong> post 8-10 reviews across 2-3 different shows, with a real
          mix of ratings (some low, some high) — either through the review form you built on Day 19, or by
          adding documents directly in the Firestore console.
        </p>

        <div class="warning-box">
          <strong>Don't skip this.</strong> Every remaining step in today's build-along assumes real data
          exists to query against. A query returning an empty array looks identical whether it's correct and
          there's nothing to find, or broken — seeding data now saves you from debugging the wrong problem
          later.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your Firestore console shows at least 8 review documents spread across at least 2 different <code>showId</code> values, with a real spread of <code>rating</code> values.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d20-act1-reviews-for-show" [stepNumber]="3" title="Rebuilding reviewsForShow as a Real Query">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p><strong>Do this:</strong> replace <code>ReviewsService.forShow()</code>'s client-side filter with a
          real Firestore query:</p>

        <app-code-block lang="typescript" [code]="queryReviewsCode" />

        <p style="margin-top: 12px;">
          Read the anatomy in order: <code>query(ref, ...constraints)</code> takes a collection reference and
          any number of constraint functions, composed left to right — <code>where</code> narrows which
          documents match, <code>orderBy</code> sorts them, <code>limit</code> caps how many come back. The
          result of <code>query(...)</code> is itself a reference — the same kind of thing
          <code>collection(...)</code> produces — so everything after it is identical to every read you've
          built since Day 18: hand it to <code>collectionData</code>, bridge that into a signal with
          <code>toSignal</code>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Is the result of a query still realtime, the way a plain <code>collectionData(collection(...))</code> read was?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — yes, fully realtime, filtered and sorted">
          <p>
            Yes. Add a new review in the Firestore console for the show you're currently viewing, matching
            the query's <code>where</code> condition — it appears in your app with no refresh, already in the
            correct sorted position. Firestore queries aren't a one-time snapshot of "what matched right
            now" — they're live, continuously-evaluated views over the collection, exactly like an
            unfiltered <code>collectionData</code> read, just narrower. Realtime and "filtered on the server"
            are two completely independent properties, and Firestore gives you both together for free.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A show's detail page shows only its own reviews, newest first, capped at 10 — and adding a new matching review in the console makes it appear live, in the correct sorted position, with no refresh.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day20/start" class="btn-secondary">← Day 20 Starting Point</a>
        <a routerLink="/day20/act2" class="btn-primary">Act 2: The Index Moment, and Query vs. Computed →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'query',
      plainEnglish: 'A specific, narrow question you ask the database, answered on the server before data crosses the wire.',
      analogy: '🔎 Asking a librarian for "mysteries published after 2020" instead of hauling the whole library home to sort yourself.'
    },
    {
      concept: 'where / orderBy / limit',
      plainEnglish: 'Constraints that compose left to right inside query() -- filter, then sort, then cap.',
      analogy: '🎛️ Three dials on one machine, each narrowing the output a bit more than the last.'
    },
    {
      concept: 'queries are still streams',
      plainEnglish: 'A query result updates live, exactly like an unfiltered collectionData read -- just narrower.',
      analogy: '📻 Tuning a radio to one specific station instead of every frequency at once -- still a live broadcast.'
    },
    {
      concept: 'reads are billed',
      plainEnglish: 'Every document a query returns (or a collection read hands you) costs real money at scale.',
      analogy: '🧾 A per-item receipt -- downloading 40,000 things to use 10 of them isn\'t free.'
    }
  ];

  queryReviewsCode = `import { collection, collectionData, query, where, orderBy, limit } from '@angular/fire/firestore';

forShow(showId: number) {
  const q = query(
    collection(this.firestore, 'reviews'),
    where('showId', '==', showId),
    orderBy('createdAt', 'desc'),
    limit(10),
  );
  return toSignal(
    collectionData(q, { idField: 'id' }) as Observable<Review[]>,
    { initialValue: [] }
  );
}`;
}
