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
      <div class="page-header"><span class="act-label">Day 24 · Act 2 of 3</span><h1>🧩 Component Contracts — Inputs In, DOM Out</h1><p class="subtitle">A component test is a conversation with a component: provide an input, render it, observe its DOM, and click through its public output.</p></div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/testing/components-basics" target="_blank" rel="noopener">component testing basics</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Test a standalone component through its public input, rendered DOM, and output event.</li><li><strong>Why It Matters:</strong> A good component contract is observable without knowing its private implementation.</li><li><strong>Build Steps:</strong> Compile a component → set an input → detect changes → query and click the DOM.</li><li><strong>Expected Outcome:</strong> You can explain the fixture lifecycle and test an input/DOM/output contract.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 2 (Component Contracts)</p><p><strong>Next step:</strong> Act 3 (HTTP Without a Network)</p><p><strong>Time:</strong> About 25 minutes.</p></section>

      <app-lesson-step stepId="d24-act2-component-fixture" [stepNumber]="1" title="Set an Input and Render the Fixture">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <app-code-block lang="typescript" [code]="componentSpecCode" />
        <p><code>setInput</code> is the official test-side way to set an input. <code>detectChanges()</code> tells Angular to render after the input exists. The fixture gives you both <code>componentInstance</code> and <code>nativeElement</code>.</p>
        <div class="think-about-it"><p class="tai-q">What happens if you query the DOM before <code>detectChanges()</code>?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the component exists but has not rendered"><p>You have created the component object, but Angular has not run the template update yet. Call <code>detectChanges()</code> after changing inputs or state, then make the DOM assertion.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Set a ShowCard input, call <code>detectChanges()</code>, and find the title in the rendered <code>h3</code>. You can name the fixture lifecycle in order.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-act2-component-output" [stepNumber]="2" title="Observe an Output Through a Real Click">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <app-code-block lang="typescript" [code]="outputSpecCode" />
        <p>This test does not call a private click handler. It clicks the same button a user clicks and observes the public output. That is a contract test: the implementation can change while the promise stays stable.</p>
        <div class="think-about-it"><p class="tai-q">Why is <code>?.</code> useful in a DOM assertion?</p></div>
        <app-collapsible icon="✅" label="Show Answer — failures stay readable"><p>A selector can legitimately return <code>null</code> when markup changes. Optional chaining lets the assertion report the missing text instead of crashing first with a null-property error. It keeps the failure about the contract.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Click the watchlist button and capture the emitted Show. You can test an event through the public component contract.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day24/act1" class="btn-secondary">← Act 1: TestBed and Services</a><a routerLink="/day24/act3" class="btn-primary">Act 3: HTTP Without a Network →</a></div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: 'ComponentFixture', plainEnglish: 'A handle for the component instance, its DOM, and Angular change detection.', analogy: '🎛️ A control panel with both internal state and the visible screen.' },
    { concept: 'setInput', plainEnglish: 'The test API for setting an input as Angular would set it.', analogy: '📥 Loading a test parcel through the front door.' },
    { concept: 'detectChanges', plainEnglish: 'Runs the update that turns changed state into rendered DOM.', analogy: '🔄 Refreshing the display after changing the settings.' },
    { concept: 'contract test', plainEnglish: 'A test of what a component accepts, renders, and emits.', analogy: '🤝 Checking the promises on both sides of an interface.' }
  ];
  componentSpecCode = `import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ShowCard', () => {
  let fixture: ComponentFixture<ShowCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCard],
    }).compileComponents();
    fixture = TestBed.createComponent(ShowCard);
    fixture.componentRef.setInput('show', mockShow(1, {
      name: 'Severance',
      rating: 9.2,
    }));
    fixture.detectChanges();
  });

  it('renders the show name', () => {
    expect(fixture.nativeElement.querySelector('h3')?.textContent)
      .toContain('Severance');
  });
});`;
  outputSpecCode = `it('emits the show when add is clicked', () => {
  let emitted: Show | undefined;
  fixture.componentInstance.addToWatchlist
    .subscribe(show => (emitted = show));

  fixture.nativeElement.querySelector('button')?.click();

  expect(emitted?.id).toBe(1);
});`;
}
