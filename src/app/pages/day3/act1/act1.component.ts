import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day3-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 3 · Act 1 of 3</span>
        <h1>📶 Signals — The Problem, and Converting Over</h1>
        <p class="subtitle">A box around a value that tells Angular exactly what changed.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 2's BingeBoard is working — a
        <code>ShowCard</code> component with plain properties (<code>title</code>, <code>imageUrl</code>,
        <code>rating</code>, <code>watched</code>, <code>hype</code>) and working <code>[src]</code>,
        <code>(click)</code>, and <code>[class.x]</code> bindings. Run <code>ng serve</code> now and confirm
        your card still renders and toggles. Everything below builds on top of that code. Don't have that
        state handy? <a routerLink="/day3/start">Grab the Day 3 starting point</a> first.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Understand why Angular wants state wrapped in <code>signal()</code>, and convert <code>ShowCard</code>'s plain properties over.</li>
          <li><strong>Why It Matters:</strong> Plain properties can't tell Angular what changed, and they can't express derived values safely — signals fix both.</li>
          <li><strong>Build Steps:</strong> Warm up with a plain property → see the drift problem → convert watched state to signals and computeds.</li>
          <li><strong>Expected Outcome:</strong> Your card's watched/episode state lives in signals, with a computed formula deriving minutes and hours.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (The Problem, and Converting to Signals)</p>
        <p><strong>Next step:</strong> Act 2 (Reading Signals, and computed's Guarantees)</p>
        <p><strong>Time:</strong> About 35 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d3-act1-warmup" [stepNumber]="1" title="Warm-Up — A Plain Property">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Add a plain property <code>bingeMinutes = 0</code> to a component, plus a button that adds 45.
          Render it.
        </p>

        <app-code-block lang="typescript" [code]="warmupCode" />

        <p style="margin-top: 12px;">
          This works fine — good. Hold that thought. Today you'll learn why Angular wants you to do this
          differently, and what it buys you.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking the button increases the rendered minutes by 45 every time, using nothing but a plain class property.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d3-act1-problem" [stepNumber]="2" title="The Problem — Angular Can't See Inside a Plain Property">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Yesterday, clicking a button re-rendered the page and it updated. Here's the dirty secret: with
          plain properties, Angular doesn't know <em>what</em> changed — it has to go check everything, on
          every event. Fine for a tiny app, but wasteful. It also can't express one crucial idea: values that
          are calculated <em>from</em> other values.
        </p>

        <p style="margin-top: 12px;">
          Think about BingeBoard: total minutes watched is derived from the list of watched shows. Store both
          separately, and they will drift apart the moment someone forgets to update one. Bugs live in that
          drift.
        </p>

        <p style="margin-top: 12px;">
          A <strong>signal</strong> is a box around a value. Reading it (<code>count()</code>) tells Angular
          "this place depends on that box." Writing it (<code>count.set(5)</code>) tells Angular "this box
          changed — update exactly the places that depend on it." And <code>computed()</code> builds formulas
          on top of boxes that recalculate automatically. This is the model the whole modern framework is
          built on — forms, HTTP, everything from here uses it.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Picture a spreadsheet: cells hold values, and a formula cell (like a SUM) recalculates itself. Which Angular concept from today maps to which spreadsheet concept?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — cells and formulas">
          <p>
            A signal is a plain cell — you type a value directly into it. A <code>computed</code> is a
            formula cell — you never manually retype the SUM cell; it recalculates itself whenever any cell
            it references changes. You never "sync" a formula cell by hand, and you should never hand-sync a
            <code>computed</code> either.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in your own words, why storing "total minutes" separately from "watched episodes" is a bug waiting to happen.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d3-act1-convert-signals" [stepNumber]="3" title="Convert the Card to Signals">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> rewrite <code>show-card.ts</code> so watched state lives in signals, with a computed formula deriving minutes and hours:</p>

        <app-code-block lang="typescript" [code]="convertedCardCode" />

        <p style="margin-top: 12px;">Three verbs, worth writing down:</p>
        <ul>
          <li><strong>read:</strong> <code>episodesWatched()</code> — it's a function call, parentheses required</li>
          <li><strong>replace:</strong> <code>count.set(0)</code></li>
          <li><strong>transform:</strong> <code>count.update(n => n + 1)</code></li>
        </ul>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>ShowCard</code> has <code>watched</code> and <code>episodesWatched</code> as signals, plus <code>minutesWatched</code> and <code>hours</code> as computeds derived from them.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day2/lab" class="btn-secondary">← Day 2 Lab</a>
        <a routerLink="/day3/act2" class="btn-primary">Act 2: Reading Signals →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'signal()',
      plainEnglish: 'A box around a value that tells Angular exactly when it changes, so only the right parts of the page re-render.',
      analogy: 'A labeled mail slot — drop in a new letter, and only the people subscribed to that slot get notified.'
    },
    {
      concept: 'computed()',
      plainEnglish: 'A read-only formula built from other signals, which recalculates itself automatically whenever they change.',
      analogy: 'A spreadsheet\'s SUM cell — you never retype it, it just stays correct.'
    },
    {
      concept: 'Store the minimum, derive the rest',
      plainEnglish: 'Keep only the raw facts in signals, and calculate everything else with computed instead of storing it separately.',
      analogy: 'Keeping only your birthdate on file, and calculating your age whenever it\'s needed, instead of writing your age down and forgetting to update it every year.'
    },
    {
      concept: 'Read/replace/transform',
      plainEnglish: 'The three things you ever do to a signal: call it to read, .set() to replace, .update() to transform based on the old value.',
      analogy: 'Checking a thermostat\'s display, setting it to an exact number, or nudging it up two degrees from wherever it currently sits.'
    }
  ];

  warmupCode = `export class Stats {
  bingeMinutes = 0;

  addSession() {
    this.bingeMinutes += 45;
  }
}`;

  convertedCardCode = `import { Component, signal, computed } from '@angular/core';

export class ShowCard {
  title = 'Severance';           // fine as plain — it never changes (yet)
  rating = 8.7;
  episodeMinutes = 50;

  watched = signal(false);
  episodesWatched = signal(0);

  minutesWatched = computed(() => this.episodesWatched() * this.episodeMinutes);
  hours = computed(() => (this.minutesWatched() / 60).toFixed(1));

  watchEpisode() {
    this.episodesWatched.update(n => n + 1);
  }
  toggleWatched() {
    this.watched.update(w => !w);
  }
}`;
}
