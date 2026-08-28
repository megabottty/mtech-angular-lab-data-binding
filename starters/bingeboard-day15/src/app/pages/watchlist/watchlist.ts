import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';
import { WatchlistService } from '../../core/watchlist.service';

// Day 9's guarded /watchlist page: re-fetch each saved id from the live API.
@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="watchlist">
      <h1>Watchlist</h1>
      @if (shows().length) {
        <ul>
          @for (show of shows(); track show.id) {
            <li>
              <a [routerLink]="['/show', show.id]">{{ show.name }}</a>
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
  `]
})
export class Watchlist {
  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);

  private loaded = signal<Show[]>([]);
  shows = this.loaded.asReadonly();

  constructor() {
    for (const id of this.watchlistSvc.all()) {
      this.showsSvc.byId(id).subscribe(show => this.loaded.update(list => [...list, show]));
    }
  }
}
