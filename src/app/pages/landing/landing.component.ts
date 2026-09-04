import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../shared/components/mental-model-card/mental-model-card.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent],
  template: `
    <div class="landing">
      <div class="hero">
        <div class="hero-tag">MTech College — Angular Fundamentals</div>
        <h1 class="hero-title">Angular Control Flow<br /><span class="accent">& Two-Way Binding</span></h1>
        <p class="hero-subtitle">
          A step-by-step interactive guide built <em>in</em> Angular — so you're already learning by browsing this site.
        </p>
        <a routerLink="/lesson/1" class="btn-primary cta-btn">Start Lesson 1 →</a>
      </div>

      <section class="selfguided-panel">
        <h3>🧭 Start Here (Self-Guided Path)</h3>
        <ul>
          <li><strong>1.</strong> Start with Act 1 and complete each step in order.</li>
          <li><strong>2.</strong> Use Hint first, then Show Answer only if stuck.</li>
          <li><strong>3.</strong> Mark steps complete so you can resume later.</li>
          <li><strong>4.</strong> Save the Student Lab for last as your mastery check.</li>
        </ul>
      </section>

      <app-mental-model-card [models]="overviewModels" />

      <div class="lesson-map">
        <h2>📐 The 4-Step Lesson Flow</h2>
        <div class="steps-row">
          <div class="step-pill">🧩 Step 1<br /><span>The Problem</span><small>Why HTML fails us</small></div>
          <div class="arrow">→</div>
          <div class="step-pill">💡 Step 2<br /><span>The Solution</span><small>The Angular syntax</small></div>
          <div class="arrow">→</div>
          <div class="step-pill">🔬 Step 3<br /><span>Under the Hood</span><small>Why it works</small></div>
          <div class="arrow">→</div>
          <div class="step-pill">⌨️ Step 4<br /><span>Hands-On</span><small>You type it out</small></div>
        </div>
      </div>

      <h2 class="day-heading">🚀 Day 1 — Introduction to Angular</h2>
      <p class="day-subheading">Scaffold a brand-new Angular app from scratch — the Job Tracker — and meet components, interpolation, and your first git commit.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day1/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Setup Checklist</div>
            <div class="act-desc">Node, the Angular CLI, and what to expect today</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day1/act1">
          <div class="act-icon">🧩</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">What Angular Is</div>
            <div class="act-desc">Scaffold Job Tracker and tour the generated project</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day1/act2">
          <div class="act-icon">✍️</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Interpolation &amp; Your First Component</div>
            <div class="act-desc">Render dynamic text, generate and use a Header component</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day1/act3">
          <div class="act-icon">📝</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Git &amp; Debug It</div>
            <div class="act-desc">Your first commit, then two bugs to find on your own</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day1/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">3 Hands-On Tasks</div>
            <div class="act-desc">Footer, greeting, and a conditional message — on your own!</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">📦 Day 2 — Templates &amp; Bindings</h2>
      <p class="day-subheading">BingeBoard starts here: property binding, event binding, and class/style bindings on a real show card.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day2/act1">
          <div class="act-icon">📦</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">The Three Bindings</div>
            <div class="act-desc">Scaffold BingeBoard and bind a poster with [src]</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day2/act2">
          <div class="act-icon">👆</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Reacting to Events</div>
            <div class="act-desc">(click) handlers, class and style bindings</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day2/act3">
          <div class="act-icon">🎯</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">More Events &amp; Debug It</div>
            <div class="act-desc">Any DOM event works, plus three classic binding bugs</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day2/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">3 Hands-On Tasks</div>
            <div class="act-desc">Hype meter, reset button, and a second card — on your own!</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">📶 Day 3 — Signals</h2>
      <p class="day-subheading">Convert the show card to signal() and computed() — store the minimum, derive the rest.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day3/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone the end-of-Day-2 project, or copy the files by hand</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day3/act1">
          <div class="act-icon">📶</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">Converting to Signals</div>
            <div class="act-desc">Why plain properties can't scale, and rewriting watched state</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day3/act2">
          <div class="act-icon">🔒</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Reading Signals &amp; computed</div>
            <div class="act-desc">Parentheses in templates, read-only formulas, and effect</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day3/act3">
          <div class="act-icon">🔄</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">linkedSignal &amp; Debug It</div>
            <div class="act-desc">Resettable state, plus two classic signals bugs</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day3/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">3 Hands-On Tasks</div>
            <div class="act-desc">Binge level, budget, and a persistence teaser — on your own!</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🔁 Day 4 — Control Flow &amp; Two-Way Binding</h2>
      <p class="day-subheading">Render a real, filterable list of shows with &#64;for, &#64;if, &#64;switch, and [(ngModel)].</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day4/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone the end-of-Day-3 project, or copy the files by hand</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day4/act1">
          <div class="act-icon">🔁</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">A Real List</div>
            <div class="act-desc">A Show interface, a signal array, and &#64;for + track + &#64;empty</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day4/act2">
          <div class="act-icon">🚦</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Branching</div>
            <div class="act-desc">&#64;if / &#64;else and &#64;switch genre badges</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day4/act3">
          <div class="act-icon">🔍</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Two-Way Binding &amp; Debug It</div>
            <div class="act-desc">[(ngModel)], a live filter, &#64;defer, and three classic bugs</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day4/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">4 Hands-On Tasks</div>
            <div class="act-desc">Genre filter, ratings guard, result count, and a sort stretch</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🧭 Day 9 — Routing II: Params, Navigation, Guards &amp; Lazy Loading</h2>
      <p class="day-subheading">Continuing BingeBoard: deep-link to a show, navigate from code, protect a route, and stop shipping code nobody asked for.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day9/act1">
          <div class="act-icon">🔗</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">Route Params &amp; Input Binding</div>
            <div class="act-desc">One route, /show/:id, drives the detail page for every show</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day9/act2">
          <div class="act-icon">🚀</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Programmatic Navigation</div>
            <div class="act-desc">Router.navigate() when no link was clicked</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day9/act3">
          <div class="act-icon">🛡️</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Functional Guards</div>
            <div class="act-desc">CanActivateFn: return true, or redirect with a UrlTree</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day9/act4">
          <div class="act-icon">📦</div>
          <div class="act-info">
            <div class="act-num">Act 4</div>
            <div class="act-name">Lazy Loading</div>
            <div class="act-desc">loadComponent — verified live in the Network tab</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day9/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">4 Hands-On Tasks</div>
            <div class="act-desc">Prev/next nav, not-found UX, guard judgment, lazy-load everything</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🌐 Day 13 — HTTP I: Real Data from a Real API</h2>
      <p class="day-subheading">BingeBoard's hardcoded array dies today: real HttpClient calls, a typed &amp; adapted third-party API, loading/empty states, and the async bug everyone meets once.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day13/act1">
          <div class="act-icon">🌐</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">HttpClient &amp; the Mental Model</div>
            <div class="act-desc">provideHttpClient() — an Observable is a value that arrives later</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day13/act2">
          <div class="act-icon">🧩</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Typing &amp; Adapting the API</div>
            <div class="act-desc">The API's shape ≠ our app's shape — write the adapter once</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day13/act3">
          <div class="act-icon">🔍</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Browse Goes Live</div>
            <div class="act-desc">The loading / results / empty three-state pattern</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day13/act4">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Act 4</div>
            <div class="act-name">Detail Page Goes Live</div>
            <div class="act-desc">Real HTTP lookup by id, plus safely rendering third-party HTML</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day13/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">4 Hands-On Tasks</div>
            <div class="act-desc">Runtime reps, recent searches, a new endpoint solo, watchlist drift fix</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🚨 Day 14 — HTTP II: Errors, Resilience &amp; httpResource</h2>
      <p class="day-subheading">Networks fail on purpose today: honest error states, retry, and the newer declarative httpResource API.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day14/act1">
          <div class="act-icon">🚨</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">Errors in the Subscribe World</div>
            <div class="act-desc">An error signal, a retry button, and the 0/4xx/5xx taxonomy</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day14/act2">
          <div class="act-icon">📡</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">httpResource — The Declarative Way</div>
            <div class="act-desc">Loading, error, and refetch as signals — no ngOnInit, no subscribe</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day14/act3">
          <div class="act-icon">🐛</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Debug It</div>
            <div class="act-desc">A string vs. a function, deprecated subscribe style, the eternal spinner</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day14/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">4 Hands-On Tasks</div>
            <div class="act-desc">Graceful 404s, a second resource, skeleton screens, a docs-reading stretch</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🌊 Day 15 — RxJS I: Streams, Operators &amp; Living with Signals</h2>
      <p class="day-subheading">Observables were there all along. Today we open the box: streams, operators, subscriptions, and the toSignal bridge.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day15/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone-and-run starter, or copy the end-of-Day-14 files yourself</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day15/act1">
          <div class="act-icon">🌊</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">The Stream Mental Model</div>
            <div class="act-desc">Marble diagrams, a live leak demo, and the toSignal fix</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day15/act2">
          <div class="act-icon">🔀</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Operators in the Wild</div>
            <div class="act-desc">Two different maps, the async pipe, signals vs. Observables</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day15/act3">
          <div class="act-icon">🧭</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Router Streams &amp; Debug It</div>
            <div class="act-desc">paramMap as a stream, and the racing-timers bug</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day15/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">4 Hands-On Tasks</div>
            <div class="act-desc">A live ticker, a top-rated stream, a leak hunt, a keyboard shortcut</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🏁 Day 16 — RxJS II: switchMap &amp; the Live Search Every App Needs</h2>
      <p class="day-subheading">Every keystroke fires a request, and requests don't always finish in order. Today: the race condition, the canonical typeahead, and the operator family that fixes it.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day16/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone-and-run starter, or copy the end-of-Day-15 files yourself</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day16/act1">
          <div class="act-icon">🏁</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">The Race Condition</div>
            <div class="act-desc">Reproduce the classic search-as-you-type bug, then meet switchMap</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day16/act2">
          <div class="act-icon">🎯</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Building the Typeahead</div>
            <div class="act-desc">Subject, debounceTime, distinctUntilChanged, and the catchError trap</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day16/act3">
          <div class="act-icon">🗺️</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Operator Family &amp; Closing the Loop</div>
            <div class="act-desc">switchMap vs. concatMap/mergeMap/exhaustMap, and the nested-subscribe fix</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day16/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">4 Hands-On Tasks</div>
            <div class="act-desc">Minimum query length, a solo rebuild, a loading audit, an exhaustMap guard</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🎨 Day 17 — Pipes + The Great Refactor Lab</h2>
      <p class="day-subheading">A half-lecture day: built-in and custom pipes, fast — then the last breather before five days of Firebase, spent making your own BingeBoard feel finished.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day17/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone-and-run starter, or copy the end-of-Day-16 files yourself</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day17/act1">
          <div class="act-icon">🎨</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">Pipes on Real Data</div>
            <div class="act-desc">Built-in pipes, arguments, chaining, and why purity is cheap</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day17/act2">
          <div class="act-icon">🧪</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Writing Your Own Pipe</div>
            <div class="act-desc">A custom runtime pipe, the four-tool taxonomy, and a three-bug debug it</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day17/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">The Great Refactor Lab</div>
            <div class="act-desc">Pipes in anger, debt paydown, a polish sprint, and a pivot-decision stretch</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">☁️ Day 18 — Firebase I: A Real Database</h2>
      <p class="day-subheading">A real cloud database, without writing a server. Create your own Firebase project, wire AngularFire, and watch realtime sync happen with your own eyes.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day18/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone-and-run starter, or copy the end-of-Day-17 files yourself</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day18/act1">
          <div class="act-icon">☁️</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">Firebase, the Console, and Your Own Project</div>
            <div class="act-desc">The backend-as-a-service tradeoff, and hand-seeding your first collection</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day18/act2">
          <div class="act-icon">🔌</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Wiring AngularFire and Reading a Collection Live</div>
            <div class="act-desc">collection(), collectionData(), toSignal(), and rendering it on Home</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day18/act3">
          <div class="act-icon">⚡</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">The Realtime Moment, and Debug It</div>
            <div class="act-desc">Watch your app update itself live, then find three classic mistakes</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day18/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">A Second Collection, Solo</div>
            <div class="act-desc">Console fluency, a full solo rep with announcements, sorting, and a realtime flash</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🔧 Day 19 — Firebase II: Full CRUD</h2>
      <p class="day-subheading">The watchlist goes to the cloud — same public surface, entirely new internals. Create, Update, and Delete complete what Day 18 started.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day19/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone-and-run starter, or copy the end-of-Day-18 files yourself</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day19/act1">
          <div class="act-icon">📋</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">The Contract, and the Document Shape</div>
            <div class="act-desc">Read WatchlistService's public surface, then design WatchlistDoc up front</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day19/act2">
          <div class="act-icon">🔧</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">Rebuilding WatchlistService: Create, Read, Delete</div>
            <div class="act-desc">addDoc, a live signal mapped back to Show, and doc()-addressed deletion</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day19/act3">
          <div class="act-icon">✅</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Update, Proving the Contract, and Debug It</div>
            <div class="act-desc">updateDoc, a two-browser-windows realtime demo, and three classic bugs</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day19/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">Watched Toggles, and Reviews Built Solo</div>
            <div class="act-desc">A watched toggle, a Firestore-backed reviews feature from scratch, and optimistic UX</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
      </div>

      <h2 class="day-heading">🔍 Day 20 — Firebase III: Queries, Ordering, and a First Look at Security Rules</h2>
      <p class="day-subheading">Stop downloading whole collections just to throw most of it away — ask Firestore a narrow question instead, and read the rules that will eventually lock this app down.</p>
      <div class="act-cards">
        <div class="act-card" routerLink="/day20/start">
          <div class="act-icon">🎬</div>
          <div class="act-info">
            <div class="act-num">Starting Point</div>
            <div class="act-name">Get BingeBoard Running</div>
            <div class="act-desc">Clone-and-run starter, or copy the end-of-Day-19 files yourself</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day20/act1">
          <div class="act-icon">🔍</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">Queries — Filtering and Sorting on the Server</div>
            <div class="act-desc">Seed real review data, feel why "stream and filter" breaks at scale, build a real query</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day20/act2">
          <div class="act-icon">🧭</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">The Index Moment, and Query vs. Computed</div>
            <div class="act-desc">Trigger a real composite-index error on purpose, then build a query-vs-computed decision framework</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/day20/act3">
          <div class="act-icon">🔐</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">Security Rules — Read Before You Write, and Debug It</div>
            <div class="act-desc">Read your test-mode rule and tomorrow's destination rule, then fix a stale-query bug and a type-caught bug</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/day20/lab">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">Top-Rated Toggles, Curated Featured Shows, and a Count Badge</div>
            <div class="act-desc">A reactive top-rated filter, a curated featured-shows query, a count-only badge, and stretch pagination</div>
          </div>
          <span class="act-arrow">→</span>
        </div>

        <h2 class="day-heading">🔐 Day 21 — Firebase IV: Auth, Real Users, Private Watchlists, Locked Doors</h2>
        <p class="day-subheading">Give BingeBoard real identity, make every watchlist private, and replace test mode with server-enforced Firestore ownership rules.</p>
        <div class="act-cards">
          <div class="act-card" routerLink="/day21/start">
            <div class="act-icon">🎬</div>
            <div class="act-info">
              <div class="act-num">Starting Point</div>
              <div class="act-name">Get BingeBoard Running</div>
              <div class="act-desc">The end-of-Day-20 project, ready for Google auth and private data</div>
            </div>
            <span class="act-arrow">→</span>
          </div>
          <div class="act-card" routerLink="/day21/act1">
            <div class="act-icon">🔐</div>
            <div class="act-info">
              <div class="act-num">Act 1</div>
              <div class="act-name">Auth: Real Users</div>
              <div class="act-desc">Google sign-in, a user signal, and a header that follows auth state</div>
            </div>
            <span class="act-arrow">→</span>
          </div>
          <div class="act-card" routerLink="/day21/act2">
            <div class="act-icon">👤</div>
            <div class="act-info">
              <div class="act-num">Act 2</div>
              <div class="act-name">Private Watchlists and Guards</div>
              <div class="act-desc">Owner IDs, per-user streams, and protected navigation</div>
            </div>
            <span class="act-arrow">→</span>
          </div>
          <div class="act-card" routerLink="/day21/act3">
            <div class="act-icon">🛂</div>
            <div class="act-info">
              <div class="act-num">Act 3</div>
              <div class="act-name">Locked Doors and Debug It</div>
              <div class="act-desc">Firestore rules enforce the boundary Angular guards cannot</div>
            </div>
            <span class="act-arrow">→</span>
          </div>
          <div class="act-card lab" routerLink="/day21/lab">
            <div class="act-icon">🛠️</div>
            <div class="act-info">
              <div class="act-num">Student Lab</div>
              <div class="act-name">Authors, Nudges, and Return URLs</div>
              <div class="act-desc">Own reviews, make the sign-in path kind, and preserve where people were going</div>
            </div>
            <span class="act-arrow">→</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .landing { max-width: 860px; }

    .hero {
      text-align: center;
      padding: 48px 0 40px;
    }
    .hero-tag {
      display: inline-block;
      background: #1a2a3a;
      border: 1px solid #2a5070;
      color: #4fc3f7;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 4px 14px;
      border-radius: 20px;
      margin-bottom: 20px;
    }
    .hero-title { font-size: 2.8rem; line-height: 1.2; margin-bottom: 16px; }
    .accent { color: #4fc3f7; }
    .hero-subtitle { font-size: 16px; color: #858585; max-width: 560px; margin: 0 auto 32px; }
    .cta-btn { font-size: 16px; padding: 14px 32px; border-radius: 10px; }

    .lesson-map {
      background: #252526;
      border: 1px solid #3e3e42;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 32px;
    }
    .lesson-map h2 { margin-bottom: 20px; font-size: 16px; }
    .steps-row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .step-pill {
      background: #1e1e1e;
      border: 1px solid #3e3e42;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 13px;
      text-align: center;
      font-weight: 600;
      color: #cccccc;
      flex: 1;
      min-width: 120px;
    }
    .step-pill span { display: block; color: #4fc3f7; font-size: 12px; margin-top: 4px; }
    .step-pill small { display: block; color: #858585; font-weight: 400; font-size: 11px; margin-top: 2px; }
    .arrow { color: #858585; font-size: 20px; }

    .day-heading { font-size: 20px; margin: 40px 0 6px; }
    .day-subheading { color: #858585; font-size: 14px; margin-bottom: 20px; }
    .act-cards { display: flex; flex-direction: column; gap: 12px; }
    .act-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #252526;
      border: 1px solid #3e3e42;
      border-radius: 10px;
      padding: 18px 20px;
      cursor: pointer;
      transition: all 0.2s;
      text-decoration: none;
    }
    .act-card:hover { background: #2d2d30; border-color: #007acc; transform: translateX(4px); }
    .act-card.lab { border-color: #2a5c2a; }
    .act-card.lab:hover { border-color: #4ec9b0; }
    .act-icon { font-size: 28px; flex-shrink: 0; }
    .act-info { flex: 1; }
    .act-num { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #858585; }
    .act-name { font-size: 16px; font-weight: 700; color: #ffffff; margin: 2px 0; }
    .act-card.lab .act-name { color: #c3e88d; }
    .act-desc { font-size: 13px; color: #858585; }
    .act-arrow { color: #858585; font-size: 20px; }

    @media (max-width: 600px) {
      .hero-title { font-size: 2rem; }
      .steps-row { gap: 4px; }
      .arrow { display: none; }
    }
  `]
})
export class LandingComponent {
  overviewModels: MentalModel[] = [
    { concept: '@for', plainEnglish: '"Repeat this HTML box"', analogy: '🍪 A cookie cutter stamping out cookies' },
    { concept: 'track', plainEnglish: '"Label every item"', analogy: '🏷️ Luggage tags at the airport baggage belt' },
    { concept: '@if / @switch', plainEnglish: '"Show this ONLY when..."', analogy: '🚦 A light switch or traffic signal' },
    { concept: '[(ngModel)]', plainEnglish: '"Talk both ways"', analogy: '📟 A walkie-talkie between HTML and JavaScript' },
    { concept: 'computed()', plainEnglish: '"Auto-calculated answer"', analogy: '📊 An Excel formula (=SUM(A1:A5))' }
  ];
}
