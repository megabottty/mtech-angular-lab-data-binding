import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day12-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Ship Suggest a Show</h1>
        <p class="subtitle">About 70 minutes. Build a lazy-loaded feature with a signal service, validation, newest-first rendering, an empty state, a justified forms choice, and one debugging fix.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>Start with <a routerLink="/day12/start">Day 12 · Starting Point</a> and finish both acts. The existing review form stays reactive; this feature is your chance to choose a form style deliberately and explain why.</p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build one complete, well-reasoned feature while consolidating routing, services, signals, control flow, and forms.</li>
          <li><strong>Why It Matters:</strong> Real form work is not an isolated input. It crosses route boundaries, validates data, protects state ownership, and communicates an empty result clearly.</li>
          <li><strong>Build Steps:</strong> add a lazy route → model and service → form validation → newest-first list and empty state → choice note → Debug It.</li>
          <li><strong>Expected Outcome:</strong> You can submit a valid show suggestion and immediately see it at the top of a dedicated feature page.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Student Lab (Day 12 consolidation)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> About 70 minutes total.</p>
      </section>

      <app-lesson-step stepId="d12-lab-route-lazy-loading" [stepNumber]="'Task 1'" title="Route and Lazy-Load the Feature">
        <div class="task-meta"><span class="difficulty easy">🟡 Easy</span><span class="concepts">Concepts: route table, RouterLink, lazy loading.</span></div>
        <h4>What to build:</h4>
        <p>Create a <code>SuggestShow</code> page and add a lazy-loaded <code>/suggest</code> route. Add a visible link from a sensible existing page or the header so the feature is reachable without typing its URL.</p>
        <app-code-block lang="typescript" [code]="routeAnswer" />
        <div class="think-about-it"><p class="tai-q">Why is this page a good lazy-loading candidate?</p></div>
        <app-collapsible icon="✅" label="Show Answer — it is a separate, optional feature boundary"><p>The suggestion page is only needed when you visit it. Lazy loading keeps its component code out of the first route bundle while preserving a clear feature boundary.</p></app-collapsible>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Generate or create the standalone page component.</span></div><div class="task-step"><span class="step-dot">2</span><span>Add a <code>loadComponent</code> route with the title "Suggest a Show · BingeBoard".</span></div><div class="task-step"><span class="step-dot">3</span><span>Navigate through a visible <code>RouterLink</code> and confirm the direct URL also works.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Navigate to <code>/suggest</code> through the app and refresh that URL successfully. You can create a reachable lazy-loaded feature route.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-lab-suggestions-service" [stepNumber]="'Task 2'" title="Own Suggestions in a Signal Service">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: interface, signal(), asReadonly(), service ownership.</span></div>
        <h4>What to build:</h4>
        <p>Define a suggestion shape with a name, optional note, and submission time. Put the writable signal inside <code>SuggestionsService</code>, expose only an <code>asReadonly()</code> signal, and provide one <code>add()</code> method.</p>
        <app-code-block lang="typescript" [code]="serviceAnswer" />
        <div class="think-about-it"><p class="tai-q">Why should the page receive <code>suggestions</code> rather than the private writable signal?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the service keeps mutation rules in one place"><p>Read-only exposure lets any page render the data without granting it permission to replace or mutate the list. The service remains the single place that decides how additions work.</p></app-collapsible>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Create a <code>Suggestion</code> interface.</span></div><div class="task-step"><span class="step-dot">2</span><span>Keep <code>items</code> private and expose <code>suggestions</code> as read-only.</span></div><div class="task-step"><span class="step-dot">3</span><span>Use <code>update()</code> in <code>add()</code> to preserve existing items.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Submit one temporary suggestion and inspect that the page reads a read-only signal while the service owns the update. You can keep shared signal state encapsulated.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-lab-suggestion-validation" [stepNumber]="'Task 3'" title="Choose and Validate the Form">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: form API choice, required validation, timely feedback.</span></div>
        <h4>What to build:</h4>
        <p>Choose template-driven, reactive, or signal forms for this small page. Require a nonblank show name and cap it at 80 characters. Show the error only after interaction or an attempted submission, and do not add invalid suggestions.</p>
        <div class="think-about-it"><p class="tai-q">Which form style is a reasonable default here, and what could make you choose another?</p></div>
        <app-collapsible icon="✅" label="Show Answer — template-driven is reasonable, but your constraints decide"><p>Template-driven is a reasonable choice for this small local form because it has two simple fields and HTML-friendly rules. Reactive or signal forms can also be justified if you have a concrete constraint, such as matching a nearby feature or evaluating the current signal-forms API.</p></app-collapsible>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Implement your chosen form with exactly one model owner per input.</span></div><div class="task-step"><span class="step-dot">2</span><span>Block blank and over-80-character names.</span></div><div class="task-step"><span class="step-dot">3</span><span>Clear the form after a successful addition.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Try blank and overlong names, then submit a valid suggestion and observe the form reset. You can apply timely validation with one deliberate form API choice.</div>
        <app-collapsible icon="💡" label="Hint — template-driven uses ngForm.invalid"><app-code-block lang="html" [code]="templateDrivenHint" /></app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d12-lab-newest-first-empty" [stepNumber]="'Task 4'" title="Render Newest First with an Empty State">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: computed(), &#64;for, &#64;empty, immutable sorting.</span></div>
        <h4>What to build:</h4>
        <p>Render suggestions newest first and show a helpful empty state before the first one is added. Derive the sorted list without mutating the service's source array.</p>
        <app-code-block lang="typescript" [code]="newestFirstAnswer" />
        <div class="think-about-it"><p class="tai-q">Why use <code>[...this.suggestions()]</code> before <code>sort()</code>?</p></div>
        <app-collapsible icon="✅" label="Show Answer — sort mutates its receiver"><p><code>sort()</code> changes the array it receives. Copying first keeps the service-owned signal value untouched and makes the derived newest-first view safe to recompute.</p></app-collapsible>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Create a computed newest-first list.</span></div><div class="task-step"><span class="step-dot">2</span><span>Use <code>&#64;for</code> with a stable tracking expression.</span></div><div class="task-step"><span class="step-dot">3</span><span>Add an <code>&#64;empty</code> message that explains the next action.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> See the empty message on a fresh load, add two suggestions, and confirm the newest appears first. You can derive a non-mutating display order and cover the zero-item case.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-lab-choice-justification" [stepNumber]="'Task 5'" title="Record Your Forms Choice">
        <div class="task-meta"><span class="difficulty easy">🟡 Easy</span><span class="concepts">Concepts: constraints, form ownership, maintainability.</span></div>
        <h4>What to build:</h4>
        <p>Add a two-sentence code comment near the page component or a short note in your pull request. Name the API you chose, two constraints that made it fit, and one condition that would make you reconsider later.</p>
        <div class="think-about-it"><p class="tai-q">Why make this decision visible instead of silently using the newest API?</p></div>
        <app-collapsible icon="✅" label="Show Answer — clear reasoning makes maintenance easier"><p>A future reader can distinguish an intentional local choice from an accidental mixture of styles. The note also gives you a concrete trigger for revisiting the decision rather than rewriting based on novelty.</p></app-collapsible>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Name the chosen form API.</span></div><div class="task-step"><span class="step-dot">2</span><span>State two relevant constraints.</span></div><div class="task-step"><span class="step-dot">3</span><span>State one future condition that could justify a change.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Read your note beside the working form and verify it names concrete constraints. You can document a technical choice for the next person maintaining the feature.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d12-lab-debug-readonly" [stepNumber]="'Task 6'" title="Debug It — Exposing the Writable Signal">
        <div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: read-only signal exposure, API boundaries.</span></div>
        <h4>What to build:</h4>
        <p>A teammate wrote this service. The page works, but any consumer can now call <code>set()</code> and erase every suggestion. Find the one-line boundary bug and fix it.</p>
        <app-code-block lang="typescript" [code]="debugBugCode" />
        <div class="think-about-it"><p class="tai-q">What should the public <code>suggestions</code> property return instead?</p></div>
        <app-collapsible icon="✅" label="Show Answer — items.asReadonly()"><p>Expose <code>this.items.asReadonly()</code>. Consumers can still call the signal to render its current value, but only <code>SuggestionsService</code> can call <code>set()</code> or <code>update()</code>.</p><app-code-block lang="typescript" [code]="debugFixCode" /></app-collapsible>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Replace the public writable signal with its read-only view.</span></div><div class="task-step"><span class="step-dot">2</span><span>Confirm the feature can render and add suggestions through the service.</span></div><div class="task-step"><span class="step-dot">3</span><span>Confirm a component cannot call <code>suggestions.set(...)</code>.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Build the feature after the one-line fix and inspect that only the service mutates its state. You can recognize and repair a leaked writable-signal boundary.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day12/act2" class="btn-secondary">← Act 2: Signal Forms &amp; Choosing Well</a></div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> <code>/suggest</code> is reachable through a lazy-loaded route.</li>
          <li><span class="checkbox">✅</span> <code>SuggestionsService</code> exposes read-only signal state and owns additions.</li>
          <li><span class="checkbox">✅</span> Invalid suggestions are blocked with timely feedback.</li>
          <li><span class="checkbox">✅</span> The empty state appears first and new suggestions appear at the top.</li>
          <li><span class="checkbox">✅</span> Your form choice names constraints and a future reconsideration trigger.</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 12: The Forms Landscape. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Build and recognize a template-driven form.</li>
          <li>✅ Translate template-driven and reactive form responsibilities.</li>
          <li>✅ Explore Signal Forms from the version-matched official guide.</li>
          <li>✅ Choose a form API based on complexity, stability, and constraints.</li>
          <li>✅ Ship a routed, validated feature with encapsulated signal state.</li>
        </ul>
        <a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a>
      </div>
    </div>
  `,
  styles: [`
    .lab-label { background: #4ec9b0 !important; color: #1e1e1e !important; }
    .lab-intro {
      background: #1a2e4a;
      border: 1px solid #2a4a7a;
      border-radius: 10px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .lab-intro h3 { color: #82aaff; margin-bottom: 8px; }
    .lab-intro p { font-size: 14px; color: #b0c8e0; }

    .task-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .difficulty {
      font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 12px;
    }
    .difficulty.easy { background: #1a2e1a; color: #4ec9b0; border: 1px solid #2a5c2a; }
    .difficulty.medium { background: #2a2a1a; color: #ff9d00; border: 1px solid #5c4a00; }
    .difficulty.hard { background: #2a1a1a; color: #f44747; border: 1px solid #5c1a1a; }
    .concepts { font-size: 12px; color: #858585; }

    .task-steps { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
    .task-step {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; color: #cccccc;
    }
    .step-dot {
      width: 24px; height: 24px; background: #3e3e42;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 12px; font-weight: 700;
      flex-shrink: 0; color: #4fc3f7;
    }

    .checkpoint-card { margin-top: 32px; }

    .completion-card {
      background: linear-gradient(135deg, #1a2e1a, #0d1f0d);
      border: 2px solid #4ec9b0;
      border-radius: 12px;
      padding: 32px;
      margin-top: 40px;
      text-align: center;
    }
    .completion-card h2 { font-size: 28px; margin-bottom: 12px; }
    .completion-card p { color: #a0d0a0; margin-bottom: 16px; }
    .complete-list {
      list-style: none;
      padding: 0;
      display: inline-block;
      text-align: left;
    }
    .complete-list li {
      padding: 6px 0;
      font-size: 14px;
      color: #c3e88d;
    }
  `]
})
export class Day12LabComponent {
  routeAnswer = `{
  path: 'suggest',
  loadComponent: () =>
    import('./pages/suggest-show/suggest-show').then(m => m.SuggestShow),
  title: 'Suggest a Show · BingeBoard'
}`;

  serviceAnswer = `export interface Suggestion {
  id: string;
  name: string;
  note: string;
  submittedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class SuggestionsService {
  private items = signal<Suggestion[]>([]);
  readonly suggestions = this.items.asReadonly();

  add(name: string, note: string) {
    this.items.update(items => [{
      id: crypto.randomUUID(),
      name: name.trim(),
      note: note.trim(),
      submittedAt: new Date()
    }, ...items]);
  }
}`;

  templateDrivenHint = `<form #suggestionForm="ngForm" (ngSubmit)="submit(suggestionForm)">
  <input name="name" [(ngModel)]="name" required maxlength="80" #nameField="ngModel" />
  @if (nameField.invalid && (nameField.touched || submitted)) {
    <p class="field-error">Enter a show name up to 80 characters.</p>
  }
  <button type="submit" [disabled]="suggestionForm.invalid">Suggest show</button>
</form>`;

  newestFirstAnswer = `suggestions = inject(SuggestionsService).suggestions;

newestFirst = computed(() =>
  [...this.suggestions()].sort(
    (a, b) => b.submittedAt.getTime() - a.submittedAt.getTime()
  )
);

@for (suggestion of newestFirst(); track suggestion.id) {
  <article><strong>{{ suggestion.name }}</strong></article>
} @empty {
  <p>No suggestions yet. Add the first show you want to see here.</p>
}`;

  debugBugCode = `export class SuggestionsService {
  private items = signal<Suggestion[]>([]);
  readonly suggestions = this.items; // Every component can now call set() or update().
}`;

  debugFixCode = `export class SuggestionsService {
  private items = signal<Suggestion[]>([]);
  readonly suggestions = this.items.asReadonly();
}`;
}
