import { httpResource } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TvMazeEpisode, TvMazeShow, toShow } from '../../models/show';
import { WatchlistService } from '../../core/watchlist.service';

// End-of-Day-14 ShowDetail: two independent httpResource()s (show + episodes,
// Day 14 lab Task 2) instead of a nested subscribe, and a graceful 404 branch
// (Day 14 lab Task 1) distinct from the generic connection-error message.
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
          <button type="button" (click)="watchlistSvc.toggle(s.id)">
            @if (watchlistSvc.has(s.id)) {
              ★ On Watchlist
            } @else {
              ☆ Add to Watchlist
            }
          </button>
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
        <p>{{ episodesRes.value().length }} episodes.</p>
      }
    </section>
  `,
  styles: [`
    .detail-main, .episodes-panel { padding: 24px; max-width: 720px; }
    .summary { margin: 12px 0; line-height: 1.5; }
  `]
})
export class ShowDetail {
  id = input.required<string>();

  watchlistSvc = inject(WatchlistService);

  private readonly base = 'https://api.tvmaze.com';

  showRes = httpResource<TvMazeShow>(() => `${this.base}/shows/${this.id()}`);
  episodesRes = httpResource<TvMazeEpisode[]>(() => `${this.base}/shows/${this.id()}/episodes`);

  show = computed(() => (this.showRes.hasValue() ? toShow(this.showRes.value()) : undefined));

  isNotFound(err: unknown): boolean {
    return (err as { status?: number })?.status === 404;
  }
}
