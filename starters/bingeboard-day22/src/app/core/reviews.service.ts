import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Firestore, addDoc, collection, collectionData, deleteDoc, doc, limit, orderBy, query, where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// Day 19 lab Task 2 built this service from scratch, Firestore-backed
// from day one. Day 20 added the server-side query (where/orderBy/limit).
// Day 21 lab Task 1 adds authorship: every review now carries `ownerId`,
// `authorName`, and `authorPhoto`, and only the author may delete their
// own review (enforced by the Firestore rule, not just this UI).
export interface Review {
  id: string;
  showId: number;
  text: string;
  rating: number;
  createdAt: string;
  ownerId: string;
  authorName: string;
  authorPhoto: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private firestore = inject(Firestore);
  private authSvc = inject(AuthService);
  private col = collection(this.firestore, 'reviews');

  forShow(showId: number) {
    const reviewsForShow = query(
      this.col,
      where('showId', '==', showId),
      orderBy('createdAt', 'desc'),
      limit(10),
    );
    return toSignal(
      collectionData(reviewsForShow, { idField: 'id' }) as Observable<Review[]>,
      { initialValue: [] }
    );
  }

  async add(showId: number, text: string, rating: number) {
    const currentUser = this.authSvc.user();
    if (!currentUser) throw new Error('Sign in before writing a review.');
    await addDoc(this.col, {
      showId,
      text,
      rating,
      createdAt: new Date().toISOString(),
      ownerId: currentUser.uid,
      authorName: currentUser.displayName ?? 'Anonymous',
      authorPhoto: currentUser.photoURL ?? '',
    });
  }

  async delete(reviewId: string) {
    await deleteDoc(doc(this.firestore, 'reviews', reviewId));
  }
}
