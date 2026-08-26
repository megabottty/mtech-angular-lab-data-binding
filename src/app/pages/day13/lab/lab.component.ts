import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day13-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Ship the Rest of BingeBoard's Real Data</h1>
        <p class="subtitle">
          About 60–70 minutes. 4 tasks. Extend the live search + detail page on your own, defend your
          choices, and prove the real-data version of BingeBoard holds together end to end.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Copy the working Act 4 code (live <code>ShowsService</code>, live Browse three-state
          search, live <code>ShowDetail</code> with <code>ngOnInit + subscribe</code> and
          <code>[innerHTML]</code>) into your project before starting. If Browse and Detail aren't
          both working against the real TVMaze API right now, stop and go finish Act 4 first — this
          lab has no separate scaffolding of its own to fall back on.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Independently extend a real HTTP-backed feature set with new endpoints, defensive
            null-handling, and product judgment about state placement.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Production apps constantly add new derived fields, new endpoints for related data,
            recent-history UX, and must survive shared-model changes gracefully. Today's build-along
            showed you the pattern once; this lab is where it becomes a habit instead of something
            you copied.
          </li>
          <li>
            <strong>Build Steps:</strong>
            runtime badge → recent searches → episode count (new endpoint, solo) → stretch: fix
            watchlist model drift.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            You can make and defend data-shape and state-placement decisions on your own, not just
            follow steps someone else already worked out.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 13 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> Tasks 1–2 are about 15 minutes each. Task 3 is the big one — budget 20–25 minutes. Task 4 is a stretch; skip it if you're short on time and come back later.</p>
      </section>

      <app-lesson-step
        stepId="d13-lab-runtime"
        [stepNumber]="'Task 1'"
        title="Runtime on Cards (Null-Handling Reps)"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: &#64;if with a truthy check, null/zero handling in real data, defensive template rendering.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          <code>ShowCard</code> should display a runtime badge like <code>~42 min/ep</code> using
          the real <code>runtime</code> field from the adapted <code>Show</code>. But when runtime
          is falsy or unknown, the badge should disappear completely instead of printing nonsense
          like <code>~0 min/ep</code>.
        </p>
        <p style="margin-top: 12px;">
          This is your first "real data rep" task: values that looked clean in a hardcoded array are
          now messy because the API is messy. Defensive rendering is not extra polish — it is the
          difference between a trustworthy UI and one that accidentally teaches users to ignore what
          they see. Once a user spots one obviously-wrong number on your screen, they stop trusting
          all the other numbers too.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why is hiding <code>0</code> actually more honest than displaying <code>~0 min/ep</code>
          to the user?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — why hiding is the honest choice">
          <p>A <code>0</code> runtime in the TVMaze API means the data is missing or unknown, not that the show literally has zero-minute episodes. Displaying <code>~0 min/ep</code> would mislead the user into thinking we have a real value. Hiding the field with an <code>&#64;if</code> guard communicates "we don't know" far more honestly than displaying a meaningless placeholder that looks like real data.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Open your <code>ShowCard</code> component and find where it renders rating and genre today.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a runtime display guarded by an <code>&#64;if</code>, right next to those.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Search for a show and verify one with runtime <code>0</code> shows no badge at all — check the Network response if you're not sure which show that is.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every card either shows a real runtime badge or shows
          none at all — never a badge with a meaningless <code>0</code> in it. You can guard a
          template field against zero/missing real API data without extra boilerplate.
        </div>

        <app-collapsible icon="💡" label="Hint — Let truthiness do the work">
          <p>
            The elegant part of this task is that <code>0</code> is already falsy. In this case,
            that is exactly what we want: a runtime of zero does <strong>not</strong> mean "instant
            television," it means "the API did not give us a meaningful runtime."
          </p>
          <app-code-block lang="html" [code]="task1Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <p>
            This snippet keeps the existing rating/genre line intact and adds the runtime badge only
            when the real data is usable.
          </p>
          <h4>HTML:</h4>
          <app-code-block lang="html" [code]="task1HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d13-lab-recent-searches"
        [stepNumber]="'Task 2'"
        title="Recent Searches Chips"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: signals for recent history, dedupe + cap logic, click-to-repeat UX, state placement judgment.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Under the search box, render the last 5 distinct search terms as clickable "chips."
          Clicking a chip should re-run that search by calling <code>runSearch(term)</code>.
        </p>
        <p style="margin-top: 12px;">
          This task is intentionally half code, half design judgment. A recent-searches feature is
          tiny, but it forces you to ask a very real architecture question: does this state belong
          only to Browse, or is it the start of shared app history that might later matter
          elsewhere? There isn't a single objectively correct answer — the point is that you can
          argue for one and defend it.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Should the recent-searches list live as a signal inside the Browse component, or move into
          <code>ShowsService</code> as shared state? Make the case for each — there's a real,
          defensible answer on both sides.</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the case for each side">
          <p>Keeping it local to Browse is the simpler, YAGNI-correct choice: the list only matters on that one page, so lifting it out adds complexity with no present benefit. Moving it into <code>ShowsService</code> makes sense if you anticipate a second page — like a "Recent Activity" dashboard — that needs the same history; service-level state survives navigation and is accessible app-wide. Both are defensible; the professional move is to start local and lift only when a second genuine consumer appears.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>Design note — two valid choices:</strong> keeping it local to Browse is simpler and
          scoped correctly if only Browse ever needs it; lifting it into <code>ShowsService</code>
          makes sense if a future page (like a recent-activity dashboard) needs the same history. This
          is the classic YAGNI-vs.-future-proofing tradeoff, and professional teams debate it
          constantly — there's rarely a universally "right" answer, only a well-reasoned one.
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a <code>recentSearches = signal&lt;string[]&gt;([])</code> (or a service-based equivalent).</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>In <code>runSearch()</code>, push the new term to the front, dedupe, and cap at 5.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Render chips in an <code>&#64;for</code> loop with <code>(click)</code> re-invoking <code>runSearch</code>.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Search for 6 different shows. You should see exactly
          5 chips, most-recent first, with no duplicates. Click any chip and confirm it re-runs that
          exact search. You can maintain a bounded, deduped recent-items list in a signal and
          re-trigger an action from a rendered chip.
        </div>

        <app-collapsible icon="💡" label="Hint — Update one list, not five separate flags">
          <p>
            The clean move is to normalize the term once, then rebuild the list from that one value:
            new term first, old duplicate removed, and a final <code>.slice(0, 5)</code> to cap the
            list.
          </p>
          <app-code-block lang="typescript" [code]="task2Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <p>
            One straightforward answer keeps the feature local to Browse. If you chose
            <code>ShowsService</code> instead, the template stays basically the same — the list just
            comes from a different owner.
          </p>
          <h4>TypeScript:</h4>
          <app-code-block lang="typescript" [code]="task2TsAnswer" />
          <h4 style="margin-top: 16px">HTML:</h4>
          <app-code-block lang="html" [code]="task2HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d13-lab-season-count"
        [stepNumber]="'Task 3'"
        title="Episode/Season Count (New Endpoint) — Full Stack, Solo"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Challenge</span>
          <span class="concepts">Concepts: endpoint modeling, one-off HTTP methods, nested subscribe timing, derived counts from raw API data.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          On the Detail page, show a total episode count sourced from
          <code>https://api.tvmaze.com/shows/:id/episodes</code>. This is a brand-new endpoint, not
          part of the show-by-id request you already wired, which means you must do the
          <strong>full stack of today, solo</strong>: model the minimal response type, add a new
          service method, subscribe to it, and render the derived count.
        </p>
        <p style="margin-top: 12px;">
          There is intentionally less hand-holding here because this task is the capstone. You have
          already seen typing, adapting, subscribing, and rendering in the build-along — now you
          prove you can repeat that pattern on a fresh endpoint without a worked example already in
          front of you. That's the actual skill this whole day has been building toward: given a new
          endpoint and no instructions, can you follow the same four-step pattern on your own?
        </p>

        <div class="think-about-it">
          <p class="tai-q">Would you make the episode call inside the existing <code>byId()</code> subscribe, or as a
          second independent call? Both are acceptable today — what tradeoff are you making either
          way?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the tradeoff either way">
          <p>Nesting the episode call inside the <code>byId()</code> subscribe guarantees the show ID is available before you request episodes, but it creates a "subscribe inside subscribe" pattern that becomes messy to read and impossible to cancel cleanly. A second independent call is simpler to write but fires unconditionally and can't easily wait on the first result. Both work today; Day 15's <code>switchMap</code> teaches the clean way to chain dependent HTTP calls without nesting.</p>
        </app-collapsible>

        <div class="warning-box">
          <strong>You'll probably nest a subscribe here, and that's fine:</strong> if you make the
          episode call from inside your existing <code>byId()</code> subscribe callback, you'll end
          up with a subscribe nested inside another subscribe. That's expected and okay for today —
          Day 15 is where you'll learn the cleaner way to chain dependent HTTP calls. For now,
          shipping the full vertical slice matters more than perfect RxJS elegance. Feeling slightly
          uncomfortable with the nesting is actually a good sign — it means you'll appreciate the fix
          when it arrives.
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Define a minimal <code>TvMazeEpisode</code> interface with only the fields you need.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add <code>episodes(id: number)</code> to <code>ShowsService</code> using <code>this.http.get&lt;TvMazeEpisode[]&gt;(...)</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Subscribe to it from <code>ShowDetail</code> and store an episode-count signal.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Render <code>X episodes across Y seasons</code> using array length plus max season number.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> A show's detail page shows a real episode and season
          count that matches what's actually on TVMaze for that show (spot-check one show against
          the raw JSON in your browser). You can independently model, fetch, and render data from a
          brand-new API endpoint without an adapter, applying everything from today's build-along on
          your own.
        </div>

        <app-collapsible icon="💡" label="Hint — Count directly from the episode array">
          <p>
            Because this endpoint already returns exactly the one-off data shape you need, there is
            no need to reconcile it into the app-wide <code>Show</code> model. Think "derive a tiny
            UI fact from the raw array," not "invent a second adapter just because adapters exist."
          </p>
          <p style="margin-top: 12px;">
            For today, a nested subscribe is okay. Count episodes with
            <code>episodes.length</code>, and get the number of seasons with
            <code>Math.max(...episodes.map(e =&gt; e.season))</code>.
          </p>
          <app-code-block lang="typescript" [code]="task3Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <p>
            This answer shows one complete "full stack" path: minimal interface, service method,
            nested subscribe in <code>ShowDetail</code>, and a tiny template render.
          </p>
          <h4>Episode interface:</h4>
          <app-code-block lang="typescript" [code]="task3EpisodeModelAnswer" />
          <h4 style="margin-top: 16px">ShowsService:</h4>
          <app-code-block lang="typescript" [code]="task3ServiceAnswer" />
          <h4 style="margin-top: 16px">ShowDetail TypeScript:</h4>
          <app-code-block lang="typescript" [code]="task3DetailTsAnswer" />
          <h4 style="margin-top: 16px">ShowDetail HTML:</h4>
          <app-code-block lang="html" [code]="task3HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d13-lab-stretch-watchlist"
        [stepNumber]="'Task 4'"
        title="Stretch: Watchlist Persistence With Real Shows"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Challenge</span>
          <span class="concepts">Concepts: localStorage integration, model drift, shared-type churn, debugging cross-feature regressions.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Verify Day 7's localStorage-backed <code>WatchlistService</code> still works now that
          <code>Show</code> objects come from a live adapted API response instead of a hardcoded
          array. If it does not, fix the shape drift so the whole app consistently speaks the Day 13
          <code>Show</code> model.
        </p>
        <p style="margin-top: 12px;">
          This is a very realistic integration bug, and it's worth doing even if it feels tedious —
          this exact category of bug (a shared type changes shape, and some far-off file quietly
          still assumes the old one) is one of the most common real-world sources of "it worked
          yesterday" regressions. If watchlist persistence or any UI still assumes
          the old Day 9 shape <code>&#123; id, title, genre, rating, posterUrl &#125;</code>,
          while the Day 13 adapter now produces
          <code>&#123; id, name, genre, rating, imageUrl, summary, runtime &#125;</code>,
          old persisted data or stale field reads like <code>show.title</code> and
          <code>show.posterUrl</code> can silently break and render <code>undefined</code>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Is renaming a shared model's fields mid-course a good practice, or should the adapter have
          kept the old field names (<code>title</code>/<code>posterUrl</code>) to avoid this churn
          entirely?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — there's no universally right side here">
          <p>Neither answer is universally right. Renaming to match the real API's vocabulary (<code>name</code>, <code>imageUrl</code>) keeps the codebase honest and prevents a growing mismatch between what the API means and what our app calls things — a real long-term maintenance win. Keeping the old names avoids a short-term ripple through components, tests, and persisted data. Professional teams typically pay the rename cost once to keep names honest forever, accepting the one-time churn as cheaper than compounding confusion over many months.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>Real-world framing:</strong> there is no single perfect answer here. Teams debate
          "pay the rename cost now and keep names honest forever" versus "preserve the old names and
          avoid a ripple through the codebase" all the time.
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a show to the watchlist, refresh the page, and confirm it persists.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Audit every place that reads <code>Show</code> fields for stale names.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Fix any drift so the app consistently uses <code>name</code> and <code>imageUrl</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Be ready to defend whether the adapter should have preserved the old names instead.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Add a show to your watchlist, reload the page, and
          confirm the title and poster still render correctly — not <code>undefined</code>. You can
          locate and repair a realistic ripple effect from a shared model shape changing mid-project.
        </div>

        <app-collapsible icon="💡" label="Hint — Search for the old field names first">
          <p>
            Search the whole codebase for <code>.title</code> and <code>.posterUrl</code> on
            <code>Show</code>-typed values. Each hit is a candidate for the rename, especially in
            <code>ShowCard</code>, the watchlist page, and anything around the watchlist button on
            the detail screen.
          </p>
          <app-code-block lang="typescript" [code]="task4Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <p>
            The exact file may differ in your project, but the fix pattern is always the same:
            replace stale Day 9 field reads with the Day 13 names produced by the adapter.
          </p>
          <app-code-block lang="typescript" [code]="task4Answer" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day13/act4" class="btn-secondary">← Act 4: Detail Page Goes Live</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Browse's live search still works with real-data reps added (runtime, recent searches)</li>
          <li><span class="checkbox">✅</span> Detail page shows a real episode count from a second live endpoint</li>
          <li><span class="checkbox">✅</span> Watchlist persistence survives the real-data shape, with any drift fixed</li>
          <li><span class="checkbox">✅</span> You can explain the API-shape-vs.-app-shape tradeoff in your own words</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 13: HTTP I.</p>
        <ul class="complete-list">
          <li>✅ Made real <code>HttpClient</code> requests instead of reading a hardcoded array</li>
          <li>✅ Typed and adapted a third-party API shape into BingeBoard's app model</li>
          <li>✅ Built the loading/results/empty three-state pattern for live search UX</li>
          <li>✅ Debugged the classic <code>loading.set(false)</code>-outside-subscribe async bug</li>
          <li>✅ Fetched from a brand-new endpoint solo and rendered a derived episode count</li>
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
  `]
})
export class Day13LabComponent {
  task1Hint = `@if (show.runtime) {
  <span class="runtime-badge">~{{ show.runtime }} min/ep</span>
}`;

  task1HtmlAnswer = `<p class="show-meta">
  <span>⭐ {{ show.rating }}</span>
  <span>{{ show.genre }}</span>

  @if (show.runtime) {
    <span class="runtime-badge">~{{ show.runtime }} min/ep</span>
  }
</p>`;

  task2Hint = `this.recentSearches.update(list =>
  [term, ...list.filter(t => t !== term)].slice(0, 5)
);`;

  task2TsAnswer = `import { Component, inject, signal } from '@angular/core';
import { ShowsService } from '../core/services/shows.service';
import { Show } from '../core/models/show.model';

@Component({
  selector: 'app-browse',
  standalone: true,
  templateUrl: './browse.component.html'
})
export class Browse {
  private showsSvc = inject(ShowsService);

  shows = signal<Show[]>([]);
  loading = signal(false);
  searched = signal(false);
  recentSearches = signal<string[]>([]);

  runSearch(term: string) {
    const trimmed = term.trim();
    if (!trimmed) return;

    this.loading.set(true);
    this.recentSearches.update(list =>
      [trimmed, ...list.filter(t => t !== trimmed)].slice(0, 5)
    );

    this.showsSvc.search(trimmed).subscribe(shows => {
      this.shows.set(shows);
      this.loading.set(false);
      this.searched.set(true);
    });
  }
}`;

  task2HtmlAnswer = `<input #q placeholder="Search all of television…" (keyup.enter)="runSearch(q.value)" />
<button (click)="runSearch(q.value)">Search</button>

@if (recentSearches().length) {
  <div class="recent-searches">
    @for (term of recentSearches(); track term) {
      <button type="button" class="search-chip" (click)="runSearch(term)">
        {{ term }}
      </button>
    }
  </div>
}`;

  task3Hint = `this.showsSvc.episodes(show.id).subscribe(episodes => {
  this.episodeCount.set(episodes.length);
  this.seasonCount.set(
    episodes.length ? Math.max(...episodes.map(e => e.season)) : 0
  );
});`;

  task3EpisodeModelAnswer = `export interface TvMazeEpisode {
  id: number;
  season: number;
  number: number;
}`;

  task3ServiceAnswer = `import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TvMazeEpisode, TvMazeSearchResult, TvMazeShow } from './tvmaze.model';
import { toShow } from './show.adapter';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private http = inject(HttpClient);
  private readonly base = 'https://api.tvmaze.com';

  search(query: string) {
    return this.http
      .get<TvMazeSearchResult[]>(\`\${this.base}/search/shows\`, { params: { q: query } })
      .pipe(map(results => results.map(r => toShow(r.show))));
  }

  byId(id: number) {
    return this.http.get<TvMazeShow>(\`\${this.base}/shows/\${id}\`).pipe(map(toShow));
  }

  episodes(id: number) {
    return this.http.get<TvMazeEpisode[]>(\`\${this.base}/shows/\${id}/episodes\`);
  }
}`;

  task3DetailTsAnswer = `import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../core/models/show.model';
import { ShowsService } from '../core/services/shows.service';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show-detail.component.html'
})
export class ShowDetailComponent implements OnInit {
  id = input.required<string>();

  private showsSvc = inject(ShowsService);

  show = signal<Show | null>(null);
  episodeCount = signal(0);
  seasonCount = signal(0);

  ngOnInit() {
    this.showsSvc.byId(Number(this.id())).subscribe(show => {
      this.show.set(show);

      this.showsSvc.episodes(show.id).subscribe(episodes => {
        this.episodeCount.set(episodes.length);
        this.seasonCount.set(
          episodes.length ? Math.max(...episodes.map(e => e.season)) : 0
        );
      });
    });
  }
}`;

  task3HtmlAnswer = `@if (show(); as currentShow) {
  <article class="detail-card">
    <h1>{{ currentShow.name }}</h1>
    <p>⭐ {{ currentShow.rating }} · {{ currentShow.genre }}</p>
    <p>{{ episodeCount() }} episodes across {{ seasonCount() }} seasons</p>
    <div [innerHTML]="currentShow.summary"></div>
  </article>
}`;

  task4Hint = `<!-- Old Day 9 reads -->
<h2>{{ show.title }}</h2>
<img [src]="show.posterUrl" [alt]="show.title" />

<!-- Day 13 reads -->
<h2>{{ show.name }}</h2>
<img [src]="show.imageUrl" [alt]="show.name" />`;

  task4Answer = `- <h2>{{ show.title }}</h2>
- <img [src]="show.posterUrl || 'assets/no-poster.png'" [alt]="show.title" />
+ <h2>{{ show.name }}</h2>
+ <img [src]="show.imageUrl || 'assets/no-poster.png'" [alt]="show.name" />`;
}
