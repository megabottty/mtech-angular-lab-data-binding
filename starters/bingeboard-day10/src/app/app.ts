import { Component } from '@angular/core';
import { Header } from './header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Header, RouterOutlet],
  template: `<app-header /><main><router-outlet /></main><footer>Made for your next great binge.</footer>`
})
export class App {}
