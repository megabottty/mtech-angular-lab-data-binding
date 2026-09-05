import { Component, model } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [],
  template: `
    <span class="stars">
      @for (star of [1, 2, 3, 4, 5]; track star) {
        <button
          type="button"
          class="star"
          [class.filled]="star <= rating()"
          (click)="rating.set(star)"
        >★</button>
      }
    </span>
  `,
  styles: [`
    .star {
      background: none;
      border: none;
      cursor: pointer;
      font-size: 20px;
      color: #555;
      padding: 0 2px;
    }
    .star.filled { color: #f5c518; }
  `]
})
export class RatingStars {
  rating = model(0);
}
