import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day4-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Genre Filter, Ratings, and Result Counts</h1>
        <p class="subtitle">About 50 minutes. 4 tasks, all on top of your filtered show list.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Complete Acts 1-3 first — this lab assumes you have a <code>shows</code> signal array, a
          <code>searchTerm</code> signal wired to <code>[(ngModel)]</code>, and a <code>filteredShows</code>
          computed already filtering by name.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Combine multiple signals into one computed, solo, without a build-along to copy from.</li>
          <li><strong>Why It Matters:</strong> The build-along filtered by one thing. Real filtering UIs combine several — search text, a category, a sort order — and it all still has to be one source of truth.</li>
          <li><strong>Build Steps:</strong> A genre <code>&lt;select&gt;</code> combined with search → rating-based badges → a result count with a "Clear filters" empty state → an optional sort dropdown.</li>
          <li><strong>Expected Outcome:</strong> A show list filterable by name and genre at once, with a friendly zero-results state and an accurate result count.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 4 Lab (final step of Day 4)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> About 50 minutes total.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="d4-lab-genre-filter" [stepNumber]="'Task 1'" title="Genre Filter">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>[(ngModel)]</code> on a select, combining two signals in one computed.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Next to the search box, add a <code>&lt;select&gt;</code> bound with <code>[(ngModel)]</code> to
          a genre signal — options are "All" plus each genre in your data. The list must respect both the
          search text and the selected genre at the same time.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add <code>selectedGenre = signal('All')</code> and a <code>&lt;select&gt;</code> with <code>[(ngModel)]="selectedGenre"</code>, one <code>&lt;option&gt;</code> per genre plus an "All" option.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Update <code>filteredShows</code> to a single computed reading both <code>searchTerm()</code> and <code>selectedGenre()</code> — filter by name first, then by genre unless it's "All".</span></div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Picking a genre narrows the list on its own, typing in the search box narrows it further, and the two filters stay combined no matter which you change first.</div>

        <app-collapsible icon="💡" label="Hint — Task 1">
          <app-code-block lang="typescript" [code]="genreFilterHintCode" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" [code]="genreFilterAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="d4-lab-ratings-guard" [stepNumber]="'Task 2'" title="Ratings Guard">
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: <code>&#64;if</code> or <code>&#64;switch</code>, your choice.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Shows rated below 7 render with a "Proceed with caution" badge; shows rated 9 and above get a
          "Certified banger" badge. Use <code>&#64;if</code> or <code>&#64;switch</code> — either is fine,
          but be ready to defend the choice.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Inside the loop, add a conditional block that checks <code>show.rating</code> against both thresholds.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Shows scoring 7 through 8.9 get no extra badge — only the two extremes are called out.</span></div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A show rated 6.5 shows the caution badge, a show rated 9.5 shows the banger badge, and a show rated 8.0 shows neither.</div>

        <app-collapsible icon="💡" label="Hint — Task 2">
          <app-code-block lang="typescript" [code]="ratingsGuardHintCode" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" [code]="ratingsGuardAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="d4-lab-result-count" [stepNumber]="'Task 3'" title="Result Count">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>computed()</code> for a count, resetting multiple signals from one button.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Above the list, show "Showing 3 of 8 shows." When the filters produce zero results, show a
          friendly empty state with a "Clear filters" button that resets both <code>searchTerm</code> and
          <code>selectedGenre</code> back to their defaults.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Render <code>{{ '{{ filteredShows().length }}' }} of {{ '{{ shows().length }}' }} shows</code> above the loop.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Use <code>&#64;empty</code> (or an <code>&#64;if</code> on the count) to show a message plus a button that calls one method resetting both signals.</span></div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Filtering down to zero results shows a "Clear filters" button, and clicking it restores the full list and resets the search box and select to their defaults.</div>

        <app-collapsible icon="💡" label="Hint — Task 3">
          <app-code-block lang="typescript" [code]="resultCountHintCode" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" [code]="resultCountAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 4 -->
      <app-lesson-step stepId="d4-lab-sort-stretch" [stepNumber]="'Task 4 (Stretch)'" title="Sort Dropdown">
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: folding a third signal into an existing computed chain.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a sort dropdown — by name or by rating — as another signal, folded into the same
          <code>filteredShows</code> computed rather than a separate one.
        </p>

        <app-collapsible icon="💡" label="Hint — Task 4">
          <app-code-block lang="typescript" [code]="sortHintCode" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Switching the sort dropdown reorders the currently-filtered list live, without resetting the search text or genre selection.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <app-code-block lang="typescript" [code]="sortAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day4/act3" class="btn-secondary">← Act 3: Two-Way Binding, and Debug It</a>
        <a routerLink="/" class="btn-primary">Back to Home →</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> A list renders from a signal array with <code>&#64;for</code> + <code>track</code> + <code>&#64;empty</code>.</li>
          <li><span class="checkbox">✅</span> A live search filter works end-to-end via <code>[(ngModel)]</code> → signal → computed.</li>
          <li><span class="checkbox">✅</span> Can explain <code>track</code> in your own words.</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 4. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Conditionally render with <code>&#64;if</code> / <code>&#64;else</code>.</li>
          <li>✅ Render lists with <code>&#64;for</code>, and explain why <code>track</code> is mandatory.</li>
          <li>✅ Branch with <code>&#64;switch</code>, and defer heavy UI with <code>&#64;defer</code>.</li>
          <li>✅ Wire an input to state with <code>[(ngModel)]</code> and build a live filter.</li>
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
export class Day4LabComponent {
  genreFilterHintCode = `selectedGenre = signal('All');

filteredShows = computed(() => {
  // filter by searchTerm(), then by selectedGenre() unless it's 'All'
});`;

  genreFilterAnswerCode = `genres = computed(() => ['All', ...new Set(this.shows().map(s => s.genre))]);
selectedGenre = signal('All');

filteredShows = computed(() =>
  this.shows()
    .filter(s => s.name.toLowerCase().includes(this.searchTerm().toLowerCase()))
    .filter(s => this.selectedGenre() === 'All' || s.genre === this.selectedGenre())
);`;

  ratingsGuardHintCode = `@if (show.rating < 7) {
  <!-- caution badge -->
} @else if (show.rating >= 9) {
  <!-- banger badge -->
}`;

  ratingsGuardAnswerCode = `@for (show of filteredShows(); track show.id) {
  <article class="card">
    <h3>{{ show.name }}</h3>
    @if (show.rating < 7) {
      <span class="badge caution">⚠️ Proceed with caution</span>
    } @else if (show.rating >= 9) {
      <span class="badge banger">🏆 Certified banger</span>
    }
  </article>
}`;

  resultCountHintCode = `clearFilters() {
  this.searchTerm.set('');
  this.selectedGenre.set('All');
}`;

  resultCountAnswerCode = `<p>Showing {{ filteredShows().length }} of {{ shows().length }} shows</p>

@if (filteredShows().length === 0) {
  <p>No shows match your filters.</p>
  <button (click)="clearFilters()">Clear filters</button>
}`;

  sortHintCode = `sortBy = signal<'name' | 'rating'>('name');

filteredShows = computed(() => {
  const list = this.shows().filter(/* search + genre logic */);
  return [...list].sort((a, b) =>
    this.sortBy() === 'name'
      ? a.name.localeCompare(b.name)
      : b.rating - a.rating
  );
});`;

  sortAnswerCode = `sortBy = signal<'name' | 'rating'>('name');
selectedGenre = signal('All');

filteredShows = computed(() => {
  const list = this.shows()
    .filter(s => s.name.toLowerCase().includes(this.searchTerm().toLowerCase()))
    .filter(s => this.selectedGenre() === 'All' || s.genre === this.selectedGenre());

  return [...list].sort((a, b) =>
    this.sortBy() === 'name'
      ? a.name.localeCompare(b.name)
      : b.rating - a.rating
  );
});`;
}
