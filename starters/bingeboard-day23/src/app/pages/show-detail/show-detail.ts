import { httpResource } from '@angular/common/http';
import { Component, computed, ElementRef, inject, input, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show, TvMazeEpisode, TvMazeShow, toShow } from '../../models/show';
import { WatchlistService } from '../../core/watchlist.service';
import { ReviewsService } from '../../core/reviews.service';
import { AuthService } from '../../core/auth.service';
import { bingeLevel } from '../../utils/binge-level';

// End-of-Day-21 ShowDetail: two independent httpResource()s (show +
// episodes), a graceful 404 branch, add()/remove() against the per-user
// WatchlistService, a review form + list backed by ReviewsService with
// authored reviews and author-only delete (Day 21 lab Task 1), and a
// sign-in nudge in place of the form/watchlist button for signed-out
// visitors (Day 21 lab Task 2).
@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="detail-main">
      @if (showRes.isLoading()) {
        <p class="muted">Loading show…</p>
      } @else if (showRes.error(); as err) {
        @if (isNotFound(err)) {
          <div class="not-found-box">
            <h2>That show doesn't exist (maybe it was cancelled?)</h2>
            <a routerLink="/">← Back to Browse</a>
          </div>
        } @else {
          <div class="error-box">
            <p>Could not reach the show database.</p>
            <button type="button" (click)="showRes.reload()">Retry</button>
          </div>
        }
      } @else if (show(); as s) {
        <article class="detail-card">
          <h1>{{ s.name }}</h1>
          <p>⭐ {{ s.rating }} · {{ s.genre }}</p>
          <div class="summary" [innerHTML]="s.summary"></div>
          @if (authSvc.isLoggedIn()) {
            <button type="button" (click)="toggleWatchlist(s)">
              @if (watchlistSvc.has(s.id)) {
                ★ On Watchlist
              } @else {
                ☆ Add to Watchlist
              }
            </button>
          } @else {
            <div class="signin-nudge">
              <p>Sign in to add this show to your watchlist.</p>
              <button type="button" (click)="authSvc.signIn()">Sign in with Google</button>
            </div>
          }
        </article>
      }
    </section>

    <section class="episodes-panel">
      <h2>Episodes</h2>

      @if (episodesRes.isLoading()) {
        <p class="muted">Loading episode list…</p>
      } @else if (episodesRes.error()) {
        <div class="error-box">
          <p>Could not load episodes.</p>
          <button type="button" (click)="episodesRes.reload()">Retry</button>
        </div>
      } @else if (episodesRes.hasValue()) {
        <p>{{ episodesRes.value().length }} episodes · {{ bingeLevel(episodesRes.value().length) }}</p>
      }
    </section>

    <section class="reviews-panel">
      <h2>Reviews</h2>

      @for (r of reviews(); track r.id) {
        <article class="review-card">
          <div class="review-author">
            <img [src]="r.authorPhoto" [alt]="r.authorName" class="avatar" />
            <strong>{{ r.authorName }}</strong>
          </div>
          <p>⭐ {{ r.rating }}</p>
          <p>{{ r.text }}</p>
          @if (r.ownerId === authSvc.user()?.uid) {
            <button type="button" (click)="reviewsSvc.delete(r.id)">Delete</button>
          }
        </article>
      } @empty {
        <p class="muted">No reviews yet — be the first.</p>
      }

      @if (authSvc.isLoggedIn()) {
        <form class="review-form" (submit)="submitReview($event)">
          <textarea #reviewText placeholder="Write a review…" required></textarea>
          <input #reviewRating type="number" min="1" max="10" placeholder="Rating (1-10)" required />
          <button type="submit">Post Review</button>
        </form>
      } @else {
        <div class="signin-nudge">
          <p>Sign in to write a review.</p>
          <button type="button" (click)="authSvc.signIn()">Sign in with Google</button>
        </div>
      }
    </section>
  `,
  styles: [`
    .detail-main, .episodes-panel, .reviews-panel { padding: 24px; max-width: 720px; }
    .summary { margin: 12px 0; line-height: 1.5; }
    .review-card { padding: 8px 0; border-top: 1px solid #2a2d35; }
    .review-author { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    .review-author .avatar { width: 20px; height: 20px; border-radius: 50%; }
    .review-form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; margin-top: 16px; }
    .review-form textarea, .review-form input { padding: 8px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
    .signin-nudge { padding: 12px; border: 1px dashed #3e3e42; border-radius: 8px; margin-top: 12px; }
  `]
})
export class ShowDetail {
  id = input.required<string>();

  watchlistSvc = inject(WatchlistService);
  reviewsSvc = inject(ReviewsService);
  authSvc = inject(AuthService);

  // Exposed so the template can call it directly -- templates only see
  // component instance members, not bare module-level imports.
  bingeLevel = bingeLevel;

  reviewText = viewChild<ElementRef<HTMLTextAreaElement>>('reviewText');
  reviewRating = viewChild<ElementRef<HTMLInputElement>>('reviewRating');

  private readonly base = 'https://api.tvmaze.com';

  showRes = httpResource<TvMazeShow>(() => `${this.base}/shows/${this.id()}`);
  episodesRes = httpResource<TvMazeEpisode[]>(() => `${this.base}/shows/${this.id()}/episodes`);

  show = computed(() => (this.showRes.hasValue() ? toShow(this.showRes.value()) : undefined));

  // forShow() returns a computed(); reading it inside this outer computed()
  // means `reviews` re-derives correctly whenever the route id changes.
  reviews = computed(() => this.reviewsSvc.forShow(Number(this.id()))());

  isNotFound(err: unknown): boolean {
    return (err as { status?: number })?.status === 404;
  }

  toggleWatchlist(s: Show) {
    if (this.watchlistSvc.has(s.id)) {
      this.watchlistSvc.remove(s.id);
    } else {
      this.watchlistSvc.add(s);
    }
  }

  submitReview(event: Event) {
    event.preventDefault();
    const text = this.reviewText()?.nativeElement.value.trim();
    const rating = Number(this.reviewRating()?.nativeElement.value);
    if (!text || !rating) return;
    this.reviewsSvc.add(Number(this.id()), text, rating);
    if (this.reviewText()) this.reviewText()!.nativeElement.value = '';
    if (this.reviewRating()) this.reviewRating()!.nativeElement.value = '';
  }
}
