import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day1-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 1 · Act 2 of 3</span>
        <h1>💬 Interpolation, and Your First Component</h1>
        <p class="subtitle">Make the starter app say something of your own, then build the first reusable piece of Job Tracker.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes your <code>job-tracker</code> app is running at
        <code>localhost:4200</code> from Act 1. If it isn't, go back to <a routerLink="/day1/act1">Act 1</a> first.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/essentials/components" target="_blank" rel="noopener">Essentials → Components</a>.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Render dynamic text with interpolation, then generate a component with the CLI and use it in a template.</li>
          <li><strong>Why It Matters:</strong> Interpolation is the smallest possible proof that Angular keeps HTML in sync with data — and generating and wiring in your first component is the single most-repeated motion in this entire course.</li>
          <li><strong>Build Steps:</strong> Rewrite the root template with interpolation → generate a <code>header</code> component → wire it into the app via the <code>imports</code> array.</li>
          <li><strong>Expected Outcome:</strong> A page rendering at least two of your own interpolated properties, with a real reusable <code>Header</code> component appearing above the page content.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 2 (Interpolation, and Your First Component)</p>
        <p><strong>Next step:</strong> Act 3 (Git, and Debug It)</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d1-act2-interpolation" [stepNumber]="1" title="Make It Yours — Interpolation">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p><strong>Do this:</strong> delete everything in <code>app.html</code> and replace it with:</p>

        <app-code-block lang="html" [code]="firstTemplateCode" />

        <p style="margin-top: 12px;">In <code>app.ts</code>, update the class:</p>

        <app-code-block lang="typescript" [code]="firstClassCode" />

        <p style="margin-top: 12px;">
          The browser updates live. This is <strong>interpolation</strong>: <code>{{ "{{ }}" }}</code>
          renders a class property into HTML, and Angular keeps it in sync automatically.
        </p>

        <p>Now prove that "in sync" claim — extend the class:</p>

        <app-code-block lang="typescript" [code]="provingSyncClassCode" />

        <app-code-block lang="html" [code]="provingSyncTemplateCode" />

        <div class="think-about-it">
          <p class="tai-q">Interpolation rendered <code>{{ "{{ 3 + 2 }}" }}</code> as <code>5</code>. What does that tell you about what's allowed between the double curly braces?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — any expression, kept simple">
          <p>
            Interpolation accepts any expression, not just a bare property name — arithmetic, string
            concatenation, method calls, all work. The rule of thumb: keep expressions simple. Logic belongs
            in the class, not the template. If you find yourself writing a complicated calculation inside
            <code>{{ "{{ }}" }}</code>, move it into a class property or method instead.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your app renders <code>title</code>, <code>today</code>, and <code>3 + 2</code> — three interpolated values driven entirely from the <code>App</code> class.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d1-act2-generate-component" [stepNumber]="2" title="Generate Your First Component">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> generate a header component with the CLI:</p>

        <app-code-block lang="bash" [code]="generateComponentCommand" />

        <p style="margin-top: 12px;">Walk the four generated files:</p>

        <app-code-block lang="typescript" [code]="generatedFilesNotes" />

        <p style="margin-top: 12px;">In <code>header.ts</code>, notice two things: <code>selector: 'app-header'</code>
          becomes the custom HTML tag you'll use in templates, and <code>templateUrl</code>/<code>styleUrl</code>
          mean the HTML and CSS live in their own separate files.</p>

        <div class="info-box">
          <strong>If an old tutorial or an AI answer looks different:</strong> you may see files named
          <code>header.component.ts</code>, a class called <code>HeaderComponent</code>, or an explicit
          <code>standalone: true</code> line in the decorator. Same concept, older default naming — current
          Angular generates the shorter <code>header.ts</code> / <code>Header</code> names, and
          <code>standalone: true</code> is now implied, so the CLI leaves it out entirely.
        </div>

        <p>Give the header some real content — replace <code>header.html</code>:</p>

        <app-code-block lang="html" [code]="headerTemplateCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A <code>Header</code> component class exists, with its own template showing a title and a small nav row — not used anywhere yet.</div>
      </app-lesson-step>

      <!-- Step 3 -->
      <app-lesson-step stepId="d1-act2-use-component" [stepNumber]="3" title="Use the Component">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p><strong>Do this:</strong> in <code>app.ts</code>, import <code>Header</code> and add it to the <code>imports</code> array:</p>

        <app-code-block lang="typescript" [code]="wireHeaderCode" />

        <p style="margin-top: 12px;">Then use it in <code>app.html</code>:</p>

        <app-code-block lang="html" [code]="useHeaderTemplateCode" />

        <div class="info-box">
          <strong>Read this slowly and let it sink in:</strong> to use a component in a template, you import its class
          and list it in the <code>imports</code> array of the <code>&#64;Component</code> decorator. You
          will forget this repeatedly — that's completely normal, and the error messages will remind you.
        </div>

        <div class="think-about-it">
          <p class="tai-q">What do you think happens if you use <code>&lt;app-header /&gt;</code> in the template but forget to add <code>Header</code> to the <code>imports</code> array?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — a specific, named console error">
          <p>
            Angular's compiler refuses to build the template and reports an error naming the exact unknown
            element, something like <code>'app-header' is not a known element</code>, along with a hint about
            the <code>imports</code> array. This is a loud bug — the console tells you exactly what's wrong.
            You'll meet its quieter counterpart in Act 3's Debug It.
          </p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Your header renders above the rest of the page, and you can explain the two-part rule — import, then list in <code>imports</code> — from memory.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day1/act1" class="btn-secondary">← Act 1: What Angular Is, and Scaffolding Job Tracker</a>
        <a routerLink="/day1/act3" class="btn-primary">Act 3: Git, and Debug It →</a>
      </div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'interpolation',
      plainEnglish: 'Double curly braces that render a class property (or any expression) into HTML.',
      analogy: '📺 A live scoreboard reading straight off the scorekeeper\'s notepad.'
    },
    {
      concept: 'ng generate component',
      plainEnglish: 'A CLI command that scaffolds a new component\'s four files for you.',
      analogy: '🏭 A stamping machine that produces a consistent, correctly-wired starter part every time.'
    },
    {
      concept: 'selector',
      plainEnglish: 'The custom HTML tag a component becomes once you use it in a template.',
      analogy: '🏷️ A brand name printed on a product box, so you know which box to reach for.'
    },
    {
      concept: 'imports array',
      plainEnglish: 'The list, inside @Component, of every other component a template is allowed to use.',
      analogy: '📋 A guest list at the door -- only the names on it are let in.'
    }
  ];

  firstTemplateCode = `<h1>{{ title }}</h1>
<p>Your job search, organized. One offer at a time.</p>`;

  firstClassCode = `export class App {
  title = 'Job Tracker';
}`;

  provingSyncClassCode = `export class App {
  title = 'Job Tracker';
  today = new Date().toDateString();
}`;

  provingSyncTemplateCode = `<p>Today is {{ today }}. Who did you apply to?</p>
<p>Applications this week: {{ 3 + 2 }}</p>`;

  generateComponentCommand = `ng generate component header
# shorthand: ng g c header`;

  generatedFilesNotes = `header.ts        the component class and decorator
header.html      its template
header.css       its scoped styles
header.spec.ts   its test file (we meet these properly on Day 23)`;

  headerTemplateCode = `<header>
  <h1>📋 Job Tracker</h1>
  <nav>
    <span>Dashboard</span> · <span>Applications</span> · <span>Settings</span>
  </nav>
</header>`;

  wireHeaderCode = `import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Job Tracker';
  today = new Date().toDateString();
}`;

  useHeaderTemplateCode = `<app-header />
<main>
  <p>Today is {{ today }}. Who did you apply to?</p>
</main>`;
}
