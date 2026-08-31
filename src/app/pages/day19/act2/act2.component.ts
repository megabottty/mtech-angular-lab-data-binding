import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day19-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 19 · Act 2 of 3</span>
        <h1>🔧 Rebuilding WatchlistService: Create, Read, Delete</h1>
        <p class="subtitle">Same public surface, entirely new internals — and the moment you stop manually updating a signal after a write.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong> AngularFire's
        <a href="https://github.com/angular/angularfire/blob/main/docs/firestore/documents.md#adding-documents" target="_blank" rel="noopener">adding and deleting documents</a>
        section.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Rebuild <code>WatchlistService</code>'s internals against Firestore — a live read mapped back to <code>Show</code>, <code>addDoc</code> for creation, <code>doc()</code> + <code>deleteDoc</code> for deletion — while keeping the exact public surface from Act 1.</li>
          <li><strong>Why It Matters:</strong> This is the real migration. Everything from Act 1 was preparation; this is where the promise either holds or doesn't.</li>
          <li><strong>Build Steps:</strong> Build the live <code>items</code> signal and map it back to <code>Show</code> → add <code>addDoc</code>-based creation, keeping the no-duplicates rule → add <code>doc()</code>-addressed deletion.</li>
          <li><strong>Expected Outcome:</strong> Your watchlist reads and writes real Firestore documents, every existing consumer of <code>WatchlistService</code> still compiles and works unchanged, and you can explain why nothing in <code>add()</code> or <code>remove()</code> ever calls <code>.set()</code> on the read signal.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Rebuilding WatchlistService: Create, Read, Delete)</p>
        <p><strong>Next step:</strong> Act 3 (Update, Proving the Contract, and Debug It)</p>
        <p><strong>Time:</strong> About 30 minutes. This is the conceptual heart of the day — go slowly.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d19-act2-read-computed" [stepNumber]="1" title="Read — a Live Signal, Mapped Back to Show">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Start with the read side, exactly like Day 18's <code>FeaturedService</code>: a live collection,
          bridged into a signal. The difference today is what happens next — you map the raw
          <code>WatchlistDoc[]</code> back into the plain <code>Show[]</code> shape the rest of the app has
          always expected.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> start rebuilding <code>WatchlistService</code>:</p>

        <app-code-block lang="typescript" [code]="readComputedCode" />

        <p style="margin-top: 12px;">
          That <code>computed()</code> is the entire mechanism that makes "same public surface" literally
          true rather than just a nice idea. Every consumer calling <code>watchlist()</code> still gets back
          exactly the <code>Show[]</code> shape it always did — the fact that the data now travels through a
          Firestore document with extra fields (<code>addedAt</code>, and soon <code>docId</code>) is
          invisible on the other side of that mapping.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why does <code>idField</code> here say <code>'docId'</code> instead of <code>'id'</code>, the way Day 18's <code>FeaturedService</code> did?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — naming the two ids differently on purpose">
          <p>
            <code>WatchlistDoc</code> already has a field meaningfully named <code>showId</code> — the TVMaze
            id. If <code>idField</code> also produced a property called <code>id</code>, you would end up
            with two completely different kinds of id sitting on the same object under confusingly similar
            names, and it would become very easy to reach for the wrong one. Naming the Firestore-generated
            id <code>docId</code> instead makes the distinction visible everywhere you read it:
            <code>showId</code> is always the TVMaze id, <code>docId</code> is always the Firestore document
            id. This single naming choice is worth remembering for the rest of the day — it's the exact fix
            for the "two ids" confusion Act 3's Debug It surfaces deliberately.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>watchlist()</code> and <code>count()</code> compile against the new internals with no changes anywhere else in the app, and you can explain in one sentence why the <code>computed()</code> mapping is what makes that true.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d19-act2-add-create" [stepNumber]="2" title="Create — addDoc, and Where the No-Duplicates Rule Lives Now">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> add the create method:</p>

        <app-code-block lang="typescript" [code]="addCreateCode" />

        <p style="margin-top: 12px;">
          Notice the very first line is unchanged from the old <code>localStorage</code> version: check
          <code>has(show.id)</code> and bail out early if it's already there. The no-duplicates rule was
          never a property of <code>localStorage</code> — it was always business logic that happened to live
          in this service. Storage changed today; the rule didn't move, because it was never storage's job in
          the first place.
        </p>

        <div class="info-box">
          <strong>Two async models, both already familiar:</strong> reading is a <em>stream</em> —
          <code>collectionData</code> keeps pushing new values forever, and you already know this shape from
          every Observable you've built since Day 15. Writing is a <em>one-shot promise</em> —
          <code>addDoc</code> resolves once, when the write finishes, exactly like every <code>HttpClient</code>
          POST you've ever awaited. Today doesn't introduce a new async model; it just points two models you
          already own at the same collection.
        </div>

        <div class="think-about-it">
          <p class="tai-q">After <code>await addDoc(this.col, &#123; ... &#125;)</code> resolves, what makes the new show actually show up in <code>watchlist()</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — nothing you wrote, and that's the point">
          <p>
            Nothing in <code>add()</code> touches the read signal at all — there is no
            <code>this.items.update(...)</code> anywhere in this method, on purpose. The sequence is: your
            write reaches Firestore's server, Firestore's server notices the <code>watchlist</code>
            collection changed, and it pushes that change down the exact same live connection
            <code>collectionData</code> already opened in Step 1. The stream you built for reading is what
            notices the write — the loop closes itself. If you find yourself reaching for
            <code>this.items.update(...)</code> anywhere after a write today, stop and delete it; that
            instinct is exactly the muscle memory this act exists to retrain.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Adding a show from Browse creates a real document in your Firestore console, and it appears in <code>watchlist()</code> with zero code in <code>add()</code> that touches the read signal directly.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d19-act2-remove-delete" [stepNumber]="3" title="Delete — Addressing One Document with doc()">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Deleting is where the two-id distinction from Step 1 becomes unavoidable. <code>deleteDoc</code>
          needs a reference to one specific document, built with <code>doc(firestore, collectionName,
          documentId)</code> — and the id it wants is the Firestore-generated <code>docId</code>, not the
          TVMaze <code>showId</code> every caller of <code>remove()</code> actually has.
        </p>

        <p style="margin-top: 12px;"><strong>Do this:</strong> add the delete method:</p>

        <app-code-block lang="typescript" [code]="removeDeleteCode" />

        <div class="think-about-it">
          <p class="tai-q">Why does <code>remove()</code> have to look <code>entry.docId</code> up from <code>this.items()</code> instead of just being handed it directly?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — because the contract from Act 1 only ever promised showId">
          <p>
            Every existing caller of <code>remove(id)</code> — the Watchlist page's remove button, a show
            card's toggle — was written against Act 1's contract, which only ever exposed the TVMaze
            <code>showId</code>, never a Firestore document id. Changing <code>remove()</code>'s signature to
            demand a <code>docId</code> instead would break that contract and force every caller to change —
            exactly what today's entire migration exists to avoid. So the lookup happens inside the service:
            find the one live item whose <code>showId</code> matches, read its <code>docId</code> off that
            object, and build the document reference from that. The caller never needs to know a
            <code>docId</code> exists at all.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Removing a show from Watchlist deletes the real document in Firestore, and you can explain exactly why <code>remove()</code> takes a <code>showId</code> and still manages to find the right document to delete.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day19/act1" class="btn-secondary">← Act 1: The Contract, and the Document Shape</a>
        <a routerLink="/day19/act3" class="btn-primary">Act 3: Update, Proving the Contract, and Debug It →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'reads are a stream',
      plainEnglish: 'collectionData keeps emitting forever — the same Observable model you already own from Day 15.',
      analogy: '📺 A channel that keeps broadcasting as long as you\'re tuned in.'
    },
    {
      concept: 'writes are one-shot promises',
      plainEnglish: 'addDoc/deleteDoc/updateDoc each resolve once, exactly like an HttpClient POST you already await.',
      analogy: '📮 Mailing a letter — one action, one confirmation it was sent.'
    },
    {
      concept: 'doc() addresses one record',
      plainEnglish: 'doc(db, collectionName, id) builds a reference to exactly one document, the unit update/delete work on.',
      analogy: '🏠 A single street address, not the whole neighborhood.'
    },
    {
      concept: 'the write closes its own loop',
      plainEnglish: 'A successful write is noticed by the read stream automatically — no manual signal update needed.',
      analogy: '🔁 Dropping a stone in a pond you\'re already watching — you don\'t have to announce the ripple yourself.'
    }
  ];

  readComputedCode = `import {
  Firestore, collection, collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'watchlist');

  // R -- a live stream of the collection, landed as a signal.
  // idField: 'docId' -- NOT 'id' -- see the Think About It below.
  private items = toSignal(
    collectionData(this.col, { idField: 'docId' }) as Observable<(WatchlistDoc & { docId: string })[]>,
    { initialValue: [] }
  );

  // Public surface -- unchanged shape from Act 1's contract.
  readonly watchlist = computed(() =>
    this.items().map(d => ({
      id: d.showId, name: d.name, genre: d.genre,
      rating: d.rating, imageUrl: d.imageUrl, runtime: d.runtime,
    } satisfies Show))
  );
  readonly count = computed(() => this.items().length);

  has(id: number) {
    return this.items().some(d => d.showId === id);
  }
}`;

  addCreateCode = `// C
async add(show: Show) {
  if (this.has(show.id)) return;                 // the rule stayed -- only the storage moved
  await addDoc(this.col, {
    showId: show.id, name: show.name, genre: show.genre,
    rating: show.rating, imageUrl: show.imageUrl,
    runtime: show.runtime ?? 0,
    addedAt: new Date().toISOString(),
  });
  // Nothing here touches this.items. The write closes its own loop.
}`;

  removeDeleteCode = `// D -- we need the Firestore document id, so look it up from the live signal.
async remove(showId: number) {
  const entry = this.items().find(d => d.showId === showId);
  if (!entry) return;
  await deleteDoc(doc(this.firestore, 'watchlist', entry.docId));
}`;
}
