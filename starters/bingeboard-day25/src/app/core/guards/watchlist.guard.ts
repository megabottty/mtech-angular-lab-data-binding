import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WatchlistService } from '../watchlist.service';

// Day 9 Act 3's guard: /watchlist only makes sense once something is on it.
export const hasWatchlistGuard: CanActivateFn = () => {
  const watchlist = inject(WatchlistService);
  const router = inject(Router);

  return watchlist.count() > 0 ? true : router.createUrlTree(['/']);
};
