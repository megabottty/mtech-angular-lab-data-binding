import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day10-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 10 · Act 1 of 3</span>
        <h1>📝 Reactive Forms I: Two Philosophies</h1>
        <p class="subtitle">You've been writing forms since Day 4's <code>[(ngModel)]</code> filter box. Today you meet the other approach — and the primitives underneath it.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> get today's starter running first — <a routerLink="/day10/start">Day 10 · Starting Point</a>.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms" target="_blank" rel="noopener">Angular Forms overview</a> — the "Choosing an approach" section covers exactly what this act builds a mental model for.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Explain why Angular ships two form styles, and build the primitives (<code>FormControl</code>, <code>FormGroup</code>) that reactive forms are made of before reaching for the shortcut that hides them.</li>
          <li><strong>Why It Matters:</strong> A review form has four fields, validation, a submit action, and a reset — trying to hold all of that in template-bound signals gets unwieldy fast. Reactive forms move that complexity into a typed object in TypeScript, where it's easier to test and reason about.</li>
          <li><strong>Build Steps:</strong> Compare template-driven vs. reactive side by side → build a <code>FormGroup</code> from raw <code>FormControl</code>s by hand → meet <code>FormBuilder</code>, the shortcut you'll actually use.</li>
          <li><strong>Expected Outcome:</strong> You can explain, in your own words, when you'd reach for <code>[(ngModel)]</code> and when you'd reach for a <code>FormGroup</code> — and you understand what <code>FormBuilder</code> is a shortcut for, not just how to type it.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Two Philosophies)</p>
        <p><strong>Next step:</strong> Act 2 (Building the Review Form)</p>
        <p><strong>Time:</strong> About 20 minutes.</p>
      </section>

      <app-lesson-step stepId="d10-act1-td-vs-reactive" [stepNumber]="1" title="Template-Driven vs. Reactive — Two Philosophies, One Set of Problems">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Angular ships two ways to build forms, and you've already used one. Day 4's genre filter used <code>[(ngModel)]</code> — that's <strong>template-driven forms</strong>. The form's state lives implicitly in the template; Angular wires it up behind the scenes via directives.</p>
        <app-code-block lang="html" [code]="templateDrivenExample" />
        <p style="margin-top: 12px;"><strong>Reactive forms</strong> flip that: you build the form's state explicitly in TypeScript first, as a tree of typed objects, and the template just binds to it.</p>
        <app-code-block lang="typescript" [code]="reactiveIntroExample" />
        <div class="think-about-it">
          <p class="tai-q">Both approaches end up calling <code>reviewsSvc.add(...)</code> with the same data. So what's actually different?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — where the state lives, and who owns validity">
          <p>With <code>[(ngModel)]</code>, each field's state is a separate signal or property, and Angular's directives quietly synchronize it with the DOM. There's no single object representing "the form" — you'd have to assemble one yourself in <code>onSubmit()</code>.</p>
          <p style="margin-top: 8px;">With reactive forms, <code>reviewForm</code> is a real object that exists before the template even renders. It has a shape (<code>{{ '{' }} rating, headline, body, spoilers {{ '}' }}</code>), a validity state, and methods like <code>.reset()</code>, <code>.patchValue()</code>, and <code>.getRawValue()</code> — all callable from TypeScript, all testable without touching the DOM. That's the real tradeoff: template-driven is faster to write for one or two fields; reactive scales better once you have several fields, validation rules, and logic that needs to run outside a template.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can describe, without looking it up, where a reactive form's state actually lives versus a template-driven form's state.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d10-act1-formgroup-formcontrol" [stepNumber]="2" title="FormGroup &amp; FormControl — the Primitives, Built by Hand">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Before reaching for the shortcut, build one <code>FormGroup</code> the long way — with <code>new FormControl(...)</code> for every field. Seeing the raw primitives once makes the shortcut in Step 3 make sense instead of feeling like magic.</p>
        <app-code-block lang="typescript" [code]="byHandExample" />
        <p style="margin-top: 12px;">A <code>FormControl</code> tracks one field's current value and validity. A <code>FormGroup</code> is a labeled folder that holds several related controls together, so you can read or reset the whole shape at once instead of field by field.</p>
        <app-collapsible icon="🧩" label="Deep Dive — why does FormControl need a generic type at all?">
          <p><code>FormControl&lt;number&gt;</code> tells TypeScript what <code>.value</code> will be. Without it, older Angular form APIs inferred <code>any</code> or a nullable type, which meant every read of <code>.value</code> needed a null check even when you knew the field always had a starting value. Typed forms close that gap.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Writing <code>new FormControl(...)</code> for every one of four fields felt repetitive. Is there a shorter way?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — yes, that's exactly what FormBuilder is for">
          <p>Yes — and that repetition is the entire reason <code>FormBuilder</code> exists. It's a small injectable service with a <code>.group(...)</code> method that builds the same <code>FormGroup</code> of <code>FormControl</code>s from a plain object literal, with far less boilerplate. Next step builds the same form again using it.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can construct a <code>FormGroup</code> from raw <code>FormControl</code> instances and explain what each one is responsible for.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d10-act1-formbuilder" [stepNumber]="3" title="FormBuilder — the Shortcut You'll Actually Use">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>FormBuilder</code> is an injectable service. Its <code>.group(...)</code> method takes a plain object of initial values and returns the exact same kind of <code>FormGroup</code> you built by hand in Step 2 — just without typing <code>new FormControl(...)</code> for every field.</p>
        <app-code-block lang="typescript" [code]="formBuilderExample" />
        <p style="margin-top: 12px;">Notice <code>fb.nonNullable</code>. A plain <code>fb.group({{ '{' }} rating: 8 {{ '}' }})</code> types <code>rating</code> as <code>number | null</code>, because <code>.reset()</code> can, in principle, reset a control to <code>null</code>. <code>fb.nonNullable.group(...)</code> tells Angular "reset should go back to the initial value, not null" — which matches how this review form actually behaves, and keeps every field's type free of an unwanted <code>| null</code>.</p>
        <app-collapsible icon="💡" label="Hint — where does FormBuilder come from?">
          <p>It's part of <code>&#64;angular/forms</code>, injected the same way you've injected every other service since Day 7: <code>private fb = inject(FormBuilder);</code>. No module import beyond <code>ReactiveFormsModule</code> in the component's own <code>imports</code> array (Act 2 wires that up).</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">If <code>FormBuilder</code> just saves you from typing <code>new FormControl(...)</code>, why not always build forms by hand instead of learning a second API?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the shortcut compounds as forms grow">
          <p>On a two-field form the savings look small. But most real forms have five, ten, or more fields, often with validators attached to several of them. <code>FormBuilder</code>'s object-literal syntax stays flat and readable at any size, while the hand-built version grows one <code>new FormControl(...)</code> line per field. You still need to understand <code>FormControl</code>/<code>FormGroup</code> underneath — that's what makes the shortcut's behavior predictable — but in day-to-day code, reach for <code>FormBuilder</code>.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can build a typed, non-nullable <code>FormGroup</code> with <code>FormBuilder</code> and explain what <code>nonNullable</code> changes about <code>.reset()</code>.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day10/start" class="btn-secondary">← Starting Point</a>
        <a routerLink="/day10/act2" class="btn-primary">Act 2: Building the Review Form →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'Template-driven forms',
      plainEnglish: 'Form state lives in the template, via [(ngModel)].',
      analogy: '🖊️ Filling out a paper form by hand — the answers exist only on the page.'
    },
    {
      concept: 'Reactive forms',
      plainEnglish: 'Form state is a typed object built in TypeScript; the template just binds to it.',
      analogy: '💻 A digital form where every answer already lives in a database record — the screen just displays it.'
    },
    {
      concept: 'FormGroup',
      plainEnglish: 'A labeled folder holding several related form controls together.',
      analogy: '🗂️ A manila folder holding several related forms clipped together.'
    },
    {
      concept: 'FormBuilder',
      plainEnglish: 'A shorthand factory for building a FormGroup without new FormControl(...) everywhere.',
      analogy: '🏭 An assembly line that stamps out labeled dials instead of wiring each one by hand.'
    }
  ];

  templateDrivenExample = `<!-- Day 4's genre filter — template-driven -->
<input [(ngModel)]="genreFilter" placeholder="Filter by genre" />

<p>Showing shows matching: {{ genreFilter() }}</p>`;

  reactiveIntroExample = `// Reactive forms — the state exists in TypeScript first
reviewForm = this.fb.nonNullable.group({
  rating: 8,
  headline: '',
  body: '',
  spoilers: false
});

// The template just binds to it:
// <form [formGroup]="reviewForm" (ngSubmit)="submit()">`;

  byHandExample = `import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  reviewForm = new FormGroup({
    rating: new FormControl<number>(8, { nonNullable: true }),
    headline: new FormControl<string>('', { nonNullable: true }),
    body: new FormControl<string>('', { nonNullable: true }),
    spoilers: new FormControl<boolean>(false, { nonNullable: true })
  });
}`;

  formBuilderExample = `import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  private fb = inject(FormBuilder);

  reviewForm = this.fb.nonNullable.group({
    rating: 8,
    headline: '',
    body: '',
    spoilers: false
  });
}`;
}
