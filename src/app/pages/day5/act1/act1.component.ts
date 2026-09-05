import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day5-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 5 · Act 1 of 3</span>
        <h1>⬇️ Data Down: Making a Component Reusable with input()</h1>
        <p class="subtitle">Your show card knows about exactly one show. Today it learns to take any show it's handed.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 4's BingeBoard is working — a
        <code>shows</code> signal array rendered with <code>&#64;for</code>, a live
        <code>[(ngModel)]</code> search filter, and the genre/sort filters from the lab. Run
        <code>ng serve</code> now and confirm the list still filters.
        Don't have that state handy? <a routerLink="/day5/start">Grab the Day 5 starting point</a> first.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/components/inputs" target="_blank" rel="noopener">Components → Accepting data with input properties</a> — the signal-based <code>input()</code> function is what you'll use all day.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Turn a hardcoded component into a reusable one by declaring <code>input()</code>s and passing data in from the parent.</li>
          <li><strong>Why It Matters:</strong> A component that only knows about one show isn't a component — it's a snippet. Inputs are what make it a building block you can use eight times.</li>
          <li><strong>Build Steps:</strong> Warm up by spotting the duplication → understand the parent/child relationship → declare <code>input.required&lt;Show&gt;()</code> → pass a show down from the list.</li>
          <li><strong>Expected Outcome:</strong> A <code>ShowCard</code> that renders whatever show the parent gives it, driving all eight cards in your filtered list.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Data Down with input())</p>
        <p><strong>Next step:</strong> Act 2 (Events Up with output())</p>
        <p><strong>Time:</strong> About 35 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d5-act1-warmup" [stepNumber]="1" title="Warm-Up — Find the Duplication">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Open <code>src/app/app.html</code> and look at the markup inside your <code>&#64;for</code>
          block. Then open <code>src/app/show-card/show-card.html</code>. Notice that you now have
          <strong>two</strong> pieces of markup that draw a show card — one of them hardcoded to
          Severance, and one of them a stripped-down copy inside the loop.
        </p>

        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="duplicatedMarkupCode" />

        <p style="margin-top: 12px;">
          That raw <code>&lt;article class="card"&gt;</code> is what Day 4 told you was temporary —
          "plain markup for now, the reusable card component comes Day 5." This is Day 5.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've found both copies of card markup in your project, and you can name which one is currently inside the loop.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d5-act1-problem" [stepNumber]="2" title="The Problem — A Component That Only Knows One Show">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Your <code>ShowCard</code> works, but look at what's at the top of the class:
        </p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="hardcodedCardCode" />

        <p style="margin-top: 12px;">
          Severance is baked in. Rendering a second card gives you a second Severance. The component
          has behavior worth reusing — the episode counter, the binge level, the budget math — but
          it can't be pointed at a different show.
        </p>

        <p style="margin-top: 12px;">
          The fix is a one-way street: the <strong>parent owns the data</strong>, and passes a piece
          of it down to the child. The child never reaches up and grabs it. This is the single most
          important rule in Angular's component model, and it has a name: <strong>data down, events
          up</strong>. Today's Act 1 is the "data down" half.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why not just have <code>ShowCard</code> import the <code>shows</code> array itself and pick the right one?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — because then it's not reusable, it's coupled">
          <p>
            The moment the child imports the parent's data, it only works inside that one parent, with
            that one array, in that one app. Pass the data in as an input instead and the same card
            works in a search-results list, a watchlist panel, a "recommended for you" carousel, or a
            unit test that hands it a fake show — with zero changes.
          </p>
          <p style="margin-top: 8px;">
            There's a second reason: if the child reaches out and grabs its own data, you can no longer
            tell what a card will render just by reading the line that renders it. With inputs,
            <code>&lt;app-show-card [show]="show" /&gt;</code> tells you everything.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can point at the hardcoded <code>title</code>/<code>imageUrl</code>/<code>rating</code> fields and explain why they're what stops the card being reusable.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d5-act1-input" [stepNumber]="3" title="Declaring an input()">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> in <code>src/app/show-card/show-card.ts</code>, delete the three hardcoded fields and declare an input instead.</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="inputBeforeCode" />

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="inputAfterCode" />

        <p style="margin-top: 12px;">
          Three things to notice, and they're each worth saying to yourself once:
        </p>

        <ul>
          <li><strong><code>input()</code> is imported from <code>&#64;angular/core</code></strong>, same place as <code>signal()</code> and <code>computed()</code>.</li>
          <li><strong>An input <em>is</em> a signal.</strong> You read it with parentheses — <code>show()</code> — exactly like everything you learned on Day 3. That's not a coincidence; it's the whole point of the signal-based API.</li>
          <li><strong><code>input.required&lt;Show&gt;()</code> means the parent must supply it.</strong> Forget to, and you get a compile error rather than an <code>undefined</code> at runtime.</li>
        </ul>

        <p style="margin-top: 12px;">
          Now update the template to read through the input. Everything that was
          <code>title</code> becomes <code>show().name</code>:
        </p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="before" [code]="cardTemplateBeforeCode" />

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="after" [code]="cardTemplateAfterCode" />

        <div class="info-box">
          <strong>Episode length used to be hardcoded too.</strong> <code>episodeMinutes = 50</code> is
          still fine as a plain property for now — it's not part of the <code>Show</code> interface, and
          nothing passes it in. Leave it. Not every field needs to be an input; only the ones the parent
          actually decides.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>show-card.ts</code> declares <code>show = input.required&lt;Show&gt;()</code>, its template reads <code>show().name</code> / <code>show().rating</code>, and the app fails to compile until you complete Step 4 — which is exactly what "required" is supposed to do.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d5-act1-passing-down" [stepNumber]="4" title="Passing Data Down from the List">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> in <code>src/app/app.html</code>, replace the raw <code>&lt;article&gt;</code> markup inside your <code>&#64;for</code> with the component, and hand it the loop variable.</p>

        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="listBeforeCode" />

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="listAfterCode" />

        <p style="margin-top: 12px;">
          <code>[show]="show"</code> is ordinary property binding — the same square brackets you used on
          Day 2 for <code>[src]</code> and <code>[alt]</code>. The name in brackets is the child's input
          name; the expression on the right is evaluated in the <em>parent's</em> context, which is why
          the <code>&#64;for</code> loop variable works there.
        </p>

        <p style="margin-top: 12px;">
          Save and look at the page. Eight distinct cards, each with its own poster, name, and rating —
          and each with its own independent episode counter, because every <code>&lt;app-show-card&gt;</code>
          is a separate instance with separate signals.
        </p>

        <div class="warning-box">
          <strong>The bracket mistake you will make at least once:</strong> writing
          <code>show="show"</code> instead of <code>[show]="show"</code>. Without brackets, Angular
          passes the literal <em>string</em> <code>"show"</code> instead of evaluating the expression.
          With a typed <code>input.required&lt;Show&gt;()</code> you'll get a type error — which is a
          gift. With a <code>string</code> input you'd get no error at all, just the wrong text on
          screen. Brackets mean "evaluate this"; no brackets means "this literal text."
        </div>

        <div class="think-about-it">
          <p class="tai-q">The genre badge and the ratings-guard badge you wrote in Day 4's lab lived in the raw markup you just deleted. Where should they go now?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — into the card component">
          <p>
            Move the <code>&#64;switch</code> genre badge and the <code>&#64;if</code> ratings-guard
            badge into <code>show-card.html</code>, reading from <code>show().genre</code> and
            <code>show().rating</code>. That's the payoff Day 4 promised when it warned about nesting
            <code>&#64;if</code> inside <code>&#64;for</code> — the branching logic moves inside the
            component that owns it, and <code>app.html</code> gets to be a clean list again.
          </p>
          <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="after" [code]="badgesMovedCode" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your list renders eight <code>&lt;app-show-card&gt;</code> instances driven by <code>filteredShows()</code>, filtering still works, and <code>app.html</code> no longer contains any card markup of its own.</div>
      </app-lesson-step>

      <!-- Step 5 -->
      <app-lesson-step stepId="d5-act1-transform" [stepNumber]="5" title="Optional Inputs, Defaults, and Never Mutating Them">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Not every input has to be required. <code>input()</code> without <code>.required</code> takes
          a default value, and the parent can leave it off entirely:
        </p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="optionalInputCode" />

        <p style="margin-top: 12px;">
          Both of these are now valid from the parent — the second one just gets the default:
        </p>

        <app-code-block lang="html" file="src/app/app.html" [code]="optionalUsageCode" />

        <div class="warning-box">
          <strong>Never write to an input inside the child.</strong> Inputs are read-only signals —
          there is no <code>.set()</code> on them, and the compiler will tell you so. That's deliberate:
          the parent owns that value. If the child needs to change it, the child has to <em>ask</em>,
          which is exactly what Act 2's <code>output()</code> is for. (And if the child genuinely owns
          part of the state jointly with the parent, that's Act 3's <code>model()</code>.)
        </div>

        <app-collapsible icon="🤔" label="I found a tutorial using @Input() and @Output() decorators">
          <p>
            That's the older decorator-based API — <code>&#64;Input() show!: Show;</code> — and it still
            works. But the signal-based <code>input()</code> function is what current Angular
            recommends, and it composes properly with everything from Day 3: an <code>input()</code>
            is a signal, so a <code>computed()</code> can depend on it and update automatically when
            the parent passes a new value. The decorator version needs <code>ngOnChanges</code> for
            the same thing.
          </p>
          <app-code-block lang="typescript" [code]="decoratorComparisonCode" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've tried calling <code>.set()</code> on an input, seen the compiler reject it, and can explain why that restriction exists rather than working around it.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day5/start" class="btn-secondary">← Day 5 Starting Point</a>
        <a routerLink="/day5/act2" class="btn-primary">Act 2: Events Up with output() →</a>
      </div>
    </div>
  `
})
export class Day5Act1Component {
  models: MentalModel[] = [
    {
      concept: 'input()',
      plainEnglish: 'A slot on a component that the parent fills in.',
      analogy: 'A function parameter — the component is the function, the input is the argument.'
    },
    {
      concept: 'input.required<T>()',
      plainEnglish: 'An input the parent is not allowed to leave out.',
      analogy: 'A required field on a form. Skip it and you get stopped before you submit.'
    },
    {
      concept: '[show]="show"',
      plainEnglish: 'Property binding that hands the parent value into the child input.',
      analogy: 'Passing the argument at the call site.'
    },
    {
      concept: 'Data down',
      plainEnglish: 'Parents own state and pass pieces of it to children, never the reverse.',
      analogy: 'Water flows downhill. Children ask; they do not reach up and take.'
    }
  ];

  duplicatedMarkupCode = `<div class="card-grid">
  @for (show of filteredShows(); track show.id) {
    <article class="card">
      <img [src]="show.imageUrl" [alt]="show.name" width="140" />
      <h3>{{ show.name }}</h3>
      <p>{{ show.genre }} · ⭐ {{ show.rating }}</p>
      <!-- ...genre badge, ratings badge... -->
    </article>
  } @empty {
    <!-- ... -->
  }
</div>

<section class="tracker">
  <h2>Your watch tracker</h2>
  <app-show-card />   <!-- a whole card component, stuck on Severance -->
</section>`;

  hardcodedCardCode = `export class ShowCard {
  title = 'Severance';
  imageUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/423/1059131.jpg';
  rating = 8.7;
  episodeMinutes = 50;

  // ...all the signal state from Day 3...
}`;

  inputBeforeCode = `import { Component, signal, computed, effect, linkedSignal } from '@angular/core';

export class ShowCard {
  title = 'Severance';
  imageUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/423/1059131.jpg';
  rating = 8.7;
  episodeMinutes = 50;

  watched = signal(false);
  episodesWatched = signal(0);
}`;

  inputAfterCode = `import { Component, signal, computed, effect, linkedSignal, input } from '@angular/core';
import { Show } from '../models/show';

export class ShowCard {
  show = input.required<Show>();

  episodeMinutes = 50;

  watched = signal(false);
  episodesWatched = signal(0);
}`;

  cardTemplateBeforeCode = `<article class="card" [class.watched]="watched()">
  <img [src]="imageUrl" [alt]="title" width="140" />
  <h3>{{ title }}</h3>
  <p>⭐ {{ rating }}</p>
  <p>Episodes: {{ episodesWatched() }} · {{ hours() }} hrs</p>
  <button (click)="watchEpisode()">+1 episode</button>
</article>`;

  cardTemplateAfterCode = `<article class="card" [class.watched]="watched()">
  <img [src]="show().imageUrl" [alt]="show().name" width="140" />
  <h3>{{ show().name }}</h3>
  <p>{{ show().genre }} · ⭐ {{ show().rating }}</p>
  <p>Episodes: {{ episodesWatched() }} · {{ hours() }} hrs</p>
  <button (click)="watchEpisode()">+1 episode</button>
</article>`;

  listBeforeCode = `<div class="card-grid">
  @for (show of filteredShows(); track show.id) {
    <article class="card">
      <img [src]="show.imageUrl" [alt]="show.name" width="140" />
      <h3>{{ show.name }}</h3>
      <p>{{ show.genre }} · ⭐ {{ show.rating }}</p>
    </article>
  } @empty {
    <div class="empty-state">
      <p>No shows match those filters.</p>
      <button (click)="clearFilters()">Clear filters</button>
    </div>
  }
</div>`;

  listAfterCode = `<div class="card-grid">
  @for (show of filteredShows(); track show.id) {
    <app-show-card [show]="show" />
  } @empty {
    <div class="empty-state">
      <p>No shows match those filters.</p>
      <button (click)="clearFilters()">Clear filters</button>
    </div>
  }
</div>`;

  badgesMovedCode = `<article class="card" [class.watched]="watched()">
  <img [src]="show().imageUrl" [alt]="show().name" width="140" />
  <h3>{{ show().name }}</h3>
  <p>{{ show().genre }} · ⭐ {{ show().rating }}</p>

  @switch (show().genre) {
    @case ('Kids') { <span class="badge">👨‍👩‍👧 Family</span> }
    @case ('Thriller') { <span class="badge">🔪 Edge of seat</span> }
    @default { <span class="badge">📺 {{ show().genre }}</span> }
  }

  @if (show().rating < 7) {
    <span class="badge caution">⚠️ Proceed with caution</span>
  } @else if (show().rating >= 9) {
    <span class="badge banger">🏆 Certified banger</span>
  }

  <p>Episodes: {{ episodesWatched() }} · {{ hours() }} hrs</p>
  <button (click)="watchEpisode()">+1 episode</button>
</article>`;

  optionalInputCode = `import { input } from '@angular/core';

export class ShowCard {
  show = input.required<Show>();

  // optional: the parent may leave this off entirely
  compact = input(false);
  badgeText = input<string>('');
}`;

  optionalUsageCode = `<app-show-card [show]="show" [compact]="true" />
<app-show-card [show]="show" />              <!-- compact stays false -->`;

  decoratorComparisonCode = `// Older decorator API — still works, but doesn't compose with signals
@Input() show!: Show;
@Input() compact = false;

// Current signal API — reads like every other signal you've written
show = input.required<Show>();
compact = input(false);

// And because inputs are signals, this just works:
displayName = computed(() => this.show().name.toUpperCase());`;
}
