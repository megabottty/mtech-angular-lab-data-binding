import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { ShowsService } from '../../core/shows.service';

// End-of-Day-15 Stats: the "Now Watching" ticker (Day 15 lab Task 1) and the
// Top-Rated stream (Day 15 lab Task 2). Day 16 doesn't touch this page.
@Component({
  selector: 'app-stats',
  standalone: true,
  template: `
    <section class="stats">
      <h1>Stats</h1>

      <p class="ticker">
        You have been on this page for {{ secondsOnPage() }} seconds
        ({{ minutesEquivalent() }} minutes of TV).
      </p>

      <h2>Top Rated Shows</h2>
      @if (topRated().length) {
        <ul>
          @for (show of topRated(); track show.name) {
            <li>{{ show.name }} — ⭐ {{ show.rating }}</li>
          }
        </ul>
      } @else {
        <p class="muted">No 8+ rated shows found yet.</p>
      }
    </section>
  `,
  styles: [`
    .stats { padding: 24px; }
    .ticker { color: #9a9a9a; }
  `]
})
export class Stats {
  private showsSvc = inject(ShowsService);

  // Day 15 lab Task 1 — live ticker bridged into a signal.
  secondsOnPage = toSignal(interval(1000), { initialValue: 0 });
  minutesEquivalent = computed(() => (this.secondsOnPage() / 60).toFixed(2));

  // Day 15 lab Task 2 — operator-composed stream bridged into a signal.
  topRated = toSignal(this.showsSvc.topRated('office'), { initialValue: [] as { name: string; rating: number }[] });
}
