import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signedInGuard } from './auth.guard';
import { AuthService } from '../auth.service';

// Day 24 lab Task 4 (the guard stretch), kept as a real spec file.
// runInInjectionContext lets a plain function guard call inject() the
// same way Angular would when it actually runs the guard -- no browser
// navigation required to prove either outcome.
describe('signedInGuard', () => {
  let router: Router;
  let fakeAuth: { isLoggedIn: () => boolean };

  function run() {
    return TestBed.runInInjectionContext(() =>
      signedInGuard({} as any, { url: '/watchlist' } as any)
    );
  }

  beforeEach(() => {
    fakeAuth = { isLoggedIn: () => true };
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AuthService, useValue: fakeAuth }],
    });
    router = TestBed.inject(Router);
  });

  it('allows a signed-in visitor through', () => {
    expect(run()).toBe(true);
  });

  it('redirects a signed-out visitor home with a returnUrl', () => {
    fakeAuth.isLoggedIn = () => false;
    const result = run();
    expect(result).toEqual(router.createUrlTree(['/'], { queryParams: { returnUrl: '/watchlist' } }));
  });
});
