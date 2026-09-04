import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day3-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 3 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The exact end-of-Day-2 BingeBoard, ready to run — so you spend today's time on signals, not on retyping yesterday's build-along and lab.</p>
      </div>

      <div class="info-box">
        <strong>Two ways to get there:</strong> clone and run a real project (fastest, and the only way that's actually type-checked), or copy each file below into your own project if you'd rather keep building on what you already have.
      </div>

      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li><strong>Clone the teaching site's repo</strong>, which includes this starter under <code>starters/bingeboard-day3/</code>.</li>
          <li><strong>Install and run it:</strong> <code>cd starters/bingeboard-day3 && npm install && npm start</code>.</li>
          <li><strong>Open</strong> the URL <code>ng serve</code> prints (usually <code>http://localhost:4200</code>).</li>
        </ul>
        <app-code-block lang="typescript" [code]="cloneCommand" />
        <p style="margin-top: 8px;">
          Prefer to browse the files first? View them directly on GitHub:
          <a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day3" target="_blank" rel="noopener">starters/bingeboard-day3</a>.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>
          Already have Day 2's BingeBoard building in your own project? You can skip Option A entirely —
          just use the checklist below to confirm your version matches. If you'd rather copy this exact
          reference implementation file-by-file instead, expand each file below.
        </p>

        <h4 style="margin-top: 20px;">App shell</h4>
        <app-collapsible icon="📄" label="src/app/app.ts">
          <app-code-block lang="typescript" [code]="appTsCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/main.ts">
          <app-code-block lang="typescript" [code]="mainTsCode" />
        </app-collapsible>

        <h4 style="margin-top: 20px;">Show card</h4>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.ts">
          <app-code-block lang="typescript" [code]="showCardTsCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.html">
          <app-code-block lang="html" [code]="showCardHtmlCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.css">
          <app-code-block lang="css" [code]="showCardCssCode" />
        </app-collapsible>
      </section>

      <section class="lesson-framework">
        <h3>What this code already does</h3>
        <ul>
          <li><strong>Day 2 Act 1:</strong> a fresh <code>bingeboard</code> project (replacing Day 1's <code>job-tracker</code>), with a generated <code>ShowCard</code> component using property binding (<code>[src]</code>, <code>[alt]</code>) and interpolation for the poster, title, and rating.</li>
          <li><strong>Day 2 Act 2:</strong> event binding (<code>(click)</code>) toggling a <code>watched</code> boolean, plus a <code>[class.watched]</code> and <code>[style.borderColor]</code> that both react to it.</li>
          <li><strong>Day 2 Lab:</strong> a <code>hype</code> counter driven by <code>(dblclick)</code> with a <code>.hot</code> class at 5+, a disabled-aware "Reset hype" button, and two independent <code>&lt;app-show-card /&gt;</code> instances on the page, each with its own state.</li>
        </ul>
      </section>

      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Two show cards render side by side, each with a poster, title, and rating.</li>
          <li><span class="checkbox">✅</span> Clicking "Mark as watched" on one card dims only that card and turns its border green — the other card is unaffected.</li>
          <li><span class="checkbox">✅</span> Double-clicking the 🔥 button increments its own card's hype count, and the card gets a red glow once hype reaches 5.</li>
          <li><span class="checkbox">✅</span> "Reset hype" is disabled at 0 and clears the count back to 0 when hype is above 0.</li>
        </ul>
      </section>

      <div class="warning-box">
        If any of those checks fail, don't push forward into Day 3 yet — go back to Day 2's Acts/Lab and get it working first. Everything today builds on top of this exact state, just converted to signals.
      </div>

      <div class="nav-footer">
        <a routerLink="/day2/lab" class="btn-secondary">← Day 2 Lab</a>
        <a routerLink="/day3/act1" class="btn-primary">Act 1: The Reactivity Mental Model →</a>
      </div>
    </div>
  `
})
export class Day3StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day3
npm install
npm start`;

  appTsCode = `import { Component } from '@angular/core';
import { ShowCard } from './show-card/show-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShowCard],
  template: \`
    <header class="app-nav">
      <span class="brand">📺 BingeBoard</span>
    </header>
    <main>
      <app-show-card />
      <app-show-card />
    </main>
  \`,
  styles: [\`
    .app-nav {
      display: flex; align-items: center; gap: 24px;
      padding: 14px 24px; border-bottom: 1px solid #2a2d35;
    }
    .brand { font-weight: 700; }
    main {
      display: flex;
      gap: 16px;
      padding: 24px;
      flex-wrap: wrap;
    }
  \`]
})
export class App {}`;

  mainTsCode = `import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App).catch(err => console.error(err));`;

  showCardTsCode = `import { Component } from '@angular/core';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  title = 'Severance';
  imageUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/423/1059131.jpg';
  rating = 8.7;
  watched = false;
  hype = 0;

  toggleWatched() {
    this.watched = !this.watched;
  }
}`;

  showCardHtmlCode = `<article class="card" [class.watched]="watched" [class.hot]="hype >= 5"
         [style.borderColor]="watched ? 'green' : '#ddd'">
  <img [src]="imageUrl" [alt]="title" width="140" />
  <h3>{{ title }}</h3>
  <p>Rating: {{ rating }} / 10</p>

  <button (click)="toggleWatched()">
    {{ watched ? 'Watched ✓' : 'Mark as watched' }}
  </button>

  <button (dblclick)="hype = hype + 1">🔥 {{ hype }}</button>

  <button (click)="hype = 0" [disabled]="hype === 0">
    Reset hype
  </button>
</article>`;

  showCardCssCode = `.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 180px;
}

.card.watched {
  opacity: 0.55;
}

.card.watched h3::after {
  content: ' ✓';
  color: green;
}

.card.hot {
  border-color: #f44747;
  box-shadow: 0 0 12px rgba(244, 71, 71, 0.6);
}`;
}
