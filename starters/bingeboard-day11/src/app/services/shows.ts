import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class ShowsService {
  private shows = signal<Show[]>([
    { id: 1, name: 'Severance', genre: 'Drama', rating: 8.7, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/548/1371406.jpg' },
    { id: 2, name: 'The Bear', genre: 'Drama', rating: 8.6, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/629/1574642.jpg' },
    { id: 3, name: 'Bluey', genre: 'Kids', rating: 9.5, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/512/1281879.jpg' },
    { id: 4, name: 'Slow Horses', genre: 'Thriller', rating: 8.2, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/637/1593462.jpg' },
    { id: 5, name: 'The Last of Us', genre: 'Thriller', rating: 8.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/563/1409008.jpg' },
    { id: 6, name: 'Shogun', genre: 'Drama', rating: 9.1, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/506/1265637.jpg' },
    { id: 7, name: 'Ted Lasso', genre: 'Comedy', rating: 8.4, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/634/1585930.jpg' },
    { id: 8, name: 'Emily in Paris', genre: 'Comedy', rating: 6.9, imageUrl: 'https://static.tvmaze.com/uploads/images/medium_portrait/604/1510920.jpg' }
  ]);

  readonly all = this.shows.asReadonly();

  byId(id: number) {
    return this.all().find(show => show.id === id);
  }
}
