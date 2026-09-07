import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day24-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 24 · Act 1 of 3</span>
        <h1>🧰 TestBed — A Tiny Angular App for Tests</h1>
        <p class="subtitle">Day 23 tested code that needed no neighbors at all. Today Angular assembles the neighbors for you — and, when a neighbor is inconvenient to test against for real, lets you swap it out.</p>
      </div>
      <div class="info-box"><strong>Before you start:</strong> confirm <code>npm test</code> still shows 5 files and 20 passing tests from <a routerLink="/day24/start">the Day 24 Starting Point</a>. Keep every test in this act DOM-free — Act 2 is where the browser shows up.</div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/testing/services" target="_blank" rel="noopener">testing services guide</a> and the <a href="https://angular.dev/guide/di/dependency-injection" target="_blank" rel="noopener">dependency injection guide</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Configure <code>TestBed</code> to build a fresh service instance per test, then override one of a service's real dependencies with a fake.</li><li><strong>Why It Matters:</strong> Dependency injection only pays off in tests the moment a test can hand your code a safe stand-in instead of a real Firestore connection or a real Google sign-in popup.</li><li><strong>Build Steps:</strong> Configure an empty TestBed → inject a zero-dependency signal service → provide a fake dependency for a service that has one.</li><li><strong>Expected Outcome:</strong> You can test a signal-based service in isolation, and explain — using Day 7's own words — why DI made that possible.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 1 (TestBed and Services)</p><p><strong>Next step:</strong> Act 2 (Component Contracts)</p><p><strong>Time:</strong> About 25 minutes.</p></section>

      <app-lesson-step stepId="d24-act1-testbed-service" [stepNumber]="1" title="Configure TestBed, Then Test a Zero-Dependency Service">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>TestBed</code> is not a second browser. It is a small Angular environment that can run real dependency injection for one test at a time, then throw the whole thing away before the next test starts. <code>RecentlyViewedService</code> is the simplest possible thing to point it at: a <code>signal&lt;Show[]&gt;</code>, no constructor arguments, nothing to fake yet.</p>
        <app-code-block lang="typescript" [code]="serviceSpecCode" />
        <p><code>TestBed.configureTestingModule(&#123;&#125;)</code> with an empty options object is still doing real work — it resets Angular's testing injector so <code>TestBed.inject(RecentlyViewedService)</code> hands back a brand-new instance, not one left over from a previous test.</p>
        <div class="think-about-it"><p class="tai-q">Why should every test receive a fresh service instance instead of sharing one across the whole file?</p></div>
        <app-collapsible icon="✅" label="Show Answer — shared state makes test order matter"><p>A service instance shared across tests can carry recorded state from an earlier example into a later one, so a test's outcome quietly depends on which test happened to run first. Calling <code>TestBed.configureTestingModule</code> again inside <code>beforeEach</code> gives every test a clean, disposable instance — the same discipline Day 23 Act 3's leaked-fake-timers bug was really about, just applied to a whole DI-built object instead of one mocked clock.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A passing spec that proves <code>RecentlyViewedService</code>'s recency, no-duplicates, and five-item-cap rules, using nothing but <code>TestBed.inject()</code>.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-act1-di-fake" [stepNumber]="2" title="Provide a Fake Dependency with useValue">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Day 7 made a promise about why dependency injection was worth learning at all: <em>"Tests can swap it — no network, no localStorage, instant. A hard <code>import</code> cannot be intercepted. Day 24 does exactly this."</em> This step is that exact payoff. <code>hasWatchlistGuard</code> (Day 9 Act 3) calls <code>inject(WatchlistService)</code> — in a test, <code>TestBed</code> can hand it a fake instead of the real, Firestore-backed one.</p>
        <app-code-block lang="typescript" [code]="fakeDependencyCode" />
        <p><code>&#123; provide: WatchlistService, useValue: fakeWatchlist &#125;</code> means "whenever anything asks the injector for that token, hand back this plain object instead." <code>TestBed.runInInjectionContext</code> lets a bare function like a guard call <code>inject()</code> the same way a component or service would, without needing a real component around it.</p>
        <div class="think-about-it"><p class="tai-q">Should you ever fake the exact service under test, the one the whole spec file exists to prove?</p></div>
        <app-collapsible icon="✅" label="Show Answer — fake the neighbor, never the resident"><p>No — keep the thing under test real, and replace only what it depends on. <code>hasWatchlistGuard</code> stays the genuine, imported function; only its neighbor, <code>WatchlistService</code>, gets swapped for a fake. Faking the resident instead of the neighbor would make the test prove that a fake behaves like a fake — which tells you nothing about whether your actual code works.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Two passing cases — an empty watchlist redirects home, a non-empty one allows navigation — with zero real Firestore reads. You can recite Day 7's line about swappable dependencies and point at the exact provider override that makes it true.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day24/start" class="btn-secondary">← Day 24 Starting Point</a><a routerLink="/day24/act2" class="btn-primary">Act 2: Component Contracts →</a></div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: 'TestBed', plainEnglish: 'A small Angular environment that can build providers, services, and components for one test at a time.', analogy: '🧪 A tabletop model of the real application, assembled fresh for every experiment.' },
    { concept: 'fresh instance per test', plainEnglish: 'Reconfiguring TestBed before every test so no state survives from the previous one.', analogy: '🧼 Wiping the workbench clean before the next experiment starts.' },
    { concept: 'provider override (useValue)', plainEnglish: 'A DI instruction that substitutes a plain fake object for whatever a real token would normally provide.', analogy: '🔌 Plugging a safe practice dummy into the same socket a live wire would use.' },
    { concept: 'runInInjectionContext', plainEnglish: 'Lets a bare function call inject() as if it were running inside a component or service.', analogy: '🎭 Handing a stand-in actor the same script cues the real performer would get.' }
  ];
  serviceSpecCode = `import { TestBed } from '@angular/core/testing';
import { RecentlyViewedService } from './recently-viewed.service';
import { Show } from '../models/show';

function mockShow(id: number): Show {
  return { id, name: \`Show \${id}\`, genre: 'Drama', rating: 8, imageUrl: '', summary: '', runtime: 30 };
}

describe('RecentlyViewedService', () => {
  let svc: RecentlyViewedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(RecentlyViewedService);
  });

  it('keeps the newest show first and removes duplicates', () => {
    svc.record(mockShow(1));
    svc.record(mockShow(2));
    svc.record(mockShow(1));
    expect(svc.recent().map(s => s.id)).toEqual([1, 2]);
  });

  it('keeps only the last five', () => {
    for (let id = 1; id <= 7; id++) svc.record(mockShow(id));
    expect(svc.recent()).toHaveLength(5);
  });
});`;
  fakeDependencyCode = `import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';
import { hasWatchlistGuard } from './watchlist.guard';
import { WatchlistService } from '../watchlist.service';

describe('hasWatchlistGuard', () => {
  const fakeCount = signal(0);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: WatchlistService, useValue: { count: fakeCount } },
      ],
    });
  });

  it('redirects home when the watchlist is empty', () => {
    fakeCount.set(0);
    const result = TestBed.runInInjectionContext(() => hasWatchlistGuard({} as any, {} as any));
    const router = TestBed.inject(Router);
    expect(result).toEqual(router.createUrlTree(['/']));
  });

  it('allows navigation once the watchlist has entries', () => {
    fakeCount.set(2);
    const result = TestBed.runInInjectionContext(() => hasWatchlistGuard({} as any, {} as any));
    expect(result).toBe(true);
  });
});`;
}
