import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day24-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label lab-label">🛠️ Student Lab</span><h1>Your Turn — Fake the World, Test the Contract</h1><p class="subtitle">Write a component test, an HTTP recovery test, an auth-dependent DOM test, and — if you push into the stretch — a guard test, all without touching Google, Firestore, or a real network.</p></div>
      <div class="lab-intro"><h3>🎯 Starting Point</h3><p>Start from the <a routerLink="/day24/start">Day 24 Starting Point</a>, then complete Acts 1-3. Every task below fakes real app code you already have — none of it touches Firestore or the live TVMaze API.</p></div>
      <section class="lesson-framework"><h3>Lab Map</h3><ul><li><strong>Learning Goal:</strong> Choose the right fake boundary for four different real pieces of the app, and prove each one's contract without a real dependency behind it.</li><li><strong>Why It Matters:</strong> A fast, deterministic suite lets you test failure paths — a dead network, a signed-out visitor, an empty list — that are awkward or slow to reproduce by clicking around manually.</li><li><strong>Build Steps:</strong> Test a page component's contract against a faked service → prove a search failure recovers → prove the header renders both auth states → stretch into a route guard.</li><li><strong>Expected Outcome:</strong> Four real spec files, all green, each proving a genuine contract with zero real network or Firestore calls.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Day 24 Lab</p><p><strong>Next step:</strong> Review the Checkpoint below.</p><p><strong>Time:</strong> About 50 minutes for Tasks 1-3; Task 4 is open-ended.</p></section>

      <app-lesson-step stepId="d24-lab-watchlist-panel" [stepNumber]="'Task 1'" title="Test the Watchlist Page's Contract">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: faking a Firestore-backed service, list rendering, an empty state, a spy on a service method.</span></div>
        <h4>What to build:</h4>
        <p>The Watchlist page (<code>pages/watchlist/watchlist.ts</code>, sometimes described as "the watchlist panel") has no inputs or outputs of its own — it reads and acts entirely through an injected <code>WatchlistService</code>. Fake that one neighbor and you can prove its whole contract: how many entries render, what the empty state says, and that flipping a checkbox calls the right method with the right id.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Provide a fake <code>WatchlistService</code> with a real <code>signal</code> for <code>entries</code>, plain functions for <code>count</code>/<code>watchedCount</code>, and <code>vi.fn()</code> spies for <code>toggleWatched</code>/<code>setNote</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Render with two entries and assert two <code>.entry</code> rows, plus the "N of M watched" text.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Dispatch a <code>change</code> event on a checkbox and assert <code>toggleWatched</code> was called with that row's <code>showId</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Set the fake's <code>entries</code> signal to <code>[]</code>, call <code>detectChanges()</code> again, and assert the "Nothing saved yet." empty state.</span></div>
        </div>
        <div class="think-about-it"><p class="tai-q">Why is a real <code>signal()</code> the right choice for the fake's <code>entries</code>, instead of a plain array?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the template reads a signal, so the fake needs to behave like one"><p>The real template calls <code>watchlistSvc.entries()</code> as a function, and re-renders whenever that signal's value changes. A plain array fake would work for the first <code>detectChanges()</code> call, but reassigning it later wouldn't trigger anything — there'd be no way to prove the empty-state branch without recreating the whole fixture. A real <code>signal</code> lets one fixture cover both the populated and empty cases just by calling <code>.set([])</code> and detecting changes again.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A component spec proving the two-entry, watched-count, checkbox, and empty-state contracts — with zero real Firestore reads.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" [code]="watchlistPanelAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d24-lab-search-error" [stepNumber]="'Task 2'" title="Prove Browse Recovers from a Search Failure">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: faking a service at the component boundary, fake timers, a debounced RxJS pipeline.</span></div>
        <h4>What to build:</h4>
        <p>Act 3 tested <code>ShowsService</code>'s own unhandled HTTP error with <code>HttpTestingController</code>. This task tests one level up: <code>Browse</code>'s own <code>catchError</code>, the exact recovery code that turns that error into a visible message instead of an eternal spinner. Fake <code>ShowsService</code> itself this time — <code>Browse</code> never injects <code>HttpClient</code> directly, so there is no HTTP layer to intercept.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Provide a fake <code>ShowsService</code> whose <code>search()</code> returns <code>throwError(() =&gt; new Error('network down'))</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Call <code>vi.useFakeTimers()</code> before creating the fixture — Browse's pipeline runs through a real 300ms <code>debounceTime</code>.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Call <code>component.onType('office')</code>, then <code>vi.advanceTimersByTime(400)</code> to clear the debounce, then <code>detectChanges()</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Assert <code>component.error()</code> and the rendered <code>.error-box</code> text, and that <code>component.loading()</code> is back to <code>false</code>.</span></div>
        </div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A failing, faked search leaves no permanent spinner and produces the exact user-visible error text Browse's own <code>catchError</code> sets.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" [code]="searchErrorAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d24-lab-auth-ui" [stepNumber]="'Task 3'" title="Test the Signed-Out and Signed-In Header">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: a writable fake signal, faking two neighbors at once, conditional DOM.</span></div>
        <h4>What to build:</h4>
        <p>The app's header lives directly in <code>App</code> (<code>app.ts</code>) — there's no separate <code>Header</code> component to import. <code>App</code> injects both <code>AuthService</code> and <code>AnnouncementsService</code>; the second one is also Firestore-backed, so it needs a fake too even though this task isn't about announcements at all.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Provide a fake <code>AuthService</code> with a real, writable <code>user</code> signal, and a fake <code>AnnouncementsService</code> with <code>sorted: signal([])</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Set the fake user to <code>null</code>, render, and assert the DOM contains "Sign in with Google".</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Set the fake user to <code>&#123; displayName: 'Ada' &#125;</code>, call <code>detectChanges()</code> again on the same fixture, and assert the DOM now contains "Ada".</span></div>
        </div>
        <div class="think-about-it"><p class="tai-q">Why does one fixture, reused across both assertions, work here — instead of needing two separate <code>TestBed.createComponent</code> calls?</p></div>
        <app-collapsible icon="✅" label="Show Answer — a writable fake signal is exactly as live as the real one"><p><code>authSvc.user</code> is read inside an <code>&#64;if</code> in the template, so any signal write followed by <code>detectChanges()</code> re-evaluates that branch — a fake built from a real <code>signal()</code> is indistinguishable from the real <code>AuthService</code>'s own signal from the template's point of view. One fixture can walk through both states exactly like a real sign-in would.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Two assertions on one fixture prove the header's signed-out and signed-in contracts, using no popup and no real Firebase session.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" [code]="authUiAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d24-lab-guard-stretch" [stepNumber]="'Task 4 (Stretch)'" title="Stretch — Test signedInGuard">
        <div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: runInInjectionContext, a fake Router, UrlTree equality, query params.</span></div>
        <h4>What to build:</h4>
        <p>Act 1 tested <code>hasWatchlistGuard</code>. Do the same for <code>core/guards/auth.guard.ts</code>'s <code>signedInGuard</code> — a slightly harder case, because its redirect carries a <code>returnUrl</code> query param built from the attempted route.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Fake <code>AuthService</code> with a writable <code>isLoggedIn</code> signal, and provide <code>provideRouter([])</code> so a real <code>Router</code> exists to build comparison <code>UrlTree</code>s against.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Call the guard through <code>TestBed.runInInjectionContext</code>, passing a fake <code>ActivatedRouteSnapshot</code> and a <code>RouterStateSnapshot</code> with a real <code>url</code> string.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Signed in: assert the result is <code>true</code>. Signed out: assert it equals <code>router.createUrlTree(['/'], &#123; queryParams: &#123; returnUrl: theUrl &#125; &#125;)</code>.</span></div>
        </div>
        <div class="outcome-check">✅ <strong>Expected outcome (if attempted):</strong> Both guard outcomes are proven without a real navigation or a real signed-in session.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 4">
          <app-code-block lang="typescript" [code]="guardAnswer" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day24/act3" class="btn-secondary">← Act 3: HttpTestingController + Debugging</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card"><h3>Checkpoint</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> A service test gets a fresh instance every time, via <code>TestBed.configureTestingModule</code> in <code>beforeEach</code>.</li><li><span class="checkbox">✅</span> A component test covers a real input, real rendered DOM, and a real click — with faked DI neighbors standing in for Firestore and Auth.</li><li><span class="checkbox">✅</span> An HTTP test calls <code>httpMock.verify()</code> and covers both a mapped success and an unhandled 500.</li><li><span class="checkbox">✅</span> You can recite Day 7's promise about swappable dependencies and point at the exact <code>useValue</code> that makes it true.</li></ul></section>
      <div class="completion-card"><h2>🎉 Congratulations!</h2><p>You've finished Day 24: Testing II. You now know how to:</p><ul class="complete-list"><li>✅ Configure TestBed and give every test a fresh, isolated service instance.</li><li>✅ Replace a real dependency — Firestore, Auth, another service — with a safe DI fake.</li><li>✅ Test a component's input/DOM/click contract, even when it has no outputs at all.</li><li>✅ Control both a mapped HTTP success and an unhandled failure with HttpTestingController.</li><li>✅ Recognize a missing <code>setInput</code>, a missing <code>detectChanges</code>, and a null query from their symptoms alone.</li></ul><a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a></div>
    </div>
  `,
  styles: [`
    .lab-label { background: #4ec9b0 !important; color: #1e1e1e !important; }
    .lab-intro {
      background: #1a2e4a;
      border: 1px solid #2a4a7a;
      border-radius: 10px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .lab-intro h3 { color: #82aaff; margin-bottom: 8px; }
    .lab-intro p { font-size: 14px; color: #b0c8e0; }

    .task-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .difficulty {
      font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 12px;
    }
    .difficulty.easy { background: #1a2e1a; color: #4ec9b0; border: 1px solid #2a5c2a; }
    .difficulty.medium { background: #2a2a1a; color: #ff9d00; border: 1px solid #5c4a00; }
    .difficulty.hard { background: #2a1a1a; color: #f44747; border: 1px solid #5c1a1a; }
    .concepts { font-size: 12px; color: #858585; }

    .task-steps { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
    .task-step {
      display: flex; align-items: flex-start; gap: 12px;
      font-size: 14px; color: #cccccc;
    }
    .step-dot {
      width: 24px; height: 24px; background: #3e3e42;
      border-radius: 50%; display: flex; align-items: center;
      justify-content: center; font-size: 12px; font-weight: 700;
      flex-shrink: 0; color: #4fc3f7;
    }

    .checkpoint-card { margin-top: 32px; }

    .completion-card {
      background: linear-gradient(135deg, #1a2e1a, #0d1f0d);
      border: 2px solid #4ec9b0;
      border-radius: 12px;
      padding: 32px;
      margin-top: 40px;
      text-align: center;
    }
    .completion-card h2 { font-size: 28px; margin-bottom: 12px; }
    .completion-card p { color: #a0d0a0; margin-bottom: 16px; }
    .complete-list {
      list-style: none;
      padding: 0;
      display: inline-block;
      text-align: left;
    }
    .complete-list li {
      padding: 6px 0;
      font-size: 14px;
    }
  `]
})
export class Day24LabComponent {
  watchlistPanelAnswer = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { Watchlist } from './watchlist';
import { WatchlistService } from '../../core/watchlist.service';

describe('Watchlist page', () => {
  let fixture: ComponentFixture<Watchlist>;
  const toggleWatchedSpy = vi.fn();
  const setNoteSpy = vi.fn();

  const entries = signal([
    { docId: 'a', showId: 1, name: 'Severance', addedAt: new Date().toISOString(), watched: false, note: '' },
    { docId: 'b', showId: 2, name: 'The Bear', addedAt: new Date().toISOString(), watched: true, note: '' },
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Watchlist],
      providers: [
        provideRouter([]),
        { provide: WatchlistService, useValue: {
          entries,
          count: () => entries().length,
          watchedCount: () => entries().filter(e => e.watched).length,
          toggleWatched: toggleWatchedSpy,
          setNote: setNoteSpy,
        } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Watchlist);
    fixture.detectChanges();
  });

  it('renders one row per entry, plus the watched count', () => {
    expect(fixture.nativeElement.querySelectorAll('.entry')).toHaveLength(2);
    expect(fixture.nativeElement.textContent).toContain('1 of 2 watched');
  });

  it('calls toggleWatched with the right showId when a checkbox flips', () => {
    const checkbox = fixture.nativeElement.querySelectorAll('input[type="checkbox"]')[0];
    checkbox.dispatchEvent(new Event('change'));
    expect(toggleWatchedSpy).toHaveBeenCalledWith(1);
  });

  it('shows the empty state once every entry is gone', () => {
    entries.set([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Nothing saved yet.');
  });
});`;
  searchErrorAnswer = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { throwError } from 'rxjs';
import { Browse } from './browse';
import { ShowsService } from '../../core/shows.service';
import { FeaturedService } from '../../core/featured.service';
import { RecentlyViewedService } from '../../core/recently-viewed.service';

describe('Browse search error path', () => {
  let fixture: ComponentFixture<Browse>;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [Browse],
      providers: [
        provideRouter([]),
        { provide: ShowsService, useValue: { search: () => throwError(() => new Error('network down')) } },
        { provide: FeaturedService, useValue: { featured: signal([]) } },
        { provide: RecentlyViewedService, useValue: { recent: signal([]) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Browse);
    fixture.detectChanges();
  });

  afterEach(() => vi.useRealTimers());

  it('sets a visible error and clears loading after a failed search', () => {
    fixture.componentInstance.onType('office');
    vi.advanceTimersByTime(400); // clear debounceTime(300)
    fixture.detectChanges();

    expect(fixture.componentInstance.error()).toBe('Search failed — check your connection.');
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.nativeElement.querySelector('.error-box')?.textContent)
      .toContain('Search failed');
  });
});`;
  authUiAnswer = `import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { App } from './app';
import { AuthService } from './core/auth.service';
import { AnnouncementsService } from './core/announcements.service';

describe('App header', () => {
  let fixture: ComponentFixture<App>;
  const fakeUser = signal<{ displayName: string } | null>(null);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: {
          user: fakeUser,
          isLoggedIn: () => !!fakeUser(),
          signIn: async () => {},
          signOut: async () => {},
        } },
        { provide: AnnouncementsService, useValue: { sorted: signal([]) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
  });

  it('shows a sign-in button when signed out', () => {
    fakeUser.set(null);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Sign in with Google');
  });

  it('shows the display name once signed in', () => {
    fakeUser.set({ displayName: 'Ada' });
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Ada');
  });
});`;
  guardAnswer = `import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { signal } from '@angular/core';
import { signedInGuard } from './auth.guard';
import { AuthService } from '../auth.service';

describe('signedInGuard', () => {
  const fakeLoggedIn = signal(true);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: { isLoggedIn: fakeLoggedIn } },
      ],
    });
  });

  it('allows navigation when signed in', () => {
    fakeLoggedIn.set(true);
    const result = TestBed.runInInjectionContext(() =>
      signedInGuard({} as any, { url: '/watchlist' } as any));
    expect(result).toBe(true);
  });

  it('redirects home with a returnUrl when signed out', () => {
    fakeLoggedIn.set(false);
    const result = TestBed.runInInjectionContext(() =>
      signedInGuard({} as any, { url: '/watchlist' } as any));
    const router = TestBed.inject(Router);
    expect(result).toEqual(
      router.createUrlTree(['/'], { queryParams: { returnUrl: '/watchlist' } })
    );
  });
});`;
}
