import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day11-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 11 · Act 3 of 3</span>
        <h1>🛡️ Cross-Field Rules &amp; Accessible Errors</h1>
        <p class="subtitle">Validate rules that belong to more than one control, cap the tags list, and give every failed submit attempt a useful, keyboard- and screen-reader-friendly summary.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms/reactive-forms#creating-dynamic-forms" target="_blank" rel="noopener">Dynamic forms</a> and
        <a href="https://angular.dev/guide/forms/reactive-forms#displaying-a-form-status" target="_blank" rel="noopener">displaying form status</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Attach validators to the level of the form that owns the rule, then make the result understandable to every reviewer, including someone using a keyboard or screen reader.</li>
          <li><strong>Why It Matters:</strong> A spoilers rule needs both the checkbox and the body. A tags cap belongs to the list, not one input. Accessibility attributes and a summary connect those rules to a clear next action instead of leaving a reviewer guessing.</li>
          <li><strong>Build Steps:</strong> write a group-level spoilers validator → add max-five and duplicate checks to the tags <code>FormArray</code> → mark controls touched after a submit attempt → connect labels, descriptions, invalid state, focus, and an <code>aria-live</code> summary.</li>
          <li><strong>Expected Outcome:</strong> You can place a validator at the correct level and build an invalid-form experience that explains what needs fixing without relying on color alone.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Cross-Field Rules &amp; Accessible Errors)</p>
        <p><strong>Next step:</strong> Student Lab</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <app-lesson-step stepId="d11-act3-cross-field-spoiler" [stepNumber]="1" title="Cross-Field Validation — Spoilers Need Detail">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>A review marked <em>Contains spoilers</em> needs at least 50 characters in its body. This rule belongs to the whole <code>FormGroup</code> because it reads two sibling values together.</p>
        <app-code-block lang="typescript" [code]="spoilerValidatorCode" />
        <app-code-block lang="typescript" [code]="attachGroupValidatorCode" />
        <p style="margin-top: 12px;">Read the error from the group, not from <code>body</code>. The group owns the rule, so the form-level message can sit beside the checkbox and body fields without pretending either single control caused it alone.</p>
        <app-collapsible icon="💡" label="Hint — a group validator receives the whole FormGroup">
          <p>Use <code>group.get('spoilers')?.value</code> and <code>group.get('body')?.value</code> inside the validator. Return <code>null</code> when the rule passes, or an object such as <code>{{ "{ spoilersNeedDetail: true }" }}</code> when it fails.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Why would attaching this rule directly to <code>body</code> make the validator design misleading?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — body alone cannot know whether spoilers is checked">
          <p>A body control can validate its own length, but it does not own the meaning of the spoilers checkbox. Putting the rule on the group makes the dependency visible in the code and lets Angular re-run it whenever either sibling changes.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Check <code>spoilers</code> with a short body and observe a group-level error; add enough body text or uncheck spoilers and watch it clear. You can choose the validator level that matches the data it needs.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d11-act3-max-tags" [stepNumber]="2" title="FormArray Rules — Max Five, No Duplicates">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>The tags array is a control too, so it can have its own validator. Keep the UX friendly by disabling <code>Add tag</code> at five, while keeping the array-level rule as the actual source of truth.</p>
        <app-code-block lang="typescript" [code]="tagsValidatorCode" />
        <app-code-block lang="typescript" [code]="tagControlCode" />
        <p style="margin-top: 12px;">Attach the validator when you create the array, and show the duplicate or max-count message near the list. Each tag control can still own its own <code>minLength</code> and <code>maxLength</code> errors.</p>
        <app-collapsible icon="🧩" label="Deep Dive — why disable Add tag and keep a validator?">
          <p>The disabled button is a helpful affordance, while the validator protects the form if a tag is added by another code path. This is the same two-layer pattern as a disabled submit button plus a guarded <code>submit()</code>.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Should <code>Funny</code> and <code>funny</code> count as two distinct tags?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — no, compare normalized values">
          <p>They describe the same tag to a reviewer, so normalize with <code>trim().toLowerCase()</code> before comparing. Keeping the original casing for display is fine; only the duplicate check needs normalized values.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Add five tags, verify the sixth add action is unavailable, then type a case-variant duplicate and see the array-level error. You can combine item-level and list-level rules without confusing their ownership.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d11-act3-error-summary-accessibility" [stepNumber]="3" title="Error Summary &amp; Accessibility">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>On a failed submit attempt, mark everything touched and show one summary near the top of the form. Give each input a real label, a stable error id, and <code>aria-invalid</code>/<code>aria-describedby</code> bindings so the same feedback works visually, by keyboard, and with assistive technology.</p>
        <app-code-block lang="typescript" [code]="submitSummaryCode" />
        <app-code-block lang="html" [code]="accessibleFieldCode" />
        <app-collapsible icon="💡" label="Hint — the summary should announce itself, not just change color">
          <p>Use <code>role="alert"</code> or <code>aria-live="polite"</code> on the summary, and make each summary item a link to the matching control with <code>href="#headline"</code> or a button that calls <code>focus()</code>. A visible border can reinforce the message, but it cannot be the only signal.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Why is <code>aria-describedby</code> more useful than putting the error text in a visually separate box with no connection to the input?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — it gives the input an explicit description">
          <p>The association tells assistive technology which text explains the current input. A reviewer can hear the error when focus lands on the field instead of having to discover an unrelated message elsewhere on the page.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Submit an invalid form, confirm the summary announces the problem, activate one summary link to move to its field, and inspect the field for <code>aria-invalid="true"</code>. You can make validation feedback actionable without depending on sight or a mouse.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day11/act2" class="btn-secondary">← Act 2: Custom Validators &amp; FormArray</a>
        <a routerLink="/day11/lab" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'Group-level validator',
      plainEnglish: 'A rule attached to a FormGroup so it can read sibling controls together.',
      analogy: '🧩 A referee checking how two puzzle pieces fit as a pair.'
    },
    {
      concept: 'Array-level validator',
      plainEnglish: 'A rule attached to a FormArray that checks the list as one value.',
      analogy: '📚 A librarian checking the whole shelf for duplicates and capacity.'
    },
    {
      concept: 'Error summary',
      plainEnglish: 'One announced list of the problems that need attention after a submit attempt.',
      analogy: '🗺️ A map at the top of a form pointing to every blocked turn.'
    },
    {
      concept: 'Accessible error',
      plainEnglish: 'Feedback explicitly connected to its input with labels, ids, and ARIA state.',
      analogy: '🔊 A help desk message delivered to the exact person who needs it.'
    }
  ];

  spoilerValidatorCode = `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function spoilersNeedDetail(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const spoilers = group.get('spoilers')?.value === true;
    const body = String(group.get('body')?.value ?? '');
    return spoilers && body.trim().length < 50
      ? { spoilersNeedDetail: true }
      : null;
  };
}`;

  attachGroupValidatorCode = `reviewForm = this.fb.nonNullable.group(
  {
    rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
    headline: ['', [Validators.required, Validators.maxLength(80), noShouting()]],
    body: ['', [Validators.required, Validators.minLength(20)]],
    spoilers: false,
    tags: this.fb.array<FormControl<string>>([])
  },
  { validators: spoilersNeedDetail() }
);`;

  tagsValidatorCode = `export function tagsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const values = (control.value as string[]).map(tag => tag.trim().toLowerCase());
    const duplicateCount = new Set(values).size;

    return control.value.length > 5
      ? { maxTags: { max: 5, actual: control.value.length } }
      : duplicateCount !== values.length
        ? { duplicateTags: true }
        : null;
  };
}`;

  tagControlCode = `tags: this.fb.array<FormControl<string>>([], {
  validators: tagsValidator()
});

addTag() {
  if (this.tags.length < 5) {
    this.tags.push(this.fb.nonNullable.control('', [
      Validators.minLength(2),
      Validators.maxLength(20)
    ]));
  }
}`;

  submitSummaryCode = `submitAttempted = signal(false);

submit() {
  this.submitAttempted.set(true);
  this.reviewForm.markAllAsTouched();

  if (this.reviewForm.invalid) {
    queueMicrotask(() => document.querySelector<HTMLElement>('.error-summary a')?.focus());
    return;
  }

  // save the valid review
}`;

  accessibleFieldCode = `<div class="error-summary" role="alert" aria-live="polite">
  @if (submitAttempted() && reviewForm.invalid) {
    <p>Please fix the highlighted fields.</p>
    <a href="#headline">Jump to headline error</a>
  }
</div>

<label for="headline">Headline</label>
<input
  id="headline"
  formControlName="headline"
  [attr.aria-invalid]="reviewForm.controls.headline.invalid"
  [attr.aria-describedby]="reviewForm.controls.headline.invalid ? 'headline-error' : null"
/>
@if (reviewForm.controls.headline.invalid &&
     (reviewForm.controls.headline.touched || reviewForm.controls.headline.dirty)) {
  <p id="headline-error" class="field-error">Headline is required.</p>
}`;
}
