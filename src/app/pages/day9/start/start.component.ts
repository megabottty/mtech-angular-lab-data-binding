import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day9-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 9 · Starting Point</span><h1>🎬 Get BingeBoard Running</h1><p class="subtitle">The routed BingeBoard foundation for route parameters, programmatic navigation, guards, and lazy loading.</p></div>
      <div class="info-box"><strong>Two ways to get there:</strong> clone and run the Day 9 starter, or compare the reference files below with your end-of-Day-8 project.</div>
      <section class="lesson-framework"><h3>Option A — Run the starter (fastest)</h3><ul><li>Clone the teaching site's repository.</li><li>Run <code>cd starters/bingeboard-day9 && npm install && npm start</code>.</li><li>Open <code>http://localhost:4200</code>.</li></ul><app-code-block lang="bash" [code]="cloneCommand" /><p><a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day9" target="_blank" rel="noopener">Browse starter files on GitHub</a>.</p></section>
      <section class="lesson-framework"><h3>Option B — Bring your own project</h3><p>Day 8 should leave you with a header/outlet/footer shell and routed Home, Browse, Watchlist, About, and NotFound pages. Add these Day 9 foundation files before following the acts.</p>
        <h4>Routing and app shell</h4>
        <app-collapsible icon="📄" label="src/main.ts"><app-code-block lang="typescript" file="src/main.ts" [code]="mainCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.ts"><app-code-block lang="typescript" file="src/app/app.ts" [code]="appCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.routes.ts"><app-code-block lang="typescript" file="src/app/app.routes.ts" [code]="routesCode" /></app-collapsible>
        <h4>New Day 9 foundations</h4>
        <app-collapsible icon="📄" label="src/app/services/shows.ts"><app-code-block lang="typescript" file="src/app/services/shows.ts" [code]="showsCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/guards/has-watchlist.ts"><app-code-block lang="typescript" file="src/app/guards/has-watchlist.ts" [code]="guardCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/show-detail/show-detail.ts"><app-code-block lang="typescript" file="src/app/pages/show-detail/show-detail.ts" [code]="detailCode" /></app-collapsible>
        <app-collapsible icon="📄" label="src/app/pages/browse/browse.ts"><app-code-block lang="typescript" file="src/app/pages/browse/browse.ts" [code]="browseCode" /></app-collapsible>
      </section>
      <section class="lesson-framework"><h3>What this code already does</h3><ul><li><strong>Days 2–7:</strong> signal state, reusable components, projection, services, shared watchlist, recently viewed, and persistence.</li><li><strong>Day 8:</strong> routed Home, Browse, Watchlist, About, and NotFound pages with active links and a shell outlet.</li></ul></section>
      <section class="lesson-framework"><h3>Verify before you start</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> Home, Browse, Watchlist, About, and a garbage URL resolve.</li><li><span class="checkbox">✅</span> Adding on Browse appears on Watchlist and survives refresh.</li><li><span class="checkbox">✅</span> Browse cards link to a show detail page.</li><li><span class="checkbox">✅</span> Visiting Stats without a watchlist redirects to Browse.</li><li><span class="checkbox">✅</span> The Stats page arrives as a separate lazy chunk when visited.</li></ul></section>
      <div class="warning-box">If a check fails, return to Day 8 before continuing with today's acts.</div>
      <div class="nav-footer"><a routerLink="/day8/lab" class="btn-secondary">← Day 8 Lab</a><a routerLink="/day9/act1" class="btn-primary">Act 1: Route Parameters →</a></div>
    </div>
  `
})
export class Day9StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day9
npm install
npm start`;
  mainCode = `import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { App } from './app/app';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(routes, withComponentInputBinding())]
});`;
  appCode = `@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: '<app-header /><main><router-outlet /></main>'
})
export class App {}`;
  routesCode = `export const routes: Routes = [
  { path: '', component: Home },
  { path: 'browse', component: Browse },
  { path: 'watchlist', component: Watchlist },
  { path: 'about', component: About },
  { path: 'show/:id', component: ShowDetail },
  { path: 'stats', loadComponent: () => import('./pages/stats/stats').then(m => m.Stats), canActivate: [hasWatchlistGuard] },
  { path: '**', component: NotFound }
];`;
  showsCode = `@Injectable({ providedIn: 'root' })
export class ShowsService {
  private shows = signal<Show[]>([/* the eight Day 4 shows */]);
  readonly all = this.shows.asReadonly();
  byId(id: number) { return this.all().find(show => show.id === id); }
}`;
  guardCode = `export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);
  return watchlist.count() > 0
    ? true
    : router.createUrlTree(['/browse']);
};`;
  detailCode = `export class ShowDetail {
  id = input.required<string>();
  private showsSvc = inject(ShowsService);
  show = computed(() => this.showsSvc.byId(Number(this.id())));
}`;
  browseCode = `export class Browse {
  private showsSvc = inject(ShowsService);
  shows = this.showsSvc.all;
  // filters and card handlers stay in this page
}`;
}
