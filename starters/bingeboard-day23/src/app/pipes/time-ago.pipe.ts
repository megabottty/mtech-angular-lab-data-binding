import { Pipe, PipeTransform } from '@angular/core';

// Day 17 lab Tier 1 -- finally gets a real attachment point on Day 19's
// watchlist addedAt field. Handles just-now, singular/plural, and a
// future-dated value (clock skew) gracefully.
@Pipe({ name: 'timeAgo' })
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';
    const date = new Date(value);
    const seconds = (Date.now() - date.getTime()) / 1000;

    if (seconds < 60) return 'just now';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }
}
