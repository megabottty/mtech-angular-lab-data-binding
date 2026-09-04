import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day3-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 3 · Act 3 of 3</span>
        <h1>🔄 linkedSignal, and Debug It</h1>
        <p class="subtitle">State that resets itself when its source changes — and two bugs to catch.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/signals/linked-signal" target="_blank" rel="noopener">linkedSignal</a> — skim only — recognition is enough at this stage.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Recognize when state needs to be writable but also reset automatically, and use <code>linkedSignal()</code> for it.</li>
          <li><strong>Why It Matters:</strong> Some state doesn't fit cleanly into "always derived" (computed) or "never resets" (signal) — linkedSignal is the third shape.</li>
          <li><strong>Build Steps:</strong> Build a resettable "next episode" counter → read two broken signal snippets → identify each bug.</li>
          <li><strong>Expected Outcome:</strong> You can explain what makes linkedSignal different from both signal and computed, and can spot the two most common signals bugs on sight.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (linkedSignal, and Debug It)</p>
        <p><strong>Next step:</strong> Student Lab</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d3-act3-linked-signal" [stepNumber]="1" title="linkedSignal — Resettable State">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Scenario: the card has a "next episode to watch" number the user can bump manually, but when they
          switch seasons, it should reset to 1.
        </p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="linkedSignalCode" />

        <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="linkedSignalTemplateCode" />

        <p style="margin-top: 12px;">
          Skip, skip, skip → E4. Click "next season" → it snaps back to E1. Writable like a signal, resets
          like a computed. Don't over-drill this one — recognition is enough at this stage.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why wouldn't a plain computed work here? After all, it also "depends on" season.</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — computed can't remember manual changes">
          <p>
            A <code>computed</code> is entirely determined by its formula — it has no memory of anything you
            did to it before. <code>nextEpisode</code> needs to remember "the user clicked skip three times"
            <em>until</em> the season changes, at which point it forgets and resets. That combination —
            writable, but reset by an external trigger — is exactly what <code>linkedSignal</code> is for.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking "skip" advances the episode number, and clicking "next season" resets it back to 1 every time.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d3-act3-debug-it" [stepNumber]="2" title="Debug It — Two Signals Bugs">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>Read this class and template, and predict what's wrong before opening the answer.</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="buggyClassCode" />

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="before" [code]="buggyTemplateCode" />

        <div class="think-about-it">
          <p class="tai-q">There's a bug inside the method, and a separate bug in the template. What's wrong in each?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a missing () and a second source of truth">
          <p>
            <strong>Bug 1:</strong> <code>this.episodes</code> without <code>()</code> refers to the signal
            object itself, not the number inside it — multiplying it by <code>50</code> doesn't do what you'd
            expect. But there's a deeper bug underneath: <code>minutes</code> shouldn't be a second signal at
            all. It's entirely derived from <code>episodes</code>, so it should be a <code>computed</code>:
            <code>minutes = computed(() =&gt; this.episodes() * 50)</code>. Once it's a computed, there's no
            <code>.set()</code> call left to get wrong.
          </p>
          <p style="margin-top: 8px;">
            <strong>Bug 2:</strong> the template reads <code>{{ "{{ episodes }}" }}</code> without
            parentheses — the same missing-<code>()</code> mistake from Act 2, just in a new spot.
          </p>
        </app-collapsible>

        <p>The fix — both bugs corrected:</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="fixedClassCode" />

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="after" [code]="fixedTemplateCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state the rule "store the minimum, derive the rest" and point to exactly where this snippet violated it.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day3/act2" class="btn-secondary">← Act 2: Reading Signals, and computed's Guarantees</a>
        <a routerLink="/day3/lab" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'linkedSignal()',
      plainEnglish: 'A signal you can write to directly, that also automatically resets to a computed default whenever some other signal changes.',
      analogy: 'A hotel room\'s thermostat — guests can adjust it during their stay, but it resets to the default setting the moment a new guest checks in.'
    },
    {
      concept: 'Three shapes of state',
      plainEnglish: 'signal (freely writable), computed (never writable, fully derived), linkedSignal (writable, but resets on a trigger).',
      analogy: 'A whiteboard you write on freely, a digital clock display you can never touch, and a scoreboard you can adjust by hand but that resets to zero at the start of every game.'
    },
    {
      concept: 'A second source of truth is a bug magnet',
      plainEnglish: 'Storing a value that could instead be calculated from an existing signal creates two places that can silently disagree.',
      analogy: 'Writing the same total on two different receipts by hand — sooner or later, someone forgets to update one and they stop matching.'
    },
    {
      concept: 'The missing-parentheses bug is universal',
      plainEnglish: 'Forgetting () when reading a signal breaks the same way whether it happens in a template, a method, or a computed.',
      analogy: 'Forgetting to open an envelope — no matter where it happens, you get the envelope itself, not the letter inside.'
    }
  ];

  linkedSignalCode = `import { Component, signal, computed, linkedSignal } from '@angular/core';
// ...

season = signal(1);
nextEpisode = linkedSignal(() => {
  this.season();   // depends on season…
  return 1;        // …resets to 1 whenever season changes
});`;

  linkedSignalTemplateCode = `<p>S{{ season() }} · next up: E{{ nextEpisode() }}</p>
<button (click)="nextEpisode.update(e => e + 1)">skip</button>
<button (click)="season.update(s => s + 1)">next season →</button>`;

  buggyClassCode = `episodes = signal(0);
minutes = signal(0);

watchEpisode() {
  this.episodes.update(n => n + 1);
  this.minutes.set(this.episodes * 50);   // bug 1
}`;

  buggyTemplateCode = `<p>{{ episodes }} eps, {{ minutes() }} min</p>  <!-- bug 2 -->`;

  fixedClassCode = `episodes = signal(0);
minutes = computed(() => this.episodes() * 50);

watchEpisode() {
  this.episodes.update(n => n + 1);
}`;

  fixedTemplateCode = `<p>{{ episodes() }} eps, {{ minutes() }} min</p>`;
}
