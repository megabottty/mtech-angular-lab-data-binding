import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day1-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 1 · Act 3 of 3</span>
        <h1>🐛 Git, and Debug It</h1>
        <p class="subtitle">Start the habit that compounds over 25 days, then meet the two bugs you'll see again and again.</p>
      </div>

      <div class="info-box">
        <strong>Before you start:</strong> this act assumes your <code>Header</code> component from Act 2 is
        already rendering above the page. If it isn't, finish <a routerLink="/day1/act2">Act 2</a> first.
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/tools/cli" target="_blank" rel="noopener">CLI reference</a> — plus <a href="https://git-scm.com/docs/gittutorial" target="_blank" rel="noopener">git's own tutorial</a> for the commit workflow in Step 1.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Make your first meaningful git commit, then learn to read both loud (console) and silent (editor) Angular errors.</li>
          <li><strong>Why It Matters:</strong> A commit habit started on Day 1 becomes a portfolio artifact by Day 25. And the debugging loop you build today — read the console, read the editor, read the template — is the one you'll use for the rest of this course.</li>
          <li><strong>Build Steps:</strong> Stage and commit your work → diagnose a component that silently won't appear → fix both of its bugs.</li>
          <li><strong>Expected Outcome:</strong> A real commit in your project's history, and the confidence to read an Angular error message instead of just noticing one exists.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Git, and Debug It)</p>
        <p><strong>Next step:</strong> Day 1 Lab</p>
        <p><strong>Time:</strong> About 15 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d1-act3-git-commit" [stepNumber]="1" title="Your First Commit">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p>Establish the habit on Day 1 so it becomes a reflex, not a chore. <strong>Do this:</strong></p>

        <app-code-block lang="bash" [code]="gitCommitCommands" />

        <p style="margin-top: 12px;">
          By Day 25 you'll have a commit history that tells the story of building this app. That history is
          itself a portfolio artifact — a real, dated record that you built something, one working step at a
          time.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Running <code>git log --oneline</code> shows your first commit, with a message describing what you actually did.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d1-act3-debug-it" [stepNumber]="2" title="Debug It — Make the Tagline Appear">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>

        <p>Here's a small, broken component. Your instruction: make the tagline appear on the page.</p>

        <app-code-block lang="typescript" file="src/app/tagline/tagline.ts" variant="before" [code]="brokenTaglineCode" />

        <app-code-block lang="html" file="src/app/app.html" variant="before" [code]="brokenTaglineUsageCode" />

        <div class="think-about-it">
          <p class="tai-q">Nothing renders. Open your browser console and your editor. What do you find, in each?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — two bugs, found two different ways">
          <p>
            <strong>Bug 1 (loud):</strong> <code>Tagline</code> is not in <code>App</code>'s <code>imports</code>
            array. The browser console names it directly — something like
            <code>'app-tagline' is not a known element</code>. The console is telling you exactly what's wrong.
          </p>
          <p style="margin-top: 8px;">
            <strong>Bug 2 (silent):</strong> even after fixing the import, nothing shows. Look closely at the
            class: the property is <code>tagLine</code> (capital <code>L</code>), but the template reads
            <code>{{ "{{ tagline }}" }}</code> (lowercase). This is a silent casing mismatch — the
            template renders nothing, with no console error at all. Your editor's TypeScript template checking
            is what catches this one, with a red underline under <code>tagline</code> in the template.
          </p>
        </app-collapsible>

        <div class="warning-box">
          <strong>Debrief:</strong> one bug was loud — the console told you. One bug was silent — your editor
          told you. This is the full debugging loop you'll use for the next 25 days: read the console, read
          the editor, read the template.
        </div>

        <p>The fix — both bugs corrected:</p>

        <app-code-block lang="typescript" file="src/app/tagline/tagline.ts" variant="after" [code]="fixedTaglineCode" />

        <app-code-block lang="html" file="src/app/app.html" variant="after" [code]="fixedTaglineUsageCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> The tagline renders correctly, and you can name which tool caught each of the two bugs — the console for one, the editor for the other.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day1/act2" class="btn-secondary">← Act 2: Interpolation, and Your First Component</a>
        <a routerLink="/day1/lab" class="btn-primary">Day 1 Lab →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'git commit',
      plainEnglish: 'A saved, dated snapshot of your project with a message describing what changed.',
      analogy: '📸 A labeled photo in an album -- you can always look back and see exactly what existed at that point.'
    },
    {
      concept: 'loud errors',
      plainEnglish: 'Bugs the console names directly, with a specific message pointing at the cause.',
      analogy: '🚨 A smoke alarm -- impossible to miss, and it tells you roughly where to look.'
    },
    {
      concept: 'silent errors',
      plainEnglish: 'Bugs with no console message at all -- the app just quietly does the wrong thing.',
      analogy: '🔇 A leak with no siren -- you only notice it if you look closely at the right spot.'
    },
    {
      concept: 'editor template checking',
      plainEnglish: 'Your editor cross-checks templates against the class and underlines mismatches before you even run the app.',
      analogy: '✏️ A proofreader marking a typo before the letter is ever mailed.'
    }
  ];

  gitCommitCommands = `git add .
git commit -m "Day 1: scaffold Job Tracker, add header component"`;

  brokenTaglineCode = `@Component({
  selector: 'app-tagline',
  template: '<p>{{ tagline }}</p>',
})
export class Tagline {
  tagLine = 'Land the role. Track the journey.';
}`;

  brokenTaglineUsageCode = `<app-tagline />`;

  fixedTaglineCode = `@Component({
  selector: 'app-tagline',
  template: '<p>{{ tagLine }}</p>',
})
export class Tagline {
  tagLine = 'Land the role. Track the journey.';
}`;

  fixedTaglineUsageCode = `import { Tagline } from './tagline/tagline';

@Component({
  selector: 'app-root',
  imports: [Header, Tagline],
  templateUrl: './app.html',
})
export class App { /* ... */ }`;
}
