import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day17-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 17 · Act 1 of 2</span>
        <h1>🎨 Pipes on Real Data</h1>
        <p class="subtitle">You've already used two pipes without being told what they were. Today the box opens, and you sweep every raw date and number in BingeBoard through one.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 16's BingeBoard is fully working — a race-proof, debounced typeahead on Browse, and the <code>/suggest</code> page rebuilding that same pattern. If that isn't running yet, visit the <a routerLink="/day17/start">Day 17 Starting Point</a> first — it gets you a working copy in minutes.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's docs on
        <a href="https://angular.dev/guide/templates/pipes" target="_blank" rel="noopener">pipes</a>,
        specifically the <a href="https://angular.dev/api/common/DatePipe" target="_blank" rel="noopener"><code>DatePipe</code></a>
        format-table — don't memorize it, just know where it lives.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Recognize pipes you've already used without knowing it, apply built-in pipes with arguments and chaining to real BingeBoard data, and understand why pure pipes are cheap.</li>
          <li><strong>Why It Matters:</strong> Formatting for display is universal — every app needs to turn <code>2026-07-09T18:23:11.000Z</code> into something a human reads comfortably. That formatting does not belong duplicated across every template that shows a date, and it does not belong cluttering up your components. A pipe is where it goes.</li>
          <li><strong>Build Steps:</strong> Spot the pipes already hiding in your own code → sweep built-in pipes onto real dates, numbers, and text → connect pipe purity to the immutability habit you already have.</li>
          <li><strong>Expected Outcome:</strong> You can apply <code>date</code>, <code>number</code>, and <code>titlecase</code> with arguments, chain two pipes together, and explain in one sentence why pure pipes are cheap.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Pipes on Real Data)</p>
        <p><strong>Next step:</strong> Act 2 (Writing Your Own Pipe)</p>
        <p><strong>Time:</strong> About 25 minutes. This act is intentionally brisk — the real depth of the day is in the lab.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d17-act1-pipes-you-already-used" [stepNumber]="1" title="Pattern-Spotting — You've Already Used Two Pipes">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Before any new syntax, go find something you already wrote. If you ever interpolated a value
          straight into a template to see what it actually contained while debugging — something like
          <code>{{ "{{ someObject | json }}" }}</code> — you used a pipe. And Day 15's
          <code>&#64;if (shows&#36; | async; as shows)</code> pattern used one too.
        </p>

        <p style="margin-top: 12px;">
          Open your own project and search for the pipe character (<code>|</code>) inside a template. If you
          find one, you've already been using this feature. If you don't find one, that's fine too — you're
          about to write several.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Based only on how you've seen <code>| json</code> and <code>| async</code> behave, guess: what does the <code>|</code> syntax actually mean to Angular's template compiler?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a pipeline, literally">
          <p><code>|</code> takes the expression on its left, hands it to a small transformation function named on its right, and renders whatever that function returns. <code>value | json</code> means "take <code>value</code>, run it through the thing named <code>json</code>, show the result" — exactly the same mental model as a Unix shell pipeline, which is exactly where the syntax and the name come from. Angular ships a set of common ones (<code>json</code>, <code>async</code>, <code>date</code>, <code>number</code>, <code>titlecase</code>, and others) and lets you write your own, which Act 2 does.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Find (or recall) at least one place you've already used a pipe, and state in your own words what the <code>|</code> syntax does to the value on its left.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d17-act1-builtin-sweep" [stepNumber]="2" title="The Problem, and Sweeping Built-Ins Onto Real Data">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          TVMaze hands you raw values that are correct but not display-ready: a rating like
          <code>8.2</code> that should show one consistent decimal, a genre string like
          <code>"science-fiction"</code> that should read as a proper title, a timestamp shaped like
          <code>2026-07-09T18:23:11.000Z</code> that no user wants to look at directly.
        </p>

        <p style="margin-top: 12px;">
          Reformatting each of these by hand inside a component — string concatenation, manual
          <code>Intl</code> calls, ad hoc helper methods — works once. It clutters the component, and the
          moment a second template needs the same formatting, you either duplicate the logic or extract a
          helper that isn't reusable across components the way a pipe is built to be.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> sweep these built-in pipes onto real BingeBoard data:</p>

        <app-code-block lang="html" [code]="builtinSweepCode" />

        <p style="margin-top: 12px;">
          Pipes can also take arguments after a colon — <code>date: 'MMM d, y · h:mm a'</code> passes a
          format string to <code>DatePipe</code>; <code>number: '1.1-1'</code> tells <code>NumberPipe</code>
          "at least 1 digit before the decimal, exactly 1 digit after." And pipes chain left to right —
          <code>| titlecase | slice:0:20</code> title-cases a string and then truncates the result, each
          pipe working on whatever the previous one produced.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Try it yourself: what does the DatePipe format table in the Angular docs list, and why would memorizing it be the wrong instinct?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — know the table exists, don't memorize it">
          <p>The table lists format codes like <code>short</code>, <code>medium</code>, <code>long</code>, <code>full</code>, and the custom-pattern letters (<code>y</code> for year, <code>M</code> for month, <code>d</code> for day, <code>h</code>/<code>m</code>/<code>s</code> for time) you can combine into your own pattern string. Memorizing it is the wrong instinct because you'll use it rarely enough to forget the exact letters between uses, and the table is one click away every time you actually need it — the valuable skill is knowing DatePipe supports custom patterns and where to look, not recall.</p>
        </app-collapsible>

        <div class="warning-box">
          <strong>Timezone question parking lot:</strong> if you find yourself deep in a timezone rabbit
          hole, stop. The rule that covers almost every case: store timestamps in UTC, display them in the
          user's local time (which <code>DatePipe</code> does automatically unless you pass a
          <code>timezone</code> argument). Anything more specific is a real but rare need — park it and move on.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Every rating, genre, and timestamp you can find in your own BingeBoard renders through a built-in pipe instead of a raw value. You can pass an argument to a pipe and chain two pipes together.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d17-act1-purity" [stepNumber]="3" title="Purity — Why Pipes Are Cheap, and the Habit That Makes It True">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Pipes are <strong>pure</strong> by default: Angular only re-runs a pipe's <code>transform()</code>
          method when the input value's reference changes, not on every change-detection cycle. That's
          exactly why pipes are cheap to sprinkle everywhere — a template with a dozen pipes isn't
          recomputing a dozen formatted strings on every tick, only on the ticks where something actually
          changed.
        </p>

        <p style="margin-top: 12px;">
          There's a real corollary worth sitting with: a pure pipe will not notice you mutating an array in
          place. If a component did <code>this.shows().push(newShow)</code>, the array reference never
          changes, so a pure pipe watching that array would never re-run — the new show would silently fail
          to appear formatted correctly, or fail to appear at all, depending on the pipe.
        </p>

        <div class="info-box">
          <strong>The habit already pays off:</strong> this course has used <code>update(list =&gt; [...list, x])</code>-style immutable updates since Day 9 and Day 13's <code>ShowsService</code> and <code>Browse</code> — never a raw in-place mutation. Every array and object you've built in signals already produces a fresh reference on every change. Pure pipes "just work" here for exactly the same reason change detection and <code>computed()</code> already worked reliably — you built the habit before you had a name for why it mattered.
        </div>

        <div class="think-about-it">
          <p class="tai-q">If pure pipes are the default and the cheap option, why would impure pipes exist at all?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — for the rare case where the output depends on more than the input">
          <p>An impure pipe (<code>&#64;Pipe(&#123; name: 'x', pure: false &#125;)</code>) re-runs on every change-detection cycle regardless of whether its input reference changed — useful only when the pipe's output genuinely depends on something outside its declared input, like the current wall-clock time, or a mutable data structure you don't control and can't make immutable. That's rare, and it's expensive: an impure pipe runs constantly. This course doesn't build one — knowing they exist, and knowing to reach for a pure pipe by default, is the correct depth for today.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in one sentence, why a pure pipe is cheap, and why this course's immutable-update habit is exactly what makes pure pipes reliable here.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day17/start" class="btn-secondary">← Day 17 Starting Point</a>
        <a routerLink="/day17/act2" class="btn-primary">Act 2: Writing Your Own Pipe →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'pipe',
      plainEnglish: 'A small, reusable formatting function you apply in a template with |.',
      analogy: '🚰 A filter screwed onto a faucet — the water going in is the same, what comes out is cleaned up.'
    },
    {
      concept: 'pipe argument',
      plainEnglish: 'Text after a colon that configures how a pipe formats its input.',
      analogy: '🎛️ A dial on that same filter, letting you choose coarse or fine filtering.'
    },
    {
      concept: 'chaining',
      plainEnglish: 'Piping the output of one pipe straight into the next, left to right.',
      analogy: '🏭 An assembly line where each station hands its finished piece to the next.'
    },
    {
      concept: 'pure pipe',
      plainEnglish: 'Re-runs only when the input\'s reference actually changes — cheap by default.',
      analogy: '🔔 A doorbell that only rings when someone new arrives, not every time someone in the house moves.'
    }
  ];

  builtinSweepCode = `<p>{{ review.createdAt | date: 'MMM d, y · h:mm a' }}</p>
<p>⭐ {{ show().rating | number: '1.1-1' }}</p>
<p>{{ show().genre | titlecase }}</p>

<!-- Chaining — title-case, then truncate to 20 characters: -->
<p>{{ show().genre | titlecase | slice:0:20 }}</p>`;
}
