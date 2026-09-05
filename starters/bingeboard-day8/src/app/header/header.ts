import { Component, inject } from '@angular/core';
import { WatchlistService } from '../services/watchlist';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  count = inject(WatchlistService).count;
}
