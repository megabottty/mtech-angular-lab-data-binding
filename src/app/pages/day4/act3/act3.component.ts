import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day4-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 4 · Act 3 of 3</span>
        <h1>🔍 Two-Way Binding — The Live Filter</h1>
        <p class="subtitle">Typing in a box updates a signal, and a computed does the rest.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Wire an input to state with <code>[(ngModel)]</code>, and build a live filter with a <code>computed</code>.</li>
          <li><strong>Why It Matters:</strong> This is the moment lists, signals, and forms all connect — a search box that filters a rendered list with zero imperative code.</li>
          <li><strong>Build Steps:</strong> Import <code>FormsModule</code> → a <code>searchTerm</code> signal → a <code>filteredShows</code> computed → wire <code>[(ngModel)]</code> → a short <code>&#64;defer</code> demo → read three broken examples.</li>
          <li><strong>Expected Outcome:</strong> Typing into a search box narrows the rendered list live, and you can name the exact chain of signals that makes it work.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Two-Way Binding, and Debug It)</p>
        <p><strong>Next step:</strong> The Lab (final step of Day 4)</p>
        <p><strong>Time:</strong> About 40 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d4-act3-two-way-filter" [stepNumber]="1" title="[(ngModel)] and a Live Filter">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Import <code>FormsModule</code> into the <code>App</code> component's <code>imports</code> array
          — it's needed for <code>ngModel</code> to work at all. Then:
        </p>

        <app-code-block lang="typescript" [code]="filterStateCode" />

        <app-code-block lang="html" [code]="filterTemplateCode" />

        <p style="margin-top: 12px;">
          Change your <code>&#64;for</code> loop to iterate <code>filteredShows()</code> instead of
          <code>shows()</code>. Type "b" into the box — the list narrows live. This is the moment the
          course clicks for a lot of people, so pause here and unpack the plumbing:
          <code>[(ngModel)]</code> is <code>[value]</code> and <code>(input)</code> combined into one
          binding — the "banana in a box." Typing writes straight into <code>searchTerm</code>, and the
          <code>computed</code> chain does everything else. Zero imperative code.
        </p>

        <div class="think-about-it">
          <p class="tai-q">If you typed a value directly into <code>searchTerm.set('bear')</code> from a button instead of the input, what would happen to the box on screen?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — it's a two-way street">
          <p>
            The input would update to show "bear" too. <code>[(ngModel)]</code> is genuinely two-way: the
            input writes into the signal on every keystroke, <em>and</em> the input reads from the signal
            to decide what to display. Change the signal from anywhere in your code and the box updates
            itself — you never have to touch the DOM element directly.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Typing into the search box narrows the visible list live, with the filtering logic living entirely in one <code>computed</code>.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d4-act3-defer" [stepNumber]="2" title="@defer — a Quick Look">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>Recognition-level only today — a short demo, not a deep dive:</p>

        <app-code-block lang="html" [code]="deferCode" />

        <p style="margin-top: 12px;">
          The code for <code>&lt;app-stats-panel&gt;</code> isn't even downloaded until it's needed —
          free performance, for free. You'll come back to <code>&#64;defer</code>'s other triggers later;
          for now just recognize the shape when you see it.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can recognize <code>&#64;defer</code>/<code>&#64;placeholder</code> syntax and explain in one sentence why it exists.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d4-act3-debug-it" [stepNumber]="3" title="Debug It">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>Three classic bugs. Read the actual compiler messages out loud to yourself — Angular's control-flow errors are good, and reading errors is the skill.</p>

        <app-code-block lang="html" [code]="debugCode" />

        <div class="think-about-it">
          <p class="tai-q">Each line above is broken in a different way. What's wrong with each one?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — three separate bugs">
          <p>
            <strong>Bug 1:</strong> <code>track show.id</code> works, but <code>shows</code> is missing its
            call parentheses — it should be <code>shows()</code>. Without them you're looping over the
            signal function itself, not the array inside it.
          </p>
          <p style="margin-top: 8px;">
            <strong>Bug 2:</strong> <code>&#64;if</code>'s condition needs parentheses around it, exactly
            like a JavaScript <code>if</code> statement: <code>&#64;if (shows().length === 0)</code>, not
            <code>&#64;if shows().length === 0</code>.
          </p>
          <p style="margin-top: 8px;">
            <strong>Bug 3:</strong> <code>[(ngModel)]</code> silently does nothing (or errors, depending on
            your setup) if <code>FormsModule</code> isn't in the component's <code>imports</code> array.
            Always check imports first when a binding compiles but doesn't behave.
          </p>
        </app-collapsible>

        <p>The fix — all three bugs corrected:</p>

        <app-code-block lang="html" [code]="fixedDebugCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name all three bugs without running the code, just from reading the snippet.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day4/act2" class="btn-secondary">← Act 2: Branching</a>
        <a routerLink="/day4/lab" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: '[(ngModel)]',
      plainEnglish: 'A combined property-and-event binding that keeps an input element and a signal in sync in both directions.',
      analogy: 'A "banana in a box" — the parentheses (banana) for the event are wrapped inside the brackets [box] for the property.'
    },
    {
      concept: 'FormsModule',
      plainEnglish: 'The import that makes ngModel available at all — without it in a component\'s imports, ngModel does nothing.',
      analogy: 'A power cable for an appliance — the appliance is designed correctly, but it does nothing until it\'s actually plugged in.'
    },
    {
      concept: '@defer',
      plainEnglish: 'Delays downloading and rendering a piece of UI until some condition is met, like scrolling it into view.',
      analogy: 'A restaurant that doesn\'t start cooking your dish until you actually order it, instead of pre-making every possible dish.'
    }
  ];

  filterStateCode = `import { FormsModule } from '@angular/forms';

searchTerm = signal('');

filteredShows = computed(() =>
  this.shows().filter(s =>
    s.name.toLowerCase().includes(this.searchTerm().toLowerCase())
  )
);`;

  filterTemplateCode = `<input placeholder="Filter shows…" [(ngModel)]="searchTerm" />`;

  deferCode = `@defer (on viewport) {
  <app-stats-panel />
} @placeholder {
  <p>Scroll down for your stats…</p>
}`;

  debugCode = `@for (show of shows; track show.id) {   <!-- bug 1 -->
  <p>{{ show.name }}</p>
}
@if shows().length === 0 {              <!-- bug 2 -->
  <p>Empty!</p>
}
<input [(ngModel)]="searchTerm" />       <!-- bug 3 -->`;

  fixedDebugCode = `// component imports: [FormsModule, ...]   <!-- fixes bug 3 -->

@for (show of shows(); track show.id) {   <!-- fixes bug 1: shows() -->
  <p>{{ show.name }}</p>
}
@if (shows().length === 0) {              <!-- fixes bug 2: parens around condition -->
  <p>Empty!</p>
}
<input [(ngModel)]="searchTerm" />`;
}
