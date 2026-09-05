import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day6-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 6 · Act 2 of 3</span>
        <h1>🔄 Born, Alive, Destroyed: Lifecycle Hooks</h1>
        <p class="subtitle">Components have moments. Two of them matter enough to learn today.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/components/lifecycle" target="_blank" rel="noopener">Components → Lifecycle</a> — all eight hooks are listed there; you need two of them.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Use <code>ngOnInit</code> and <code>ngOnDestroy</code>, and know exactly why the constructor is the wrong place for input-dependent work.</li>
          <li><strong>Why It Matters:</strong> Startup work (loading data) and cleanup (stopping timers, closing subscriptions) are everyday tasks, and getting cleanup wrong is how you write your first memory leak.</li>
          <li><strong>Build Steps:</strong> Instrument the card with both hooks → watch cards get born and destroyed while filtering → prove the constructor rule by breaking it → learn the "is it derived state?" test.</li>
          <li><strong>Expected Outcome:</strong> A console log showing cards being created and destroyed as you type, and a clear rule for when a hook beats a computed.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Lifecycle Hooks)</p>
        <p><strong>Next step:</strong> Act 3 (Style Encapsulation & Debug It)</p>
        <p><strong>Time:</strong> About 35 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d6-act2-instrument" [stepNumber]="1" title="Instrument the Card, Then Watch It Happen">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Components are born, live, and die. Every time you type in the filter box, Angular destroys
          the cards that no longer match and creates the ones that now do. You've never seen it happen.
          Let's make it visible.
        </p>

        <p><strong>Do this:</strong> add both hooks to <code>ShowCard</code>.</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="instrumentBeforeCode" />

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="instrumentAfterCode" />

        <p style="margin-top: 12px;">
          <strong>Now open your browser console and type slowly in the filter box.</strong> Watch the
          births and deaths scroll past as the list narrows and widens. Type <code>b</code>, then
          <code>bl</code>, then delete it all.
        </p>

        <p style="margin-top: 12px;">
          That's the <code>&#64;for</code> + <code>track</code> machinery from Day 4, finally visible.
          Everything you've built so far has been quietly doing this the whole time.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Change <code>track show.id</code> to <code>track &#36;index</code> in <code>app.html</code> and filter again. What changes in the console, and why?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — identity changes, so the wrong things get destroyed">
          <p>
            With <code>track show.id</code>, a show keeps the same identity no matter where it lands in
            the filtered array, so Angular moves the existing card rather than rebuilding it — you see
            births only for genuinely new items.
          </p>
          <p style="margin-top: 8px;">
            With <code>track &#36;index</code>, identity is "position in the list." Filter the first item
            away and every remaining item shifts position, so from Angular's point of view every card
            is now a different card — you get a wave of destroys and creates, and any state inside
            those cards (your episode counter, your star rating) is thrown away with them.
          </p>
          <p style="margin-top: 8px;">
            Put it back to <code>track show.id</code>. This is why Day 4 pushed you toward a stable id.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your console prints "card born" / "card died" lines as you type in the filter box, and you've watched the same show's card survive a filter change rather than being rebuilt.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d6-act2-constructor-rule" [stepNumber]="2" title="Why the Constructor Is Too Early">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Here's the rule that costs beginners the most time: <strong>inputs are not set yet when the
          constructor runs.</strong> Angular constructs the component first, then assigns the inputs,
          then calls <code>ngOnInit</code>.
        </p>

        <p><strong>Do this — break it on purpose,</strong> so you recognize the failure later:</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="constructorBugCode" />

        <p style="margin-top: 12px;">
          Reload. You get an error, because <code>show()</code> has no value to give you yet — a
          required input read before the parent has supplied it.
        </p>

        <p style="margin-top: 12px;">Move the exact same line into <code>ngOnInit</code> and it works:</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="constructorFixCode" />

        <p style="margin-top: 16px;">Write these four down somewhere you'll see them again:</p>

        <ul>
          <li><strong><code>constructor</code></strong> — wiring only. Dependency injection, setting up signals. Angular hasn't set your inputs yet.</li>
          <li><strong><code>ngOnInit</code></strong> — "the component is ready and inputs are set." Startup logic, kicking off a data load. This is the one that matters when you start fetching from an API.</li>
          <li><strong><code>ngOnDestroy</code></strong> — cleanup. Timers, subscriptions, event listeners you attached by hand. This is the one that matters once you meet RxJS.</li>
          <li><strong>Everything else</strong> — there are eight hooks. Look the rest up on the day you need them; you mostly won't.</li>
        </ul>

        <app-collapsible icon="🤔" label="Why does Angular even work this way?">
          <p>
            A constructor is plain TypeScript — it runs the instant the object is created, and Angular
            has no opportunity to do anything before it. Inputs are set by Angular <em>after</em>
            construction, as part of the first change-detection pass. <code>ngOnInit</code> exists
            precisely to give you a "now everything's wired up" moment that a constructor can't
            provide.
          </p>
          <p style="margin-top: 8px;">
            Related consequence worth knowing: <code>ngOnInit</code> fires <strong>once</strong>, on
            the first pass. If the parent later passes a different value for the same input, it does
            not fire again — which is a big part of why the next step steers you toward
            <code>computed()</code>.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've reproduced the constructor error, read the real message, moved the line to <code>ngOnInit</code>, and watched it work.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d6-act2-hooks-vs-computed" [stepNumber]="3" title="When You Do NOT Want a Lifecycle Hook">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          Honest answer to the obvious question — do you need lifecycle hooks in a signals world?
          <strong>Less than you used to.</strong> A lot of what hooks were traditionally used for is
          now better handled by <code>computed()</code>. But <code>ngOnInit</code> for startup work and
          <code>ngOnDestroy</code> for cleanup are still everyday tools, and every job interview asks
          about them.
        </p>

        <p style="margin-top: 12px;">Here's the trap, using the line you just moved:</p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="before" [code]="hookVsComputedBeforeCode" />

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="hookVsComputedAfterCode" />

        <p style="margin-top: 12px;">
          The <code>computed</code> version isn't just shorter — it's <strong>more correct</strong>.
          <code>ngOnInit</code> runs once; if the parent ever passes a different show into the same
          card instance, the hook version keeps showing the old genre forever, while the computed
          updates itself. You deleted a hook and fixed a latent bug at the same time.
        </p>

        <div class="info-box">
          <strong>The test, and use it every time:</strong> ask "is this value <em>derived</em> from
          something else?" If yes, it's a <code>computed()</code> — no hook. If it's a one-time action
          with a side effect outside the component (start a fetch, start a timer, read
          <code>localStorage</code>), that's <code>ngOnInit</code>. If it's undoing one of those
          actions, that's <code>ngOnDestroy</code>.
        </div>

        <div class="think-about-it">
          <p class="tai-q">You already used <code>effect()</code> on Day 3 to write to <code>localStorage</code>. How is that different from doing it in <code>ngOnInit</code>?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — once versus every time it changes">
          <p>
            <code>ngOnInit</code> is a single moment: "the component just became ready." An
            <code>effect()</code> is ongoing: "re-run this whenever the signals I read change." Writing
            the episode count to <code>localStorage</code> has to happen on <em>every</em> change, so
            it's an effect. Reading the saved value once at startup is a single moment, so it could be
            <code>ngOnInit</code>.
          </p>
          <p style="margin-top: 8px;">
            Both are for talking to the world outside Angular. The difference is how many times.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You've replaced at least one lifecycle hook with a <code>computed()</code> and can state the "is this derived state?" test from memory.</div>
      </app-lesson-step>

      <!-- Step 4 -->
      <app-lesson-step stepId="d6-act2-cleanup" [stepNumber]="4" title="ngOnDestroy — The Hook That Prevents Real Bugs">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          <code>ngOnDestroy</code> is the one hook with no signals-era replacement, because it's about
          undoing things Angular didn't do for you.
        </p>

        <p style="margin-top: 12px;">
          Anything you start by hand keeps running after the component is gone unless you stop it —
          <code>setInterval</code>, <code>setTimeout</code>, <code>addEventListener</code>, a WebSocket,
          an RxJS subscription. The component is destroyed; your timer is not. It keeps firing, holding
          a reference to a dead component, forever.
        </p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="leakCode" />

        <p style="margin-top: 12px;">
          Filter that card away and the timer is <em>still running</em>. Filter twenty cards away and
          you have twenty orphaned timers. That's a memory leak, and it's the single most common one in
          front-end code.
        </p>

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" variant="after" [code]="leakFixCode" />

        <div class="info-box">
          <strong>You'll build exactly this in the lab.</strong> Task 3 asks for a "seconds on screen"
          ticker with proper cleanup, and asks you to <em>prove</em> in the console that it stopped.
          It's likely the first real cleanup bug you'll ever prevent rather than fix.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name three things that need cleaning up in <code>ngOnDestroy</code>, and explain what "orphaned timer" means in terms of what's still holding a reference.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day6/act1" class="btn-secondary">← Act 1</a>
        <a routerLink="/day6/act3" class="btn-primary">Act 3: Style Encapsulation & Debug It →</a>
      </div>
    </div>
  `
})
export class Day6Act2Component {
  models: MentalModel[] = [
    {
      concept: 'ngOnInit',
      plainEnglish: 'Runs once, after Angular has set the inputs. Startup work goes here.',
      analogy: 'Opening night. The set is built and the cast is in place; now the show can start.'
    },
    {
      concept: 'ngOnDestroy',
      plainEnglish: 'Runs when the component is removed. Undo anything you started by hand.',
      analogy: 'Turning off the lights and locking up before you leave the building.'
    },
    {
      concept: 'constructor',
      plainEnglish: 'Runs before inputs exist. Wiring only, never input-dependent work.',
      analogy: 'The building exists but the furniture has not been delivered yet.'
    },
    {
      concept: 'Hook or computed?',
      plainEnglish: 'Derived from other state means computed. A one-time outside action means a hook.',
      analogy: 'A formula cell recalculates itself; sending an email happens once, on purpose.'
    }
  ];

  instrumentBeforeCode = `import { Component, signal, computed, input, output } from '@angular/core';

export class ShowCard {
  show = input.required<Show>();
}`;

  instrumentAfterCode = `import { Component, signal, computed, input, output, OnInit, OnDestroy } from '@angular/core';

export class ShowCard implements OnInit, OnDestroy {
  show = input.required<Show>();

  ngOnInit() {
    console.log('card born:', this.show().name);
  }

  ngOnDestroy() {
    console.log('card died:', this.show().name);
  }
}`;

  constructorBugCode = `export class ShowCard {
  genre = '';

  constructor() {
    this.genre = this.show().genre;   // inputs aren't set yet - this fails
  }
}`;

  constructorFixCode = `export class ShowCard implements OnInit {
  genre = '';

  ngOnInit() {
    this.genre = this.show().genre;   // inputs are set by now - fine
  }
}`;

  hookVsComputedBeforeCode = `export class ShowCard implements OnInit {
  genre = '';

  ngOnInit() {
    this.genre = this.show().genre;
  }
}

// template: {{ genre }}`;

  hookVsComputedAfterCode = `export class ShowCard {
  genre = computed(() => this.show().genre);
}

// template: {{ genre() }}
// no hook, no OnInit import, and it stays correct if the input changes`;

  leakCode = `export class ShowCard implements OnInit {
  secondsOnScreen = signal(0);

  ngOnInit() {
    setInterval(() => this.secondsOnScreen.update(n => n + 1), 1000);
  }
  // no ngOnDestroy - the timer outlives the component
}`;

  leakFixCode = `export class ShowCard implements OnInit, OnDestroy {
  secondsOnScreen = signal(0);
  private timerId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.timerId = setInterval(() => this.secondsOnScreen.update(n => n + 1), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timerId);
  }
}`;
}
