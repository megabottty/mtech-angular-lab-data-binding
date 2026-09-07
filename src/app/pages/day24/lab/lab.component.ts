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
      <div class="page-header"><span class="act-label lab-label">🛠️ Student Lab</span><h1>Your Turn — Fake the World, Test the Contract</h1><p class="subtitle">Write service, component, HTTP, and guard tests without touching Google, Firestore, or TVMaze.</p></div>
      <div class="lab-intro"><h3>🎯 Starting Point</h3><p>Start from the <a routerLink="/day24/start">Day 24 Starting Point</a>, then complete Acts 1-3. Keep real network and Firestore calls out of these unit tests.</p></div>
      <section class="lesson-framework"><h3>Lab Map</h3><ul><li><strong>Learning Goal:</strong> Choose the right fake boundary and prove real app contracts.</li><li><strong>Why It Matters:</strong> A fast, deterministic suite lets you test failures that are hard to reproduce manually.</li><li><strong>Build Steps:</strong> Test an input contract → test an HTTP error → test auth states → stretch into a guard.</li><li><strong>Expected Outcome:</strong> Your suite covers a service, component, HTTP method, and—if attempted—a guard.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Day 24 Lab</p><p><strong>Next step:</strong> Review the Checkpoint below.</p><p><strong>Time:</strong> About 50 minutes for Tasks 1-3; Task 4 is open-ended.</p></section>

      <app-lesson-step stepId="d24-lab-watchlist-panel" [stepNumber]="'Task 1'" title="Test a List Component's Contract">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: input rendering, empty states, output events.</span></div>
        <h4>What to build:</h4><p>Give <code>WatchlistPanel</code> three shows and assert three entries render. Give it an empty list and assert the empty state. Click the ✕ control on one entry and assert the right show id is emitted.</p>
        <div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Use <code>setInput</code> for the list, then call <code>detectChanges()</code>.</span></div><div class="task-step"><span class="step-dot">2</span><span>Query repeated entries and the empty-state element.</span></div><div class="task-step"><span class="step-dot">3</span><span>Subscribe to the output before clicking.</span></div></div>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A component spec proves the three-item, empty, and remove contracts. You can test a component without reaching into private methods.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 1"><app-code-block lang="typescript" [code]="panelAnswer" /></app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d24-lab-search-error" [stepNumber]="'Task 2'" title="Prove Search Recovers from a 500">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: HttpTestingController, sad paths, loading state.</span></div>
        <h4>What to build:</h4><p>Use <code>HttpTestingController</code> against the Browse search pipeline. Flush a 500 response and prove the error signal is set and loading becomes false. This is Day 14's eternal-spinner bug turned into a regression test.</p>
        <app-code-block lang="typescript" [code]="searchErrorAnswer" />
        <div class="think-about-it"><p class="tai-q">Why is a 500 response more valuable here than another happy-path fixture?</p></div>
        <app-collapsible icon="✅" label="Show Answer — failure behavior is the risk"><p>Happy paths prove the feature works when the world cooperates. The spinner bug appears when the world does not. A controlled 500 proves the cleanup branch runs every time.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A failing server response leaves no spinner running and produces a user-visible error state.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-lab-auth-ui" [stepNumber]="'Task 3'" title="Test Signed-Out and Signed-In Header States">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: writable fake signals, DI substitution, conditional DOM.</span></div>
        <h4>What to build:</h4><p>Provide one fake AuthService with a writable user signal. In one test set it to <code>null</code> and assert "Sign in"; in another set a user and assert the display name. Detect changes after each flip.</p>
        <app-code-block lang="typescript" [code]="authUiAnswer" />
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> Two tests prove the header's signed-out and signed-in contracts using no popup or Firebase session.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d24-lab-guard-stretch" [stepNumber]="'Task 4 (Stretch)'" title="Stretch — Test the Auth Guard">
        <div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: runInInjectionContext, fake providers, UrlTree outcomes.</span></div>
        <h4>What to build:</h4><p>Use <code>TestBed.runInInjectionContext</code> to call <code>authGuard</code> twice: once with a logged-in fake and once signed out. Assert <code>true</code> for the first and a <code>UrlTree</code> pointing home for the second.</p>
        <app-code-block lang="typescript" [code]="guardAnswer" />
        <div class="outcome-check">✅ <strong>Expected outcome (if attempted):</strong> Both guard outcomes are tested without navigating a browser.</div>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day24/act3" class="btn-secondary">← Act 3: HTTP Without a Network</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card"><h3>Checkpoint</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> A service test gets a fresh instance in <code>beforeEach</code>.</li><li><span class="checkbox">✅</span> A component test covers input, DOM, and output.</li><li><span class="checkbox">✅</span> An HTTP test calls <code>httpMock.verify()</code> and covers a 500.</li><li><span class="checkbox">✅</span> You can explain why DI makes fakes possible.</li></ul></section>
      <div class="completion-card"><h2>🎉 Congratulations!</h2><p>You've finished Day 24: Testing II. You now know how to:</p><ul class="complete-list"><li>✅ Configure TestBed and isolate service state.</li><li>✅ Replace dependencies with safe DI fakes.</li><li>✅ Test component contracts through fixtures and DOM events.</li><li>✅ Control HTTP success and failure without a network.</li></ul><a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a></div>
    </div>
  `,
  styles: [`
    .lab-label { background: #4ec9b0 !important; color: #1e1e1e !important; }
    .lab-intro { background: #1a2e4a; border: 1px solid #2a4a7a; border-radius: 10px; padding: 20px 24px; margin-bottom: 24px; }
    .lab-intro h3 { color: #82aaff; margin-bottom: 8px; }
    .lab-intro p { font-size: 14px; color: #b0c8e0; }
    .task-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; flex-wrap: wrap; }
    .difficulty { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 12px; }
    .difficulty.medium { background: #2a2a1a; color: #ff9d00; border: 1px solid #5c4a00; }
    .difficulty.hard { background: #2a1a1a; color: #f44747; border: 1px solid #5c1a1a; }
    .concepts { font-size: 12px; color: #858585; }
    .task-steps { display: flex; flex-direction: column; gap: 10px; margin: 16px 0; }
    .task-step { display: flex; align-items: flex-start; gap: 12px; font-size: 14px; color: #cccccc; }
    .step-dot { width: 24px; height: 24px; background: #3e3e42; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0; color: #4fc3f7; }
    .checkpoint-card { margin-top: 32px; }
    .completion-card { background: linear-gradient(135deg, #1a2e1a, #0d1f0d); border: 2px solid #4ec9b0; border-radius: 12px; padding: 32px; margin-top: 40px; text-align: center; }
    .completion-card h2 { font-size: 28px; margin-bottom: 12px; }
    .completion-card p { color: #a0d0a0; margin-bottom: 16px; }
    .complete-list { list-style: none; padding: 0; display: inline-block; text-align: left; }
    .complete-list li { padding: 6px 0; font-size: 14px; }
  `]
})
export class Day24LabComponent {
  panelAnswer = `fixture.componentRef.setInput('shows', [show1, show2, show3]);
fixture.detectChanges();
expect(fixture.nativeElement.querySelectorAll('.watchlist-entry'))
  .toHaveLength(3);

let removedId: number | undefined;
fixture.componentInstance.remove.subscribe(id => removedId = id);
fixture.nativeElement.querySelectorAll('button')[1]?.click();
expect(removedId).toBe(show2.id);`;
  searchErrorAnswer = `svc.search('office').subscribe();
const req = httpMock.expectOne(r => r.url.includes('/search/shows'));
req.flush('boom', { status: 500, statusText: 'Server Error' });
expect(svc.loading()).toBe(false);
expect(svc.error()).toBeTruthy();`;
  authUiAnswer = `const fakeAuth = {
  user: signal<User | null>(null),
  isLoggedIn: computed(() => !!fakeAuth.user()),
};
TestBed.configureTestingModule({
  imports: [App],
  providers: [{ provide: AuthService, useValue: fakeAuth }],
});
fixture = TestBed.createComponent(App);
fixture.detectChanges();
expect(fixture.nativeElement.textContent).toContain('Sign in');

fakeAuth.user.set({ uid: 'u1', displayName: 'Ada' } as User);
fixture.detectChanges();
expect(fixture.nativeElement.textContent).toContain('Ada');`;
  guardAnswer = `const result = TestBed.runInInjectionContext(() =>
  authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
expect(result).toBe(true); // signed-in fake

fakeAuth.user.set(null);
const redirected = TestBed.runInInjectionContext(() =>
  authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot));
expect(redirected).toEqual(router.createUrlTree(['/']));`;
}
