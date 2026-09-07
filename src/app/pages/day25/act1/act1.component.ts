import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day25-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 25 · Act 1 of 2</span><h1>🗺️ Coverage as a Map, Risk as a Compass</h1><p class="subtitle">You already know how to write a test. Today's question is different: out of everything BingeBoard does, what should you test next, and how do you know when you've tested enough?</p></div>
      <div class="info-box"><strong>Before you start:</strong> confirm <code>npm test</code> passes from <a routerLink="/day25/start">the Day 25 Starting Point</a>. You'll read its coverage report, not write new production code, in this act.</div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> the <a href="https://vitest.dev/guide/coverage" target="_blank" rel="noopener">Vitest coverage guide</a> and Martin Fowler's <a href="https://martinfowler.com/bliki/TestPyramid.html" target="_blank" rel="noopener">Test Pyramid</a> write-up.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Read a coverage report as a map of the untested, rank real BingeBoard code by risk, and write a short test plan.</li><li><strong>Why It Matters:</strong> You cannot test everything before a deadline. Deciding what to test first is its own skill, separate from knowing how to write a test.</li><li><strong>Build Steps:</strong> Read a coverage report → sort risk with the testing pyramid → write a test plan → fake a neighbor and spy on a call.</li><li><strong>Expected Outcome:</strong> You can produce a short, real test plan for BingeBoard and defend one entry in it.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 1 (Coverage, Risk, and a Test Plan)</p><p><strong>Next step:</strong> Act 2 (Capstone Kickoff)</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d25-act1-coverage-map" [stepNumber]="1" title="Read Coverage as a Map, Not a Score">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>Run the coverage command against the Day 25 Starting Point (Day 23's stretch task introduced this same flag):</p>
        <app-code-block lang="bash" [code]="coverageCommand" />
        <p>The report that comes back shows four percentages per file — statements, branches, functions, lines — and highlights which exact lines never ran during any test. Read it as a map of the places you have not looked yet, not as a grade on the code's quality.</p>
        <app-code-block lang="text" [code]="coverageSample" />
        <div class="think-about-it"><p class="tai-q">If a file shows 100% line coverage, does that guarantee no bugs live in it?</p></div>
        <app-collapsible icon="✅" label="Show Answer — coverage counts execution, not correctness"><p>100% line coverage only means every line ran at least once somewhere in the suite. It says nothing about whether the assertion checked the right thing, or whether every input that matters was tried. Day 23's lying assertion could sit inside a 100%-covered file and coverage would never flag it — that's a job for the assertion itself, not the coverage tool.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Run coverage against your own project and name one file whose gap surprised you. You can explain the difference between "covered" and "correct."</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-act1-pyramid-triage" [stepNumber]="2" title="Sort BingeBoard's Risk with the Testing Pyramid">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>The testing pyramid says: write many small, fast unit tests, fewer component/integration tests, and very few slow end-to-end tests. Risk triage adds a second axis — rank each untested piece by how likely it is to break and how bad it would be if it broke silently, the same way an emergency room treats the worst case first, not the first to arrive.</p>
        <app-code-block lang="text" [code]="riskTable" />
        <div class="think-about-it"><p class="tai-q">Why does <code>ShowsService</code>'s adapter logic rank higher risk than a page's CSS class binding?</p></div>
        <app-collapsible icon="✅" label="Show Answer — silent data corruption beats a visible style bug"><p>A wrong CSS class is obvious the moment you look at the page. A wrong <code>rating</code> or <code>runtime</code> mapping can silently show every visitor a false number for months before anyone notices — that combination of "hard to notice" and "affects everyone" is exactly what risk triage is built to catch before it ships.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Rank at least five real pieces of your own project by risk, and assign each one a pyramid layer (unit, component, or HTTP). You can justify the top of your list in a written note to yourself.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-act1-test-plan" [stepNumber]="3" title="Write a Real BingeBoard Test Plan">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>A test plan is a short table, not a document nobody reads: target, risk, layer, and one specific behavior to assert. It turns "I should write more tests" into a queue you can actually work through.</p>
        <app-code-block lang="text" [code]="testPlanExample" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Write your own test plan naming at least four real files from your project, each with one concrete behavior to assert. You can hand this table to yourself next week and know exactly where to start.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d25-act1-reviewform-spy" [stepNumber]="4" title="Worked Example — Testing the Review Form's Submit">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Show Detail's review form calls <code>submitReview()</code>, which reads two DOM values and calls <code>reviewsSvc.add(showId, text, rating)</code>. Faking <code>ReviewsService</code> and watching that call is enough to prove the form's contract — no Firestore write required.</p>
        <app-code-block lang="typescript" [code]="reviewFormSpecCode" />
        <p>A <strong>spy</strong> is a fake function that also remembers whether, how many times, and with what arguments it was called. <code>vi.fn()</code> is Vitest's spy constructor; <code>toHaveBeenCalledWith(...)</code> reads its call history. This is a "runner drift" spot: on the Karma/Jasmine engine mentioned back in Day 23 Act 1, the same idea is spelled <code>jasmine.createSpy('add')</code> or <code>spyOn(realService, 'add')</code> instead. Same concept, same assertion shape, different constructor name — check which runner an example online is using before assuming your own spy syntax is wrong.</p>
        <div class="think-about-it"><p class="tai-q">Why fake <code>ReviewsService</code> here instead of letting the test write to real Firestore?</p></div>
        <app-collapsible icon="✅" label="Show Answer — fake the neighbor, keep the resident real"><p>Day 24 Act 1's rule still applies: <code>ShowDetail</code>'s own logic — reading the two form values and calling <code>add()</code> with them — is what this test is proving. <code>ReviewsService</code> is a neighbor. Faking it keeps the test fast, offline, and free of leftover documents in a real database.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A passing spec proves <code>submitReview()</code> calls <code>reviewsSvc.add()</code> with the trimmed text and numeric rating. You can write a spy-based assertion and explain runner drift if it comes up.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day25/start" class="btn-secondary">← Day 25 Starting Point</a><a routerLink="/day25/act2" class="btn-primary">Act 2: Capstone Kickoff →</a></div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: 'code coverage', plainEnglish: 'A report showing which lines and branches actually ran while the test suite executed.', analogy: '🔦 A lit floor plan showing which rooms you have walked through, not which rooms are safe.' },
    { concept: 'testing pyramid', plainEnglish: 'Many fast unit tests, fewer component or integration tests, and very few slow end-to-end tests.', analogy: '🍽️ A food pyramid, but for how much confidence each test layer buys you per minute it costs.' },
    { concept: 'risk triage', plainEnglish: 'Ranking untested code by how likely it is to break and how bad it would be if it broke silently.', analogy: '🚑 An emergency room treating the worst case first, not whoever walked in first.' },
    { concept: 'spy', plainEnglish: 'A fake function that also remembers whether, how often, and with what arguments it was called.', analogy: '🛎️ A doorman who logs everyone who walks in but never actually opens the door himself.' }
  ];
  coverageCommand = `ng test -- --coverage`;
  coverageSample = `File                        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Lines
----------------------------|---------|----------|---------|---------|----------------
core/shows.service.ts        |   71.4  |   50.0   |  66.7   |  71.4   | 24-27
core/watchlist.service.ts    |   40.0  |   25.0   |  33.3   |  40.0   | 55-70,78-83
shared/show-card.ts          |   62.5  |   50.0   |  50.0   |  62.5   | 41-46
utils/binge-level.ts         |  100.0  |  100.0   | 100.0   | 100.0   | -`;
  riskTable = `Target                              | Likely to break? | Damage if silent?      | Pyramid layer
------------------------------------|------------------|------------------------|----------------
ShowsService adapter (toShow)        | Medium           | High (wrong data, everywhere) | Unit
WatchlistService add/remove          | Medium           | High (lost user data)  | Unit + HTTP
signedInGuard redirect                | Low              | High (broken auth flow) | Unit (guard)
ShowCard watchlist button             | Medium           | Medium (one card wrong) | Component
Browse's debounced search pipeline    | High             | Medium (annoying, visible) | Component/HTTP
A page's CSS class binding            | Low              | Low (cosmetic, visible immediately) | Skip for now`;
  testPlanExample = `Target file                    | Risk (why)                          | Layer     | Behavior to assert
--------------------------------|--------------------------------------|-----------|--------------------
core/shows.service.ts           | Wrong rating/runtime shown to everyone | Unit      | byId() maps a null rating to 0
core/watchlist.service.ts       | Users lose saved shows silently        | Unit+HTTP | remove() calls deleteDoc with the right docId
shared/show-card.ts             | Wrong button shown for wrong auth state | Component | Signed-out visitor sees "Sign in to save"
core/guards/auth.guard.ts       | A broken redirect locks out real users | Unit      | Signed-out visitor's UrlTree keeps returnUrl`;
  reviewFormSpecCode = `const fakeReviews = { add: vi.fn(), delete: vi.fn(), forShow: () => () => [] };

beforeEach(() => {
  TestBed.configureTestingModule({
    imports: [ShowDetail],
    providers: [
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: '1' }) } } },
      { provide: ReviewsService, useValue: fakeReviews },
      { provide: AuthService, useValue: fakeAuth },
    ],
  });
  fixture = TestBed.createComponent(ShowDetail);
  fixture.componentRef.setInput('id', '1');
  fixture.detectChanges();
});

it('submits the trimmed text and numeric rating', () => {
  const textarea = fixture.nativeElement.querySelector('textarea');
  const ratingInput = fixture.nativeElement.querySelector('input[type=number]');
  textarea.value = '  Great binge, would recommend.  '.trim();
  ratingInput.value = '9';
  fixture.nativeElement.querySelector('form').dispatchEvent(new Event('submit'));

  expect(fakeReviews.add).toHaveBeenCalledWith(1, 'Great binge, would recommend.', 9);
});`;
}
