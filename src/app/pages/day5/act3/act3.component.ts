import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day5-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 5 · Act 3 of 3</span>
        <h1>🔄 Two-Way with model(), and Debug It</h1>
        <p class="subtitle">When a value genuinely belongs to both sides, you don't need an input and an output — you need a model.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/signals/model" target="_blank" rel="noopener">Signals → Model inputs</a> — a writable input that emits its own change event.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build a two-way-bindable child component with <code>model()</code>, and debug the three classic component-communication mistakes.</li>
          <li><strong>Why It Matters:</strong> Every custom form control you'll ever write — a star rating, a toggle, a colour picker — is a <code>model()</code>. And the debugging patterns here are the ones you'll hit in your own code first.</li>
          <li><strong>Build Steps:</strong> Write the input+output pair the long way → collapse it into <code>model()</code> → build a <code>RatingStars</code> component → fix three broken snippets.</li>
          <li><strong>Expected Outcome:</strong> A <code>RatingStars</code> child that a parent binds with <code>[(rating)]</code>, plus fixed versions of all three debug snippets.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (model() and Debug It)</p>
        <p><strong>Next step:</strong> The Day 5 Lab</p>
        <p><strong>Time:</strong> About 40 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d5-act3-long-way" [stepNumber]="1" title="The Long Way — An Input and an Output That Pair Up">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Suppose the card lets you set your own personal rating for a show, and the parent needs to
          know about it. With only Acts 1 and 2, you'd write both halves by hand:
        </p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="longWayCode" />

        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="longWayParentCode" />

        <p style="margin-top: 12px;">
          It works. It's also four moving parts for one value, and the naming has to line up exactly:
          the output must be named <code>&lt;inputName&gt;Change</code> or nothing special happens.
        </p>

        <div class="think-about-it">
          <p class="tai-q">You've written that <code>[myRating]</code> + <code>(myRatingChange)</code> pair before, in a different form. Where?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — that's exactly what [(ngModel)] is">
          <p>
            Day 4's "banana in a box" — <code>[(ngModel)]="searchTerm"</code> — is shorthand for a
            property binding plus an event binding that happen to be named as a pair. Angular's two-way
            syntax isn't a special feature bolted onto forms; it's a naming convention that any
            component can opt into. Once your child has <code>myRating</code> and
            <code>myRatingChange</code>, a parent can write <code>[(myRating)]="rating"</code>.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've written the input+output pair by hand and can name the exact naming rule that makes the banana-in-a-box shorthand legal.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d5-act3-model" [stepNumber]="2" title="model() — Both Halves in One Line">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> replace the whole pair with a single <code>model()</code>.</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="modelBeforeCode" />

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="modelAfterCode" />

        <p style="margin-top: 12px;">
          <code>model()</code> gives you a signal that is <strong>writable in the child</strong> — unlike
          <code>input()</code>, it has <code>.set()</code> and <code>.update()</code> — and every write
          automatically emits the matching change event to the parent. The parent's template doesn't
          change at all:
        </p>

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="modelParentCode" />

        <div class="info-box">
          <strong>When to reach for which:</strong> use <code>input()</code> when the parent owns the
          value and the child only displays it. Use <code>output()</code> when the child needs to report
          something the parent will decide how to handle. Use <code>model()</code> only when the value
          is genuinely shared — the child edits it directly and the parent needs to stay in sync. Most
          of your components will use the first two; <code>model()</code> is for custom form controls.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> One <code>model()</code> line replaces your input+output pair, the parent still binds with <code>[(myRating)]</code>, and clicking in the child updates the value shown in the parent.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d5-act3-rating-stars" [stepNumber]="3" title="Build It — A RatingStars Component">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> create <code>src/app/rating-stars/rating-stars.ts</code> — a small, genuinely reusable control.</p>

        <app-code-block lang="typescript" file="src/app/rating-stars/rating-stars.ts" variant="after" [code]="ratingStarsCode" />

        <p style="margin-top: 12px;">Use it from the show card:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="after" [code]="ratingStarsUsageCode" />

        <p style="margin-top: 12px;">
          Remember to add <code>RatingStars</code> to <code>ShowCard</code>'s <code>imports</code> array —
          standalone components only see what they import, and the failure mode is a template error
          about an unknown element, which is at least an honest error message.
        </p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="ratingStarsImportCode" />

        <div class="think-about-it">
          <p class="tai-q"><code>RatingStars</code> has no idea what a show is. Is that a gap in the design?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — that's the design, not a gap">
          <p>
            It takes a number and reports a number. That's why it can be dropped into a review form, a
            settings page, or a completely different app without touching it. The moment you give it a
            <code>Show</code> input "for convenience," it stops being a rating control and becomes a
            show-rating control — half as useful, for no benefit.
          </p>
          <p style="margin-top: 8px;">
            Good rule: a component should take the smallest thing it actually needs.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking a star inside <code>RatingStars</code> updates the filled-star display and the value visible in the parent, with no event-handler code written in the parent at all.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d5-act3-debug" [stepNumber]="4" title="Debug It — Three Broken Snippets">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Each snippet below has exactly one thing wrong. Work out what it is before expanding the
          answer — these three account for most of the component-communication bugs you'll write in
          your first month.
        </p>

        <h4 style="margin-top: 20px;">Bug 1</h4>
        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="bug1Code" />

        <app-collapsible icon="🐛" label="Show the bug and the fix — missing square brackets">
          <p>
            <code>show="show"</code> has no brackets, so Angular passes the literal string
            <code>"show"</code> instead of evaluating the expression. Because <code>show</code> is
            typed as <code>input.required&lt;Show&gt;()</code>, TypeScript catches it — you get a type
            error saying <code>string</code> isn't assignable to <code>Show</code>. On a
            <code>string</code>-typed input there would be no error at all, and you'd just see the word
            "show" printed on every card.
          </p>
          <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="bug1FixCode" />
        </app-collapsible>

        <h4 style="margin-top: 24px;">Bug 2</h4>
        <app-code-block lang="typescript" file="src/app/app.ts" variant="before" [code]="bug2Code" />

        <app-collapsible icon="🐛" label="Show the bug and the fix — the handler ignores $event">
          <p>
            The template emits a payload, but the handler takes no argument and the binding never
            passes one. <code>addShow()</code> then has nothing to add. Nothing crashes — the click
            just silently does nothing, which is the worst kind of bug because there's no error to
            search for.
          </p>
          <p style="margin-top: 8px;">
            The fix is to accept the payload and pass <code>$event</code> through.
          </p>
          <app-code-block lang="typescript" file="src/app/app.ts" variant="after" [code]="bug2FixCode" />
        </app-collapsible>

        <h4 style="margin-top: 24px;">Bug 3</h4>
        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="bug3Code" />

        <app-collapsible icon="🐛" label="Show the bug and the fix — writing to an input">
          <p>
            <code>show</code> is an <code>input()</code>, which is read-only — there is no
            <code>.set()</code> on it, so this fails to compile. That's the compiler protecting you:
            the parent owns that value, and a child quietly overwriting it would make the parent's
            state and the child's display disagree with no way to tell which is right.
          </p>
          <p style="margin-top: 8px;">
            If the child needs the parent to change something, emit an output and let the parent do it.
            If the value is genuinely shared, use <code>model()</code>.
          </p>
          <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="bug3FixCode" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've reproduced all three bugs in your own project, read the real error message for each (or noticed the silence, for bug 2), and applied the fixes.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day5/act2" class="btn-secondary">← Act 2</a>
        <a routerLink="/day5/lab" class="btn-primary">Day 5 Lab →</a>
      </div>
    </div>
  `
})
export class Day5Act3Component {
  models: MentalModel[] = [
    {
      concept: 'model()',
      plainEnglish: 'A writable input that tells the parent whenever the child changes it.',
      analogy: 'A shared whiteboard. Either side can write; both always see the same thing.'
    },
    {
      concept: '[(value)]',
      plainEnglish: 'Two-way binding: property binding plus a matching change event, in one.',
      analogy: 'A banana in a box - and now you can build the banana yourself.'
    },
    {
      concept: 'xChange convention',
      plainEnglish: 'An output named exactly inputName + Change is what unlocks the shorthand.',
      analogy: 'A password that has to be spelled right or the door stays shut.'
    },
    {
      concept: 'Smallest useful input',
      plainEnglish: 'A component should accept the least specific data that does the job.',
      analogy: 'A power outlet takes volts, not a specific brand of toaster.'
    }
  ];

  longWayCode = `import { Component, input, output } from '@angular/core';

export class ShowCard {
  myRating = input(0);
  myRatingChange = output<number>();

  setRating(value: number) {
    // can't write to an input, so we have to ask the parent to do it
    this.myRatingChange.emit(value);
  }
}`;

  longWayParentCode = `<app-show-card
  [show]="show"
  [myRating]="ratings[show.id] ?? 0"
  (myRatingChange)="setRating(show.id, $event)"
/>`;

  modelBeforeCode = `import { Component, input, output } from '@angular/core';

export class ShowCard {
  myRating = input(0);
  myRatingChange = output<number>();

  setRating(value: number) {
    this.myRatingChange.emit(value);
  }
}`;

  modelAfterCode = `import { Component, model } from '@angular/core';

export class ShowCard {
  myRating = model(0);

  setRating(value: number) {
    this.myRating.set(value);   // writable, and the parent hears about it
  }
}`;

  modelParentCode = `<app-show-card [show]="show" [(myRating)]="rating" />`;

  ratingStarsCode = `import { Component, model } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  template: \`
    <span class="stars">
      @for (star of [1, 2, 3, 4, 5]; track star) {
        <button
          type="button"
          class="star"
          [class.filled]="star <= rating()"
          (click)="rating.set(star)"
        >★</button>
      }
    </span>
  \`,
  styles: [\`
    .star {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      color: #555;
      padding: 0 2px;
    }
    .star.filled { color: #f5c518; }
  \`]
})
export class RatingStars {
  rating = model(0);
}`;

  ratingStarsUsageCode = `<article class="card" [class.watched]="watched()">
  <h3>{{ show().name }}</h3>
  <p>{{ show().genre }} · ⭐ {{ show().rating }}</p>

  <p>Your rating:</p>
  <app-rating-stars [(rating)]="myRating" />
</article>`;

  ratingStarsImportCode = `import { Component, signal, computed, input, output, model } from '@angular/core';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RatingStars],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  myRating = signal(0);
  // ...
}`;

  bug1Code = `@for (show of filteredShows(); track show.id) {
  <app-show-card show="show" (addToWatchlist)="addShow($event)" />
}`;

  bug1FixCode = `@for (show of filteredShows(); track show.id) {
  <app-show-card [show]="show" (addToWatchlist)="addShow($event)" />
}`;

  bug2Code = `// app.html
// <app-show-card [show]="show" (addToWatchlist)="addShow()" />

// app.ts
watchlist = signal<Show[]>([]);

addShow() {
  this.watchlist.update(list => [...list, show]);
}`;

  bug2FixCode = `// app.html
// <app-show-card [show]="show" (addToWatchlist)="addShow($event)" />

// app.ts
watchlist = signal<Show[]>([]);

addShow(show: Show) {
  if (this.watchlist().some(s => s.id === show.id)) return;
  this.watchlist.update(list => [...list, show]);
}`;

  bug3Code = `export class ShowCard {
  show = input.required<Show>();

  markWatched() {
    this.show.set({ ...this.show(), watched: true });
  }
}`;

  bug3FixCode = `export class ShowCard {
  show = input.required<Show>();
  watchedChanged = output<Show>();

  markWatched() {
    // report it; let the parent decide what to do with its own data
    this.watchedChanged.emit(this.show());
  }
}`;
}
