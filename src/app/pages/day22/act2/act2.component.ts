import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day22-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 22 · Act 2 of 3</span><h1>☁️ Firebase Hosting — Going Live</h1><p class="subtitle">You're already in the Firebase ecosystem. Today it hosts your files too, and pays off Day 8's oldest unanswered question.</p></div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Firebase's <a href="https://firebase.google.com/docs/hosting/quickstart" target="_blank" rel="noopener">Hosting quickstart</a> and <a href="https://firebase.google.com/docs/hosting/full-config#rewrites" target="_blank" rel="noopener">rewrites reference</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Initialize Firebase Hosting for this build, configure the SPA rewrite, and deploy to a public URL.</li><li><strong>Why It Matters:</strong> A static host with no rewrite serves a 404 on every deep link. That single flag is the difference between "it works on my machine" and "it works."</li><li><strong>Build Steps:</strong> Install tooling and initialize hosting → configure the rewrite → deploy and verify.</li><li><strong>Expected Outcome:</strong> Your app is live at a public URL, and refreshing any route works exactly like it does on the dev server.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 2 (Firebase Hosting)</p><p><strong>Next step:</strong> Act 3 (SSR and Production Incidents)</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d22-act2-hosting-init" [stepNumber]="1" title="Install Firebase Tools and Initialize Hosting">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>A production build is just a folder of files until something serves them. Firebase Hosting is a natural fit here — you're already using Firebase for Firestore and Auth, it's free-tier friendly, and it has first-class support for single-page apps.</p>
        <app-code-block lang="bash" [code]="initCommands" />
        <div class="warning-box"><strong>Two prompts are the whole game.</strong> When asked for a public directory, answer <code>dist/bingeboard/browser</code> — not the default <code>public</code>, which is an empty folder and gets you Firebase's generic welcome page instead of your app. When asked to configure as a single-page app, answer <strong>Yes</strong>.</div>
        <div class="think-about-it"><p class="tai-q">You ran <code>firebase deploy</code> and got the Firebase welcome page instead of BingeBoard. What almost certainly happened?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the public directory prompt was answered wrong"><p>The welcome page means Firebase Hosting is serving its own placeholder <code>public/</code> folder instead of your build output. Re-run <code>firebase init hosting</code> (or edit <code>firebase.json</code> directly) so the public directory points at <code>dist/bingeboard/browser</code>, the actual folder <code>ng build</code> produced.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Run <code>firebase init hosting</code> from the repo root and answer both prompts correctly. You can point at the exact folder Firebase will serve.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d22-act2-spa-rewrite" [stepNumber]="2" title="Read the Rewrite — Day 8's IOU, Paid">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Open the <code>firebase.json</code> the init step generated and read the rewrite rule slowly, out loud or in a comment.</p>
        <app-code-block lang="json" [code]="rewriteConfig" />
        <p>Back on Day 8 you asked why refreshing <code>/browse</code> works on the dev server. The dev server has no <code>/browse</code> file either — it just quietly does this same trick for you. This rule tells Firebase: there's no file at any given path, so serve <code>index.html</code> for every one of them. Angular boots, the router reads the actual URL, and the right page renders client-side.</p>
        <div class="think-about-it"><p class="tai-q">Without this rewrite, what happens when someone refreshes on <code>/watchlist</code> in production?</p></div>
        <app-collapsible icon="✅" label="Show Answer — a real 404, from the host, before Angular ever loads"><p>The host looks for a file literally named <code>watchlist</code> in your build folder, finds nothing, and returns its own 404 page — Angular never gets the chance to boot and let the router take over. This is, by a wide margin, the most common single bug in real-world SPA deployments, on any host.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Read <code>firebase.json</code>'s rewrite rule and explain in your own words why it's required for a client-side-routed app.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d22-act2-deploy" [stepNumber]="3" title="Deploy and Verify on a Live URL">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Build fresh, then ship it.</p>
        <app-code-block lang="bash" [code]="deployCommands" />
        <p>A URL appears — something like <code>https://bingeboard-yourname.web.app</code>. Open it on your phone. Sign in with Google; <code>localhost</code> and your <code>.web.app</code> domain are both pre-authorized for Auth, so it should just work. Then do the refresh test for real: navigate to <code>/browse</code>, hit refresh. That's the rewrite from Step 2, earning its keep on infrastructure you don't control.</p>
        <div class="think-about-it"><p class="tai-q">Why deploy at least twice today, instead of stopping after the first successful deploy?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the first deploy is exciting; the second is where it stops being scary"><p>A first deploy can feel like a fragile, one-time miracle. Making a small change (Act 3's SSR note, a typo fix, anything) and redeploying proves the workflow is repeatable and ordinary — exactly the muscle memory you want before you're deploying real changes under real pressure.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Deploy and open the live URL on a second device. You can sign in, add a show, and refresh on a deep link without a 404.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day22/act1" class="btn-secondary">← Act 1: The Production Build</a><a routerLink="/day22/act3" class="btn-primary">Act 3: SSR and Production Incidents →</a></div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: 'static host', plainEnglish: 'A server whose only job is serving pre-built files — no app logic runs on it.', analogy: '🗄️ A vending machine: it dispenses what\'s already stocked, it doesn\'t cook anything.' },
    { concept: 'SPA rewrite', plainEnglish: 'A hosting rule that serves index.html for every path so the Angular router can take over.', analogy: '🚪 A single front desk that greets every visitor before directing them to their actual room.' },
    { concept: 'public directory', plainEnglish: 'The exact built folder a host is told to serve requests from.', analogy: '📁 Pointing the mail carrier at the correct building, not a nearby one that looks similar.' },
    { concept: 'deploy', plainEnglish: 'Pushing the build folder onto the host so it becomes reachable at a public URL.', analogy: '🚀 The moment a package leaves the warehouse and ships to a real address.' }
  ];

  initCommands = `npm install -g firebase-tools
firebase login
firebase init hosting
# Public directory?                          -> dist/bingeboard/browser
# Configure as a single-page app (rewrite)?   -> Yes`;

  rewriteConfig = `{
  "hosting": {
    "public": "dist/bingeboard/browser",
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}`;

  deployCommands = `ng build
firebase deploy --only hosting`;
}
