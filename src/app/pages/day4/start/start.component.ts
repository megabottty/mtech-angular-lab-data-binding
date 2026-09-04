import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day4-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 4 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The exact end-of-Day-3 BingeBoard, ready to run — so you spend today's time on control flow and two-way binding, not on retyping three days of prior code.</p>
      </div>

      <div class="info-box">
        <strong>Two ways to get there:</strong> clone and run a real project (fastest, and the only way that's actually type-checked), or copy each file below into your own project if you'd rather keep building on what you already have.
      </div>

      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li><strong>Clone the teaching site's repo</strong>, which includes this starter under <code>starters/bingeboard-day4/</code>.</li>
          <li><strong>Install and run it:</strong> <code>cd starters/bingeboard-day4 && npm install && npm start</code>.</li>
          <li><strong>Open</strong> the URL <code>ng serve</code> prints (usually <code>http://localhost:4200</code>).</li>
        </ul>
        <app-code-block lang="typescript" [code]="cloneCommand" />
        <p style="margin-top: 8px;">
          Prefer to browse the files first? View them directly on GitHub:
          <a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day4" target="_blank" rel="noopener">starters/bingeboard-day4</a>.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>
          Already have Day 3's BingeBoard building in your own project? You can skip Option A entirely —
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
          <li><strong>Day 2:</strong> property, event, class, and style bindings on a two-card layout, plus a hype meter with a disabled-aware reset button.</li>
          <li><strong>Day 3 Acts 1-2:</strong> <code>watched</code> and <code>episodesWatched</code> as signals, with <code>minutesWatched</code> and <code>hours</code> as computeds read with <code>()</code> everywhere.</li>
          <li><strong>Day 3 Act 3:</strong> a <code>linkedSignal()</code>-based <code>nextEpisode</code> that resets to 1 whenever <code>season</code> changes.</li>
          <li><strong>Day 3 Lab:</strong> a <code>bingeLevel</code> computed label, a weekly budget with <code>minutesRemaining</code>/<code>isOverBudget</code> computeds, and an <code>effect()</code> persisting <code>episodesWatched</code> to <code>localStorage</code>.</li>
        </ul>
      </section>

      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Two show cards render side by side, each with a poster, title, and rating.</li>
          <li><span class="checkbox">✅</span> Clicking "+1 episode" on one card updates its own episode count, hours, and binge level — the other card is unaffected.</li>
          <li><span class="checkbox">✅</span> Watching enough episodes to pass 300 minutes flips a card into its over-budget style.</li>
          <li><span class="checkbox">✅</span> Clicking "skip" bumps the episode number; clicking "next season →" snaps it back to 1.</li>
          <li><span class="checkbox">✅</span> Refreshing the page keeps each card's episode count instead of resetting it to zero.</li>
        </ul>
      </section>

      <div class="warning-box">
        If any of those checks fail, don't push forward into Day 4 yet — go back to Day 3's Acts/Lab and get it working first. Everything today builds on top of this exact state.
      </div>

      <div class="nav-footer">
        <a routerLink="/day3/lab" class="btn-secondary">← Day 3 Lab</a>
        <a routerLink="/day4/act1" class="btn-primary">Act 1: A Real List →</a>
      </div>
    </div>
  `
})
export class Day4StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day4
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

  showCardTsCode = `import { Component, signal, computed, effect, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  title = 'Severance'; // fine as plain — it never changes (yet)
  imageUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/423/1059131.jpg';
  rating = 8.7;
  episodeMinutes = 50;

  watched = signal(false);
  episodesWatched = signal(Number(localStorage.getItem('episodesWatched') ?? 0));

  minutesWatched = computed(() => this.episodesWatched() * this.episodeMinutes);
  hours = computed(() => (this.minutesWatched() / 60).toFixed(1));

  bingeLevel = computed(() => {
    const n = this.episodesWatched();
    if (n === 0) return 'Not started';
    if (n < 5) return 'Casual';
    if (n < 10) return 'Invested';
    return 'Send help';
  });

  weeklyBudgetMinutes = signal(300);
  minutesRemaining = computed(() => this.weeklyBudgetMinutes() - this.minutesWatched());
  isOverBudget = computed(() => this.minutesRemaining() < 0);

  season = signal(1);
  nextEpisode = linkedSignal(() => {
    this.season(); // depends on season…
    return 1;       // …resets to 1 whenever season changes
  });

  hype = 0;

  constructor() {
    effect(() => {
      localStorage.setItem('episodesWatched', String(this.episodesWatched()));
    });
  }

  watchEpisode() {
    this.episodesWatched.update(n => n + 1);
  }

  toggleWatched() {
    this.watched.update(w => !w);
  }
}`;

  showCardHtmlCode = `<article class="card" [class.watched]="watched()" [class.hot]="hype >= 5" [class.over-budget]="isOverBudget()"
         [style.borderColor]="watched() ? 'green' : '#ddd'">
  <img [src]="imageUrl" [alt]="title" width="140" />
  <h3>{{ title }}</h3>
  <p>Rating: {{ rating }} / 10</p>

  <button (click)="toggleWatched()">
    {{ watched() ? 'Watched ✓' : 'Mark as watched' }}
  </button>

  <p>Episodes: {{ episodesWatched() }} · {{ hours() }} hrs</p>
  <button (click)="watchEpisode()">+1 episode</button>

  <p>Binge level: {{ bingeLevel() }}</p>
  <p [class.over-budget-text]="isOverBudget()">{{ minutesRemaining() }} minutes left this week</p>

  <p>S{{ season() }} · next up: E{{ nextEpisode() }}</p>
  <button (click)="nextEpisode.update(e => e + 1)">skip</button>
  <button (click)="season.update(s => s + 1)">next season →</button>

  <button (dblclick)="hype = hype + 1">🔥 {{ hype }}</button>

  <button (click)="hype = 0" [disabled]="hype === 0">
    Reset hype
  </button>
</article>`;

  showCardCssCode = `.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 220px;
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
}

.card.over-budget {
  border-color: #f44747;
  box-shadow: 0 0 0 2px rgba(244, 71, 71, 0.3);
}

.over-budget-text {
  color: #f44747;
}`;
}
