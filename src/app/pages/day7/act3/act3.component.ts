import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day7-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 7 · Act 3</span>
        <h1>🧭 Boundaries and Debug It</h1>
        <p class="subtitle">Now that services are your new hammer, the important skill is knowing what is not a nail. Then three bugs that break dependency injection in ways the compiler will happily let you ship.</p>
      </div>

      <div class="info-box">
        📚 <strong>Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/di" target="_blank" rel="noopener">The dependency injection guide</a> — skim it. You have built the parts that matter; the rest is reference material for when you need it.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <p><strong>Learning Goal:</strong> Decide confidently what belongs in a service and what stays a component input, then recognize the three classic DI bugs on sight.</p>
        <p><strong>Why It Matters:</strong> The most common Day 7 aftermath is a codebase where everything is a service and nothing is reusable. Judgment is the deliverable here, not syntax.</p>
        <p><strong>Build Steps:</strong> Apply the decision guide to a real disagreement &rarr; break DI three ways on purpose &rarr; fix each one and understand the symptom.</p>
        <p><strong>Expected Outcome:</strong> You can defend a service-or-input choice with a reason, and you can diagnose "my shared state is not shared" in under a minute.</p>
      </section>

      <div class="selfguided-panel">
        <p><strong>You are here:</strong> Day 7, Act 3 of 3.</p>
        <p><strong>Next step:</strong> The Student Lab — a second service of your own, plus persistence that survives a refresh.</p>
        <p><strong>Time:</strong> about 35 minutes.</p>
      </div>

      <app-lesson-step stepNumber="1" stepId="d7-act3-boundaries" title="Should ShowCard inject the service?">
        <p>
          Here is a real disagreement worth having with yourself. <code>ShowCard</code> needs to know whether its show is
          already on the watchlist, so it can grey out the button. There are two defensible ways to get that.
        </p>

        <p><strong>Option A</strong> — the card injects the service and works it out itself:</p>
        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="cardInjectsCode" />
        <p>The parent's template gets shorter — no more <code>[alreadyAdded]</code> to pass, and no more <code>watchlistIds</code> computed in <code>App</code> at all.</p>

        <p><strong>Option B</strong> — the card keeps taking a plain boolean input (what you have now):</p>
        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="cardInputCode" />

        <div class="think-about-it">
          <p class="tai-q">
            Option A is less code and less wiring. Make the argument for Option B anyway — what does the card give up by
            reaching for the service directly?
          </p>
        </div>

        <app-collapsible icon="✅" label="Show Answer — for a reusable card, inputs win (but it is genuinely close)">
          <p>
            Option A couples <code>ShowCard</code> to <code>WatchlistService</code> permanently. The card can now only ever
            exist in an app that has a watchlist. Drop it into a search-results page, a "similar shows" carousel, or a
            storybook-style demo page and it drags the whole watchlist concept along with it. It also gets harder to test —
            every test now needs the service, or a fake of it.
          </p>
          <p>
            Option B keeps the card <strong>dumb and portable</strong>: it renders whatever it is told. Any parent, any context,
            no dependencies. The general principle is that leaf presentational components take inputs, and the smarter
            container components near the top do the injecting and decide what to pass down.
          </p>
          <p>
            That said, Option A is not wrong. In a large app where the card is used in fifteen places that <em>all</em> need
            watchlist awareness, threading the same boolean through fifteen parents is its own kind of bad. Reasonable engineers
            disagree here, and picking a side <em>with a reason</em> is the actual skill. This course keeps Option B.
          </p>
        </app-collapsible>

        <div class="warning-box">
          <strong>The trap this act exists to prevent:</strong> having just learned services, the temptation is to move
          everything into one. Keep applying the guide. The card's own <code>episodesWatched</code>? Local state — it belongs to
          that card and nothing else can meaningfully read it. The watchlist? Service. The filter's search term? Local today,
          because only one page uses it.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You picked a side for <code>alreadyAdded</code>, wrote your reason in a comment above the input, and can defend it.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="2" stepId="d7-act3-debug" title="Debug it: three ways to break DI">
        <p>
          Read this code before expanding anything. It compiles. It runs. It is wrong in three separate ways, and the app looks
          almost normal while being broken.
        </p>
        <app-code-block lang="typescript" variant="before" [code]="buggyCode" />
        <p>
          Try to answer these before you look: <em>Why does the header badge never move? Why does nothing happen when I click
          add? And which of these does the compiler actually complain about?</em>
        </p>

        <app-collapsible icon="🐛" label="Bug 1 — new WatchlistService() bypasses dependency injection entirely">
          <p>
            <code>new</code> creates a brand new object that Angular knows nothing about. This card now has its own private
            watchlist, holding its own empty array. <code>App</code> has a different one. <code>Header</code> has a third.
            "Shared state" quietly becomes three separate states.
          </p>
          <p>
            <strong>The symptom to memorize:</strong> the header badge never moves, no matter what you click. If you ever see
            state that updates in one place but not another, check for a <code>new</code> on a service before you check
            anything else.
          </p>
          <p>
            The compiler will not help you here — <code>new WatchlistService()</code> is perfectly valid TypeScript. This is a
            runtime-only, silent bug.
          </p>
          <app-code-block lang="typescript" variant="after" [code]="bug1FixCode" />
        </app-collapsible>

        <app-collapsible icon="🐛" label="Bug 2 — push() mutates the array, so the signal never notifies">
          <p>
            <code>this.svc.items().push(...)</code> reads the signal's current value (an array), then mutates that array in
            place. The signal is still holding the very same array reference it held before, so as far as it is concerned
            <em>nothing changed</em>. No notification is sent, no <code>computed()</code> recomputes, no template re-renders.
          </p>
          <p>
            Add three shows, then type in the filter box to force a re-render, and your shows suddenly appear. That is the
            tell-tale sign of a mutation bug: the data was there all along, the UI just was never told.
          </p>
          <p>
            The fix is two fixes in one — update immutably, <em>and</em> do it through the service method, so the no-duplicates
            rule is not bypassed:
          </p>
          <app-code-block lang="typescript" variant="after" [code]="bug2FixCode" />
        </app-collapsible>

        <app-collapsible icon="🐛" label="Bug 3 — a public writable signal is a design bug, not a compiler error">
          <p>
            <code>items</code> being public is not something the compiler will ever flag. But it means any component in the app
            can call <code>svc.items.set([])</code> and wipe the watchlist, skipping every rule the service exists to enforce.
            The service stops being the owner of its data and becomes a shared mutable variable with extra steps.
          </p>
          <p>
            Make the writable signal <code>private</code> and publish a read-only view. Now bug 2 becomes <em>impossible to
            write</em> — <code>svc.items</code> does not exist outside the service, and the read-only signal has no
            <code>set</code> or <code>update</code> to call. You converted a class of runtime bugs into compiler errors.
          </p>
          <app-code-block lang="typescript" variant="after" [code]="bug3FixCode" />
          <p>
            This is the payoff for the ceremony that felt excessive back in Act 1.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You fixed all three in your own copy, and you can state the distinct symptom of each — badge frozen, UI stale until something else re-renders, and rules quietly bypassable.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="3" stepId="d7-act3-checkpoint" title="Where this is heading">
        <p>
          Two forward-looking notes, so today's work does not feel like an isolated exercise:
        </p>
        <ul>
          <li>
            <strong>Day 9 (routing)</strong> is where the service stops being a nicety. Browse and Watchlist become separate
            routed pages, and the watchlist keeps working across that split without a single line of change, because it never
            depended on the component tree in the first place.
          </li>
          <li>
            <strong>Day 13 (HTTP)</strong> reuses today's exact shape. You will inject <code>HttpClient</code> into a
            <code>ShowService</code> — the same <code>inject()</code>, the same <code>providedIn: 'root'</code>, the same
            private-state-plus-public-methods pattern — and the shows will come from a real API instead of a hardcoded array.
            The lab's localStorage persistence is the dress rehearsal.
          </li>
        </ul>

        <div class="think-about-it">
          <p class="tai-q">
            If <code>ShowService</code> on Day 13 loads shows over the network, and both a Browse page and a Detail page inject
            it, how many network requests happen when you visit both?
          </p>
        </div>

        <app-collapsible icon="✅" label="Show Answer — one, if you cache it in the service">
          <p>
            The service is a singleton, so both pages hold the same instance. If that instance stores the loaded shows in a
            signal, the second page reads state that is already populated — no second request. Navigate back and forth all day;
            still one request.
          </p>
          <p>
            That is not an accident of routing, it is a direct consequence of the thing you built today. A shared cache is one
            of the most valuable jobs a service does, and you now have the machinery for it.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in one sentence, why a routed app needs services — and you are ready for the lab.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day7/act2" class="btn-secondary">← Act 2</a>
        <a routerLink="/day7/lab" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `
})
export class Day7Act3Component {
  models: MentalModel[] = [
    {
      concept: 'Smart vs dumb components',
      plainEnglish: 'Containers near the top inject services and decide things; leaf components just render what they are handed.',
      analogy: 'A manager reads the reports and makes the call; the printer just prints whatever it is given.'
    },
    {
      concept: 'Coupling',
      plainEnglish: 'How much a piece of code depends on other specific pieces, and therefore how hard it is to reuse.',
      analogy: 'A lamp with a normal plug fits any room. One wired straight into the wall only works where it was installed.'
    },
    {
      concept: 'Immutable update',
      plainEnglish: 'Build a new array instead of changing the old one, so the signal sees a genuinely new value.',
      analogy: 'Printing a corrected page instead of scribbling on the original - anyone glancing over can tell it changed.'
    },
    {
      concept: 'Encapsulation',
      plainEnglish: 'Keep the writable state private and expose only the methods that enforce your rules.',
      analogy: 'An ATM. You can deposit and withdraw; you cannot reach in and rearrange the cash.'
    }
  ];

  cardInjectsCode = `export class ShowCard {
  show = input.required<Show>();

  private watchlistSvc = inject(WatchlistService);

  // the card figures it out itself - no input needed
  onList = computed(() => this.watchlistSvc.has(this.show().id));
}`;

  cardInputCode = `export class ShowCard {
  show = input.required<Show>();

  // the parent already knows this - just tell the card
  alreadyAdded = input(false);
}`;

  buggyCode = `@Injectable({ providedIn: 'root' })
export class WatchlistService {
  items = signal<Show[]>([]);          // bug 3
}

export class ShowCard {
  show = input.required<Show>();

  svc = new WatchlistService();        // bug 1

  add() {
    this.svc.items().push(this.show()); // bug 2
  }
}`;

  bug1FixCode = `export class ShowCard {
  // ask Angular for the shared instance instead of building your own
  private svc = inject(WatchlistService);
}`;

  bug2FixCode = `export class ShowCard {
  private svc = inject(WatchlistService);

  add() {
    // go through the service, so the no-duplicates rule still applies
    this.svc.add(this.show());
  }
}

// and inside the service, the update is immutable:
add(show: Show) {
  this.items.update(list =>
    list.some(s => s.id === show.id) ? list : [...list, show]
  );
}`;

  bug3FixCode = `@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private items = signal<Show[]>([]);        // writable, and nobody else can reach it

  readonly watchlist = this.items.asReadonly(); // readable everywhere, writable nowhere
}

// elsewhere in the app, both of these now fail to compile:
//   svc.items                 -> Property 'items' is private
//   svc.watchlist.set([])     -> Property 'set' does not exist`;
}
