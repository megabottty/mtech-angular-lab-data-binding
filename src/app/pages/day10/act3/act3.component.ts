import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day10-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 10 · Act 3 of 3</span>
        <h1>🎬 Reviews on the Show Page &amp; Debug It</h1>
        <p class="subtitle">Render submitted reviews with &#64;for, hide spoilers behind a reveal, add a one-click quick-fill, then fix three classic reactive-forms bugs.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/forms/reactive-forms#patching-and-resetting-form-values" target="_blank" rel="noopener">Patching and resetting form values</a> — covers exactly what <code>patchValue()</code> does versus a full <code>reset()</code>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Render a form's downstream effect on the page, add a quick-fill convenience button, and recognize the reactive-forms bugs you're most likely to hit yourself.</li>
          <li><strong>Why It Matters:</strong> A form that submits into a black hole isn't finished. Reviews need to actually show up. And every reactive-forms bug below looks like a typo — until you know what to look for, it costs 20 silent minutes.</li>
          <li><strong>Build Steps:</strong> Render <code>reviewsSvc.forShow(id)</code> with <code>&#64;for</code> → add a spoiler reveal toggle → wire a "10/10" quick-fill button with <code>patchValue()</code> → debug three broken snippets.</li>
          <li><strong>Expected Outcome:</strong> You can wire a form's output into a list view, and you can read a broken reactive-forms template and name the exact bug on sight.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Reviews on the Show Page &amp; Debug It)</p>
        <p><strong>Next step:</strong> Student Lab</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <app-lesson-step stepId="d10-act3-showdetail-reviews" [stepNumber]="1" title="Rendering Reviews on the Show Detail Page">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>ShowDetail</code> already knows its show's numeric id (Day 9). Pass it straight to <code>ReviewForm</code>, then read <code>reviewsSvc.forShow(id)</code> to list what's already been posted.</p>
        <app-code-block lang="typescript" [code]="showDetailTsCode" />
        <app-code-block lang="html" [code]="showDetailHtmlCode" />
        <app-collapsible icon="💡" label="Hint — spoilers should hide, not just warn">
          <p>A one-line spoiler warning that still shows the full body underneath isn't really a spoiler guard. Hide <code>review.body</code> behind a per-review toggle, and only reveal it on click.</p>
        </app-collapsible>
        <div class="think-about-it">
          <p class="tai-q">Each review needs its own independent revealed/hidden state. A single <code>signal(false)</code> on the component would only track one review at a time — what tracks "revealed" per review instead?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a Set of revealed review keys">
          <p>Keep a <code>signal(new Set&lt;number&gt;())</code> of revealed indices (or ids, if reviews had them), and toggle membership on click. Each <code>&#64;for</code> iteration checks whether its own index is in that set — independent state per row, from one shared signal.</p>
          <app-code-block lang="typescript" [code]="spoilerToggleCode" />
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Submitting a review makes it appear immediately in the list below the form, and a spoiler review's body stays hidden until you click to reveal it.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d10-act3-quick-10" [stepNumber]="2" title="Quick-Fill — the '10/10, Loved It' Button">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>A quick-fill button doesn't submit anything by itself — it just pre-populates the form so a reviewer can tweak and submit. That's exactly what <code>patchValue()</code> is for: update one or more fields without touching the rest.</p>
        <app-code-block lang="typescript" [code]="quickFillMethodCode" />
        <app-code-block lang="html" [code]="quickFillButtonCode" />
        <app-collapsible icon="🧩" label="Deep Dive — patchValue() vs. setValue()">
          <p><code>patchValue({{ '{' }} rating: 10 {{ '}' }})</code> updates only <code>rating</code>, leaving <code>headline</code>, <code>body</code>, and <code>spoilers</code> exactly as they were. <code>setValue(...)</code> is stricter — it requires every field in the group to be provided, and throws if you omit one. Use <code>patchValue()</code> for partial updates like this button; reach for <code>setValue()</code> only when you deliberately want that all-or-nothing safety net (for example, restoring a complete saved draft).</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking the quick-fill button sets the rating field to 10 without clearing whatever the reviewer already typed into headline or body.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d10-act3-debug" [stepNumber]="3" title="Debug It — Three Bugs Every Reactive Form Meets Once">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>These three look like typos. They compile. They just silently do nothing (or the wrong thing), which makes them worse than a loud error.</p>

        <h4>Bug 1 — formGroup missing brackets</h4>
        <app-code-block lang="html" [code]="bug1Code" />
        <div class="think-about-it">
          <p class="tai-q">This renders without error. Why does the form never actually connect to <code>reviewForm</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a string literal, not a property binding">
          <p>Without square brackets, <code>formGroup="reviewForm"</code> is a plain HTML attribute holding the literal text <code>"reviewForm"</code> — not a binding to the component property of the same name. Angular's <code>FormGroupDirective</code> expects a property binding, <code>[formGroup]</code>, so it can receive the actual <code>FormGroup</code> object. Without the brackets, the directive never receives a real form group, and every <code>formControlName</code> inside it fails to find a parent group to attach to.</p>
          <app-code-block lang="html" [code]="bug1FixCode" />
        </app-collapsible>

        <h4 style="margin-top: 16px;">Bug 2 — raw (submit) instead of (ngSubmit)</h4>
        <app-code-block lang="html" [code]="bug2Code" />
        <div class="think-about-it">
          <p class="tai-q">Clicking "Post review" refreshes the whole page. What's missing?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — (ngSubmit) calls preventDefault() for you">
          <p>The native browser <code>(submit)</code> event does what forms have done since before JavaScript existed: navigates the page, reloading it (or navigating to the form's <code>action</code> URL, if one is set). Angular's <code>(ngSubmit)</code> event is a directive-level wrapper around that native event that automatically calls <code>preventDefault()</code>, so your handler runs and the page stays put. Always bind <code>(ngSubmit)</code> on Angular forms, never raw <code>(submit)</code>.</p>
          <app-code-block lang="html" [code]="bug2FixCode" />
        </app-collapsible>

        <h4 style="margin-top: 16px;">Bug 3 — [formControlName] wrongly bound with brackets</h4>
        <app-code-block lang="html" [code]="bug3Code" />
        <div class="think-about-it">
          <p class="tai-q">TypeScript compiles this fine, but the app throws at runtime. What is Angular actually trying to do with <code>[formControlName]="rating"</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — it looks for a component property named rating">
          <p><code>formControlName</code> expects a plain string attribute naming the control — <code>formControlName="rating"</code> — matching a key in the parent <code>FormGroup</code>. Wrapping it in brackets, <code>[formControlName]="rating"</code>, turns it into a property binding that evaluates <code>rating</code> as a template expression — meaning Angular looks for a property called <code>rating</code> on the component class itself, not the form. Since no such property exists, this throws a runtime error rather than silently doing nothing.</p>
          <app-code-block lang="html" [code]="bug3FixCode" />
        </app-collapsible>

        <div class="warning-box">All three of these compile without a single TypeScript error. Reactive forms bugs are template bugs — the fix is always reading the failing directive's actual API, not guessing at bracket syntax.</div>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name each of these three bugs on sight and explain, in one sentence each, why the incorrect syntax compiles but doesn't work.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day10/act2" class="btn-secondary">← Act 2: Building the Review Form</a>
        <a routerLink="/day10/lab" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: '@for over forShow(id)',
      plainEnglish: 'Render every review already submitted for this show.',
      analogy: '📚 Reading every entry already written in a shared guestbook.'
    },
    {
      concept: 'Spoiler reveal',
      plainEnglish: 'Hide a review body behind a per-row click-to-reveal toggle.',
      analogy: '🙈 A spoiler tag on a forum post you have to click to expand.'
    },
    {
      concept: 'patchValue()',
      plainEnglish: 'Update one or more fields on a form, leaving the rest untouched.',
      analogy: '✏️ Correcting one line on a filled-out form instead of starting over.'
    },
    {
      concept: '(ngSubmit)',
      plainEnglish: 'Angular submit event that calls preventDefault() for you.',
      analogy: '🛑 A doorstop that quietly stops the page from slamming shut on submit.'
    }
  ];

  showDetailTsCode = `import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowsService } from '../../services/shows';
import { WatchlistService } from '../../services/watchlist';
import { ReviewsService } from '../../services/reviews';
import { ReviewForm } from '../../review-form/review-form';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink, ReviewForm],
  templateUrl: './show-detail.html'
})
export class ShowDetail {
  id = input.required<string>();

  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);
  private reviewsSvc = inject(ReviewsService);

  show = computed(() => this.showsSvc.byId(Number(this.id())));
  reviews = computed(() => this.reviewsSvc.forShow(Number(this.id()))());
}`;

  showDetailHtmlCode = `@if (show(); as selected) {
  <h1>{{ selected.name }}</h1>

  <app-review-form [showId]="selected.id" />

  <h2>Reviews</h2>
  @if (reviews().length === 0) {
    <p>No reviews yet — be the first!</p>
  } @else {
    @for (review of reviews(); track review.createdAt) {
      <article class="review-card">
        <p>⭐ {{ review.rating }}/10 — <strong>{{ review.headline }}</strong></p>
        @if (review.spoilers) {
          <p><em>Contains spoilers.</em> <button type="button">Reveal review</button></p>
        } @else {
          <p>{{ review.body }}</p>
        }
      </article>
    }
  }
}`;

  spoilerToggleCode = `revealed = signal(new Set<number>());

isRevealed(index: number) {
  return this.revealed().has(index);
}

reveal(index: number) {
  this.revealed.update(current => new Set(current).add(index));
}`;

  quickFillMethodCode = `quickFillTen() {
  this.reviewForm.patchValue({ rating: 10 });
}`;

  quickFillButtonCode = `<button type="button" (click)="quickFillTen()">10/10, loved it</button>`;

  bug1Code = `<!-- Bug 1: missing brackets -->
<form formGroup="reviewForm" (ngSubmit)="submit()">
  <input formControlName="headline" />
</form>`;

  bug1FixCode = `<form [formGroup]="reviewForm" (ngSubmit)="submit()">
  <input formControlName="headline" />
</form>`;

  bug2Code = `<!-- Bug 2: raw (submit), not (ngSubmit) -->
<form [formGroup]="reviewForm" (submit)="submit()">
  <input formControlName="headline" />
  <button type="submit">Post review</button>
</form>`;

  bug2FixCode = `<form [formGroup]="reviewForm" (ngSubmit)="submit()">
  <input formControlName="headline" />
  <button type="submit">Post review</button>
</form>`;

  bug3Code = `<!-- Bug 3: formControlName wrongly bound with brackets -->
<form [formGroup]="reviewForm" (ngSubmit)="submit()">
  <input type="number" [formControlName]="rating" />
</form>`;

  bug3FixCode = `<form [formGroup]="reviewForm" (ngSubmit)="submit()">
  <input type="number" formControlName="rating" />
</form>`;
}
