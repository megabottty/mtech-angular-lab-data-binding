import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day8-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 8 · Act 1</span><h1>🧭 The Router's Three Pieces</h1><p class="subtitle">Turn one long page into places with URLs, without asking the server for a new document every time.</p></div>
      <div class="info-box"><strong>Before you start:</strong> run the <a routerLink="/day8/start">Day 8 starting point</a> first.</div>
      <div class="info-box">📚 <strong>Worth reading alongside this act:</strong> <a href="https://angular.dev/guide/routing" target="_blank" rel="noopener">Routing overview</a> and <a href="https://angular.dev/guide/routing/common-router-tasks" target="_blank" rel="noopener">Common router tasks</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><p><strong>Learning Goal:</strong> Explain a client-side router and identify its route table, outlet, and navigation links.</p><p><strong>Why It Matters:</strong> URLs make features bookmarkable, shareable, and reachable with the back button.</p><p><strong>Build Steps:</strong> Observe SPA navigation → create page components → define routes → render the outlet → navigate without reloads.</p><p><strong>Expected Outcome:</strong> Home, Browse, Watchlist, and a 404 route all render inside one application shell.</p></section>
      <div class="selfguided-panel"><p><strong>You are here:</strong> Day 8, Act 1 of 3.</p><p><strong>Next step:</strong> Act 2 moves the real BingeBoard sections into the new pages.</p><p><strong>Time:</strong> About 35 minutes.</p></div>

      <app-lesson-step stepId="d8-act1-warmup" [stepNumber]="'1'" title="Warm-up: who swaps the page?">
        <p>Open Gmail or YouTube with DevTools' Network tab visible. Click between places. The URL changes and the content changes, but the browser does not request a new document for every click.</p>
        <div class="think-about-it"><p class="tai-q">If the server is not sending a new HTML document, who is watching the URL and swapping the component tree?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the router runs in the browser"><p>Angular's router listens to the browser's URL, matches it against your route table, and renders the matched component into a <code>&lt;router-outlet /&gt;</code>. The browser still has normal URLs; the JavaScript app handles the transitions.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> You watched a URL and page change without a document reload, and you can describe that as client-side routing.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act1-problem" [stepNumber]="'2'" title="The three router pieces">
        <p>BingeBoard currently has one long page. Real apps have places such as <code>/browse</code>, <code>/watchlist</code>, and <code>/show/42</code>. The router gives you three pieces:</p>
        <ul><li><strong>Route table:</strong> a URL pattern mapped to a component.</li><li><strong>Outlet:</strong> the hole where the matched component renders.</li><li><strong>Navigation:</strong> <code>routerLink</code> changes the URL through Angular instead of reloading the document.</li></ul>
        <p>Yesterday's service refactor is why this is manageable. Browse and Watchlist can become separate components and still see the same watchlist because the service is outside their component relationship.</p>
        <div class="think-about-it"><p class="tai-q">What would have to happen if the watchlist still lived in <code>App</code> and Browse and Watchlist were sibling route components?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the service prevented today's prop-drilling disaster"><p>A routed component is not written inside <code>app.html</code>, so you cannot pass it a normal input from the shell. A service gives both pages a shared owner without threading inputs and outputs through every component in between.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> You can name the route table, outlet, and navigation link as separate jobs.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act1-page-components" [stepNumber]="'3'" title="Create the page components">
        <p>Create four standalone pages. Keep the first versions deliberately small; the next act moves the real UI into them.</p>
        <app-code-block lang="bash" [code]="generateCommands" />
        <p>Each generated component is a possible destination. The shell does not need to know its internal markup.</p>
        <app-code-block lang="typescript" file="src/app/pages/home/home.ts" [code]="homeCode" />
        <div class="warning-box">If a generated page uses <code>routerLink</code>, import <code>RouterLink</code> in that page. A link can look like ordinary HTML while silently failing when the directive is missing.</div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Four standalone page components exist under <code>src/app/pages</code>, ready to be destinations.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act1-routes" [stepNumber]="'4'" title="Define the route table">
        <p>Open <code>src/app/app.routes.ts</code>. Replace the temporary route list with this table. The <code>title</code> updates the browser tab for free.</p>
        <app-code-block lang="typescript" file="src/app/app.routes.ts" [code]="routesCode" />
        <p>Point at <code>src/app/app.config.ts</code>: the CLI wired <code>provideRouter(routes)</code> when you answered the setup prompt on Day 1. This is where that answer went.</p>
        <div class="warning-box"><strong>Order matters:</strong> <code>**</code> matches every URL. It must be last, or it swallows <code>/</code>, <code>/browse</code>, and every other route before they get a chance.</div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The route table has a home route, two named pages, and a final wildcard fallback.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act1-outlet" [stepNumber]="'5'" title="Add the outlet and links">
        <p>Make <code>App</code> a shell: header, outlet, and footer. The matched route renders where the outlet is.</p>
        <app-code-block lang="html" file="src/app/app.html" [code]="shellCode" />
        <p>Then add navigation to the header. Import both directives in the component that owns this template.</p>
        <app-code-block lang="typescript" file="src/app/header/header.ts" [code]="headerImportsCode" />
        <app-code-block lang="html" file="src/app/header/header.html" [code]="headerNavCode" />
        <div class="think-about-it"><p class="tai-q">Why is <code>routerLink</code> better than a normal <code>href</code> for links inside your SPA?</p></div>
        <app-collapsible icon="✅" label="Show Answer — routerLink keeps the app alive"><p><code>href</code> asks the browser for a new document. <code>routerLink</code> changes the URL through Angular's router, swaps the outlet, and preserves in-memory state. It also makes active-link styling and route transitions available.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Clicking Home, Browse, and Watchlist changes the URL and outlet content without a full document reload.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day8/start" class="btn-secondary">← Starting Point</a><a routerLink="/day8/act2" class="btn-primary">Act 2: Move the Real UI →</a></div>
    </div>
  `
})
export class Day8Act1Component {
  models: MentalModel[] = [
    { concept: 'SPA', plainEnglish: 'The browser loads the app once, then JavaScript changes the view while the URL still changes normally.', analogy: 'A hotel lobby with doors to many rooms: you stay in the building while the room changes.' },
    { concept: 'Route table', plainEnglish: 'A list that maps URL paths to components.', analogy: 'A train timetable: this destination goes to that platform.' },
    { concept: 'Router outlet', plainEnglish: 'The placeholder where the currently matched route component appears.', analogy: 'A picture frame whose picture changes depending on the room you selected.' },
    { concept: 'routerLink', plainEnglish: 'Angular navigation that changes routes without asking the browser for a new document.', analogy: 'An elevator button instead of leaving the building and driving around to another entrance.' }
  ];
  generateCommands = `ng g c pages/home
ng g c pages/browse
ng g c pages/watchlist
ng g c pages/not-found`;
  homeCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  template: '<h1>Welcome to BingeBoard</h1>'
})
export class Home {}`;
  routesCode = `import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Browse } from './pages/browse/browse';
import { Watchlist } from './pages/watchlist/watchlist';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: Home, title: 'BingeBoard' },
  { path: 'browse', component: Browse, title: 'Browse · BingeBoard' },
  { path: 'watchlist', component: Watchlist, title: 'My Watchlist · BingeBoard' },
  { path: '**', component: NotFound, title: 'Lost? · BingeBoard' }
];`;
  shellCode = `<app-header />
<main>
  <router-outlet />
</main>
<footer>Made for your next great binge.</footer>`;
  headerImportsCode = `import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistService } from '../services/watchlist';

@Component({
  // ...
  imports: [RouterLink, RouterLinkActive]
})`;
  headerNavCode = `<header class="app-nav">
  <a routerLink="/" routerLinkActive="active"
     [routerLinkActiveOptions]="{ exact: true }">Home</a>
  <a routerLink="/browse" routerLinkActive="active">Browse</a>
  <a routerLink="/watchlist" routerLinkActive="active">
    My Watchlist ({{ count() }})
  </a>
</header>`;
}
