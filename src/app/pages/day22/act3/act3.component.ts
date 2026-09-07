import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day22-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 22 · Act 3 of 3</span><h1>🎭 SSR, and Reading a Production Incident</h1><p class="subtitle">One term you should know without having built it, and a symptom-first diagnosis exercise before you touch code.</p></div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/ssr" target="_blank" rel="noopener">server-side rendering guide</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> State the CSR/SSR tradeoff in one sentence, then diagnose two production symptoms by which layer they point at.</li><li><strong>Why It Matters:</strong> Not every project needs SSR, but every Angular developer needs to recognize the term and know when to reach for it.</li><li><strong>Build Steps:</strong> Name what you built today (CSR) → contrast it with SSR → diagnose a two-bug incident report.</li><li><strong>Expected Outcome:</strong> You can explain today's rendering model in one sentence and read a production symptom back to its layer.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 3 (SSR and Production Incidents)</p><p><strong>Next step:</strong> Day 22 Lab</p><p><strong>Time:</strong> About 20 minutes.</p></section>

      <app-lesson-step stepId="d22-act3-ssr" [stepNumber]="1" title="Server-Side Rendering, in One Sentence">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Back on Day 1 the answer to "does this app render on the server?" was no. What you deployed today is <strong>client-side rendered</strong>: the server sends an empty shell plus JavaScript, and the browser does all the rendering after that. <strong>Server-side rendering</strong> flips the order — the server sends ready-made HTML first, which helps search-engine crawlers and slow devices, at the cost of running a server instead of a static host.</p>
        <app-code-block lang="typescript" [code]="ssrOneLiner" />
        <p>Angular supports SSR well (<code>ng add @angular/ssr</code>) when a project needs it. For an app like this one — everything meaningful sits behind a sign-in wall anyway — client-side rendering is a sound default, not a missed step.</p>
        <div class="think-about-it"><p class="tai-q">Why might SSR matter less for BingeBoard than for, say, a public blog or storefront?</p></div>
        <app-collapsible icon="✅" label="Show Answer — SSR's biggest win is for public, crawlable, first-paint-sensitive pages"><p>SSR mainly pays off when search engines need to index content, or when a slow first paint costs real conversions on public pages. BingeBoard's private data lives behind Auth, so a crawler can't see it either way, and today's build already ships fast for the pages that matter. File this under "know the term, know the tradeoff" rather than "always required."</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> State, in one sentence, what today's build renders where and why. You can name <code>ng add @angular/ssr</code> as the escape hatch without needing to use it.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d22-act3-debug" [stepNumber]="2" title="Debug It — A Production Incident Report">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>No code this time — just a symptom report, because that's the actual shape of production debugging:</p>
        <app-code-block lang="typescript" [code]="incidentReport" />
        <p>Two distinct bugs live in that one report. Diagnose from the symptoms before reading the fix.</p>
        <div class="think-about-it"><p class="tai-q">What's the diagnosis for each symptom, and which layer does each one point at?</p></div>
        <app-collapsible icon="✅" label="Show Answer — one router-shaped bug, one auth-shaped bug"><p><strong>Symptom 1</strong> ("root works, deep links don't"): the SPA rewrite is missing — either the single-page-app prompt was answered No during <code>firebase init</code>, or <code>firebase.json</code>'s <code>rewrites</code> block was edited out. The URL-shaped clue is that the root loads (the host does have an <code>index.html</code>) but any other path 404s at the host level, before Angular ever boots. <strong>Symptom 2</strong> (popup closes, nothing happens): the live domain isn't in Firebase Auth's authorized domains list — this happens when a custom domain is added to Hosting without also authorizing it under Authentication → Settings → Authorized domains. Notice how each symptom pointed at its own layer: routing config vs. auth config. Producing the diagnosis before touching anything is the actual skill here.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Read the incident report and name both root causes before checking the answer. You can separate a routing-layer symptom from an auth-layer symptom by its shape alone.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day22/act2" class="btn-secondary">← Act 2: Firebase Hosting</a><a routerLink="/day22/lab" class="btn-primary">Day 22 Lab →</a></div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    { concept: 'client-side rendering (CSR)', plainEnglish: 'The server sends an empty shell plus JavaScript; the browser renders everything after that.', analogy: '🎬 Mailing someone a script and having them stage the whole play themselves.' },
    { concept: 'server-side rendering (SSR)', plainEnglish: 'The server renders real HTML first, then hands the interactive app off to the browser.', analogy: '🎭 Mailing someone a photo of the fully staged play, then handing them the script afterward.' },
    { concept: 'authorized domain', plainEnglish: 'A domain Firebase Auth trusts to complete a sign-in popup or redirect.', analogy: '🛂 A guest list at the door — only listed addresses get let in.' },
    { concept: 'production incident', plainEnglish: 'A real symptom in front of real users, diagnosed by layer before any code changes.', analogy: '🔍 A doctor listening to symptoms before ordering one specific test.' }
  ];

  ssrOneLiner = `// What you shipped today:
// CSR — the browser receives an empty <app-root>, boots Angular, and renders.

// The alternative, if a project needs it later:
// SSR — ng add @angular/ssr makes the server render real HTML first.`;

  incidentReport = `Deployed fine. Site loads at the root URL.

But refreshing on /watchlist gives a Firebase 404 page,
and a friend's bookmark to /show/431 is dead.

Also: sign-in works on localhost, but on the live site
the Google popup closes and nothing happens.`;
}
