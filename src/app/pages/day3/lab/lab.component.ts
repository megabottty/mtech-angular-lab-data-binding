import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day3-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Binge Level, Budget, and a Persistence Teaser</h1>
        <p class="subtitle">About 50 minutes. 3 tasks, all driven by computed signals.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Complete Acts 1-3 first — this lab assumes <code>ShowCard</code> already has <code>watched</code>
          and <code>episodesWatched</code> as signals, plus <code>minutesWatched</code> and <code>hours</code>
          as computeds.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build new computed values solo, without a build-along to copy from.</li>
          <li><strong>Why It Matters:</strong> The build-along showed one derived value. This lab is where "store the minimum, derive the rest" becomes a habit, not a memorized example.</li>
          <li><strong>Build Steps:</strong> A computed binge-level label → a computed budget-remaining value with a style hook → an optional effect that persists state to <code>localStorage</code>.</li>
          <li><strong>Expected Outcome:</strong> A card with at least two more computeds than the build-along left you with, and zero new duplicated state.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 3 Lab (final step of Day 3)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> About 50 minutes total.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="d3-lab-binge-level" [stepNumber]="'Task 1'" title="Binge Stats">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>computed()</code>, avoiding template if-chains.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          The card shows a "binge level": 0 episodes → "Not started", 1-4 → "Casual", 5-9 → "Invested",
          10+ → "Send help". This must be a <code>computed</code>. No if chains in the template.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add a <code>bingeLevel = computed(() =&gt; ...)</code> that reads <code>episodesWatched()</code> and returns one of the four strings.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Render it with plain interpolation: <code>{{ '{{ bingeLevel() }}' }}</code> — no <code>&#64;if</code>/ternary needed in the template at all.</span></div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Clicking "+1 episode" repeatedly walks the label through all four stages at the right thresholds, with the branching logic living entirely in the class.</div>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="d3-lab-budget" [stepNumber]="'Task 2'" title="Budget">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: <code>computed()</code>, class binding driven by a derived value.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Users set a weekly watch-time budget (hardcode <code>weeklyBudgetMinutes = signal(300)</code>).
          Show minutes remaining, and when it goes negative the card shows an over-budget style. Both derived
          values must be <code>computed</code>.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Add <code>minutesRemaining = computed(() =&gt; this.weeklyBudgetMinutes() - this.minutesWatched())</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Add <code>isOverBudget = computed(() =&gt; this.minutesRemaining() &lt; 0)</code>.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Bind <code>[class.over-budget]="isOverBudget()"</code> on the card, and give <code>.card.over-budget</code> an obvious style.</span></div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Watching enough episodes to exceed 300 minutes flips the card into its over-budget style automatically, with no manually-tracked boolean.</div>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="d3-lab-persistence-stretch" [stepNumber]="'Task 3 (Stretch)'" title="Persistence Teaser">
        <div class="task-meta">
          <span class="difficulty hard">🔴 Hard</span>
          <span class="concepts">Concepts: <code>effect()</code>, <code>localStorage</code>.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Use an <code>effect</code> to write <code>episodesWatched</code> to <code>localStorage</code> on
          every change, and initialize the signal from <code>localStorage</code> on load. This is a genuinely
          useful real-world pattern and a perfect <code>effect</code> use case — it reaches outside Angular,
          it doesn't compute a value, and nothing else should ever read from it.
        </p>

        <app-code-block lang="typescript" [code]="persistenceHintCode" />

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Refreshing the page keeps your episode count instead of resetting it to zero, and the persistence logic lives entirely in one effect.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day3/act3" class="btn-secondary">← Act 3: linkedSignal, and Debug It</a>
        <a routerLink="/" class="btn-primary">Back to Home →</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Card state is fully signal-based.</li>
          <li><span class="checkbox">✅</span> At least two computeds are driving the UI.</li>
          <li><span class="checkbox">✅</span> Can state the rule: "store the minimum, derive the rest."</li>
          <li><span class="checkbox">✅</span> Can explain when to use <code>effect</code>, with an outside-the-app example.</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 3. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Create and update state with <code>signal()</code> — read, <code>.set()</code>, <code>.update()</code>.</li>
          <li>✅ Derive values with <code>computed()</code> instead of storing them by hand.</li>
          <li>✅ Explain what <code>effect()</code> is for, and what it's not for.</li>
          <li>✅ Use <code>linkedSignal()</code> for state that resets when its source changes.</li>
          <li>✅ Spot the missing-parentheses bug and the "second source of truth" bug on sight.</li>
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
export class Day3LabComponent {
  persistenceHintCode = `constructor() {
  effect(() => {
    localStorage.setItem('episodesWatched', String(this.episodesWatched()));
  });
}`;
}
