import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore, collection, collectionData,
  addDoc, deleteDoc, doc, updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Show } from '../models/show';

// End-of-Day-19 WatchlistService: migrated from localStorage to Firestore,
// same public surface Day 19 Act 1 read as a contract (watchlist, count,
// has, add, remove) plus setNote/toggleWatched from Act 3 and the Day 19
// lab's watched field. The old toggle()/all() surface is gone -- ShowCard
// and ShowDetail now call add()/remove() directly (see below).
interface WatchlistDoc {
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
  private col = collection(this.firestore, 'watchlist');

  // R -- a live stream of the collection, landed as a signal.
  private items = toSignal(
    collectionData(this.col, { idField: 'docId' }) as Observable<(WatchlistDoc & { docId: string })[]>,
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
    await addDoc(this.col, {
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
