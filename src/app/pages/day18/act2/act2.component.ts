import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day18-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 18 · Act 2 of 3</span>
        <h1>🔌 Wiring AngularFire and Reading a Collection Live</h1>
        <p class="subtitle">From a database you clicked into existence to a live stream rendering on your Home page.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> the
        <a href="https://github.com/angular/angularfire/blob/main/docs/firestore/collections.md" target="_blank" rel="noopener">AngularFire Firestore</a>
        docs — specifically the section on <code>collectionData</code>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Wire AngularFire into your app with the modular API, and build a service that reads a live Firestore collection into a signal.</li>
          <li><strong>Why It Matters:</strong> This is the exact shape you'll reuse for every collection you ever read in this app — get the anatomy right once, and every future feature is a variation on today's pattern.</li>
          <li><strong>Build Steps:</strong> Install and wire AngularFire, config values in <code>environment.ts</code> → build <code>FeaturedService</code> with <code>collection()</code>, <code>collectionData()</code>, and <code>toSignal()</code> → render it on Home.</li>
          <li><strong>Expected Outcome:</strong> Your app compiles against your own Firebase project, and "Shows of the week" renders real data read live from Firestore.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Wiring AngularFire and Reading a Collection Live)</p>
        <p><strong>Next step:</strong> Act 3 (The Realtime Moment, and Debug It)</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d18-act2-install-wire" [stepNumber]="1" title="Install AngularFire and Wire Your Config">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> in your project's terminal:</p>

        <app-code-block lang="typescript" [code]="ngAddCommand" />

        <p style="margin-top: 12px;">
          Choose Firestore when prompted. The schematic wires the providers into <code>app.config.ts</code>
          for you. If the interactive flow fights you — a flaky terminal, a schematic version mismatch — the
          manual fallback is two providers, added by hand:
        </p>

        <app-code-block lang="typescript" [code]="manualProvidersCode" />

        <div class="warning-box">
          <strong>Modular API only, no exceptions:</strong> if any tutorial, blog post, or AI-generated
          snippet you find shows a class called <code>AngularFirestore</code> (capital A, injected as a
          class) or imports from a path containing <code>/compat/</code>, that's the legacy compat API from
          before Firebase's SDK rewrite. It still technically works, but it's a different mental model
          entirely and mixing it with the modular functions above causes real bugs. This course uses only
          <code>&#64;angular/fire/firestore</code> imports and plain functions — no exceptions, no "just this
          once."
        </div>

        <p style="margin-top: 12px;"><strong>Do this:</strong> get your config values from Firebase Console →
          Project Settings (gear icon) → Your apps → the Web app's config object, and put them in
          <code>src/environments/environment.ts</code>:</p>

        <app-code-block lang="typescript" [code]="environmentConfigCode" />

        <div class="info-box">
          <strong>Address this head-on, because the confusion is real and common:</strong> yes, these config
          values — including what looks like an "API key" — ship to every browser that loads your app, fully
          visible in DevTools. That is by design, not a leak. This config identifies <em>which</em> Firebase
          project a request is for; it does not authorize what that request is allowed to do. Authorization
          is the job of <strong>security rules</strong>, configured separately in the Firestore console (a
          future day in this course covers writing them properly). Right now, in test mode, anyone with your
          project id could technically read or write your data — that's exactly what the 30-day test-mode
          warning from Act 1 was about, and exactly why it isn't a formality.
        </div>

        <div class="think-about-it">
          <p class="tai-q">If someone copied your <code>firebaseConfig</code> object out of your deployed app's JS bundle, what could they actually do with it, assuming your security rules are properly locked down?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — almost nothing, if rules are correct">
          <p>With correct security rules in place, copying your config lets someone send requests <em>to your project</em>, but every request still has to pass your rules the same way a request from your own app does. They could not read or write anything your rules don't already permit for an unauthenticated (or authenticated) user — the config is an address, not a key that unlocks anything by itself. This is precisely why the config being public is fine by design: the real gate is the rules, and right now, in test mode, that gate is deliberately wide open until you close it.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your app builds with AngularFire installed and your own project's config wired in. You can explain in one sentence why a public Firebase config is not a security problem by itself.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d18-act2-featured-service" [stepNumber]="2" title="FeaturedService — Reading a Collection as a Signal">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p><strong>Do this:</strong> create a new <code>FeaturedService</code>:</p>

        <app-code-block lang="typescript" [code]="featuredServiceCode" />

        <p style="margin-top: 12px;">
          Read the anatomy in order, because each piece does one specific job:
        </p>

        <app-code-block lang="typescript" [code]="anatomyCode" />

        <div class="think-about-it">
          <p class="tai-q">Why does calling <code>collection(this.firestore, 'shows-of-the-week')</code> alone not actually fetch anything?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a reference is an address, not a fetch">
          <p><code>collection()</code> just builds a reference object — think of it as writing down an address, not knocking on the door. It costs nothing, does no network work, and can be passed around freely. <code>collectionData(ref)</code> is the step that actually turns that address into a live, subscribable Observable — and even then, per Day 13's laziness lesson, nothing happens over the network until something subscribes to it, which <code>toSignal</code> does for you automatically.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>FeaturedService</code> compiles with no errors, and <code>featured()</code> is a signal of an array — even before anything renders it, you can confirm this by logging <code>this.featuredSvc.featured()</code> from any component that injects it.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d18-act2-render-home" [stepNumber]="3" title="Render It — Shows of the Week on Home">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p><strong>Do this:</strong> on your Home/Browse page, inject <code>FeaturedService</code> and render its signal:</p>

        <app-code-block lang="html" [code]="renderHomeCode" />

        <p style="margin-top: 12px;">
          <code>&#64;empty</code> is new syntax worth naming: it's the branch Angular's <code>&#64;for</code>
          renders when the collection it's looping over has zero items — a built-in empty state, no separate
          <code>&#64;if (list.length === 0)</code> needed alongside it.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your Home page shows a "Shows of the week" panel listing the two documents you hand-created in Act 1, with their real <code>name</code> and <code>blurb</code> values.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day18/act1" class="btn-secondary">← Act 1: Firebase, the Console, and Your Own Project</a>
        <a routerLink="/day18/act3" class="btn-primary">Act 3: The Realtime Moment, and Debug It →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'reference',
      plainEnglish: 'An address pointing at a collection or document — costs nothing, fetches nothing by itself.',
      analogy: '📍 A pin dropped on a map, not the trip there.'
    },
    {
      concept: 'collectionData()',
      plainEnglish: 'Turns a reference into a live Observable stream of that collection\'s current contents.',
      analogy: '📡 Tuning a radio to a station\'s frequency — you start receiving whatever it broadcasts.'
    },
    {
      concept: 'idField',
      plainEnglish: 'Copies each document\'s real Firestore id into the object itself, so your code can reference it later.',
      analogy: '🏷️ Stapling the file cabinet\'s drawer label onto the folder you pulled out of it.'
    },
    {
      concept: 'config vs. security rules',
      plainEnglish: 'Config identifies which project a request targets; rules decide what that request is allowed to do.',
      analogy: '🏢 A building\'s street address is public; the locked doors inside are what actually control access.'
    }
  ];

  ngAddCommand = `ng add @angular/fire`;

  manualProvidersCode = `import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Inside your ApplicationConfig's providers array:
provideFirebaseApp(() => initializeApp(environment.firebase)),
provideFirestore(() => getFirestore()),`;

  environmentConfigCode = `export const environment = {
  production: false,
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_PROJECT_ID.appspot.com',
    messagingSenderId: 'YOUR_SENDER_ID',
    appId: 'YOUR_APP_ID'
  }
};`;

  featuredServiceCode = `import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface FeaturedShow {
  id: string;
  name: string;
  blurb: string;
  rating: number;
}

@Injectable({ providedIn: 'root' })
export class FeaturedService {
  private firestore = inject(Firestore);

  featured = toSignal(
    collectionData(
      collection(this.firestore, 'shows-of-the-week'),
      { idField: 'id' }
    ) as Observable<FeaturedShow[]>,
    { initialValue: [] }
  );
}`;

  anatomyCode = `// collection(db, name)   -- a REFERENCE: an address, no data fetched yet.
// collectionData(ref)    -- turns that reference into a live Observable
//                           stream of the collection's current contents.
// toSignal(...)           -- bridges that Observable into signal-land,
//                           exactly like every Observable you've bridged since Day 15.
// { idField: 'id' }       -- copies each document's real Firestore id onto
//                           the object -- you'll need real ids to update/delete.`;

  renderHomeCode = `<section class="featured-panel">
  <h2>Shows of the week</h2>
  @for (s of featuredSvc.featured(); track s.id) {
    <article class="featured-card">
      <h3>{{ s.name }}</h3>
      <p>{{ s.blurb }}</p>
    </article>
  } @empty {
    <p class="muted">Nothing featured yet.</p>
  }
</section>`;
}
