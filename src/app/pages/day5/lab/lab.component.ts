import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day5-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — A Watchlist Panel That Talks Back</h1>
        <p class="subtitle">About 50 minutes. 4 tasks, all built on inputs and outputs.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Complete Acts 1-3 first — this lab assumes <code>ShowCard</code> takes
          <code>show = input.required&lt;Show&gt;()</code>, emits
          <code>addToWatchlist = output&lt;Show&gt;()</code>, and that <code>App</code> owns a
          <code>watchlist</code> signal. Don't have that state?
          <a routerLink="/day5/start">Start from the Day 5 starting point</a> and work through the acts.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Design your own parent/child boundary — decide what goes down as an input, what comes up as an event, and who owns which piece of state.</li>
          <li><strong>Why It Matters:</strong> The acts told you where the boundary was. Real work is deciding that yourself, and it's the difference between components you can reuse and components you can't.</li>
          <li><strong>Build Steps:</strong> A watchlist panel component with a remove event → an optional <code>compact</code> input → an "already added" input the parent computes → a <code>model()</code> stretch task.</li>
          <li><strong>Expected Outcome:</strong> A watchlist you can add to and remove from, where every piece of state has exactly one owner.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 5 Lab (final step of Day 5)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> About 50 minutes total.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="d5-lab-watchlist-panel" [stepNumber]="'Task 1'" title="A WatchlistPanel Component">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>input()</code> for the list, <code>output()</code> for removal.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Right now the watchlist markup sits inline in <code>app.html</code>. Extract it into its own
          <code>WatchlistPanel</code> component that takes the list as an input and emits a
          <code>remove</code> event when you click the X next to an entry. <code>App</code> stays the
          only place that actually changes the watchlist.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Create <code>src/app/watchlist-panel/watchlist-panel.ts</code> with <code>shows = input.required&lt;Show[]&gt;()</code> and <code>remove = output&lt;Show&gt;()</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Render the list with <code>&#64;for</code> + <code>track show.id</code> + <code>&#64;empty</code>, and give each row a button that emits the show.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>In <code>app.html</code>, replace the inline markup with <code>&lt;app-watchlist-panel [shows]="watchlist()" (remove)="removeShow($event)" /&gt;</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Add <code>removeShow(show: Show)</code> to <code>App</code>, filtering the show out by id with <code>update()</code> — never with <code>splice()</code>.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — who owns the array?">
          <p>
            The panel receives <code>Show[]</code>, not a signal — you pass <code>watchlist()</code>
            (already unwrapped) into <code>[shows]</code>, and the panel's own <code>input()</code>
            makes it a signal again on the other side. The panel must not filter, sort, or splice that
            array; it draws it and reports clicks. Every actual change happens in <code>App</code>.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Adding a show from a card makes it appear in the panel; clicking X in the panel removes it, and the count in the heading updates both times.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" file="src/app/watchlist-panel/watchlist-panel.ts" [code]="panelAnswerCode" />
          <app-code-block lang="typescript" file="src/app/app.ts" [code]="panelParentAnswerCode" />
          <app-code-block lang="html" file="src/app/app.html" [code]="panelUsageAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="d5-lab-compact-input" [stepNumber]="'Task 2'" title="An Optional compact Input">
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: optional <code>input()</code> with a default, class binding.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Give <code>ShowCard</code> a <code>compact</code> boolean input, defaulting to
          <code>false</code>. When it's true the card hides its poster and the episode counter, showing
          just the name, genre, and rating. Use it to render the watchlist entries as compact cards
          while the main list stays full-size — same component, two appearances.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add <code>compact = input(false)</code> to <code>ShowCard</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Wrap the poster and counter in <code>&#64;if (!compact())</code>, and add <code>[class.compact]="compact()"</code> to the article.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>In the watchlist panel, render <code>&lt;app-show-card [show]="show" [compact]="true" /&gt;</code>; leave the main list's usage untouched.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — why a default matters here">
          <p>
            Because <code>compact</code> has a default, every existing
            <code>&lt;app-show-card [show]="show" /&gt;</code> in your project keeps compiling with no
            edits. That's the practical difference between <code>input()</code> and
            <code>input.required()</code>: required inputs are a promise the parent must keep, optional
            inputs are a feature the parent may ignore.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The same <code>ShowCard</code> renders full-size in the main list and stripped-down in the watchlist, with no duplicated component.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="compactTsAnswerCode" />
          <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="compactHtmlAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="d5-lab-already-added" [stepNumber]="'Task 3'" title="An 'Already Added' Input the Parent Computes">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: deriving an input in the parent, disabled state, no duplicated logic.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A show already on the watchlist shouldn't offer "Add to watchlist" again. Give
          <code>ShowCard</code> an <code>alreadyAdded</code> boolean input that disables the button and
          changes its label to "On your watchlist." The card must not work this out itself — the
          <strong>parent</strong> decides, because the parent is the one that owns the watchlist.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add <code>alreadyAdded = input(false)</code> to <code>ShowCard</code>, and bind <code>[disabled]="alreadyAdded()"</code> on the add button.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>In <code>App</code>, add a <code>watchlistIds</code> computed holding a <code>Set</code> of the ids currently on the watchlist.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Pass it down: <code>[alreadyAdded]="watchlistIds().has(show.id)"</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Now that the button can't fire twice, decide whether the duplicate guard inside <code>addShow</code> should stay. Write a one-line comment in the code with your answer.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — and the answer to step 4">
          <p>
            Keep the guard. The disabled button is a <em>UI</em> convenience; the guard is the actual
            rule. The day something else calls <code>addShow</code> — a keyboard shortcut, a restored
            session, a "add all results" button — the guard is what still holds. Enforce rules where the
            data lives, not where the button lives.
          </p>
          <p style="margin-top: 8px;">
            A <code>Set</code> rather than <code>.some()</code> matters here too: <code>.some()</code>
            inside the template would re-scan the whole watchlist for every card on every change. The
            computed builds the <code>Set</code> once per watchlist change.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Adding a show immediately greys out that card's button and relabels it; removing the show from the panel re-enables it, with no code in the card that knows what a watchlist is.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" file="src/app/app.ts" [code]="alreadyAddedParentCode" />
          <app-code-block lang="html" file="src/app/app.html" [code]="alreadyAddedUsageCode" />
          <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="alreadyAddedCardCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 4 -->
      <app-lesson-step stepId="d5-lab-model-stretch" [stepNumber]="'Task 4'" title="Stretch — Persist the Star Rating with model()">
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: <code>model()</code>, two-way binding through two levels, parent-owned state.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Act 3's <code>RatingStars</code> currently stores its rating inside whichever
          <code>ShowCard</code> holds it, so it vanishes when the list re-filters and the card is
          rebuilt. Move that state up: <code>App</code> owns a map of show id to rating, and passes each
          card its own rating with two-way binding all the way down.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>In <code>App</code>, add <code>ratings = signal&lt;Record&lt;number, number&gt;&gt;(&#123;&#125;)</code> and a <code>setRating(id: number, value: number)</code> method that writes a new object with <code>update()</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Change <code>ShowCard</code>'s <code>myRating</code> from a <code>signal()</code> to a <code>model(0)</code> so it can be bound from above and written from below.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Bind it in the list: <code>[myRating]="ratings()[show.id] ?? 0"</code> plus <code>(myRatingChange)="setRating(show.id, $event)"</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Confirm it survives filtering: rate a show, type in the filter box until it disappears, clear the filter, and check the rating is still there.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — why not [(myRating)] here?">
          <p>
            The banana-in-a-box shorthand needs a single writable target on the right-hand side, and
            <code>ratings()[show.id]</code> is an expression, not a writable signal. So you write the
            two halves out longhand — which is a useful reminder that <code>[(x)]</code> was never
            magic, just a shorthand for the pair you're writing here.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Star ratings survive filtering, sorting, and the card being destroyed and recreated, because the state lives in the parent rather than in the card.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <app-code-block lang="typescript" file="src/app/app.ts" [code]="ratingsParentCode" />
          <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="ratingsCardCode" />
          <app-code-block lang="html" file="src/app/app.html" [code]="ratingsUsageCode" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day5/act3" class="btn-secondary">← Act 3: Two-Way with model()</a>
        <a routerLink="/" class="btn-primary">Back to Home →</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> <code>ShowCard</code> renders any show handed to it through <code>input.required&lt;Show&gt;()</code>, and drives the whole filtered list.</li>
          <li><span class="checkbox">✅</span> A click in the child updates state in the parent, through <code>output()</code> and <code>$event</code> — with no shared mutable data between them.</li>
          <li><span class="checkbox">✅</span> You can state the "data down, events up" rule and point at the exact lines in your own project that do each half.</li>
          <li><span class="checkbox">✅</span> You can say when you'd reach for <code>model()</code> instead of an <code>input()</code> and <code>output()</code> pair.</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 5. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Make a component reusable with <code>input()</code> and <code>input.required&lt;T&gt;()</code>.</li>
          <li>✅ Report events upward with <code>output()</code>, <code>.emit()</code>, and <code>$event</code>.</li>
          <li>✅ Build a two-way-bindable control with <code>model()</code>.</li>
          <li>✅ Decide which component owns a piece of state, and defend the choice.</li>
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
export class Day5LabComponent {
  panelAnswerCode = `import { Component, input, output } from '@angular/core';
import { Show } from '../models/show';

@Component({
  selector: 'app-watchlist-panel',
  standalone: true,
  imports: [],
  template: \`
    <section class="watchlist">
      <h2>Your watchlist ({{ shows().length }})</h2>
      @for (show of shows(); track show.id) {
        <p class="row">
          {{ show.name }}
          <button (click)="remove.emit(show)" aria-label="Remove">✕</button>
        </p>
      } @empty {
        <p>Nothing saved yet. Add a show below.</p>
      }
    </section>
  \`,
  styles: [\`
    .row { display: flex; justify-content: space-between; align-items: center; }
    button { background: none; border: none; color: #f44747; cursor: pointer; }
  \`]
})
export class WatchlistPanel {
  shows = input.required<Show[]>();
  remove = output<Show>();
}`;

  panelParentAnswerCode = `import { WatchlistPanel } from './watchlist-panel/watchlist-panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ShowCard, WatchlistPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  watchlist = signal<Show[]>([]);

  addShow(show: Show) {
    if (this.watchlist().some(s => s.id === show.id)) return;
    this.watchlist.update(list => [...list, show]);
  }

  removeShow(show: Show) {
    this.watchlist.update(list => list.filter(s => s.id !== show.id));
  }
}`;

  panelUsageAnswerCode = `<app-watchlist-panel
  [shows]="watchlist()"
  (remove)="removeShow($event)"
/>`;

  compactTsAnswerCode = `import { Component, signal, computed, input, output } from '@angular/core';
import { Show } from '../models/show';

export class ShowCard {
  show = input.required<Show>();
  compact = input(false);
  addToWatchlist = output<Show>();
}`;

  compactHtmlAnswerCode = `<article class="card" [class.watched]="watched()" [class.compact]="compact()">
  @if (!compact()) {
    <img [src]="show().imageUrl" [alt]="show().name" width="140" />
  }

  <h3>{{ show().name }}</h3>
  <p>{{ show().genre }} · ⭐ {{ show().rating }}</p>

  @if (!compact()) {
    <p>Episodes: {{ episodesWatched() }} · {{ hours() }} hrs</p>
    <button (click)="watchEpisode()">+1 episode</button>
    <button (click)="add()">+ Add to watchlist</button>
  }
</article>`;

  alreadyAddedParentCode = `export class App {
  watchlist = signal<Show[]>([]);

  watchlistIds = computed(() => new Set(this.watchlist().map(s => s.id)));

  addShow(show: Show) {
    // keep this guard even though the button is disabled - the button is UI,
    // this is the rule
    if (this.watchlistIds().has(show.id)) return;
    this.watchlist.update(list => [...list, show]);
  }
}`;

  alreadyAddedUsageCode = `@for (show of filteredShows(); track show.id) {
  <app-show-card
    [show]="show"
    [alreadyAdded]="watchlistIds().has(show.id)"
    (addToWatchlist)="addShow($event)"
  />
}`;

  alreadyAddedCardCode = `<button (click)="add()" [disabled]="alreadyAdded()">
  @if (alreadyAdded()) {
    On your watchlist
  } @else {
    + Add to watchlist
  }
</button>`;

  ratingsParentCode = `export class App {
  ratings = signal<Record<number, number>>({});

  setRating(id: number, value: number) {
    this.ratings.update(map => ({ ...map, [id]: value }));
  }
}`;

  ratingsCardCode = `import { Component, model } from '@angular/core';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RatingStars],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  show = input.required<Show>();

  // was: myRating = signal(0);  - now bindable from the parent
  myRating = model(0);
}

// in show-card.html:
// <app-rating-stars [(rating)]="myRating" />`;

  ratingsUsageCode = `@for (show of filteredShows(); track show.id) {
  <app-show-card
    [show]="show"
    [myRating]="ratings()[show.id] ?? 0"
    (myRatingChange)="setRating(show.id, $event)"
    (addToWatchlist)="addShow($event)"
  />
}`;
}
