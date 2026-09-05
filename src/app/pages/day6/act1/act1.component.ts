import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day6-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 6 · Act 1 of 3</span>
        <h1>🕳️ Passing Markup, Not Just Data</h1>
        <p class="subtitle">Inputs pass values. Content projection passes whole chunks of template.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 5's BingeBoard is working — a
        <code>ShowCard</code> with <code>input.required&lt;Show&gt;()</code> and an
        <code>addToWatchlist</code> output, plus a <code>WatchlistPanel</code> and an
        <code>App</code> that owns the watchlist. Run <code>ng serve</code> and confirm you can add
        and remove shows. Don't have that state handy?
        <a routerLink="/day6/start">Grab the Day 6 starting point</a> first.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/components/content-projection" target="_blank" rel="noopener">Components → Content projection</a> — covers <code>&lt;ng-content&gt;</code>, multiple slots with <code>select</code>, and projection scope.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build a reusable <code>Panel</code> frame that wraps arbitrary content using <code>&lt;ng-content&gt;</code>.</li>
          <li><strong>Why It Matters:</strong> Card frames, modals, collapsible sections, alert boxes — every one of them is "identical wrapper, different contents." You can't push markup through an input.</li>
          <li><strong>Build Steps:</strong> Warm up with a quick recall round → see why an input can't carry markup → build <code>Panel</code> → wrap both major sections of the app → add a second slot with <code>select</code>.</li>
          <li><strong>Expected Outcome:</strong> Both the browse list and the watchlist wrapped in the same <code>Panel</code> component, with different contents in each.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Content Projection)</p>
        <p><strong>Next step:</strong> Act 2 (Lifecycle Hooks)</p>
        <p><strong>Time:</strong> About 35 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d6-act1-warmup" [stepNumber]="1" title="Warm-Up — Recall Round, Then One Small Input">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Answer these four from memory before you scroll — no peeking at Day 5:
        </p>

        <div class="think-about-it">
          <p class="tai-q">Which direction do inputs flow? Which direction do outputs flow? What enforces <code>input.required</code>? What does <code>track</code> actually do?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — all four">
          <ul>
            <li><strong>Inputs flow down</strong> — parent to child, always.</li>
            <li><strong>Outputs flow up</strong> — child to its immediate parent, and no further.</li>
            <li><strong><code>input.required</code> is enforced by the compiler</strong> — a parent that omits it fails the build, not at runtime.</li>
            <li><strong><code>track</code> gives each rendered item an identity</strong>, so when the array changes Angular can move and update existing DOM instead of destroying and rebuilding it.</li>
          </ul>
        </app-collapsible>

        <p style="margin-top: 16px;">
          <strong>Then do this:</strong> five minutes of practice. Give <code>WatchlistPanel</code> an
          optional <code>subtitle</code> input and render it under the heading, then pass one in from
          <code>app.html</code>.
        </p>

        <app-code-block lang="typescript" file="src/app/watchlist-panel/watchlist-panel.ts" variant="after" [code]="warmupTsCode" />

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="warmupUsageCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A subtitle appears under the watchlist heading, passed in from the parent — one more rep of "data down" before today's twist.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d6-act1-problem" [stepNumber]="2" title="The Problem — You Can't Put HTML Through an Input">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Look at your <code>app.html</code>. The browse list and the watchlist both want the same
          visual treatment: a bordered box, a heading bar, some padding. Identical frame, completely
          different contents.
        </p>

        <p style="margin-top: 12px;">
          Your instinct from Day 5 is an input. Try to write it and you immediately see the problem:
        </p>

        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="cantDoThisCode" />

        <p style="margin-top: 12px;">
          An input carries a <em>value</em> — a string, a number, an object. The contents here aren't a
          value; they're <strong>template</strong>: elements, bindings, other components, event
          handlers. There's no input type that holds that.
        </p>

        <p style="margin-top: 12px;">
          So Angular flips it around. Instead of the parent handing the markup <em>in</em>, the child
          leaves a <strong>hole</strong> in its own template and says "put whatever you were given
          here." That hole is <code>&lt;ng-content&gt;</code>, and the mechanism is called
          <strong>content projection</strong>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Couldn't you just copy the panel markup into both places and skip the whole idea?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — you could, and you'd pay for it in Task 1 of the lab">
          <p>
            Copy-pasting a frame works right up until you want to change it. In this lab you'll add a
            collapse toggle to the panel — with a real <code>Panel</code> component that's one edit and
            every usage gains the feature. With copy-pasted markup it's an edit per copy, and the third
            copy is the one you forget.
          </p>
          <p style="margin-top: 8px;">
            That's the actual payoff of composition: features get added in one place and appear
            everywhere the piece is used.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can state the difference between "data the parent passes" and "markup the parent passes," and name the tool for each.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d6-act1-ng-content" [stepNumber]="3" title="Building the Panel Component">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> generate the component from the CLI, so Angular writes the boilerplate and registers the file layout for you.</p>

        <app-code-block lang="bash" [code]="generateCommand" />

        <p style="margin-top: 12px;">
          That creates <code>src/app/panel/</code> with a <code>.ts</code>, <code>.html</code>, and
          <code>.css</code>. Fill in the template:
        </p>

        <app-code-block lang="html" file="src/app/panel/panel.html" variant="after" [code]="panelHtmlCode" />

        <app-code-block lang="typescript" file="src/app/panel/panel.ts" variant="after" [code]="panelTsCode" />

        <p style="margin-top: 12px;">
          Look carefully at what each piece is doing, because this is the whole lesson in six lines:
        </p>

        <ul>
          <li><strong><code>title</code> is data</strong>, so it's an <code>input()</code> and you read it with <code>title()</code>.</li>
          <li><strong>The body is markup</strong>, so it's <code>&lt;ng-content /&gt;</code> — a hole, not a value.</li>
        </ul>

        <p style="margin-top: 12px;">
          Two tools, two jobs. Almost every reusable component you write from here uses both at once.
        </p>

        <div class="info-box">
          <strong><code>&lt;ng-content /&gt;</code> renders nothing itself.</strong> It's not a
          wrapper element — no <code>&lt;ng-content&gt;</code> tag appears in the DOM. It's a marker
          saying "the parent's content goes here," and at runtime the parent's actual elements are
          placed at that spot. Open devtools after the next step and you'll see the projected markup
          sitting directly inside <code>.panel-body</code>.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>src/app/panel/</code> exists with a <code>title</code> input and an <code>&lt;ng-content /&gt;</code> in its body, and the project still compiles.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d6-act1-wrapping" [stepNumber]="4" title="Wrapping Both Sections of the App">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> in <code>src/app/app.html</code>, wrap the browse list and the watchlist in panels.</p>

        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="wrapBeforeCode" />

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="wrapAfterCode" />

        <p style="margin-top: 12px;">
          And import it, because standalone components only see what they import:
        </p>

        <app-code-block lang="typescript" file="src/app/app.ts" variant="after" [code]="importPanelCode" />

        <p style="margin-top: 12px;">
          Save. Both sections now have the same frame, and neither of them knows anything about the
          other. <code>Panel</code> doesn't know what a show is; the show list doesn't know it's inside
          a panel.
        </p>

        <div class="warning-box">
          <strong>Read this before it bites you:</strong> bindings inside projected content belong to
          the <strong>parent</strong>, not the panel. <code>filteredShows()</code> and
          <code>searchTerm</code> in the markup above are resolved against <code>App</code>, because
          that's whose template the markup is written in. <code>Panel</code> could have its own
          <code>filteredShows</code> and it would make no difference — projection moves where content
          is <em>displayed</em>, never where its bindings are <em>evaluated</em>.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Given that rule, what happens if <code>Panel</code> has a <code>title</code> input and the projected content also references something called <code>title</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — they never collide">
          <p>
            They're evaluated in completely separate scopes. <code>{{ "{{ title() }}" }}</code> inside
            <code>panel.html</code> reads the panel's input. A <code>title</code> referenced in the
            projected markup reads the parent's <code>title</code>. Same word, two different templates,
            zero interaction — which is exactly why projection is safe to use everywhere.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Both the browse section and the watchlist render inside identical panel frames with different headings, and all the filtering and watchlist behavior still works untouched.</div>
      </app-lesson-step>

      <!-- Step 5 -->
      <app-lesson-step stepId="d6-act1-multi-slot" [stepNumber]="5" title="Multiple Slots with select">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          One hole is the common case. Sometimes you want two — say, a place for action buttons in the
          panel header, separate from the body. Give each <code>ng-content</code> a
          <code>select</code>:
        </p>

        <app-code-block lang="html" file="src/app/panel/panel.html" variant="after" [code]="multiSlotCode" />

        <p style="margin-top: 12px;">The parent marks which content goes where with a plain attribute:</p>

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="multiSlotUsageCode" />

        <p style="margin-top: 12px;">
          <code>select</code> takes a CSS selector, so <code>[panel-actions]</code> means "any element
          with that attribute." Anything that doesn't match a <code>select</code> falls through to the
          plain <code>&lt;ng-content /&gt;</code>, which acts as the catch-all. Keep that catch-all
          slot, or unmatched content silently disappears.
        </p>

        <div class="info-box">
          <strong>Recognition-level for now.</strong> You'll use single-slot projection constantly and
          multi-slot occasionally. Know it exists and roughly how it reads; don't go build a
          six-slot component today.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A "Clear filters" button rendered in the panel's header bar rather than its body, positioned by the panel's own CSS rather than by the parent.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day6/start" class="btn-secondary">← Day 6 Starting Point</a>
        <a routerLink="/day6/act2" class="btn-primary">Act 2: Lifecycle Hooks →</a>
      </div>
    </div>
  `
})
export class Day6Act1Component {
  models: MentalModel[] = [
    {
      concept: '<ng-content />',
      plainEnglish: 'A hole in a component template that the parent fills with markup.',
      analogy: 'A picture frame. The frame is the component; the photo is whatever you put in it.'
    },
    {
      concept: 'Content projection',
      plainEnglish: 'Passing template into a component instead of passing a value.',
      analogy: 'Handing someone a filled envelope, versus telling them a number over the phone.'
    },
    {
      concept: 'select="[attr]"',
      plainEnglish: 'A second hole that only accepts content matching a CSS selector.',
      analogy: 'Labeled slots in a mail sorter. Unlabeled mail goes in the general tray.'
    },
    {
      concept: 'Projection scope',
      plainEnglish: 'Projected markup is evaluated against the parent, wherever it ends up displayed.',
      analogy: 'A letter is written in your handwriting no matter whose mailbox it lands in.'
    }
  ];

  warmupTsCode = `import { Component, input, output } from '@angular/core';
import { Show } from '../models/show';

export class WatchlistPanel {
  shows = input.required<Show[]>();
  subtitle = input('');          // optional, so existing usages still compile
  remove = output<Show>();
}

// in the template, under the <h2>:
// @if (subtitle()) { <p class="subtitle">{{ subtitle() }}</p> }`;

  warmupUsageCode = `<app-watchlist-panel
  [shows]="watchlist()"
  subtitle="Shows you saved for later"
  (remove)="removeShow($event)"
/>`;

  cantDoThisCode = `<!-- You want this... -->
<app-panel title="Browse shows" [contents]="???" />

<!-- ...but there is no input type that holds this: -->
<input placeholder="Filter shows..." [(ngModel)]="searchTerm" />
@for (show of filteredShows(); track show.id) {
  <app-show-card [show]="show" (addToWatchlist)="addShow($event)" />
}`;

  generateCommand = `ng g c panel`;

  panelHtmlCode = `<section class="panel">
  <header class="panel-header">
    <h2>{{ title() }}</h2>
  </header>

  <div class="panel-body">
    <ng-content />
  </div>
</section>`;

  panelTsCode = `import { Component, input } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {
  title = input.required<string>();
}`;

  wrapBeforeCode = `<app-watchlist-panel [shows]="watchlist()" (remove)="removeShow($event)" />

<section class="filters">
  <input placeholder="Filter shows..." [(ngModel)]="searchTerm" />
  <!-- ...the genre and sort selects... -->
</section>

<div class="card-grid">
  @for (show of filteredShows(); track show.id) {
    <app-show-card [show]="show" (addToWatchlist)="addShow($event)" />
  }
</div>`;

  wrapAfterCode = `<app-panel title="My watchlist">
  <app-watchlist-panel [shows]="watchlist()" (remove)="removeShow($event)" />
</app-panel>

<app-panel title="Browse shows">
  <section class="filters">
    <input placeholder="Filter shows..." [(ngModel)]="searchTerm" />
    <!-- ...the genre and sort selects... -->
  </section>

  <div class="card-grid">
    @for (show of filteredShows(); track show.id) {
      <app-show-card [show]="show" (addToWatchlist)="addShow($event)" />
    }
  </div>
</app-panel>`;

  importPanelCode = `import { Panel } from './panel/panel';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ShowCard, WatchlistPanel, Panel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App { /* unchanged */ }`;

  multiSlotCode = `<section class="panel">
  <header class="panel-header">
    <h2>{{ title() }}</h2>
    <ng-content select="[panel-actions]" />
  </header>

  <div class="panel-body">
    <ng-content />   <!-- catch-all: everything that didn't match above -->
  </div>
</section>`;

  multiSlotUsageCode = `<app-panel title="Browse shows">
  <button panel-actions (click)="clearFilters()">Clear filters</button>

  <!-- no attribute, so this goes to the catch-all slot -->
  <div class="card-grid">
    @for (show of filteredShows(); track show.id) {
      <app-show-card [show]="show" (addToWatchlist)="addShow($event)" />
    }
  </div>
</app-panel>`;
}
