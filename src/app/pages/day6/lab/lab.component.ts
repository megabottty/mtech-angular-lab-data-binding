import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day6-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Collapsible Panels and a Timer That Cleans Up</h1>
        <p class="subtitle">About 50 minutes. 4 tasks on projection, lifecycle, and styling.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Complete Acts 1-3 first — this lab assumes you have a <code>Panel</code> component using
          <code>&lt;ng-content&gt;</code>, both major sections of the app wrapped in one, and
          <code>ngOnInit</code>/<code>ngOnDestroy</code> logging on <code>ShowCard</code>. Don't have
          that state? <a routerLink="/day6/start">Start from the Day 6 starting point</a> and work
          through the acts.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Prove to yourself that a feature added to one composed component appears everywhere it's used, and that cleanup code actually runs.</li>
          <li><strong>Why It Matters:</strong> Task 1 is the payoff of composition in a single edit. Task 3 is the first memory leak you'll prevent instead of discover in production.</li>
          <li><strong>Build Steps:</strong> A collapse toggle on <code>Panel</code> → a projected empty-state slot → a self-cleaning ticker → visual polish.</li>
          <li><strong>Expected Outcome:</strong> Panels that collapse, a custom empty state passed in as markup, and a timer you've verified stops.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 6 Lab (final step of Day 6)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> About 50 minutes total.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="d6-lab-collapsible" [stepNumber]="'Task 1'" title="Collapsible Panel">
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: internal <code>signal()</code>, <code>&#64;if</code> around projected content.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a collapse toggle to <code>Panel</code>'s header. Clicking it hides the body; clicking
          again shows it. The state is <code>Panel</code>'s own business — no input, no output, just an
          internal signal.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add <code>expanded = signal(true)</code> to <code>Panel</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Put a toggle button in <code>.panel-header</code> that flips it with <code>update()</code>, showing ▾ when expanded and ▸ when collapsed.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Wrap <code>.panel-body</code> in <code>&#64;if (expanded())</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Reload and collapse <strong>both</strong> panels. Note how many files you edited to get that.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — and why step 4 is the actual lesson">
          <p>
            You edited <strong>one</strong> component and both panels gained the feature — plus every
            panel you add from here gets it for free, with no further work. That's the payoff of
            composition, and it's worth pausing on: if you had copy-pasted the panel markup into
            <code>app.html</code> twice back in Act 1, this task would be two edits that have to stay
            in sync forever.
          </p>
          <p style="margin-top: 8px;">
            Note also that collapsing doesn't destroy the projected content's <em>state</em> ownership —
            the shows still live in <code>App</code>. But <code>&#64;if</code> does remove the DOM, so
            watch your Act 2 console logs: collapsing the browse panel destroys every card in it.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Both panels collapse and expand independently from a single edit to <code>Panel</code>, and collapsing the browse panel prints "card died" for every visible card.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" file="src/app/panel/panel.ts" [code]="collapseTsCode" />
          <app-code-block lang="html" file="src/app/panel/panel.html" [code]="collapseHtmlCode" />
          <app-code-block lang="css" file="src/app/panel/panel.css" [code]="collapseCssCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="d6-lab-empty-slot" [stepNumber]="'Task 2'" title="Projected Empty State">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>select</code> slots, <code>&#64;if</code>, projection scope.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          <code>WatchlistPanel</code> currently hardcodes "Nothing saved yet." Let the parent supply
          that message as markup instead, so the same component can say something different in a
          different context.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add <code>&lt;ng-content select="[empty-state]" /&gt;</code> inside <code>WatchlistPanel</code>'s <code>&#64;empty</code> block.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>From <code>app.html</code>, pass <code>&lt;p empty-state&gt;Nothing yet — go browse!&lt;/p&gt;</code> into it.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Confirm the message shows only when the watchlist is empty, and disappears once you add a show.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Put a binding in the projected message — something like the total show count — and confirm it resolves against <code>App</code>, not the panel.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — projected content is created even when it's not shown">
          <p>
            An important subtlety: content you project is written in the parent's template, so its
            bindings evaluate against the parent — step 4 proves it. Reference something only the panel
            has and you'll get a compile error naming <code>App</code> as the component that doesn't
            have it, which is a useful error to see once on purpose.
          </p>
          <p style="margin-top: 8px;">
            The <code>&#64;if</code>/<code>&#64;empty</code> around the <code>ng-content</code> controls
            whether the slot is <em>rendered</em>, so the message genuinely isn't in the DOM when the
            list has items.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The empty-state message comes from <code>app.html</code> rather than being hardcoded in the panel, shows only when the list is empty, and can bind to <code>App</code>'s own data.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" file="src/app/watchlist-panel/watchlist-panel.ts" [code]="emptySlotTsCode" />
          <app-code-block lang="html" file="src/app/app.html" [code]="emptySlotUsageCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="d6-lab-lifecycle-proof" [stepNumber]="'Task 3'" title="Lifecycle Proof — A Ticker That Actually Stops">
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: <code>ngOnInit</code>, <code>ngOnDestroy</code>, <code>clearInterval</code>, proving cleanup.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a "seconds on screen" ticker to <code>ShowCard</code> using <code>setInterval</code> in
          <code>ngOnInit</code> — and clear it in <code>ngOnDestroy</code>. Then <strong>prove</strong>
          the timer stopped, rather than assuming it did.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add <code>secondsOnScreen = signal(0)</code> and start an interval in <code>ngOnInit</code> that increments it every second. Render it on the card.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Store the id returned by <code>setInterval</code> on the class, and <code>clearInterval</code> it in <code>ngOnDestroy</code>.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Add a <code>console.log</code> <em>inside</em> the interval callback that prints the show's name and the tick count.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Filter a card away and watch the console. Its ticks must stop. Now comment out the <code>clearInterval</code>, filter again, and watch it keep logging from a component that no longer exists.</span></div>
          <div class="task-step"><span class="step-dot">5</span><span>Put the <code>clearInterval</code> back.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — step 4 is the whole point, don't skip it">
          <p>
            Seeing a destroyed component keep logging is the moment this lands. That orphaned callback
            still holds a reference to the component instance, so the browser can't garbage-collect it
            — the component is gone from the screen and still occupying memory. Twenty filtered-away
            cards means twenty of them.
          </p>
          <p style="margin-top: 8px;">
            Type <code>ReturnType&lt;typeof setInterval&gt;</code> for the id rather than
            <code>number</code>: in a browser <code>setInterval</code> returns a number, but the Node
            typings return a <code>Timeout</code> object, and this way it compiles either way.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Each card shows a live seconds counter, and you have watched the console prove — with the cleanup removed and then restored — that <code>ngOnDestroy</code> is what stops it.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="tickerTsCode" />
          <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="tickerHtmlCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 4 -->
      <app-lesson-step stepId="d6-lab-polish-stretch" [stepNumber]="'Task 4'" title="Stretch — Polish">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>transition</code>, <code>:host</code>, CSS custom properties.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Make it feel finished. A hover lift on the cards, a smooth collapse rather than a snap, and
          a focus style that doesn't look like the browser default.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Give <code>.card</code> a <code>transition</code> on <code>transform</code> and <code>box-shadow</code>, and lift it slightly on <code>:hover</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Animate the panel's collapse. <code>&#64;if</code> removes the element outright, so animate the toggle chevron's rotation instead — an honest solution rather than a fake one.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Add a visible <code>:focus-visible</code> outline on buttons using your <code>--accent</code> variable, so keyboard users can see where they are.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Wrap the movement in <code>&#64;media (prefers-reduced-motion: reduce)</code> so the animations turn themselves off for anyone who asked for that.</span></div>
        </div>

        <app-collapsible icon="💡" label="Hint — why the chevron and not the body">
          <p>
            You can't CSS-transition an element into existence — <code>&#64;if</code> adds and removes
            it from the DOM, with no intermediate state to animate. Animating height properly needs
            Angular's animations package or a max-height trick, both of which are more than this task
            is worth. Rotating the chevron gives you the feeling of motion for three lines of CSS.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Cards lift on hover, the chevron rotates when a panel collapses, keyboard focus is clearly visible, and all of it stops moving under reduced-motion.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <app-code-block lang="css" file="src/app/show-card/show-card.css" [code]="polishCardCss" />
          <app-code-block lang="css" file="src/app/panel/panel.css" [code]="polishPanelCss" />
          <app-code-block lang="css" file="src/styles.css" [code]="polishGlobalCss" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day6/act3" class="btn-secondary">← Act 3: Styling & Debug It</a>
        <a routerLink="/" class="btn-primary">Back to Home →</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> <code>Panel</code> wraps both major sections of the app via content projection, and gaining the collapse feature took one edit.</li>
          <li><span class="checkbox">✅</span> You watched cards get born and destroyed in the console, and can say what runs in <code>ngOnInit</code> that can't run in the <code>constructor</code>, and why.</li>
          <li><span class="checkbox">✅</span> The interval exercise cleans up after itself, and you proved it by removing the cleanup and watching it misbehave.</li>
          <li><span class="checkbox">✅</span> The app has a coherent visual layout, with global styles and component styles in the right places.</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 6. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Wrap arbitrary content with <code>&lt;ng-content&gt;</code>, including multiple slots.</li>
          <li>✅ Use <code>ngOnInit</code> and <code>ngOnDestroy</code>, and say when each fires.</li>
          <li>✅ Explain why component CSS doesn't leak, and style a component's own tag with <code>:host</code>.</li>
          <li>✅ Recognize when a <code>computed()</code> is the better answer than a lifecycle hook.</li>
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
export class Day6LabComponent {
  collapseTsCode = `import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [],
  templateUrl: './panel.html',
  styleUrl: './panel.css'
})
export class Panel {
  title = input.required<string>();

  // the panel's own business - no input, no output
  expanded = signal(true);

  toggle() {
    this.expanded.update(open => !open);
  }
}`;

  collapseHtmlCode = `<section class="panel">
  <header class="panel-header">
    <h2>{{ title() }}</h2>

    <span class="header-actions">
      <ng-content select="[panel-actions]" />
      <button
        type="button"
        class="toggle"
        [class.collapsed]="!expanded()"
        (click)="toggle()"
        [attr.aria-expanded]="expanded()"
        [attr.aria-label]="expanded() ? 'Collapse panel' : 'Expand panel'"
      >▾</button>
    </span>
  </header>

  @if (expanded()) {
    <div class="panel-body">
      <ng-content />
    </div>
  }
</section>`;

  collapseCssCode = `:host {
  display: block;
  margin-block: 1.5rem;
}

.panel {
  border: 1px solid var(--border, #2a2d35);
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface, #1c1f26);
}

.panel-header h2 { font-size: 16px; margin: 0; }

.header-actions { display: flex; align-items: center; gap: 8px; }

.toggle {
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
}

.panel-body { padding: 16px; }`;

  emptySlotTsCode = `import { Component, input, output } from '@angular/core';
import { Show } from '../models/show';

@Component({
  selector: 'app-watchlist-panel',
  standalone: true,
  imports: [],
  template: \`
    <section class="watchlist">
      @for (show of shows(); track show.id) {
        <p class="row">
          {{ show.name }}
          <button (click)="remove.emit(show)" aria-label="Remove">✕</button>
        </p>
      } @empty {
        <ng-content select="[empty-state]" />
      }
    </section>
  \`,
  styles: [\`
    .row { display: flex; justify-content: space-between; align-items: center; }
    .row button { background: none; border: none; color: #f44747; cursor: pointer; }
  \`]
})
export class WatchlistPanel {
  shows = input.required<Show[]>();
  remove = output<Show>();
}`;

  emptySlotUsageCode = `<app-panel title="My watchlist">
  <app-watchlist-panel [shows]="watchlist()" (remove)="removeShow($event)">
    <!-- written in App's template, so it binds to App's data -->
    <p empty-state>
      Nothing yet - go browse all {{ shows().length }} shows!
    </p>
  </app-watchlist-panel>
</app-panel>`;

  tickerTsCode = `import { Component, signal, computed, input, output, model, OnInit, OnDestroy } from '@angular/core';
import { Show } from '../models/show';

export class ShowCard implements OnInit, OnDestroy {
  show = input.required<Show>();

  secondsOnScreen = signal(0);

  // browser setInterval returns a number, Node typings return a Timeout -
  // this compiles under either
  private timerId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    console.log('card born:', this.show().name);

    this.timerId = setInterval(() => {
      this.secondsOnScreen.update(n => n + 1);
      console.log(this.show().name, 'tick', this.secondsOnScreen());
    }, 1000);
  }

  ngOnDestroy() {
    console.log('card died:', this.show().name);
    clearInterval(this.timerId);   // comment this out to watch the leak
  }
}`;

  tickerHtmlCode = `<p class="muted">On screen: {{ secondsOnScreen() }}s</p>`;

  polishCardCss = `.card {
  border: 1px solid var(--border, #2a2d35);
  border-radius: 10px;
  padding: 1rem;
  background: var(--surface, #1c1f26);
  transition: transform 150ms ease, box-shadow 150ms ease;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgb(0 0 0 / 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
  .card:hover { transform: none; }
}`;

  polishPanelCss = `.toggle {
  transition: transform 150ms ease;
}

/* @if removes the body from the DOM entirely, so there is nothing to
   animate there - rotate the chevron instead */
.toggle.collapsed {
  transform: rotate(-90deg);
}

@media (prefers-reduced-motion: reduce) {
  .toggle { transition: none; }
}`;

  polishGlobalCss = `button:focus-visible,
a:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid var(--accent, #4fc3f7);
  outline-offset: 2px;
}`;
}
