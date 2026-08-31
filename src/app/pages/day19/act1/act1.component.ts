import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day19-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 19 · Act 1 of 3</span>
        <h1>📋 The Contract, and the Document Shape</h1>
        <p class="subtitle">Before touching a line of WatchlistService, read what it promises today — and design what today's new documents actually look like.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes Day 18's BingeBoard is fully working — your own Firebase project, a live "Shows of the week" panel, and an announcements banner. If that isn't running yet, visit the <a routerLink="/day19/start">Day 19 Starting Point</a> first.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> AngularFire's
        <a href="https://github.com/angular/angularfire/blob/main/docs/firestore/documents.md" target="_blank" rel="noopener">Firestore documents</a>
        guide, specifically the sections on adding and updating data.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Read <code>WatchlistService</code>'s public surface as a contract, understand CRUD as the four verbs behind almost every app, and design a document shape before writing any migration code.</li>
          <li><strong>Why It Matters:</strong> A good migration is invisible to the rest of the app. That's not an accident — it's the entire payoff of putting a service boundary between your components and your storage in the first place, and today is where that boundary earns its keep for real.</li>
          <li><strong>Build Steps:</strong> Read the current service's public surface and predict what has to change → understand CRUD as today's actual scope → design <code>WatchlistDoc</code> up front, including the denormalization tradeoff.</li>
          <li><strong>Expected Outcome:</strong> You can name <code>WatchlistService</code>'s exact public surface from memory, state which components will need to change when its internals move to Firestore (none), and defend a document shape you designed before writing code.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (The Contract, and the Document Shape)</p>
        <p><strong>Next step:</strong> Act 2 (Rebuilding WatchlistService: Create, Read, Delete)</p>
        <p><strong>Time:</strong> About 20 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d19-act1-service-contract" [stepNumber]="1" title="Read the Contract Before You Touch Anything">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Open your own <code>WatchlistService</code> and read only its <strong>public</strong> members — the
          ones without <code>private</code> in front of them. Since Day 9 introduced the watchlist and its
          guard, every component in this app that touches the watchlist has only ever known five things:
        </p>

        <app-code-block lang="typescript" [code]="publicSurfaceCode" />

        <div class="think-about-it">
          <p class="tai-q">If today's entire job is swapping this service's insides from <code>localStorage</code> to Firestore, which components — Browse's show cards, the Watchlist page, the guard, the nav badge — have to change?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — none, and that's the whole point">
          <p>
            None of them, if the migration is done correctly. Every one of those consumers only ever calls
            <code>watchlist()</code>, <code>count()</code>, <code>has(id)</code>, <code>add(show)</code>, or
            <code>remove(id)</code> — never anything about <em>how</em> those five things are implemented.
            That's the entire argument for putting logic behind a service instead of scattering
            <code>localStorage</code> calls across every component that needs watchlist data: the storage
            mechanism is an implementation detail hidden behind a small, stable public surface, and
            implementation details are exactly the things you should be able to change without a ripple
            effect. Write that five-member list down — it's today's actual contract, and Acts 2-3 exist to
            keep it.
          </p>
        </app-collapsible>

        <div class="info-box">
          <strong>Say it plainly, because it's worth feeling:</strong> this is a kept promise, not a new idea.
          The service boundary you've been building since Day 9 was always going to make a change like this
          possible — today is the day that architectural bet actually pays off.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can recite <code>WatchlistService</code>'s five public members from memory, and state confidently which components will need code changes today (none) before writing a single line.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d19-act1-crud-verbs" [stepNumber]="2" title="CRUD — the Four Verbs Behind Almost Every App">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Day 18 was <strong>R</strong> — you read a live collection. Today completes the other three:
          <strong>C</strong>reate a document, <strong>U</strong>pdate one, <strong>D</strong>elete one. Together,
          Create/Read/Update/Delete are the four operations behind nearly every data-backed feature you have
          ever used — a to-do app, a shopping cart, a social feed, and BingeBoard's own watchlist are all, at
          bottom, some arrangement of these four verbs against some collection of records.
        </p>

        <app-code-block lang="typescript" [code]="crudMapCode" />

        <div class="think-about-it">
          <p class="tai-q">Which CRUD verb does <code>WatchlistService.has(id)</code> map to?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a derived Read, not its own verb">
          <p><code>has(id)</code> doesn't introduce a fifth verb — it's a small derived check computed from data you're already Reading. Once you have the live collection as a signal, "does this id exist in it" is just a lookup over data you already have in memory, not a separate trip to the database. Recognizing when a new-sounding operation is actually a cheap derivation over existing state, rather than a new fetch, is worth noticing as its own skill — the same instinct behind reaching for <code>computed()</code> instead of a new subscription every time you need a slightly different view of data you already have.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name all four CRUD verbs and the specific Firestore function behind each one, and explain why <code>has()</code> doesn't need a fifth.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d19-act1-document-shape" [stepNumber]="3" title="Design the Document Shape — Before Writing a Line of Migration Code">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Design first, code second. A watchlist entry becomes a document in a new <code>watchlist</code>
          collection. Firestore generates its own document ids automatically, so your document needs to store
          the TVMaze show id as an ordinary field — it is not the same id Firestore uses internally, and
          holding that distinction clearly in your head now will save you real confusion in Act 2.
        </p>

        <app-code-block lang="typescript" [code]="watchlistDocCode" />

        <p style="margin-top: 12px;">
          Notice what that interface does: it copies <code>name</code>, <code>genre</code>, <code>rating</code>,
          <code>imageUrl</code>, and <code>runtime</code> directly from the show, instead of storing just the
          <code>showId</code> and looking the rest up from TVMaze again later. This is called
          <strong>denormalization</strong>, and it's a deliberate, real tradeoff worth naming honestly: Firestore
          is not a relational database, and there is no cheap "join" operation to reconstruct a show's details
          from just an id at read time. Copying the fields you need, once, at write time, is the idiomatic
          Firestore pattern — and it has a genuine consequence: if TVMaze's data for a show changes later, your
          saved watchlist entry keeps showing the snapshot from when the user added it, not the live current
          version.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Is that "stale snapshot" consequence a bug, or is it actually the more honest behavior for a watchlist specifically?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — arguably the more honest choice, for this feature">
          <p>
            For a watchlist, a snapshot is arguably more correct, not less. "I added this show to my list" is
            a statement about a moment in time — what the show looked like, what it was rated, when the user
            decided to save it. If a show gets re-rated or renamed later, a user's watchlist entry silently
            changing underneath them, with no record of what they actually saved, would be a stranger
            experience than seeing a slightly stale rating with an "Added N days ago" timestamp explaining why.
            Denormalization is not automatically "wrong data" — it's a specific tradeoff that happens to fit a
            watchlist's actual semantics well. Whether it fits some <em>other</em> feature is a case-by-case
            question, not a rule.
          </p>
        </app-collapsible>

        <div class="warning-box">
          <strong>One more design decision to make now, not later:</strong> <code>addedAt</code> above is a
          plain ISO string, created with <code>new Date().toISOString()</code>. That's the simplest option and
          keeps today's code easy to reason about. Firestore also has a native <code>serverTimestamp()</code>
          function that lets the server itself stamp the write time — more precise, and immune to a client's
          clock being wrong. Today's build-along uses the simple string. If you want to try
          <code>serverTimestamp()</code> instead, it's a legitimate upgrade — just remember Day 18's lesson
          that a Firestore <code>Timestamp</code> needs <code>.toDate()</code> before a date pipe can touch it.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You have a <code>WatchlistDoc</code> interface written down before touching <code>WatchlistService</code>, and you can explain the denormalization tradeoff it makes in your own words, including why it fits a watchlist's actual meaning.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day19/start" class="btn-secondary">← Day 19 Starting Point</a>
        <a routerLink="/day19/act2" class="btn-primary">Act 2: Rebuilding WatchlistService — Create, Read, Delete →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'public surface (the contract)',
      plainEnglish: 'The small set of methods and signals a service exposes — everything else is free to change underneath it.',
      analogy: '🔌 A wall outlet — the plug shape is the contract; the wiring behind the wall can change freely.'
    },
    {
      concept: 'CRUD',
      plainEnglish: 'Create, Read, Update, Delete — the four operations behind nearly every data-backed feature.',
      analogy: '🗃️ A filing cabinet: file something new in, read a folder, update a page, pull a folder out for good.'
    },
    {
      concept: 'document shape',
      plainEnglish: 'The fields you deliberately decide a document should have, designed before you start writing them.',
      analogy: '📐 A blueprint drawn before the first brick is laid.'
    },
    {
      concept: 'denormalization',
      plainEnglish: 'Copying related data into a document instead of looking it up elsewhere at read time.',
      analogy: '🧳 Packing what you need for the trip instead of planning to buy it again at the destination.'
    }
  ];

  publicSurfaceCode = `// The whole public surface, since Day 9 -- nothing else is visible from outside.
watchlist: Signal<Show[]>
count: Signal<number>
has(id: number): boolean
add(show: Show): void
remove(id: number): void`;

  crudMapCode = `// CRUD verb  -> Firestore function   -> today's WatchlistService method
// Create     -> addDoc()             -> add(show)
// Read       -> collectionData()     -> the live "watchlist" signal (built Day 18)
// Update     -> updateDoc()          -> setNote(showId, note)
// Delete     -> deleteDoc()          -> remove(showId)`;

  watchlistDocCode = `// What lives in Firestore -- one document per watchlist entry.
interface WatchlistDoc {
  showId: number;      // the TVMaze id -- NOT the Firestore document id
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
  runtime: number;
  addedAt: string;      // ISO string for now -- see the note below on Timestamp
}`;
}
