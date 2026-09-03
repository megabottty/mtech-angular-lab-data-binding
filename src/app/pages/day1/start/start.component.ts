import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';

// Day 1 has no prior day to clone a starter from — it's the literal beginning
// of the course. Instead of "clone starters/bingeboard-dayN", this page is a
// setup/verification checklist: confirm Node, install the CLI, confirm git.
// No <app-lesson-step>/stepIds here — this is setup, not a graded step.
@Component({
  selector: 'app-day1-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 1 · Before You Begin</span>
        <h1>🧰 Get Your Machine Ready</h1>
        <p class="subtitle">Ten minutes of setup now saves an hour of confusion later. Confirm each of these before Act 1.</p>
      </div>

      <div class="info-box">
        <strong>Nothing to clone today.</strong> Every other day in this course starts by running a
        pre-built starter project — today there isn't one yet, because today <em>is</em> the day you build
        your very first Angular project from nothing. This page is a checklist, not a codebase.
      </div>

      <section class="lesson-framework">
        <h3>1. Confirm Node.js is installed (LTS version)</h3>
        <p>Angular's CLI needs a recent Node.js LTS release. Open a terminal and run:</p>
        <app-code-block lang="bash" [code]="nodeCheckCommand" />
        <p style="margin-top: 8px;">
          If that command isn't found, or reports a very old version, install the current LTS release from
          <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a> before continuing.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>2. Install the Angular CLI</h3>
        <p>The CLI is what turns <code>ng new</code>, <code>ng generate</code>, and <code>ng serve</code> into real commands on your machine:</p>
        <app-code-block lang="bash" [code]="installCliCommand" />
        <p style="margin-top: 8px;">Confirm it installed correctly:</p>
        <app-code-block lang="bash" [code]="ngVersionCommand" />
      </section>

      <section class="lesson-framework">
        <h3>3. Confirm git is installed</h3>
        <p>You'll make your first commit today, and every day after. Confirm git is available:</p>
        <app-code-block lang="bash" [code]="gitCheckCommand" />
        <p style="margin-top: 8px;">
          If it's missing, install it from <a href="https://git-scm.com" target="_blank" rel="noopener">git-scm.com</a>.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>4. Have a code editor ready</h3>
        <p>
          Any editor works, but <a href="https://code.visualstudio.com" target="_blank" rel="noopener">VS Code</a>
          is what this course assumes when it refers to "your editor" catching a mistake for you.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>What to expect today</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> You'll scaffold a brand-new Angular project from scratch: <code>job-tracker</code>.</li>
          <li><span class="checkbox">✅</span> You'll build and use your first component.</li>
          <li><span class="checkbox">✅</span> You'll make your first git commit of the course.</li>
        </ul>
      </section>

      <div class="warning-box">
        If <code>node -v</code>, <code>ng version</code>, or <code>git --version</code> fail, fix that now —
        every remaining step today assumes all three already work.
      </div>

      <div class="nav-footer">
        <a routerLink="/" class="btn-secondary">← Home</a>
        <a routerLink="/day1/act1" class="btn-primary">Act 1: What Angular Is, and Scaffolding Job Tracker →</a>
      </div>
    </div>
  `
})
export class Day1StartComponent {
  nodeCheckCommand = `node -v
# Expect something like v20.x.x or v22.x.x — an LTS release.`;

  installCliCommand = `npm install -g @angular/cli@latest`;

  ngVersionCommand = `ng version`;

  gitCheckCommand = `git --version`;
}
