import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day18-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 18 · Act 1 of 3</span>
        <h1>☁️ Firebase, the Console, and Your Own Project</h1>
        <p class="subtitle">A real cloud database, without writing a server. Today you create it, by hand, before a single line of code touches it.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 17's BingeBoard is fully working — formatted runtime and rating badges on every card, a real 404 page. If that isn't running yet, visit the <a routerLink="/day18/start">Day 18 Starting Point</a> first. You'll also need a Google account signed in and ready — you're about to create a real Firebase project under it.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> Angular's
        <a href="https://firebase.google.com/docs/firestore/data-model" target="_blank" rel="noopener">Firestore data model</a>
        overview.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Explain what Firebase actually is and the tradeoff it makes, then create a real Firebase project with Firestore enabled and hand-seed your first collection.</li>
          <li><strong>Why It Matters:</strong> Everything BingeBoard has stored so far lived in memory or <code>localStorage</code> — gone on a different device, invisible to any other user, never a source of truth. A real app needs a real backend. Today you get one without writing a server.</li>
          <li><strong>Build Steps:</strong> Understand the backend-as-a-service tradeoff → create your own Firebase project and enable Firestore in test mode → hand-create your first collection directly in the console.</li>
          <li><strong>Expected Outcome:</strong> You have a real Firebase project with Firestore enabled, a <code>shows-of-the-week</code> collection with two hand-created documents, and you can define document, collection, and why the test-mode warning matters.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (Firebase, the Console, and Your Own Project)</p>
        <p><strong>Next step:</strong> Act 2 (Wiring AngularFire and Reading a Collection Live)</p>
        <p><strong>Time:</strong> About 30 minutes. Console setup, Google logins, and project creation take real time — budget for it generously rather than rushing.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d18-act1-baas-tradeoff" [stepNumber]="1" title="What Firebase Actually Is — and the Trade You're Making">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Real apps store data on servers. Normally that means building a backend from scratch: an API,
          a database, authentication, hosting — weeks of infrastructure before you write the feature you
          actually care about. <strong>Firebase</strong> is Google's "backend as a service": a real database
          (Firestore), real authentication, and real hosting, all callable directly from your Angular app,
          with no server code of your own to write or run.
        </p>

        <p style="margin-top: 12px;">
          Say the tradeoff plainly, because it's real and worth naming rather than glossing over: you are
          renting Google's backend. That means their pricing, some amount of lock-in to their APIs and data
          model, and less control than a backend you fully own. In exchange, you ship in days instead of
          months. For a course project — and for a real capstone — that trade is excellent. For a company
          betting its entire infrastructure on one vendor for the next decade, it's a decision worth real
          scrutiny. Both things are true at once.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Your watchlist already survives a page refresh via <code>localStorage</code>. List three concrete ways that falls short of what a real, Netflix-grade app needs.</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — at least three real gaps">
          <p><code>localStorage</code> is per-browser and per-device — sign in on your phone and your watchlist is empty, because nothing synced. It's per-origin with no concept of a user account, so there's no way to share a watchlist, follow a friend's, or have any "your data" story across devices at all. There's no server-side source of truth — if you clear browser data, or switch browsers, or the tab crashes mid-write, there is no backup copy anywhere. And it has real, low size limits (typically a few MB per origin) that a growing watchlist, or richer data like reviews or viewing history, would eventually hit. Every one of these is a "cloud database" problem, which is exactly what today solves.</p>
        </app-collapsible>

        <p style="margin-top: 12px;">
          Firestore's data model is worth contrasting with tables, if you've seen SQL before. Data lives in
          <strong>documents</strong> — JSON-ish objects with fields — grouped into <strong>collections</strong>.
          There is no enforced schema: Firestore will happily let one document in a collection have a field
          another document doesn't. The discipline is entirely on you — your TypeScript interfaces become the
          de facto schema, enforced by your code, not the database.
        </p>

        <div class="info-box">
          <strong>The punchline, and why Days 15-16 mattered:</strong> Firestore is realtime by design. You
          don't ask "what's currently in this collection?" once — you <em>subscribe</em> to it, and Firestore
          pushes every change to you as it happens. That's an Observable. Everything you built with streams,
          <code>toSignal</code>, and operators over the last several days was quietly preparing you to read a
          live database today.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain what Firebase is in one sentence, state the backend-as-a-service tradeoff honestly, and describe Firestore's document/collection model without needing to look it up.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d18-act1-create-project" [stepNumber]="2" title="Create Your Own Firebase Project">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this, in your browser, right now:</strong></p>

        <app-code-block lang="typescript" [code]="createProjectSteps" />

        <div class="warning-box">
          <strong>Write this down, don't just click past it:</strong> "start in test mode" means your
          database is open to the entire internet — no login required, no restrictions — for 30 days. That is
          not a bug or an oversight; it's a deliberate, time-boxed default so you can build quickly without
          fighting security rules on day one. A future day in this course locks Firestore down with real
          security rules before that window matters. Today, just know the clock is real and note the date.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Why would Firebase choose "wide open for 30 days" as the default instead of "locked down from the start"?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — optimizing for the first hour, not the first month">
          <p>A brand-new Firestore database with restrictive security rules from minute one would mean every single read and write fails until you've written correct rules — a genuinely hard thing to get right before you've even seen your own data model in practice. Test mode optimizes for the learning curve: you get to build the feature, see real data flow, and understand the shape of your own app before being asked to write rules that correctly protect it. The 30-day window is the honest tradeoff — long enough to learn, short enough that "temporary" doesn't quietly become "permanent and forgotten," which is exactly the trap a production app must not fall into.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You have your own Firebase project, with Firestore Database created and running in test mode. You can state, in your own words, why test mode's 30-day countdown is a real security consideration and not a formality to click past.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d18-act1-seed-console" [stepNumber]="3" title="Hand-Seed Your First Collection">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Before any code touches Firestore, create data by hand in the console — it demystifies the data
          model completely. There's no schema file to read, no migration to run: a collection is just a name,
          and a document is just fields you type in.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> in the Firestore console, start a new collection
          named <code>shows-of-the-week</code>, and add two documents, each with these fields:</p>

        <app-code-block lang="typescript" [code]="seedFieldsExample" />

        <p style="margin-top: 12px;">
          Notice what you just did: no code, no compiler, no deploy step. You created real, persistent,
          cloud-hosted data by clicking "Add field" a few times. That's the entire mental model for what a
          document is — the console UI is not a simplified preview of the real thing, it <em>is</em> the real
          thing.
        </p>

        <div class="think-about-it">
          <p class="tai-q">If Firestore enforces no schema, what stops one of your two documents from having a typo'd field name like <code>ratingg</code> instead of <code>rating</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — nothing, and that's the point">
          <p>Nothing in Firestore itself stops that — it will happily store a document with <code>ratingg</code> right next to one with <code>rating</code>, and both are equally valid documents as far as the database is concerned. The typo only becomes a problem the moment your code tries to read <code>rating</code> from that document and gets <code>undefined</code> instead. This is exactly why "your TypeScript interfaces are the de facto schema" isn't just a slogan — the discipline that a SQL database's schema would have enforced automatically is now entirely your job, enforced by consistent field names and, tomorrow, by code that writes documents instead of a human typing field names by hand.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your Firestore console shows a <code>shows-of-the-week</code> collection with two documents, each with real <code>name</code>, <code>blurb</code>, and <code>rating</code> field values you typed yourself.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day18/start" class="btn-secondary">← Day 18 Starting Point</a>
        <a routerLink="/day18/act2" class="btn-primary">Act 2: Wiring AngularFire and Reading a Collection Live →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'backend-as-a-service',
      plainEnglish: 'Rent Google\'s database, auth, and hosting instead of building your own backend from scratch.',
      analogy: '🏨 Staying at a hotel instead of building a house — faster to move in, less control over the walls.'
    },
    {
      concept: 'document',
      plainEnglish: 'A single JSON-ish record with fields — Firestore\'s equivalent of one row.',
      analogy: '📄 One index card with whatever fields you decided to write on it.'
    },
    {
      concept: 'collection',
      plainEnglish: 'A named group of documents, with no enforced shape across them.',
      analogy: '🗄️ A drawer full of index cards — some cards might have more fields written than others.'
    },
    {
      concept: 'test mode',
      plainEnglish: 'A 30-day-countdown default that leaves the database open to anyone, so you can build first and secure it deliberately later.',
      analogy: '🚧 A construction site with the gate open during business hours — temporary, timed, and meant to close.'
    }
  ];

  createProjectSteps = `1. Go to console.firebase.google.com and sign in with your Google account.
2. Click "Add project" -> name it something like bingeboard-yourname -> skip Google Analytics (not needed today).
3. In the left sidebar: Build -> Firestore Database.
4. Click "Create database" -> choose a location (any nearby region is fine) -> select "Start in test mode".
5. Wait for provisioning to finish -- you now have a real, empty Firestore database.`;

  seedFieldsExample = `// Document 1
name: "The Bear"          (string)
blurb: "A chef returns home to run his family's sandwich shop."  (string)
rating: 8.6                (number)

// Document 2
name: "Severance"          (string)
blurb: "Employees undergo a procedure to separate work memories from personal ones."  (string)
rating: 8.7                (number)`;
}
