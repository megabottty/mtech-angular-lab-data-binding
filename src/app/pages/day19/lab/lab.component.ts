import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day19-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Watched Toggles, and Reviews Built Solo</h1>
        <p class="subtitle">
          About 55 minutes. 4 tasks. Extend the watchlist migration, then build a brand-new
          Firestore-backed feature entirely on your own.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Get the end-of-Day-19-Acts BingeBoard working before starting — all four CRUD verbs against a
          real <code>watchlist</code> collection, verified with the two-browser-windows demo. If that isn't
          working yet, finish Act 3 first — this lab has no separate scaffolding of its own to fall back on.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Extend today's migration with a new field touching all four layers, then build an entirely new
            Firestore-backed feature solo, from a public surface you design yourself.
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Today's build-along showed you one full migration. This lab is where the pattern becomes
            something you can reach for on a feature that never existed before, not just repeat on one that
            already did.
          </li>
          <li>
            <strong>Build Steps:</strong>
            a watched toggle → reviews built from scratch, solo → an "added N days ago" integration → stretch:
            optimistic UX around a real async write.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            You can design a document shape and a service surface for a feature that doesn't exist yet, not
            just migrate one that already had a shape.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 19 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> Task 1 is about 15 minutes. Task 2 is the big one — budget 20-25 minutes, it's today's full solo rep. Task 3 is about 10 minutes. Task 4 is a stretch; skip it if you're short on time.</p>
      </section>

      <app-lesson-step
        stepId="d19-lab-watched-toggle"
        [stepNumber]="'Task 1'"
        title="Watched Toggle, Cloud Edition"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>updateDoc</code> on a boolean field, a derived <code>computed()</code> count, all four layers touched.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Each watchlist entry gets a <code>watched: boolean</code> field, defaulting to <code>false</code>
          on creation. Add a checkbox on the Watchlist page that toggles it, persisted through
          <code>updateDoc</code>. Then add a computed showing "3 of 7 watched" style progress above the list.
        </p>
        <p style="margin-top: 12px;">
          This task deliberately touches every layer of today's pattern at once: the template checkbox calls
          a service method, the service method calls <code>updateDoc</code>, Firestore's server updates the
          document, the live stream notices, the signal updates, and the template re-renders — with you
          writing code at only two of those six steps.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Should the "3 of 7 watched" count be a new Firestore query, or something else entirely?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a computed() over data you already have">
          <p>
            A new query would be genuinely wasteful here — you already have every watchlist item, with its
            real <code>watched</code> value, sitting in the same live signal you built in Act 2. Counting how
            many have <code>watched === true</code> is a synchronous derivation over data already in memory,
            exactly the job <code>computed()</code> exists for. Reaching for a database round-trip to answer a
            question you can already answer from state you're holding is a real, common overcorrection once
            "the database is realtime" starts to feel like the answer to everything — it isn't always.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add <code>watched: false</code> to the object <code>add()</code> writes with <code>addDoc</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add a <code>toggleWatched(showId: number)</code> method using <code>updateDoc</code>, flipping the current value.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Add a checkbox on the Watchlist page bound to each entry's <code>watched</code> state.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Add a <code>computed()</code> counting watched entries, and render "N of M watched" above the list.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Checking a watchlist entry's box persists in Firestore, the
          "N of M watched" count updates immediately, and reloading the page shows the checkbox states
          exactly as you left them.
        </div>

        <app-collapsible icon="💡" label="Hint — flipping a boolean you already have">
          <app-code-block lang="typescript" [code]="task1Hint" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d19-lab-reviews-solo"
        [stepNumber]="'Task 2'"
        title="Reviews — Built From Scratch, Firestore-Backed From Day One"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: designing a service surface before its internals, a brand-new collection, full solo rep of today's whole pattern.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A <code>ReviewsService</code> that never existed before today — there's no prior version to
          migrate, so this is the pattern applied to something genuinely new, which is arguably the more
          valuable rep. Design the public surface first, on paper or in a comment, before writing any
          internals: something like <code>forShow(showId: number): Signal&lt;Review[]&gt;</code> and
          <code>add(showId: number, text: string): Promise&lt;void&gt;</code>.
        </p>
        <p style="margin-top: 12px;">
          Back the whole thing with a <code>reviews</code> collection from the start. Keep <code>showId</code>
          as a real field on every document — you don't need to query by it yet, but a future day's queries
          will want something to filter on, and designing that in now costs nothing.
        </p>

        <div class="think-about-it">
          <p class="tai-q"><code>forShow(showId)</code> needs to return only the reviews for one specific show, but you only know how to read a whole collection so far. What's the honest, simplest thing to build today, even if it's not the most efficient?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — read everything, filter client-side, for now">
          <p>
            The simplest correct approach today: read the entire <code>reviews</code> collection live (the
            exact pattern from Day 18 and this morning), then use a <code>computed()</code> that filters down
            to just the reviews matching a given <code>showId</code>. This is honestly not the most efficient
            approach at scale — a real production app would use <code>query()</code> with a
            <code>where()</code> clause to ask Firestore to filter server-side, the same tradeoff Day 18's
            lab raised for sorting. That's legitimate future work, not a mistake to fix today. Naming the
            limitation honestly, rather than either pretending it's fine forever or blocking yourself from
            shipping until you've learned an API you haven't met yet, is itself the professional move.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Write the public surface as a comment or interface first: <code>forShow(showId)</code>, <code>add(showId, text)</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Define a minimal <code>Review</code> document shape: <code>showId</code>, <code>text</code>, <code>postedAt</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Build the live read (all reviews) and a <code>computed()</code> filter by <code>showId</code> for <code>forShow()</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Build <code>add()</code> with <code>addDoc</code>, and wire a small review form on the Show Detail page.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Submitting a review on a show's detail page creates a real
          Firestore document, and that show's page shows its own reviews live — with zero worked example
          copied, because none existed for this feature before today.
        </div>

        <app-collapsible icon="💡" label="Hint — the shape of forShow() as a computed filter">
          <app-code-block lang="typescript" [code]="task2Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <p>One complete, reasonable shape — yours doesn't need to match exactly.</p>
          <app-code-block lang="typescript" [code]="task2Answer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d19-lab-added-when"
        [stepNumber]="'Task 3'"
        title="Added-When — Yesterday's Pipe Meets Today's Field"
      >
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: reusing an existing pipe against new data, a small real integration payoff.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Render "Added 3 days ago" on each watchlist entry, using Day 17's <code>timeAgo</code> pipe against
          the <code>addedAt</code> field you designed in Act 1.
        </p>

        <div class="think-about-it">
          <p class="tai-q"><code>addedAt</code> is a plain ISO string today, not a Firestore <code>Timestamp</code>. Does <code>timeAgo</code> need any changes to handle it?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — no, and here's exactly why">
          <p>
            No changes needed. Day 17's <code>timeAgo</code> pipe was written to accept
            <code>string | Date | null | undefined</code> and immediately does <code>new Date(value)</code>
            internally — a plain ISO string is one of the exact input shapes it already handles. This is the
            payoff of typing a pipe's input honestly back on Day 17 instead of narrowly: a pipe built two days
            ago, for a feature that didn't exist yet, works today with zero modification. That's not luck —
            it's what a well-typed, narrowly-scoped-to-its-actual-job pipe is supposed to do.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Import <code>TimeAgoPipe</code> into your Watchlist page component.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Render <code>{{ "Added {{ entry.addedAt | timeAgo }}" }}</code> on each entry.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every watchlist entry shows "Added N days ago" (or "just now"
          for something you added moments earlier), using a pipe you wrote two days before this feature
          existed.
        </div>
      </app-lesson-step>

      <app-lesson-step
        stepId="d19-lab-stretch-optimistic-ux"
        [stepNumber]="'Task 4 (Stretch)'"
        title="Optimistic UX Around a Real Async Write"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: pending state around an async call, try/catch around await, surfacing a real failure to the user.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          <code>add()</code> is async — on a slow connection, there's a real, visible gap between clicking
          "Add to Watchlist" and the write actually landing. Give the button a brief pending state (disabled,
          showing "Adding…") for the duration of that gap, and handle the case where the write fails.
        </p>

        <div class="think-about-it">
          <p class="tai-q">A classmate's try/catch around <code>add()</code> never catches anything, even when they force a failure by going offline. What's the most likely mistake?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — no await, no catch">
          <p>
            The most common cause: calling <code>this.watchlistSvc.add(show)</code> without <code>await</code>
            in front of it, inside a <code>try</code> block. Without <code>await</code>, the calling code
            doesn't wait for the promise to settle — it moves on immediately, and if the promise later
            rejects, that rejection has nowhere synchronous to be caught, since the <code>try/catch</code>
            already finished running. The one-sentence rule worth memorizing: no <code>await</code>, no
            <code>catch</code>. Any async call you want error handling around has to be awaited inside the
            <code>try</code>, not just invoked.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a <code>pending = signal(false)</code> (or a per-show pending set) to the component calling <code>add()</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Set it true before the <code>await</code>, false in a <code>finally</code> block after.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Wrap the <code>await</code> in <code>try/catch</code>, and show a real message on failure — test it by going offline.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">4</span>
            <span>Disable the button and show "Adding…" while <code>pending()</code> is true.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Clicking "Add to Watchlist" on a throttled connection visibly
          shows "Adding…" until the write resolves; forcing a failure (offline) shows a real error message
          instead of silently doing nothing.
        </div>

        <app-collapsible icon="💡" label="Hint — the try/finally shape">
          <app-code-block lang="typescript" [code]="task4Hint" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day19/act3" class="btn-secondary">← Act 3: Update, Proving the Contract, and Debug It</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Watchlist and reviews both live in Firestore — no <code>localStorage</code> code left anywhere</li>
          <li><span class="checkbox">✅</span> You've personally demoed two-browser-windows realtime sync</li>
          <li><span class="checkbox">✅</span> You can name which id is which (<code>showId</code> vs. Firestore's <code>docId</code>) instantly, on sight</li>
          <li><span class="checkbox">✅</span> You can explain why writes never touch the read signal directly</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 19: Firebase II. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Migrate a service's internals to Firestore while keeping its public surface identical.</li>
          <li>✅ Use all four CRUD verbs: addDoc, the collectionData stream, updateDoc, and deleteDoc.</li>
          <li>✅ Address one document with doc(), and keep two different kinds of id straight.</li>
          <li>✅ Trust the read stream as the sole source of truth after a write, with no manual signal updates.</li>
          <li>✅ Design a document shape and a service surface for a feature that never existed before.</li>
        </ul>
        <a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a>
      </div>
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
      color: #c3e88d;
    }
  `]
})
export class Day19LabComponent {
  task1Hint = `async toggleWatched(showId: number) {
  const entry = this.items().find(d => d.showId === showId);
  if (!entry) return;
  await updateDoc(doc(this.firestore, 'watchlist', entry.docId), {
    watched: !entry.watched,
  });
}

watchedCount = computed(() => this.items().filter(d => d.watched).length);`;

  task2Hint = `interface Review {
  id: string;      // Firestore's generated id -- fine to call it 'id' here,
                    // there's no competing TVMaze id on THIS document.
  showId: number;
  text: string;
  postedAt: string;
}

private allReviews = toSignal(
  collectionData(collection(this.firestore, 'reviews'), { idField: 'id' }) as Observable<Review[]>,
  { initialValue: [] }
);

forShow(showId: number) {
  return computed(() => this.allReviews().filter(r => r.showId === showId));
}`;

  task2Answer = `import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Review {
  id: string;
  showId: number;
  text: string;
  postedAt: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'reviews');

  private allReviews = toSignal(
    collectionData(this.col, { idField: 'id' }) as Observable<Review[]>,
    { initialValue: [] }
  );

  forShow(showId: number) {
    return computed(() => this.allReviews().filter(r => r.showId === showId));
  }

  async add(showId: number, text: string) {
    await addDoc(this.col, {
      showId,
      text,
      postedAt: new Date().toISOString(),
    });
  }
}`;

  task4Hint = `pending = signal(false);
error = signal<string | null>(null);

async onAddClick(show: Show) {
  this.pending.set(true);
  this.error.set(null);
  try {
    await this.watchlistSvc.add(show);
  } catch {
    this.error.set('Could not add to watchlist -- check your connection.');
  } finally {
    this.pending.set(false);
  }
}`;
}
