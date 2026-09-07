import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day11-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 11 · Act 2 of 3</span>
        <h1>🏷️ Custom Validators &amp; FormArray</h1>
        <p class="subtitle">Write a custom noShouting validator, add a repeatable FormArray of tags, and keep list controls from accidentally submitting the form.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms/reactive-forms#creating-custom-validators" target="_blank" rel="noopener">Creating custom validators</a> and
        <a href="https://angular.dev/guide/forms/reactive-forms#using-form-arrays" target="_blank" rel="noopener">using form arrays</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Write your own validator function when the built-ins don't cover a rule, and manage a variable-length list of controls with <code>FormArray</code>.</li>
          <li><strong>Why It Matters:</strong> Not every rule fits <code>Validators.required</code> or <code>min</code>/<code>max</code> — "don't type in all caps" needs custom logic. And a review form with a fixed number of tag inputs can't handle "as many tags as the reviewer wants" — that's exactly what <code>FormArray</code> is for.</li>
          <li><strong>Build Steps:</strong> Write <code>noShouting</code> as a plain <code>ValidatorFn</code> → attach it to headline → add a <code>tags</code> <code>FormArray</code> to the review form → wire add/remove buttons with <code>type="button"</code> → find and fix a bug caused by leaving that attribute off.</li>
          <li><strong>Expected Outcome:</strong> You can write a validator function from scratch, and you can add and remove tag inputs dynamically without ever accidentally submitting the form.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Custom Validators &amp; FormArray)</p>
        <p><strong>Next step:</strong> Student Lab</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <app-lesson-step stepId="d11-act2-noshouting-validator" [stepNumber]="1" title="Writing a Custom Validator — noShouting">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>A validator function is nothing exotic — it's a plain function that takes a control and returns either <code>null</code> (valid) or an errors object (invalid). <code>noShouting</code> rejects a headline that's entirely uppercase letters, at least three letters long, so single-letter or short abbreviations don't false-positive.</p>
        <app-code-block lang="typescript" [code]="noShoutingCode" />
        <p style="margin-top: 12px;">Attach it exactly like a built-in validator — in the same array, alongside <code>Validators.required</code> and <code>Validators.maxLength(80)</code>.</p>
        <app-code-block lang="typescript" [code]="attachNoShoutingCode" />
        <app-collapsible icon="💡" label="Hint — a validator's return shape must match what hasError() expects">
          <p>Whatever key you choose for the errors object — <code>noShouting</code> above — is exactly what a template later checks with <code>hasError('noShouting')</code>. There's no required naming convention, but pick something descriptive; it becomes the public "name" of your rule.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Why does <code>noShouting</code> check <code>value.length >= 3</code> before comparing to uppercase, instead of just checking <code>value === value.toUpperCase()</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — short strings and non-letter text would false-positive">
          <p>Without a minimum length, a one- or two-letter headline like "OK" or "US" would fail the check even though nobody would call that "shouting." Requiring at least three letters filters out short abbreviations and acronyms while still catching genuinely all-caps sentences. This is a deliberate design choice in the validator, not something Angular requires — every custom validator's exact rule is yours to define.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Typing "AMAZING SHOW" into headline shows a shouting-related error; typing "US" or a normal sentence does not.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d11-act2-formarray-tags" [stepNumber]="2" title="FormArray — a Repeatable List of Tags">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p><code>FormArray</code> is <code>FormGroup</code>'s sibling for lists instead of fixed shapes — a growable, shrinkable collection of controls, each accessible by index. Add one <code>tags</code> array to the review form, alongside the existing fields.</p>
        <app-code-block lang="typescript" [code]="formArrayFieldCode" />
        <p style="margin-top: 12px;"><code>addTag()</code> pushes a new empty control onto the array; <code>removeTag(index)</code> removes one by position. Both are plain methods on the component — there's no special FormArray API beyond the <code>FormArray</code> instance's own <code>push()</code>/<code>removeAt()</code> methods.</p>
        <app-code-block lang="typescript" [code]="addRemoveTagCode" />
        <p style="margin-top: 12px;">In the template, <code>&#64;for</code> over the array's <code>.controls</code>, using <code>formArrayName</code> to attach the array and <code>[formControlName]="i"</code> (a numeric index, not a string key) to attach each individual tag input.</p>
        <app-code-block lang="html" [code]="formArrayTemplateCode" />
        <app-collapsible icon="🧩" label="Deep Dive — why formArrayName plus a numeric formControlName, not formGroupName?">
          <p><code>formGroupName</code> attaches a nested <em>named</em> group (like a sub-object with keys) — that's not what a <code>FormArray</code> is. <code>formArrayName="tags"</code> attaches the array itself, and each item inside it is addressed purely by its numeric position, so the input for item 2 binds with <code>[formControlName]="2"</code> (or, inside an <code>&#64;for</code>, the loop's own <code>&#36;index</code>). This is the one place reactive forms binds a control by a number instead of a string key.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q"><code>reviewForm.controls.tags</code> — is this a plain array of strings, or something else?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a FormArray, whose own .value happens to be an array of strings">
          <p>It's a <code>FormArray</code> instance — an object with its own <code>value</code>, <code>valid</code>, <code>errors</code>, <code>push()</code>, and <code>removeAt()</code>, exactly like every other control type you've used. Its <code>.value</code> getter happens to return a plain array of strings (since each item is a simple text control), but the array itself is a full-fledged reactive-forms control, not a raw JavaScript array.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking "Add tag" adds a new empty input to the list, typing into any tag input updates that specific array slot, and removing one tag doesn't disturb the others.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d11-act2-debug" [stepNumber]="3" title="Debug It — the Missing type=&quot;button&quot;">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>This bug is one missing attribute, and it looks completely harmless until you click it.</p>
        <app-code-block lang="html" [code]="bugCode" />
        <div class="think-about-it">
          <p class="tai-q">Clicking "Add tag" adds a new tag input, as expected — but it also seems to submit the whole review form at the same time. Why?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a button's default type inside a form is submit">
          <p>Any <code>&lt;button&gt;</code> element without an explicit <code>type</code> attribute defaults to <code>type="submit"</code> when it's inside a <code>&lt;form&gt;</code> — that's plain HTML behavior, nothing Angular-specific about it. Clicking it both runs your <code>(click)</code> handler <em>and</em> fires the form's submit event, which triggers <code>(ngSubmit)</code> too. Inside a reactive form, every button that isn't meant to submit — add-tag, remove-tag, quick-fill buttons from Day 10 — needs an explicit <code>type="button"</code> to opt out of that default.</p>
          <app-code-block lang="html" [code]="bugFixCode" />
        </app-collapsible>
        <div class="warning-box">This bug is especially sneaky because it doesn't throw an error — the tag gets added <em>and</em> the form gets submitted (and reset, clearing everything you just added). Always set <code>type="button"</code> on any button inside a <code>&lt;form&gt;</code> that isn't the actual submit button.</div>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why an unmarked button inside a form submits it, and every non-submit button in the review form (add tag, remove tag, both quick-fills) has an explicit <code>type="button"</code>.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day11/act1" class="btn-secondary">← Act 1: Validators &amp; Control State</a>
        <a routerLink="/day11/act3" class="btn-primary">Act 3: Cross-Field Rules &amp; Accessible Errors →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'ValidatorFn',
      plainEnglish: 'A plain function: takes a control, returns null or an errors object.',
      analogy: '🔎 A custom inspection rule an inspector adds to their checklist.'
    },
    {
      concept: 'FormArray',
      plainEnglish: 'A growable, shrinkable list of controls, addressed by numeric index.',
      analogy: '📎 A stack of index cards you can add to or pull from, one at a time.'
    },
    {
      concept: 'formArrayName / [formControlName]="i"',
      plainEnglish: 'Attach the whole array by name, then each item by its position.',
      analogy: '🗂️ A labeled drawer (the array) whose folders are numbered, not named.'
    },
    {
      concept: 'type="button"',
      plainEnglish: 'Opts a button out of a form\'s default submit-on-click behavior.',
      analogy: '🚪 A side door that doesn\'t trigger the building\'s main fire alarm.'
    }
  ];

  noShoutingCode = `import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noShouting(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    const letters = value.replace(/[^a-zA-Z]/g, '');
    const isShouting = letters.length >= 3 && value === value.toUpperCase();
    return isShouting ? { noShouting: true } : null;
  };
}`;

  attachNoShoutingCode = `import { noShouting } from '../../validators/no-shouting';

reviewForm = this.fb.nonNullable.group({
  rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
  headline: ['', [Validators.required, Validators.maxLength(80), noShouting()]],
  body: ['', [Validators.required, Validators.minLength(20)]],
  spoilers: false
});`;

  formArrayFieldCode = `import { FormArray, FormControl } from '@angular/forms';

reviewForm = this.fb.nonNullable.group({
  rating: [8, [Validators.required, Validators.min(0), Validators.max(10)]],
  headline: ['', [Validators.required, Validators.maxLength(80), noShouting()]],
  body: ['', [Validators.required, Validators.minLength(20)]],
  spoilers: false,
  tags: this.fb.array<FormControl<string>>([])
});`;

  addRemoveTagCode = `get tags() {
  return this.reviewForm.controls.tags;
}

addTag() {
  this.tags.push(this.fb.nonNullable.control(''));
}

removeTag(index: number) {
  this.tags.removeAt(index);
}`;

  formArrayTemplateCode = `<div formArrayName="tags">
  @for (tag of tags.controls; track $index; let i = $index) {
    <div class="tag-row">
      <input type="text" [formControlName]="i" placeholder="Tag" />
      <button type="button" (click)="removeTag(i)">Remove</button>
    </div>
  }
</div>
<button type="button" (click)="addTag()">+ Add tag</button>`;

  bugCode = `<!-- Bug: no type attribute -->
<button (click)="addTag()">+ Add tag</button>`;

  bugFixCode = `<button type="button" (click)="addTag()">+ Add tag</button>`;
}
