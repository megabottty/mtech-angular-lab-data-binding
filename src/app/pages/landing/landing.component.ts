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

      <h2 class="day-heading">📘 Day 5 — Control Flow &amp; Two-Way Binding</h2>
      <div class="act-cards">
        <div class="act-card" routerLink="/lesson/1">
          <div class="act-icon">🔁</div>
          <div class="act-info">
            <div class="act-num">Act 1</div>
            <div class="act-name">&#64;for &amp; track</div>
            <div class="act-desc">Display lists without writing HTML 100 times</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/lesson/2">
          <div class="act-icon">🚦</div>
          <div class="act-info">
            <div class="act-num">Act 2</div>
            <div class="act-name">&#64;if &amp; &#64;switch</div>
            <div class="act-desc">Show elements only when conditions are met</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/lesson/3">
          <div class="act-icon">📡</div>
          <div class="act-info">
            <div class="act-num">Act 3</div>
            <div class="act-name">[(ngModel)]</div>
            <div class="act-desc">Two-way communication between HTML and JavaScript</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card" routerLink="/lesson/4">
          <div class="act-icon">⚡</div>
          <div class="act-info">
            <div class="act-num">Act 4</div>
            <div class="act-name">computed()</div>
            <div class="act-desc">Auto-calculated values that update themselves</div>
          </div>
          <span class="act-arrow">→</span>
        </div>
        <div class="act-card lab" routerLink="/lesson/5">
          <div class="act-icon">🛠️</div>
          <div class="act-info">
            <div class="act-num">Student Lab</div>
            <div class="act-name">3 Hands-On Tasks</div>
            <div class="act-desc">Build the full TV show filter — on your own!</div>
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
