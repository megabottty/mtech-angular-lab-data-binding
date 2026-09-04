import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day2-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 2 · Act 2 of 3</span>
        <h1>👆 Reacting to Events</h1>
        <p class="subtitle">Clicks flow up into your class — and change how the card looks.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/guide/templates/event-listeners" target="_blank" rel="noopener">Templates → Event listeners</a> — pairs directly with the click handler you write in Step 1.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Handle a DOM event with <code>(event)</code>, and reflect state changes visually with class and style bindings.</li>
          <li><strong>Why It Matters:</strong> A card that only displays data is a poster. A card that reacts to clicks and shows that reaction is an app.</li>
          <li><strong>Build Steps:</strong> Wire a click handler → toggle a boolean → bind a CSS class to that boolean → bind an inline style too.</li>
          <li><strong>Expected Outcome:</strong> Clicking "Mark as watched" flips the button label and visibly dims the card, with zero manual DOM code.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Reacting to Events)</p>
        <p><strong>Next step:</strong> Act 3 (More Events, and Debug It)</p>
        <p><strong>Time:</strong> About 30 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d2-act2-event-binding" [stepNumber]="1" title="Event Binding — Mark as Watched">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> add a button to <code>show-card.html</code> and a matching method in <code>show-card.ts</code>:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="buttonTemplateCode" />

        <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="toggleMethodCode" />

        <p style="margin-top: 12px;">
          Click it. The label flips instantly. Narrate the loop to yourself: click → Angular calls
          <code>toggleWatched()</code> → <code>watched</code> changes → Angular re-renders the template.
          You never touched the DOM.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Nothing in <code>toggleWatched()</code> mentions the button or the label text directly. So how does the label know to update?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — the template is the only thing that knows about the DOM">
          <p>
            The template's ternary, <code>{{ "{{ watched ? 'Watched ✓' : 'Mark as watched' }}" }}</code>,
            already depends on <code>watched</code>. The method only changes the class property; Angular's
            change detection notices that a value the template reads has changed, and re-evaluates that
            expression. You wrote the relationship once, in the template — the method never needed to know
            it existed.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking the button toggles its own label between "Mark as watched" and "Watched ✓" every time.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d2-act2-class-style-binding" [stepNumber]="2" title="Class & Style Bindings — Make It Look Different">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> watched shows should look different. Bind a CSS class to the boolean:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="classBindingCode" />

        <app-code-block lang="css" file="src/app/show-card/show-card.css" [code]="cardCssCode" />

        <p style="margin-top: 12px;">One style binding for completeness — no separate CSS class needed for this one:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="styleBindingCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Clicking "Mark as watched" dims the card, adds a green checkmark after the title, and turns the border green — all three driven by the same one boolean.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day2/act1" class="btn-secondary">← Act 1: The Three Bindings</a>
        <a routerLink="/day2/act3" class="btn-primary">Act 3: More Events, and Debug It →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'Event binding drives state change',
      plainEnglish: 'A click doesn\'t touch the page directly — it calls a method that updates a class property.',
      analogy: 'Pressing an elevator button doesn\'t move the elevator itself — it tells the controller what you want, and the controller does the moving.'
    },
    {
      concept: 'Class binding [class.x]',
      plainEnglish: 'Add or remove one specific CSS class based on whether an expression is true or false.',
      analogy: 'A light switch tied to one specific bulb — flip it, and only that bulb\'s state changes, nothing else about the room.'
    },
    {
      concept: 'Style binding [style.prop]',
      plainEnglish: 'Set one inline CSS property directly from an expression, without needing a CSS class at all.',
      analogy: 'Painting one wall by hand instead of switching the whole room to a pre-made theme.'
    },
    {
      concept: 'One boolean, many visual effects',
      plainEnglish: 'A single piece of state (watched) can drive a label, a class, and a style all at once.',
      analogy: 'One master light switch that dims the lamp, closes the blinds, and starts music — one flip, three coordinated effects.'
    }
  ];

  buttonTemplateCode = `<button (click)="toggleWatched()">
  {{ watched ? 'Watched ✓' : 'Mark as watched' }}
</button>`;

  toggleMethodCode = `toggleWatched() {
  this.watched = !this.watched;
}`;

  classBindingCode = `<article class="card" [class.watched]="watched">`;

  cardCssCode = `.card { border: 1px solid #ddd; border-radius: 8px; padding: 1rem; width: 180px; }
.card.watched { opacity: 0.55; }
.card.watched h3::after { content: ' ✓'; color: green; }`;

  styleBindingCode = `<article class="card" [class.watched]="watched"
         [style.borderColor]="watched ? 'green' : '#ddd'">`;
}
