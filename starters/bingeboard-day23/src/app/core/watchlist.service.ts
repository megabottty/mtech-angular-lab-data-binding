import { computed, inject, Injectable } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore, collection, collectionData, query, where,
  addDoc, deleteDoc, doc, updateDoc,
} from '@angular/fire/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { Show } from '../models/show';
import { AuthService } from './auth.service';

// End-of-Day-21 WatchlistService: migrated from localStorage to Firestore
// on Day 19 (watchlist, count, has, add, remove; setNote/toggleWatched
// from Act 3 and the Day 19 lab's watched field), then made per-user on
// Day 21 -- every document now carries an `ownerId`, and reads are a
// query scoped to the current uid instead of the whole collection.
interface WatchlistDoc {
  ownerId: string;
  showId: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
  summary: string;
  runtime: number;
  addedAt: string;
  watched: boolean;
  note?: string;
}

@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private firestore = inject(Firestore);
  private authSvc = inject(AuthService);
  private col = collection(this.firestore, 'watchlist');

  // R -- Day 21 Act 2: switch to a fresh, owner-scoped query stream every
  // time the signed-in user changes, or to an empty stream when signed out.
  private items = toSignal(
    toObservable(this.authSvc.user).pipe(
      switchMap(currentUser => currentUser
        ? collectionData(
            query(this.col, where('ownerId', '==', currentUser.uid)),
            { idField: 'docId' }
          ) as Observable<(WatchlistDoc & { docId: string })[]>
        : of([]))
    ),
    { initialValue: [] }
  );

  // Public surface -- unchanged shape from Day 19 Act 1's contract.
  readonly watchlist = computed(() =>
    this.items().map(d => ({
      id: d.showId, name: d.name, genre: d.genre,
      rating: d.rating, imageUrl: d.imageUrl, summary: d.summary,
      runtime: d.runtime,
    } satisfies Show))
  );
  readonly count = computed(() => this.items().length);
  readonly watchedCount = computed(() => this.items().filter(d => d.watched).length);

  // Raw entries, for the Watchlist page's richer UI (docId, addedAt, watched, note).
  readonly entries = this.items;

  has(id: number) {
    return this.items().some(d => d.showId === id);
  }

  // C
  async add(show: Show) {
    if (this.has(show.id)) return;
    const currentUser = this.authSvc.user();
    if (!currentUser) throw new Error('Sign in before adding a show.');
    await addDoc(this.col, {
      ownerId: currentUser.uid,
      showId: show.id, name: show.name, genre: show.genre,
      rating: show.rating, imageUrl: show.imageUrl, summary: show.summary,
      runtime: show.runtime ?? 0,
      addedAt: new Date().toISOString(),
      watched: false,
    });
  }

  // D -- we need the Firestore document id, so look it up from the live signal.
  async remove(showId: number) {
    const entry = this.items().find(d => d.showId === showId);
    if (!entry) return;
    await deleteDoc(doc(this.firestore, 'watchlist', entry.docId));
  }

  // U -- Day 19 Act 3's note field.
  async setNote(showId: number, note: string) {
    const entry = this.items().find(d => d.showId === showId);
    if (!entry) return;
    await updateDoc(doc(this.firestore, 'watchlist', entry.docId), { note });
  }

  // U -- Day 19 lab Task 1's watched toggle.
  async toggleWatched(showId: number) {
    const entry = this.items().find(d => d.showId === showId);
    if (!entry) return;
    await updateDoc(doc(this.firestore, 'watchlist', entry.docId), { watched: !entry.watched });
  }
}
