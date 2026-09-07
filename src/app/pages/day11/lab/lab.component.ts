import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day11-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — a Review Form That Doesn't Annoy People</h1>
        <p class="subtitle">
          About 60 minutes. 5 tasks. Wire full validation UX with timely errors, a cross-field spoilers
          rule, a capped no-duplicates tags array, a submit-blocking error summary, and one Debug It bug.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Get the end-of-Day-11-Acts BingeBoard working before starting — <a routerLink="/day11/start">Day 11 · Starting Point</a>
          plus <code>Validators</code> attached to rating/headline/body, timely
          touched/dirty error display, a disabled+guarded submit, a <code>noShouting</code> custom validator,
          and a <code>tags</code> <code>FormArray</code> with correctly-typed buttons. If that isn't working
          yet, finish Act 3 first — this lab builds directly on top of it.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Ship a review form whose validation actually helps a reviewer instead of annoying them — every
            rule from the Acts, plus a cross-field rule, an array-level rule, and a clear all-at-once
            error summary for a first failed submit attempt.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Real forms combine everything you've learned this Day at once — per-field rules, a rule that
            depends on two fields together, a rule about a whole list, and a good "here's everything wrong"
            summary when someone tries to submit anyway.
          </li>
          <li>
            <strong>Build Steps:</strong>
            full validation UX across every field → a cross-field spoilers/body-length rule → capped,
            no-duplicate tags → a submit-time error summary with <code>markAllAsTouched()</code> → one
            Debug It bug hiding in a disabled binding.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            You can independently combine built-in validators, a custom cross-field validator, and
            FormArray-level validation into one coherent, genuinely usable form.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 11 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> Task 1 is about 15 minutes. Task 2 is about 10 minutes. Task 3 is about 15 minutes. Task 4 is about 10 minutes. Task 5 (Debug It) is about 10 minutes.</p>
      </section>

      <app-lesson-step
        stepId="d11-lab-full-validation-ux"
        [stepNumber]="'Task 1'"
        title="Full Validation UX — Every Field, Timely Errors"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: Validators, hasError(), invalid && (touched || dirty).</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Confirm every field from the objectives has its validators attached — rating required, min 0,
          max 10; headline required, max length 80, and the <code>noShouting</code> rule from Act 2; body
          required, min length 20 — and that every field shows its own timely, specific error message using
          the <code>invalid &amp;&amp; (touched || dirty)</code> rule from Act 2.
        </p>

        <div class="think-about-it">
          <p class="tai-q">A reviewer pastes a 90-character headline in one action, without ever clicking away from the field. Does the error show immediately?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — yes, because pasting sets dirty, not just touched">
          <p>Yes. Pasting text changes the control's value, which sets <code>dirty</code> to true immediately — the error condition checks <code>touched || dirty</code>, so it doesn't need the reviewer to click away first. This is exactly the scenario <code>dirty</code> exists to catch that <code>touched</code> alone would miss.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Verify rating, headline, and body all have their required validators from Act 1.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Verify headline also has <code>noShouting()</code> attached from Act 2.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Add a specific error message per validator, per field, shown only when timely.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>If you added a raw debug-panel JSON dump while testing, delete or hide it now that real messages exist.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every field shows a specific, correctly-timed error message for
          every rule attached to it, and no error shows on first page load.
        </div>

        <app-collapsible icon="💡" label="Hint — rating's errors need their own two messages">
          <p>Rating needs both a "must be at least 0" and a "can't be more than 10" message, checking
          <code>hasError('min')</code> and <code>hasError('max')</code> separately — a single generic
          "invalid rating" message doesn't tell a reviewer which direction to fix.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" [code]="task1Answer" />
          <app-code-block lang="html" [code]="task1TemplateAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d11-lab-cross-field-spoilers"
        [stepNumber]="'Task 2'"
        title="Cross-Field Rule — Spoilers Need a Real Summary"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: group-level custom validator, cross-field rules.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A review marked "Contains spoilers" is making a bigger claim than a normal review — it needs at
          least 50 characters in <code>body</code> to justify the warning. Write a group-level validator
          (attached to the whole <code>reviewForm</code>, not one field) that fails when <code>spoilers</code>
          is <code>true</code> and <code>body</code>'s length is under 50.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why does this rule have to be a group-level validator instead of one attached directly to the body control?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a single control can't see its sibling's value">
          <p>A validator attached to <code>body</code> only ever receives <code>body</code>'s own control as its argument — it has no way to read <code>spoilers</code>'s current value from there. A validator attached to the group instead receives the whole <code>FormGroup</code>, so it can read <code>group.get('spoilers')?.value</code> and <code>group.get('body')?.value</code> together, in one function.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Write <code>spoilersNeedDetail()</code> as a <code>ValidatorFn</code> that reads both controls.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Pass it as the second argument to <code>fb.nonNullable.group(...)</code>, not inside any one field.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Show the resulting error by reading <code>reviewForm.hasError('spoilersNeedDetail')</code>, not a field-level check.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Checking "Contains spoilers" with a short body shows a
          group-level error; the error clears once body reaches 50 characters or spoilers is unchecked.
        </div>

        <app-collapsible icon="💡" label="Hint — group validators go in the group() call's second argument">
          <p><code>{{ "fb.nonNullable.group({ ...fields }, { validators: spoilersNeedDetail() })" }}</code> — the
          second argument to <code>group()</code> is an options object, and <code>validators</code> is where
          group-level rules live.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" [code]="task2Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d11-lab-formarray-max-tags"
        [stepNumber]="'Task 3'"
        title="Tags — Max 5, Length 2-20, No Duplicates"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: FormArray-level validator, array length rules, duplicate detection.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Round out Act 2's <code>tags</code> <code>FormArray</code> with three rules at once: no more than
          5 tags total, each individual tag between 2 and 20 characters, and no two tags equal to each
          other (case-insensitive — "Funny" and "funny" count as duplicates).
        </p>

        <div class="think-about-it">
          <p class="tai-q">Should "max 5 tags" be enforced with a validator, or by disabling the "Add tag" button once there are 5?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — both, for the same reason [disabled] and guarded submit both existed in Act 2">
          <p>Both. Disabling "Add tag" at 5 is the UX affordance that stops most reviewers from ever hitting the edge case. The array-level validator is the actual rule that's always enforced — it's what makes the form itself invalid (and submit unclickable) if a 6th tag ever gets in some other way. This is the exact same disabled-button-plus-guard pattern from Act 2, just applied to an array instead of a single field.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Attach <code>Validators.minLength(2)</code>/<code>Validators.maxLength(20)</code> to each tag control as it's pushed.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Write <code>tagsValidator()</code> as an array-level <code>ValidatorFn</code> checking length &lt;= 5 and no case-insensitive duplicates.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Attach it as the <code>tags</code> array's own validator, not each individual control's.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Disable "Add tag" once <code>tags.length</code> reaches 5.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> A 6th tag can't be added once 5 exist, a tag under 2 or over 20
          characters shows its own error, and typing "funny" when "Funny" already exists shows a
          duplicate-tag error.
        </div>

        <app-collapsible icon="💡" label="Hint — read every tag's raw value with .value, then compare lowercased">
          <p><code>tagsArray.value</code> gives you a plain array of the current strings — map each to
          <code>.toLowerCase()</code> before checking for duplicates with something like comparing
          <code>new Set(...)</code>'s size to the array's own length.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" [code]="task3Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d11-lab-error-summary"
        [stepNumber]="'Task 4'"
        title="Error Summary on a Failed Submit Attempt"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: markAllAsTouched(), a submit-time error summary.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Right now, a reviewer who never touches a single field and just clicks submit sees... nothing,
          because the submit button is disabled. But if they somehow do get an invalid submit through
          (or you simply want a summary block), calling <code>reviewForm.markAllAsTouched()</code> at the
          top of <code>submit()</code> reveals every field's error at once — collect those into one visible
          summary list above the form.
        </p>

        <div class="think-about-it">
          <p class="tai-q">If the submit button is already disabled while invalid, why would submit() ever run with an invalid form at all?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — it mostly won't, but markAllAsTouched() is still the right habit">
          <p>With the disabled binding from Act 2 in place, it mostly won't. But <code>markAllAsTouched()</code> is still worth calling at the top of <code>submit()</code> as a defensive habit — it costs one line, and it means that if a form's disabled binding is ever accidentally removed, tightened incorrectly, or bypassed some other way, the reviewer still gets useful, complete feedback instead of a silent no-op.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Call <code>this.reviewForm.markAllAsTouched()</code> as the first line of <code>submit()</code>, before the invalid guard.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Render a summary <code>&lt;ul&gt;</code> above the form, listing every currently-failing field by name.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Verify the summary appears only after an attempted submit, not on page load.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Attempting to submit an invalid form marks every field as
          touched, revealing every field-level error at once plus a visible top-of-form summary.
        </div>

        <app-collapsible icon="💡" label="Hint — markAllAsTouched() recurses into nested groups and arrays">
          <p>Calling it on the top-level <code>reviewForm</code> touches every nested control automatically —
          including every control inside the <code>tags</code> <code>FormArray</code> — so you don't need to
          call it separately on each one.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <app-code-block lang="typescript" [code]="task4Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d11-lab-debug-it"
        [stepNumber]="'Task 5'"
        title="Debug It — the Inverted Disabled Binding"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: reading your own [disabled] binding carefully.</span>
        </div>

        <h4>What to build:</h4>
        <p>Find and fix the bug in this submit button binding, copied from a teammate's branch:</p>
        <app-code-block lang="html" [code]="debugBugCode" />

        <div class="think-about-it">
          <p class="tai-q">The button is disabled exactly when the form is <em>valid</em>, and enabled exactly when it's invalid — the opposite of what Act 2 built. What's the one-word fix?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — .valid was swapped in for .invalid">
          <p><code>[disabled]="reviewForm.valid"</code> disables the button precisely when the form has become
          good to submit, and enables it precisely when it's broken — a complete inversion of the intended
          rule. This compiles fine and looks almost identical to the correct version at a glance, which is
          exactly what makes it worth training your eye to catch. The fix is swapping <code>.valid</code>
          back to <code>.invalid</code>.</p>
          <app-code-block lang="html" [code]="debugFixCode" />
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Fill in every field correctly and confirm the button is now clickable.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Clear one required field and confirm the button becomes unclickable again.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> The submit button is disabled while the form is invalid and
          enabled once every field (and the cross-field and array-level rules) pass — not the reverse.
        </div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 5">
          <app-code-block lang="html" [code]="task5Answer" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day11/act3" class="btn-secondary">← Act 3: Cross-Field Rules &amp; Accessible Errors</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Every field shows a specific, correctly-timed error message</li>
          <li><span class="checkbox">✅</span> Spoilers checked with a short body triggers a group-level error</li>
          <li><span class="checkbox">✅</span> Tags cap at 5, enforce 2-20 characters each, and reject duplicates</li>
          <li><span class="checkbox">✅</span> A failed submit attempt marks every field touched and shows a summary</li>
          <li><span class="checkbox">✅</span> The submit button's disabled binding correctly gates on <code>.invalid</code>, not <code>.valid</code></li>
        </ul>
      </section>

      <div class="info-box">
        <strong>Pitfalls worth remembering:</strong>
        <ul>
          <li><code>invalid</code> alone is never a good enough reason to show an error — pair it with <code>touched || dirty</code>.</li>
          <li>A group-level or array-level validator sees siblings a field-level one can't — reach for one the moment a rule needs more than one control.</li>
          <li>Any button inside a <code>&lt;form&gt;</code> that isn't the real submit button needs an explicit <code>type="button"</code>.</li>
          <li><code>[disabled]</code> is a UX affordance, never your only defense — guard <code>submit()</code> itself too.</li>
          <li><code>markAllAsTouched()</code> is one line of real insurance against every other safeguard failing at once.</li>
        </ul>
      </div>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 11: Reactive Forms II. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Attach built-in Validators to a field, and combine several on one control.</li>
          <li>✅ Read a control's valid/errors/touched/dirty state to show errors at the right moment.</li>
          <li>✅ Write a custom ValidatorFn for a rule no built-in validator covers.</li>
          <li>✅ Write a group-level validator that reads more than one field at once.</li>
          <li>✅ Build and validate a FormArray of repeatable controls, including array-level rules.</li>
          <li>✅ Disable submit while invalid, guard submit() defensively, and summarize errors with markAllAsTouched().</li>
        </ul>
        <a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .lab-label { background: #4ec9b0 !important; color: #1e1e1e !important; }
    .lab-intro {
      background: #1a2e4a;
      border: 1px solid #2a4a7a;
      border-radius: 10px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .lab-intro h3 { color: #82aaff; margin-bottom: 8px; }
    .lab-intro p { font-size: 14px; color: #b0c8e0; }

    .task-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .difficulty {
      font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 12px;
    }
    .difficulty.easy { background: #1a2e1a; color: #4ec9b0; border: 1px solid #2a5c2a; }
    .difficulty.medium { background: #2a2a1a; color: #ff9d00; border: 1px solid #5c4a00; }
    .difficulty.hard { background: #2a1a1a; color: #f44747; border: 1px solid #5c1a1a; }
    .concepts { font-size: 12px; color: #858585; }

    .task-steps { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
    .task-step {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; color: #cccccc;
    }
    .step-dot {
      width: 24px; height: 24px; background: #3e3e42;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 12px; font-weight: 700;
      flex-shrink: 0; color: #4fc3f7;
    }

    .checkpoint-card { margin-top: 32px; }

    .completion-card {
      background: linear-gradient(135deg, #1a2e1a, #0d1f0d);
      border: 2px solid #4ec9b0;
      border-radius: 12px;
      padding: 32px;
      margin-top: 40px;
      text-align: center;
    }
    .completion-card h2 { font-size: 28px; margin-bottom: 12px; }
    .completion-card p { color: #a0d0a0; margin-bottom: 16px; }
    .complete-list {
      list-style: none;
      padding: 0;
      display: inline-block;
      text-align: left;
    }
    .complete-list li {
      padding: 6px 0;
      font-size: 14px;
      color: #c3e88d;
    }
  `]
})
export class Day11LabComponent {
  task1Answer = `reviewForm = this.fb.nonNullable.group({
  rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
  headline: ['', [Validators.required, Validators.maxLength(80), noShouting()]],
  body: ['', [Validators.required, Validators.minLength(20)]],
  spoilers: false,
  tags: this.fb.array<FormControl<string>>([])
});`;

  task1TemplateAnswer = `<label>
  Rating (0-10)
  <input type="number" formControlName="rating" min="0" max="10" />
</label>
@if (reviewForm.controls.rating.invalid &&
     (reviewForm.controls.rating.touched || reviewForm.controls.rating.dirty)) {
  <div class="field-error">
    @if (reviewForm.controls.rating.hasError('required')) { <p>Rating is required.</p> }
    @if (reviewForm.controls.rating.hasError('min')) { <p>Rating must be at least 0.</p> }
    @if (reviewForm.controls.rating.hasError('max')) { <p>Rating can't be more than 10.</p> }
  </div>
}

<label>
  Headline
  <input type="text" formControlName="headline" maxlength="80" />
</label>
@if (reviewForm.controls.headline.invalid &&
     (reviewForm.controls.headline.touched || reviewForm.controls.headline.dirty)) {
  <div class="field-error">
    @if (reviewForm.controls.headline.hasError('required')) { <p>Headline is required.</p> }
    @if (reviewForm.controls.headline.hasError('maxlength')) { <p>Headline can't be longer than 80 characters.</p> }
    @if (reviewForm.controls.headline.hasError('noShouting')) { <p>Try turning off caps lock.</p> }
  </div>
}

<label>
  Full review
  <textarea formControlName="body" rows="4"></textarea>
</label>
@if (reviewForm.controls.body.invalid &&
     (reviewForm.controls.body.touched || reviewForm.controls.body.dirty)) {
  <div class="field-error">
    @if (reviewForm.controls.body.hasError('required')) { <p>A review needs some text.</p> }
    @if (reviewForm.controls.body.hasError('minlength')) { <p>Write at least 20 characters.</p> }
  </div>
}`;

  task2Answer = `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function spoilersNeedDetail(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const spoilers = group.get('spoilers')?.value;
    const body: string = group.get('body')?.value ?? '';
    return spoilers && body.trim().length < 50 ? { spoilersNeedDetail: true } : null;
  };
}

// In the component:
reviewForm = this.fb.nonNullable.group({
  rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
  headline: ['', [Validators.required, Validators.maxLength(80), noShouting()]],
  body: ['', [Validators.required, Validators.minLength(20)]],
  spoilers: false,
  tags: this.fb.array<FormControl<string>>([])
}, { validators: spoilersNeedDetail() });

// In the template:
// @if (reviewForm.hasError('spoilersNeedDetail')) {
//   <p class="field-error">Spoiler reviews need at least 50 characters so readers know what they're opting into.</p>
// }`;

  task3Answer = `import { AbstractControl, ValidationErrors, ValidatorFn, FormArray } from '@angular/forms';

export function tagsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const array = control as FormArray<FormControl<string>>;
    const values: string[] = array.value.map((v: string) => v.trim().toLowerCase());

    if (values.length > 5) return { tooManyTags: true };

    const uniqueCount = new Set(values).size;
    if (uniqueCount !== values.length) return { duplicateTags: true };

    return null;
  };
}

// In the component:
reviewForm = this.fb.nonNullable.group({
  // ...other fields
  tags: this.fb.array<FormControl<string>>([], tagsValidator())
});

addTag() {
  if (this.tags.length >= 5) return;
  this.tags.push(
    this.fb.nonNullable.control('', [Validators.minLength(2), Validators.maxLength(20)])
  );
}`;

  task4Answer = `submit() {
  this.reviewForm.markAllAsTouched();
  if (this.reviewForm.invalid) return;

  const raw = this.reviewForm.getRawValue();
  this.reviewsSvc.add({
    showId: this.showId(),
    rating: raw.rating,
    headline: raw.headline,
    body: raw.body,
    spoilers: raw.spoilers,
    createdAt: new Date()
  });
  this.reviewForm.reset();
}

get errorSummary(): string[] {
  const messages: string[] = [];
  if (this.reviewForm.controls.rating.invalid) messages.push('Rating');
  if (this.reviewForm.controls.headline.invalid) messages.push('Headline');
  if (this.reviewForm.controls.body.invalid) messages.push('Body');
  if (this.reviewForm.controls.tags.invalid) messages.push('Tags');
  if (this.reviewForm.hasError('spoilersNeedDetail')) messages.push('Spoiler detail');
  return messages;
}

// In the template, above the form:
// @if (errorSummary.length > 0 && reviewForm.touched) {
//   <ul class="error-summary">
//     @for (field of errorSummary; track field) { <li>{{ field }} needs attention.</li> }
//   </ul>
// }`;

  debugBugCode = `<!-- Bug: .valid instead of .invalid -->
<button type="submit" [disabled]="reviewForm.valid">Post review</button>`;

  debugFixCode = `<button type="submit" [disabled]="reviewForm.invalid">Post review</button>`;

  task5Answer = `<button type="submit" [disabled]="reviewForm.invalid">Post review</button>`;
}
