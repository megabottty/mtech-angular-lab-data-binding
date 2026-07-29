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

      <!-- Step 1 -->
      <app-lesson-step stepId="act1-for" [stepNumber]="1" title="The Problem — Why plain HTML fails us">
        <p>Imagine you have 100 TV shows in your JavaScript file. In plain HTML you'd have to write this card 100 times:</p>
        <app-code-block lang="html" [code]="htmlProblem" />
        <div class="ask-class">If we have 100 TV shows, do we copy and paste this div 100 times? What happens when a user deletes a show?</div>
        <p style="margin-top:12px">This is exactly the problem Angular's <code>&#64;for</code> loop solves.</p>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="act1-track" [stepNumber]="2" title="The Solution — @for (The Cookie Cutter)">
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
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="act1-track-deep" [stepNumber]="3" title="Deep Dive — Why is track mandatory? (The Luggage Tag)">
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
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="act1-empty" [stepNumber]="4" title="Bonus — @empty (What if the list is empty?)">
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
