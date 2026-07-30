import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-act4',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Act 4 of 5</span>
        <h1>⚡ Connecting the Dots with <code>computed()</code></h1>
        <p class="subtitle">Build a live filter engine with zero manual DOM manipulation — using Signals.</p>
      </div>

      <app-mental-model-card [models]="models" />

      <section class="lesson-framework">
        <h3>Lesson Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Build reactive TypeScript state that auto-updates UI without manual DOM code.</li>
          <li><strong>Why It Matters:</strong> Real filtering/search UIs should update instantly when state changes.</li>
          <li><strong>Build Steps:</strong> Create signals → derive computed values → wire into template loops and conditions.</li>
          <li><strong>Expected Outcome:</strong> You can build a full filter flow from input signal to rendered cards.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Act 4 (Reactive engine)</p>
        <p><strong>Next step:</strong> Student Lab (independent build)</p>
      </section>

      <app-lesson-step stepId="act4-signals" [stepNumber]="1" title="What is a Signal? (The Reactive Container)">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Before we get to <code>computed()</code>, we need to understand what a Signal is — because we've been using them since Act 1!</p>

        <div class="signal-explainer">
          <div class="signal-box">
            <div class="signal-icon">📦</div>
            <div>
              <strong>A Signal is a reactive container</strong><br />
              It's like a box that holds a value AND announces to Angular whenever that value changes.
            </div>
          </div>
        </div>

        <app-code-block lang="typescript" [code]="signalBasics" />

        <div class="info-box">
          <strong>3 things to know about Signals:</strong><br />
          1. <strong>Create:</strong> <code>signal(initialValue)</code><br />
          2. <strong>Read:</strong> Call it like a function → <code>searchTerm()</code><br />
          3. <strong>Update:</strong> Use <code>.set(newValue)</code> or <code>.update(fn)</code>
        </div>

        <app-collapsible icon="💡" label="Hint — Why use signal() instead of a plain variable?">
          <p>With a plain variable like <code>let searchTerm = ''</code>, Angular doesn't know when it changes, so the HTML won't update automatically. Signals tell Angular: "Hey! My value changed — please re-render anything that uses me."</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — signal vs plain variable comparison">
          <app-code-block lang="typescript" [code]="signalVsVariable" />
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — Add explicit types for beginners">
          <p>When students are new, explicit types make code easier to read and debug.</p>
          <app-code-block lang="typescript" [code]="signalTypedStarter" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can create, read, and update signal state in TypeScript.</div>
      </app-lesson-step>

      <app-lesson-step stepId="act4-computed" [stepNumber]="2" title="What is computed()? (The Excel Formula)">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>If <code>signal()</code> is a cell with a value, <code>computed()</code> is an Excel formula that <strong>automatically recalculates</strong> whenever its source signals change.</p>

        <div class="excel-analogy">
          <div class="excel-col">
            <div class="excel-label">📊 Excel</div>
            <div class="excel-cell">A1 = 5</div>
            <div class="excel-cell">A2 = 10</div>
            <div class="excel-cell formula">A3 = =SUM(A1:A2) → 15</div>
            <small>Change A1 to 8 → A3 auto-updates to 18</small>
          </div>
          <div class="equals">≡</div>
          <div class="excel-col">
            <div class="excel-label">⚡ Angular Signals</div>
            <div class="excel-cell">price = signal(5)</div>
            <div class="excel-cell">qty = signal(10)</div>
            <div class="excel-cell formula">total = computed(() => price() * qty()) → 50</div>
            <small>Change price to 8 → total auto-updates to 80</small>
          </div>
        </div>

        <app-code-block lang="typescript" [code]="computedBasics" />

        <div class="info-box">
          <strong>Key rule:</strong> Never put <code>.set()</code> inside a <code>computed()</code>. It's read-only — it <em>derives</em> a value from other signals, it doesn't store new data.
        </div>

        <app-collapsible icon="💡" label="Hint — What happens when I change a signal that computed() depends on?">
          <p>Angular automatically tracks which signals were read inside <code>computed()</code>. When any of those change, Angular re-runs the function and updates anything that reads the computed value. You never need to manually trigger a re-render!</p>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — computed() with multiple dependencies">
          <app-code-block lang="typescript" [code]="computedAnswer" />
        </app-collapsible>

        <app-collapsible icon="🧩" label="TypeScript Side — computed() is read-only output">
          <p>This pattern separates raw state from derived state so students know where updates belong.</p>
          <app-code-block lang="typescript" [code]="computedTypedStarter" />
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can derive values with <code>computed()</code> and know not to call <code>.set()</code> inside it.</div>
      </app-lesson-step>

      <app-lesson-step stepId="act4-full" [stepNumber]="3" title="Putting It All Together — The Live TV Show Filter">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p>
        <p>Now let's combine everything from Acts 1–4 into one complete, working application. This is the full TV show filter your students will be expanding in the Lab.</p>

        <div class="info-box">
          <strong>📋 What this app does:</strong><br />
          • Stores a list of shows in a <code>signal()</code><br />
          • Binds a search box with <code>[(ngModel)]</code><br />
          • Auto-filters shows with <code>computed()</code> — zero button clicks needed!<br />
          • Displays results with <code>&#64;for</code>, badges with <code>&#64;switch</code>, ratings with <code>&#64;if</code>
        </div>

        <h4 style="margin: 20px 0 8px; color: #82aaff;">app.component.ts</h4>
        <app-code-block lang="typescript" [code]="fullTs" />

        <h4 style="margin: 20px 0 8px; color: #82aaff;">app.component.html</h4>
        <app-code-block lang="html" [code]="fullHtml" />

        <div class="ask-class">Walk through the code step by step. Can you trace the path from "user types in the search box" all the way to "a card disappears from the grid"? Try to explain each step out loud.</div>

        <app-collapsible icon="💡" label="Hint — Trace the data flow when user types 'The'">
          <ol class="hint-list">
            <li>User types "T" into the <code>&lt;input [(ngModel)]="searchTerm"&gt;</code></li>
            <li>Angular updates the <code>searchTerm</code> signal to "T"</li>
            <li><code>filteredShows</code> computed detects <code>searchTerm</code> changed</li>
            <li><code>filteredShows</code> re-runs its filter function with the new "T" value</li>
            <li>Angular re-renders only the <code>&#64;for</code> loop with the new results</li>
            <li>Cards that don't match disappear — zero manual DOM manipulation!</li>
          </ol>
        </app-collapsible>

        <app-collapsible icon="✅" label="Show Answer — Full working app (copy this as your starting point)">
          <p>The code above <em>is</em> the full working app! Copy both files exactly as shown. Remember to add <code>FormsModule</code> to your imports in the TypeScript file.</p>
        </app-collapsible>

        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> You can trace one keystroke all the way from input to filtered UI results.</div>
      </app-lesson-step>

      <div class="nav-footer">
        <a routerLink="/lesson/3" class="btn-secondary">← Act 3</a>
        <a routerLink="/lesson/5" class="btn-primary">Student Lab →</a>
      </div>
    </div>
  `,
  styles: [`
    .signal-explainer {
      margin: 16px 0;
    }
    .signal-box {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      background: #1a1a2e;
      border: 1px solid #2a2a5c;
      border-radius: 8px;
      padding: 20px;
      font-size: 14px;
      color: #a0b0e0;
    }
    .signal-icon { font-size: 36px; flex-shrink: 0; }

    .excel-analogy {
      display: flex;
      align-items: center;
      gap: 20px;
      background: #252526;
      border: 1px solid #3e3e42;
      border-radius: 8px;
      padding: 20px;
      margin: 16px 0;
      flex-wrap: wrap;
    }
    .excel-col { flex: 1; min-width: 180px; }
    .excel-label { font-weight: 700; font-size: 13px; color: #858585; margin-bottom: 10px; }
    .excel-cell {
      background: #1e1e1e;
      border: 1px solid #3e3e42;
      border-radius: 4px;
      padding: 6px 10px;
      font-family: monospace;
      font-size: 13px;
      color: #cccccc;
      margin-bottom: 4px;
    }
    .excel-cell.formula { background: #1a2e1a; border-color: #2a5c2a; color: #4ec9b0; }
    .excel-col small { font-size: 12px; color: #858585; display: block; margin-top: 8px; }
    .equals { font-size: 28px; color: #858585; }

    .hint-list {
      padding-left: 20px;
      color: #cccccc;
      font-size: 14px;
      line-height: 2;
    }
    .hint-list li { padding-left: 4px; }
  `]
})
export class Act4Component {
  models: MentalModel[] = [
    { concept: 'signal()', plainEnglish: '"A value that tells Angular when it changes"', analogy: '📦 Reactive box that rings a bell when contents change' },
    { concept: 'computed()', plainEnglish: '"Auto-calculated from other signals"', analogy: '📊 Excel formula — auto-recalculates when inputs change' },
    { concept: '.set()', plainEnglish: '"Replace the signal value"', analogy: '📝 Erasing and rewriting a whiteboard value' },
    { concept: '.update()', plainEnglish: '"Change based on current value"', analogy: '🔢 Adding to a running total' }
  ];

  signalBasics = `import { signal } from '@angular/core';

// 1. Create a signal with an initial value
searchTerm = signal('');
count = signal(0);
shows = signal([{ id: 1, title: 'Severance' }]);

// 2. Read a signal — call it like a function
console.log(this.searchTerm()); // ''
console.log(this.count()); // 0

// 3. Update a signal
this.searchTerm.set('Breaking Bad'); // replaces value
this.count.update(n => n + 1);       // based on current value`;

  signalVsVariable = `// ❌ Plain variable — Angular won't know it changed
export class AppComponent {
  searchTerm = ''; // Angular is blind to changes here
}

// ✅ Signal — Angular watches this and re-renders automatically
export class AppComponent {
  searchTerm = signal(''); // Angular reacts when this changes
}`;

  signalTypedStarter = `type Show = {
  id: number;
  title: string;
  genre: string;
  rating: number;
};

shows = signal<Show[]>([]);
searchTerm = signal<string>('');`;

  computedBasics = `import { signal, computed } from '@angular/core';

// Source signals
price = signal(10);
quantity = signal(3);

// computed() auto-recalculates when price() or quantity() changes
total = computed(() => this.price() * this.quantity());

// In template: {{ total() }} → 30
// Change price to 20 → total() automatically becomes 60`;

  computedAnswer = `import { signal, computed } from '@angular/core';

firstName = signal('Megan');
lastName = signal('Muirhead');

// Depends on TWO signals — updates when either changes
fullName = computed(() => \`\${this.firstName()} \${this.lastName()}\`);

// A computed can even depend on another computed!
greeting = computed(() => \`Hello, \${this.fullName()}!\`);`;

  computedTypedStarter = `type Show = { id: number; title: string; genre: string; rating: number };

shows = signal<Show[]>([]);
searchTerm = signal('');

// Derived state: recomputed whenever shows() or searchTerm() changes
filteredShows = computed(() => {
  const query = this.searchTerm().toLowerCase().trim();
  return this.shows().filter(show =>
    show.title.toLowerCase().includes(query)
  );
});`;

  fullTs = `import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms'; // 👈 MANDATORY

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule], // 👈 MANDATORY
  templateUrl: './app.component.html'
})
export class AppComponent {
  // 1. Raw list of shows
  shows = signal([
    { id: 1, title: 'Severance',  genre: 'Thriller', rating: 8.7 },
    { id: 2, title: 'The Bear',   genre: 'Drama',    rating: 8.6 },
    { id: 3, title: 'Bluey',      genre: 'Kids',     rating: 9.5 },
    { id: 4, title: 'Dark',       genre: 'Sci-Fi',   rating: 6.8 }
  ]);

  // 2. Bound to the search input box
  searchTerm = signal('');

  // 3. Auto-filtering engine (runs automatically whenever searchTerm changes!)
  filteredShows = computed(() => {
    const query = this.searchTerm().toLowerCase().trim();
    if (!query) return this.shows(); // return all when search is empty
    return this.shows().filter(show =>
      show.title.toLowerCase().includes(query)
    );
  });
}`;

  fullHtml = `<div class="search-bar">
  <label for="search">Find a Show:</label>
  <input
    id="search"
    type="text"
    placeholder="Type to filter..."
    [(ngModel)]="searchTerm"
  />
</div>

<p>Showing {{ filteredShows().length }} of {{ shows().length }} shows</p>

<div class="grid">
  <!-- Loop over filteredShows(), NOT shows() -->
  @for (show of filteredShows(); track show.id) {
    <div class="card">
      <h3>{{ show.title }}</h3>

      <!-- Genre Badge using @switch -->
      @switch (show.genre) {
        @case ('Kids') { <span class="badge green">👨‍👩‍👧 Family</span> }
        @default       { <span class="badge gray">{{ show.genre }}</span> }
      }

      <!-- Rating Flag using @if -->
      @if (show.rating >= 9.0) {
        <p class="highlight">🔥 Must Watch (⭐ {{ show.rating }})</p>
      } @else {
        <p>⭐ {{ show.rating }}</p>
      }
    </div>
  } @empty {
    <div class="no-results">
      <p>No titles match "{{ searchTerm() }}"</p>
    </div>
  }
</div>`;
}
