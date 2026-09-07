import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day12-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 12 · Act 2 of 2</span>
        <h1>📡 Signal Forms &amp; Choosing Well</h1>
        <p class="subtitle">Read the current signal-forms documentation, trace its small demo, and choose the right form API for the problem in front of you.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms/signals" target="_blank" rel="noopener">Angular's Signal Forms guide</a> and
        <a href="https://angular.dev/guide/forms" target="_blank" rel="noopener">the forms overview</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Trace a docs-led signal-forms example and make a defensible API choice for a form.</li>
          <li><strong>Why It Matters:</strong> New Angular form APIs are worth learning from their official documentation, while an existing working form deserves stability more than a fashionable rewrite.</li>
          <li><strong>Build Steps:</strong> Read the guide's current API status → connect a signal model with <code>form()</code> and <code>Field</code> → use a short decision rule on realistic BingeBoard work.</li>
          <li><strong>Expected Outcome:</strong> You can explore signal forms safely and choose template-driven, reactive, or signal forms based on constraints rather than novelty.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Signal Forms &amp; Choosing Well)</p>
        <p><strong>Next step:</strong> Student Lab</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <app-lesson-step stepId="d12-act2-signal-forms-docs" [stepNumber]="1" title="A Docs-Led Signal Forms Demo">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Signal Forms is an evolving Angular API, so treat its official guide as the source of truth for the version you use. Its core shape is still easy to recognize: a signal holds your data model, <code>form()</code> adds form state and rules, and the <code>Field</code> directive connects a field to an input.</p>
        <app-code-block lang="typescript" [code]="signalFormComponentCode" />
        <app-code-block lang="html" [code]="signalFormTemplateCode" />
        <app-collapsible icon="🧩" label="Deep Dive — the model is plain signal state first">
          <p>The profile data is a writable signal before it becomes a form. That makes the form's value a natural part of your signal graph, while the form object supplies field state and validation metadata around that model.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Why should you check the exact guide before copying this example into a production project?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — evolving APIs can change">
          <p>Signal Forms is documented as an evolving API. Exact imports, validation helpers, and recommendations can change between Angular versions, so the matching official guide is more reliable than a stale snippet.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Open the linked guide, locate its version and status note, then trace how the model signal reaches the input through <code>Field</code>. You can investigate a new Angular API from its maintained documentation.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-act2-decision-rule" [stepNumber]="2" title="A Practical Decision Rule">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Use the smallest stable API that fits the form. A tiny local form benefits from template-driven ergonomics; a complex established form benefits from reactive structure; a new signal-first experiment can be a good signal-forms candidate when its version constraints are understood.</p>
        <app-code-block lang="typescript" [code]="decisionRuleCode" />
        <app-collapsible icon="💡" label="Hint — existing code is a constraint, not a failure">
          <p>The validated Day 11 review form already needs a dynamic tags list, cross-field rules, an error summary, and accessible focus behavior. Keeping it reactive is a sound maintenance decision, not a missed chance to use another API.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Would you rewrite the Day 11 review form today solely because signal forms exist?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — no, keep a working complex form stable">
          <p>No. It already has a clear reactive structure and working behavior. A migration needs a concrete gain, a verified compatibility path, and time to retest every validation and accessibility behavior.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Classify the newsletter form, Day 11 review form, and a new experimental settings form with the rule. You can state the tradeoff that drove each choice.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-act2-choosing-well" [stepNumber]="3" title="Choosing Well, Not Choosing Once">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>A form choice is local. One app can responsibly contain more than one style when each form has a clear owner and no input mixes competing APIs. The lab asks you to make this reasoning visible in a short choice note.</p>
        <app-code-block lang="typescript" [code]="choiceExamplesCode" />
        <app-collapsible icon="💡" label="Hint — describe constraints before preferences">
          <p>Start with the form's size, validation rules, existing code, team familiarity, and Angular version. "I like signals" is not a sufficient technical reason on its own.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">What is the one rule that prevents the three approaches from fighting each other?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — one form model owner per input">
          <p>Each input should belong to exactly one form model. Do not bind the same input with both <code>[(ngModel)]</code> and <code>formControlName</code>, and do not layer another API over a control just to experiment.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Write a two-sentence choice note for the lab form before coding it. You can choose a form style from concrete requirements and keep each input owned by one API.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day12/act1" class="btn-secondary">← Act 1: Template-Driven Forms</a>
        <a routerLink="/day12/lab" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: 'Signal Forms', plainEnglish: 'An evolving API that layers field state and rules around a signal data model.', analogy: '📡 A signal dashboard with validation instruments attached.' },
    { concept: 'Docs-led demo', plainEnglish: 'A small experiment guided by the exact documentation for your Angular version.', analogy: '🧭 Following a current map instead of a remembered route.' },
    { concept: 'Form owner', plainEnglish: 'The one API responsible for an input value, validation state, and submission behavior.', analogy: '🔑 One keyholder for each locked door.' },
    { concept: 'Decision rule', plainEnglish: 'A repeatable way to choose by complexity, stability, and constraints.', analogy: '⚖️ A checklist that weighs the job before choosing a tool.' }
  ];

  signalFormComponentCode = `import { Component, signal } from '@angular/core';
import { Field, form, required } from '@angular/forms/signals';

@Component({
  standalone: true,
  imports: [Field],
  templateUrl: './profile-form.html'
})
export class ProfileForm {
  profile = signal({ displayName: '' });
  profileForm = form(this.profile, schema => {
    required(schema.displayName);
  });
}`;

  signalFormTemplateCode = `<label>
  Display name
  <input type="text" [field]="profileForm.displayName" />
</label>
@if (profileForm.displayName().invalid()) {
  <p class="field-error">A display name is required.</p>
}`;

  decisionRuleCode = `if (the form is small, local, and mostly HTML validation) {
  choose template-driven forms;
} else if (the form has dynamic controls, cross-field rules, or existing reactive code) {
  choose reactive forms;
} else if (the project version supports it and you want a new signal-first form) {
  evaluate signal forms with the current official guide;
}`;

  choiceExamplesCode = `Newsletter sign-up: template-driven
Reason: one field, local component state, and simple HTML validation.

Day 11 review form: reactive
Reason: dynamic FormArray tags, cross-field validation, and mature working code.

New experimental profile form: evaluate signal forms
Reason: a new feature can validate compatibility without rewriting stable behavior.`;
}
