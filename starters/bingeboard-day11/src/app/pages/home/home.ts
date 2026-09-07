import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `<h1>Welcome to BingeBoard</h1><p>Find your next great show and keep your queue in one place.</p><p>You're tracking {{ count() }} shows.</p><a routerLink="/browse">Browse shows</a> <a routerLink="/watchlist">Open watchlist</a>`
})
export class Home {
  count = inject(WatchlistService).count;
}
