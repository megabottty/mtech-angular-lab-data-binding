import { Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ReviewsService } from '../services/reviews';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './review-form.html'
})
export class ReviewForm {
  showId = input.required<number>();

  private fb = inject(FormBuilder);
  private reviewsSvc = inject(ReviewsService);

  reviewForm = this.fb.nonNullable.group({
    rating: 8,
    headline: '',
    body: '',
    spoilers: false
  });

  submit() {
    const raw = this.reviewForm.getRawValue();

    this.reviewsSvc.add({
      showId: this.showId(),
      rating: raw.rating,
      headline: raw.headline,
      body: raw.body,
      spoilers: raw.spoilers,
      createdAt: new Date()
    });

    this.reviewForm.reset();
  }

  quickFillTen() {
    this.reviewForm.patchValue({ rating: 10 });
  }

  recommendPreset() {
    this.reviewForm.patchValue({
      rating: 9,
      headline: 'Highly recommend'
    });
  }
}
