import { Injectable, computed, signal } from '@angular/core';

const STORAGE_KEY = 'bingeboard.watchlist';

function loadInitial(): number[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

// Day 9's watchlist, localStorage-backed. Watchlist just needs to know which
// show ids are saved — the Watchlist page re-fetches each show by id.
@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private ids = signal<number[]>(loadInitial());

  readonly all = this.ids.asReadonly();
  readonly count = computed(() => this.ids().length);

  has(id: number) {
    return this.ids().includes(id);
  }

  toggle(id: number) {
    this.ids.update(list => (list.includes(id) ? list.filter(x => x !== id) : [...list, id]));
    this.persist();
  }

  private persist() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.ids()));
  }
}
