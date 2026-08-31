import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Firestore, Timestamp, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// Day 18 lab, Tasks 2+3 -- a second collection built solo, sorted newest-first.
export interface Announcement {
  id: string;
  message: string;
  postedAt: Timestamp;
}

@Injectable({ providedIn: 'root' })
export class AnnouncementsService {
  private firestore = inject(Firestore);

  private announcements = toSignal(
    collectionData(
      collection(this.firestore, 'announcements'),
      { idField: 'id' }
    ) as Observable<Announcement[]>,
    { initialValue: [] }
  );

  // Client-side sort is fine at this scale -- see Day 18 lab Task 3 for the
  // tradeoff against query()/orderBy() at the server.
  sorted = computed(() =>
    [...this.announcements()].sort((a, b) => b.postedAt.toMillis() - a.postedAt.toMillis())
  );
}
