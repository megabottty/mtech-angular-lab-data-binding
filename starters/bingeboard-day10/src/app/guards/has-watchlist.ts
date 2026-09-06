import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../services/watchlist';

export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);
  return watchlist.count() > 0 ? true : router.createUrlTree(['/browse']);
};
