import { Component, inject, signal } from '@angular/core';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';
import { ShowCard } from '../../shared/show-card';

// End-of-Day-14 Browse: Day 13's three-state search (loading/results/empty)
// plus Day 14's error signal + retry loop. #searchInput is the template ref
// Day 15's lab stretch task (fromEvent '/' shortcut) hooks into.
@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [ShowCard],
  template: `
    <section class="browse">
      <h1>Browse</h1>

      <div class="search-row">
        <input
          #searchInput
          placeholder="Search all of television…"
          (keyup.enter)="runSearch(searchInput.value)"
        />
        <button type="button" (click)="runSearch(searchInput.value)">Search</button>
      </div>

      @if (loading()) {
        <p class="muted">Searching…</p>
      } @else if (error()) {
        <div class="error-box">
          <p>{{ error() }}</p>
          <button type="button" (click)="runSearch(lastTerm())">Retry</button>
        </div>
      } @else if (shows().length) {
        <div class="grid">
          @for (show of shows(); track show.id) {
            <app-show-card [show]="show" />
          }
        </div>
      } @else if (searched()) {
        <p class="muted">No shows matched. Try another title.</p>
      }
    </section>
  `,
  styles: [`
    .browse { padding: 24px; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; max-width: 480px; }
    .search-row input { flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
    .search-row button { padding: 8px 14px; border-radius: 6px; border: 1px solid #3e3e42; background: #2a2d35; color: #e6e6e6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  `]
})
export class Browse {
  private showsSvc = inject(ShowsService);

  shows = signal<Show[]>([]);
  loading = signal(false);
  searched = signal(false);
  error = signal<string | null>(null);
  lastTerm = signal('');

  runSearch(term: string) {
    if (!term.trim()) return;

    this.lastTerm.set(term);
    this.loading.set(true);
    this.error.set(null);

    this.showsSvc.search(term).subscribe({
      next: shows => {
        this.shows.set(shows);
        this.loading.set(false);
        this.searched.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.error.set('Could not reach the show database. Check your connection and retry.');
      }
    });
  }
}
