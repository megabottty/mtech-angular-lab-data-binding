import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day3-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 3 · Act 2 of 3</span>
        <h1>🔒 Reading Signals, and computed's Guarantees</h1>
        <p class="subtitle">Parentheses in the template, read-only formulas, and reaching outside Angular.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/signals" target="_blank" rel="noopener">Signals guide</a> — the <code>computed</code> and <code>effect</code> sections map onto Steps 2 and 3.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Read signals correctly in templates, understand why computed is read-only, and know what effect is actually for.</li>
          <li><strong>Why It Matters:</strong> Forgetting parentheses is the single most common signals mistake — and misusing effect to update state is the most common signals antipattern in the wild.</li>
          <li><strong>Build Steps:</strong> Read signals in the template with <code>()</code> → try (and fail) to <code>.set()</code> a computed → add an effect for logging.</li>
          <li><strong>Expected Outcome:</strong> You can read a signal correctly every time, and explain why a computed can't be written to directly.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Reading Signals, and computed's Guarantees)</p>
        <p><strong>Next step:</strong> Act 3 (linkedSignal, and Debug It)</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d3-act2-template-parens" [stepNumber]="1" title="Template Reads Signals with Parentheses">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> render the new signal-backed state in <code>show-card.html</code>:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="templateReadsCode" />

        <div class="warning-box">
          <strong>See the failure first:</strong> delete the parentheses from <code>episodesWatched</code> in
          the template — <code>{{ "{{ episodesWatched }}" }}</code> — and watch the page print something like
          <code>function episodesWatched() &#123; ... &#125;</code> or <code>[object Object]</code> instead of a
          number. That's the #1 beginner signals error: forgetting <code>()</code> when reading. Add it back
          and confirm the number returns.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> The card shows real episode counts and hours, and you can recognize the "forgot the parentheses" error on sight.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d3-act2-computed-readonly" [stepNumber]="2" title="computed Is Read-Only and Always Fresh">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p><strong>Try this live:</strong> attempt to write directly to a computed:</p>

        <app-code-block lang="typescript" [code]="computedSetAttemptCode" />

        <p style="margin-top: 12px;">
          That's a compiler error — <code>computed</code> values don't have <code>.set()</code> or
          <code>.update()</code> at all. That's the point: derived state can't be corrupted by an accidental
          direct write. Instead, click "+1 episode" and watch <code>minutesWatched</code> and
          <code>hours</code> update automatically, with zero extra code.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why does it make sense that a computed has no .set() method at all, instead of Angular just throwing a runtime error if you try?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — impossible beats forbidden">
          <p>
            If <code>.set()</code> existed but just threw at runtime, you could still write buggy code that
            compiles fine and only breaks when it runs. Removing the method entirely means the mistake is
            caught by the compiler, before the code ever ships — the same reason a spreadsheet formula cell
            simply has no "type over this" mode.
          </p>
        </app-collapsible>

        <div class="warning-box">
          <strong>The mirror-image mistake:</strong> the rule above is about writing <em>to</em> a computed.
          The other half of the rule is that you must never write to a signal <em>from inside</em> a
          computed's body — no <code>.set()</code>, no <code>.update()</code>, no side effects of any kind.
          Computeds must be pure: given the same inputs, they return the same value and change nothing else.
          A computed that quietly updates other state is unpredictable, because Angular decides when (and
          whether) to recalculate it. If you need something to happen when a value changes, that's an
          <code>effect</code> — which is Step 3.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've seen the compiler reject a direct write to a computed, and confirmed clicking "+1 episode" updates both derived values with no manual sync code.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d3-act2-effect" [stepNumber]="3" title="effect — Reaching Outside Angular">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> add an effect to the card's constructor:</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="effectCode" />

        <p style="margin-top: 12px;">
          Click "+1 episode" a few times and watch the console log a new line every time. An effect reruns
          automatically whenever any signal it reads changes — same subscription mechanism as
          <code>computed</code>, but instead of producing a value, it runs side effects.
        </p>

        <div class="warning-box">
          <strong>Rule of thumb:</strong> effects are for talking to the world <em>outside</em> your app —
          logging, <code>localStorage</code>, analytics, chart libraries. If you're using an effect to update
          another signal, you almost always wanted <code>computed</code> instead. This exact misuse is the
          most common signals antipattern in the wild.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> The console logs a new line every time <code>episodesWatched</code> changes, and you can name one outside-the-app example where you'd reach for effect.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day3/act1" class="btn-secondary">← Act 1: The Problem, and Converting to Signals</a>
        <a routerLink="/day3/act3" class="btn-primary">Act 3: linkedSignal, and Debug It →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'Reading a signal is a function call',
      plainEnglish: 'Every signal read, in the class or the template, needs parentheses — it\'s a function call, not a plain property.',
      analogy: 'Pulling the mail out of the mail slot, instead of just staring at the closed slot and assuming what\'s inside.'
    },
    {
      concept: 'computed has no .set()',
      plainEnglish: 'A computed value can only ever be read — you cannot assign to it directly, on purpose.',
      analogy: 'A speedometer needle — you can look at it, but there\'s no dial to spin it yourself; it only reflects the engine.'
    },
    {
      concept: 'effect() for outside-Angular work',
      plainEnglish: 'A block of code that reruns automatically whenever the signals it reads change, meant for side effects like logging or storage.',
      analogy: 'A security camera that automatically records footage whenever motion is detected, rather than something that changes the room itself.'
    },
    {
      concept: 'effect updating a signal is a smell',
      plainEnglish: 'If an effect exists only to set another signal\'s value, that relationship should almost always be a computed instead.',
      analogy: 'Hiring someone to manually copy a formula\'s result into another cell every time it changes, instead of just writing the formula there directly.'
    }
  ];

  templateReadsCode = `<p>Episodes: {{ episodesWatched() }} · {{ hours() }} hrs</p>
<button (click)="watchEpisode()">+1 episode</button>
<article class="card" [class.watched]="watched()">`;

  computedSetAttemptCode = `this.minutesWatched.set(999);   // ❌ Property 'set' does not exist on type...`;

  effectCode = `import { Component, signal, computed, effect } from '@angular/core';
// ...

constructor() {
  effect(() => {
    console.log(\`\${this.title}: \${this.episodesWatched()} episodes\`);
  });
}`;
}
