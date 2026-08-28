import { Component } from '@angular/core';

// Deliberately plain — Day 15 Act 3 and the Student Lab's Task 1 add the
// interval()/toSignal() "Now Watching" ticker here. Don't add streams yet.
@Component({
  selector: 'app-stats',
  standalone: true,
  template: `
    <section class="stats">
      <h1>Stats</h1>
      <p class="muted">Day 15 adds a live ticker to this page — nothing here yet.</p>
    </section>
  `,
  styles: [`
    .stats { padding: 24px; }
  `]
})
export class Stats {}
