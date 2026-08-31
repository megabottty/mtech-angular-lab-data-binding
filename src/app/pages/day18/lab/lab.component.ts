import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day18-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — A Second Collection, Solo</h1>
        <p class="subtitle">
          About 45 minutes. 4 tasks. Prove today's pattern by rebuilding it yourself, against a brand-new
          collection, with no worked example open in front of you.
        </p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Get the end-of-Day-18-Acts BingeBoard working before starting — your own Firebase project with
          Firestore enabled, AngularFire wired in, and "Shows of the week" rendering real, live data on Home.
          If that isn't working yet, finish Act 3 first — this lab has no separate scaffolding of its own to
          fall back on.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li>
            <strong>Learning Goal:</strong>
            Independently repeat today's full pattern — console data entry, a service, a live template —
            against a new collection with a genuinely new wrinkle (a timestamp field).
          </li>
          <li>
            <strong>Why It Matters:</strong>
            Every real feature you'll build for the rest of this course is a variation on exactly this
            pattern. Today's build-along showed you the moves once; this lab is where they become reflexes.
          </li>
          <li>
            <strong>Build Steps:</strong>
            console fluency with real messy data → a second collection built solo → sorted display →
            stretch: a realtime "just updated" flash.
          </li>
          <li>
            <strong>Expected Outcome:</strong>
            You can build the reference/stream/signal pattern against a collection you've never worked with
            before, without a worked example to copy from.
          </li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 18 capstone)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> Task 1 is about 5 minutes. Task 2 is the big one — budget 20 minutes, it's today's full solo rep. Task 3 is about 10 minutes. Task 4 is a stretch; skip it if you're short on time.</p>
      </section>

      <app-lesson-step
        stepId="d18-lab-console-fluency"
        [stepNumber]="'Task 1'"
        title="Console Fluency, With Real Messy Data"
      >
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: schemaless data in practice, defensive template rendering.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add three more documents to <code>shows-of-the-week</code> directly in the console. For one of
          them, deliberately leave out the <code>blurb</code> field entirely — don't add it, don't set it to
          an empty string, just skip it. Then make your template survive that document gracefully instead of
          rendering a blank gap or the literal word "undefined."
        </p>

        <div class="think-about-it">
          <p class="tai-q">You already solved almost exactly this problem before — where, and what was the pattern?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the same guard as Day 13's runtime badge">
          <p>Day 13's lab had you hide a show card's runtime badge entirely when <code>runtime</code> was falsy, rather than showing a meaningless <code>~0 min/ep</code>. The exact same instinct applies here: guard the <code>blurb</code> paragraph with <code>&#64;if (s.blurb)</code> so a document missing that field simply shows no blurb line at all, instead of rendering nothing useful or a raw "undefined." Schemaless data means this kind of guard isn't defensive paranoia — it's a real, expected case you will hit constantly once other people (or your own future self) are creating documents by hand.</p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add three more documents to <code>shows-of-the-week</code> in the console.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>For one of them, leave the <code>blurb</code> field out entirely.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Guard the template so that document renders its name with no blurb line, not a blank gap or literal "undefined."</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Your Home page shows five "shows of the week" total, and the
          one with no <code>blurb</code> renders cleanly with just its name — no visual glitch, no literal
          "undefined" text anywhere.
        </div>
      </app-lesson-step>

      <app-lesson-step
        stepId="d18-lab-announcements-solo"
        [stepNumber]="'Task 2'"
        title="Announcements — A Second Collection, Fully Solo"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: repeating today's full pattern independently, Firestore Timestamp objects, the date pipe.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A brand-new <code>announcements</code> collection and a banner in your app's shell that displays
          it — the full pattern from today's build-along, repeated with no worked example open. In the
          console, create <code>announcements</code> with a few documents, each with a <code>message</code>
          (string) and a <code>postedAt</code> field — use Firestore's native <strong>timestamp</strong> type
          for <code>postedAt</code>, not a plain string.
        </p>
        <p style="margin-top: 12px;">
          Build an <code>AnnouncementsService</code> mirroring <code>FeaturedService</code>'s exact shape,
          then render a banner in your app shell — the component that wraps every page — showing each
          announcement's message and posted date.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Try rendering <code>postedAt</code> straight through the <code>date</code> pipe from Day 17, the way you would any other timestamp. What actually happens?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a real error, and what it's telling you">
          <p>
            You'll get a runtime error from the <code>date</code> pipe — something to the effect of it
            receiving a value it doesn't recognize as a date. That error is precise and worth reading
            carefully rather than pattern-matching past: a Firestore <strong>timestamp</strong> field does
            not arrive in your code as a JavaScript <code>Date</code> object. It arrives as a
            <code>Timestamp</code> instance — Firestore's own wrapper type — and Angular's <code>date</code>
            pipe only knows how to format real <code>Date</code> objects (or ISO strings, or numbers). The
            fix is one method call: <code>postedAt.toDate()</code> converts the Firestore
            <code>Timestamp</code> into a genuine JavaScript <code>Date</code>, and <em>that</em> is what you
            hand to the <code>date</code> pipe. This is exactly the kind of "the type looked like what I
            expected, but the runtime object underneath was different" trap that made typing your
            <code>FeaturedShow</code> data valuable in Act 3's Debug It — the same discipline applies here.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Create <code>announcements</code> in the console with a few documents: <code>message</code> (string), <code>postedAt</code> (timestamp).</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Build <code>AnnouncementsService</code>, mirroring <code>FeaturedService</code>'s <code>collection()</code>/<code>collectionData()</code>/<code>toSignal()</code>/<code>idField</code> shape exactly.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Render a banner in your app shell showing each announcement's message and its <code>postedAt.toDate()</code> value through the <code>date</code> pipe.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Every page of your app shows a banner listing real
          announcement messages with real, correctly-formatted dates — built with zero worked example open,
          from the pattern you now own. You can explain, from having hit the error yourself, why Firestore
          timestamps need <code>.toDate()</code> before a date pipe can touch them.
        </div>

        <app-collapsible icon="💡" label="Hint — the type for a Firestore timestamp field">
          <app-code-block lang="typescript" [code]="task2Hint" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <p>One complete, reasonable shape — yours doesn't need to match exactly.</p>
          <h4>AnnouncementsService:</h4>
          <app-code-block lang="typescript" [code]="task2ServiceAnswer" />
          <h4 style="margin-top: 16px">Banner (in your app shell):</h4>
          <app-code-block lang="html" [code]="task2TemplateAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d18-lab-sorted-display"
        [stepNumber]="'Task 3'"
        title="Sorted Display — Newest First"
      >
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: client-side derived sorting with computed(), a preview of query/orderBy.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Announcements should display newest-first, not in whatever order Firestore happens to return them.
          There are two legitimate roads here, and both are worth knowing about even if you only build one
          today.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Road A: sort in a computed() on the client. Road B: discover query() and orderBy() in the AngularFire docs and sort on the server side. What's the real tradeoff between them?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — where the sorting work happens, and what that costs">
          <p>
            A client-side <code>computed()</code> sort is simpler to write today and requires no new API —
            you already have every announcement in the signal, so sorting a copy of the array by
            <code>postedAt</code> is a few lines. The real cost shows up at scale: if this collection ever
            grows to thousands of documents, you're downloading and sorting all of them on every client,
            every time. <code>query()</code> with <code>orderBy()</code> pushes the sort to Firestore's
            server before any data reaches your app — the right choice for a collection that could grow
            large, and the professional default for real production code. For a handful of announcements,
            either is genuinely fine; this is a real tradeoff worth understanding, not a trick question with
            one correct answer.
          </p>
        </app-collapsible>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Build a <code>computed()</code> that returns your announcements signal's value sorted newest-first by <code>postedAt</code>.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Render that sorted <code>computed()</code> in your banner instead of the raw signal.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Optional, if you have time: look up <code>query()</code>/<code>orderBy()</code> in the AngularFire docs and try the server-side version instead.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Your announcements banner always shows the newest message
          first, regardless of the order you created documents in the console. You can state the real
          tradeoff between client-side and server-side sorting, not just that "one is better."
        </div>

        <app-collapsible icon="💡" label="Hint — sorting Timestamp values">
          <app-code-block lang="typescript" [code]="task3Hint" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step
        stepId="d18-lab-stretch-realtime-indicator"
        [stepNumber]="'Task 4 (Stretch)'"
        title="A 'Just Updated' Flash"
      >
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: <code>effect()</code>, imperative side effects triggered by a signal change.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          A small "last updated just now" indicator that flashes briefly whenever your <code>featured</code>
          or <code>announcements</code> signal changes because of a realtime update from Firestore — not on
          initial load, only on genuine live changes after that.
        </p>
        <p style="margin-top: 12px;">
          The tool for this is <code>effect()</code>: a function that reruns a callback every time a signal
          it reads changes — distinct from <code>computed()</code>, which produces a derived <em>value</em>.
          An effect doesn't return anything useful to a template; its entire job is running a side effect
          (setting a flag, logging, flashing an indicator) in reaction to a change.
        </p>

        <div class="task-steps">
          <div class="task-step">
            <span class="step-dot">1</span>
            <span>Add a <code>justUpdated = signal(false)</code> flag to whichever component renders your banner.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">2</span>
            <span>Add an <code>effect()</code> that reads your announcements signal, skips the very first run (initial load isn't a "realtime update"), and otherwise sets <code>justUpdated.set(true)</code>, then clears it after a short delay.</span>
          </div>
          <div class="task-step">
            <span class="step-dot">3</span>
            <span>Render a small visual flash tied to <code>justUpdated()</code>, and test it by editing a document in the console while your app is open.</span>
          </div>
        </div>

        <div class="outcome-check">
          ✅ <strong>Expected outcome:</strong> Editing an announcement in the console triggers a brief
          visible flash in your running app; loading the page fresh does not. You can explain the difference
          between <code>computed()</code> (a derived value) and <code>effect()</code> (a reaction to a
          change) in one sentence.
        </div>

        <app-collapsible icon="💡" label="Hint — skipping the first run">
          <app-code-block lang="typescript" [code]="task4Hint" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day18/act3" class="btn-secondary">← Act 3: The Realtime Moment, and Debug It</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Your own Firebase project has Firestore enabled and is wired into your app</li>
          <li><span class="checkbox">✅</span> Featured shows render from the cloud and update live from the console with zero refresh</li>
          <li><span class="checkbox">✅</span> A second collection (announcements) was built entirely solo, including surviving the Timestamp/.toDate() gotcha</li>
          <li><span class="checkbox">✅</span> You can define document, collection, and reference vs. data, and explain why the test-mode warning matters</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 18: Firebase I. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Explain what Firebase is and the backend-as-a-service tradeoff honestly.</li>
          <li>✅ Create a Firebase project and wire AngularFire with the modular API — no compat imports.</li>
          <li>✅ Model documents and collections, and read a live collection with collectionData + toSignal.</li>
          <li>✅ Watch and explain realtime sync as an Observable that never completes.</li>
          <li>✅ Diagnose the three classic collectionData mistakes: missing idField, missing initialValue, missing types.</li>
          <li>✅ Handle a Firestore Timestamp correctly before handing it to the date pipe.</li>
        </ul>
        <p style="margin-top: 12px;">Your app now has a real cloud database. The next steps in this course build on top of it.</p>
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
export class Day18LabComponent {
  task2Hint = `import { Timestamp } from '@angular/fire/firestore';

export interface Announcement {
  id: string;
  message: string;
  postedAt: Timestamp;
}`;

  task2ServiceAnswer = `import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, Timestamp, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Announcement {
  id: string;
  message: string;
  postedAt: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class AnnouncementsService {
  private firestore = inject(Firestore);

  announcements = toSignal(
    collectionData(
      collection(this.firestore, 'announcements'),
      { idField: 'id' }
    ) as Observable<Announcement[]>,
    { initialValue: [] }
  );
}`;

  task2TemplateAnswer = `<div class="announcement-banner">
  @for (a of announcementsSvc.announcements(); track a.id) {
    <p>{{ a.message }} — {{ a.postedAt.toDate() | date: 'MMM d' }}</p>
  } @empty {
    <p>No announcements right now.</p>
  }
</div>`;

  task3Hint = `announcementsSorted = computed(() =>
  [...this.announcementsSvc.announcements()].sort(
    (a, b) => b.postedAt.toMillis() - a.postedAt.toMillis()
  )
);
// Timestamp has both .toDate() and .toMillis() -- toMillis() is the
// cheaper comparison when you only need to sort, not display.`;

  task4Hint = `private isFirstRun = true;

constructor() {
  effect(() => {
    this.announcementsSvc.announcements(); // read it so the effect tracks it
    if (this.isFirstRun) {
      this.isFirstRun = false;
      return;
    }
    this.justUpdated.set(true);
    setTimeout(() => this.justUpdated.set(false), 1500);
  });
}`;
}
