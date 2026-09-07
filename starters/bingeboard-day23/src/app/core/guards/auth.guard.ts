import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

// Day 21 Act 2 + Lab Task 3 -- redirect signed-out visitors home, but
// remember where they were headed so sign-in can return them there
// instead of always landing on Browse.
export const signedInGuard: CanActivateFn = (_route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);

  return authSvc.isLoggedIn()
    ? true
    : router.createUrlTree(['/'], { queryParams: { returnUrl: state.url } });
};
