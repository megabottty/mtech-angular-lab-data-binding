import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day7-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 7 · Act 1</span>
        <h1>🏛️ State That Outlives Components</h1>
        <p class="subtitle">Your watchlist does not belong to a component. Today it moves into a service — a plain class that owns the data and the rules about it — and you meet the single most interview-asked idea in Angular: dependency injection.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes you have the end-of-Day-6 BingeBoard running. If you don't, go to the <a routerLink="/day7/start">Day 7 Starting Point</a> first — it takes about two minutes.
      </div>

      <div class="info-box">
        📚 <strong>Worth reading alongside this act:</strong>
        <a href="https://angular.dev/essentials/dependency-injection" target="_blank" rel="noopener">Essentials — Dependency injection</a> and
        <a href="https://angular.dev/guide/di/creating-injectable-service" target="_blank" rel="noopener">Creating an injectable service</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <p><strong>Learning Goal:</strong> Move the watchlist out of <code>App</code> and into a <code>WatchlistService</code>, then get that service into a component with <code>inject()</code>.</p>
        <p><strong>Why It Matters:</strong> On Day 9 the app splits into routed pages. State that lives inside <code>App</code> and travels by inputs and outputs cannot survive that split. State in a service can.</p>
        <p><strong>Build Steps:</strong> Feel the pain that inputs cause &rarr; generate the service &rarr; understand <code>providedIn: 'root'</code> &rarr; make the state read-only from outside &rarr; inject it and delete <code>App</code>'s array.</p>
        <p><strong>Expected Outcome:</strong> BingeBoard behaves exactly as it did before, but <code>App</code> no longer owns a watchlist array — it just forwards calls to the service.</p>
      </section>

      <div class="selfguided-panel">
        <p><strong>You are here:</strong> Day 7, Act 1 of 3.</p>
        <p><strong>Next step:</strong> Act 2 proves the service is a true singleton by sharing it with a second, unrelated component.</p>
        <p><strong>Time:</strong> about 45 minutes.</p>
      </div>

      <app-lesson-step stepNumber="1" stepId="d7-act1-warmup" title="Warm-up: imagine Day 9 breaking your app">
        <p>
          Before any code, a thought experiment — the whole day makes more sense if you feel the problem first.
        </p>
        <p>
          Right now, <code>watchlist</code> is a signal inside <code>App</code>. Every component that needs it gets it through
          an input, and every component that changes it does so by emitting an output that <code>App</code> handles.
          That works because everything is one page, and every component is a direct child of <code>App</code>.
        </p>
        <p>
          On Day 9 that stops being true. The app splits into routes: a Browse page and a Watchlist page, rendered by the
          router into a <code>&lt;router-outlet /&gt;</code> — <em>not</em> hand-placed by you in <code>app.html</code>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">
            If Browse and Watchlist are rendered by the router rather than written into <code>app.html</code>, how would you
            pass <code>[shows]="watchlist()"</code> to the Watchlist page? And when a card deep inside Browse adds a show, how
            many components would that event have to bubble up through?
          </p>
        </div>

        <app-collapsible icon="✅" label="Show Answer — why inputs and outputs run out of road">
          <p>
            You can't pass the input at all. The router creates the component; there is no template of yours in between where
            you could write <code>[shows]="..."</code>. Router data has to arrive some other way.
          </p>
          <p>
            And the event would have to climb the whole tree: <code>RatingStars</code> &rarr; <code>ShowCard</code> &rarr;
            <code>Panel</code> &rarr; <code>BrowsePage</code> &rarr; <code>App</code>. Every component in that chain would need
            an output it does not care about, purely to relay someone else's event. That anti-pattern has a name — <strong>prop
            drilling</strong> — and it is the specific pain a service removes.
          </p>
          <p>
            Inputs and outputs are still exactly right for a parent talking to its own child. They are the wrong tool for state
            that many unrelated parts of the app share.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name the problem — prop drilling — and you can explain why a router-rendered component can't receive a hand-written input.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="2" stepId="d7-act1-what-is-a-service" title="What a service is, and what belongs in one">
        <p>
          A component has one job: turn state into pixels, and user actions into events. But some things in your app are not
          about pixels at all. The watchlist is data plus rules — <em>no duplicates</em>, <em>add puts it at the end</em>,
          <em>remove matches by id</em>. Those rules are true whether or not anything is on screen.
        </p>
        <p>
          A <strong>service</strong> is where that lives. There is no magic to it: it is a plain TypeScript class. What makes it
          an Angular service is one decorator that lets Angular hand it out.
        </p>

        <p><strong>The decision guide</strong> — worth writing down, because the most common Day 7 mistake is turning everything into a service:</p>
        <ul>
          <li><strong>Used by one component, or passed down one level?</strong> Keep it local, or use an input. The card's own <code>episodesWatched</code> belongs to the card.</li>
          <li><strong>Shared across the tree, or across pages? Or does it carry rules?</strong> That's a service. The watchlist qualifies on both counts.</li>
          <li><strong>Genuinely debatable?</strong> The current search term. It's used on one page today, so local is fine — but if you added a "search from anywhere" box in the header, it would move to a service. Both answers are defensible, and knowing <em>why</em> you picked one is the actual skill.</li>
        </ul>

        <app-collapsible icon="🤔" label="Why not just export a plain object and import it everywhere?">
          <p>
            You genuinely could. <code>export const watchlist = signal&lt;Show[]&gt;([]);</code> in a shared file would work today.
            It's a fair question and it deserves real answers rather than "because Angular says so":
          </p>
          <ul>
            <li><strong>Tests can swap it.</strong> With DI, a test can say "when anyone asks for <code>WatchlistService</code>, give them this fake instead" — no network, no localStorage, instant. A hard <code>import</code> cannot be intercepted. Day 24 does exactly this.</li>
            <li><strong>Angular manages the lifetime.</strong> It decides when the instance is created (lazily, on first use) and can scope it to the whole app or to one part of the tree.</li>
            <li><strong>Libraries can provide implementations.</strong> This is how <code>HttpClient</code> reaches your code on Day 13 — you ask for the type, and whatever was configured gets handed to you.</li>
            <li><strong>It's the shape every Angular codebase uses.</strong> Fair or not, the job you take will look like this.</li>
          </ul>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You wrote down the decision guide, and you can say which of BingeBoard's current pieces of state should move to a service and which should stay put.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="3" stepId="d7-act1-generate" title="Generate the service">
        <p>Generate it with the CLI so the file lands in a conventional place:</p>
        <app-code-block lang="bash" [code]="generateCommand" />
        <p>
          That creates <code>src/app/services/watchlist.ts</code>. Replace its contents with this. Read the design notes
          underneath before you move on — this snippet is the architecture lesson of the whole course, not just some code.
        </p>
        <app-code-block lang="typescript" file="src/app/services/watchlist.ts" [code]="serviceCode" />

        <p><strong>Four things to notice:</strong></p>
        <ul>
          <li><code>&#64;Injectable(&#123; providedIn: 'root' &#125;)</code> registers the class with Angular's injector, app-wide. One instance, created the first time somebody asks for it.</li>
          <li><code>private items</code> is the only writable signal, and nothing outside this file can touch it.</li>
          <li><code>readonly watchlist = this.items.asReadonly()</code> hands the outside world a signal it can <em>read</em> but never <code>set()</code> or <code>update()</code>.</li>
          <li><code>add</code> and <code>remove</code> are the only doors in. The no-duplicates rule lives inside <code>add</code>, so it is impossible to bypass — no matter which component calls it.</li>
        </ul>

        <div class="warning-box">
          Notice that <code>add</code> uses <code>this.items.update(list =&gt; [...list, show])</code> and never
          <code>this.items().push(show)</code>. Pushing mutates the array that the signal is already holding, so the signal's
          value never changes identity and nothing re-renders. This bites people constantly — it is Act 3's second bug.
        </div>

        <app-collapsible icon="🔍" label="Does asReadonly() actually copy anything?">
          <p>
            No — and that matters for performance. <code>asReadonly()</code> returns a thin wrapper around the same underlying
            signal, so reads are just as cheap and always current. It removes <code>set</code> and <code>update</code> from the
            <em>type</em>; it is a compile-time guarantee, not a runtime copy.
          </p>
          <p>
            It feels like ceremony when your app is small. Hold the line anyway. The first time a colleague reaches into your
            service and mutates its state from a click handler, bypassing every rule you wrote, you'll understand why the door
            is locked.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> <code>src/app/services/watchlist.ts</code> exists and compiles, exposing a read-only <code>watchlist</code>, a <code>count</code>, and <code>add</code> / <code>remove</code> / <code>has</code>.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="4" stepId="d7-act1-inject" title="Inject it, and delete App's array">
        <p>
          Now get the service into <code>App</code>. You do not write <code>new WatchlistService()</code> — that is the whole
          point, and it's Act 3's first bug. You <em>ask</em> Angular for it with <code>inject()</code>.
        </p>

        <p><strong>Before</strong> — <code>App</code> owns the array and the rules:</p>
        <app-code-block lang="typescript" file="src/app/app.ts" variant="before" [code]="appBeforeCode" />

        <p><strong>After</strong> — the service owns both, and <code>App</code> just forwards:</p>
        <app-code-block lang="typescript" file="src/app/app.ts" variant="after" [code]="appAfterCode" />

        <p>
          The <code>watchlist = this.watchlistSvc.watchlist;</code> line exists purely so <code>app.html</code> can keep saying
          <code>watchlist()</code> — a signal is just a value you can hold in a field. Because of it,
          <strong>your template does not change at all</strong>. That is the sign of a refactor that respected its boundaries.
        </p>

        <div class="warning-box">
          <strong>The <code>inject()</code> rule that trips everyone up:</strong> <code>inject()</code> only works during
          construction — in a field initializer or in the constructor body. Call it inside a click handler or inside
          <code>ngOnInit</code> and you get a runtime error about being outside an injection context. The habit to build:
          <strong>inject at the top of the class, use it anywhere.</strong>
        </div>

        <div class="think-about-it">
          <p class="tai-q">
            <code>watchlistIds</code> is still a <code>computed()</code> in <code>App</code>, and it reads
            <code>this.watchlist()</code> — which is now the service's signal. Does that still work? Does the computed know
            anything changed owners?
          </p>
        </div>

        <app-collapsible icon="✅" label="Show Answer — the computed neither knows nor cares">
          <p>
            It works unchanged. A <code>computed()</code> tracks whatever signals it reads while it runs; it has no idea whether
            a signal lives in a component, a service, or a module-level variable. Reading the service's signal subscribes to it
            exactly the same way.
          </p>
          <p>
            This is why the refactor is so quiet. Signals made your state <em>portable</em> — you moved where it lives without
            touching anything that consumes it.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You deleted <code>watchlist = signal&lt;Show[]&gt;([])</code> from <code>App</code>, the app still adds and removes shows exactly as before, and <code>app.html</code> is byte-for-byte unchanged.</div>
      </app-lesson-step>

      <app-lesson-step stepNumber="5" stepId="d7-act1-legacy" title="Reading older code: constructor injection">
        <p>
          Nearly every Angular tutorial, Stack Overflow answer, and existing codebase you meet will inject like this instead:
        </p>
        <app-code-block lang="typescript" [code]="legacyInjectCode" />
        <p>
          That is <strong>constructor injection</strong>. It is not deprecated and not broken — it produces the identical
          result, it is simply the older style. Angular's own docs and this course use <code>inject()</code>, because it works
          in places a constructor parameter can't (field initializers, functional route guards on Day 9, functional HTTP
          interceptors on Day 14) and it doesn't force every subclass to re-declare its parent's dependencies.
        </p>
        <p>
          You need to <em>read</em> the old form fluently and <em>write</em> the new one. When you paste old code into your
          project, translate it rather than adopting it.
        </p>

        <app-collapsible icon="📖" label="Translation table — old style to new">
          <app-code-block lang="typescript" [code]="translationCode" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can look at a constructor with <code>private http: HttpClient</code> in its parameter list and immediately recognize it as the same thing as <code>private http = inject(HttpClient)</code>.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day7/start" class="btn-secondary">← Starting Point</a>
        <a routerLink="/day7/act2" class="btn-primary">Act 2: Proving the Singleton →</a>
      </div>
    </div>
  `
})
export class Day7Act1Component {
  models: MentalModel[] = [
    {
      concept: 'Service',
      plainEnglish: 'A plain class that owns some data and the rules about that data, so no component has to.',
      analogy: 'The kitchen in a restaurant. Every table orders from it, no table cooks its own food, and the recipes live in exactly one place.'
    },
    {
      concept: 'Dependency injection',
      plainEnglish: 'You ask for the thing you need by its type, and Angular hands it to you already built.',
      analogy: 'Ordering a coffee instead of buying a farm. You say what you want; someone else handles where it came from.'
    },
    {
      concept: 'Singleton',
      plainEnglish: 'One shared instance for the whole app, so everyone who asks gets the exact same object.',
      analogy: 'A building has one thermostat. Everybody reads and adjusts the same one - that is the point.'
    },
    {
      concept: 'asReadonly()',
      plainEnglish: 'A view of a signal that can be read but not written, so state can only change through the service methods.',
      analogy: 'A museum display case. You can look at the exhibit from every angle; only staff have the key.'
    }
  ];

  generateCommand = `ng g service services/watchlist`;

  serviceCode = `import { Injectable, signal, computed } from '@angular/core';
import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  // the ONLY writable reference to this state, and it never leaves this file
  private items = signal<Show[]>([]);

  // what the rest of the app is allowed to see: read, never write
  readonly watchlist = this.items.asReadonly();
  readonly count = computed(() => this.items().length);

  add(show: Show) {
    // the no-duplicates rule lives here, so nothing can skip it
    this.items.update(list =>
      list.some(s => s.id === show.id) ? list : [...list, show]
    );
  }

  remove(id: number) {
    this.items.update(list => list.filter(s => s.id !== id));
  }

  has(id: number) {
    return this.items().some(s => s.id === id);
  }
}`;

  appBeforeCode = `import { Component, signal, computed } from '@angular/core';
import { Show } from './models/show';

export class App {
  // ...shows, searchTerm, filteredShows, etc.

  watchlist = signal<Show[]>([]);
  watchlistIds = computed(() => new Set(this.watchlist().map(s => s.id)));

  addShow(show: Show) {
    if (this.watchlistIds().has(show.id)) return;
    this.watchlist.update(list => [...list, show]);
  }

  removeShow(show: Show) {
    this.watchlist.update(list => list.filter(s => s.id !== show.id));
  }
}`;

  appAfterCode = `import { Component, signal, computed, inject } from '@angular/core';
import { Show } from './models/show';
import { WatchlistService } from './services/watchlist';

export class App {
  // ...shows, searchTerm, filteredShows, etc. - all unchanged

  // inject at the top of the class, then use it anywhere
  private watchlistSvc = inject(WatchlistService);

  // expose the service's read-only signal so app.html can stay identical
  watchlist = this.watchlistSvc.watchlist;
  watchlistIds = computed(() => new Set(this.watchlist().map(s => s.id)));

  addShow(show: Show) {
    // no duplicate-check here anymore - that rule lives in the service now
    this.watchlistSvc.add(show);
  }

  removeShow(show: Show) {
    this.watchlistSvc.remove(show.id);
  }
}`;

  legacyInjectCode = `// older style - you will see this everywhere, and it still works
export class App {
  constructor(private watchlistSvc: WatchlistService) {}

  addShow(show: Show) {
    this.watchlistSvc.add(show);
  }
}`;

  translationCode = `// OLD
export class Browse {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}
}

// NEW - identical behavior
export class Browse {
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
}`;
}
