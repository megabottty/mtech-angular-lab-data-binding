import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day24-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 24 · Act 3 of 3</span>
        <h1>🌐 HttpTestingController — The Network in a Pen</h1>
        <p class="subtitle">Your HTTP test owns both ends of the request: expect what left your code, then flush the exact response you choose. Then: three real bugs that never throw a compiler error.</p>
      </div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/http/testing" target="_blank" rel="noopener">HTTP testing guide</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Test <code>ShowsService.search()</code>'s TVMaze mapping and its unhandled error path with <code>HttpTestingController</code>, then recognize three common component-test mistakes from their symptoms alone.</li><li><strong>Why It Matters:</strong> A canned response makes a rare TVMaze outage as repeatable as a happy path. And a test suite is only useful if you can tell a real failure from your own test being wrong.</li><li><strong>Build Steps:</strong> Provide the testing backend → expect a request and flush a success → flush a failure and inspect the error → debug three broken component specs.</li><li><strong>Expected Outcome:</strong> You can test both HTTP outcomes without a network, and diagnose a missing <code>setInput</code>, a missing <code>detectChanges</code>, and a wrong selector on sight.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 3 (HttpTestingController + Debugging)</p><p><strong>Next step:</strong> Student Lab — Fake the World, Test the Contract</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d24-act3-http-happy-path" [stepNumber]="1" title="Expect One Request, Flush a Response, Assert the Mapping">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>ShowsService.search()</code> (Day 15) makes a real <code>HttpClient</code> call and pipes the result through <code>toShow()</code>. <code>provideHttpClientTesting()</code> replaces the real backend with one your test controls completely.</p>
        <app-code-block lang="typescript" [code]="httpHappyPathCode" />
        <p><code>expectOne</code> catches the exact request your code sent and fails the test immediately if zero or more than one request matches. <code>flush</code> plays the server, handing back whatever JSON you choose. <code>afterEach(() =&gt; httpMock.verify())</code> fails the test if any request was never flushed — an HTTP call your code fired and forgot is a real bug, not a shrug.</p>
        <div class="think-about-it"><p class="tai-q">Why assert on <code>result[0].rating</code>, rather than just checking that <code>result</code> is defined?</p></div>
        <app-collapsible icon="✅" label="Show Answer — test the adapter's promise, not just that something came back"><p><code>ShowsService</code>'s whole job is translating TVMaze's shape — including a <code>rating.average</code> that can be <code>null</code> — into the app's own <code>Show</code> model. Asserting <code>rating: 0</code> against a fixture with <code>average: null</code> proves that translation actually happened. Asserting only that <code>result</code> exists would pass even if the mapping silently returned the raw TVMaze object untouched.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A passing spec that expects one GET request, flushes a canned TVMaze payload, and asserts the mapped <code>Show</code> — including its null-safe defaults.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-act3-http-error-debug" [stepNumber]="2" title="Flush a Failure and Inspect What Comes Back">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>ShowsService.search()</code> has no <code>catchError</code> of its own — a failed request comes out the other end as a real RxJS error, and it is the caller's job (Browse's <code>catchError</code>, which the Lab covers next) to recover from it. Prove that shape directly first.</p>
        <app-code-block lang="typescript" [code]="httpErrorCode" />
        <p>The object <code>flush()</code> hands to a failed request's <code>error</code> callback is a real <code>HttpErrorResponse</code>, with a <code>status</code> your test can assert on directly — not a generic <code>Error</code> you have to string-match.</p>
        <div class="think-about-it"><p class="tai-q">What does <code>httpMock.verify()</code> catch here that this test's own assertion could miss on its own?</p></div>
        <app-collapsible icon="✅" label="Show Answer — a passing assertion can coexist with a leaked request"><p>A test can pass its one visible assertion while a second, unrelated request from the same code path sits unflushed and forgotten. <code>verify()</code> fails the moment any expected request wasn't matched and flushed, turning an accidental extra network call — or a request your service fires but your test never expected — into a visible failure instead of silent noise.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A passing spec that flushes a 500 response and asserts the resulting <code>HttpErrorResponse</code>'s <code>status</code>, with <code>httpMock.verify()</code> confirming nothing leaked.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-act3-debug-component-tests" [stepNumber]="3" title="Debug It — Three Component Specs That Break Quietly">
        <p><span class="effort-tag effort-hard">Effort: Hard</span></p>
        <p>All three of these are real mistakes against Act 2's own <code>ShowCard</code> spec — verified by actually running them. None of the three produces a TypeScript compiler error.</p>
        <app-code-block lang="typescript" [code]="bugAMissingSetInput" />
        <app-code-block lang="text" [code]="bugAOutput" />
        <p><strong>Bug A</strong> — <code>show</code> is a required signal <code>input()</code>. Calling <code>detectChanges()</code> before <code>setInput()</code> forces Angular to read that input before any value exists, and it throws immediately with an error code you can look up.</p>
        <app-code-block lang="typescript" [code]="bugBMissingDetectChanges" />
        <app-code-block lang="text" [code]="bugBOutput" />
        <p><strong>Bug B</strong> — the element genuinely exists this time (<code>createComponent</code> builds the initial DOM structure eagerly), but its text content is still the empty string <code>fixture.nativeElement.querySelector('.show-title')?.textContent</code> reads <code>""</code>, because <code>{{ "{{ show().name }}" }}</code> is a binding, and bindings only get written to the DOM the next time change detection runs.</p>
        <app-code-block lang="typescript" [code]="bugCWrongSelector" />
        <app-code-block lang="text" [code]="bugCOutput" />
        <p><strong>Bug C</strong> — this is Act 2's own think-about-it, now as a crash instead of a hint: <code>ShowCard</code>'s real markup has no <code>&lt;h3&gt;</code> anywhere, so the query returns <code>null</code>, and reading <code>.textContent</code> off <code>null</code> without <code>?.</code> throws a plain <code>TypeError</code> before the assertion ever runs.</p>
        <div class="think-about-it"><p class="tai-q">Bugs A and C both crash with a thrown error rather than a failed assertion. Why is that better than Bug B's behavior, not worse?</p></div>
        <app-collapsible icon="✅" label="Show Answer — a loud crash still points at the truth"><p>All three are real problems, but A and C fail impossible to miss and impossible to misread — the stack trace names the exact missing input or the exact <code>null</code> read. Bug B is the dangerous one precisely because it doesn't crash: if your assertion had been looser (say, <code>toBeDefined()</code> instead of <code>toContain('Severance')</code>), an empty string would have quietly passed, and you'd have shipped a test that never actually checked the render. A crash that names the problem is a gift compared to a green checkmark that's lying.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Given any of these three failure messages cold, you can name which of the three mistakes produced it without re-reading this page.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day24/act2" class="btn-secondary">← Act 2: Component Contracts</a><a routerLink="/day24/lab" class="btn-primary">Student Lab: Fake the World →</a></div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    { concept: 'testing backend', plainEnglish: 'An HTTP backend that records every request instead of sending it anywhere real.', analogy: '📮 A mailroom that holds every letter until you decide what reply arrives.' },
    { concept: 'expectOne', plainEnglish: 'An assertion that exactly one request matches a given URL or predicate.', analogy: '🔎 Finding one specific envelope in the mailroom and confirming there is only one.' },
    { concept: 'flush', plainEnglish: 'The test-controlled response handed back to the code under test.', analogy: '📨 Handing a chosen reply back through the slot, good news or bad.' },
    { concept: 'a crash vs. a lying test', plainEnglish: 'A thrown error names the exact problem; a too-loose assertion can pass while checking nothing.', analogy: '🚨 A smoke detector that goes off vs. one with a dead battery that just hangs there silently.' }
  ];
  httpHappyPathCode = `import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ShowsService } from './shows.service';
import { Show } from '../models/show';

describe('ShowsService', () => {
  let svc: ShowsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    svc = TestBed.inject(ShowsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('maps TVMaze search results into Shows', () => {
    let result: Show[] = [];
    svc.search('office').subscribe(shows => (result = shows));

    const req = httpMock.expectOne(r => r.url.includes('/search/shows'));
    expect(req.request.method).toBe('GET');
    req.flush([{
      score: 1,
      show: {
        id: 1, name: 'The Office', genres: [],
        rating: { average: null }, image: null,
        summary: null, runtime: null,
      },
    }]);

    expect(result[0].name).toBe('The Office');
    expect(result[0].genre).toBe('Unknown');
    expect(result[0].rating).toBe(0);
  });
});`;
  httpErrorCode = `it('propagates a 500 as a real HttpErrorResponse', () => {
  let caught: unknown;
  svc.search('office').subscribe({ error: err => (caught = err) });

  const req = httpMock.expectOne(r => r.url.includes('/search/shows'));
  req.flush('boom', { status: 500, statusText: 'Server Error' });

  expect((caught as { status: number }).status).toBe(500);
});`;
  bugAMissingSetInput = `// BUG A -- forgot setInput before detectChanges
fixture = TestBed.createComponent(ShowCard);
fixture.detectChanges(); // show() has no value yet`;
  bugAOutput = `NG0950: Input "show" is required but no value is available yet.
Find more at https://angular.dev/errors/NG0950
 ❯ _ShowCard.inputValueFn [as show]
 ❯ ShowCard_Template src/app/shared/show-card.ts:20:10`;
  bugBMissingDetectChanges = `// BUG B -- set the input but never called detectChanges
fixture.componentRef.setInput('show', mockShow);
const el = fixture.nativeElement.querySelector('.show-title');
expect(el?.textContent).toContain('Severance');`;
  bugBOutput = `AssertionError: expected '' to contain 'Severance'

- Expected
+ Received

- Severance
+ `;
  bugCWrongSelector = `// BUG C -- assumed a heading tag that this component doesn't render
fixture.componentRef.setInput('show', mockShow);
fixture.detectChanges();
const el = fixture.nativeElement.querySelector('h3');
expect(el.textContent).toContain('Severance'); // no ?. either`;
  bugCOutput = `TypeError: Cannot read properties of null (reading 'textContent')
 ❯ src/app/shared/show-card.spec.ts:41:43`;
}
