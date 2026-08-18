import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day9-act4',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 9 · Act 4 of 4</span>
        <h1>📦 Lazy Loading</h1>
        <p class="subtitle">Why should a user browsing shows also download code for pages they may never visit?</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Split a route's code into its own downloaded-on-demand chunk.</li>
          <li><strong>Why It Matters:</strong> Smaller initial bundle = faster first load, especially for pages most users never open.</li>
          <li><strong>Build Steps:</strong> Convert a route to <code>loadComponent</code> → reload and confirm no chunk in Network tab → navigate to the route → confirm the chunk arrives just then.</li>
          <li><strong>Expected Outcome:</strong> Students can convert any route to lazy loading and verify it in DevTools.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 9 Act 4 — Lazy Loading</p>
        <p><strong>Next step:</strong> Day 9 Lab — apply lazy loading yourself and prove it with evidence.</p>
      </section>

      <app-lesson-step stepId="d9-act4-lazy-convert" [stepNumber]="1" title="Converting a Route to loadComponent">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Lazy loading in standalone Angular is delightfully boring: replace <code>component</code> with <code>loadComponent</code>, keep the rest of the route config, and let the browser fetch that page only when needed.</p>
        <div class="ask-class">In your old curriculum this conversion involved NgModules and lazy-loaded module ceremony. What's different now?</div>

        <app-code-block lang="typescript" [code]="statsRouteConversion" />

        <p class="route-note">The wildcard route converts the same way — one property swap, same idea:</p>
        <app-code-block lang="typescript" [code]="wildcardRouteConversion" />

        <app-collapsible icon="💡" label="Hint — What is loadComponent actually doing?">
          <p><code>loadComponent</code> takes a function returning a dynamic <code>import()</code> promise, resolved to the component class via <code>.then(m => m.Stats)</code> — Angular handles the rest.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — How does this interact with the guard?">
          <p>The guard still runs <strong>before</strong> the chunk is even downloaded, so a blocked user never pays the download cost for a page they can't see. The guard and the lazy chunk cooperate; they don't conflict.</p>
          <p style="margin-top: 12px;">That same pattern works for small routes too, including a 404 page: swap <code>component</code> for <code>loadComponent</code> and point the import at the component file.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can convert any eagerly-loaded route to <code>loadComponent</code> in one property change.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d9-act4-verify" [stepNumber]="2" title="Verify It — Network Tab Proof">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p><strong>The proof is the point.</strong> If you never verify the download timing, lazy loading is just a nice story.</p>

        <div class="info-box">
          <strong>Verification ritual:</strong>
          <ol class="proof-list">
            <li>Open DevTools and switch to the <strong>Network</strong> tab.</li>
            <li>Reload while you are on <code>/browse</code>.</li>
            <li>Confirm no stats-related chunk downloads during that first load.</li>
            <li>Navigate to <code>/stats</code>.</li>
            <li>Watch a new <code>.js</code> chunk arrive at that exact moment.</li>
          </ol>
        </div>

        <div class="warning-box">
          <strong>Heads up:</strong> Lazy chunks may not appear if the dev server pre-bundles aggressively — if the demo underwhelms, run a production-ish build (<code>ng build</code>) and inspect the output chunk listing instead of relying on the dev server.
        </div>

        <app-collapsible icon="✅" label="Show Answer — Example build output proving route chunks">
          <p>A production build often makes the split much easier to see:</p>
          <app-code-block lang="typescript" [code]="buildOutputExample" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can verify, in DevTools or a production build listing, that a route's code is not downloaded until it's visited.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day9/act3" class="btn-secondary">← Act 3: Functional Guards</a>
        <a routerLink="/day9/lab" class="btn-primary">Student Lab: Your Turn →</a>
      </div>
    </div>
  `,
  styles: [`
    .route-note {
      margin: 14px 0 10px;
    }

    .proof-list {
      margin: 12px 0 0 20px;
      padding-left: 0;
    }

    .proof-list li {
      margin-bottom: 10px;
      color: #cccccc;
    }

    .proof-list li:last-child {
      margin-bottom: 0;
    }
  `]
})
export class Act4Component {
  models: MentalModel[] = [
    {
      concept: 'loadComponent',
      plainEnglish: `Don't download this page's code until someone visits it.`,
      analogy: '📦 A package that only ships when ordered.'
    },
    {
      concept: 'lazy chunk',
      plainEnglish: 'A separate JavaScript file for one route or feature.',
      analogy: '🧩 A sealed box you open only when you need that piece.'
    },
    {
      concept: 'Network tab',
      plainEnglish: 'Browser proof showing exactly when a file was requested and received.',
      analogy: '🧾 A shipping receipt with the arrival time stamped on it.'
    }
  ];

  statsRouteConversion = `// Before: eager route, bundled up front
{
  path: 'stats',
  component: Stats,
  canActivate: [hasWatchlistGuard],
},

// After: lazy route, downloaded only when visited
{
  path: 'stats',
  loadComponent: () => import('./pages/stats/stats').then(m => m.Stats),
  canActivate: [hasWatchlistGuard],
},`;

  wildcardRouteConversion = `{
  path: '**',
  loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
},`;

  buildOutputExample = `Initial chunk files   | Names      | Raw size
main-K3J8P1Q2.js      | main       | 214.11 kB
styles-L9M2N4A1.css   | styles     |  11.32 kB

Lazy chunk files      | Names      | Raw size
stats-R4T8Y2U1.js     | stats      |   6.48 kB
watchlist-P7Q1W6E3.js | watchlist  |   5.91 kB
not-found-Z2X8C5V4.js | not-found  |   1.07 kB`;
}
