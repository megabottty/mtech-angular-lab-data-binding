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
      <div class="page-header"><span class="act-label">Day 24 · Act 3 of 3</span><h1>🌐 HttpTestingController — The Network in a Pen</h1><p class="subtitle">Your HTTP test owns both ends of the request: expect what left your code, then flush the response you choose.</p></div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/http/testing" target="_blank" rel="noopener">HTTP testing guide</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Test an HTTP mapping and error path without a network connection.</li><li><strong>Why It Matters:</strong> Canned responses make sad paths repeatable instead of waiting for a remote server to fail.</li><li><strong>Build Steps:</strong> Provide the testing backend → expect a request → flush success or failure → verify no requests leaked.</li><li><strong>Expected Outcome:</strong> You can test both data mapping and a 500 response with HttpTestingController.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 3 (HTTP Without a Network)</p><p><strong>Next step:</strong> Student Lab — Service and Component Contracts</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d24-act3-http-happy-path" [stepNumber]="1" title="Expect One Request and Flush a Response">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <app-code-block lang="typescript" [code]="httpSpecCode" />
        <p><code>provideHttpClientTesting()</code> replaces the real backend. <code>expectOne</code> catches the request; <code>flush</code> plays the server; <code>verify</code> checks that no unexpected request escaped.</p>
        <div class="think-about-it"><p class="tai-q">Why assert <code>rating</code> after <code>flush</code>, instead of asserting the raw TVMaze object?</p></div>
        <app-collapsible icon="✅" label="Show Answer — test the adapter's promise"><p>The service's job is to translate TVMaze's shape and null rules into the app's <code>Show</code> model. Asserting <code>rating: 0</code> proves that promise; asserting the raw fixture would only prove that the fixture contained a value.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Expect a GET request, flush a fake response, and assert the mapped Show. You can control both sides of an HTTP test.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-act3-http-error-debug" [stepNumber]="2" title="Make the Error Path Observable">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <app-code-block lang="typescript" [code]="httpErrorCode" />
        <p>Use the same mechanism to prove a 500 does not leave an eternal spinner. The exact signal or error field depends on your service, but the test shape is stable: start, flush failure, assert loading is false and an error is present.</p>
        <div class="think-about-it"><p class="tai-q">What does <code>httpMock.verify()</code> catch that a successful assertion can miss?</p></div>
        <app-collapsible icon="✅" label="Show Answer — leaked requests become failures"><p>A test can pass its main assertion while a second request remains pending. <code>verify()</code> fails when any request was not handled, turning accidental network traffic or a missing flush into a visible regression.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Flush a 500 response and assert the error state plus cleared loading state. You can keep an HTTP error from silently becoming a spinner forever.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day24/act2" class="btn-secondary">← Act 2: Component Contracts</a><a routerLink="/day24/lab" class="btn-primary">Student Lab: Fake the World →</a></div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    { concept: 'testing backend', plainEnglish: 'An HTTP backend that records requests instead of contacting the network.', analogy: '📮 A mailroom holding every letter until you decide what arrives.' },
    { concept: 'expectOne', plainEnglish: 'An assertion that exactly one request matches a URL or predicate.', analogy: '🔎 Finding one specific envelope in the mailroom.' },
    { concept: 'flush', plainEnglish: 'The test-controlled response sent back to the code under test.', analogy: '📨 Handing the reply back through the slot.' },
    { concept: 'verify', plainEnglish: 'A final check that no unexpected HTTP requests remain pending.', analogy: '🧹 Closing the mailroom only after every envelope is accounted for.' }
  ];
  httpSpecCode = `beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting()],
  });
  svc = TestBed.inject(ShowsService);
  httpMock = TestBed.inject(HttpTestingController);
});

it('maps TVMaze results into Shows', () => {
  let result: Show[] = [];
  svc.search('office').subscribe(shows => (result = shows));

  const req = httpMock.expectOne(r =>
    r.url.includes('/search/shows'));
  expect(req.request.method).toBe('GET');
  req.flush([{ score: 1, show: {
    id: 1, name: 'The Office', genres: [],
    rating: { average: null }, image: null,
    summary: null, runtime: null,
  }}]);

  expect(result[0].name).toBe('The Office');
  expect(result[0].rating).toBe(0);
});

afterEach(() => httpMock.verify());`;
  httpErrorCode = `it('clears loading after a 500', () => {
  svc.search('office').subscribe();
  const req = httpMock.expectOne(r =>
    r.url.includes('/search/shows'));

  req.flush('boom', {
    status: 500,
    statusText: 'Server Error',
  });

  expect(svc.loading()).toBe(false);
  expect(svc.error()).toBeTruthy();
});`;
}
