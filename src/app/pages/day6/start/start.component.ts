import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';

@Component({
  selector: 'app-day6-start',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 6 · Starting Point</span>
        <h1>🎬 Get BingeBoard Running</h1>
        <p class="subtitle">The exact end-of-Day-5 BingeBoard — a filterable list of cards that talk to a watchlist — ready to run, so you spend today's time on composition instead of retyping five days of prior code.</p>
      </div>

      <div class="info-box">
        <strong>Two ways to get there:</strong> clone and run a real project (fastest, and the only way that's actually type-checked), or copy each file below into your own project if you'd rather keep building on what you already have.
      </div>

      <section class="lesson-framework">
        <h3>Option A — Run the starter (fastest)</h3>
        <ul>
          <li><strong>Clone the teaching site's repo</strong>, which includes this starter under <code>starters/bingeboard-day6/</code>.</li>
          <li><strong>Install and run it:</strong> <code>cd starters/bingeboard-day6 && npm install && npm start</code>.</li>
          <li><strong>Open</strong> the URL <code>ng serve</code> prints (usually <code>http://localhost:4200</code>).</li>
        </ul>
        <app-code-block lang="bash" [code]="cloneCommand" />
        <p style="margin-top: 8px;">
          Prefer to browse the files first? View them directly on GitHub:
          <a href="https://github.com/megabottty/mtech-angular-lab-data-binding/tree/main/starters/bingeboard-day6" target="_blank" rel="noopener">starters/bingeboard-day6</a>.
        </p>
      </section>

      <section class="lesson-framework">
        <h3>Option B — Bring your own project</h3>
        <p>
          Already have Day 5's BingeBoard building in your own project? You can skip Option A entirely —
          just use the checklist below to confirm your version matches. If you'd rather copy this exact
          reference implementation file-by-file instead, expand each file below.
        </p>

        <h4 style="margin-top: 20px;">App shell</h4>
        <app-collapsible icon="📄" label="src/app/app.ts">
          <app-code-block lang="typescript" file="src/app/app.ts" [code]="appTsCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.html">
          <app-code-block lang="html" file="src/app/app.html" [code]="appHtmlCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/app.css">
          <app-code-block lang="css" file="src/app/app.css" [code]="appCssCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/main.ts">
          <app-code-block lang="typescript" file="src/main.ts" [code]="mainTsCode" />
        </app-collapsible>

        <h4 style="margin-top: 20px;">Models</h4>
        <app-collapsible icon="📄" label="src/app/models/show.ts">
          <app-code-block lang="typescript" file="src/app/models/show.ts" [code]="showModelCode" />
        </app-collapsible>

        <h4 style="margin-top: 20px;">Show card</h4>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.ts">
          <app-code-block lang="typescript" file="src/app/show-card/show-card.ts" [code]="showCardTsCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.html">
          <app-code-block lang="html" file="src/app/show-card/show-card.html" [code]="showCardHtmlCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/show-card/show-card.css">
          <app-code-block lang="css" file="src/app/show-card/show-card.css" [code]="showCardCssCode" />
        </app-collapsible>

        <h4 style="margin-top: 20px;">Day 5 components</h4>
        <app-collapsible icon="📄" label="src/app/rating-stars/rating-stars.ts">
          <app-code-block lang="typescript" file="src/app/rating-stars/rating-stars.ts" [code]="ratingStarsCode" />
        </app-collapsible>
        <app-collapsible icon="📄" label="src/app/watchlist-panel/watchlist-panel.ts">
          <app-code-block lang="typescript" file="src/app/watchlist-panel/watchlist-panel.ts" [code]="watchlistPanelCode" />
        </app-collapsible>
      </section>

      <section class="lesson-framework">
        <h3>What this code already does</h3>
        <ul>
          <li><strong>Day 2:</strong> property, event, class, and style bindings on the show card, plus a hype meter with a disabled-aware reset button.</li>
          <li><strong>Day 3:</strong> the card is fully signal-based — <code>signal()</code> state, <code>computed()</code> derived values, a <code>linkedSignal()</code>, and an <code>effect()</code> persisting the episode count.</li>
          <li><strong>Day 4:</strong> a <code>Show</code> interface, eight shows rendered with <code>&#64;for</code> / <code>track</code> / <code>&#64;empty</code>, <code>&#64;switch</code> badges, and a combined search / genre / sort <code>filteredShows</code> computed.</li>
          <li><strong>Day 5:</strong> <code>ShowCard</code> takes <code>input.required&lt;Show&gt;()</code> and emits <code>output&lt;Show&gt;()</code>; <code>App</code> owns the watchlist and the per-show ratings; <code>RatingStars</code> and <code>WatchlistPanel</code> exist as their own components.</li>
        </ul>
      </section>

      <section class="lesson-framework">
        <h3>Verify before you start</h3>
        <ul class="task-checklist">
          <li><span class="checkbox">✅</span> Eight show cards render, each with a poster, name, genre, and rating.</li>
          <li><span class="checkbox">✅</span> Typing in the filter box, picking a genre, and switching the sort dropdown all work, and work together.</li>
          <li><span class="checkbox">✅</span> "Add to watchlist" puts the show in the panel at the top and immediately greys out that card's button.</li>
          <li><span class="checkbox">✅</span> Clicking ✕ in the watchlist panel removes the show and re-enables the card's button.</li>
          <li><span class="checkbox">✅</span> Clicking a star sets that show's rating, and it's still there after you filter the card away and bring it back.</li>
          <li><span class="checkbox">✅</span> The episode counter still works and survives a page refresh.</li>
        </ul>
      </section>

      <div class="warning-box">
        If any of those checks fail, don't push forward into Day 6 yet — go back to Day 5's Acts/Lab and get it working first. Everything today builds on top of this exact state.
      </div>

      <div class="nav-footer">
        <a routerLink="/day5/lab" class="btn-secondary">← Day 5 Lab</a>
        <a routerLink="/day6/act1" class="btn-primary">Act 1: Passing Markup with ng-content →</a>
      </div>
    </div>
  `
})
export class Day6StartComponent {
  cloneCommand = `git clone https://github.com/megabottty/mtech-angular-lab-data-binding.git
cd mtech-angular-lab-data-binding/starters/bingeboard-day6
npm install
npm start`;

  appTsCode = `import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowCard } from './show-card/show-card';
import { WatchlistPanel } from './watchlist-panel/watchlist-panel';
import { Show } from './models/show';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ShowCard, WatchlistPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  shows = signal<Show[]>([
    { id: 1, name: 'Severance',      genre: 'Drama',    rating: 8.7, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371406.jpg' },
    { id: 2, name: 'The Bear',       genre: 'Drama',    rating: 8.6, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/629/1574642.jpg' },
    { id: 3, name: 'Bluey',          genre: 'Kids',     rating: 9.5, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/512/1281879.jpg' },
    { id: 4, name: 'Slow Horses',    genre: 'Thriller', rating: 8.2, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/637/1593462.jpg' },
    { id: 5, name: 'The Last of Us', genre: 'Thriller', rating: 8.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/563/1409008.jpg' },
    { id: 6, name: 'Shogun',         genre: 'Drama',    rating: 9.1, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/506/1265637.jpg' },
    { id: 7, name: 'Ted Lasso',      genre: 'Comedy',   rating: 8.4, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/634/1585930.jpg' },
    { id: 8, name: 'Emily in Paris', genre: 'Comedy',   rating: 6.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/604/1510920.jpg' }
  ]);

  searchTerm = signal('');
  selectedGenre = signal('All');
  sortBy = signal<'name' | 'rating'>('name');

  genres = computed(() => ['All', ...new Set(this.shows().map(s => s.genre))]);

  filteredShows = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const genre = this.selectedGenre();

    return this.shows()
      .filter(s => s.name.toLowerCase().includes(term))
      .filter(s => genre === 'All' || s.genre === genre)
      .sort((a, b) =>
        this.sortBy() === 'name'
          ? a.name.localeCompare(b.name)
          : b.rating - a.rating
      );
  });

  watchlist = signal<Show[]>([]);
  watchlistIds = computed(() => new Set(this.watchlist().map(s => s.id)));

  ratings = signal<Record<number, number | undefined>>({});

  addShow(show: Show) {
    // keep this guard even though the button is disabled - the button is UI,
    // this is the rule
    if (this.watchlistIds().has(show.id)) return;
    this.watchlist.update(list => [...list, show]);
  }

  removeShow(show: Show) {
    this.watchlist.update(list => list.filter(s => s.id !== show.id));
  }

  setRating(id: number, value: number) {
    this.ratings.update(map => ({ ...map, [id]: value }));
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedGenre.set('All');
  }
}
`;

  appHtmlCode = `<header class="app-nav">
  <span class="brand">📺 BingeBoard</span>
</header>

<main>
  <app-watchlist-panel
    [shows]="watchlist()"
    (remove)="removeShow($event)"
  />

  <section class="filters">
    <input placeholder="Filter shows…" [(ngModel)]="searchTerm" />

    <select [(ngModel)]="selectedGenre">
      @for (genre of genres(); track genre) {
        <option [value]="genre">{{ genre }}</option>
      }
    </select>

    <select [(ngModel)]="sortBy">
      <option value="name">Sort by name</option>
      <option value="rating">Sort by rating</option>
    </select>
  </section>

  <p class="result-count">
    Showing {{ filteredShows().length }} of {{ shows().length }} shows
  </p>

  @if (shows().length > 3) {
    <p>{{ shows().length }} shows — you're building quite a list.</p>
  } @else {
    <p>Just getting started.</p>
  }

  <div class="card-grid">
    @for (show of filteredShows(); track show.id) {
      <app-show-card
        [show]="show"
        [alreadyAdded]="watchlistIds().has(show.id)"
        [myRating]="ratings()[show.id] ?? 0"
        (myRatingChange)="setRating(show.id, $event)"
        (addToWatchlist)="addShow($event)"
      />
    } @empty {
      <div class="empty-state">
        <p>No shows match those filters.</p>
        <button (click)="clearFilters()">Clear filters</button>
      </div>
    }
  </div>
</main>
`;

  appCssCode = `.app-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 14px 24px;
  border-bottom: 1px solid #2a2d35;
}

.brand { font-weight: 700; }

main { padding: 24px; }

.filters {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.filters input,
.filters select {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #3e3e42;
  background: #1c1f26;
  color: #e6e6e6;
}

.result-count {
  color: #b0b0b0;
  font-size: 14px;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin: 16px 0 32px;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  width: 180px;
}

.badge {
  display: inline-block;
  background: #2a2d35;
  border-radius: 6px;
  padding: 2px 8px;
  font-size: 12px;
  margin-right: 4px;
}

.badge.caution { background: #4a3524; color: #e0a76a; }
.badge.banger { background: #23402f; color: #6ed3a5; }

.empty-state {
  padding: 24px;
  border: 1px dashed #3e3e42;
  border-radius: 8px;
}

.tracker {
  border-top: 1px solid #2a2d35;
  padding-top: 16px;
}

.watchlist {
  border: 1px solid #2a2d35;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 20px;
}
`;

  showModelCode = `export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
}
`;

  mainTsCode = `import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';

bootstrapApplication(App).catch(err => console.error(err));
`;

  showCardTsCode = `import { Component, signal, computed, effect, linkedSignal, input, output, model } from '@angular/core';
import { Show } from '../models/show';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RatingStars],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  show = input.required<Show>();
  compact = input(false);
  alreadyAdded = input(false);

  addToWatchlist = output<Show>();
  myRating = model(0);

  episodeMinutes = 50;

  watched = signal(false);

  // keyed per show, so eight cards don't fight over one localStorage entry
  episodesWatched = linkedSignal(() =>
    Number(localStorage.getItem(\`episodes-\${this.show().id}\`) ?? 0)
  );

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
    this.season();
    return 1;
  });

  hype = 0;

  constructor() {
    effect(() => {
      localStorage.setItem(\`episodes-\${this.show().id}\`, String(this.episodesWatched()));
    });
  }

  add() {
    this.addToWatchlist.emit(this.show());
  }

  watchEpisode() {
    this.episodesWatched.update(n => n + 1);
  }

  toggleWatched() {
    this.watched.update(w => !w);
  }
}
`;

  showCardHtmlCode = `<article class="card"
         [class.watched]="watched()"
         [class.hot]="hype >= 5"
         [class.over-budget]="isOverBudget()"
         [class.compact]="compact()">

  @if (!compact()) {
    <img [src]="show().imageUrl" [alt]="show().name" width="140" />
  }

  <h3>{{ show().name }}</h3>
  <p>{{ show().genre }} · ⭐ {{ show().rating }}</p>

  @switch (show().genre) {
    @case ('Kids') { <span class="badge">👨‍👩‍👧 Family</span> }
    @case ('Thriller') { <span class="badge">🔪 Edge of seat</span> }
    @default { <span class="badge">📺 {{ show().genre }}</span> }
  }

  @if (show().rating < 7) {
    <span class="badge caution">⚠️ Proceed with caution</span>
  } @else if (show().rating >= 9) {
    <span class="badge banger">🏆 Certified banger</span>
  }

  @if (!compact()) {
    <p>Your rating:</p>
    <app-rating-stars [(rating)]="myRating" />

    <button (click)="add()" [disabled]="alreadyAdded()">
      @if (alreadyAdded()) {
        On your watchlist
      } @else {
        + Add to watchlist
      }
    </button>

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
    <button (click)="hype = 0" [disabled]="hype === 0">Reset hype</button>
  }
</article>
`;

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
}
`;

  ratingStarsCode = `import { Component, model } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  template: \`
    <span class="stars">
      @for (star of [1, 2, 3, 4, 5]; track star) {
        <button
          type="button"
          class="star"
          [class.filled]="star <= rating()"
          (click)="rating.set(star)"
        >★</button>
      }
    </span>
  \`,
  styles: [\`
    .star {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      color: #555;
      padding: 0 2px;
    }
    .star.filled { color: #f5c518; }
  \`]
})
export class RatingStars {
  rating = model(0);
}
`;

  watchlistPanelCode = `import { Component, input, output } from '@angular/core';
import { Show } from '../models/show';

@Component({
  selector: 'app-watchlist-panel',
  standalone: true,
  imports: [],
  template: \`
    <section class="watchlist">
      <h2>Your watchlist ({{ shows().length }})</h2>
      @for (show of shows(); track show.id) {
        <p class="row">
          {{ show.name }}
          <button (click)="remove.emit(show)" aria-label="Remove">✕</button>
        </p>
      } @empty {
        <p>Nothing saved yet. Add a show below.</p>
      }
    </section>
  \`,
  styles: [\`
    .row { display: flex; justify-content: space-between; align-items: center; }
    .row button { background: none; border: none; color: #f44747; cursor: pointer; }
  \`]
})
export class WatchlistPanel {
  shows = input.required<Show[]>();
  remove = output<Show>();
}
`;
}
