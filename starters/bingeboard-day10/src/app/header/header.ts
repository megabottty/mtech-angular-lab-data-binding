import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WatchlistService } from '../services/watchlist';
import { ShowsService } from '../services/shows';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  count = inject(WatchlistService).count;
  private router = inject(Router);
  private shows = inject(ShowsService);
  surprise() {
    const all = this.shows.all();
    const pick = all[Math.floor(Math.random() * all.length)];
    this.router.navigate(['/show', pick.id]);
  }
}
