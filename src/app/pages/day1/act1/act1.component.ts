import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day1-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 1 · Act 1 of 3</span>
        <h1>🅰️ What Angular Is, and Scaffolding Job Tracker</h1>
        <p class="subtitle">Before you write a line of Angular, get clear on what problem it exists to solve — then build your first real project.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> finish the <a routerLink="/day1/start">Day 1 setup checklist</a> —
        Node.js, the Angular CLI, and git all need to be installed and working.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/overview" target="_blank" rel="noopener">angular.dev's Overview</a> and
        <a href="https://angular.dev/installation" target="_blank" rel="noopener">Installation</a> guides.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Explain in one sentence what Angular is and when you'd choose it, then create and run your first Angular project with the CLI, and know what every generated file does.</li>
          <li><strong>Why It Matters:</strong> Every framework is a bet on someone else's decisions so you can move faster. Understanding Angular's core bet — components — is what makes the next 24 days make sense instead of feeling like memorized syntax.</li>
          <li><strong>Build Steps:</strong> Name the pain points of plain HTML/CSS/JS → meet Angular's answer (components) → meet the course app (Job Tracker) → scaffold a real project with the CLI → tour the files it generated.</li>
          <li><strong>Expected Outcome:</strong> A running Angular app at <code>localhost:4200</code>, and the ability to point at any of the six core generated files and say what it's for.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 1 (What Angular Is, and Scaffolding Job Tracker)</p>
        <p><strong>Next step:</strong> Act 2 (Interpolation, and Your First Component)</p>
        <p><strong>Time:</strong> About 35 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d1-act1-why-angular" [stepNumber]="1" title="The Pain Angular Exists to Solve">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>
          You've built pages with plain HTML, CSS, and JavaScript before. Think back to what got painful as
          those pages grew past a handful of elements.
        </p>

        <div class="think-about-it">
          <p class="tai-q">What specifically got painful? List every frustration you can remember.</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — three problems Angular exists to solve">
          <p>
            Three show up almost universally: <strong>repeated markup everywhere</strong> (copy-pasting the
            same card/row/button HTML dozens of times), <strong>DOM spaghetti</strong> (long chains of
            <code>document.getElementById</code> and manual <code>.innerHTML</code> updates scattered across
            files), and <strong>keeping the UI in sync with data</strong> (remembering to manually update
            every place a value is displayed whenever it changes).
          </p>
        </app-collapsible>

        <p>Angular's answer to each, in order: <strong>components</strong> (write markup once, reuse it
          anywhere), <strong>you never touch the DOM directly</strong> (Angular does it for you), and
          <strong>interpolation</strong> today — with Signals arriving properly on Day 3 to make "sync"
          automatic even for more complex state.</p>

        <div class="info-box">
          <strong>A framework is a set of decisions someone already made so you can build faster.</strong>
          Angular's core decision: UIs are trees of components. A component is a chunk of HTML plus the data
          and logic behind it, bundled together and reusable. Angular's job is to keep the HTML automatically
          in sync with the data — you never write <code>document.getElementById</code> again.
        </div>

        <p>
          Angular is a full toolkit: router, forms, and HTTP are all built in. It uses TypeScript, and it's
          what large teams use for long-lived apps — banks, airlines, Google itself. React is a library you
          assemble yourself; Angular is batteries-included. Neither is "better" — but Angular skills map
          directly to a large and stable job market.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in one sentence, what a component is and why Angular exists.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d1-act1-scaffold" [stepNumber]="2" title="Meet the Course App, Then Scaffold It">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>
          Everything in this course gets built into one running app: <strong>Job Tracker</strong> — a
          Kanban-style pipeline where you track every role you apply to through stages: Saved → Applied →
          Interview → Offer → Rejected. Every day you add a real feature. By Day 25 it's deployed,
          authenticated, and backed by a live database — and it's the app you'll demo in job interviews.
        </p>

        <p><strong>Do this:</strong> install the CLI (if you haven't already from the setup page) and scaffold the project:</p>

        <app-code-block lang="bash" [code]="scaffoldCommands" />

        <p style="margin-top: 12px;">
          Answer the prompts: choose <strong>CSS</strong> for styling, and say <strong>No</strong> to
          server-side rendering (SSR) — we'll touch on that briefly on Day 22 when we deploy.
        </p>

        <app-code-block lang="bash" [code]="runCommands" />

        <p style="margin-top: 12px;">Open <code>http://localhost:4200</code> in your browser.</p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A running Angular starter page at <code>localhost:4200</code>, served from your own <code>job-tracker</code> project.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d1-act1-project-tour" [stepNumber]="3" title="A Guided Tour — Only Six Files">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>Open the <code>job-tracker</code> folder in your editor. Today, only these six files matter:</p>

        <app-code-block lang="typescript" [code]="fileTourNotes" />

        <p style="margin-top: 12px;">Skip everything else for now — depth kills momentum on Day 1.</p>

        <div class="info-box">
          <strong>One footnote worth knowing:</strong> you may notice older Angular projects and some online
          tutorials have a file called <code>app.module.ts</code>. You won't find one here. Older Angular
          required one — you'll see it in legacy codebases and old tutorials. Modern Angular doesn't need it,
          and we won't use it in this course.
        </div>

        <div class="think-about-it">
          <p class="tai-q">Why do you think <code>index.html</code> is described as "the one real HTML page," when this whole course is about building pages?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — Angular renders everything through app-root">
          <p>
            <code>index.html</code> contains a single custom tag, <code>&lt;app-root&gt;</code>, and almost
            nothing else. Angular replaces that tag with your entire application at runtime — every "page"
            you build from here on is really just more components rendered inside that one root. You will
            almost never touch <code>index.html</code> again after today.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can point at <code>index.html</code>, <code>main.ts</code>, <code>app.ts</code>, <code>app.html</code>, <code>app.config.ts</code>, and <code>package.json</code>, and say one sentence about what each one does.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day1/start" class="btn-secondary">← Day 1 Setup</a>
        <a routerLink="/day1/act2" class="btn-primary">Act 2: Interpolation, and Your First Component →</a>
      </div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    {
      concept: 'framework',
      plainEnglish: 'A set of decisions someone already made so you can build faster.',
      analogy: '🏗️ A pre-poured foundation — you still build the house, but you never argue about the foundation.'
    },
    {
      concept: 'component',
      plainEnglish: 'A chunk of HTML plus the data and logic behind it, bundled together and reusable.',
      analogy: '🧩 A single LEGO brick — small, self-contained, and snaps together with others to build something bigger.'
    },
    {
      concept: 'interpolation',
      plainEnglish: 'Rendering a class property into HTML, kept automatically in sync.',
      analogy: '📺 A live scoreboard — the number on the board updates itself the moment the real score changes.'
    },
    {
      concept: 'the CLI',
      plainEnglish: 'A command-line tool that scaffolds, generates, and runs your Angular project for you.',
      analogy: '🤖 A very fast assistant who already knows the right file structure, every time.'
    }
  ];

  scaffoldCommands = `npm install -g @angular/cli@latest
ng new job-tracker`;

  runCommands = `cd job-tracker
ng serve`;

  fileTourNotes = `src/index.html          The one real HTML page. Note <app-root> --
                        Angular replaces this with your app.
src/main.ts             Boots the app: "start Angular, render the App component."
src/app/app.ts          The root component -- a TypeScript class with a
                        @Component decorator.
src/app/app.html         The root component's template -- its HTML.
src/app/app.config.ts   App-wide setup -- the router and other providers
                        plug in here later.
package.json            Dependencies and scripts, same as any Node project.`;
}
