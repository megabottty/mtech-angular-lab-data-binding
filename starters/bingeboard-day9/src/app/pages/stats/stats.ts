import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  template: `<h1>Your stats</h1><p>You are tracking {{ count() }} shows.</p>`
})
export class Stats {
  count = inject(WatchlistService).count;
}
