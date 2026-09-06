import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day10-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 10 · Act 2 of 3</span>
        <h1>🧾 Building the Review Form</h1>
        <p class="subtitle">A Review model, a signal-based ReviewsService, and a real ReviewForm component wired with FormBuilder, [formGroup], and formControlName.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms/reactive-forms" target="_blank" rel="noopener">Reactive forms guide</a> — the "Creating a form model" and "Saving form data" sections map directly onto today's build.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build a complete, working reactive form end to end — model, service, form component, and submit handling.</li>
          <li><strong>Why It Matters:</strong> Every reactive form you'll ever write follows this exact shape: a data model, somewhere to store submitted data, a <code>FormBuilder</code> group, and a submit handler that reads it. Learn the shape once here.</li>
          <li><strong>Build Steps:</strong> Define the <code>Review</code> interface and <code>ReviewsService</code> → scaffold <code>ReviewForm</code> with <code>FormBuilder</code> → wire <code>[formGroup]</code>/<code>formControlName</code>/<code>(ngSubmit)</code> in the template → read the submitted value with <code>getRawValue()</code> and reset.</li>
          <li><strong>Expected Outcome:</strong> You can submit a review from the form, see it land in the service's signal, and watch the form clear itself back to its defaults.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Building the Review Form)</p>
        <p><strong>Next step:</strong> Act 3 (Wiring Reviews into Show Detail &amp; Debug It)</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <app-lesson-step stepId="d10-act2-review-model-service" [stepNumber]="1" title="The Review Model &amp; ReviewsService">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Every review needs to know which show it belongs to, its rating, a short headline, a longer body, whether it contains spoilers, and when it was posted.</p>
        <app-code-block lang="typescript" [code]="reviewModelCode" />
        <p style="margin-top: 12px;">The service that owns all submitted reviews looks exactly like the other signal-based services you've built since Day 7 — a private writable signal, a readonly public view, and a <code>computed()</code> for the one lookup the app actually needs: reviews for a specific show.</p>
        <app-code-block lang="typescript" [code]="reviewsServiceCode" />
        <app-collapsible icon="🧩" label="Deep Dive — why forShow as a factory, not a plain computed()?">
          <p><code>forShow(showId)</code> returns a new <code>computed()</code> each time it's called, parameterized by the id passed in. This is the same pattern you'd use for any per-item derived signal — it's how <code>ShowsService.byId(id)</code> works too, except <code>byId</code> returns a plain value while <code>forShow</code> returns a reactive signal that a template can bind to directly.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Why does <code>add()</code> take the full <code>Review</code> object instead of just the four form fields?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the service shouldn't know about the form">
          <p>Because the service's job is to store reviews, not to know anything about how a review was created. If <code>add()</code> only accepted the four form fields, the service would be coupled to <code>ReviewForm</code>'s specific shape — and any future caller (an admin tool, a seed script, a different form) would need the exact same fields. Instead, <code>ReviewForm</code> is responsible for turning its own raw values into a complete <code>Review</code> — including <code>showId</code> and <code>createdAt</code> — before calling <code>add()</code>. The service just stores what it's handed.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why <code>add()</code> accepts a complete <code>Review</code>, not raw form values.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d10-act2-reviewform-init" [stepNumber]="2" title="ReviewForm — Scaffolding with FormBuilder">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>ReviewForm</code> needs to know which show it's reviewing. Since it's rendered inside <code>ShowDetail</code>, that arrives as a required input — same pattern as every <code>input.required&lt;T&gt;()</code> you've written since Day 5.</p>
        <app-code-block lang="typescript" [code]="reviewFormScaffoldCode" />
        <div class="info-box">
          <strong>Why <code>rating: 8</code> as the default?</strong> Reviews rarely start from zero in real products — a neutral-to-positive default (here, 8 out of 10) reduces friction for a reviewer who already liked the show enough to bother writing something.
        </div>
        <app-collapsible icon="💡" label="Hint — showId is a number here, not a route param string">
          <p><code>ShowDetail</code>'s own <code>id</code> input is a route-param string (Day 9). By the time it's passed down to <code>ReviewForm</code>, convert it to a number first — <code>ReviewForm</code>'s <code>showId</code> input should be typed <code>number</code>, matching <code>Review.showId</code>.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can scaffold a <code>FormBuilder</code>-based form component that receives a required input and builds a typed, non-nullable <code>FormGroup</code> in its constructor scope.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d10-act2-submit-reset" [stepNumber]="3" title="Wiring the Template &amp; Reading Submitted Data">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>Three bindings make a reactive form work in a template: <code>[formGroup]</code> on the <code>&lt;form&gt;</code> element to attach the whole group, <code>formControlName</code> on each field to attach one control, and <code>(ngSubmit)</code> to run your handler instead of letting the browser reload the page.</p>
        <app-code-block lang="html" [code]="reviewFormTemplateCode" />
        <p style="margin-top: 12px;"><code>ReactiveFormsModule</code> is what makes <code>[formGroup]</code> and <code>formControlName</code> exist as directives at all — without it in the component's <code>imports</code> array, both attributes are silently ignored.</p>
        <app-code-block lang="typescript" [code]="reactiveFormsModuleImportCode" />
        <p style="margin-top: 12px;">On submit, <code>getRawValue()</code> reads every field's current value — including any disabled controls, which the plain <code>.value</code> getter would silently skip. Build a full <code>Review</code> from it, hand it to the service, then reset the form back to its defaults.</p>
        <app-code-block lang="typescript" [code]="submitMethodCode" />
        <app-collapsible icon="🧩" label="Deep Dive — .value vs .getRawValue()">
          <p>They agree on enabled controls. They diverge the moment any control is disabled: <code>.value</code> omits disabled controls entirely (useful when a disabled field genuinely shouldn't be submitted), while <code>.getRawValue()</code> always includes every control's current value regardless of disabled state. For this form, nothing starts disabled, so today the two behave identically — but reaching for <code>getRawValue()</code> by habit avoids a subtle bug the day you do add a disabled field (the Lab's stretch task adds exactly one).</p>
        </app-collapsible>
        <p style="margin-top: 12px;">A live JSON preview of the form's current value is a genuinely useful debugging habit while building any reactive form — drop it above or below the fields and delete it before shipping.</p>
        <app-code-block lang="html" [code]="jsonPreviewCode" />
        <div class="think-about-it">
          <p class="tai-q"><code>reviewForm.reset()</code> with no arguments — does it clear every field to empty, or back to the original defaults (rating 8, spoilers false)?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — back to the original defaults, because of nonNullable">
          <p>Back to the original defaults. This is exactly what <code>fb.nonNullable.group(...)</code> from Act 1 was for: a non-nullable group's <code>.reset()</code> restores each control to the initial value it was constructed with, not <code>null</code> or empty. A plain <code>fb.group(...)</code> (without <code>nonNullable</code>) would instead reset every control to <code>null</code> — which is rarely what you want for a rating field that should default back to 8, not disappear.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Submitting the form adds a review to the service's signal, and the form visibly clears back to rating 8 with empty text fields — not a blank/null state.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day10/act1" class="btn-secondary">← Act 1: Two Philosophies</a>
        <a routerLink="/day10/act3" class="btn-primary">Act 3: Wiring Reviews into Show Detail →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'Review',
      plainEnglish: 'The shape of one submitted review — what a form must produce.',
      analogy: '🧾 A receipt template — every field it prints has to come from somewhere.'
    },
    {
      concept: 'ReviewsService',
      plainEnglish: 'The single source of truth for every review ever submitted, keyed by show.',
      analogy: '🗄️ A filing cabinet, one drawer per show, that any component can open.'
    },
    {
      concept: '[formGroup] / formControlName',
      plainEnglish: 'Attach a whole form group to a <form>, then attach one control per field.',
      analogy: '🔌 A power strip ([formGroup]) with individually labeled outlets (formControlName).'
    },
    {
      concept: 'getRawValue()',
      plainEnglish: 'Read every field values, including disabled ones.',
      analogy: '📋 Taking a full snapshot of a clipboard, even the sections someone grayed out.'
    }
  ];

  reviewModelCode = `export interface Review {
  showId: number;
  rating: number;
  headline: string;
  body: string;
  spoilers: boolean;
  createdAt: Date;
}`;

  reviewsServiceCode = `import { Injectable, signal, computed } from '@angular/core';
import { Review } from '../models/review';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private reviews = signal<Review[]>([]);

  readonly all = this.reviews.asReadonly();

  forShow(showId: number) {
    return computed(() => this.reviews().filter(r => r.showId === showId));
  }

  add(review: Review) {
    this.reviews.update(current => [...current, review]);
  }
}`;

  reviewFormScaffoldCode = `import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReviewsService } from '../../services/reviews';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.html'
})
export class ReviewForm {
  showId = input.required<number>();

  private fb = inject(FormBuilder);
  private reviewsSvc = inject(ReviewsService);

  reviewForm = this.fb.nonNullable.group({
    rating: 8,
    headline: '',
    body: '',
    spoilers: false
  });
}`;

  reviewFormTemplateCode = `<form [formGroup]="reviewForm" (ngSubmit)="submit()">
  <label>
    Rating (0-10)
    <input type="number" formControlName="rating" min="0" max="10" />
  </label>

  <label>
    Headline
    <input type="text" formControlName="headline" placeholder="Sum it up in one line" />
  </label>

  <label>
    Full review
    <textarea formControlName="body" rows="4" placeholder="What did you think?"></textarea>
  </label>

  <label class="checkbox-row">
    <input type="checkbox" formControlName="spoilers" />
    Contains spoilers
  </label>

  <button type="submit">Post review</button>
</form>`;

  reactiveFormsModuleImportCode = `import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],   // ← required for [formGroup] / formControlName
  templateUrl: './review-form.html'
})
export class ReviewForm { /* ... */ }`;

  submitMethodCode = `submit() {
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
}`;

  jsonPreviewCode = `<!-- Handy while building; delete before shipping -->
<pre>{{ reviewForm.value | json }}</pre>`;
}
