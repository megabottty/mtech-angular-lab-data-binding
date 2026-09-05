import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Browse } from './pages/browse/browse';
import { Watchlist } from './pages/watchlist/watchlist';
import { About } from './pages/about/about';
import { NotFound } from './pages/not-found/not-found';
import { Stats } from './pages/stats/stats';
import { hasWatchlistGuard } from './guards/has-watchlist';
import { ShowDetail } from './pages/show-detail/show-detail';

export const routes: Routes = [
  { path: '', component: Home, title: 'BingeBoard' },
  { path: 'browse', component: Browse, title: 'Browse · BingeBoard' },
  { path: 'watchlist', component: Watchlist, title: 'My Watchlist · BingeBoard' },
  { path: 'about', component: About, title: 'About · BingeBoard' },
  { path: 'show/:id', component: ShowDetail, title: 'Show · BingeBoard' },
  { path: 'stats', loadComponent: () => import('./pages/stats/stats').then(m => m.Stats), canActivate: [hasWatchlistGuard], title: 'Stats · BingeBoard' },
  { path: '**', component: NotFound, title: 'Lost? · BingeBoard' }
];
