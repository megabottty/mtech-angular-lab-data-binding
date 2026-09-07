import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day24-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 24 · Act 2 of 3</span>
        <h1>🧩 Component Contracts — Inputs In, DOM Out</h1>
        <p class="subtitle">A component test is a conversation held entirely from the outside: hand it an input, render it, read its DOM, click what a real visitor could click.</p>
      </div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/testing/components-basics" target="_blank" rel="noopener">component testing basics</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Test <code>ShowCard</code> — Browse and Show Detail's real result card — through its input, its rendered DOM, and a real click, without ever touching its private methods.</li><li><strong>Why It Matters:</strong> <code>ShowCard</code> injects two real, DI-backed neighbors (<code>WatchlistService</code>, <code>AuthService</code>) instead of exposing an <code>&#64;Output()</code>. A component test that only knows how to assert on emitted events would have no way to test it at all.</li><li><strong>Build Steps:</strong> Fake ShowCard's injected neighbors → set its input and render → read the DOM → click the button and assert the fake was called.</li><li><strong>Expected Outcome:</strong> A full contract spec for a real component that has no outputs, covering its signed-in and signed-out DOM branches.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 2 (Component Contracts)</p><p><strong>Next step:</strong> Act 3 (HttpTestingController + Debugging)</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d24-act2-component-fixture" [stepNumber]="1" title="Fake the Neighbors, Then Set an Input and Render">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>ShowCard</code> started life in Day 6's lab with an <code>addToWatchlist</code> output — but Day 7's move to services replaced that output with two straight <code>inject()</code> calls, and that is still exactly today's real shape in <code>shared/show-card.ts</code>: <code>WatchlistService</code> and <code>AuthService</code>, no <code>&#64;Output()</code> anywhere. Both are real, <code>providedIn: 'root'</code> services, and <code>WatchlistService</code> itself depends on Firestore. Left un-faked, creating this component in a test would try to construct a real Firestore connection and immediately throw. Fake both neighbors first, exactly like Act 1's guard.</p>
        <app-code-block lang="typescript" [code]="componentSpecCode" />
        <p><code>fixture.componentRef.setInput('show', mockShow)</code> is the supported way to set a signal <code>input()</code> from a test — a plain <code>fixture.componentInstance.show = ...</code> assignment does not work, because <code>show</code> is a read-only signal function, not a settable property. <code>detectChanges()</code> then runs the template so the DOM actually reflects that input.</p>
        <div class="think-about-it"><p class="tai-q">The real <code>ShowCard</code> template renders the title inside an <code>&lt;a class="show-title"&gt;</code>, not an <code>&lt;h3&gt;</code>. Why does inspecting the component's own source matter more here than guessing from habit?</p></div>
        <app-collapsible icon="✅" label="Show Answer — a test can only be as accurate as its selector"><p>A selector that assumes a heading tag "because most cards have one" queries against an imagined component, not the real one. <code>querySelector('h3')</code> against this exact markup returns <code>null</code> every time — a mistake Act 3 comes back to on purpose. Reading the component's actual template before writing the selector is the whole difference between a test that verifies something and one that silently checks nothing.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A rendered <code>ShowCard</code> fixture whose <code>.show-title</code> and <code>.runtime-badge</code> elements contain the real input's values, built with two faked DI neighbors and zero Firestore reads.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-act2-component-output" [stepNumber]="2" title="Click the Real Button, Assert the Fake Was Called">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p><code>ShowCard</code> has no output to subscribe to — clicking its button calls <code>toggleWatchlist()</code>, which calls straight into the injected <code>WatchlistService</code>. The contract here is not "what did this component emit," it is "what did this component tell its neighbor to do." Step 1's <code>beforeEach</code> already replaced the fake's plain <code>add: () =&gt; &#123;&#125;</code> with a real <a href="https://vitest.dev/api/vi.html#vi-fn" target="_blank" rel="noopener"><code>vi.fn()</code></a> spy — this step just adds the assertion that spy makes possible.</p>
        <app-code-block lang="typescript" [code]="outputSpecCode" />
        <p>This test never calls <code>component.toggleWatchlist()</code> directly. It clicks the same <code>&lt;button&gt;</code> a real visitor's mouse would land on and checks that the fake <code>WatchlistService.add</code> was called with the exact show — proof of behavior through the public DOM, not a shortcut through a private method.</p>
        <div class="think-about-it"><p class="tai-q">The signed-out branch renders a "Sign in to save" button instead. What would change in this spec to test that branch?</p></div>
        <app-collapsible icon="✅" label="Show Answer — flip one fake, not the component"><p>Nothing about <code>ShowCard</code> changes — only the fake <code>AuthService</code> does. Providing <code>&#123; isLoggedIn: signal(false) &#125;</code> instead of <code>signal(true)</code> and re-rendering makes the template's own <code>&#64;if (authSvc.isLoggedIn())</code> branch pick the sign-in nudge, which a DOM assertion can then confirm the exact same way. The component's real conditional logic is what gets exercised either way — only the fake input to that logic changes.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A click on the real "Add to Watchlist" button results in the faked <code>WatchlistService.add</code> being called with the exact <code>Show</code> object rendered. You can explain why asserting a service call is sometimes the correct component contract test, not a lesser substitute for an output.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day24/act1" class="btn-secondary">← Act 1: TestBed and Services</a><a routerLink="/day24/act3" class="btn-primary">Act 3: HttpTestingController + Debugging →</a></div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: 'ComponentFixture', plainEnglish: 'A test handle for a component instance, its DOM, and Angular change detection, all in one object.', analogy: '🎛️ A control panel wired to both the machine\'s internals and its visible display.' },
    { concept: 'setInput', plainEnglish: 'The supported test API for setting a signal input the way Angular itself would set it.', analogy: '📥 Delivering a parcel through the official front door instead of climbing through a window.' },
    { concept: 'detectChanges', plainEnglish: 'Runs the update that turns a component\'s current state into rendered DOM.', analogy: '🔄 Pressing refresh so the display catches up to the new settings.' },
    { concept: 'spy fake (vi.fn())', plainEnglish: 'A fake function that records every call it received, so a test can assert on how it was used.', analogy: '📋 A sign-in sheet at the door that notes exactly who walked through and when.' }
  ];
  componentSpecCode = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { ShowCard } from './show-card';
import { WatchlistService } from '../core/watchlist.service';
import { AuthService } from '../core/auth.service';
import { Show } from '../models/show';

describe('ShowCard', () => {
  let fixture: ComponentFixture<ShowCard>;
  const addSpy = vi.fn();

  const mockShow: Show = {
    id: 1, name: 'Severance', genre: 'Drama', rating: 9.2,
    imageUrl: '', summary: '', runtime: 55,
  };

  beforeEach(async () => {
    addSpy.mockClear();
    await TestBed.configureTestingModule({
      imports: [ShowCard],
      providers: [
        provideRouter([]),
        { provide: WatchlistService, useValue: { has: () => false, add: addSpy, remove: vi.fn() } },
        { provide: AuthService, useValue: { isLoggedIn: signal(true) } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowCard);
    fixture.componentRef.setInput('show', mockShow);
    fixture.detectChanges();
  });

  it('renders the show name and a formatted runtime badge', () => {
    const title = fixture.nativeElement.querySelector('.show-title');
    expect(title?.textContent).toContain('Severance');

    const runtime = fixture.nativeElement.querySelector('.runtime-badge');
    expect(runtime?.textContent).toContain('55m');
  });
});`;
  outputSpecCode = `it('calls WatchlistService.add with the rendered show when clicked', () => {
  fixture.nativeElement.querySelector('button')?.click();

  expect(addSpy).toHaveBeenCalledWith(mockShow);
});`;
}
