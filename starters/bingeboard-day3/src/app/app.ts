import { Component } from '@angular/core';
import { ShowCard } from './show-card/show-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ShowCard],
  template: `
    <header class="app-nav">
      <span class="brand">📺 BingeBoard</span>
    </header>
    <main>
      <app-show-card />
      <app-show-card />
    </main>
  `,
  styles: [`
    .app-nav {
      display: flex; align-items: center; gap: 24px;
      padding: 14px 24px; border-bottom: 1px solid #2a2d35;
    }
    .brand { font-weight: 700; }
    main {
      display: flex;
      gap: 16px;
      padding: 24px;
      flex-wrap: wrap;
    }
  `]
})
export class App {}
