import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day1-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Footer, Greeting, and a Conditional Message</h1>
        <p class="subtitle">About 45 minutes. 3 tasks, written in product language — you decide how to implement each one.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>
          Complete Acts 1-3 first — this lab assumes your <code>job-tracker</code> project has a working
          <code>Header</code> component wired into <code>App</code>, and that you've made your first git
          commit.
        </p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Practice the full generate-a-component-and-use-it loop solo, and explore what interpolation alone can do before you meet <code>&#64;if</code> properly.</li>
          <li><strong>Why It Matters:</strong> The build-along showed you the pattern once. Today's lab is where it becomes something you can repeat without being told each step.</li>
          <li><strong>Build Steps:</strong> A footer with a dynamic year → a personal greeting in the header → a conditional message driven by a boolean.</li>
          <li><strong>Expected Outcome:</strong> A page with two components and at least three interpolated properties, all driven from component classes.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 1 Lab (final step of Day 1)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below.</p>
        <p><strong>Time:</strong> About 45 minutes total.</p>
      </section>

      <!-- Task 1 -->
      <app-lesson-step stepId="d1-lab-footer" [stepNumber]="'Task 1'" title="Footer Component">
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: <code>ng generate component</code>, interpolation, <code>Date</code>.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          The Job Tracker needs a footer on every page showing the app name and the current year. The year
          must not be hardcoded — if someone opens this app in 2027 it should say 2027.
        </p>

        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Generate a component: <code>ng generate component footer</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Add a <code>year</code> property using <code>new Date().getFullYear()</code>, and interpolate it in the template alongside the app name.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Import <code>Footer</code> into <code>App</code>'s <code>imports</code> array and place <code>&lt;app-footer /&gt;</code> at the bottom of <code>app.html</code>.</span></div>
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The footer renders on the page showing the current year, computed from <code>Date</code> — not typed in as a literal number.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" [code]="footerAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 2 -->
      <app-lesson-step stepId="d1-lab-greeting" [stepNumber]="'Task 2'" title="Personal Greeting">
        <div class="task-meta">
          <span class="difficulty easy">🟡 Easy</span>
          <span class="concepts">Concepts: class properties, interpolation.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          The header should welcome the user by name: "Welcome back, Ada." Store the name as a property in
          the component class and render it with interpolation. The name should live in the class, not be
          typed directly into the HTML.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The header shows a personalized greeting, and the name only ever appears once — as a class property, not duplicated in the template text.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" [code]="greetingAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <!-- Task 3 -->
      <app-lesson-step stepId="d1-lab-conditional" [stepNumber]="'Task 3'" title="Conditional Message">
        <div class="task-meta">
          <span class="difficulty medium">⚡ Medium</span>
          <span class="concepts">Concepts: booleans, ternary expressions inside interpolation.</span>
        </div>

        <h4>What to build:</h4>
        <p>
          Add a <code>hasApplications</code> boolean property to the <code>App</code> class and set it to
          <code>false</code>. Use a ternary expression inside interpolation to show either
          "You have applications in progress — keep going!" or "No applications yet. Let's change that."
          depending on its value. Flip it to <code>true</code> and confirm the template updates.
        </p>

        <app-code-block lang="typescript" [code]="ternaryHint" />

        <div class="think-about-it">
          <p class="tai-q">This works today with a ternary inside interpolation. Why might that stop feeling like the right tool as the condition gets more complex?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a preview of Day 6's @if">
          <p>
            A single ternary reads fine for one simple either/or choice. It gets cramped fast once you need
            more than two branches, or want to show/hide a whole block of HTML rather than swap one string.
            On Day 6 you'll meet <code>&#64;if</code>, Angular's real control-flow syntax for exactly that —
            today you're just exploring what interpolation alone can already do.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Toggling <code>hasApplications</code> between <code>true</code> and <code>false</code> changes the rendered message immediately, with no other code changes.</div>

        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" [code]="conditionalAnswerCode" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day1/act3" class="btn-secondary">← Act 3: Git, and Debug It</a>
        <a routerLink="/" class="btn-primary">Back to Home →</a>
      </div>

      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> App runs at <code>localhost:4200</code> with <code>ng serve</code>.</li>
          <li><span class="checkbox">✅</span> Header and Footer components render on the page.</li>
          <li><span class="checkbox">✅</span> At least three interpolated properties from component classes.</li>
          <li><span class="checkbox">✅</span> First git commit exists (<code>git log --oneline</code>).</li>
          <li><span class="checkbox">✅</span> Can explain unprompted: "What is a component?"</li>
        </ul>
      </section>

      <div class="completion-card">
        <h2>🎉 Congratulations!</h2>
        <p>You've finished Day 1. You now know how to:</p>
        <ul class="complete-list">
          <li>✅ Explain what Angular is, and why components are its core idea.</li>
          <li>✅ Scaffold and run a new Angular project with the CLI.</li>
          <li>✅ Generate a component and wire it into a template via the <code>imports</code> array.</li>
          <li>✅ Render dynamic text with interpolation, including expressions and ternaries.</li>
          <li>✅ Read both loud (console) and silent (editor) Angular errors.</li>
          <li>✅ Make a meaningful git commit.</li>
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
export class Day1LabComponent {
  ternaryHint = `hasApplications = false;`;

  footerAnswerCode = `// footer.ts
export class Footer {
  appName = 'Job Tracker';
  year = new Date().getFullYear();
}

// footer.html
<footer>
  <p>{{ appName }} &copy; {{ year }}</p>
</footer>

// app.ts
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Footer],
  templateUrl: './app.html'
})
export class App {}

// app.html
<app-header />
<!-- ...page content... -->
<app-footer />`;

  greetingAnswerCode = `// header.ts
export class Header {
  userName = 'Ada';
}

// header.html
<h1>Welcome back, {{ userName }}.</h1>`;

  conditionalAnswerCode = `// app.ts
export class App {
  hasApplications = false;
}

// app.html
<p>
  {{ hasApplications
      ? 'You have applications in progress — keep going!'
      : "No applications yet. Let's change that." }}
</p>`;
}
