import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day8-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 8 · Act 3</span><h1>🛟 404s, Active Links & Debug It</h1><p class="subtitle">Finish the app's navigation polish, then break routing three ways and read what the browser tells you.</p></div>
      <div class="info-box">📚 <strong>Worth reading alongside this act:</strong> <a href="https://angular.dev/guide/routing/common-router-tasks" target="_blank" rel="noopener">Common router tasks</a> — find the sections on active links and wildcard routes.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><p><strong>Learning Goal:</strong> Handle unknown URLs, style the active route, and diagnose route-order and full-reload bugs.</p><p><strong>Why It Matters:</strong> A routed app is not finished when its happy paths work. Bookmarks, typos, refreshes, and keyboard navigation are part of the product.</p><p><strong>Build Steps:</strong> Add a personal 404 → make active links exact → add About and Surprise Me → debug three common mistakes.</p><p><strong>Expected Outcome:</strong> Every important URL has a deliberate result and the nav tells you where you are.</p></section>
      <div class="selfguided-panel"><p><strong>You are here:</strong> Day 8, Act 3 of 3.</p><p><strong>Next step:</strong> Complete the Student Lab, then routing parameters arrive on Day 9.</p><p><strong>Time:</strong> About 35 minutes.</p></div>

      <app-lesson-step stepId="d8-act3-not-found" [stepNumber]="'1'" title="Give the wildcard a personality">
        <p>Type a garbage URL such as <code>/banana</code>. Your wildcard route should render a friendly page, not a blank screen.</p>
        <app-code-block lang="typescript" file="src/app/pages/not-found/not-found.ts" [code]="notFoundCode" />
        <p>The link back home is still an Angular link, so it stays inside the SPA.</p>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> An unknown URL shows "This page was cancelled after one season" and a working Home link.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act3-active" [stepNumber]="'2'" title="Style the active link exactly">
        <p>Add <code>routerLinkActive="active"</code> to the nav links and style <code>.active</code> boldly. Then visit Browse and notice a classic trap: the Home link can remain active because the empty path is a prefix of every URL.</p>
        <app-code-block lang="html" file="src/app/header/header.html" [code]="activeCode" />
        <p>The fix is <code>[routerLinkActiveOptions]="&#123; exact: true &#125;"</code> on Home. Read the router docs before applying it; this is a small but important example of a directive option changing matching semantics.</p>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Only the current page is highlighted, including Home when the URL is exactly <code>/</code>.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act3-about" [stepNumber]="'3'" title="Your turn: add About end to end">
        <p>Add <code>/about</code> without copying a finished route. This is the five-minute "can you do it alone?" gate.</p>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Generate <code>pages/about</code>.</span></div><div class="task-step"><span class="step-dot">2</span><span>Add the component to the route table with a title.</span></div><div class="task-step"><span class="step-dot">3</span><span>Add an About nav link and active styling.</span></div><div class="task-step"><span class="step-dot">4</span><span>Visit it directly, use Back, and refresh it.</span></div></div>
        <app-collapsible icon="✅" label="Show Answer — About route"><app-code-block lang="typescript" [code]="aboutAnswerCode" /></app-collapsible>
        <p>For the stretch, add a "Surprise me" link to <code>/browse</code>. Tomorrow it can become a random <code>/show/:id</code> link once routes have parameters.</p>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> You created a page, route, title, and nav link without following a copy-paste recipe.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d8-act3-debug" [stepNumber]="'4'" title="Debug it: three routing bugs">
        <p>Read this broken code. It compiles, but routing is wrong in three distinct ways.</p>
        <app-code-block lang="typescript" variant="before" [code]="buggyRoutesCode" />
        <app-code-block lang="html" variant="before" [code]="buggyLinkCode" />
        <app-collapsible icon="🐛" label="Show Bug 1 — wildcard first"><p><code>**</code> matches everything, so it must come last. Put it first and every URL becomes NotFound.</p></app-collapsible>
        <app-collapsible icon="🐛" label="Show Bug 2 — route paths do not start with slash"><p>Route configuration paths are relative patterns such as <code>browse</code>, not URL strings such as <code>/browse</code>. The leading slash belongs in navigation links.</p></app-collapsible>
        <app-collapsible icon="🐛" label="Show Bug 3 — href reloads the document"><p><code>href="/watchlist"</code> asks the browser for a new document. Use <code>routerLink="/watchlist"</code> to keep Angular alive. Prove the difference in Network: the full document request appears with <code>href</code>, and non-persisted in-memory state resets.</p></app-collapsible>
        <app-code-block lang="typescript" variant="after" [code]="fixedRoutesCode" />
        <app-code-block lang="html" variant="after" [code]="fixedLinkCode" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> You fixed route order, path syntax, and navigation syntax, then reproduced the full-reload difference in DevTools.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day8/act2" class="btn-secondary">← Act 2</a><a routerLink="/day8/lab" class="btn-primary">Student Lab →</a></div>
    </div>
  `
})
export class Day8Act3Component {
  models: MentalModel[] = [
    { concept: 'Wildcard route', plainEnglish: 'A final fallback that handles every URL no earlier route matched.', analogy: 'The receptionist who says "we do not have that room" after checking the directory.' },
    { concept: 'Active link', plainEnglish: "A CSS class Angular adds while a link's route matches the current URL.", analogy: 'A map pin that lights up when you arrive in that place.' },
    { concept: 'Exact matching', plainEnglish: 'Require the whole URL to match instead of accepting a prefix.', analogy: 'A street address that must include the apartment number, not just the building.' },
    { concept: 'Hard reload', plainEnglish: 'The browser requests and rebuilds the whole document instead of only changing the routed view.', analogy: 'Leaving the building and coming back through the front door.' }
  ];
  notFoundCode = `import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: \`
    <h1>Lost?</h1>
    <p>This page was cancelled after one season.</p>
    <a routerLink="/">Take me home</a>
  \`
})
export class NotFound {}`;
  activeCode = `<a routerLink="/" routerLinkActive="active"
   [routerLinkActiveOptions]="{ exact: true }">Home</a>
<a routerLink="/browse" routerLinkActive="active">Browse</a>
<a routerLink="/watchlist" routerLinkActive="active">My Watchlist</a>`;
  aboutAnswerCode = `ng g c pages/about

// app.routes.ts
{ path: 'about', component: About, title: 'About · BingeBoard' }

// header.html
<a routerLink="/about" routerLinkActive="active">About</a>`;
  buggyRoutesCode = `export const routes: Routes = [
  { path: '**', component: NotFound },  // bug 1
  { path: '/browse', component: Browse }, // bug 2
  { path: '', component: Home }
];`;
  buggyLinkCode = `<a href="/watchlist">My Watchlist</a> <!-- bug 3 -->`;
  fixedRoutesCode = `export const routes: Routes = [
  { path: '', component: Home },
  { path: 'browse', component: Browse },
  { path: 'watchlist', component: Watchlist },
  { path: '**', component: NotFound }
];`;
  fixedLinkCode = `<a routerLink="/watchlist">My Watchlist</a>`;
}
