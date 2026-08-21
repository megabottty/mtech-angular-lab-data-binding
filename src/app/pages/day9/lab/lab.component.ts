import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day9-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Ship the Rest of BingeBoard's Routing</h1>
        <p class="subtitle">
          50 minutes. 4 tasks. Extend the Show Detail page and the app's route table on your own.
          Hints and answers are here if you get stuck — but try first!
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Copy the working Act 4 code (guarded, lazy <code>/stats</code> route; working
          <code>/show/:id</code> detail page) into your project before starting.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Independently extend a real routed app with navigation, guards, and lazy loading you decide how to apply.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Production apps constantly add these exact features — prev/next flows, graceful bad-input handling,
            product judgment about what to gate behind a guard, and bundle-size discipline.
          </li>
          <li>
            <strong>Build Steps:</strong>
            prev/next nav → not-found handling → guard experiment (and reversal) → stretch lazy-loading everything.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            Students can make and defend routing design decisions, not just follow steps.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 9 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below, then move on to Day 13's real HTTP swap for ShowsService.</p>
      </section>

      <app-lesson-step
        stepId="d9-lab-prevnext"
        [stepNumber]="'Task 1'"
        title="Prev / Next Episode of the Tour"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: computed(), array index math, routerLink vs navigate().</span>
        </div>

        <h4>What to build:</h4>
        <p>
          On <code>ShowDetail</code>, add <code>← Previous show</code> / <code>Next show →</code> controls that move
          through the full <code>ShowsService</code> catalog by id, wrapping around at the ends so last goes to first
          and first goes to last.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Should prev/next be <code>routerLink</code> with a computed target id, or a <code>navigate()</code> method
          call? Both are defensible — which would you pick and why?</p>
          <p class="tai-a">Use <code>routerLink</code> bound to a computed signal when the destination can be fully derived from reactive state — it keeps the navigation intent visible in the template and requires no method. Use <code>router.navigate()</code> when navigation must happen in response to an event with side effects (like saving data first). For prev/next, a computed <code>prevShowId</code>/<code>nextShowId</code> signal bound to <code>[routerLink]</code> is the cleaner choice because the destination is pure derived state with no side effects.</p>
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Compute the current show's index from <code>this.showsSvc.all()</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Create wrapped <code>prevShowId</code> and <code>nextShowId</code> computed signals.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Render the links only when a valid show is loaded.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> You can drive route-to-route navigation from computed state without
          losing the detail page context.
        </div>

        <app-collapsible icon="💡" label="Hint — Find the current index, then wrap with modulo">
          <p>
            Start by deriving the active show's position with
            <code>this.showsSvc.all().findIndex(s => s.id === this.show()?.id)</code>. Once you have the index,
            use modulo math so the list wraps around instead of falling off either end.
          </p>
          <app-code-block lang="typescript" [code]="task1Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <p>
            Here is one complete working answer using <code>computed()</code> plus <code>routerLink</code>.
            A <code>navigate()</code>-based version is equally valid; this version keeps the destination visible in the template.
          </p>
          <h4>TypeScript:</h4>
          <app-code-block lang="typescript" [code]="task1TsAnswer" />
          <h4 style="margin-top: 16px">HTML:</h4>
          <app-code-block lang="html" [code]="task1HtmlAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d9-lab-notfound"
        [stepNumber]="'Task 2'"
        title="Not-Found Handling — Inline State vs. Redirect"
      >
        <div class="task-meta">
          <span class="difficulty medium">🟡 Easy-Medium</span>
          <span class="concepts">Concepts: &#64;if/&#64;else, UX judgment.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          When <code>show()</code> is <code>undefined</code> for a bad <code>:id</code>, do not silently render blank.
          Either redirect to the 404 page from code after a short delay, or — the recommended path — ship a clear
          inline not-found state in the <code>&#64;else</code> block with a link back to Browse.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Is rendering an inline "not found" state actually superior UX to redirecting?</p>
          <p class="tai-a">Yes, in most cases. An inline not-found state keeps the user on the URL they tried to visit, explains what went wrong, and offers a recovery path — all without a disorienting page change. A redirect to a generic 404 page discards the context of which ID was bad and can confuse users who expected to land somewhere specific. The inline approach also avoids an extra navigation event, which matters for browser history.</p>
        </div>

        <div class="info-box">
          <strong>Instructor take:</strong> Yes, usually — ship the inline state; the debate itself is the lesson.
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Keep the happy-path UI inside <code>&#64;if (show(); as currentShow)</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Use the <code>&#64;else</code> block for a clear message and a Browse link.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Discuss whether redirecting hides useful context compared with an inline state.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> You handle bad route params without leaving the user confused.
        </div>

        <app-collapsible icon="💡" label="Hint — Let the template branch, not the user guess">
          <p>
            A clean pattern is to keep the normal detail layout inside <code>&#64;if</code> and let the
            <code>&#64;else</code> branch own the not-found message. That keeps all bad-id handling visible in one place.
          </p>
          <app-code-block lang="html" [code]="task2Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Inline not-found state">
          <p>
            This keeps the student on the detail route, explains what happened, and gives them one obvious recovery path.
          </p>
          <app-code-block lang="html" [code]="task2Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d9-lab-guard-watchlist"
        [stepNumber]="'Task 3'"
        title="Guard /watchlist? (Then Un-Guard It)"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: canActivate, product judgment.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Try applying <code>hasWatchlistGuard</code> to the <code>/watchlist</code> route too, exactly like
          <code>/stats</code>. Then discuss the behavior and back it out.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why is guarding <code>/watchlist</code> with this same guard bad product thinking?</p>
          <p class="tai-a">Because an empty watchlist page is still a useful state — it's the perfect place to show onboarding guidance like "Browse shows and add one to get started." Bouncing the user away when the list is empty hides that helpful empty state and leaves them confused about why they can't reach the page. Guards should block content that genuinely cannot be used without a precondition (like stats with no data to analyze), not block pages that have a valid empty-state design.</p>
        </div>

        <div class="warning-box">
          <strong>Instructor answer:</strong> An empty watchlist page with helpful guidance (e.g. "Add a show to get
          started") beats a bounce/redirect. Guards protect content that genuinely shouldn't be seen — they shouldn't
          hide an empty state that's actually useful UX.
        </div>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Temporarily add <code>canActivate: [hasWatchlistGuard]</code> to <code>/watchlist</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Test the bounce and decide whether it helps or hurts a first-time user.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Remove the guard from <code>/watchlist</code> afterward and keep only the empty-state UX.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> You can distinguish between a route that legitimately needs protecting
          and one that just needs a good empty state.
        </div>

        <app-collapsible icon="💡" label="Hint — Treat this like a product experiment">
          <p>
            Use the exact same guard syntax you already used on <code>/stats</code>. The important part is not the code —
            it is noticing how different the user experience feels on <code>/watchlist</code>.
          </p>
          <app-code-block lang="typescript" [code]="task3Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Try it, then revert it">
          <p>
            The "answer" here is the judgment call: test the guarded version, then remove it. Keep the final route
            unguarded so students can see and improve the empty watchlist state.
          </p>
          <app-code-block lang="typescript" [code]="task3Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d9-lab-stretch"
        [stepNumber]="'Stretch'"
        title="Stretch — Lazy-Load Everything (Except Home)"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Challenge</span>
          <span class="concepts">Concepts: loadComponent, bundle analysis.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Convert every route except Home/Browse to <code>loadComponent</code>. Reload the app and count the chunks in
          the Network tab (or in <code>ng build</code> output). Take a screenshot for bragging rights.
        </p>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Keep Home/Browse eager so the first screen stays instant.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Convert <code>/show/:id</code>, <code>/watchlist</code>, <code>/stats</code>, and wildcard 404 to lazy components.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Refresh and count the extra chunks so you can explain the bundle-size tradeoff out loud.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> You can convert an entire route table to lazy loading and explain the
          initial-bundle-size tradeoff of leaving Home eager.
        </div>

        <app-collapsible icon="💡" label="Hint — Guards and lazy loading still play nicely together">
          <p>
            Guarded + lazy routes still work together. The guard runs first, and only if it allows navigation does Angular
            download the chunk.
          </p>
          <app-code-block lang="typescript" [code]="task4Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — One clean lazy route table">
          <p>
            This version leaves Browse eager and lazy-loads everything else, including the guarded Stats page.
          </p>
          <app-code-block lang="typescript" [code]="task4Answer" />
        </app-collapsible>
      </app-lesson-step>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Cards deep-link to working detail pages; bad ids handled gracefully</li>
          <li><span class="checkbox">✅</span> Surprise-me navigates from code; Stats is guarded and lazy (verified in Network tab)</li>
          <li><span class="checkbox">✅</span> Student can articulate: params are strings; guard returns true or a UrlTree</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 9: Routing II. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Read route params and bind them into a standalone detail component</li>
          <li>✅ Navigate from code when a flow should be triggered by logic, not just a link</li>
          <li>✅ Write and explain functional guards that return <code>true</code> or a <code>UrlTree</code></li>
          <li>✅ Lazy-load route components with <code>loadComponent</code></li>
          <li>✅ Make routing UX and product judgment calls, not just wire syntax</li>
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
export class Day9LabComponent {
  task1Hint = `currentIndex = computed(() =>
  this.showsSvc.all().findIndex(s => s.id === this.show()?.id)
);

prevShowId = computed(() => {
  const shows = this.showsSvc.all();
  const index = this.currentIndex();
  if (index === -1 || shows.length === 0) return null;
  return shows[(index - 1 + shows.length) % shows.length].id;
});

nextShowId = computed(() => {
  const shows = this.showsSvc.all();
  const index = this.currentIndex();
  if (index === -1 || shows.length === 0) return null;
  return shows[(index + 1) % shows.length].id;
});`;

  task1TsAnswer = `import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowsService } from '../core/services/shows.service';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './show-detail.component.html'
})
export class ShowDetailComponent {
  id = input.required<string>();
  private showsSvc = inject(ShowsService);

  show = computed(() => this.showsSvc.byId(Number(this.id())));

  currentIndex = computed(() =>
    this.showsSvc.all().findIndex(s => s.id === this.show()?.id)
  );

  prevShowId = computed(() => {
    const shows = this.showsSvc.all();
    const index = this.currentIndex();
    if (index === -1 || shows.length === 0) return null;
    return shows[(index - 1 + shows.length) % shows.length].id;
  });

  nextShowId = computed(() => {
    const shows = this.showsSvc.all();
    const index = this.currentIndex();
    if (index === -1 || shows.length === 0) return null;
    return shows[(index + 1) % shows.length].id;
  });
}`;

  task1HtmlAnswer = `@if (show(); as currentShow) {
  <article class="detail-card">
    <h2>{{ currentShow.title }}</h2>
    <p>{{ currentShow.genre }} • ⭐ {{ currentShow.rating }}</p>

    @if (prevShowId() !== null && nextShowId() !== null) {
      <nav class="detail-nav">
        <a [routerLink]="['/show', prevShowId()]">← Previous show</a>
        <a [routerLink]="['/show', nextShowId()]">Next show →</a>
      </nav>
    }
  </article>
}`;

  task2Hint = `@if (show(); as currentShow) {
  <article class="detail-card">
    <h2>{{ currentShow.title }}</h2>
    <p>{{ currentShow.genre }} • ⭐ {{ currentShow.rating }}</p>
  </article>
} @else {
  <!-- clear inline fallback goes here -->
}`;

  task2Answer = `@if (show(); as currentShow) {
  <article class="detail-card">
    <h2>{{ currentShow.title }}</h2>
    <p>{{ currentShow.genre }} • ⭐ {{ currentShow.rating }}</p>
  </article>
} @else {
  <section class="info-box">
    <h3>Show not found</h3>
    <p>We couldn't find a show with id "{{ id() }}".</p>
    <p>Try another card or head back to Browse.</p>
    <a routerLink="/">← Back to Browse</a>
  </section>
}`;

  task3Hint = `export const routes: Routes = [
  { path: '', component: BrowseComponent },
  { path: 'show/:id', component: ShowDetailComponent },
  { path: 'watchlist', canActivate: [hasWatchlistGuard], component: WatchlistComponent },
  {
    path: 'stats',
    canActivate: [hasWatchlistGuard],
    loadComponent: () => import('./pages/stats/stats.component').then(m => m.StatsComponent)
  }
];`;

  task3Answer = `// Try this briefly:
{ path: 'watchlist', canActivate: [hasWatchlistGuard], component: WatchlistComponent },

// Final version you should keep:
{ path: 'watchlist', component: WatchlistComponent },

// Why?
// Watchlist needs a useful empty state, not a redirect.
// Stats is different: it is a summary page that only makes sense once data exists.`;

  task4Hint = `{
  path: 'stats',
  canActivate: [hasWatchlistGuard],
  loadComponent: () => import('./pages/stats/stats.component').then(m => m.StatsComponent)
}

// Guard runs first.
// If it returns true, Angular downloads the lazy chunk.
// If it returns a UrlTree, Angular redirects instead.`;

  task4Answer = `import { Routes } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { hasWatchlistGuard } from './core/guards/has-watchlist.guard';

export const routes: Routes = [
  { path: '', component: BrowseComponent },
  {
    path: 'show/:id',
    loadComponent: () => import('./pages/show-detail/show-detail.component').then(m => m.ShowDetailComponent)
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./pages/watchlist/watchlist.component').then(m => m.WatchlistComponent)
  },
  {
    path: 'stats',
    canActivate: [hasWatchlistGuard],
    loadComponent: () => import('./pages/stats/stats.component').then(m => m.StatsComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
  }
];`;
}
