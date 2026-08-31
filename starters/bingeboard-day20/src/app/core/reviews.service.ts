import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Day 19 lab Task 2 -- built from scratch, Firestore-backed from day one
// (there was never a prior signal-array version of this service anywhere
// in this app's real code). Two fields Day 19's own lab didn't need yet
// have been added here for Day 20's query work: `rating` (so reviews can
// be sorted "highest rated first"), and the timestamp field is named
// `createdAt` instead of Day 19's `postedAt`, to match today's
// orderBy('createdAt', ...) examples. This is a completely normal kind of
// schema growth -- Firestore has no migration to run, you just start
// writing the new field going forward.
export interface Review {
  id: string;
  showId: number;
  text: string;
  rating: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private firestore = inject(Firestore);
  private col = collection(this.firestore, 'reviews');

  // Day 19's naive approach: read the whole collection, filter client-side.
  // Day 20 Act 1 upgrades this to a real server-side query.
  private allReviews = toSignal(
    collectionData(this.col, { idField: 'id' }) as Observable<Review[]>,
    { initialValue: [] }
  );

  forShow(showId: number) {
    return computed(() => this.allReviews().filter(r => r.showId === showId));
  }

  async add(showId: number, text: string, rating: number) {
    await addDoc(this.col, {
      showId,
      text,
      rating,
      createdAt: new Date().toISOString(),
    });
  }
}
