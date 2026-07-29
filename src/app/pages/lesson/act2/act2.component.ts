import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Act 2 of 5</span>
        <h1>🚦 Making Decisions with <code>&#64;if</code> &amp; <code>&#64;switch</code></h1>
        <p class="subtitle">Show or hide HTML elements based on conditions — no more cluttered code.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <!-- Step 1: @if -->
      <app-lesson-step stepId="act2-if" [stepNumber]="1" title="@if / @else — The Security Guard">
        <p>Think of <code>&#64;if</code> like a <strong>security guard at a venue door</strong>. Only people who meet the requirement get in. Everyone else sees the fallback.</p>

        <app-code-block lang="html" [code]="ifBasic" />

        <div class="info-box">
          <strong>The 3 blocks:</strong><br />
          <code>&#64;if (condition)</code> — runs when condition is <strong>true</strong><br />
          <code>&#64;else if (other)</code> — checked only when the first is false<br />
          <code>&#64;else</code> — the fallback when nothing matches
        </div>

        <div class="ask-class">Before I reveal the code — what do you think should happen if a show has a rating below 7.0? What badge should appear?</div>

        <app-code-block lang="html" [code]="ifFull" />

        <div class="info-box">
          <strong>💡 Key rule:</strong> Angular evaluates conditions <em>top to bottom</em> and stops at the first true match. Order matters!
        </div>

        <app-collapsible icon="💡" label="Hint — What operators can I use inside @if?">
          <p>You can use all standard JavaScript comparison operators:</p>
          <app-code-block lang="html" [code]="ifOperatorsHint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Full @if rating badge">
          <p>Here's the complete rating badge with all three conditions:</p>
          <app-code-block lang="html" [code]="ifAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Step 2: @switch -->
      <app-lesson-step stepId="act2-switch" [stepNumber]="2" title="@switch — The Multi-Option Highway">
        <p>When you have <strong>3 or more specific exact values</strong> to check (like genre names), long <code>&#64;if / &#64;else if</code> chains get messy. <code>&#64;switch</code> is the clean alternative.</p>

        <div class="comparison-grid">
          <div class="compare-col bad">
            <div class="compare-label">❌ Messy &#64;if chain</div>
            <app-code-block lang="html" [code]="switchBad" />
          </div>
          <div class="compare-col good">
            <div class="compare-label">✅ Clean &#64;switch</div>
            <app-code-block lang="html" [code]="switchGood" />
          </div>
        </div>

        <div class="info-box">
          <strong>Key parts of &#64;switch:</strong><br />
          <code>&#64;switch (expression)</code> — the value to compare against<br />
          <code>&#64;case ('value')</code> — matches one specific value (use quotes for strings!)<br />
          <code>&#64;default</code> — runs when no case matches (optional but recommended)
        </div>

        <div class="ask-class">What would you add for a "Comedy" genre? Write the &#64;case line before checking the answer.</div>

        <app-collapsible icon="💡" label="Hint — Can @switch check numbers too?">
          <p>Yes! <code>&#64;switch</code> works with any type — strings, numbers, booleans. Just make sure your <code>&#64;case</code> values match the exact type:</p>
          <app-code-block lang="html" [code]="switchTypesHint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Full genre @switch with Comedy added">
          <app-code-block lang="html" [code]="switchAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Step 3: When to use each -->
      <app-lesson-step stepId="act2-choose" [stepNumber]="3" title="When to use @if vs @switch — The Decision Rule">
        <div class="decision-table">
          <div class="decision-row header">
            <span>Situation</span><span>Use</span>
          </div>
          <div class="decision-row">
            <span>1–2 conditions (true/false, yes/no)</span>
            <span class="tag-if">&#64;if</span>
          </div>
          <div class="decision-row">
            <span>Ranges or comparisons (rating &gt;= 9, age &lt; 18)</span>
            <span class="tag-if">&#64;if</span>
          </div>
          <div class="decision-row">
            <span>3+ exact values (genre, status, role)</span>
            <span class="tag-switch">&#64;switch</span>
          </div>
          <div class="decision-row">
            <span>Mapping one value to different UI elements</span>
            <span class="tag-switch">&#64;switch</span>
          </div>
        </div>

        <app-collapsible icon="💡" label="Hint — Is there ever a wrong answer?">
          <p>Technically both can handle the same cases. The rule is about readability. If you have 5+ <code>&#64;else if</code> blocks all checking the exact same variable, replace with <code>&#64;switch</code>. Angular doesn't enforce this — but your teammates (and future you!) will thank you.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Side-by-side refactoring example">
          <p>Here's the same logic written both ways so you can compare:</p>
          <app-code-block lang="html" [code]="decisionAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/lesson/1" class="btn-secondary">← Act 1</a>
        <a routerLink="/lesson/3" class="btn-primary">Act 3: [(ngModel)] →</a>
      </div>
    </div>
  `,
  styles: [`
    .comparison-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin: 16px 0;
    }
    @media (max-width: 600px) { .comparison-grid { grid-template-columns: 1fr; } }
    .compare-col { }
    .compare-label { font-size: 13px; font-weight: 600; margin-bottom: 4px; }
    .compare-col.bad .compare-label { color: #f44747; }
    .compare-col.good .compare-label { color: #4ec9b0; }

    .decision-table {
      border: 1px solid #3e3e42;
      border-radius: 8px;
      overflow: hidden;
      margin: 16px 0;
      font-size: 14px;
    }
    .decision-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 16px;
      padding: 12px 16px;
      border-bottom: 1px solid #3e3e42;
      align-items: center;
    }
    .decision-row:last-child { border-bottom: none; }
    .decision-row.header { background: #2d2d30; color: #858585; font-weight: 600; font-size: 12px; text-transform: uppercase; }
    .tag-if, .tag-switch {
      font-family: monospace;
      font-size: 12px;
      padding: 2px 10px;
      border-radius: 4px;
      font-weight: 700;
      white-space: nowrap;
    }
    .tag-if { background: #1a2e2a; color: #4ec9b0; border: 1px solid #2a5c2a; }
    .tag-switch { background: #1a1a2e; color: #82aaff; border: 1px solid #2a2a5c; }
  `]
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: '@if', plainEnglish: '"Show this ONLY when true"', analogy: '🚪 Security guard — pass or no entry' },
    { concept: '@else if', plainEnglish: '"Otherwise, try this condition"', analogy: '🚦 Multiple traffic signals in sequence' },
    { concept: '@switch', plainEnglish: '"Match this exact value"', analogy: '🛣️ Highway exit ramps — each goes somewhere different' },
    { concept: '@default', plainEnglish: '"If nothing matched, use this"', analogy: '📭 The miscellaneous pile when no box fits' }
  ];

  ifBasic = `@if (show.rating >= 9.0) {
  <!-- This HTML only renders when rating is 9 or above -->
  <span class="badge gold">🔥 Must Watch</span>
}`;

  ifFull = `@if (show.rating >= 9.0) {
  <span class="badge gold">🔥 Must Watch</span>
} @else if (show.rating < 7.0) {
  <span class="badge warning">⚠️ Mixed Reviews</span>
} @else {
  <span class="badge standard">📺 Average</span>
}`;

  ifOperatorsHint = `<!-- Comparison operators in @if -->
@if (user.age >= 18) { ... }         <!-- greater than or equal -->
@if (cart.items.length === 0) { ... } <!-- strict equal -->
@if (user.isLoggedIn) { ... }        <!-- truthy check -->
@if (!user.isLoggedIn) { ... }       <!-- NOT / falsy check -->
@if (role === 'admin' || role === 'teacher') { ... } <!-- OR -->`;

  ifAnswer = `@if (show.rating >= 9.0) {
  <span class="badge gold">🔥 Must Watch (⭐ {{ show.rating }})</span>
} @else if (show.rating < 7.0) {
  <span class="badge warning">⚠️ Mixed Reviews (⭐ {{ show.rating }})</span>
} @else {
  <span class="badge standard">📺 Good Watch (⭐ {{ show.rating }})</span>
}`;

  switchBad = `@if (show.genre === 'Kids') {
  <span>👨‍👩‍👧 Family</span>
} @else if (show.genre === 'Thriller') {
  <span>🔪 Suspense</span>
} @else if (show.genre === 'Sci-Fi') {
  <span>🚀 Space</span>
} @else if (show.genre === 'Drama') {
  <span>🎭 Drama</span>
} @else {
  <span>📺 {{ show.genre }}</span>
}`;

  switchGood = `@switch (show.genre) {
  @case ('Kids')     { <span>👨‍👩‍👧 Family</span> }
  @case ('Thriller') { <span>🔪 Suspense</span> }
  @case ('Sci-Fi')   { <span>🚀 Space</span> }
  @case ('Drama')    { <span>🎭 Drama</span> }
  @default           { <span>📺 {{ show.genre }}</span> }
}`;

  switchTypesHint = `<!-- Matching strings (use quotes) -->
@switch (user.role) {
  @case ('admin') { <span>Admin Panel</span> }
  @case ('student') { <span>Student View</span> }
}

<!-- Matching numbers (no quotes) -->
@switch (errorCode) {
  @case (404) { <p>Page not found</p> }
  @case (500) { <p>Server error</p> }
}`;

  switchAnswer = `@switch (show.genre) {
  @case ('Kids')     { <span class="badge green">👨‍👩‍👧 Family</span> }
  @case ('Thriller') { <span class="badge red">🔪 Suspense</span> }
  @case ('Sci-Fi')   { <span class="badge blue">🚀 Space</span> }
  @case ('Drama')    { <span class="badge purple">🎭 Drama</span> }
  @case ('Comedy')   { <span class="badge yellow">😂 Comedy</span> }
  @default           { <span class="badge gray">📺 {{ show.genre }}</span> }
}`;

  decisionAnswer = `<!-- Same logic, two styles -->

<!-- @if approach (better for ranges) -->
@if (score >= 90) {
  <span>A</span>
} @else if (score >= 80) {
  <span>B</span>
} @else if (score >= 70) {
  <span>C</span>
} @else {
  <span>F</span>
}

<!-- @switch approach (better for exact values) -->
@switch (grade) {
  @case ('A') { <span class="gold">Excellent</span> }
  @case ('B') { <span class="blue">Good</span> }
  @case ('C') { <span class="gray">Average</span> }
  @default    { <span class="red">Needs Work</span> }
}`;
}
