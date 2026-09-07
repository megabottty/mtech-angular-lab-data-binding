import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowsService } from '../../services/shows';
import { WatchlistService } from '../../services/watchlist';
import { ReviewsService } from '../../services/reviews';
import { ReviewForm } from '../../review-form/review-form';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink, ReviewForm],
  template: `
    @if (show(); as selected) {
      <img [src]="selected.imageUrl" [alt]="selected.name" width="240" />
      <h1>{{ selected.name }}</h1>
      <p>{{ selected.genre }} · ⭐ {{ selected.rating }}</p>
      <button [disabled]="onList()" (click)="add()">{{ onList() ? 'On your watchlist' : '+ Add to watchlist' }}</button>

      @if (prevShowId() !== null && nextShowId() !== null) {
        <nav class="detail-nav">
          <a [routerLink]="['/show', prevShowId()]">← Previous show</a>
          <a [routerLink]="['/show', nextShowId()]">Next show →</a>
        </nav>
      }

      <app-review-form [showId]="selected.id" />

      <h2>Reviews</h2>
      @if (reviews().length === 0) {
        <p class="empty-state">No reviews yet — be the first!</p>
      } @else {
        @for (review of reviews(); track review.createdAt; let i = $index) {
          <article class="review-card">
            <p>⭐ {{ review.rating }}/10 — <strong>{{ review.headline }}</strong></p>
            @if (review.spoilers && !isRevealed(i)) {
              <p><em>Contains spoilers.</em> <button type="button" (click)="reveal(i)">Reveal review</button></p>
            } @else {
              <p>{{ review.body }}</p>
            }
          </article>
        }
      }
    } @else {
      <h1>Show not found</h1>
      <p>That show is not in the catalog.</p>
      <a routerLink="/browse">Back to Browse</a>
    }
  `
})
export class ShowDetail {
  id = input.required<string>();
  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);
  private reviewsSvc = inject(ReviewsService);
  show = computed(() => this.showsSvc.byId(Number(this.id())));
  reviews = computed(() => this.reviewsSvc.forShow(Number(this.id()))());
  onList = computed(() => {
    const selected = this.show();
    return selected ? this.watchlistSvc.has(selected.id) : false;
  });

  revealed = signal(new Set<number>());

  isRevealed(index: number) {
    return this.revealed().has(index);
  }

  reveal(index: number) {
    this.revealed.update(current => new Set(current).add(index));
  }

  currentIndex = computed(() =>
    this.showsSvc.all().findIndex(s => s.id === this.show()?.id)
  );

  prevShowId = computed(() => {
    const shows = this.showsSvc.all();
    const index = this.currentIndex();
    if (index === -1 || shows.length === 0) return null;
    return shows[(index - 1 + shows.length) % shows.length].id;
  });

  nextShowId = computed(() => {
    const shows = this.showsSvc.all();
    const index = this.currentIndex();
    if (index === -1 || shows.length === 0) return null;
    return shows[(index + 1) % shows.length].id;
  });

  add() {
    const selected = this.show();
    if (selected) this.watchlistSvc.add(selected);
  }
}
