import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day22-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label lab-label">🛠️ Student Lab</span><h1>Your Turn — Ship It, Measure It, Show Someone</h1><p class="subtitle">Three tasks: polish and reship, measure the real thing, then get real feedback. One stretch into preview channels.</p></div>
      <div class="lab-intro"><h3>🎯 Starting Point</h3><p>Start from the <a routerLink="/day22/start">Day 22 Starting Point</a>, then complete Acts 1-3. You need a working production build and a live Firebase Hosting URL before these tasks make sense.</p></div>
      <section class="lesson-framework"><h3>Lab Map</h3><ul><li><strong>Learning Goal:</strong> Treat a live deploy as an ongoing loop — ship, measure, fix, reship — rather than a one-time event.</li><li><strong>Why It Matters:</strong> Deploying twice is when it stops being scary. Measuring the real site instead of localhost is a genuine junior-developer task.</li><li><strong>Build Steps:</strong> Ship-it checklist and reship → Lighthouse on production → the friend test → stretch into preview channels.</li><li><strong>Expected Outcome:</strong> Your live app has real titles, a real favicon, no console noise, and at least one Lighthouse fix — and one real person outside class has used it.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Day 22 Lab (final step of Day 22)</p><p><strong>Next step:</strong> Review the Checkpoint below.</p><p><strong>Time:</strong> About 60 minutes for Tasks 1-3; Task 4 is open-ended.</p></section>

      <app-lesson-step stepId="d22-lab-shipit-checklist" [stepNumber]="'Task 1'" title="Ship-It Checklist, Then Reship">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: route titles, favicon, meta description, console hygiene, the wildcard 404 route.</span></div>
        <h4>What to build:</h4>
        <p>Give every route a real <code>title</code> (you already have the mechanism from <code>app.routes.ts</code>), add a favicon, add a <code>&lt;meta name="description"&gt;</code>, and remove any leftover <code>console.log</code> calls. Then visit the live URL and type a junk path — confirm the wildcard route still renders your 404 page instead of a host-level error.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Set a descriptive <code>title</code> on each route and update <code>index.html</code>'s favicon and meta description.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Grep the app for <code>console.log</code> and remove anything that isn't intentional error logging.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Rebuild, redeploy, and test a junk path on the live URL.</span></div>
        </div>
        <div class="think-about-it"><p class="tai-q">Why does a junk path still render your 404 page instead of the host's own error page, after the rewrite is configured?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the rewrite hands every path to Angular, including invalid ones"><p>The SPA rewrite serves <code>index.html</code> for literally any path the host doesn't recognize as a real file — including typos and dead links. Angular boots, its router checks every real route, matches none of them, and falls through to your app's own wildcard (<code>**</code>) route. The host's 404 page never gets a chance to appear.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Redeploy and confirm real titles in browser tabs, a real favicon, and a clean console on the live site.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 1"><app-code-block lang="typescript" [code]="titlesAnswerCode" /></app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d22-lab-lighthouse" [stepNumber]="'Task 2'" title="Lighthouse on the Real Thing">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: production performance auditing, comparing scores over time.</span></div>
        <h4>What to build:</h4>
        <p>Run Lighthouse against your live URL — not <code>localhost</code>, which reports differently. Compare the score against Day 17's baseline. Fix the single cheapest flagged item (usually image sizing or a missing meta tag), then redeploy and re-run Lighthouse to confirm the fix landed.</p>
        <div class="think-about-it"><p class="tai-q">Why does Lighthouse against localhost tend to score better than the same app on a live host?</p></div>
        <app-collapsible icon="✅" label="Show Answer — localhost skips real network and server conditions"><p>Localhost has no real network latency, no CDN, and no production caching headers — it's the best-case scenario for load performance. A live URL is what actual users experience, including realistic round-trip time. Always trust the live score over a local one when reporting or acting on performance.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Record a before/after Lighthouse score for one real fix on the production URL.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d22-lab-friend-test" [stepNumber]="'Task 3'" title="The Friend Test">
        <div class="task-meta"><span class="difficulty easy">🟡 Easy</span><span class="concepts">Concepts: usability outside your own head, a real bug report.</span></div>
        <h4>What to build:</h4>
        <p>Send your live URL to one person outside this course. Watch them use it, or collect whatever confused message they send back. Write down the very first thing that confused them — bring it with you; it becomes a real usability bug report you'll decide what to do with soon.</p>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> One real person outside class has opened your live URL, and you have one written-down point of confusion.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d22-lab-preview-channel" [stepNumber]="'Task 4 (Stretch)'" title="Deploy to a Preview Channel">
        <div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: temporary preview URLs, review-before-ship workflows.</span></div>
        <h4>What to build:</h4>
        <p>Deploy to a temporary Firebase Hosting preview channel instead of your live channel, and open the preview URL it gives back.</p>
        <app-code-block lang="bash" [code]="previewChannelCommand" />
        <div class="outcome-check">✅ <strong>Expected outcome (if attempted):</strong> A working preview URL, separate from your live site, that you can review changes on before ever touching production. Real teams use exactly this workflow.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day22/act3" class="btn-secondary">← Act 3: SSR and Production Incidents</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card"><h3>Checkpoint</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> The app is live at a public URL; deep links and refresh work in production.</li><li><span class="checkbox">✅</span> Auth works on the live domain; someone outside class has used the app.</li><li><span class="checkbox">✅</span> You can explain the SPA rewrite from memory and say what <code>ng build</code> produces.</li></ul></section>
      <div class="completion-card"><h2>🎉 Congratulations!</h2><p>You've finished Day 22: Ship It. You now know how to:</p><ul class="complete-list"><li>✅ Produce and read a real production build.</li><li>✅ Separate dev configuration from prod configuration with file replacements.</li><li>✅ Deploy to Firebase Hosting with a working SPA rewrite.</li><li>✅ State the CSR/SSR tradeoff in one sentence.</li><li>✅ Diagnose a production incident by symptom, before touching code.</li></ul><a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a></div>
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
    }
  `]
})
export class Day22LabComponent {
  titlesAnswerCode = `// app.routes.ts -- descriptive titles per route (already partially in place)
export const routes: Routes = [
  { path: '', title: 'Browse · BingeBoard', /* ... */ },
  { path: 'show/:id', title: 'Show Details · BingeBoard', /* ... */ },
  { path: 'watchlist', title: 'My Watchlist · BingeBoard', /* ... */ },
];

<!-- index.html -->
<meta name="description" content="Track shows you're watching, get recommendations, and never lose your place." />
<link rel="icon" type="image/png" href="favicon.png" />`;

  previewChannelCommand = `firebase hosting:channel:deploy preview-name`;
}
