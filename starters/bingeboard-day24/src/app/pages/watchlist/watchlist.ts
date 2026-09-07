import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../core/watchlist.service';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';

// End-of-Day-19 Watchlist: entries now come straight from Firestore
// documents (Day 19 migration) instead of re-fetching each show by id --
// the document already carries name/rating/genre/imageUrl/runtime. Adds
// the watched checkbox + "N of M watched" (Day 19 lab Task 1), a note
// input (Day 19 Act 3), and "Added N days ago" via Day 17's timeAgo pipe
// (Day 19 lab Task 3).
@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [RouterLink, TimeAgoPipe],
  template: `
    <section class="watchlist">
      <h1>Watchlist</h1>

      @if (watchlistSvc.entries().length) {
        <p class="muted">{{ watchlistSvc.watchedCount() }} of {{ watchlistSvc.count() }} watched</p>

        <ul>
          @for (entry of watchlistSvc.entries(); track entry.docId) {
            <li class="entry">
              <a [routerLink]="['/show', entry.showId]">{{ entry.name }}</a>
              <span class="muted">Added {{ entry.addedAt | timeAgo }}</span>

              <label class="watched-toggle">
                <input
                  type="checkbox"
                  [checked]="entry.watched"
                  (change)="watchlistSvc.toggleWatched(entry.showId)"
                />
                Watched
              </label>

              <input
                class="note-input"
                placeholder="Add a note…"
                [value]="entry.note ?? ''"
                (blur)="saveNote(entry.showId, $event)"
              />
            </li>
          }
        </ul>
      } @else {
        <p class="muted">Nothing saved yet.</p>
      }
    </section>
  `,
  styles: [`
    .watchlist { padding: 24px; }
    .entry { display: flex; align-items: center; gap: 12px; padding: 8px 0; border-top: 1px solid #2a2d35; flex-wrap: wrap; }
    .watched-toggle { display: flex; align-items: center; gap: 4px; font-size: 13px; }
    .note-input { padding: 4px 8px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
  `]
})
export class Watchlist {
  watchlistSvc = inject(WatchlistService);

  saveNote(showId: number, event: FocusEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.watchlistSvc.setNote(showId, value);
  }
}
