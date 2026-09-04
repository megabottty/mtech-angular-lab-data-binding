import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day4-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 4 · Act 2 of 3</span>
        <h1>🚦 Branching — &#64;if/&#64;else and &#64;switch</h1>
        <p class="subtitle">Show different markup depending on what the data actually is.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/templates/control-flow" target="_blank" rel="noopener">Templates → Control flow</a> — this time the <code>&#64;if</code> and <code>&#64;switch</code> sections.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Conditionally render markup with <code>&#64;if</code>/<code>&#64;else</code>, and branch on more than two outcomes with <code>&#64;switch</code>.</li>
          <li><strong>Why It Matters:</strong> Lists alone aren't enough — you also need to show different things depending on what the data <em>is</em>, not just how many items there are.</li>
          <li><strong>Build Steps:</strong> A count-based <code>&#64;if</code>/<code>&#64;else</code> message → a genre badge built with <code>&#64;switch</code>.</li>
          <li><strong>Expected Outcome:</strong> The list shows a different summary line depending on how many shows exist, and each card shows a genre-specific badge.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Branching)</p>
        <p><strong>Next step:</strong> Act 3 (Two-Way Binding, and Debug It)</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d4-act2-if-else" [stepNumber]="1" title="@if / @else">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p><strong>Do this:</strong> render a different summary line depending on how many shows are in the list:</p>

        <app-code-block lang="html" file="src/app/app.html" [code]="ifElseCode" />

        <p style="margin-top: 12px;">
          Only one branch ever renders. Angular evaluates the condition once per render pass and swaps the
          whole block — there's no hidden leftover markup from the branch that didn't match.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> With more than 3 shows in your array you see the "building quite a list" message; trim the array down and it switches to "Just getting started."</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d4-act2-switch" [stepNumber]="2" title="@switch — a Badge per Genre">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> add a genre badge inside each card's loop body:</p>

        <app-code-block lang="html" file="src/app/app.html" [code]="switchCode" />

        <p style="margin-top: 12px;">
          <code>&#64;switch</code> is the right tool once you have three or more outcomes to branch on —
          nesting <code>&#64;if</code>/<code>&#64;else</code> that many levels deep gets hard to read fast.
          <code>&#64;default</code> is required as a catch-all, the same way a real <code>switch</code>
          statement needs one.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Could you write this same badge logic with nested <code>&#64;if</code>/<code>&#64;else if</code> instead? What would make you reach for <code>&#64;switch</code> over that?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — readability at three-plus branches">
          <p>
            Yes, nested <code>&#64;if</code>/<code>&#64;else</code> can express the same logic. But once
            you're branching on more than two or three values of the <em>same</em> expression (here,
            <code>show.genre</code>), <code>&#64;switch</code> reads top-to-bottom as a flat list of cases
            instead of a staircase of nested conditions — it makes the "what are all the possible values"
            question easy to answer at a glance.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A "Kids" show renders a family badge, a "Thriller" show renders an edge-of-seat badge, and every other genre falls through to a default badge showing its own name.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day4/act1" class="btn-secondary">← Act 1: A Real List</a>
        <a routerLink="/day4/act3" class="btn-primary">Act 3: Two-Way Binding →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: '@if / @else',
      plainEnglish: 'Renders one block of markup or the other depending on whether a condition is true, with no leftover markup from the branch that lost.',
      analogy: 'A light switch — only one state is ever showing, never both at once.'
    },
    {
      concept: '@switch',
      plainEnglish: 'Branches on one expression\'s value across three or more cases, with a required default fallback.',
      analogy: 'A vending machine\'s row of buttons — press one number, get exactly that slot\'s item, and there\'s always a "nothing selected" default state.'
    }
  ];

  ifElseCode = `@if (shows().length > 3) {
  <p>{{ shows().length }} shows — you're building quite a list.</p>
} @else {
  <p>Just getting started.</p>
}`;

  switchCode = `@switch (show.genre) {
  @case ('Kids')     { <span class="badge">👨‍👩‍👧 Family</span> }
  @case ('Thriller') { <span class="badge">🔪 Edge of seat</span> }
  @default           { <span class="badge">📺 {{ show.genre }}</span> }
}`;
}
