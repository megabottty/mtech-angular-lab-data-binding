import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day19-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 19 · Act 3 of 3</span>
        <h1>✅ Update, Proving the Contract, and Debug It</h1>
        <p class="subtitle">The fourth verb, a two-browser-windows demo that earns real applause, and three bugs built from this exact day's own confusions.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Add <code>updateDoc</code> as the fourth CRUD verb, personally verify today's migration kept its promise, and diagnose three realistic bugs built from today's own core confusions.</li>
          <li><strong>Why It Matters:</strong> A migration you don't verify is just a hope. Today's demo — running the exact same app, watching it sync across two browser windows — is the actual proof the contract held, not a description of what should theoretically happen.</li>
          <li><strong>Build Steps:</strong> Add <code>setNote</code> with <code>updateDoc</code> → run the app and prove nothing broke, including a real multi-device demo → diagnose three bugs built from today's exact confusions.</li>
          <li><strong>Expected Outcome:</strong> All four CRUD verbs work against your real Firestore watchlist, you've personally watched two browser windows sync, and you can name which id is which on sight.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Update, Proving the Contract, and Debug It)</p>
        <p><strong>Next step:</strong> Student Lab — apply everything to notes, a watched toggle, and a solo reviews build.</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d19-act3-update-setnote" [stepNumber]="1" title="Update — updateDoc Merges, It Doesn't Replace">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          One rep of the fourth verb, so all four get touched today. <strong>Do this:</strong> add a small
          note field to watchlist entries:
        </p>

        <app-code-block lang="typescript" [code]="setNoteCode" />

        <p style="margin-top: 12px;">
          Wire a tiny inline text input on your Watchlist page, calling <code>setNote(showId, value)</code>
          on blur or on a save button click.
        </p>

        <div class="think-about-it">
          <p class="tai-q"><code>updateDoc(ref, &#123; note &#125;)</code> only mentions one field. Does this erase every other field already on that document — <code>name</code>, <code>rating</code>, <code>addedAt</code>, everything?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — no, updateDoc merges">
          <p>
            No — <code>updateDoc</code>'s entire job is to merge the fields you pass into the existing
            document, leaving every other field untouched. This is different from a hypothetical "replace the
            whole document" operation, which Firestore also has (<code>setDoc</code> without a merge option)
            but which is not what you want here. If <code>updateDoc</code> replaced instead of merged, adding
            a note would silently wipe out a document's <code>name</code>, <code>rating</code>, and every
            other field you didn't explicitly re-pass — a genuinely dangerous default for an operation named
            "update." Firestore's actual default behavior here is the safer one.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Typing a note on a watchlist entry and saving it persists in Firestore, and reloading the page still shows every other field on that document intact.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d19-act3-prove-contract" [stepNumber]="2" title="Prove the Contract — Including the Demo That Earns Applause">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Run your app normally: add shows from Browse, remove them from Watchlist, watch any nav badge that
          shows a count. Everything should work exactly as it did before today — and critically, you changed
          zero code in any component to make that true. That's the actual, hands-on proof Act 1's contract
          held, not a description of it.
        </p>

        <p style="margin-top: 12px;"><strong>Now the real demo:</strong> open your Firestore console next to
          your running app. Delete a watchlist document directly in the console. Watch it vanish from your
          app's UI with no refresh. Then open your app in a <em>second</em> browser window — add a show in
          one window, and watch it appear in the other, live.</p>

        <div class="info-box">
          <strong>Say this out loud, because you earned it:</strong> you've just built multi-device sync. Not
          a simplified version of it — the real thing, the same mechanism every collaborative app you've ever
          used relies on. Right now, in test mode, it works for literally anyone who can reach your project.
          Making it work correctly <em>per user</em> — so your watchlist and someone else's don't collide — is
          real, upcoming work once authentication and locked-down security rules enter the picture, but the
          realtime sync mechanism itself, the hard part, is exactly what you're looking at right now.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Why does the second-browser-window demo work with literally zero extra code, when multi-device sync sounds like it should be a hard problem?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — because both windows are just two subscribers to the same stream">
          <p>
            Each browser window runs its own completely independent instance of your Angular app, and each
            one calls <code>collectionData</code> against the exact same Firestore collection. Firestore
            doesn't know or care how many separate clients are subscribed to a collection — it just pushes
            every change to every currently-connected subscriber, the same way a radio station doesn't need
            special code for "supporting a second listener." The hard infrastructure problem — maintaining an
            open connection to every client and pushing changes reliably — is Firestore's job, already solved
            for you. Your only job was building one correct <code>collectionData</code>/<code>toSignal</code>
            read, and multi-device sync came along for free.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've personally watched a console deletion remove an item from your running app with no refresh, and watched an addition in one browser window appear in a second window live.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d19-act3-debug-three-bugs" [stepNumber]="3" title="Debug It — Three Bugs Built From Today's Own Confusions">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Here's a version of today's service with three separate mistakes, each one a realistic version of a
          confusion today's own material sets up. Try to spot all three before opening any answer.
        </p>

        <app-code-block lang="typescript" [code]="buggyServiceCode" />

        <app-collapsible icon="🧩" label="Bug 1 — the wrong id passed to doc()">
          <p>
            <code>remove(showId)</code> passes <code>showId</code> — a plain <code>number</code>, the TVMaze
            id — directly into <code>doc(firestore, 'watchlist', showId)</code>, where Firestore expects the
            document's own generated id, a <code>string</code>. This is the single most common confusion of
            the entire day, surfaced here on purpose: the operation either fails outright (no document exists
            with that id as its document id) or, if you happen to have a document that coincidentally has
            that exact string as its id, silently does the wrong thing. The fix is Act 2's lookup pattern:
            find the live item whose <code>showId</code> field matches, then use <em>its</em>
            <code>docId</code> to build the reference.
          </p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Bug 2 — writing the raw Show object instead of the explicit shape">
          <p>
            <code>addDoc(this.col, show)</code> writes whatever fields the <code>Show</code> interface
            happens to carry, verbatim — including a field literally named <code>id</code>, which now sits in
            Firestore under a confusing, misleading key right next to the <code>showId</code> naming
            convention the rest of this service uses. Any future field <code>Show</code> gains (or loses)
            silently changes what gets written, with no warning. This is exactly the "schema discipline in a
            schemaless world" point from Act 1: writing the explicit <code>WatchlistDoc</code> shape by hand,
            field by field, is the fix — slightly more typing, in exchange for a document shape that's
            intentional rather than accidental.
          </p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="Bug 3 — manually appending after addDoc">
          <p>
            <code>this.itemsLocal.update(list =&gt; [...list, show])</code> right after <code>addDoc</code>
            adds the show to a local array immediately — and then, a moment later, the live Firestore stream
            also delivers that exact same new document as a fresh emission, because the write really did
            happen and the read stream really did notice it. The result: the show appears twice, briefly or
            permanently depending on how the two lists are rendered. The fix is deleting that line entirely —
            not fixing it, deleting it. The whole lesson of Act 2 was that the stream is the sole source of
            truth; manually appending after a write is a leftover habit from the pre-Firestore version of this
            service, and it actively fights the mechanism you just built.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name all three bugs without opening the collapsibles, and you can explain, specifically, why bug 3's fix is deletion rather than a code change.</div>
      </app-lesson-step>

      <div class="info-box">
        <strong>Day 19 Acts complete.</strong> Your watchlist is now real, cloud-backed, multi-device data — and every component that used it before today still works, unchanged. Head to the Student Lab to apply the full pattern to notes, a watched toggle, and a Firestore-backed reviews feature built entirely solo.
      </div>

      <div class="nav-footer">
        <a routerLink="/day19/act2" class="btn-secondary">← Act 2: Rebuilding WatchlistService — Create, Read, Delete</a>
        <a routerLink="/day19/lab" class="btn-primary">Student Lab: Your Turn →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'updateDoc merges',
      plainEnglish: 'Only the fields you pass are changed; everything else on the document is left alone.',
      analogy: '✏️ Editing one line of a letter, not rewriting the whole page.'
    },
    {
      concept: 'the two ids',
      plainEnglish: 'showId (TVMaze\'s number) and docId (Firestore\'s generated string) are never interchangeable.',
      analogy: '🪪 A library card number versus the shelf location of one specific book — both real, never the same thing.'
    },
    {
      concept: 'no await, no catch',
      plainEnglish: 'A try/catch around an async call only works if you actually await the call inside it.',
      analogy: '🎣 A net that only catches something thrown while it\'s actually held open.'
    },
    {
      concept: 'the stream is the source of truth',
      plainEnglish: 'Once a write is followed by a live read, manually updating local state after the write creates duplicates.',
      analogy: '📣 Announcing news twice — once yourself, once when the official report also arrives.'
    }
  ];

  setNoteCode = `async setNote(showId: number, note: string) {
  const entry = this.items().find(d => d.showId === showId);
  if (!entry) return;
  await updateDoc(doc(this.firestore, 'watchlist', entry.docId), { note });
}`;

  buggyServiceCode = `async remove(showId: number) {
  await deleteDoc(doc(this.firestore, 'watchlist', showId));   // bug 1
}

async add(show: Show) {
  await addDoc(this.col, show);                                 // bug 2 (subtle)
  this.itemsLocal.update(list => [...list, show]);              // bug 3
}`;
}
