import { Routes } from '@angular/router';
import { hasWatchlistGuard } from './core/guards/watchlist.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/browse/browse').then(m => m.Browse),
    title: 'Browse · BingeBoard'
  },
  {
    path: 'show/:id',
    loadComponent: () => import('./pages/show-detail/show-detail').then(m => m.ShowDetail),
    title: 'Show · BingeBoard'
  },
  {
    path: 'stats',
    loadComponent: () => import('./pages/stats/stats').then(m => m.Stats),
    title: 'Stats · BingeBoard'
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./pages/watchlist/watchlist').then(m => m.Watchlist),
    canActivate: [hasWatchlistGuard],
    title: 'Watchlist · BingeBoard'
  },
  {
    path: 'suggest',
    loadComponent: () => import('./pages/suggest/suggest').then(m => m.Suggest),
    title: 'Suggest a Show · BingeBoard'
  }
];
