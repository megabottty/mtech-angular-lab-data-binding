import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day10-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Reviews Across the Catalog</h1>
        <p class="subtitle">
          About 50 minutes. 4 tasks. Post reviews to more than one show, ship an empty state, add a
          recommend quick-fill, and count characters live — then a stretch task on disabling the submit
          button while the form is invalid.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Get the end-of-Day-10-Acts BingeBoard working before starting — <a routerLink="/day10/start">Day 10 · Starting Point</a>
          plus a working <code>ReviewForm</code> wired into <code>ShowDetail</code>, posting into a
          <code>ReviewsService</code> signal and rendering back out with <code>&#64;for</code>. If that isn't
          working yet, finish Act 3 first — this lab builds directly on top of it.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Prove the review pipeline generalizes across every show in the catalog, and round it out with
            the small UX details every real form needs — empty states, quick-fills, and live feedback.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            A form that works for one hardcoded show isn't finished; every review lives on a specific show,
            and your data needs to stay correctly partitioned as reviewers move around the app.
          </li>
          <li>
            <strong>Build Steps:</strong>
            post reviews across shows → empty-state UX → a second quick-fill button → live character count →
            stretch: disable submit while invalid.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            You can independently extend a reactive form with realistic product requirements, without a
            worked example in front of you for each one.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 10 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> Task 1 is about 10 minutes. Task 2 is about 10 minutes. Task 3 is about 10 minutes. Task 4 is about 10 minutes. The stretch task is optional; skip it if you're short on time.</p>
      </section>

      <app-lesson-step
        stepId="d10-lab-post-across-shows"
        [stepNumber]="'Task 1'"
        title="Post Reviews Across Shows"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: computed() filtering by id, verifying data partitioning.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Visit three different shows and post one review to each. Confirm every show's detail page only
          ever shows its own reviews — never another show's — and that navigating away and back doesn't
          lose anything (the signal lives in a root service, so it shouldn't).
        </p>

        <div class="think-about-it">
          <p class="tai-q">If two reviews have the same <code>showId</code> by mistake — say, a copy-paste bug in <code>ReviewForm</code> hardcoded <code>showId: 1</code> — how would you notice, just from using the app?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a review appears on the wrong show's page">
          <p>You'd post a review while looking at, say, "Bluey," then navigate to a different show and see that same review sitting under its reviews instead — or worse, under both. The symptom always shows up as data appearing where it shouldn't, on the read side, even though the bug lives in the write side (the form). This is exactly why Task 1 asks you to test with three real shows, not one.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Navigate to three different shows using prev/next or Browse.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Post one distinct review per show.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Confirm each show's page shows only its own reviews.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Three shows, three separate review lists, no cross-contamination
          — proving <code>forShow(id)</code> filters correctly for every id, not just the one you tested first.
        </div>

        <app-collapsible icon="💡" label="Hint — showId must come from the input, never hardcoded">
          <p>
            <code>ReviewForm</code>'s <code>submit()</code> should always read <code>this.showId()</code> — the
            input signal passed down from <code>ShowDetail</code> — never a literal number typed during testing.
          </p>
          <app-code-block lang="typescript" [code]="task1Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <p>There's no new code to write here beyond what Acts 2-3 already built — this task is a verification
          pass. If reviews leak across shows, the bug is almost always a hardcoded <code>showId</code> somewhere
          in <code>submit()</code>.</p>
          <app-code-block lang="typescript" [code]="task1Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d10-lab-empty-state"
        [stepNumber]="'Task 2'"
        title="Empty State — Before Anyone Has Reviewed"
      >
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: &#64;if/&#64;else, empty-state UX.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A show with zero reviews should never render a blank space where the list would be. Ship a clear,
          friendly empty state instead — "No reviews yet — be the first!" — so a first-time visitor
          understands the section is working, just unused.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Where's the safest place to put this &#64;if/&#64;else check — inside ShowDetail's template, or inside ReviewsService?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the template, because it's a rendering concern">
          <p>Inside the template. Whether to show a message versus a list is a presentation decision, not a
          data-storage decision — <code>ReviewsService</code> shouldn't know or care how its data gets displayed.
          Keep the service returning a plain (possibly empty) array, and let the component template branch on
          its length.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Check <code>reviews().length === 0</code> in the template.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Render the friendly empty-state message in that branch.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Verify a fresh show (or one you haven't reviewed yet) shows the message, and it disappears the instant you submit a review.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every show with no reviews shows a clear, friendly message instead
          of empty space, and that message disappears the moment the first review lands.
        </div>

        <app-collapsible icon="💡" label="Hint — you likely already wrote most of this in Act 3">
          <p>
            Act 3's Step 1 code sample already branches on <code>reviews().length === 0</code>. If yours
            doesn't yet, add the branch now.
          </p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="html" [code]="task2Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d10-lab-recommend-patch"
        [stepNumber]="'Task 3'"
        title="Recommend — a Second Quick-Fill Button"
      >
        <div class="task-meta">
          <span class="difficulty medium">🟡 Easy-Medium</span>
          <span class="concepts">Concepts: patchValue() with multiple fields at once.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a second quick-fill button, "👍 Recommend," next to the "10/10, loved it" button from Act 3.
          Clicking it should <code>patchValue()</code> both <code>rating</code> and <code>headline</code> at
          once — say, a rating of 9 and a headline of "Highly recommend" — while leaving <code>body</code> and
          <code>spoilers</code> exactly as the reviewer left them.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Can one patchValue() call update two fields at the same time, or do you need two separate calls?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — one call, one object with both keys">
          <p><code>patchValue()</code> accepts a partial object of the form's shape — pass as many or as few keys as you want in a single call. Two separate calls would work too, but they're two separate change-detection-triggering updates instead of one; prefer the single-object form.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a <code>recommendPreset()</code> method calling <code>patchValue()</code> with both fields.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add the button next to the existing quick-fill button.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Confirm clicking it never clears anything the reviewer already typed into body.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Clicking "Recommend" sets both rating and headline in one click,
          without disturbing body or spoilers.
        </div>

        <app-collapsible icon="💡" label="Hint — mirror Act 3's quickFillTen() shape">
          <p>Same shape as <code>quickFillTen()</code>, just with two keys in the object instead of one.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" [code]="task3Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d10-lab-char-count"
        [stepNumber]="'Task 4'"
        title="Live Character Count"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: reading a FormControl's live value directly in a template.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Under the headline field, show a live "12/60 characters" style counter as the reviewer types. Pick a
          reasonable max (60 for headline works well) and update the count on every keystroke, no extra
          plumbing required.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Do you need a signal or an RxJS subscription to make this update live, or can the template just read the control directly?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — read the control directly; Angular re-checks on every keystroke">
          <p>You don't need either. Every keystroke fires a DOM input event, and Angular runs change detection after every event by default — so a template expression like <code>reviewForm.controls.headline.value.length</code> re-evaluates and re-renders on its own, with no signal or subscription needed. That's a genuinely nice property of reactive forms: the control tree is always readable directly from the template.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a small counter element under the headline input.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Read <code>reviewForm.controls.headline.value.length</code> directly in the template.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Style it red (or similar) once the count exceeds your chosen max, as a soft warning.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Typing into the headline field updates a live character count on
          every keystroke, with no extra signals or subscriptions.
        </div>

        <app-collapsible icon="💡" label="Hint — .controls gives you typed access to each field">
          <p><code>reviewForm.controls.headline</code> is itself a <code>FormControl&lt;string&gt;</code> — its
          <code>.value</code> is always the current string, live.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <app-code-block lang="html" [code]="task4Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d10-lab-stretch-disable-button"
        [stepNumber]="'Stretch'"
        title="Stretch — Disable Submit While Invalid"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: Validators, form.invalid, [disabled] binding.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Right now, nothing stops a reviewer from submitting a completely empty headline and body. Add
          <code>Validators.required</code> to both, and <code>Validators.min(0)</code>/<code>Validators.max(10)</code>
          to rating. Then bind the submit button's <code>[disabled]</code> to <code>reviewForm.invalid</code>,
          so it's unclickable until the form actually qualifies.
        </p>

        <div class="think-about-it">
          <p class="tai-q">If the submit button is disabled, do you still need the getRawValue()/reset() logic inside submit() to guard against invalid data?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — yes, disabling the button is UX, not a security boundary">
          <p>
            Yes. Disabling the button prevents a normal mouse click, but it doesn't prevent <code>submit()</code>
            from being called some other way — pressing Enter in certain browsers, a future keyboard shortcut,
            or a test calling the method directly. Treat <code>[disabled]</code> as a UX affordance that guides
            the reviewer, not as your only validation guard; a defensive <code>if (this.reviewForm.invalid) return;</code>
            at the top of <code>submit()</code> costs one line and closes that gap.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Import <code>Validators</code> from <code>&#64;angular/forms</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Attach <code>Validators.required</code> to headline and body, and min/max to rating.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Bind <code>[disabled]="reviewForm.invalid"</code> on the submit button.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Add the one-line defensive guard at the top of <code>submit()</code> too.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> The submit button stays disabled until headline, body, and a
          valid rating are all filled in, and <code>submit()</code> refuses to run on invalid data even if
          called some other way.
        </div>

        <app-collapsible icon="✅" label="Show Full Answer — Stretch">
          <app-code-block lang="typescript" [code]="stretchAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day10/act3" class="btn-secondary">← Act 3: Reviews on the Show Page &amp; Debug It</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> A working ReviewForm posts into a signal-based ReviewsService, visible immediately below the form</li>
          <li><span class="checkbox">✅</span> Reviews stay correctly partitioned by show across the whole catalog</li>
          <li><span class="checkbox">✅</span> A clean empty state, two quick-fill buttons, and a live character count</li>
          <li><span class="checkbox">✅</span> You can name all three classic reactive-forms bugs from Act 3 on sight</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 10: Reactive Forms I. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Explain the tradeoff between template-driven and reactive forms.</li>
          <li>✅ Build a typed, non-nullable FormGroup with FormBuilder.</li>
          <li>✅ Wire [formGroup], formControlName, and (ngSubmit) correctly in a template.</li>
          <li>✅ Read submitted data with getRawValue(), and reset a form back to its real defaults.</li>
          <li>✅ Use patchValue() for partial updates without disturbing the rest of a form.</li>
          <li>✅ Recognize the three most common reactive-forms bugs on sight, before running the app.</li>
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
export class Day10LabComponent {
  task1Hint = `submit() {
  const raw = this.reviewForm.getRawValue();
  this.reviewsSvc.add({
    showId: this.showId(),   // ← always the input, never a hardcoded number
    ...raw,
    createdAt: new Date()
  });
  this.reviewForm.reset();
}`;

  task1Answer = `submit() {
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

  task2Answer = `@if (reviews().length === 0) {
  <p class="empty-state">No reviews yet — be the first!</p>
} @else {
  @for (review of reviews(); track review.createdAt) {
    <article class="review-card">
      <p>⭐ {{ review.rating }}/10 — <strong>{{ review.headline }}</strong></p>
    </article>
  }
}`;

  task3Answer = `recommendPreset() {
  this.reviewForm.patchValue({
    rating: 9,
    headline: 'Highly recommend'
  });
}`;

  task4Answer = `<label>
  Headline
  <input type="text" formControlName="headline" maxlength="60" />
</label>
<p
  class="char-count"
  [class.over-limit]="reviewForm.controls.headline.value.length > 60"
>
  {{ reviewForm.controls.headline.value.length }}/60 characters
</p>`;

  stretchAnswer = `import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
    rating: [8, [Validators.min(0), Validators.max(10)]],
    headline: ['', Validators.required],
    body: ['', Validators.required],
    spoilers: false
  });

  submit() {
    if (this.reviewForm.invalid) return;   // defensive guard, not the only line of defense

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
}

/* Template: */
// <button type="submit" [disabled]="reviewForm.invalid">Post review</button>`;
}
