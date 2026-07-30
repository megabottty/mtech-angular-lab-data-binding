import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-act5-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Hands-On: Build the Full TV Show Filter</h1>
        <p class="subtitle">
          45 minutes. 3 tasks. Start from the Act 4 code and extend it on your own. 
          Each task has hints and answers if you get stuck — but try first!
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>Copy the complete code from <a routerLink="/lesson/4">Act 4 Step 3</a> into your project before starting. Your <code>app.component.ts</code> and <code>app.component.html</code> should already have the search bar and show grid working.</p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Extend a working Angular app with multi-filter logic and useful UX feedback.</li>
          <li><strong>Why It Matters:</strong> This is the same pattern used in real dashboards, e-commerce filters, and media search pages.</li>
          <li><strong>Build Steps:</strong> Add genre state → add reset behavior → add live stats and warning feedback.</li>
          <li><strong>Expected Outcome:</strong> You can independently modify both TypeScript logic and template UI in a real mini-feature.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (capstone)</p>
        <p><strong>Next step:</strong> Finish all 3 tasks, then review your “I can now…” checklist below.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="lab-task1" [stepNumber]="'Task 1'" title="Add a Genre Filter Dropdown">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: signal(), [(ngModel)], computed(), &lt;select&gt;</span>
        </div>

        <h4>What to build:</h4>
        <p>Add a dropdown below the search box that lets users filter by genre. When combined with the search text filter, only shows matching BOTH conditions should appear.</p>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a <code>selectedGenre</code> signal initialized to <code>'All'</code> in your TypeScript file</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a <code>&lt;select [(ngModel)]="selectedGenre"&gt;</code> in your HTML with genre options</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Update <code>filteredShows</code> computed to check <strong>both</strong> search text AND genre</span>
          </div>
        </div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Students can filter by both text and genre at the same time.</div>

        <app-collapsible icon="💡" label="Hint — How do I structure the select element?">
          <p>A select element with two-way binding looks like this. The <code>value</code> attribute on each option is what gets stored in your signal:</p>
          <app-code-block lang="html" [code]="task1HtmlHint" />
        </app-collapsible>

        <app-collapsible icon="💡" label="Hint — How do I add the genre check to computed()?">
          <p>Inside your <code>filteredShows</code> computed, read both signals and add an extra <code>&& </code> condition to the filter:</p>
          <app-code-block lang="typescript" [code]="task1TsHint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <h4>TypeScript changes:</h4>
          <app-code-block lang="typescript" [code]="task1TsAnswer" />
          <h4 style="margin-top: 16px">HTML changes:</h4>
          <app-code-block lang="html" [code]="task1HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="lab-task2" [stepNumber]="'Task 2'" title="Add a 'Clear All Filters' Button">
        <div class="task-meta">
          <span class="difficulty easy">🟢 Easier</span>
          <span class="concepts">Concepts: (click) event, .set(), &#64;if</span>
        </div>

        <h4>What to build:</h4>
        <p>Inside the <code>&#64;empty</code> block (when no shows match), display a "Clear All Filters" button. Clicking it resets both the search text and genre dropdown back to their defaults.</p>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Find the <code>&#64;empty</code> block in your HTML template</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a <code>&lt;button&gt;</code> inside it with a <code>(click)</code> handler</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Create a <code>clearFilters()</code> method in TypeScript that calls <code>.set()</code> on both signals</span>
          </div>
        </div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Students can recover from an empty result state with one click.</div>

        <div class="info-box">
          <strong>Bonus challenge:</strong> Also add an <code>&#64;if</code> block at the top of the page that shows a warning message when the <code>filteredShows</code> array is empty (but the full list is not). Try this before looking at the hint!
        </div>

        <app-collapsible icon="💡" label="Hint — What should clearFilters() look like?">
          <p>It's a simple method that resets both signals to their initial values:</p>
          <app-code-block lang="typescript" [code]="task2TsHint" />
        </app-collapsible>

        <app-collapsible icon="💡" label="Hint — What does the @if warning banner look like?">
          <p>An <code>&#64;if</code> block at the top of your HTML that checks if the filtered list is empty but the full list isn't:</p>
          <app-code-block lang="html" [code]="task2HtmlHint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <h4>TypeScript method to add:</h4>
          <app-code-block lang="typescript" [code]="task2TsAnswer" />
          <h4 style="margin-top: 16px">HTML changes (inside &#64;empty block + warning at top):</h4>
          <app-code-block lang="html" [code]="task2HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="lab-task3" [stepNumber]="'Task 3'" title="Display Dynamic Stat Counter">
        <div class="task-meta">
          <span class="difficulty hard">🔴 Challenge</span>
          <span class="concepts">Concepts: computed(), multiple derived stats, &#64;if</span>
        </div>

        <h4>What to build:</h4>
        <p>Add a stats bar above the show grid that dynamically calculates and displays:</p>
        <ul class="stat-list">
          <li>📊 Total shows in the full list</li>
          <li>🔍 Number of shows currently matching filters</li>
          <li>⭐ Average rating of the filtered shows (rounded to 1 decimal)</li>
          <li>⚠️ A warning message when 0 shows match the current filters</li>
        </ul>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Create an <code>avgRating</code> computed signal that calculates the average rating of <code>filteredShows()</code></span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a stats bar in the HTML using <code>{{ '{{' }} filteredShows().length {{ '}}' }}</code>, <code>{{ '{{' }} shows().length {{ '}}' }}</code>, and <code>{{ '{{' }} avgRating() {{ '}}' }}</code></span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Show a warning <code>&#64;if</code> block when <code>filteredShows().length === 0</code></span>
          </div>
        </div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Students can compute and display derived stats from filtered data.</div>

        <app-collapsible icon="💡" label="Hint — How do I calculate an average in JavaScript?">
          <p>Sum all ratings, then divide by the count. Use <code>.reduce()</code> for the sum and <code>toFixed(1)</code> to round to 1 decimal:</p>
          <app-code-block lang="typescript" [code]="task3Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <h4>TypeScript — add avgRating computed:</h4>
          <app-code-block lang="typescript" [code]="task3TsAnswer" />
          <h4 style="margin-top: 16px">HTML — stats bar and warning:</h4>
          <app-code-block lang="html" [code]="task3HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Completion -->
      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've completed all 4 Acts and the Student Lab. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Display lists efficiently with <code>&#64;for</code> and <code>track</code></li>
          <li>✅ Show/hide elements conditionally with <code>&#64;if</code> and <code>&#64;switch</code></li>
          <li>✅ Connect HTML inputs to JavaScript with <code>[(ngModel)]</code></li>
          <li>✅ Build reactive derived state with <code>computed()</code></li>
          <li>✅ Combine all four to build a real working filter UI</li>
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

    .stat-list {
      list-style: none;
      padding: 0;
      margin: 12px 0;
    }
    .stat-list li {
      padding: 6px 0;
      font-size: 14px;
      color: #cccccc;
      border-bottom: 1px solid #2d2d30;
    }
    .stat-list li:last-child { border-bottom: none; }

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
export class Act5LabComponent {
  task1HtmlHint = `<select [(ngModel)]="selectedGenre">
  <option value="All">All Genres</option>
  <option value="Drama">Drama</option>
  <option value="Kids">Kids</option>
  <option value="Thriller">Thriller</option>
  <option value="Sci-Fi">Sci-Fi</option>
</select>`;

  task1TsHint = `filteredShows = computed(() => {
  const query = this.searchTerm().toLowerCase().trim();
  const genre = this.selectedGenre();
  
  return this.shows().filter(show => {
    const matchesText = show.title.toLowerCase().includes(query);
    const matchesGenre = genre === 'All' || show.genre === genre;
    return matchesText && matchesGenre; // BOTH must be true
  });
});`;

  task1TsAnswer = `// Add this signal (below searchTerm)
selectedGenre = signal('All');

// Replace your existing filteredShows computed with this:
filteredShows = computed(() => {
  const query = this.searchTerm().toLowerCase().trim();
  const genre = this.selectedGenre();
  return this.shows().filter(show => {
    const matchesText = !query || show.title.toLowerCase().includes(query);
    const matchesGenre = genre === 'All' || show.genre === genre;
    return matchesText && matchesGenre;
  });
});`;

  task1HtmlAnswer = `<!-- Add this below your search input -->
<div class="filter-row">
  <label for="genre">Genre:</label>
  <select id="genre" [(ngModel)]="selectedGenre">
    <option value="All">All Genres</option>
    <option value="Drama">Drama</option>
    <option value="Kids">Kids</option>
    <option value="Thriller">Thriller</option>
    <option value="Sci-Fi">Sci-Fi</option>
  </select>
</div>`;

  task2TsHint = `clearFilters() {
  this.searchTerm.set('');
  this.selectedGenre.set('All');
}`;

  task2HtmlHint = `<!-- Add this at the top of your template, above the search bar -->
@if (filteredShows().length === 0 && shows().length > 0) {
  <div class="warning-banner">
    ⚠️ No shows match your current filters.
  </div>
}`;

  task2TsAnswer = `// Add this method to your AppComponent class
clearFilters() {
  this.searchTerm.set('');
  this.selectedGenre.set('All');
}`;

  task2HtmlAnswer = `<!-- Top of template: warning banner -->
@if (filteredShows().length === 0 && shows().length > 0) {
  <div class="warning-banner">
    ⚠️ No shows match your current filters.
  </div>
}

<!-- Inside your @empty block: -->
} @empty {
  <div class="no-results">
    <p>No shows match your search.</p>
    <button (click)="clearFilters()">🗑️ Clear All Filters</button>
  </div>
}`;

  task3Hint = `avgRating = computed(() => {
  const filtered = this.filteredShows();
  if (filtered.length === 0) return 0;
  
  const sum = filtered.reduce((total, show) => total + show.rating, 0);
  return (sum / filtered.length).toFixed(1); // rounds to 1 decimal
});`;

  task3TsAnswer = `// Add this computed below filteredShows
avgRating = computed(() => {
  const filtered = this.filteredShows();
  if (filtered.length === 0) return '—';
  const sum = filtered.reduce((total, show) => total + show.rating, 0);
  return (sum / filtered.length).toFixed(1);
});`;

  task3HtmlAnswer = `<!-- Stats bar — add above the show grid -->
<div class="stats-bar">
  <div class="stat">
    <span class="stat-value">{{ filteredShows().length }}</span>
    <span class="stat-label">of {{ shows().length }} shows</span>
  </div>
  <div class="stat">
    <span class="stat-value">⭐ {{ avgRating() }}</span>
    <span class="stat-label">avg rating</span>
  </div>
</div>

<!-- Warning when nothing matches -->
@if (filteredShows().length === 0 && shows().length > 0) {
  <div class="warning-banner">
    ⚠️ No shows match your current filters. Try a different search or genre.
  </div>
}`;
}
