import { Injectable, computed, effect, signal } from '@angular/core';
import { Show } from '../models/show';

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly storageKey = 'bingeboard-watchlist';
  private items = signal<Show[]>(this.load());

  readonly watchlist = this.items.asReadonly();
  readonly count = computed(() => this.items().length);

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    });
  }

  add(show: Show) {
    this.items.update(list =>
      list.some(item => item.id === show.id) ? list : [...list, show]
    );
  }

  remove(id: number) {
    this.items.update(list => list.filter(show => show.id !== id));
  }

  has(id: number) {
    return this.items().some(show => show.id === id);
  }

  private load(): Show[] {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return [];

    try {
      return JSON.parse(saved) as Show[];
    } catch (error) {
      console.warn('Ignoring invalid saved watchlist', error);
      return [];
    }
  }
}
