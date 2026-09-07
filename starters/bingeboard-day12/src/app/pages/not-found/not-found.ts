import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `<h1>Lost?</h1><p>This page was cancelled after one season.</p><a routerLink="/">Take me home</a>`
})
export class NotFound {}
