import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day20-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 20 · Student Lab</span>
        <h1>🧪 Lab — Put Queries to Work</h1>
        <p class="subtitle">Four tasks. The first three build on today's acts directly; the fourth is a stretch.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> complete Acts 1-3 first — this lab assumes your
        <code>ReviewsService</code> already queries Firestore with <code>where</code>/<code>orderBy</code>/<code>limit</code>,
        and that you've seeded at least 8-10 reviews across a few shows.
      </div>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 20 Lab (final step of Day 20)</p>
        <p><strong>Time:</strong> About 45 minutes for tasks 1-3; the stretch task is open-ended.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="d20-lab-top-rated-toggle" [stepNumber]="1" title="Task 1 — A Top-Rated Reviews Toggle">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> add a checkbox or toggle button above the reviews list on Show Detail —
          "Top rated only." When checked, the reviews list should show only reviews with
          <code>rating &gt;= 8</code> for the current show, still sorted newest first. When unchecked, it
          shows all of that show's reviews, same as today.</p>

        <p>
          This means <code>ReviewsService.forShow()</code> needs a second input besides the show id — a
          signal (or plain boolean) for whether the toggle is on — and needs to rebuild its query whenever
          either input changes. Reach for the exact pattern from Act 3's first Debug It: bridge whichever
          signals feed the query with <code>toObservable</code>, combine them, and <code>switchMap</code> into a
          fresh query on every change.
        </p>

        <app-collapsible icon="💡" label="Hint — combining two signal inputs into one query">
          <app-code-block lang="typescript" [code]="hintTask1Code" />
          <p style="margin-top: 8px;">
            <code>combineLatest</code> (from <code>rxjs</code>) merges the two observables into one stream of
            <code>[id, topRated]</code> pairs; <code>switchMap</code> rebuilds the query from whichever pair
            arrived most recently, exactly as before — just with one extra piece of input to react to.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Checking "Top rated only" narrows the reviews list live to <code>rating &gt;= 8</code> for the current show; unchecking it restores the full list — both while staying on the same show and after navigating to a different one.</div>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="d20-lab-featured-curated" [stepNumber]="2" title="Task 2 — Featured, But Curated">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Day 18's <code>FeaturedService</code> reads the entire <code>featured</code> collection with no
          filtering at all — whatever's in there, in whatever order Firestore happens to return it.
          <strong>Do this:</strong> rebuild it as a real query: only documents with <code>rating &gt;= 8</code>,
          newest first (by whichever timestamp field your <code>featured</code> documents carry), capped at
          5 results.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Before you write any code — does this change belong in FeaturedService itself, or in the Browse component that consumes it?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the service, same reasoning as Act 1">
          <p>
            The service. Exactly the same reasoning as Act 1's <code>reviewsForShow</code>: "which shows count
            as featured" is a question about the data itself, not about how Browse happens to display it —
            keeping it in the service means every future consumer of "shows of the week" gets the same
            correct, curated answer for free, with no risk of one component filtering it one way and another
            component forgetting to.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Browse's "Shows of the week" panel now only ever shows highly-rated shows, newest-first, capped at 5 — and you likely hit a second composite-index error along the way, which you now know exactly how to resolve.</div>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="d20-lab-count-badge" [stepNumber]="3" title="Task 3 — A Review Count Badge, Without Downloading Every Review">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Add a small badge near a show's title on Show Detail: "128 reviews." You could get this number by
          downloading every review for that show and reading <code>.length</code> — but Act 1 already made
          the case against downloading documents you don't actually need. Firestore has a purpose-built
          answer for exactly this: a count query that returns only a number, never the documents themselves.
        </p>

        <p><strong>Do this:</strong> go find it. Search Firestore's docs (or your editor's autocomplete on
          the <code>&#64;angular/fire/firestore</code> import list) for a function whose entire job is counting
          documents matching a query, without fetching them.</p>

        <app-collapsible icon="💡" label="Hint — if you're stuck after a genuine search">
          <p>Look for <code>getCountFromServer</code>. It takes the same kind of query reference you built in
            Act 1 and Task 1, and resolves to an object with a <code>.data().count</code> — no documents are
            ever downloaded, only the count.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A badge showing the correct review count for the current show, verified by comparing it against the actual number of review cards rendered below it — implemented via a count-only query, not by measuring the array you already loaded.</div>
      </app-lesson-step>

      <!-- Task 4 — stretch -->
      <app-lesson-step stepId="d20-lab-stretch-pagination" [stepNumber]="4" title="Task 4 (Stretch) — Pagination-Lite">
        <p><span class="effort-tag effort-challenge">Effort: Challenge (Stretch)</span></p>

        <p>
          Optional, and open-ended. Today's queries always cap at a fixed <code>limit</code>. Add a "Show
          more" button below the reviews list that loads the next batch instead of raising the limit and
          re-fetching everything from the start.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Skim Firestore's docs for "paginate data" before writing anything. What's the constraint function meant for exactly this?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — startAfter, anchored on the last document you already have">
          <p>
            <code>startAfter(lastVisibleDoc)</code>, added to the same constraint list as <code>where</code>/
            <code>orderBy</code>/<code>limit</code>. You keep a reference to the last document snapshot
            you've already rendered, and each "Show more" click builds a new query anchored just after it —
            Firestore only ever sends you the next batch, never the batch you already have. This is
            deliberately left open-ended: there's no single required shape for how you track "the last
            document I've seen" in a signal-based service, and reasonable designs disagree on the details.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome (if attempted):</strong> Clicking "Show more" appends the next batch of reviews without re-fetching or re-rendering the ones already on screen.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day20/act3" class="btn-secondary">← Act 3: Security Rules — Read Before You Write</a>
        <a routerLink="/" class="btn-primary">Back to Dashboard →</a>
      </div>
    </div>
  `
})
export class Day20LabComponent {
  hintTask1Code = `import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, switchMap } from 'rxjs';

forShow(showId: Signal<number>, topRatedOnly: Signal<boolean>) {
  return toSignal(
    combineLatest([toObservable(showId), toObservable(topRatedOnly)]).pipe(
      switchMap(([id, topRated]) => {
        const constraints = [where('showId', '==', id), orderBy('createdAt', 'desc')];
        if (topRated) constraints.push(where('rating', '>=', 8));
        return collectionData(query(collection(this.firestore, 'reviews'), ...constraints)) as Observable<Review[]>;
      })
    ),
    { initialValue: [] }
  );
}`;
}
