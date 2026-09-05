import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ShowCard } from './show-card/show-card';
import { WatchlistPanel } from './watchlist-panel/watchlist-panel';
import { Show } from './models/show';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ShowCard, WatchlistPanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  shows = signal<Show[]>([
    { id: 1, name: 'Severance',      genre: 'Drama',    rating: 8.7, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371406.jpg' },
    { id: 2, name: 'The Bear',       genre: 'Drama',    rating: 8.6, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/629/1574642.jpg' },
    { id: 3, name: 'Bluey',          genre: 'Kids',     rating: 9.5, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/512/1281879.jpg' },
    { id: 4, name: 'Slow Horses',    genre: 'Thriller', rating: 8.2, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/637/1593462.jpg' },
    { id: 5, name: 'The Last of Us', genre: 'Thriller', rating: 8.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/563/1409008.jpg' },
    { id: 6, name: 'Shogun',         genre: 'Drama',    rating: 9.1, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/506/1265637.jpg' },
    { id: 7, name: 'Ted Lasso',      genre: 'Comedy',   rating: 8.4, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/634/1585930.jpg' },
    { id: 8, name: 'Emily in Paris', genre: 'Comedy',   rating: 6.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/604/1510920.jpg' }
  ]);

  searchTerm = signal('');
  selectedGenre = signal('All');
  sortBy = signal<'name' | 'rating'>('name');

  genres = computed(() => ['All', ...new Set(this.shows().map(s => s.genre))]);

  filteredShows = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const genre = this.selectedGenre();

    return this.shows()
      .filter(s => s.name.toLowerCase().includes(term))
      .filter(s => genre === 'All' || s.genre === genre)
      .sort((a, b) =>
        this.sortBy() === 'name'
          ? a.name.localeCompare(b.name)
          : b.rating - a.rating
      );
  });

  watchlist = signal<Show[]>([]);
  watchlistIds = computed(() => new Set(this.watchlist().map(s => s.id)));

  ratings = signal<Record<number, number | undefined>>({});

  addShow(show: Show) {
    // keep this guard even though the button is disabled - the button is UI,
    // this is the rule
    if (this.watchlistIds().has(show.id)) return;
    this.watchlist.update(list => [...list, show]);
  }

  removeShow(show: Show) {
    this.watchlist.update(list => list.filter(s => s.id !== show.id));
  }

  setRating(id: number, value: number) {
    this.ratings.update(map => ({ ...map, [id]: value }));
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedGenre.set('All');
  }
}
