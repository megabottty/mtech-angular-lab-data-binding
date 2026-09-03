import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../models/show';
import { WatchlistService } from '../core/watchlist.service';
import { RuntimePipe } from '../pipes/runtime.pipe';
import { RatingBadgePipe } from '../pipes/rating-badge.pipe';

// The card Browse renders per result. Runtime is formatted through the
// Day 17 runtime pipe ("—" for 0/missing instead of a meaningless
// "~0 min/ep"), and the rating gets a ratingBadge verdict alongside it.
@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RouterLink, RuntimePipe, RatingBadgePipe],
  template: `
    <article class="show-card">
      <a [routerLink]="['/show', show().id]" class="poster-link">
        @if (show().imageUrl) {
          <img [src]="show().imageUrl" [alt]="show().name" />
        } @else {
          <div class="poster-fallback">{{ show().name }}</div>
        }
      </a>
      <div class="show-card-body">
        <a [routerLink]="['/show', show().id]" class="show-title">{{ show().name }}</a>
        <p class="show-meta">
          <span>⭐ {{ show().rating }} · {{ show().rating | ratingBadge }}</span>
          <span>{{ show().genre }}</span>
          @if (show().runtime) {
            <span class="runtime-badge">{{ show().runtime | runtime }}</span>
          }
        </p>
        <button type="button" (click)="toggleWatchlist()">
          @if (watchlistSvc.has(show().id)) {
            ★ On Watchlist
          } @else {
            ☆ Add to Watchlist
          }
        </button>
      </div>
    </article>
  `,
  styles: [`
    .show-card {
      background: #1c1f26;
      border: 1px solid #2a2d35;
      border-radius: 12px;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .poster-link { display: block; }
    img { width: 100%; height: 260px; object-fit: cover; display: block; }
    .poster-fallback {
      width: 100%; height: 260px; display: flex; align-items: center; justify-content: center;
      background: #2a2d35; color: #9a9a9a; text-align: center; padding: 12px;
    }
    .show-card-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 6px; }
    .show-title { font-weight: 600; color: #e6e6e6; text-decoration: none; }
    .show-meta { display: flex; gap: 10px; align-items: center; font-size: 13px; color: #b0b0b0; flex-wrap: wrap; }
    .runtime-badge { background: #2a2d35; border-radius: 6px; padding: 2px 6px; }
    button {
      background: #2a2d35; border: 1px solid #3e3e42; color: #e6e6e6;
      border-radius: 6px; padding: 6px 10px; align-self: flex-start;
    }
  `]
})
export class ShowCard {
  show = input.required<Show>();
  watchlistSvc = inject(WatchlistService);

  toggleWatchlist() {
    const s = this.show();
    if (this.watchlistSvc.has(s.id)) {
      this.watchlistSvc.remove(s.id);
    } else {
      this.watchlistSvc.add(s);
    }
  }
}
