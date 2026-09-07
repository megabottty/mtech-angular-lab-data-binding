import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day11-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 11 · Act 1 of 3</span>
        <h1>✅ Validators &amp; Control State</h1>
        <p class="subtitle">Attach built-in Validators to the Day 10 review form, then read a control's valid/errors/touched/dirty state to show errors at the right moment — not too early, not too late.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> get the end-of-Day-10 BingeBoard running — <a routerLink="/day11/start">Day 11 · Starting Point</a>. You need a working <code>ReviewForm</code> with no validation attached yet.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms/reactive-forms#validating-form-input" target="_blank" rel="noopener">Validating form input</a> and
        <a href="https://angular.dev/api/forms/Validators" target="_blank" rel="noopener">the Validators API reference</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Attach built-in validators to every field on the review form, and learn to read a control's four state flags — <code>valid</code>, <code>errors</code>, <code>touched</code>, <code>dirty</code> — instead of guessing at what a form is doing.</li>
          <li><strong>Why It Matters:</strong> A form with no validation lets a reviewer submit total nonsense. A form that yells "required!" the instant the page loads, before anyone's typed a single character, is arguably worse — it trains people to ignore your errors. Both problems have the same fix: know exactly which state flag to check, and when.</li>
          <li><strong>Build Steps:</strong> Attach <code>Validators.required</code>/<code>min</code>/<code>max</code>/<code>maxLength</code>/<code>minLength</code> to rating, headline, and body → read <code>control.valid</code>, <code>control.errors</code>, <code>control.touched</code>, <code>control.dirty</code> in the console → decide which combination of state flags makes an error message "timely."</li>
          <li><strong>Expected Outcome:</strong> You can name what each of the four control-state flags actually tracks, and explain why an error message needs more than just "invalid" to be worth showing.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Validators &amp; Control State)</p>
        <p><strong>Next step:</strong> Act 2 (Custom Validators &amp; FormArray)</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <app-lesson-step stepId="d11-act1-builtin-validators" [stepNumber]="1" title="Attaching Built-In Validators">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Every <code>FormBuilder</code> control can take a second array element: one validator function, or an array of them. The review form needs five rules total: <code>rating</code> required and between 0 and 10, <code>headline</code> required and no longer than 80 characters, <code>body</code> required and at least 20 characters long.</p>
        <app-code-block lang="typescript" [code]="validatorsCode" />
        <app-collapsible icon="💡" label="Hint — the array-literal form is [initialValue, validators]">
          <p>When a control needs validators, its shorthand changes from a bare value (<code>rating: 8</code>) to a two-element array: <code>rating: [8, [Validators.min(0), Validators.max(10)]]</code>. A single validator doesn't need to be wrapped in its own array — <code>headline: ['', Validators.required]</code> is valid too — but once a control needs more than one, wrap them together in one array.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Why does <code>rating</code> need both <code>Validators.min(0)</code> and <code>Validators.max(10)</code>, instead of one combined "range" validator?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — Angular ships focused, composable validators">
          <p>Angular's built-in validators are deliberately small and single-purpose — <code>min</code> checks one boundary, <code>max</code> checks the other, and you compose them by passing both in the array. This mirrors how the rest of Angular works: small, composable pieces rather than one validator per possible combination. If you ever need a genuinely combined rule (like "at least one of these two fields must be set"), that's a <em>custom</em> validator, which Act 2 covers.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> All three fields have their validators attached, and typing an out-of-range rating or leaving headline/body empty makes <code>reviewForm.invalid</code> become <code>true</code> — verify it directly in the console or a temporary <code>{{ "{{ reviewForm.valid }}" }}</code> binding.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d11-act1-control-state" [stepNumber]="2" title="The Four Control-State Flags">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Every <code>FormControl</code>, every <code>FormGroup</code>, and every <code>FormArray</code> carries the same four state flags — reading them is how you know what a form is actually doing, without printing the whole value to the console every time.</p>
        <app-code-block lang="typescript" [code]="controlStateCode" />
        <app-collapsible icon="🧩" label="Deep Dive — touched/dirty are about user interaction, valid/errors are about the value">
          <p><code>valid</code> and <code>errors</code> describe the current <em>value</em> — did it pass every attached validator, and if not, exactly which ones failed. <code>touched</code> and <code>dirty</code> describe <em>what the user did</em>, independent of whether the value is valid: <code>touched</code> flips to <code>true</code> the first time a control loses focus (a blur event), and <code>dirty</code> flips to <code>true</code> the first time its value changes at all. A brand-new empty required field is <code>invalid</code> from the instant it's created — but it's also <code>untouched</code> and <code>pristine</code>, which is exactly the signal you need to avoid showing an error before anyone's had a chance to type anything.</p>
        </app-collapsible>
        <p style="margin-top: 12px;"><code>errors</code> itself is an object keyed by validator name, or <code>null</code> when there are no failures — so <code>control.hasError('required')</code> is usually cleaner to read than digging into <code>control.errors?.['required']</code> directly.</p>
        <app-code-block lang="typescript" [code]="hasErrorCode" />
        <div class="think-about-it">
          <p class="tai-q">A control that's never been touched but has an invalid empty value — is <code>dirty</code> true or false?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — false, because dirty tracks a value change, not validity">
          <p>False. <code>dirty</code> only flips once the control's value has actually changed from its initial value — an empty required field that's never been typed into is still <code>pristine</code> (the opposite of <code>dirty</code>), even though it's already <code>invalid</code>. This is exactly why <code>invalid</code> alone is never enough to decide whether to show an error message.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state, from memory, what each of <code>valid</code>, <code>errors</code>, <code>touched</code>, and <code>dirty</code> tracks — and that two of them describe the value while the other two describe user interaction.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d11-act1-timely-errors" [stepNumber]="3" title="What Makes an Error Message Timely">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>A "timely" error is one that shows up right when it's actionable — after a reviewer has had a real chance to fix it, not before. The standard rule combining the flags from Step 2: show an error only when a control is both <code>invalid</code> <em>and</em> either <code>touched</code> or <code>dirty</code>.</p>
        <app-code-block lang="typescript" [code]="timelyRuleCode" />
        <div class="info-box">
          <strong>Why <code>touched || dirty</code>, not just <code>touched</code>?</strong> <code>touched</code> alone misses a reviewer who types into a field and submits without ever leaving it (for example, pressing a submit button directly from that field). <code>dirty</code> catches that case, since typing itself sets it — checking either one covers both "left the field" and "changed the field" as valid signals that the reviewer has actually interacted with it.
        </div>
        <app-collapsible icon="💡" label="Hint — the lab turns this rule into real template markup">
          <p>This step is deliberately concept-only — you're building the mental model here. The lab's first task wires this exact <code>invalid &amp;&amp; (touched || dirty)</code> check into real <code>&#64;if</code> blocks in the review form's template.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">On first load, a brand-new headline field is empty and required — so it's invalid. Should its error message show immediately?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — no, because it's untouched and pristine">
          <p>No. A brand-new, never-touched, never-typed-into field is invalid but not yet "wrong" in any actionable sense — the reviewer hasn't done anything yet. Showing "Headline is required" the instant the page renders, before anyone has done anything, is the single most common reactive-forms UX mistake — it makes every form look broken on page load.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in one sentence, why <code>invalid</code> alone is the wrong condition for showing an error message.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day11/start" class="btn-secondary">← Starting Point</a>
        <a routerLink="/day11/act2" class="btn-primary">Act 2: Custom Validators &amp; FormArray →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'Validators',
      plainEnglish: 'Built-in rule functions attached to a control at build time.',
      analogy: '🚧 Guardrails on a form field — required, min, max, length limits.'
    },
    {
      concept: 'control.errors',
      plainEnglish: 'An object naming exactly which validators are currently failing, or null.',
      analogy: '📋 A rejection slip listing every reason a value failed inspection.'
    },
    {
      concept: 'touched vs. dirty',
      plainEnglish: 'touched means the field lost focus once; dirty means its value changed once.',
      analogy: '👋 touched is "you visited this room"; dirty is "you moved something in it."'
    },
    {
      concept: 'Timely error',
      plainEnglish: 'invalid AND (touched OR dirty) — shown only after real interaction.',
      analogy: '🚦 A warning light that only turns on after you\'ve had a turn to react.'
    }
  ];

  validatorsCode = `import { Validators } from '@angular/forms';

reviewForm = this.fb.nonNullable.group({
  rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
  headline: ['', [Validators.required, Validators.maxLength(80)]],
  body: ['', [Validators.required, Validators.minLength(20)]],
  spoilers: false
});`;

  controlStateCode = `const headline = this.reviewForm.controls.headline;

headline.valid;    // boolean — passes every attached validator?
headline.errors;   // object of failing validator names, or null
headline.touched;  // boolean — has this control ever lost focus?
headline.dirty;    // boolean — has this control's value ever changed?`;

  hasErrorCode = `headline.errors;               // { required: true } — awkward to read directly
headline.hasError('required'); // true — reads the same information cleanly`;

  timelyRuleCode = `const headline = this.reviewForm.controls.headline;
const showError = headline.invalid && (headline.touched || headline.dirty);`;
}
