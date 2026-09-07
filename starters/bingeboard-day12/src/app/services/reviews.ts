import { Injectable, signal, computed } from '@angular/core';
import { Review } from '../models/review';

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  private reviews = signal<Review[]>([]);

  readonly all = this.reviews.asReadonly();

  forShow(showId: number) {
    return computed(() => this.reviews().filter(r => r.showId === showId));
  }

  add(review: Review) {
    this.reviews.update(current => [...current, review]);
  }
}
