import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day12-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 12 · Act 1 of 2</span>
        <h1>📬 Template-Driven Forms</h1>
        <p class="subtitle">Build a compact newsletter form, then use it as a Rosetta Stone for the reactive form you already know.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> run the validated BingeBoard from <a routerLink="/day12/start">Day 12 · Starting Point</a>. You will compare this small template-driven form to its reactive review form.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms/template-driven-forms" target="_blank" rel="noopener">Angular's template-driven forms guide</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build a small template-driven form and translate its pieces into reactive-forms terms.</li>
          <li><strong>Why It Matters:</strong> You will encounter template-driven forms in existing Angular apps. Recognizing the same responsibilities keeps the syntax from looking mysterious.</li>
          <li><strong>Build Steps:</strong> Import <code>FormsModule</code> → bind a newsletter email with <code>[(ngModel)]</code> → use template state for validation → compare it directly with a <code>FormControl</code>.</li>
          <li><strong>Expected Outcome:</strong> You can make a focused newsletter form work and identify the reactive equivalent of each template-driven piece.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Template-Driven Forms)</p>
        <p><strong>Next step:</strong> Act 2 (Signal Forms &amp; Choosing Well)</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <app-lesson-step stepId="d12-act1-newsletter-form" [stepNumber]="1" title="A Small Newsletter Form">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Template-driven forms put the form model in the template. Import <code>FormsModule</code>, give every control a <code>name</code>, and let <code>[(ngModel)]</code> keep one component property in sync with the input.</p>
        <app-code-block lang="typescript" [code]="newsletterComponentCode" />
        <app-code-block lang="html" [code]="newsletterTemplateCode" />
        <app-collapsible icon="💡" label="Hint — name is not just a label">
          <p><code>ngModel</code> registers the control with the surrounding <code>ngForm</code>. The <code>name</code> attribute is the control key it uses, so Angular reports an error if it is missing inside a form.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Where does the current email value live after this form renders?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — in the component property, with a template-built control around it">
          <p>The email string lives in <code>email</code> on the component. Angular builds an <code>NgModel</code> control around that property because the template asked it to, rather than because the component constructed a <code>FormControl</code>.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Enter a valid email, submit the form, and see the confirmation message. You can bind a simple form field with <code>[(ngModel)]</code> and a required <code>name</code>.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-act1-template-validation" [stepNumber]="2" title="Validation State from the Template">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Template-driven forms use ordinary HTML validation attributes, then expose the control state through a template reference variable. This gives you <code>invalid</code>, <code>touched</code>, and individual errors without creating the control in TypeScript.</p>
        <app-code-block lang="html" [code]="templateValidationCode" />
        <app-collapsible icon="🧩" label="Deep Dive — browser attributes and Angular state work together">
          <p><code>required</code> and <code>email</code> describe the rule on the input. The <code>#emailField="ngModel"</code> reference gives the template access to Angular's matching control state, so your message can wait until interaction has happened.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Why check both <code>invalid</code> and <code>touched</code> before showing this error?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — validity says what failed; touched says when feedback is useful">
          <p>A new required input starts invalid, but that is not useful feedback before you have interacted with it. Pairing invalid state with touched state follows the same timely-error rule as the Day 11 review form.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Focus and leave the empty email field, then observe its message; enter a valid email and watch it disappear. You can connect template-driven validation to user interaction state.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-act1-rosetta-stone" [stepNumber]="3" title="Rosetta Stone — Same Job, Different Owner">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>These APIs look different, but both create a control, connect it to an input, apply rules, and expose status. The important choice is who owns the form model.</p>
        <app-code-block lang="typescript" [code]="rosettaStoneCode" />
        <app-collapsible icon="💡" label="Hint — do not mix the two APIs on one control">
          <p>Choose one owner per form. Attaching both <code>[(ngModel)]</code> and <code>formControlName</code> to the same input creates competing sources of truth and Angular warns about it.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Which style gives TypeScript the clearest single place to inspect a large form's shape?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — reactive forms">
          <p>Reactive forms. The component constructs the full <code>FormGroup</code> in TypeScript, making its controls, validators, and cross-field rules visible together. That does not make template-driven forms bad; it makes reactive forms a better fit when the form grows complex.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Match each newsletter-form line to its reactive counterpart in the table. You can explain that both styles do the same jobs while placing the model in different places.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day12/start" class="btn-secondary">← Starting Point</a>
        <a routerLink="/day12/act2" class="btn-primary">Act 2: Signal Forms &amp; Choosing Well →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: 'Template-driven form', plainEnglish: 'A form whose controls Angular discovers from template directives.', analogy: '📋 A paper form where the labeled fields define the record as you fill it in.' },
    { concept: 'ngModel', plainEnglish: 'A directive that synchronizes one input with one component property.', analogy: '🔄 A two-way clipboard between a field and a variable.' },
    { concept: 'NgForm', plainEnglish: 'The form state Angular builds around a template form.', analogy: '🗂️ A folder automatically assembled from every named field.' },
    { concept: 'Reactive form', plainEnglish: 'A form model you create in TypeScript, then attach to the template.', analogy: '🏗️ A blueprint built before the walls are connected.' }
  ];

  newsletterComponentCode = `import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter.html'
})
export class NewsletterForm {
  email = '';
  subscribed = false;

  subscribe(form: NgForm) {
    if (form.invalid) return;
    this.subscribed = true;
    form.resetForm();
  }
}`;

  newsletterTemplateCode = `<form #newsletterForm="ngForm" (ngSubmit)="subscribe(newsletterForm)">
  <label>
    Weekly BingeBoard picks
    <input type="email" name="email" [(ngModel)]="email" required email />
  </label>
  <button type="submit" [disabled]="newsletterForm.invalid">Subscribe</button>
</form>`;

  templateValidationCode = `<input
  type="email"
  name="email"
  [(ngModel)]="email"
  #emailField="ngModel"
  required
  email
/>
@if (emailField.invalid && emailField.touched) {
  <p class="field-error">Enter a valid email address.</p>
}`;

  rosettaStoneCode = `// Template-driven: Angular finds the control in the template.
<input name="email" [(ngModel)]="email" #emailField="ngModel" required />

// Reactive: the component creates the control, then the template connects it.
email = new FormControl('', { validators: [Validators.required, Validators.email] });
<input formControlName="email" />

// Both styles expose: value, valid/invalid, errors, touched, dirty.`;
}
