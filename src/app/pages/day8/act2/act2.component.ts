import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day8-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 8 · Act 2</span><h1>🧩 Move the Real UI into Pages</h1><p class="subtitle">The router is wired. Now make the routes useful by moving Browse and Watchlist out of the monolith.</p></div>
      <div class="info-box">📚 <strong>Worth reading alongside this act:</strong> <a href="https://angular.dev/guide/routing/common-router-tasks" target="_blank" rel="noopener">Show routes with outlets</a> and <a href="https://angular.dev/guide/routing/navigate-to-routes" target="_blank" rel="noopener">Navigate to routes</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><p><strong>Learning Goal:</strong> Refactor the existing filter and watchlist UI into route components without changing the service contract.</p><p><strong>Why It Matters:</strong> This is the payoff for keeping state in a service and presentation in components: the move is mostly cut-and-paste.</p><p><strong>Build Steps:</strong> Move Browse → move Watchlist → shrink App to shell → add Home → test cross-page state and browser navigation.</p><p><strong>Expected Outcome:</strong> Browse and Watchlist are separate URLs that share one live watchlist.</p></section>
      <div class="selfguided-panel"><p><strong>You are here:</strong> Day 8, Act 2 of 3.</p><p><strong>Next step:</strong> Act 3 adds personality to 404, active-link exactness, and the Debug It fixes.</p><p><strong>Time:</strong> About 45 minutes.</p></div>

      <app-lesson-step stepId="d8-act2-browse" [stepNumber]="'1'" title="Move Browse out of App">
        <p>Move the shows, filters, computed values, ratings, and card grid into <code>src/app/pages/browse/browse.ts</code>. Inject <code>WatchlistService</code> instead of moving the watchlist signal back into the page.</p>
        <app-code-block lang="typescript" file="src/app/pages/browse/browse.ts" [code]="browseTsCode" />
        <p>Its template is the old filter and grid markup. The important change is ownership: Browse owns browse state; the service owns watchlist state.</p>
        <app-code-block lang="html" file="src/app/pages/browse/browse.html" [code]="browseHtmlCode" />
        <div class="warning-box">If Angular says a binding or directive is unknown after the move, check the new component's <code>imports</code> first. Moving markup also moves its dependency list.</div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> <code>/browse</code> renders the same filters and cards the old one-page app rendered.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act2-watchlist" [stepNumber]="'2'" title="Move Watchlist into its own page">
        <p>Now move the watchlist panel and its projected empty state into <code>src/app/pages/watchlist/watchlist.ts</code>. It injects the same service, so no input has to cross the route boundary.</p>
        <app-code-block lang="typescript" file="src/app/pages/watchlist/watchlist.ts" [code]="watchlistPageCode" />
        <app-code-block lang="html" file="src/app/pages/watchlist/watchlist.html" [code]="watchlistPageHtmlCode" />
        <div class="think-about-it"><p class="tai-q">Add a show on <code>/browse</code>, click the Watchlist link, and look for it. Which component owns the array now?</p></div>
        <app-collapsible icon="✅" label="Show Answer — neither page owns the array"><p><code>WatchlistService</code> owns it. Both pages read the service's read-only signal and call its methods. That is exactly why the route split does not require a new input/output chain.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A show added on Browse appears on Watchlist, and removing it there updates the shared count.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act2-shell" [stepNumber]="'3'" title="Shrink App to the canonical shell">
        <p>Once the page UI has moved, <code>App</code> should stop knowing about shows, filters, and panels. Its job is layout only.</p>
        <app-code-block lang="typescript" file="src/app/app.ts" variant="after" [code]="appAfterCode" />
        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="appShellCode" />
        <p>Add a tiny Home page with a purpose: explain the app, show the live count, and provide two calls to action.</p>
        <app-code-block lang="html" file="src/app/pages/home/home.html" [code]="homeHtmlCode" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> App is a clean header/outlet/footer shell, Home explains where to go, and the two page URLs are reachable from it.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act2-spa-checks" [stepNumber]="'4'" title="Prove this is still a SPA">
        <p>Open the Network tab and click between Home, Browse, and Watchlist. You should not see a new document request for each click. Then test the two browser behaviors real applications need.</p>
        <ul><li><strong>Back button:</strong> navigate Browse → Watchlist → Back. The browser returns to Browse.</li><li><strong>Hard refresh:</strong> refresh while on <code>/browse</code>. The dev server serves the app shell and Angular reconstructs the route.</li></ul>
        <div class="warning-box">When this deploys to a real host on Day 22, the host must be configured to send unknown paths back to <code>index.html</code>. The development server already does that fallback for you.</div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> You checked the Network tab, back button, and hard refresh instead of assuming routing works because one click changed the text.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day8/act1" class="btn-secondary">← Act 1</a><a routerLink="/day8/act3" class="btn-primary">Act 3: 404, Active Links & Debug It →</a></div>
    </div>
  `
})
export class Day8Act2Component {
  models: MentalModel[] = [
    { concept: 'Route component', plainEnglish: 'A normal standalone component selected by the current URL.', analogy: 'A room in the hotel: it has its own furniture but shares the building.' },
    { concept: 'Shell', plainEnglish: 'The stable layout around the changing outlet content.', analogy: 'The frame of a stage while different scenes roll in behind it.' },
    { concept: 'Route boundary', plainEnglish: 'A component relationship created by the URL rather than a parent template.', analogy: 'Two departments in the same company: they share services, not desk-to-desk handoffs.' },
    { concept: 'SPA navigation', plainEnglish: 'Changing the view and URL without requesting a new document.', analogy: 'Changing train carriages while the train keeps moving.' }
  ];
  browseTsCode = `import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowCard } from '../../show-card/show-card';
import { Show } from '../../models/show';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [FormsModule, ShowCard],
  templateUrl: './browse.html',
  styleUrl: './browse.css'
})
export class Browse {
  // Move shows, filters, ratings, and computed values here.
  private watchlistSvc = inject(WatchlistService);
  watchlist = this.watchlistSvc.watchlist;
  addShow(show: Show) { this.watchlistSvc.add(show); }
  removeShow(show: Show) { this.watchlistSvc.remove(show.id); }
}`;
  browseHtmlCode = `<h1>Browse shows</h1>
<input placeholder="Filter shows..." [(ngModel)]="searchTerm" />
<!-- genre/sort selects and the existing @for card grid follow -->`;
  watchlistPageCode = `import { Component, inject } from '@angular/core';
import { WatchlistPanel } from '../../watchlist-panel/watchlist-panel';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [WatchlistPanel],
  templateUrl: './watchlist.html'
})
export class Watchlist {
  private svc = inject(WatchlistService);
  shows = this.svc.watchlist;
  remove(show: Show) { this.svc.remove(show.id); }
}`;
  watchlistPageHtmlCode = `<h1>My Watchlist</h1>
<app-watchlist-panel [shows]="shows()" (remove)="remove($event)">
  <p empty-state>Nothing saved yet. Go browse some shows!</p>
</app-watchlist-panel>`;
  appAfterCode = `export class App {
  // No shows, filters, ratings, or watchlist array here anymore.
}`;
  appShellCode = `<app-header />
<main>
  <router-outlet />
</main>
<footer>Made for your next great binge.</footer>`;
  homeHtmlCode = `<h1>BingeBoard</h1>
<p>Find your next great show and keep your queue in one place.</p>
<p>You're tracking {{ count() }} shows.</p>
<a routerLink="/browse">Browse shows</a>
<a routerLink="/watchlist">Open watchlist</a>`;
}
