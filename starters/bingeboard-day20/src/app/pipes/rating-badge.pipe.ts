import { Pipe, PipeTransform } from '@angular/core';

// Day 17 lab Tier 1 — a number becomes a verdict.
@Pipe({ name: 'ratingBadge' })
export class RatingBadgePipe implements PipeTransform {
  transform(rating: number | null | undefined): string {
    if (!rating) return 'Unrated';
    if (rating >= 8) return 'Certified banger';
    if (rating >= 6) return 'Solid';
    return 'Proceed with caution';
  }
}
