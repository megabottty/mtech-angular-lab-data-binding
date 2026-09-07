import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Browse } from './pages/browse/browse';
import { hasWatchlistGuard } from './guards/has-watchlist';

export const routes: Routes = [
  { path: '', component: Home, title: 'BingeBoard' },
  { path: 'browse', component: Browse, title: 'Browse · BingeBoard' },
  {
    path: 'show/:id',
    loadComponent: () => import('./pages/show-detail/show-detail').then(m => m.ShowDetail),
    title: 'Show · BingeBoard'
  },
  {
    path: 'watchlist',
    loadComponent: () => import('./pages/watchlist/watchlist').then(m => m.Watchlist),
    title: 'My Watchlist · BingeBoard'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About),
    title: 'About · BingeBoard'
  },
  {
    path: 'stats',
    canActivate: [hasWatchlistGuard],
    loadComponent: () => import('./pages/stats/stats').then(m => m.Stats),
    title: 'Stats · BingeBoard'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: 'Lost? · BingeBoard'
  }
];
