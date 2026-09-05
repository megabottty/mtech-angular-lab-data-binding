import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class RecentlyViewedService {
  private items = signal<Show[]>([]);
  readonly recent = this.items.asReadonly();

  record(show: Show) {
    this.items.update(list => [
      show,
      ...list.filter(item => item.id !== show.id)
    ].slice(0, 5));
  }
}
