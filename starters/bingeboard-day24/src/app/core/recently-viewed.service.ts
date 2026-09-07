import { Injectable, signal } from '@angular/core';
import { Show } from '../models/show';

// Revived for Day 24: this is the exact Day 7 lab service (record a show,
// keep the 5 most recent, no duplicates) -- dropped from the app when
// Day 13 rewrote Browse's search around real HTTP and never got wired
// back in. It's worth having again here for one reason only: it's a
// plain signal() with zero constructor dependencies, which makes it the
// simplest possible thing to reach for TestBed on (Act 1) before Act 2
// tackles a service-with-dependencies test.
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
