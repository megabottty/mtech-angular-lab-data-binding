import { Component, inject } from '@angular/core';
import { WatchlistPanel } from '../../watchlist-panel/watchlist-panel';
import { WatchlistService } from '../../services/watchlist';
import { Show } from '../../models/show';

@Component({
  selector: 'app-watchlist-page',
  standalone: true,
  imports: [WatchlistPanel],
  template: `<h1>My Watchlist</h1><app-watchlist-panel [shows]="shows()" (remove)="remove($event)"><p empty-state>Nothing saved yet. Go browse some shows!</p></app-watchlist-panel>`
})
export class Watchlist {
  private service = inject(WatchlistService);
  shows = this.service.watchlist;
  remove(show: Show) { this.service.remove(show.id); }
}
