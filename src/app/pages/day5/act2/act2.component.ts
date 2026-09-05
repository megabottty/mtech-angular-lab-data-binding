import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day5-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 5 · Act 2 of 3</span>
        <h1>⬆️ Events Up: Telling the Parent Something Happened</h1>
        <p class="subtitle">The child can't change the parent's data. So it raises its hand instead.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/components/outputs" target="_blank" rel="noopener">Components → Custom events with outputs</a> — covers <code>output()</code>, <code>.emit()</code>, and naming conventions.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Emit a custom event from a child with <code>output()</code>, and handle it in the parent with <code>$event</code>.</li>
          <li><strong>Why It Matters:</strong> Every "Add to watchlist," "Delete," and "Save" button in every real app is this exact pattern. The button lives in the child; the data lives in the parent.</li>
          <li><strong>Build Steps:</strong> See why the child can't just do it itself → declare an <code>output&lt;Show&gt;()</code> → emit on click → handle it in the parent and update a real watchlist signal.</li>
          <li><strong>Expected Outcome:</strong> Clicking "Add to watchlist" on any card adds that show to a list owned by <code>App</code>, with duplicates rejected.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Events Up with output())</p>
        <p><strong>Next step:</strong> Act 3 (Two-Way with model(), and Debug It)</p>
        <p><strong>Time:</strong> About 40 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d5-act2-problem" [stepNumber]="1" title="The Problem — The Child Can't Reach Up">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Here's the feature: every card gets an "Add to watchlist" button, and the watchlist is a
          single list for the whole app.
        </p>

        <p style="margin-top: 12px;">
          Try to build that with what you know from Act 1 and you hit a wall immediately. The button
          belongs in <code>ShowCard</code> — that's where the show is. But the watchlist can't live in
          <code>ShowCard</code>, because there are eight instances and each one would get its own
          private list of one item. The watchlist has to live in <code>App</code>, the one place that
          sits above all eight cards.
        </p>

        <p style="margin-top: 12px;">
          So the click happens in the child, and the state change has to happen in the parent. The
          child needs a way to say <em>"this happened, to this show"</em> — and then let the parent
          decide what that means. That's an <strong>output</strong>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Could the child just take the watchlist array as an input and push onto it?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — technically it would run, and it's a real bug">
          <p>
            Passing an array down and mutating it from the child does change the underlying object, so
            it can appear to work. But it breaks in two ways. First, mutating an array inside a signal
            doesn't notify anything — same trap Day 4 warned about with <code>shows().push(x)</code> —
            so the parent's UI won't update. Second, and worse, it destroys the thing that makes the
            component reusable: now the card only works if it's handed a mutable watchlist, and reading
            the parent's template tells you nothing about what the child will do to your data.
          </p>
          <p style="margin-top: 8px;">
            Emitting an event keeps the child honest. It reports; it doesn't decide.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state where the watchlist has to live and why, before writing any code.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d5-act2-output" [stepNumber]="2" title="Declaring an output() and Emitting">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> in <code>src/app/show-card/show-card.ts</code>, declare an output and a method that emits through it.</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="outputBeforeCode" />

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="outputAfterCode" />

        <p style="margin-top: 12px;">
          Read <code>output&lt;Show&gt;()</code> as "this component can announce an event called
          <code>addToWatchlist</code>, and the announcement carries a <code>Show</code> with it." The
          type in the angle brackets is the <em>payload</em> — what gets handed to whoever is listening.
        </p>

        <p style="margin-top: 12px;">Then wire the button in the child's template:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="after" [code]="emitTemplateCode" />

        <p style="margin-top: 12px;">
          Save and click it. <strong>Nothing happens.</strong> That's correct — nobody is listening yet.
          An output with no listener is a shout into an empty room, and Angular won't warn you about it.
        </p>

        <div class="info-box">
          <strong>Name outputs after the event, not the handler.</strong> <code>addToWatchlist</code>,
          <code>removed</code>, <code>ratingChanged</code> — a thing that happened. Don't call it
          <code>onAddToWatchlist</code>; the <code>on</code> prefix belongs to the parent's <em>handler
          method</em>, not to the event itself. Otherwise the parent's template reads
          <code>(onAddToWatchlist)="onAddToWatchlist(...)"</code>, which is a mouthful and tells you
          the naming has gone sideways.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>show-card.ts</code> declares <code>addToWatchlist = output&lt;Show&gt;()</code>, a button calls a method that emits <code>this.show()</code>, and the app compiles even though nothing listens yet.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d5-act2-listening" [stepNumber]="3" title="Listening in the Parent with $event">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> in <code>src/app/app.ts</code>, add the watchlist state and a handler.</p>

        <app-code-block lang="typescript" file="src/app/app.ts" variant="after" [code]="watchlistStateCode" />

        <p style="margin-top: 12px;">Then listen for the child's event in <code>app.html</code>:</p>

        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="listenBeforeCode" />

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="listenAfterCode" />

        <p style="margin-top: 12px;">
          Round parentheses are event binding — the same <code>(click)</code> syntax from Day 2. The
          only difference is that <code>addToWatchlist</code> is an event <em>you</em> invented rather
          than one the browser provides. Angular makes no distinction between them.
        </p>

        <p style="margin-top: 12px;">
          <code>$event</code> is the payload the child passed to <code>.emit()</code>. Here that's the
          <code>Show</code> object. It is <strong>not</strong> a magic global — it's a name Angular
          binds only inside an event-binding expression, and it always means "whatever this event
          carried."
        </p>

        <div class="warning-box">
          <strong>Inside a <code>&#64;for</code>, <code>$event</code> and the loop variable are
          different things.</strong> Writing <code>(addToWatchlist)="addShow(show)"</code> also happens
          to work here, because the loop variable <code>show</code> is the same object the child
          emitted. That coincidence hides a bug the day the child starts emitting something else — a
          modified copy, an id, a different object entirely. Use <code>$event</code>: it means "what
          the child actually sent," which is what you want.
        </div>

        <p style="margin-top: 12px;">Now show the watchlist so you can see it working:</p>

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="watchlistPanelCode" />

        <div class="think-about-it">
          <p class="tai-q">Why is <code>addShow</code> written with <code>update(list =&gt; [...list, show])</code> rather than <code>this.watchlist().push(show)</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — push mutates, it doesn't notify">
          <p>
            <code>this.watchlist().push(show)</code> reads the array out of the signal and mutates it in
            place. The signal itself never got a new value, so it never notifies anything, so the
            <code>&#64;for</code> rendering the panel never re-runs. The item is genuinely in the array
            and genuinely not on screen — one of the most confusing bugs a beginner can hit.
          </p>
          <p style="margin-top: 8px;">
            <code>update(list =&gt; [...list, show])</code> builds a <em>new</em> array and sets it.
            New value, notification fires, UI updates. This is the same rule Day 4 planted, and it
            applies every single time you change an array or object held in a signal.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking "Add to watchlist" on a card makes that show appear in a panel above the list, and clicking the same card twice does not add it twice.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d5-act2-data-down-events-up" [stepNumber]="4" title="The Whole Pattern in One Diagram">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Step back and look at what you just built, because this shape repeats for the rest of the
          course:
        </p>

        <app-code-block lang="text" [code]="patternDiagramCode" />

        <p style="margin-top: 12px;">
          The child is now genuinely reusable. It doesn't know what a watchlist is. It doesn't know
          whether the parent will save to a database, show a toast, or ignore the event entirely. It
          knows how to draw a show and how to announce that someone clicked. Everything else is the
          parent's business.
        </p>

        <p style="margin-top: 12px;">
          That's what people mean by "dumb component" or "presentational component" — and it's why
          this one card can be dropped into a search page, a watchlist page, and a recommendations
          carousel without a single edit.
        </p>

        <app-collapsible icon="🤔" label="Do outputs bubble up through multiple levels like DOM events?">
          <p>
            No — and that surprises people. A custom output is delivered to the component's
            <em>immediate</em> parent only. If a grandparent needs to know, the parent has to declare
            its own output and re-emit. That's deliberate: it keeps the data flow explicit and
            traceable rather than letting events pass invisibly through layers.
          </p>
          <p style="margin-top: 8px;">
            When that re-emitting chain gets long, it's a signal that the state should move into a
            shared service instead — which is exactly what a later day covers.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can write the round trip out in one sentence as a comment at the top of <code>app.html</code>, naming which piece owns the data and which piece owns the click.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day5/act1" class="btn-secondary">← Act 1</a>
        <a routerLink="/day5/act3" class="btn-primary">Act 3: Two-Way with model() →</a>
      </div>
    </div>
  `
})
export class Day5Act2Component {
  models: MentalModel[] = [
    {
      concept: 'output<T>()',
      plainEnglish: 'A component announcing that something happened, with a value attached.',
      analogy: 'A doorbell. The child presses it; what happens next is the parent\'s decision.'
    },
    {
      concept: '.emit(value)',
      plainEnglish: 'Actually ringing the bell, and handing over a payload.',
      analogy: 'Sending the message. If nobody subscribed, it goes nowhere and nothing breaks.'
    },
    {
      concept: '$event',
      plainEnglish: 'The payload the child emitted, available in the parent\'s event binding.',
      analogy: 'The package the courier handed you, not the courier.'
    },
    {
      concept: 'Data down, events up',
      plainEnglish: 'Parents pass values into children; children report back with events.',
      analogy: 'A thermostat reads the room and reports; the heating system decides what to do.'
    }
  ];

  outputBeforeCode = `import { Component, signal, computed, input } from '@angular/core';
import { Show } from '../models/show';

export class ShowCard {
  show = input.required<Show>();

  watched = signal(false);
  episodesWatched = signal(0);
}`;

  outputAfterCode = `import { Component, signal, computed, input, output } from '@angular/core';
import { Show } from '../models/show';

export class ShowCard {
  show = input.required<Show>();
  addToWatchlist = output<Show>();

  watched = signal(false);
  episodesWatched = signal(0);

  add() {
    this.addToWatchlist.emit(this.show());
  }
}`;

  emitTemplateCode = `<article class="card" [class.watched]="watched()">
  <img [src]="show().imageUrl" [alt]="show().name" width="140" />
  <h3>{{ show().name }}</h3>
  <p>{{ show().genre }} · ⭐ {{ show().rating }}</p>

  <button (click)="add()">+ Add to watchlist</button>
  <button (click)="watchEpisode()">+1 episode</button>
</article>`;

  watchlistStateCode = `import { Component, signal, computed } from '@angular/core';
import { Show } from './models/show';

export class App {
  shows = signal<Show[]>([ /* your eight shows from Day 4 */ ]);

  watchlist = signal<Show[]>([]);

  addShow(show: Show) {
    // guard against adding the same show twice
    if (this.watchlist().some(s => s.id === show.id)) return;
    this.watchlist.update(list => [...list, show]);
  }
}`;

  listenBeforeCode = `@for (show of filteredShows(); track show.id) {
  <app-show-card [show]="show" />
}`;

  listenAfterCode = `@for (show of filteredShows(); track show.id) {
  <app-show-card [show]="show" (addToWatchlist)="addShow($event)" />
}`;

  watchlistPanelCode = `<section class="watchlist">
  <h2>Your watchlist ({{ watchlist().length }})</h2>
  @for (show of watchlist(); track show.id) {
    <p>{{ show.name }}</p>
  } @empty {
    <p>Nothing saved yet. Add a show below.</p>
  }
</section>`;

  patternDiagramCode = `        App  (owns shows, watchlist, filters)
         |                              ^
         |  [show]="show"               |  (addToWatchlist)="addShow($event)"
         |  DATA DOWN                   |  EVENTS UP
         v                              |
      ShowCard  (owns how a show looks, and its own episode counter)

ShowCard never touches the watchlist.
App never touches how a card is drawn.`;
}
