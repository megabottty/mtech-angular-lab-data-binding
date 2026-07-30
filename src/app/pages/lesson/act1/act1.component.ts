import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Act 1 of 5</span>
        <h1>🔁 Displaying Lists with <code>&#64;for</code> & <code>track</code></h1>
        <p class="subtitle">Stop copy-pasting HTML. Let Angular stamp it out for you.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Render list data from TypeScript without manual copy/paste HTML.</li>
          <li><strong>Why It Matters:</strong> Real apps have changing arrays (add/remove/filter), so UI must update safely and fast.</li>
          <li><strong>Build Steps:</strong> Identify the problem → add <code>&#64;for</code> → add <code>track</code> → handle empty state with <code>&#64;empty</code>.</li>
          <li><strong>Expected Outcome:</strong> You can read an array from TypeScript and correctly render, update, and fallback in the template.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Lists)</p>
        <p><strong>Next step:</strong> Act 2 (Decisions with &#64;if / &#64;switch)</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="act1-for" [stepNumber]="1" title="The Problem — Why plain HTML fails us">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Imagine you have 100 TV shows in your JavaScript file. In plain HTML you'd have to write this card 100 times:</p>
        <app-code-block lang="html" [code]="htmlProblem" />
        <div class="ask-class">If we have 100 TV shows, do we copy and paste this div 100 times? What happens when a user deletes a show?</div>
        <p style="margin-top:12px">This is exactly the problem Angular's <code>&#64;for</code> loop solves.</p>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why repeating static HTML does not scale.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="act1-track" [stepNumber]="2" title="The Solution — @for (The Cookie Cutter)">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Think of <code>&#64;for</code> as a <strong>cookie cutter</strong>. The array is your dough, and the HTML inside is the shape that gets stamped for every item.</p>
        <app-code-block lang="html" [code]="forSolution" />

        <div class="info-box">
          <strong>Breaking down the syntax:</strong><br />
          <code>show</code> — the variable name for one item in the loop<br />
          <code>of shows()</code> — iterate over the <code>shows</code> signal<br />
          <code>track show.id</code> — give each item a unique label (see Step 3!)<br />
          <code>{{ '{{' }} show.title {{ '}}' }}</code> — display the item's data
        </div>

        <app-collapsible icon="💡" label="Hint — What does the () mean after shows?">
          <p>In Angular Signals, <code>shows</code> is not a plain array — it's a <strong>signal</strong>, which is a reactive container. You call it like a function <code>shows()</code> to read the current value inside it. You'll learn more about signals in Act 4!</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Full working @for block">
          <p>Here's the complete pattern. Your array name will differ from project to project:</p>
          <app-code-block lang="html" [code]="forAnswer" />
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — Where does shows() come from?">
          <p>Beginners often ask: <em>\"Why does HTML call <code>shows()</code> like a function?\"</em> Because in Angular Signals, your list lives in TypeScript as a signal:</p>
          <app-code-block lang="typescript" [code]="forTsStarter" />
          <p style="margin-top: 12px;">In this lesson, HTML renders the list. TypeScript is where the list is created and updated.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can write a working <code>&#64;for (item of signal(); track item.id)</code> loop.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="act1-track-deep" [stepNumber]="3" title="Deep Dive — Why is track mandatory? (The Luggage Tag)">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Angular requires <code>track</code> for performance. Here's the best analogy:</p>

        <div class="luggage-analogy">
          <div class="analogy-scene">
            <span class="analogy-icon">✈️</span>
            <div class="analogy-text">
              <strong>Without tags (no track):</strong> 100 identical black suitcases drop onto the belt. If one person grabs theirs, airport workers must inspect every single bag to figure out what moved.<br /><br />
              <strong>With unique tags (track show.id):</strong> Each bag has a label. The system instantly knows which bag was touched — and only updates that one.
            </div>
          </div>
        </div>

        <div class="warning-box">
          <strong>⚠️ Performance impact:</strong> Without <code>track</code>, if you delete 1 item from a list of 1,000, Angular destroys and recreates ALL 1,000 HTML elements. With <code>track show.id</code>, it deletes only that <strong>1 element</strong>.
        </div>

        <app-code-block lang="html" [code]="trackExample" />

        <div class="info-box">
          <strong>💡 What to track by:</strong> Always track by a unique field like <code>id</code>. If your items don't have an ID, you can use <code>track $index</code> as a last resort (but unique IDs are always better).
        </div>

        <app-collapsible icon="💡" label="Hint — What if my objects don't have an id field?">
          <p>You can use <code>track $index</code> which tracks by position in the array. However, this has the same performance problem when items are reordered. Always try to add a unique <code>id</code> to your data objects.</p>
          <app-code-block lang="html" [code]="trackIndexHint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Correct track syntax for different scenarios">
          <app-code-block lang="html" [code]="trackAnswer" />
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — What happens when an item is removed?">
          <p>If you remove one show in TypeScript, Angular compares old vs new list and updates the DOM. <code>track show.id</code> is what makes this fast and precise.</p>
          <app-code-block lang="typescript" [code]="removeShowTs" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can describe what <code>track</code> does and pick a good unique key.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="act1-empty" [stepNumber]="4" title="Bonus — @empty (What if the list is empty?)">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>What happens when the array has zero items? Angular gives you a built-in fallback block called <code>&#64;empty</code>:</p>
        <app-code-block lang="html" [code]="emptyExample" />

        <div class="info-box">
          <strong>No extra if-checks needed!</strong> The <code>&#64;empty</code> block automatically shows when the array is empty and hides when items exist. Angular handles this for you.
        </div>

        <app-collapsible icon="💡" label="Hint — When does @empty trigger?">
          <p>The <code>&#64;empty</code> block triggers when the array passed to <code>&#64;for</code> has a length of 0. It does NOT trigger when the array is <code>null</code> or <code>undefined</code> — make sure your signal is initialized to an empty array <code>[]</code>, not <code>null</code>.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Full @for with @empty">
          <app-code-block lang="html" [code]="emptyAnswer" />
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — Initialize arrays safely">
          <p>For <code>&#64;empty</code> to behave predictably, beginners should initialize list signals to an empty array (not null):</p>
          <app-code-block lang="typescript" [code]="emptyTsStarter" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can provide a clear empty-state message when no results are found.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/" class="btn-secondary">← Home</a>
        <a routerLink="/lesson/2" class="btn-primary">Act 2: &#64;if &amp; &#64;switch →</a>
      </div>
    </div>
  `,
  styles: [`
    .luggage-analogy {
      background: #1a2e1a;
      border: 1px solid #2a5c2a;
      border-radius: 8px;
      padding: 20px;
      margin: 16px 0;
    }
    .analogy-scene { display: flex; gap: 16px; align-items: flex-start; }
    .analogy-icon { font-size: 40px; flex-shrink: 0; }
    .analogy-text { color: #a0d0a0; font-size: 14px; line-height: 1.8; }
  `]
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: '@for', plainEnglish: '"Repeat this HTML box"', analogy: '🍪 Cookie cutter stamping out cookies' },
    { concept: 'track', plainEnglish: '"Label every item"', analogy: '🏷️ Luggage tags at the airport baggage belt' },
    { concept: '@empty', plainEnglish: '"Show this if nothing exists"', analogy: '📭 An empty mailbox sign' }
  ];

  htmlProblem = `<!-- ❌ The old way: copy-paste for every item -->
<div class="card">
  <h3>Severance</h3>
</div>
<div class="card">
  <h3>The Bear</h3>
</div>
<div class="card">
  <h3>Bluey</h3>
</div>
<!-- ...97 more times 😱 -->`;

  forSolution = `@for (show of shows(); track show.id) {
  <div class="card">
    <h3>{{ show.title }}</h3>
  </div>
}`;

  forAnswer = `<!-- ✅ The Angular way: write it ONCE, loop for every item -->
@for (show of shows(); track show.id) {
  <div class="card">
    <h3>{{ show.title }}</h3>
    <p>Genre: {{ show.genre }}</p>
    <p>Rating: ⭐ {{ show.rating }}</p>
  </div>
}`;

  forTsStarter = `import { Component, signal } from '@angular/core';

type Show = {
  id: number;
  title: string;
  genre: string;
  rating: number;
};

@Component({ ... })
export class AppComponent {
  // Signal that stores the list used by @for
  shows = signal<Show[]>([
    { id: 1, title: 'Severance', genre: 'Thriller', rating: 8.7 },
    { id: 2, title: 'Bluey', genre: 'Kids', rating: 9.5 }
  ]);
}`;

  removeShowTs = `removeShow(idToRemove: number) {
  this.shows.update(currentShows =>
    currentShows.filter(show => show.id !== idToRemove)
  );
}`;

  emptyTsStarter = `// Good beginner default: never start list state as null
filteredShows = signal<Show[]>([]);

// Later, set real data after fetch/filter logic
this.filteredShows.set([
  { id: 1, title: 'Severance', genre: 'Thriller', rating: 8.7 }
]);`;

  trackExample = `<!-- ✅ Always track by a unique identifier like 'id' -->
@for (show of shows(); track show.id) {
  <div class="card">{{ show.title }}</div>
}`;

  trackIndexHint = `<!-- ⚠️ Only use $index if your objects have no unique id -->
@for (item of items(); track $index) {
  <p>{{ item.name }}</p>
}`;

  trackAnswer = `<!-- Track by unique id (BEST) -->
@for (show of shows(); track show.id) { ... }

<!-- Track by index (use only if no id exists) -->
@for (item of items(); track $index) { ... }

<!-- Track by a different unique field (also valid) -->
@for (user of users(); track user.email) { ... }`;

  emptyExample = `@for (show of filteredShows(); track show.id) {
  <div class="card">
    <h3>{{ show.title }}</h3>
  </div>
} @empty {
  <p class="empty-msg">No shows match your search!</p>
}`;

  emptyAnswer = `@for (show of filteredShows(); track show.id) {
  <div class="card">
    <h3>{{ show.title }}</h3>
    <p>{{ show.genre }}</p>
  </div>
} @empty {
  <div class="no-results">
    <p>😕 No shows found.</p>
    <button (click)="clearSearch()">Clear Filters</button>
  </div>
}`;
}
