import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day2-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Hype Meter, Reset, and a Second Card</h1>
        <p class="subtitle">About 50 minutes. 3 tasks, building directly on today's show card.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Complete Acts 1-3 first — this lab assumes your <code>ShowCard</code> component already has
          <code>title</code>, <code>imageUrl</code>, <code>rating</code>, and <code>watched</code>, plus a
          working <code>toggleWatched()</code> event binding and the <code>[class.watched]</code> styling.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Combine property, event, and class bindings on your own, without a build-along to copy.</li>
          <li><strong>Why It Matters:</strong> The build-along showed the pattern once with <code>watched</code>. This lab is where it becomes something you can apply to a brand-new piece of state.</li>
          <li><strong>Build Steps:</strong> A hype counter and its "hot" styling → a reset button with a disabled state → a second card to reveal a limitation.</li>
          <li><strong>Expected Outcome:</strong> A show card with independent hype state, a working reset, and a sibling card proving each instance owns its own data.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 2 Lab (final step of Day 2)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> About 50 minutes total.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="d2-lab-hype-meter" [stepNumber]="'Task 1'" title="Hype Meter">
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: event binding, class binding.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Each show card has a 🔥 button. Every click increments a hype counter shown on the card. At 5+
          hype, the card gets a <code>hot</code> CSS class — make it obvious (a red border, a glow, dealer's
          choice).
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add a <code>hype</code> number property to <code>ShowCard</code>, starting at <code>0</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Add a 🔥 button with a <code>(click)</code> binding that increments <code>hype</code>.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Bind <code>[class.hot]="hype &gt;= 5"</code> on the card, and give <code>.card.hot</code> an obvious style.</span></div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Clicking 🔥 five times visibly changes the card's appearance, driven entirely by comparing <code>hype</code> to <code>5</code> in the template.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" [code]="hypeMeterAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="d2-lab-reset" [stepNumber]="'Task 2'" title="Reset">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: property binding, disabled state.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a "Reset hype" button that sets the counter back to <code>0</code>, but it must be
          <strong>disabled</strong> when hype is already <code>0</code>.
        </p>

        <div class="think-about-it">
          <p class="tai-q">You need to disable a button based on data. Which of today's three binding types does that job?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — property binding on disabled">
          <p>
            <code>disabled</code> is an element property, so it's a property binding:
            <code>[disabled]="hype === 0"</code>. It's the same pattern as <code>[src]</code> — a
            boolean expression instead of a string, but the exact same binding type.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The reset button is grayed out and unclickable at 0 hype, and becomes clickable the moment hype is 1 or more.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" [code]="resetAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="d2-lab-second-card" [stepNumber]="'Task 3'" title="Second Card">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: component instances, shared state.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Duplicate <code>&lt;app-show-card /&gt;</code> in <code>app.html</code> so two cards render.
          Notice each card keeps its own state — click one, and the other doesn't change.
        </p>

        <div class="think-about-it">
          <p class="tai-q">Why doesn't clicking one card's button affect the other card at all?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — each instance owns its own data">
          <p>
            Each <code>&lt;app-show-card /&gt;</code> tag creates its own separate instance of the
            <code>ShowCard</code> class, with its own copy of <code>hype</code>, <code>watched</code>, and
            everything else. They share the same class definition, but never the same data.
          </p>
          <p style="margin-top: 8px;">
            Also notice: both cards show the exact same show — you can't yet give them different titles or
            posters. Sit with that itch. Day 5 is where you'll scratch it, by feeding each card its own show
            from a list.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Two show cards on the page, each toggling and counting hype completely independently of the other.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" [code]="secondCardAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day2/act3" class="btn-secondary">← Act 3: More Events, and Debug It</a>
        <a routerLink="/" class="btn-primary">Back to Home →</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Show card renders a poster via <code>[src]</code>.</li>
          <li><span class="checkbox">✅</span> Show card toggles watched state via <code>(click)</code>.</li>
          <li><span class="checkbox">✅</span> Show card visually changes via <code>[class.x]</code>.</li>
          <li><span class="checkbox">✅</span> Can answer: "which direction does <code>[ ]</code> flow? Which direction does <code>( )</code> flow?"</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 2. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Bind data into an element property with <code>[property]</code>.</li>
          <li>✅ Handle a DOM event and update state with <code>(event)</code>.</li>
          <li>✅ Reflect state visually with <code>[class.x]</code> and <code>[style.prop]</code>.</li>
          <li>✅ Explain the data-down, events-up mental model.</li>
          <li>✅ Spot three classic binding-syntax mistakes on sight.</li>
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
export class Day2LabComponent {
  hypeMeterAnswerCode = `// show-card.ts
export class ShowCard {
  hype = 0;
}

// show-card.html
<article class="card" [class.hot]="hype >= 5">
  <button (click)="hype = hype + 1">🔥 {{ hype }}</button>
</article>

/* show-card.css */
.card.hot {
  border-color: #f44747;
  box-shadow: 0 0 12px rgba(244, 71, 71, 0.6);
}`;

  resetAnswerCode = `<button (click)="hype = 0" [disabled]="hype === 0">
  Reset hype
</button>`;

  secondCardAnswerCode = `<!-- app.html -->
<app-show-card />
<app-show-card />`;
}
