import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day20-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 20 · Act 3 of 3</span>
        <h1>🔐 Security Rules — Read Before You Write, and Debug It</h1>
        <p class="subtitle">Today you learn to read the lock on your own database. You don't touch it yet.</p>
      </div>

      <div class="warning-box">
        <strong>No deploy today.</strong> This act is reading comprehension only. You will look at rule
        syntax, translate it into plain English, and understand the shape of tomorrow's real lockdown — you
        will not write or deploy any rule changes. Every collection your app touches stays exactly as open
        as it is right now.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://firebase.google.com/docs/firestore/security/get-started" target="_blank" rel="noopener">Firestore → Security rules</a> — read this before writing rules — the syntax is small but unforgiving.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Read and translate Firestore security rules syntax, understand what today's test-mode rule actually allows, and see the shape of the <code>request.auth</code>/<code>resource.data</code> rules that will replace it.</li>
          <li><strong>Why It Matters:</strong> Every Firestore project you've built so far has been wide open — anyone with your project's config, not just your app, can read and write every document. That's fine for a classroom project with a 30-day clock on it. It is never fine for anything real.</li>
          <li><strong>Build Steps:</strong> Read the rule you're already living under → read the rule shape that will eventually replace it → fix two realistic bugs in the query code you built in Acts 1-2.</li>
          <li><strong>Expected Outcome:</strong> You can read a Firestore rules file and state, correctly, what it does and doesn't allow — without needing to deploy anything to find out.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Security Rules: Read Before You Write, and Debug It)</p>
        <p><strong>Next step:</strong> Day 20 Lab</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d20-act3-read-test-mode-rule" [stepNumber]="1" title="Reading the Rule You're Already Living Under">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Open your Firebase console, find <strong>Firestore Database → Rules</strong>, and read what's
          actually there. If you set your project up in test mode on Day 18, it looks like this:
        </p>

        <app-code-block lang="typescript" [code]="testModeRuleCode" />

        <p style="margin-top: 12px;"><strong>Do this:</strong> translate it into plain English, line by line, out loud or in writing.</p>

        <div class="think-about-it">
          <p class="tai-q">What does this rule actually allow, and who can do it?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — anyone, for a limited time, no exceptions">
          <p>
            <code>match /&#123;document=**&#125;</code> means "every document in every collection, at any depth."
            <code>allow read, write: if request.time &lt; timestamp.date(...)</code> means "allow every read
            and every write" — no check on who's asking, no check on what they're writing — <em>as long as
            the current time is before this hard-coded date</em>. Test mode isn't "no rules." It's "every
            rule passes, until a specific day, and then every single one fails at once." That expiry date is
            exactly 30 days from when you created the project on Day 18 — worth checking right now whether
            yours is coming up soon.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've read your own project's actual rule in the console and can state, correctly, both what it allows and when it stops allowing it.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d20-act3-destination-rule" [stepNumber]="2" title="The Shape of Tomorrow's Rule">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>Now read the shape of the rule that will eventually replace it — not something you'll deploy today, just something to recognize:</p>

        <app-code-block lang="typescript" [code]="destinationRuleCode" />

        <div class="think-about-it">
          <p class="tai-q">Translate <code>request.auth != null</code> and <code>request.auth.uid == resource.data.ownerId</code> into plain English. Where would <code>ownerId</code> have to come from for that second line to ever be true?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — signed in, and only your own documents">
          <p>
            <code>request.auth != null</code> means "reject this request unless someone is actually signed
            in" — anonymous access is gone entirely. <code>request.auth.uid == resource.data.ownerId</code>
            means "and even if you're signed in, you may only touch a watchlist document if the
            <code>ownerId</code> field stored on that specific document matches your own signed-in user id."
            For that comparison to ever succeed, every document would need an <code>ownerId</code> field
            written at create time — a field nothing in today's schema has yet. That's the real lesson: rules
            like this aren't just a config change, they're a schema requirement that has to be designed in
            before the rule can enforce it.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can read <code>request.auth</code> and <code>resource.data</code> checks and explain what schema change would be required before either one could actually be enforced.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d20-act3-debug-bug1" [stepNumber]="3" title="Debug It — The Query That Goes Stale">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>
          Here's a version of <code>ReviewsService.forShow()</code> that reads a <code>showId</code> signal
          instead of a plain number, meant to re-run whenever the current show changes:
        </p>

        <app-code-block lang="typescript" [code]="staleQueryBugCode" />

        <p style="margin-top: 12px;">
          Navigate from one show's detail page to another's. <strong>Bug:</strong> the reviews list doesn't
          update — it keeps showing the first show's reviews forever.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why doesn't changing showId() rebuild the query? Where have you fixed a bug shaped exactly like this before?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — query() only ever runs once; wire it like Day 16's switchMap">
          <p>
            <code>query()</code> is not reactive — it's a plain function call that reads
            <code>showId()</code>'s value once, at the moment <code>forShow</code> executes, and builds one
            fixed query object from it. Nothing about a Firestore query re-runs when a signal it happened to
            read earlier changes; there's no dependency tracking here, unlike inside a <code>computed()</code>.
            This is exactly the "input changes, I need a brand-new async source" shape from
            <strong>Day 16's <code>switchMap</code></strong> lesson — a search box's text changing needed to
            cancel the old HTTP request and start a new one. The fix here is the same pattern, just with
            Firestore's observable instead of an HTTP call:
          </p>
        </app-collapsible>

        <app-code-block lang="typescript" [code]="fixedQueryCode" />

        <p style="margin-top: 12px;">
          <code>toObservable(showId)</code> turns the signal back into a stream of values;
          <code>switchMap</code> rebuilds and re-subscribes to a brand-new query every time that stream emits
          a new id, cancelling the previous subscription first — the exact mechanism Day 16 taught, now
          reused for a completely different async source.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A reactive-friendly version of <code>forShow</code> that correctly rebuilds its query when the input signal changes, using <code>toObservable</code> + <code>switchMap</code> — and you can explain in one sentence why plain <code>query()</code> couldn't do this on its own.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d20-act3-debug-bug2" [stepNumber]="4" title="Debug It — limit('10')">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>One more, much smaller bug — someone wrote this:</p>

        <app-code-block lang="typescript" [code]="limitStringBugCode" />

        <div class="think-about-it">
          <p class="tai-q">What happens when you try to build this? Who catches this bug, and how fast?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the compiler, before you ever run the app">
          <p>
            <code>limit()</code>'s parameter is typed as <code>number</code>, and <code>'10'</code> is a
            <code>string</code> — TypeScript rejects this at compile time with a clear type error, long
            before it could become a runtime bug that only shows up once real data is large enough to
            matter. This is the payoff of typed Firestore helpers over hand-written JSON queries: an entire
            category of "silently wrong at scale" bugs becomes an immediate, specific compiler error instead.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain why this particular bug can never reach production in this codebase, and name exactly what catches it.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day20/act2" class="btn-secondary">← Act 2: The Index Moment, and Query vs. Computed</a>
        <a routerLink="/day20/lab" class="btn-primary">Day 20 Lab →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'security rules',
      plainEnglish: 'Server-enforced permission checks that run on every read and write, independent of your app\'s own code.',
      analogy: '🛂 A checkpoint that checks every request, even ones your app itself never intended to allow.'
    },
    {
      concept: 'test mode',
      plainEnglish: 'A rule that allows everything, unconditionally, until a hard-coded expiry date.',
      analogy: '🎫 A backstage pass that works on any door -- for exactly 30 days.'
    },
    {
      concept: 'request.auth / resource.data',
      plainEnglish: 'The two pieces of information a real rule checks: who\'s asking, and what\'s already stored on the document.',
      analogy: '🪪 Checking an ID against a guest list, not just checking that some ID exists.'
    }
  ];

  testModeRuleCode = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 9, 27);
    }
  }
}`;

  destinationRuleCode = `match /watchlist/{docId} {
  allow read, write: if request.auth != null
                      && request.auth.uid == resource.data.ownerId;
}`;

  staleQueryBugCode = `// Doesn't update when showId() changes:
forShow(showId: () => number) {
  const q = query(
    collection(this.firestore, 'reviews'),
    where('showId', '==', showId()),   // read once, right now
    orderBy('createdAt', 'desc'),
  );
  return toSignal(collectionData(q) as Observable<Review[]>, { initialValue: [] });
}`;

  fixedQueryCode = `import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

forShow(showId: Signal<number>) {
  return toSignal(
    toObservable(showId).pipe(
      switchMap(id => collectionData(
        query(
          collection(this.firestore, 'reviews'),
          where('showId', '==', id),
          orderBy('createdAt', 'desc'),
        )
      ) as Observable<Review[]>)
    ),
    { initialValue: [] }
  );
}`;

  limitStringBugCode = `const q = query(
  collection(this.firestore, 'reviews'),
  where('showId', '==', showId),
  orderBy('createdAt', 'desc'),
  limit('10'),   // Argument of type 'string' is not assignable to parameter of type 'number'
);`;
}
