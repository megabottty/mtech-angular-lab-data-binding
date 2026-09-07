import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

// Day 17 lab Tier 3 — a real 404 instead of a blank screen for any
// unmatched URL. Wired as the ** wildcard route, last in app.routes.ts.
@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="not-found">
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <a routerLink="/">← Back to Browse</a>
    </section>
  `,
  styles: [`
    .not-found { padding: 48px 24px; text-align: center; }
    h1 { font-size: 48px; margin-bottom: 8px; }
  `]
})
export class NotFound {}
