import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day2-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 2 · Act 3 of 3</span>
        <h1>🎯 More Events, and Debug It</h1>
        <p class="subtitle">Any DOM event works the same way — and three classic bugs to catch before they catch you.</p>
      </div>

      <div class="info-box">
        <strong>📚 Worth reading alongside this act:</strong>
        <a href="https://angular.dev/essentials/templates" target="_blank" rel="noopener">Essentials → Templates</a> — a short overview that ties all three binding types together.
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Recognize that event binding is one general pattern, not a special case for <code>click</code>.</li>
          <li><strong>Why It Matters:</strong> Today's three bugs are the ones you'll keep half-making all week — catching them now, deliberately, saves hours later.</li>
          <li><strong>Build Steps:</strong> Try a second event (<code>dblclick</code>) → read three broken snippets → identify each bug before checking the answer.</li>
          <li><strong>Expected Outcome:</strong> You can read a template and immediately spot a missing bracket, a missing parenthesis, or a binding to the wrong thing.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (More Events, and Debug It)</p>
        <p><strong>Next step:</strong> Student Lab</p>
        <p><strong>Time:</strong> About 25 minutes.</p>
      </section>

      <!-- Step 1 -->
      <app-lesson-step stepId="d2-act3-other-events" [stepNumber]="1" title="Other Events Exist">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>

        <p><strong>Do this:</strong> add a quick "hype clicks" counter using a different event:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="hypeDemoCode" />

        <p style="margin-top: 12px;">
          Double-click it a few times and watch the number climb. Any DOM event works the same way —
          <code>(input)</code>, <code>(submit)</code>, <code>(mouseenter)</code>, <code>(keyup)</code>, and
          dozens more. The pattern never changes: parentheses, an event name, an expression or method call.
        </p>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> A working double-click counter, built without looking anything up beyond the event name.</div>
      </app-lesson-step>

      <!-- Step 2 -->
      <app-lesson-step stepId="d2-act3-debug-it" [stepNumber]="2" title="Debug It — Three Classic Bugs">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>

        <p>Three snippets, three bugs. Read each one and predict what's wrong before opening the answer.</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="before" [code]="buggyTemplateCode" />

        <div class="think-about-it">
          <p class="tai-q">Each line looks almost right. What's actually broken in each of the three?</p>
        </div>
        <app-collapsible icon="✅" label="Show Answer — one bug per line">
          <p>
            <strong>Line 1:</strong> <code>[src]="{{ "{{ imageUrl }}" }}"</code> mixes property binding
            brackets with interpolation braces — pick exactly one. The fix is
            <code>[src]="imageUrl"</code>.
          </p>
          <p style="margin-top: 8px;">
            <strong>Line 2:</strong> <code>(click)="toggleWatched"</code> is missing the parentheses on the
            method call. Without them, Angular binds to the function reference itself instead of calling
            it — clicking does nothing, silently. The fix is <code>(click)="toggleWatched()"</code>.
          </p>
          <p style="margin-top: 8px;">
            <strong>Line 3:</strong> <code>[hidden]="'watched'"</code> binds to the string literal
            <code>'watched'</code>, which is always truthy, so the paragraph is always hidden. The fix drops
            the quotes: <code>[hidden]="watched"</code>, binding to the actual property.
          </p>
        </app-collapsible>

        <div class="warning-box">
          <strong>The pattern behind all three:</strong> Angular does exactly what you wrote, not what you
          meant. Brackets vs. braces, parentheses vs. no parentheses, and quotes vs. no quotes each change
          the meaning completely — and none of them throw an error, so read templates carefully.
        </div>

        <p>The fix — all three bugs corrected:</p>

        <app-code-block lang="html" file="src/app/show-card/show-card.html" variant="after" [code]="fixedTemplateCode" />

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can name all three bugs from memory, and explain why none of them crash the app.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/day2/act2" class="btn-secondary">← Act 2: Reacting to Events</a>
        <a routerLink="/day2/lab" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    {
      concept: 'Event binding is one general pattern',
      plainEnglish: 'Every DOM event uses the exact same (eventName)="expression" syntax, not a special case per event.',
      analogy: 'One universal power outlet shape that every appliance plugs into, no matter what the appliance does.'
    },
    {
      concept: 'No errors, just wrong behavior',
      plainEnglish: 'Binding mistakes like a missing bracket or missing parentheses usually fail silently instead of crashing.',
      analogy: 'A light switch wired to the wrong bulb — nothing breaks, the wrong thing just doesn\'t happen.'
    },
    {
      concept: 'Brackets, braces, parens all mean different things',
      plainEnglish: '[ ], {{ }}, and ( ) are three unrelated pieces of syntax that happen to look similar.',
      analogy: 'Three different keys that fit similar-looking locks — using the wrong one doesn\'t break the lock, it just doesn\'t open the door.'
    },
    {
      concept: 'Read templates like code',
      plainEnglish: 'A template line is an expression with exact rules, not loose prose — treat it with the same care as a line of TypeScript.',
      analogy: 'Reading a recipe\'s measurements exactly, not "about a cup-ish."'
    }
  ];

  hypeDemoCode = `<button (dblclick)="hype = hype + 1">🔥 {{ hype }}</button>`;

  buggyTemplateCode = `<img [src]="{{ imageUrl }}" />
<button (click)="toggleWatched">Toggle</button>
<p [hidden]="'watched'">Spoilers below…</p>`;

  fixedTemplateCode = `<img [src]="imageUrl" />
<button (click)="toggleWatched()">Toggle</button>
<p [hidden]="watched">Spoilers below…</p>`;
}
