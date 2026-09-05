import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ShowsService } from '../../services/shows';
import { WatchlistService } from '../../services/watchlist';

@Component({
  selector: 'app-show-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if (show(); as selected) {
      <img [src]="selected.imageUrl" [alt]="selected.name" width="240" />
      <h1>{{ selected.name }}</h1>
      <p>{{ selected.genre }} · ⭐ {{ selected.rating }}</p>
      <button [disabled]="onList()" (click)="add()">{{ onList() ? 'On your watchlist' : '+ Add to watchlist' }}</button>
    } @else {
      <h1>Show not found</h1>
      <p>That show is not in the catalog.</p>
      <a routerLink="/browse">Back to Browse</a>
    }
  `
})
export class ShowDetail {
  id = input.required<string>();
  private showsSvc = inject(ShowsService);
  private watchlistSvc = inject(WatchlistService);
  show = computed(() => this.showsSvc.byId(Number(this.id())));
  onList = computed(() => {
    const selected = this.show();
    return selected ? this.watchlistSvc.has(selected.id) : false;
  });
  add() {
    const selected = this.show();
    if (selected) this.watchlistSvc.add(selected);
  }
}
