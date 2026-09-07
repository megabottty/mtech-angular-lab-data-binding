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
      <div class="page-header"><span class="act-label">Day 24 · Act 1 of 3</span><h1>🧰 TestBed — A Tiny Angular App for Tests</h1><p class="subtitle">Yesterday you tested residents that needed no neighbors. Today Angular assembles the neighbors for you, then lets you replace them safely.</p></div>
      <div class="info-box"><strong>Before you start:</strong> confirm <code>ng test</code> works from <a routerLink="/day24/start">the Day 24 Starting Point</a>. Keep today's tests DOM-free until Act 2.</div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/testing/services" target="_blank" rel="noopener">service testing guide</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Use TestBed to create a fresh service and replace an injected dependency with a fake.</li><li><strong>Why It Matters:</strong> DI only pays off when a test can hand your code a safe stand-in instead of opening a popup or database connection.</li><li><strong>Build Steps:</strong> Configure TestBed → inject a signal service → provide a fake AuthService.</li><li><strong>Expected Outcome:</strong> You can test service rules without constructing or contacting their real dependencies.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 1 (TestBed and Services)</p><p><strong>Next step:</strong> Act 2 (Component Contracts)</p><p><strong>Time:</strong> About 25 minutes.</p></section>

      <app-lesson-step stepId="d24-act1-testbed-service" [stepNumber]="1" title="Create a Fresh Service with TestBed">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p><code>TestBed</code> is not a magical second browser. It is a small Angular testing environment that can run DI and lifecycle code without starting the whole application.</p>
        <app-code-block lang="typescript" [code]="serviceSpecCode" />
        <div class="think-about-it"><p class="tai-q">Why should every test receive a fresh service instead of sharing one instance?</p></div>
        <app-collapsible icon="✅" label="Show Answer — shared state makes order matter"><p>A shared service can retain records from an earlier test, so a test passes or fails based on which test ran first. <code>beforeEach</code> creates a new instance for every example; isolated tests are repeatable tests.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Configure TestBed, inject a service, and assert its recency, dedupe, and five-item cap rules. You can explain why a fresh fixture matters.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-act1-di-fake" [stepNumber]="2" title="Replace a Dependency with useValue">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Day 7 promised that DI would make dependencies replaceable. This is the payoff: when code asks for <code>AuthService</code>, the test can hand it a tiny object instead.</p>
        <app-code-block lang="typescript" [code]="fakeDependencyCode" />
        <p><code>&#123; provide: AuthService, useValue: fakeAuth &#125;</code> means "use this object whenever anyone asks for that token." There is no Google popup, persisted session, or network call.</p>
        <div class="think-about-it"><p class="tai-q">What should you fake: the service under test, or the service it depends on?</p></div>
        <app-collapsible icon="✅" label="Show Answer — fake the neighbor, test the resident"><p>Keep the service under test real. Replace only its neighbors, such as AuthService or ReviewsService, with predictable fakes. Otherwise the test proves that the fake behaves like the fake, not that your application logic works.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Provide a fake AuthService and assert a GreetingService signal. You can connect DI's design promise directly to deterministic tests.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day24/start" class="btn-secondary">← Day 24 Starting Point</a><a routerLink="/day24/act2" class="btn-primary">Act 2: Component Contracts →</a></div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: 'TestBed', plainEnglish: 'A small Angular environment that can assemble providers and components for one test.', analogy: '🧪 A tabletop version of the application laboratory.' },
    { concept: 'fixture', plainEnglish: 'The test handle for a component instance and its rendered DOM.', analogy: '🧰 A case containing both the machine and the inspection window.' },
    { concept: 'provider override', plainEnglish: 'A DI instruction that substitutes a fake value for a real token.', analogy: '🔌 Plugging a safe simulator into the same socket.' },
    { concept: 'test isolation', plainEnglish: 'Each example starts with fresh state and does not depend on test order.', analogy: '🧼 Washing the workbench before every experiment.' }
  ];
  serviceSpecCode = `import { TestBed } from '@angular/core/testing';

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
    expect(svc.recent().map(show => show.id)).toEqual([1, 2]);
  });

  it('keeps only the last five', () => {
    for (let id = 1; id <= 7; id++) svc.record(mockShow(id));
    expect(svc.recent()).toHaveLength(5);
  });
});`;
  fakeDependencyCode = `const fakeAuth = {
  user: signal({ uid: 'u1', displayName: 'Ada' } as User),
  isLoggedIn: signal(true),
};

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      { provide: AuthService, useValue: fakeAuth },
    ],
  });
  svc = TestBed.inject(GreetingService);
});

it('greets the signed-in user', () => {
  expect(svc.greeting()).toBe('Welcome back, Ada');
});`;
}
