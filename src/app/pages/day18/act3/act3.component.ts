import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day18-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 18 · Act 3 of 3</span>
        <h1>⚡ The Realtime Moment, and Debug It</h1>
        <p class="subtitle">Watch your own app update itself with no refresh — then find the three ways this exact pattern quietly breaks.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://firebase.google.com/docs/firestore/query-data/listen" target="_blank" rel="noopener">Firestore → Listen to realtime updates</a> — this is the mechanism behind the realtime moment in Step 1.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Personally witness realtime sync between the Firestore console and your running app, then diagnose three real bugs in the exact <code>collectionData</code>/<code>toSignal</code>/<code>&#64;for</code> pattern you just built.</li>
          <li><strong>Why It Matters:</strong> Realtime sync is the single most impressive thing Firestore does, and it's easy to use without ever really understanding why it works. The three bugs below are the most common ways this pattern breaks in practice — meeting them here, on purpose, means recognizing them instantly later.</li>
          <li><strong>Build Steps:</strong> Edit and add documents live in the console while watching your app → diagnose three stacked bugs in a buggy version of today's own pattern.</li>
          <li><strong>Expected Outcome:</strong> You've watched your app update itself with zero refresh, and you can name and fix all three of today's classic <code>collectionData</code> mistakes on sight.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (The Realtime Moment, and Debug It)</p>
        <p><strong>Next step:</strong> Student Lab — apply everything to a second collection, solo.</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d18-act3-realtime-demo" [stepNumber]="1" title="Watch It Happen — No Refresh Required">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          <strong>Do this:</strong> open your running app in one browser window and the Firestore console
          (your <code>shows-of-the-week</code> collection) in another, side by side or in separate tabs you
          can switch between quickly.
        </p>

        <app-code-block lang="typescript" [code]="realtimeDemoSteps" />

        <p style="margin-top: 12px;">
          No refresh, no manual re-fetch, nothing you wrote to make this happen beyond the
          <code>FeaturedService</code> from Act 2. This is worth sitting with — most developers' first
          instinct after years of REST APIs is "surely I have to poll for this," and the honest answer here
          is no, you don't.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Connect this to what you already know about Observables: why does this work automatically, with no polling code anywhere?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — because the stream never completes">
          <p><code>collectionData</code> returns an Observable that never completes on its own — it stays subscribed to Firestore's realtime connection for as long as something is listening. Every change on the server — an edit, an add, a delete — is pushed down that open connection as a brand-new emission, the exact same "stream of values over time" model you built by hand with <code>interval</code> and <code>Subject</code> back in Days 15-16. <code>toSignal</code> is still just doing its one job: holding the latest emission as a signal. The realtime behavior isn't a special case bolted onto Firestore — it's what an Observable that never completes does by default, and Firestore's server infrastructure is what makes "push changes as they happen" possible over the network.</p>
        </app-collapsible>

        <div class="info-box">
          <strong>The bigger picture:</strong> the entire reactive stack this course has built — signals,
          <code>computed</code>, operators, <code>toSignal</code> — now has a real, live database sitting at
          the bottom of it. Nothing about the pattern changes when the data source becomes "a database on the
          other side of the world" instead of "a timer" or "an HTTP response." That's the whole value of
          building on Observables in the first place.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You edited a document's <code>blurb</code> in the console and watched your running app update it with zero refresh; you added a new document and watched it appear. You can explain why this requires no polling code, in terms of what an Observable that never completes actually is.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d18-act3-debug-three-bugs" [stepNumber]="2" title="Debug It — Three Bugs, One Tiny Service">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Here's a version of yesterday's pattern with three separate issues stacked on top of each other.
          Try to spot all three yourself before opening any of the answers below.
        </p>

        <app-code-block lang="typescript" [code]="buggyFeaturedCode" />
        <app-code-block lang="html" [code]="buggyTemplateCode" />

        <app-collapsible icon="🧩" label="Bug 1 — missing idField">
          <p>Without <code>&#123; idField: 'id' &#125;</code>, the objects <code>collectionData</code> emits have every field the document has <em>except</em> its Firestore id — <code>s.id</code> is simply <code>undefined</code> on every item. Open your browser console and log <code>featured()</code> yourself to see it: real <code>name</code>/<code>blurb</code>/<code>rating</code> values, no <code>id</code> at all. Since <code>track s.id</code> then tracks every item by the identical value <code>undefined</code>, Angular's <code>&#64;for</code> loses the ability to tell items apart — reordering, adding, or removing documents can produce visibly wrong re-renders, like content flickering into the wrong card. The fix is exactly the option you already had: add <code>idField: 'id'</code> back.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Bug 2 — missing initialValue">
          <p><code>toSignal(...)</code> called with no <code>initialValue</code> option returns a signal typed <code>Signal&lt;FeaturedShow[] | undefined&gt;</code>, and critically, its <em>actual runtime value</em> starts as <code>undefined</code> until the first Firestore emission arrives. <code>&#64;for (s of featured(); ...)</code> tries to iterate <code>undefined</code> on that very first render, which throws a real runtime error — read whatever your browser actually shows here, don't just take this description's word for it. The direct fix is the <code>initialValue: []</code> option, which makes the signal start as a real empty array instead of <code>undefined</code>. The alternative worth knowing: guarding the whole block with <code>&#64;if (featured(); as list)</code> would also survive the <code>undefined</code> case, at the cost of not distinguishing "still loading" from "genuinely empty" — <code>initialValue</code> is the more precise fix here.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Bug 3 — no type on the data">
          <p>Without the <code>FeaturedShow</code> interface (or any type assertion) on the Observable, TypeScript infers something close to <code>any</code> for every field. That means <code>s.name</code>, <code>s.blurb</code>, and a typo like <code>s.nmae</code> are all equally "valid" as far as the compiler is concerned — nothing catches a template typo until you notice the blank space on screen and go hunting for why. Add the interface and the type assertion back (exactly as in Act 2's <code>FeaturedService</code>), then deliberately type <code>s.nmae</code> somewhere in a template on purpose — the payoff is watching the compiler refuse to build until you fix it. That's the entire value proposition of typing your Firestore data: bugs that used to render as silent blank space become compile errors instead.</p>
        </app-collapsible>

        <p style="margin-top: 12px;"><strong>The fix</strong> — all three bugs corrected, back to Act 2's exact pattern:</p>

        <app-code-block lang="typescript" [code]="fixedFeaturedCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name all three bugs without opening the collapsibles above, and you've personally watched the real runtime error the missing <code>initialValue</code> produces, not just read a description of it.</div>
      </app-lesson-step>

      <div class="info-box">
        <strong>Day 18 Acts complete.</strong> You created your own Firebase project, wired AngularFire with the modular API, read a live collection into a signal, watched realtime sync happen with your own eyes, and debugged the three classic mistakes in this pattern. Head to the Student Lab to build a second collection entirely on your own.
      </div>

      <div class="nav-footer">
        <a routerLink="/day18/act2" class="btn-secondary">← Act 2: Wiring AngularFire and Reading a Collection Live</a>
        <a routerLink="/day18/lab" class="btn-primary">Student Lab: Your Turn →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'realtime sync',
      plainEnglish: 'A live server connection pushes every change to every subscriber, with no polling.',
      analogy: '📻 A live radio broadcast versus checking a bulletin board every five minutes.'
    },
    {
      concept: 'a stream that never completes',
      plainEnglish: 'collectionData\'s Observable stays open indefinitely, emitting a new value on every remote change.',
      analogy: '🌊 A river that never runs dry — you can dip in at any moment and it\'s still flowing.'
    },
    {
      concept: 'missing idField',
      plainEnglish: 'Every emitted object is missing its real Firestore id, breaking @for\'s track expression.',
      analogy: '📦 A shipment of unlabeled boxes — the contents are fine, but you can\'t tell one box from another.'
    },
    {
      concept: 'missing initialValue',
      plainEnglish: 'The signal starts as undefined at runtime until the first emission arrives, and @for over undefined throws.',
      analogy: '🍽️ Setting a table before the food arrives, versus not setting it at all and hoping no one sits down yet.'
    }
  ];

  realtimeDemoSteps = `1. In your app, confirm "Shows of the week" is rendering your two documents.
2. In the Firestore console, click into one document and edit its "blurb" field.
3. Save -- then look at your app WITHOUT reloading the page. The new blurb is already there.
4. In the console, add a brand-new third document to shows-of-the-week.
5. Look at your app again, still with no reload. The new show appears in the list.`;

  buggyFeaturedCode = `featured = toSignal(
  collectionData(collection(this.firestore, 'shows-of-the-week'))
);`;

  buggyTemplateCode = `@for (s of featured(); track s.id) {
  <article class="card"><h3>{{ s.name }}</h3><p>{{ s.blurb }}</p></article>
}`;

  fixedFeaturedCode = `interface FeaturedShow {
  id: string;
  name: string;
  blurb: string;
  rating: number;
}

featured = toSignal(
  collectionData(
    collection(this.firestore, 'shows-of-the-week'),
    { idField: 'id' }
  ) as Observable<FeaturedShow[]>,
  { initialValue: [] }
);`;
}
