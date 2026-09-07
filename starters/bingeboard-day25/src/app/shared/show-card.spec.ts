import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { ShowCard } from './show-card';
import { WatchlistService } from '../core/watchlist.service';
import { AuthService } from '../core/auth.service';
import { Show } from '../models/show';

// Day 24 Act 2's own worked example, kept as a real spec file. ShowCard
// depends on WatchlistService and ReviewsService's neighbor AuthService --
// per Act 1's rule ("fake the neighbor, test the resident"), both are
// replaced with tiny useValue fakes so this test never opens a Firestore
// or Google popup connection.
const show: Show = {
  id: 1, name: 'Severance', genre: 'Drama', rating: 9.2,
  imageUrl: '', summary: '', runtime: 50,
};

describe('ShowCard', () => {
  let fixture: ComponentFixture<ShowCard>;
  let fakeWatchlist: { has: ReturnType<typeof vi.fn>; add: ReturnType<typeof vi.fn>; remove: ReturnType<typeof vi.fn> };
  let fakeAuth: { isLoggedIn: WritableSignal<boolean>; signIn: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    fakeWatchlist = { has: vi.fn().mockReturnValue(false), add: vi.fn(), remove: vi.fn() };
    fakeAuth = { isLoggedIn: signal(true), signIn: vi.fn() };

    TestBed.configureTestingModule({
      imports: [ShowCard],
      providers: [
        provideRouter([]),
        { provide: WatchlistService, useValue: fakeWatchlist },
        { provide: AuthService, useValue: fakeAuth },
      ],
    });
    fixture = TestBed.createComponent(ShowCard);
    fixture.componentRef.setInput('show', show);
    fixture.detectChanges();
  });

  it('renders the show name', () => {
    expect(fixture.nativeElement.querySelector('.show-title')?.textContent).toContain('Severance');
  });

  it('adds the show to the watchlist when the button is clicked', () => {
    fixture.nativeElement.querySelector('button')?.click();
    expect(fakeWatchlist.add).toHaveBeenCalledWith(show);
  });

  it('shows a sign-in nudge instead of a watchlist button when signed out', () => {
    fakeAuth.isLoggedIn.set(false);
    fixture.detectChanges();
    const nudge = fixture.nativeElement.querySelector('.signin-nudge-btn');
    expect(nudge?.textContent).toContain('Sign in to save');

    nudge?.click();
    expect(fakeAuth.signIn).toHaveBeenCalled();
  });
});
