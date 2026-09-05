import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day8-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label lab-label">🛠️ Student Lab</span><h1>Your Turn — Make BingeBoard Feel Like an App</h1><p class="subtitle">About 50 minutes. Three routing tasks plus an optional polish stretch.</p></div>
      <div class="lab-intro"><h3>🎯 Starting Point</h3><p>Complete Acts 1-3 first. You should have Home, Browse, Watchlist, and NotFound routes working. Need a clean copy? <a routerLink="/day8/start">Start from the Day 8 starting point</a>.</p></div>
      <section class="lesson-framework"><h3>Lab Map</h3><ul><li><strong>Learning Goal:</strong> Build and verify route features without a line-by-line recipe.</li><li><strong>Why It Matters:</strong> Routing is product structure: a feature is not finished until it has a reachable URL and sensible browser behavior.</li><li><strong>Build Steps:</strong> Add an exact Home CTA → add About end to end → add a random-show anticipation link.</li><li><strong>Expected Outcome:</strong> You can create a route, navigate to it, style it, and verify it survives Back and Refresh.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Day 8 Lab (final step of Day 8)</p><p><strong>Next step:</strong> Day 9 adds route parameters to deep-link individual shows.</p><p><strong>Time:</strong> About 50 minutes total.</p></section>

      <app-lesson-step stepId="d8-lab-home-cta" [stepNumber]="'Task 1'" title="Home page with purpose">
        <div class="task-meta"><span class="difficulty easy">🟡 Easy</span><span class="concepts">Concepts: service injection, <code>routerLink</code>, exact active links.</span></div>
        <p>Make Home feel useful instead of being a blank landing page. It should show the live watchlist count and two large calls to action.</p>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Inject <code>WatchlistService</code> and expose its <code>count</code>.</span></div><div class="task-step"><span class="step-dot">2</span><span>Render "You're tracking N shows".</span></div><div class="task-step"><span class="step-dot">3</span><span>Add links to <code>/browse</code> and <code>/watchlist</code>.</span></div><div class="task-step"><span class="step-dot">4</span><span>Confirm Home is not still active while you are on Browse.</span></div></div>
        <app-collapsible icon="💡" label="Hint — the service is already the source of truth"><p>Do not pass the count from App. Home can inject the same service as Header. Add <code>[routerLinkActiveOptions]="&#123; exact: true &#125;"</code> to the Home nav link.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Home tells you how many shows are saved and its two links navigate without a reload.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 1"><app-code-block lang="typescript" file="src/app/pages/home/home.ts" [code]="homeAnswerCode" /><app-code-block lang="html" file="src/app/pages/home/home.html" [code]="homeTemplateCode" /></app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d8-lab-about" [stepNumber]="'Task 2'" title="About page: the full route rep">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: component generation, route table, nav link, page title.</span></div>
        <p>Add <code>/about</code> completely on your own. This is intentionally short: it checks whether you can transfer the pattern instead of following a larger tutorial.</p>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Generate <code>pages/about</code>.</span></div><div class="task-step"><span class="step-dot">2</span><span>Give it a short BingeBoard description and import anything its template uses.</span></div><div class="task-step"><span class="step-dot">3</span><span>Add the route with title <code>About · BingeBoard</code>.</span></div><div class="task-step"><span class="step-dot">4</span><span>Add and style the nav link; use Back and direct refresh to test it.</span></div></div>
        <app-collapsible icon="💡" label="Hint — route paths and link paths are different"><p>The route table uses <code>path: 'about'</code>. The template link uses <code>routerLink="/about"</code>. The slash belongs to the URL, not the route configuration.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> <code>/about</code> is reachable from the nav, has a browser title, highlights correctly, and survives a refresh.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 2"><app-code-block lang="typescript" [code]="aboutAnswerCode" /></app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d8-lab-surprise" [stepNumber]="'Task 3'" title="Stretch — plant the Surprise Me link">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: navigation anticipation, shared header layout.</span></div>
        <p>Add a "Surprise me" button or link to the header. For today it can navigate to <code>/browse</code>; tomorrow it will deep-link to a random show once routes have parameters.</p>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Add the link in <code>header.html</code>.</span></div><div class="task-step"><span class="step-dot">2</span><span>Use <code>routerLink</code>, not <code>href</code>.</span></div><div class="task-step"><span class="step-dot">3</span><span>Give it a class that looks like a button and verify the Network tab stays quiet.</span></div></div>
        <app-collapsible icon="💡" label="Hint — keep tomorrow's promise visible"><p>Use a label such as <code>🎲 Surprise me</code>. The destination can be Browse today; the important part is practicing a shared nav action without a full reload.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Surprise Me navigates inside the SPA, and you can explain how Day 9 will replace the temporary destination with <code>/show/:id</code>.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 3"><app-code-block lang="html" file="src/app/header/header.html" [code]="surpriseAnswerCode" /></app-collapsible>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day8/act3" class="btn-secondary">← Act 3: 404 & Debug It</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card"><h3>Checkpoint</h3><ul class="complete-list"><li>Home, Browse, Watchlist, About, and 404 are reachable.</li><li>Only the current nav link is active; Home uses exact matching.</li><li>A show added on Browse appears on Watchlist through the service.</li><li>Back and hard refresh behave on a deep URL.</li><li>App is a clean header/outlet/footer shell.</li></ul></section>
      <div class="completion-card"><h3>🎉 Congratulations!</h3><p>BingeBoard has real places now. Day 9 will make one of those places dynamic with route parameters.</p></div>
    </div>
  `,
  styles: [`
    .lab-label { color: #f0b429; }
    .lab-intro { background: #172331; border: 1px solid #2f5879; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; }
    .task-meta { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin-bottom: 12px; }
    .difficulty { border-radius: 999px; padding: 4px 10px; font-size: 13px; font-weight: 700; }
    .difficulty.easy { background: #253b2f; color: #9be7b1; }
    .difficulty.medium { background: #4a3920; color: #ffd27a; }
    .concepts { color: #9aa0aa; font-size: 14px; }
    .task-steps { display: grid; gap: 10px; margin: 16px 0; }
    .task-step { display: flex; gap: 10px; align-items: flex-start; }
    .step-dot { flex: 0 0 24px; height: 24px; border-radius: 50%; background: #2a2d35; color: #e6e6e6; text-align: center; line-height: 24px; font-size: 13px; }
    .checkpoint-card { margin-top: 28px; }
    .completion-card { background: #193524; border: 1px solid #3d8a5c; border-radius: 10px; padding: 20px; margin-top: 20px; }
    .completion-card h3 { margin-top: 0; color: #9be7b1; }
    .complete-list { display: grid; gap: 8px; }
  `]
})
export class Day8LabComponent {
  homeAnswerCode = `import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';

export class Home {
  count = inject(WatchlistService).count;
}`;
  homeTemplateCode = `<h1>BingeBoard</h1>
<p>You're tracking {{ count() }} shows.</p>
<a class="cta" routerLink="/browse">Browse shows</a>
<a class="cta" routerLink="/watchlist">Open watchlist</a>`;
  aboutAnswerCode = `ng g c pages/about

// app.routes.ts
{ path: 'about', component: About, title: 'About · BingeBoard' }

// header.html
<a routerLink="/about" routerLinkActive="active">About</a>`;
  surpriseAnswerCode = `<a routerLink="/browse" class="surprise">🎲 Surprise me</a>`;
}
