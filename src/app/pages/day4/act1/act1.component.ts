import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day4-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 4 · Act 1 of 3</span>
        <h1>🔁 A Real List, and Why HTML Alone Can't Do This</h1>
        <p class="subtitle">One hardcoded card becomes a data-driven array of shows.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 3's BingeBoard is working — a
        <code>ShowCard</code> with signal-based state (<code>watched</code>,
        <code>episodesWatched</code> as signals; <code>minutesWatched</code>, <code>hours</code> as
        computeds). Run <code>ng serve</code> now and confirm your card still renders and toggles.
        Don't have that state handy? <a routerLink="/day4/start">Grab the Day 4 starting point</a> first.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/templates/control-flow" target="_blank" rel="noopener">Templates → Control flow</a> — the <code>&#64;for</code> section explains why <code>track</code> is required.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Render a list from a signal array with <code>&#64;for</code>, and understand why <code>track</code> is mandatory.</li>
          <li><strong>Why It Matters:</strong> Real apps don't hardcode one card at a time — they render an array of any size, and the array changes over time.</li>
          <li><strong>Build Steps:</strong> Warm up with a computed percentage → see why hardcoded cards can't scale → define a <code>Show</code> interface → render the array with <code>&#64;for</code> and <code>&#64;empty</code>.</li>
          <li><strong>Expected Outcome:</strong> A page rendering one card per item in a <code>shows()</code> signal array, with a friendly message when the array is empty.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (The Problem, and a Real List)</p>
        <p><strong>Next step:</strong> Act 2 (Branching: &#64;if/&#64;else and &#64;switch)</p>
        <p><strong>Time:</strong> About 35 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d4-act1-warmup" [stepNumber]="1" title="Warm-Up — A Computed Percentage">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Add a computed called <code>progressPercent</code> to the show card: episodes watched out of a
          hardcoded <code>totalEpisodes = 9</code>, as a percentage. Render it.
        </p>

        <app-code-block lang="typescript" [code]="warmupCode" />

        <p style="margin-top: 12px;">
          A two-minute signals rep — nothing new here, just more practice with <code>computed()</code>
          before today's real topic.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking "+1 episode" updates a rendered percentage, computed fresh every time from two numbers.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d4-act1-problem" [stepNumber]="2" title="The Problem — Hardcoded Cards Don't Scale">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          So far your app renders exactly the shows you hardcode, always, all of them. Real UIs are
          conditional: show an empty-state message only when the list is empty, render one card per show
          in an array, show a spinner while loading. HTML alone can't express "if" or "for each" —
          Angular templates can.
        </p>

        <p style="margin-top: 12px;">
          And forms: typing in a search box should update state, and state should fill the box. That
          round trip — DOM → data → DOM — is <strong>two-way binding</strong>, and it's where today ends
          up.
        </p>

        <div class="think-about-it">
          <p class="tai-q">You could copy-paste your <code>ShowCard</code> markup four times for four shows. What breaks the first time someone adds a fifth show at runtime?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — copy-pasted markup can't respond to data">
          <p>
            Copy-pasted markup is fixed at compile time — it can only ever show the shows you typed by
            hand. The moment the list of shows becomes data (fetched, filtered, added to), you need the
            template itself to loop over an array, and Angular needs a way to know that array changed.
            That's exactly what <code>&#64;for</code> over a signal gives you.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in your own words, why "one hardcoded card per show" stops working once the list of shows becomes data.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d4-act1-show-list" [stepNumber]="3" title="A Show List, and @for + track + @empty">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> create <code>src/app/models/show.ts</code> — your first interface, and your standard home for types:</p>

        <app-code-block lang="typescript" file="src/app/models/show.ts" [code]="showInterfaceCode" />

        <p style="margin-top: 12px;">In <code>app.ts</code>, hold the list as a signal:</p>

        <app-code-block lang="typescript" file="src/app/app.ts" [code]="showsSignalCode" />

        <div class="info-box">
          <strong>Copy this list, don't retype it.</strong> Those are real TVMaze poster URLs, so the images
          actually load — typing URLs by hand isn't learning, it's just typos. The eight shows are chosen
          deliberately: four different genres, one show rated below 7 and two rated 9+, so every branch you
          build today and in the lab has something real to match against.
        </div>

        <p style="margin-top: 12px;">Then in <code>app.html</code> (plain markup for now — the reusable card component comes Day 5, and that's fine):</p>

        <app-code-block lang="html" file="src/app/app.html" [code]="forLoopCode" />

        <p style="margin-top: 12px;">
          <code>track</code> is the moving-crowd rule: when the array changes, Angular needs to know which
          DOM card corresponds to which show, so it can move/update instead of destroy/rebuild. Picture a
          crowd of people wearing name tags — the name tag is <code>show.id</code>. Without it, Angular
          can only tell people apart by where they're standing, so any reorder looks like everyone leaving
          and new people arriving. <code>track show.id</code> is required — the compiler enforces it.
        </p>

        <p style="margin-top: 12px;">
          The <code>&#64;empty</code> block only renders when the array has zero items — set
          <code>shows</code> to an empty array and the "No shows yet" message appears automatically, with
          no manual length check.
        </p>

        <app-collapsible icon="📜" label="What about *ngFor and *ngIf? I keep finding those online">
          <p>
            <code>*ngFor</code>, <code>*ngIf</code>, and <code>*ngSwitch</code> are the <strong>legacy
            directive syntax</strong>. They still work, and most tutorials written before 2024 use them, so
            you will absolutely run into them. But <code>&#64;for</code>/<code>&#64;if</code>/<code>&#64;switch</code>
            are the modern built-in control flow: they're faster, they don't require importing
            <code>CommonModule</code>, and they're what new Angular code is written in.
          </p>
          <p style="margin-top: 8px;">
            When you find old code, translate it rather than adopting it. The mapping is direct:
          </p>
          <ul>
            <li><code>*ngFor="let s of shows"</code> → <code>&#64;for (s of shows(); track s.id) &#123; ... &#125;</code></li>
            <li><code>*ngIf="ready"</code> → <code>&#64;if (ready) &#123; ... &#125;</code></li>
            <li><code>*ngIf="ready; else other"</code> → <code>&#64;if (ready) &#123; ... &#125; &#64;else &#123; ... &#125;</code></li>
          </ul>
          <p style="margin-top: 8px;">
            The biggest practical difference: <code>&#64;for</code> <em>requires</em> <code>track</code>,
            while <code>*ngFor</code> made it optional via <code>trackBy</code>. That's a deliberate upgrade,
            for the reason described just below.
          </p>
        </app-collapsible>

        <app-collapsible icon="⚠️" label="Common mistake — track show instead of track show.id">
          <p>
            Writing <code>track show</code> compiles and often appears to work, so it's easy to adopt by
            accident. It tracks by <strong>object identity</strong> — the item's place in memory — rather
            than by a stable id. That's fine while the array holds the exact same object references, but it
            breaks the moment the objects are replaced rather than mutated: reloading from an API, mapping
            over the list, or spreading into new objects all produce brand-new references for
            logically-identical shows. Angular then sees an entirely different crowd and rebuilds every DOM
            node, losing scroll position, focus, and animation state.
          </p>
          <p style="margin-top: 8px;">
            Reach for <code>track show.id</code> whenever your data has a stable unique id — which is almost
            always. Track by index only for lists that are never reordered or filtered.
          </p>
        </app-collapsible>

        <div class="warning-box">
          <strong>Signals and arrays:</strong> <code>this.shows().push(newShow)</code> will <em>not</em>
          update the page. That reads the array out of the signal and mutates it in place, so the signal
          itself never changes and nothing gets notified. Always replace the value instead:
          <code>this.shows.update(list =&gt; [...list, newShow])</code>. This trips up nearly everyone once,
          and it matters constantly once your lists start changing at runtime.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your page renders one card per show in the array, and setting the array to <code>[]</code> shows the empty-state message instead of a blank page.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day3/lab" class="btn-secondary">← Day 3 Lab</a>
        <a routerLink="/day4/act2" class="btn-primary">Act 2: Branching →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: '@for / track',
      plainEnglish: 'Renders one block of markup per item in an array, using a stable key to tell Angular which DOM element maps to which item.',
      analogy: 'A crowd of people wearing name tags — the name tag lets you track a specific person even as the crowd reshuffles.'
    },
    {
      concept: '@empty',
      plainEnglish: 'A block that renders automatically when the array being looped over has zero items — no manual length check needed.',
      analogy: 'A store\'s "back in stock soon" sign that only appears when the shelf is actually empty.'
    },
    {
      concept: 'Two-way binding',
      plainEnglish: 'A round trip where typing into an input updates a signal, and the signal changing updates the input\'s displayed value.',
      analogy: 'A thermostat display and dial in sync — turn the dial and the display updates; if the display changed on its own, the dial would move too.'
    },
    {
      concept: 'interface',
      plainEnglish: 'A shape you describe once for your data, so the compiler catches typos and missing fields before you ever run the app.',
      analogy: 'A form template with labeled blanks — you can\'t submit it missing a field the template requires.'
    }
  ];

  warmupCode = `episodesWatched = signal(0);
totalEpisodes = 9;

progressPercent = computed(() =>
  Math.round((this.episodesWatched() / this.totalEpisodes) * 100)
);`;

  showInterfaceCode = `export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
}`;

  showsSignalCode = `import { signal } from '@angular/core';
import { Show } from './models/show';

shows = signal<Show[]>([
  { id: 1, name: 'Severance',     genre: 'Drama',   rating: 8.7, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371406.jpg' },
  { id: 2, name: 'The Bear',      genre: 'Drama',   rating: 8.6, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/629/1574642.jpg' },
  { id: 3, name: 'Bluey',         genre: 'Kids',    rating: 9.5, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/512/1281879.jpg' },
  { id: 4, name: 'Slow Horses',   genre: 'Thriller', rating: 8.2, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/637/1593462.jpg' },
  { id: 5, name: 'The Last of Us', genre: 'Thriller', rating: 8.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/563/1409008.jpg' },
  { id: 6, name: 'Shogun',        genre: 'Drama',   rating: 9.1, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/506/1265637.jpg' },
  { id: 7, name: 'Ted Lasso',     genre: 'Comedy',  rating: 8.4, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/634/1585930.jpg' },
  { id: 8, name: 'Emily in Paris',genre: 'Comedy',  rating: 6.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/604/1510920.jpg' },
]);`;

  forLoopCode = `@for (show of shows(); track show.id) {
  <article class="card">
    <h3>{{ show.name }}</h3>
    <p>{{ show.genre }} · ⭐ {{ show.rating }}</p>
  </article>
} @empty {
  <p>No shows yet. Add some!</p>
}`;
}
