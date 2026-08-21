import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day9-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 9 · Act 2 of 4</span>
        <h1>🚀 Programmatic Navigation</h1>
        <p class="subtitle">Sometimes no link was clicked — code decides where the user goes next.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Trigger navigation from TypeScript code, not just template links.</li>
          <li><strong>Why It Matters:</strong> Real apps navigate after saving a form, after login, or after a timed redirect — no link was clicked.</li>
          <li><strong>Build Steps:</strong> Inject <code>Router</code> → compute a destination → call <code>navigate()</code> → wire it to a UI trigger.</li>
          <li><strong>Expected Outcome:</strong> You can navigate from a method, not just a template.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 9 · Act 2 — Programmatic Navigation</p>
        <p><strong>Next step:</strong> Act 3 — Functional Guards</p>
      </section>

      <app-lesson-step stepId="d9-act2-navigate" [stepNumber]="1" title="Router.navigate() — The 🎲 Surprise Me Button">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <div class="think-about-it">
          <p class="tai-q">After you save a form, or after a login redirect — was a link clicked? What triggers that navigation?</p>
          <p class="tai-a">Your TypeScript code triggers it. In these cases there is no anchor element for a user to click, so <code>routerLink</code> can't help. Instead you inject <code>Router</code> into the component and call <code>router.navigate(['/destination'])</code> from a method — exactly the same as a link click, but initiated programmatically in response to an event like a successful HTTP save or a resolved auth check.</p>
        </div>
        <p>The answer is: <strong>your TypeScript code</strong>. In BingeBoard's <code>Header</code>, the destination is random, so a normal <code>routerLink</code> is not enough. The button click calls a method, that method picks a show, and then the router takes the user there.</p>

        <p><strong>Header TypeScript:</strong></p>
        <app-code-block lang="typescript" [code]="surpriseTsCode" />

        <p><strong>Header template:</strong></p>
        <app-code-block lang="html" [code]="surpriseButtonHtml" />

        <app-collapsible icon="💡" label="Hint — Why does navigate() take an array?">
          <p><code>router.navigate(['/show', pick.id])</code> uses the same segment-by-segment idea as <code>routerLink</code>. Angular safely joins the pieces for you, and the number <code>pick.id</code> is stringified automatically.</p>
          <p>Think of the array as: route segment 1 = <code>'/show'</code>, route segment 2 = the dynamic ID.</p>
          <app-code-block lang="typescript" [code]="navigateArrayHintCode" />
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Complete Header class">
          <p>Here is a full, realistic <code>HeaderComponent</code> example with the router injected and the button wired up:</p>
          <app-code-block lang="typescript" [code]="headerAnswerCode" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can trigger a route change from a TypeScript method in response to a button click, not a routerLink.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d9-act2-rule" [stepNumber]="2" title="The Rule — routerLink vs. router.navigate()">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <div class="info-box">
          <strong>The rule:</strong> User clicks a destination → <code>routerLink</code>. Code decides the destination → <code>router.navigate()</code>.
        </div>

        <p>Use that rule for common app flows like:</p>
        <ul class="example-list">
          <li>After saving a form, redirect to the new detail page.</li>
          <li>After a successful login, send the user to their dashboard.</li>
          <li>After a timer or countdown expires, auto-advance to the next screen.</li>
        </ul>

        <app-collapsible icon="🧩" label="Deep Dive — navigate() vs. navigateByUrl()">
          <p>Angular also gives you <code>navigateByUrl()</code>, which takes one raw string URL. It works, but when parts of the path are dynamic, the array form is usually safer and easier to read.</p>
          <app-code-block lang="typescript" [code]="navigateComparisonCode" />
          <p>Teach beginners to reach for <code>router.navigate(['/show', id])</code> first. The array form composes segments safely and matches the mental model they already learned from <code>routerLink</code>.</p>
        </app-collapsible>

        <div class="warning-box">
          Students often hardcode <code>/show/1</code>-style links in nav for demos — that's fine for a one-off demo link, but insist on the array form for anything dynamic.
        </div>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can explain, in one sentence, when to use routerLink and when to use router.navigate().</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day9/act1" class="btn-secondary">← Act 1: Route Parameters</a>
        <a routerLink="/day9/act3" class="btn-primary">Act 3: Functional Guards →</a>
      </div>
    </div>
  `,
  styles: [`
    .example-list {
      margin: 12px 0 0 20px;
    }

    .example-list li {
      margin-bottom: 8px;
    }
  `]
})
export class Act2Component {
  models: MentalModel[] = [
    {
      concept: 'Router.navigate()',
      plainEnglish: 'Tell Angular where to go next from your TypeScript code.',
      analogy: '🧭 A GPS rerouting the trip after your app makes a decision'
    },
    {
      concept: 'inject(Router)',
      plainEnglish: 'Grab the router so this component can control navigation.',
      analogy: '🔑 Taking the steering wheel before choosing the next turn'
    },
    {
      concept: 'routerLink vs navigate()',
      plainEnglish: 'User clicks a destination vs. code decides the destination.',
      analogy: '🚪 A doorway sign you walk through vs. a GPS that redirects you'
    }
  ];

  surpriseTsCode = `private router = inject(Router);
private showsSvc = inject(ShowsService);

surprise() {
  const shows = this.showsSvc.all();
  const pick = shows[Math.floor(Math.random() * shows.length)];
  this.router.navigate(['/show', pick.id]);
}`;

  surpriseButtonHtml = `<button (click)="surprise()">🎲 Surprise me</button>`;

  navigateArrayHintCode = `this.router.navigate(['/show', pick.id]);
// ['/show', pick.id] = [static segment, dynamic segment]`;

  headerAnswerCode = `import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsService } from '../../core/services/shows.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: \`<button (click)="surprise()">🎲 Surprise me</button>\`
})
export class HeaderComponent {
  private router = inject(Router);
  private showsSvc = inject(ShowsService);

  surprise() {
    const shows = this.showsSvc.all();
    const pick = shows[Math.floor(Math.random() * shows.length)];
    this.router.navigate(['/show', pick.id]);
  }
}`;

  navigateComparisonCode = `this.router.navigate(['/show', id]);
// Preferred: array form, safer for dynamic segments

this.router.navigateByUrl('/show/' + id);
// Works too, but you're manually building the URL string`;
}
