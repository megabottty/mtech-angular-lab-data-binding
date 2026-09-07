import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowCard } from '../../show-card/show-card';
import { Panel } from '../../panel/panel';
import { ShowsService } from '../../services/shows';
import { WatchlistService } from '../../services/watchlist';
import { RecentlyViewedService } from '../../services/recently-viewed';
import { Show } from '../../models/show';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [FormsModule, ShowCard, Panel],
  templateUrl: './browse.html',
  styleUrl: './browse.css'
})
export class Browse {
  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);
  private recentlySvc = inject(RecentlyViewedService);
  shows = this.showsSvc.all;
  searchTerm = signal('');
  selectedGenre = signal('All');
  sortBy = signal<'name' | 'rating'>('name');
  ratings = signal<Record<number, number | undefined>>({});
  genres = computed(() => ['All', ...new Set(this.shows().map(show => show.genre))]);
  filteredShows = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const genre = this.selectedGenre();
    return this.shows().filter(show => show.name.toLowerCase().includes(term)).filter(show => genre === 'All' || show.genre === genre).sort((a, b) => this.sortBy() === 'name' ? a.name.localeCompare(b.name) : b.rating - a.rating);
  });
  watchlist = this.watchlistSvc.watchlist;
  watchlistIds = computed(() => new Set(this.watchlist().map(show => show.id)));
  recentlyViewed = this.recentlySvc.recent;
  addShow(show: Show) { this.watchlistSvc.add(show); }
  removeShow(show: Show) { this.watchlistSvc.remove(show.id); }
  setRating(id: number, value: number) { this.ratings.update(map => ({ ...map, [id]: value })); }
  clearFilters() { this.searchTerm.set(''); this.selectedGenre.set('All'); }
  recordView(show: Show) { this.recentlySvc.record(show); }
}
