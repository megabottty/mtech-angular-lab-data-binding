import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day21-act2',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 21 · Act 2 of 3</span><h1>🔒 Private Watchlists, Locked Doors</h1><p class="subtitle">Identity becomes useful when each document belongs to its owner and private pages ask for a sign-in.</p></div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Angular's <a href="https://angular.dev/guide/routing/route-guards" target="_blank" rel="noopener">route guard guide</a> and Firebase's <a href="https://firebase.google.com/docs/firestore/query-data/queries" target="_blank" rel="noopener">query documentation</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Store an owner id, stream only that owner's watchlist, and use an auth guard for private routes.</li><li><strong>Why It Matters:</strong> "My watchlist" is a data relationship, not a visual filter added after downloading everybody's entries.</li><li><strong>Build Steps:</strong> Write <code>ownerId</code> → query from the auth stream → guard private routes → nudge signed-out visitors.</li><li><strong>Expected Outcome:</strong> Two accounts on one app see separate watchlists, and private links require sign-in.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 2 (Private Watchlists, Locked Doors)</p><p><strong>Next step:</strong> Act 3 (Rules That Enforce Ownership)</p><p><strong>Time:</strong> About 35 minutes.</p></section>
      <app-lesson-step stepId="d21-act2-owner-id" [stepNumber]="1" title="Put Ownership on Every New Watchlist Entry">
        <p><span class="effort-tag effort-short">Effort: Short</span></p><p>Inject <code>AuthService</code> into <code>WatchlistService</code>. Do not write unless there is a user, and write their immutable Firebase uid as <code>ownerId</code>.</p><app-code-block lang="typescript" [code]="ownerCode" />
        <div class="think-about-it"><p class="tai-q">Why store a uid instead of a display name as the ownership key?</p></div><app-collapsible icon="✅" label="Show Answer — names are presentation; uids are identity"><p>Display names can be absent, duplicated, or changed. Firebase assigns a stable uid that rules can compare directly with <code>request.auth.uid</code>. Keep a display name for people to read, but never use it to authorize access.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Sign in and add a show. You can inspect its Firestore document and see an <code>ownerId</code> equal to your Firebase uid.</div>
      </app-lesson-step>
      <app-lesson-step stepId="d21-act2-user-query" [stepNumber]="2" title="Query Only the Signed-In Person's Data">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p><p>Auth is asynchronous, and identity can change while the app is open. Turn the user signal into a stream, switch to a new Firestore query for each identity, and return an empty stream when signed out.</p><app-code-block lang="typescript" [code]="userQueryCode" />
        <div class="think-about-it"><p class="tai-q">What should the watchlist signal contain immediately after sign-out?</p></div><app-collapsible icon="✅" label="Show Answer — an empty array, not the previous account's rows"><p><code>switchMap</code> cancels the old user's collection stream and switches to <code>of([])</code>. That is both a privacy safeguard in the UI and a clear representation of "there is no current owner's watchlist."</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Sign in with two different accounts and add different shows. You can switch accounts and observe each account's own live watchlist, while sign-out empties it.</div>
      </app-lesson-step>
      <app-lesson-step stepId="d21-act2-auth-guard" [stepNumber]="3" title="Guard Routes, Then Nudge in Context">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p><p>Write a functional <code>CanActivateFn</code> that redirects signed-out visitors to sign-in, then apply it to <code>/watchlist</code>, <code>/stats</code>, and <code>/suggest</code>. Also hide or disable Add to Watchlist affordances and show an inline "Sign in to save this show" nudge where the action would have been.</p><app-code-block lang="typescript" [code]="guardCode" />
        <div class="think-about-it"><p class="tai-q">Does this guard secure Firestore data against a malicious request?</p></div><app-collapsible icon="✅" label="Show Answer — no; guards improve UX, rules enforce security"><p>A client-side guard makes navigation polite and clear, but anyone can bypass browser code or call Firestore directly. It is a UX door sign, not a lock. Act 3 adds server-enforced Firestore rules, which are the actual security boundary.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Visit a private route while signed out and get redirected, then sign in and revisit it. You can give a signed-out visitor a useful inline next action instead of a broken button.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day21/act1" class="btn-secondary">← Act 1: Firebase Auth Setup</a><a routerLink="/day21/act3" class="btn-primary">Act 3: Rules That Enforce Ownership →</a></div>
    </div>
  `
})
export class Act2Component {
  models: MentalModel[] = [
    { concept: 'ownerId', plainEnglish: 'The Firebase uid stored with a document to identify whose private data it is.', analogy: '🏷️ A permanent claim tag on each item in a locker.' },
    { concept: 'per-user query', plainEnglish: 'A server-side query that asks only for documents belonging to the current uid.', analogy: '📬 Opening only the mailbox with your name, not sorting all mail at home.' },
    { concept: 'switchMap', plainEnglish: 'A way to discard the old account stream and subscribe to the new account stream.', analogy: '🔀 Changing train lines and leaving the old platform behind.' },
    { concept: 'route guard', plainEnglish: 'A client-side navigation decision that directs visitors toward a valid screen.', analogy: '🚧 A helpful lobby sign that points you to reception before a private floor.' }
  ];
  ownerCode = `async add(show: Show) {
  const currentUser = this.authSvc.user();
  if (!currentUser) throw new Error('Sign in before adding a show.');
  await addDoc(this.col, {
    ownerId: currentUser.uid,
    showId: show.id,
    name: show.name,
    addedAt: new Date().toISOString()
  });
}`;
  userQueryCode = `readonly entries = toSignal(
  toObservable(this.authSvc.user).pipe(
    switchMap(currentUser => currentUser
      ? collectionData(
          query(this.col, where('ownerId', '==', currentUser.uid)),
          { idField: 'docId' }
        ) as Observable<WatchlistDoc[]>
      : of([])
    )
  ),
  { initialValue: [] }
);`;
  guardCode = `export const signedInGuard: CanActivateFn = (_, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);
  return authSvc.isLoggedIn()
    ? true
    : router.createUrlTree(['/sign-in'], { queryParams: { returnUrl: state.url } });
};

{ path: 'watchlist', canActivate: [signedInGuard], loadComponent: ... }`;
}
