import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Act 3 of 5</span>
        <h1>📡 Two-Way Binding with <code>[(ngModel)]</code></h1>
        <p class="subtitle">Make your HTML and JavaScript talk to each other — in both directions.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Connect form input and TypeScript state in one-way and two-way patterns.</li>
          <li><strong>Why It Matters:</strong> Most apps need user input to immediately affect what users see.</li>
          <li><strong>Build Steps:</strong> Data down with <code>[value]</code> → data up with <code>(input)</code> → combine with <code>[(ngModel)]</code>.</li>
          <li><strong>Expected Outcome:</strong> You can explain and implement two-way binding without guessing syntax.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 3 (Two-way binding)</p>
        <p><strong>Next step:</strong> Act 4 (Signals + computed)</p>
      </section>

      <!-- Build-up approach: 3 steps -->
      <app-lesson-step stepId="act3-oneway-down" [stepNumber]="1" title="Step 1 — One-Way Data DOWN: [property] (Data → Screen)">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>First, let's understand <strong>one-way binding going down</strong>. JavaScript owns the data. HTML just displays it.</p>

        <app-code-block lang="html" [code]="oneWayDown" />

        <div class="flow-diagram">
          <div class="flow-box js-box">📦 JavaScript<br /><code>searchTerm signal</code></div>
          <div class="flow-arrow">→ sets value →</div>
          <div class="flow-box html-box">📺 HTML Input<br /><code>[value]="searchTerm()"</code></div>
        </div>

        <div class="warning-box">
          <strong>⚠️ The problem:</strong> If a user types something into this input, <code>searchTerm</code> in JavaScript does NOT update. Data only flows <em>one direction</em>.
        </div>

        <app-collapsible icon="💡" label="Hint — What does the [ ] syntax mean in Angular?">
          <p>Square brackets <code>[property]</code> tell Angular to <strong>evaluate the expression</strong> and set it as the property. Without the brackets, it would treat it as a plain string:</p>
          <app-code-block lang="html" [code]="bracketHint" />
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — Define the signal first">
          <p>The template is reading from this TypeScript signal. If this line is missing, the binding has nothing to display.</p>
          <app-code-block lang="typescript" [code]="oneWayDownTs" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can send state from TypeScript to an input value.</div>
      </app-lesson-step>

      <app-lesson-step stepId="act3-oneway-up" [stepNumber]="2" title="Step 2 — One-Way Data UP: (event) (Screen → Data)">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Now let's add the <strong>return trip</strong>. HTML listens for user keypresses and sends the data back to JavaScript.</p>

        <app-code-block lang="html" [code]="oneWayUp" />

        <div class="flow-diagram">
          <div class="flow-box html-box">📺 HTML Input<br /><code>(input) event fires</code></div>
          <div class="flow-arrow">→ sends data →</div>
          <div class="flow-box js-box">📦 JavaScript<br /><code>searchTerm.set()</code></div>
        </div>

        <div class="info-box">
          <strong>What is <code>$event</code>?</strong><br />
          <code>$event</code> is the browser's native DOM event object. <code>$event.target.value</code> reads the current text inside the input box.
        </div>

        <div class="warning-box">
          <strong>⚠️ The problem:</strong> This works, but it's verbose. Every input field needs its own <code>(input)</code> handler. There's a much cleaner way...
        </div>

        <app-collapsible icon="💡" label="Hint — What does the ( ) syntax mean in Angular?">
          <p>Parentheses <code>(event)</code> tell Angular to <strong>listen for an event</strong> and run the expression when it fires. The most common events are <code>(click)</code>, <code>(input)</code>, <code>(change)</code>, and <code>(submit)</code>.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — The verbose two-way version (before ngModel)">
          <app-code-block lang="html" [code]="verboseAnswer" />
          <p style="margin-top:12px; color: #858585; font-size:13px;">This works! But we can do much better with <code>[(ngModel)]</code>.</p>
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — Move event logic into a method">
          <p>Inline handlers are okay for quick demos, but beginners should know the cleaner pattern:</p>
          <app-code-block lang="typescript" [code]="oneWayUpTs" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can capture user typing and write it back to a signal.</div>
      </app-lesson-step>

      <app-lesson-step stepId="act3-twoway" [stepNumber]="3" title="Step 3 — Two-Way Binding: [(ngModel)] (The Walkie-Talkie)">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Now we combine <code>[</code> (data down) and <code>(</code> (events up) into Angular's famous <strong>Banana in a Box</strong> syntax: <code>[(ngModel)]</code>.</p>

        <div class="banana-callout">
          <span class="banana">🍌</span>
          <div>
            <strong>Why "Banana in a Box"?</strong><br />
            <code>[(</code> looks like a banana <code>(</code> inside a box <code>[]</code>.<br />
            It's a silly mnemonic, but Angular developers never forget it!
          </div>
        </div>

        <app-code-block lang="html" [code]="ngModel" />

        <div class="diagram-box">{{ walkieTalkieDiagram }}</div>

        <div class="info-box">
          <strong>What this replaces:</strong> The single line <code>[(ngModel)]="searchTerm"</code> automatically handles both the <code>[value]="searchTerm()"</code> AND the <code>(input)="searchTerm.set($event.target.value)"</code> from the previous steps.
        </div>

        <div class="warning-box">
          <strong>🚨 CRITICAL — FormsModule is MANDATORY!</strong><br />
          <code>[(ngModel)]</code> will not work unless you import <code>FormsModule</code> in your component. This is the #1 mistake beginners make. If nothing is happening when you type, check this first!<br /><br />
          <app-code-block lang="typescript" [code]="formsModuleImport" />
        </div>

        <app-collapsible icon="💡" label="Hint — What happens if I forget FormsModule?">
          <p>Angular will silently fail or throw an error in the console: <em>"Can't bind to 'ngModel' since it isn't a known property of 'input'"</em>. Always check your imports array first when ngModel doesn't work.</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Complete component with FormsModule and [(ngModel)]">
          <app-code-block lang="typescript" [code]="fullTsAnswer" />
          <app-code-block lang="html" [code]="fullHtmlAnswer" />
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — Why this works end-to-end">
          <p>In one place, this snippet shows setup + signal state + template binding so beginners can connect all pieces.</p>
          <app-code-block lang="typescript" [code]="ngModelTsStarter" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can implement <code>[(ngModel)]</code> with <code>FormsModule</code> and explain the data flow.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/lesson/2" class="btn-secondary">← Act 2</a>
        <a routerLink="/lesson/4" class="btn-primary">Act 4: computed() →</a>
      </div>
    </div>
  `,
  styles: [`
    .flow-diagram {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #252526;
      border: 1px solid #3e3e42;
      border-radius: 8px;
      padding: 20px;
      margin: 16px 0;
      flex-wrap: wrap;
    }
    .flow-box {
      border-radius: 8px;
      padding: 12px 20px;
      text-align: center;
      font-size: 13px;
      line-height: 1.7;
      flex: 1;
      min-width: 160px;
    }
    .js-box { background: #1a2e4a; border: 1px solid #2a4a7a; color: #82aaff; }
    .html-box { background: #2e1a1a; border: 1px solid #7a2a2a; color: #f07178; }
    .flow-arrow { color: #858585; font-size: 18px; flex-shrink: 0; }

    .banana-callout {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      background: #1a2a1a;
      border: 1px solid #2a5c2a;
      border-radius: 8px;
      padding: 16px 20px;
      margin: 16px 0;
      font-size: 14px;
      color: #a0d0a0;
    }
    .banana { font-size: 36px; flex-shrink: 0; }
  `]
})
export class Act3Component {
  models: MentalModel[] = [
    { concept: '[property]', plainEnglish: '"Set this from JavaScript"', analogy: '📺 TV remote setting the channel — one direction only' },
    { concept: '(event)', plainEnglish: '"Listen for user action"', analogy: '🎤 Microphone picking up what user does' },
    { concept: '[(ngModel)]', plainEnglish: '"Talk both ways"', analogy: '📟 Walkie-talkie — sends AND receives' },
    { concept: 'FormsModule', plainEnglish: '"Unlock ngModel feature"', analogy: '🔑 Key that unlocks the walkie-talkie' }
  ];

  oneWayDown = `<!-- Data flows JavaScript → HTML only -->
<input [value]="searchTerm()" />

<!-- Problem: typing in the box does NOT update searchTerm in JavaScript -->`;

  oneWayUp = `<!-- Listens for user typing, sends it UP to JavaScript -->
<input (input)="searchTerm.set($event.target.value)" />`;

  bracketHint = `<!-- Without [] — treats it as a plain text string "searchTerm()" -->
<input value="searchTerm()" />

<!-- With [] — evaluates searchTerm() and uses the real value -->
<input [value]="searchTerm()" />`;

  ngModel = `<!-- ✅ The clean two-way way -->
<input [(ngModel)]="searchTerm" />

<!-- That's it! No more [value] + (input) separately -->`;

  oneWayDownTs = `import { signal } from '@angular/core';

// TypeScript source of truth for the input
searchTerm = signal('Severance');`;

  walkieTalkieDiagram = `
           ┌───────────────────────────┐
           │  JavaScript Signal         │
           │  searchTerm = signal('')   │
           └─────────────┬─────────────┘
                         │            ▲
            1. Sets      │            │  2. Updates
            Value        │            │  Signal
                         ▼            │
           ┌───────────────────────────┐
           │    <input [(ngModel)]>     │
           └───────────────────────────┘
  `;

  formsModuleImport = `// ✅ In your component's imports array:
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule], // 👈 THIS IS REQUIRED for [(ngModel)] to work!
  ...
})`;

  verboseAnswer = `<!-- One-way down + one-way up = manual two-way binding -->
<input 
  [value]="searchTerm()" 
  (input)="searchTerm.set($event.target.value)" 
/>`;

  oneWayUpTs = `onSearchInput(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.searchTerm.set(value);
}`;

  fullTsAnswer = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 MUST import this!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // 👈 AND add it here!
  templateUrl: './app.component.html'
})
export class AppComponent {
  searchTerm = signal('');
}`;

  ngModelTsStarter = `import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  template: \`
    <input [(ngModel)]="searchTerm" />
    <p>You typed: {{ searchTerm() }}</p>
  \`
})
export class AppComponent {
  searchTerm = signal('');
}`;

  fullHtmlAnswer = `<!-- Now this works perfectly! -->
<input 
  type="text" 
  placeholder="Search shows..." 
  [(ngModel)]="searchTerm" 
/>

<p>You typed: {{ searchTerm() }}</p>`;
}
