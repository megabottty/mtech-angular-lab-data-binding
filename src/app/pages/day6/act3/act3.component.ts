import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day6-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 6 · Act 3 of 3</span>
        <h1>🎨 Why Your CSS Never Leaks, and Debug It</h1>
        <p class="subtitle">Style encapsulation, :host, and making the app finally look like a product.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/components/styling" target="_blank" rel="noopener">Components → Styling</a> — covers view encapsulation modes and <code>:host</code>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Explain why component CSS is automatically scoped, style a component's own tag with <code>:host</code>, and know where global styles belong.</li>
          <li><strong>Why It Matters:</strong> "Why isn't my CSS applying?" is the single most common Angular styling question, and the answer is always encapsulation. Knowing it saves hours.</li>
          <li><strong>Build Steps:</strong> Inspect the rewritten CSS in devtools → use <code>:host</code> on the panel → give the app a real layout → fix two classic bugs.</li>
          <li><strong>Expected Outcome:</strong> A coherent-looking app with a grid layout, and both debug bugs fixed with the reasons understood.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Styling & Debug It)</p>
        <p><strong>Next step:</strong> The Day 6 Lab</p>
        <p><strong>Time:</strong> About 40 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d6-act3-encapsulation" [stepNumber]="1" title="See the Encapsulation for Yourself">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          You've been writing <code>.card</code> in <code>show-card.css</code> for days, and it has
          never once broken another component. That isn't luck or careful naming — Angular scopes
          component styles automatically.
        </p>

        <p><strong>Do this:</strong> open devtools, right-click a show card, Inspect. Look at the actual element:</p>

        <app-code-block lang="html" [code]="devtoolsMarkupCode" />

        <p style="margin-top: 12px;">
          Angular stamped a unique attribute onto the element, and rewrote your CSS selector to
          require it:
        </p>

        <app-code-block lang="css" [code]="rewrittenCssCode" />

        <p style="margin-top: 12px;">
          That's <strong>emulated view encapsulation</strong>, and it's the default for every component
          you've written. Your <code>.card</code> rule can only ever match elements inside
          <em>this</em> component's template. Another component's <code>.card</code> gets a different
          attribute and never collides.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Given that, why does <code>src/styles.css</code> still affect everything?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — it's outside the system on purpose">
          <p>
            <code>src/styles.css</code> is the global layer. It isn't attached to any component, so
            Angular has no attribute to scope it with and doesn't try — it's loaded as an ordinary
            stylesheet. That's the intended split:
          </p>
          <ul style="margin-top: 8px;">
            <li><strong>App-wide look</strong> — fonts, colors, resets, body background — lives in <code>src/styles.css</code>.</li>
            <li><strong>Component-specific look</strong> lives in that component's own <code>.css</code>, scoped automatically.</li>
          </ul>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've found a generated <code>_ngcontent-</code> attribute in devtools and seen the matching rewritten selector in the Styles pane.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d6-act3-host" [stepNumber]="2" title=":host — Styling the Component's Own Tag">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          There's one element a component's CSS can't reach with an ordinary selector: its own tag.
          <code>&lt;app-panel&gt;</code> is written in the <em>parent's</em> template, so nothing inside
          <code>panel.html</code> selects it.
        </p>

        <p style="margin-top: 12px;">
          This matters more than it sounds. By default a custom element like
          <code>&lt;app-panel&gt;</code> is <code>display: inline</code>, so margins and widths on it
          behave strangely until you fix it.
        </p>

        <p><strong>Do this:</strong> in <code>src/app/panel/panel.css</code>:</p>

        <app-code-block lang="css" file="src/app/panel/panel.css" variant="after" [code]="hostCssCode" />

        <p style="margin-top: 12px;">
          <code>:host</code> means "the element this component is mounted on," styled from inside the
          component. And it takes an argument — <code>:host(.danger)</code> means "this component's own
          tag, but only when it also has the <code>danger</code> class," which the parent can apply:
        </p>

        <app-code-block lang="html" file="src/app/app.html" [code]="hostUsageCode" />

        <div class="info-box">
          <strong>Rule of thumb:</strong> if a component should occupy space or have outer spacing, it
          almost always wants <code>:host &#123; display: block; &#125;</code>. Forgetting it is why a
          component sometimes ignores <code>margin</code> or <code>width</code> for no obvious reason.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your panels have consistent vertical spacing driven by the panel's own CSS rather than by margins added in the parent, and <code>:host(.danger)</code> visibly changes a panel's header when the parent adds the class.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d6-act3-layout" [stepNumber]="3" title="Give the App Fifteen Minutes of Love">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Your app works, and it looks like a homework assignment. Morale matters, and it should start
          looking like a product this week. Fifteen minutes, three changes.
        </p>

        <p><strong>1. A global font and background</strong> in <code>src/styles.css</code> — the app-wide layer:</p>

        <app-code-block lang="css" file="src/styles.css" variant="after" [code]="globalStylesCode" />

        <p style="margin-top: 12px;"><strong>2. A real card grid</strong> instead of a flex-wrap row, in <code>src/app/app.css</code>:</p>

        <app-code-block lang="css" file="src/app/app.css" variant="before" [code]="gridBeforeCode" />

        <app-code-block lang="css" file="src/app/app.css" variant="after" [code]="gridAfterCode" />

        <p style="margin-top: 12px;">
          <code>auto-fill</code> plus <code>minmax</code> is the whole trick: "as many columns as fit,
          each at least 180px, sharing the leftover space equally." It's responsive with no media
          queries at all.
        </p>

        <p style="margin-top: 12px;"><strong>3. A header bar</strong> that looks deliberate:</p>

        <app-code-block lang="css" file="src/app/app.css" variant="after" [code]="headerCssCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Cards sit in an even grid that reflows as you resize the window, the app has one consistent font, and the header reads as a real app bar.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d6-act3-debug" [stepNumber]="4" title="Debug It — Two Bugs">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Two snippets, one problem each. Both are things you will genuinely write. Work out the cause
          before expanding.
        </p>

        <h4 style="margin-top: 20px;">Bug 1</h4>
        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="bug1Code" />

        <app-collapsible icon="🐛" label="Show the bug and the fix — an input read in the constructor">
          <p>
            Inputs aren't set when the constructor runs, so <code>this.show()</code> has nothing to
            return. You can fix it by moving the line to <code>ngOnInit</code>:
          </p>
          <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="bug1FixHookCode" />
          <p style="margin-top: 12px;">
            But the <strong>better</strong> fix deletes the hook entirely. <code>genre</code> is derived
            from <code>show</code>, so it's a <code>computed()</code> — which also keeps working if the
            parent later passes a different show, something the <code>ngOnInit</code> version silently
            gets wrong:
          </p>
          <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="bug1FixComputedCode" />
          <p style="margin-top: 8px;">
            The hook version is correct. The computed version is correct <em>and</em> more modern
            Angular — fewer moving parts, no stale value, no lifecycle import.
          </p>
        </app-collapsible>

        <h4 style="margin-top: 24px;">Bug 2</h4>
        <app-code-block lang="css" file="src/app/app.css" variant="before" [code]="bug2Code" />

        <app-collapsible icon="🐛" label="Show the bug and the fix — encapsulation, working exactly as designed">
          <p>
            <code>app.css</code> is scoped to <code>App</code>'s own template. The
            <code>.card</code> element lives inside <code>ShowCard</code>'s template, so it carries a
            different generated attribute and <code>App</code>'s selector can never match it. Nothing
            is broken — this is encapsulation doing its job.
          </p>
          <p style="margin-top: 8px;">There are three legitimate fixes, in order of preference:</p>
          <ul>
            <li><strong>Style it where it lives</strong> — put the rule in <code>show-card.css</code>. Right answer nearly every time.</li>
            <li><strong>Make it a variant the card controls</strong> — add an input (like the <code>compact</code> one from Day 5's lab) and let the card apply its own class.</li>
            <li><strong>Use a CSS custom property</strong> — the card reads <code>var(--card-border)</code>, and the parent or global stylesheet sets it. Custom properties inherit through the DOM, so they cross the encapsulation boundary by design.</li>
          </ul>
          <app-code-block lang="css" file="src/app/show-card/show-card.css" variant="after" [code]="bug2FixCode" />
          <div class="warning-box" style="margin-top: 12px;">
            <strong>You will find <code>::ng-deep</code> on Stack Overflow. Don't use it.</strong> It's
            a deprecated escape hatch that punches through encapsulation and reintroduces exactly the
            global-CSS collisions the system exists to prevent. Every answer recommending it predates
            CSS custom properties being universally available. Use one of the three fixes above.
          </div>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Both bugs reproduced and fixed in your own project, with bug 1 fixed the computed way rather than the hook way.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day6/act2" class="btn-secondary">← Act 2</a>
        <a routerLink="/day6/lab" class="btn-primary">Day 6 Lab →</a>
      </div>
    </div>
  `
})
export class Day6Act3Component {
  models: MentalModel[] = [
    {
      concept: 'View encapsulation',
      plainEnglish: 'Angular rewrites component CSS so it can only match that component template.',
      analogy: 'Every apartment has its own key. Your key opens your door and no one else\'s.'
    },
    {
      concept: ':host',
      plainEnglish: 'A selector for the component\'s own tag, written inside the component.',
      analogy: 'Painting your own front door from inside the apartment.'
    },
    {
      concept: 'src/styles.css',
      plainEnglish: 'The global layer - unscoped, applies everywhere, for app-wide look.',
      analogy: 'The building\'s exterior paint, versus the decor inside each unit.'
    },
    {
      concept: 'CSS custom properties',
      plainEnglish: 'Variables that inherit through the DOM, so they cross component boundaries.',
      analogy: 'A house rule posted in the lobby that every apartment can choose to follow.'
    }
  ];

  devtoolsMarkupCode = `<article _ngcontent-ng-c1234567890 class="card">
  <h3 _ngcontent-ng-c1234567890>Severance</h3>
</article>`;

  rewrittenCssCode = `/* what you wrote in show-card.css */
.card { border: 1px solid #ddd; }

/* what Angular actually shipped */
.card[_ngcontent-ng-c1234567890] { border: 1px solid #ddd; }`;

  hostCssCode = `:host {
  display: block;
  margin-block: 1.5rem;
}

:host(.danger) .panel-header {
  background: #4a1f1f;
  color: #ff9d9d;
}

.panel {
  border: 1px solid #2a2d35;
  border-radius: 10px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: #1c1f26;
}

.panel-header h2 {
  font-size: 16px;
  margin: 0;
}

.panel-body {
  padding: 16px;
}`;

  hostUsageCode = `<app-panel title="Over budget" class="danger">
  <p>You have blown through this week's watch time.</p>
</app-panel>`;

  globalStylesCode = `:root {
  --bg: #14161b;
  --surface: #1c1f26;
  --border: #2a2d35;
  --text: #e6e6e6;
  --muted: #9aa0aa;
  --accent: #4fc3f7;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  line-height: 1.5;
}

h1, h2, h3 { line-height: 1.25; }`;

  gridBeforeCode = `.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}`;

  gridAfterCode = `.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}`;

  headerCssCode = `.app-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  font-weight: 700;
  letter-spacing: 0.2px;
}

main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
}`;

  bug1Code = `export class ShowCard {
  genre = '';

  constructor() {
    this.genre = this.show().genre;
  }
}`;

  bug1FixHookCode = `export class ShowCard implements OnInit {
  genre = '';

  ngOnInit() {
    this.genre = this.show().genre;
  }
}`;

  bug1FixComputedCode = `export class ShowCard {
  genre = computed(() => this.show().genre);
}

// template: {{ genre() }}`;

  bug2Code = `/* src/app/app.css */
.card {
  border: 3px solid red;   /* why does this do nothing? */
}`;

  bug2FixCode = `/* src/app/show-card/show-card.css - style it where the element lives */
.card {
  border: 3px solid var(--card-border, #ddd);
}

/* the parent or src/styles.css can now set the variable:
   .card-grid { --card-border: #4fc3f7; }
   Custom properties inherit through the DOM, so they cross
   the encapsulation boundary on purpose. */`;
}
