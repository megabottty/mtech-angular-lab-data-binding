import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day9-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 9 · Act 3 of 4</span>
        <h1>🛡️ Functional Route Guards</h1>
        <p class="subtitle">You can't visit /stats until you've added a show. Guards protect routes before they ever render.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Protect a route from being entered until a condition is met.</li>
          <li><strong>Why It Matters:</strong> Real apps gate pages behind login, payment, or onboarding state.</li>
          <li><strong>Build Steps:</strong> Scaffold the guard → return <code>true</code>/<code>UrlTree</code> → wire it into the route's <code>canActivate</code> → demo both outcomes.</li>
          <li><strong>Expected Outcome:</strong> You can write and wire a functional <code>CanActivateFn</code> guard and explain why returning a <code>UrlTree</code> beats returning <code>false</code>.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 — protecting routes before they open.</p>
        <p><strong>Next step:</strong> Act 4 — split routes into lazy-loaded chunks.</p>
      </section>

      <app-lesson-step stepId="d9-act3-guard-create" [stepNumber]="1" title="Scaffolding the Guard — ng g guard + CanActivateFn">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>The <code>/stats</code> page only makes sense after the learner has added at least one show to the watchlist. A guard is the router's checkpoint before the page opens.</p>
        <div class="ask-class">Should a user be able to visit /stats with an empty watchlist? What should happen if they try?</div>
        <p style="margin-top: 12px;">Generate the guard with the CLI, then choose <code>CanActivate</code> when Angular prompts you for the guard type:</p>
        <app-code-block lang="typescript" [code]="guardCliCommand" />
        <p style="margin-top: 12px;">Now write the functional guard. It checks watchlist state, then either allows navigation or hands the router a redirect target.</p>
        <app-code-block lang="typescript" [code]="guardSnippet" />

        <app-collapsible icon="💡" label="Hint — Why does inject() work inside a plain function?">
          <p><code>inject()</code> works here because Angular runs guards inside an <strong>injection context</strong>. Even though <code>hasWatchlistGuard</code> is a plain function instead of a class, the router still gives it access to dependency injection when navigation starts.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Deep Dive — What does createUrlTree() actually return?">
          <p><code>router.createUrlTree(['/browse'])</code> builds a navigable <code>UrlTree</code> object without navigating yet. Returning that object from the guard tells the Router, “Don't enter this route — redirect there instead.”</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can write a functional <code>CanActivateFn</code> guard that reads application state via <code>inject()</code>.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d9-act3-guard-wire" [stepNumber]="2" title="Wiring It In — canActivate and UrlTree vs. false">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Once the guard exists, the route decides when to run it. Add the guard to the <code>stats</code> route's <code>canActivate</code> array:</p>
        <app-code-block lang="typescript" [code]="routeWiringSnippet" />

        <div class="info-box">
          <strong>Returning a UrlTree (redirect) beats returning false (dead click)</strong> — same docs page, much better UX. A <code>false</code> return just silently cancels the navigation and the user is left staring at the same page wondering what happened.
        </div>

        <div class="ask-class">Demo both outcomes: with an empty watchlist, clicking /stats redirects to /browse; after adding a show to the watchlist, /stats loads normally.</div>

        <app-collapsible icon="✅" label="Show Answer — Complete guard file + route wiring">
          <p><strong>has-watchlist.guard.ts</strong></p>
          <app-code-block lang="typescript" [code]="fullGuardFile" />
          <p style="margin-top: 16px;"><strong>app.routes.ts</strong></p>
          <app-code-block lang="typescript" [code]="fullRoutesFile" />
        </app-collapsible>

        <div class="info-box">
          <strong>Looking ahead:</strong> Day 21 uses this exact shape — return <code>true</code> or a <code>UrlTree</code> — to guard routes behind a real login check.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can articulate: a guard returns <code>true</code> to allow navigation, or a <code>UrlTree</code> to redirect elsewhere.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day9/act2" class="btn-secondary">← Act 2: Programmatic Navigation</a>
        <a routerLink="/day9/act4" class="btn-primary">Act 4: Lazy Loading →</a>
      </div>
    </div>
  `,
  styles: [``]
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'CanActivateFn',
      plainEnglish: 'Run this function before the route opens.',
      analogy: '🚪 A bouncer checking the guest list before someone enters'
    },
    {
      concept: 'UrlTree',
      plainEnglish: 'A redirect destination the router can follow instead.',
      analogy: '🗺️ A slip of paper with the correct door written on it'
    },
    {
      concept: 'return true or a UrlTree',
      plainEnglish: 'Let them in, or point them somewhere else.',
      analogy: '🎟️ A velvet-rope bouncer either waves you through or sends you to another line'
    }
  ];

  guardCliCommand = `ng g guard guards/has-watchlist`;

  guardSnippet = `export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);
  return watchlist.count() > 0 ? true : router.createUrlTree(['/browse']);
};`;

  routeWiringSnippet = `{ path: 'stats', component: Stats, canActivate: [hasWatchlistGuard] },`;

  fullGuardFile = `import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist.service';

export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);

  return watchlist.count() > 0 ? true : router.createUrlTree(['/browse']);
};`;

  fullRoutesFile = `import { Routes } from '@angular/router';
import { Browse } from './pages/browse/browse.component';
import { ShowDetail } from './pages/show-detail/show-detail.component';
import { Stats } from './pages/stats/stats.component';
import { Watchlist } from './pages/watchlist/watchlist.component';
import { hasWatchlistGuard } from './guards/has-watchlist.guard';

export const routes: Routes = [
  { path: 'browse', component: Browse },
  { path: 'show/:id', component: ShowDetail },
  { path: 'stats', component: Stats, canActivate: [hasWatchlistGuard] },
  { path: 'watchlist', component: Watchlist },
  { path: '', redirectTo: 'browse', pathMatch: 'full' }
];`;
}
