import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day21-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label lab-label">🛠️ Student Lab</span><h1>Your Turn — Authored Reviews and a Better Sign-In Journey</h1><p class="subtitle">Four tasks: protect authorship, guide signed-out visitors, preserve intent, then stretch into profiles.</p></div>
      <div class="lab-intro"><h3>🎯 Starting Point</h3><p>Start from the <a routerLink="/day21/start">Day 21 Starting Point</a>, then complete Acts 1-3. You need Google sign-in, private watchlists, and deployed rules before these tasks make sense.</p></div>
      <section class="lesson-framework"><h3>Lab Map</h3><ul><li><strong>Learning Goal:</strong> Apply identity to another feature and make access control feel intentional rather than abrupt.</li><li><strong>Why It Matters:</strong> Auth is valuable only when it changes what people can safely do with their own data.</li><li><strong>Build Steps:</strong> Author reviews → add a nudge → return after sign-in → stretch to a profile page.</li><li><strong>Expected Outcome:</strong> Reviews visibly belong to their author and people return to the page they originally wanted.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Day 21 Lab (final step of Day 21)</p><p><strong>Next step:</strong> Review the Checkpoint below.</p><p><strong>Time:</strong> About 45 minutes for Tasks 1-3; Task 4 is open-ended.</p></section>
      <app-lesson-step stepId="d21-lab-review-author" [stepNumber]="'Task 1'" title="Reviews Have Authors, and Only Authors Delete Them"><div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: ownerId, attribution snapshots, author-only delete rules.</span></div><h4>What to build:</h4><p>When a signed-in person creates a review, write <code>ownerId</code>, <code>authorName</code>, and <code>authorPhoto</code> with it. Render the name and avatar on every review. Show Delete only for a review whose owner matches the current uid, then add the matching author-only delete rule.</p><div class="task-steps"><div class="task-step"><span class="step-dot">1</span><span>Extend the review document shape and <code>add()</code> method.</span></div><div class="task-step"><span class="step-dot">2</span><span>Render author identity and conditionally render Delete.</span></div><div class="task-step"><span class="step-dot">3</span><span>Add <code>delete(reviewId)</code> and test the server rule with two accounts.</span></div></div><div class="outcome-check">✅ <strong>Expected outcome:</strong> Create a review and see your identity beside it; sign in as another account and verify that account cannot see or successfully use its delete control.</div><app-collapsible icon="✅" label="Show Full Answer — Task 1"><app-code-block lang="typescript" [code]="reviewAuthorAnswerCode" /></app-collapsible></app-lesson-step>
      <app-lesson-step stepId="d21-lab-signin-nudge" [stepNumber]="'Task 2'" title="Replace Disabled Actions with a Sign-In Nudge"><div class="task-meta"><span class="difficulty easy">🟡 Easy</span><span class="concepts">Concepts: conditional UI, clear recovery action.</span></div><h4>What to build:</h4><p>On Show Detail, replace the review form and watchlist button for signed-out visitors with one clear inline message and a sign-in button. Keep the page's public content visible.</p><div class="think-about-it"><p class="tai-q">Why is a visible explanation better than a disabled button by itself?</p></div><app-collapsible icon="✅" label="Show Answer — it tells you both the reason and the next action"><p>A disabled control describes a limitation but not its cause or remedy. "Sign in to write a review" makes the requirement explicit and offers a next action without hiding the rest of the show page.</p></app-collapsible><div class="outcome-check">✅ <strong>Expected outcome:</strong> Open a show while signed out and use the inline sign-in nudge. You can make the unavailable action understandable without blocking public browsing.</div><app-collapsible icon="✅" label="Show Full Answer — Task 2"><app-code-block lang="typescript" [code]="signinNudgeAnswerCode" /></app-collapsible></app-lesson-step>
      <app-lesson-step stepId="d21-lab-return-url" [stepNumber]="'Task 3'" title="Return People to Where They Meant to Go"><div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: UrlTree query parameters, return URL validation.</span></div><h4>What to build:</h4><p>Preserve the requested URL when the guard redirects to your sign-in screen. After successful Google sign-in, navigate back to that internal URL; if it is absent or unsafe, go home.</p><app-collapsible icon="💡" label="Hint — Task 3"><app-code-block lang="typescript" [code]="returnUrlHint" /></app-collapsible><div class="outcome-check">✅ <strong>Expected outcome:</strong> Request <code>/watchlist</code> while signed out, sign in, and land on Watchlist rather than the home page. You can preserve a visitor's intent through authentication.</div><app-collapsible icon="✅" label="Show Full Answer — Task 3"><app-code-block lang="typescript" [code]="returnUrlAnswerCode" /></app-collapsible></app-lesson-step>
      <app-lesson-step stepId="d21-lab-profile-stretch" [stepNumber]="'Task 4 (Stretch)'" title="Profile Page"><div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: profile route, auth state, per-user review query.</span></div><h4>What to build:</h4><p>Create a private profile page with the current avatar, name, uid, watchlist count, and reviews authored by the current uid. Guard the route and keep the query empty after sign-out.</p><div class="outcome-check">✅ <strong>Expected outcome (if attempted):</strong> Visit your profile while signed in and see live identity and personal activity; visit while signed out and receive the same clear guard flow as other private pages.</div><app-collapsible icon="✅" label="Show Full Answer — Task 4"><app-code-block lang="typescript" [code]="profileStretchAnswerCode" /></app-collapsible></app-lesson-step>
      <div class="nav-footer"><a routerLink="/day21/act3" class="btn-secondary">← Act 3: Rules That Enforce Ownership</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card"><h3>Checkpoint</h3><ul class="task-checklist"><li><span class="checkbox">✅</span> Watchlist documents carry and enforce a real owner uid.</li><li><span class="checkbox">✅</span> Reviews have visible author identity and author-only delete.</li><li><span class="checkbox">✅</span> A signed-out person receives an explanation and useful next step.</li><li><span class="checkbox">✅</span> You can explain why a route guard is UX while Firestore rules are security.</li></ul></section>
      <div class="completion-card"><h2>🎉 Congratulations!</h2><p>You've finished Day 21: Firebase IV. You now know how to:</p><ul class="complete-list"><li>✅ Authenticate real people with Google and model auth's three states.</li><li>✅ Query and display private data per Firebase uid.</li><li>✅ Use guards for clear navigation without mistaking them for security.</li><li>✅ Enforce ownership and author permissions with Firestore rules.</li><li>✅ Turn a denied operation into a useful recovery message.</li></ul><a routerLink="/" class="btn-primary" style="display:inline-flex; margin-top: 20px">← Back to Home</a></div>
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
export class Day21LabComponent {
  returnUrlHint = `const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
await this.authSvc.signIn();
this.router.navigateByUrl(
  returnUrl?.startsWith('/') && !returnUrl.startsWith('//') ? returnUrl : '/'
);`;

  reviewAuthorAnswerCode = `// reviews.service.ts
async add(showId: number, text: string) {
  const currentUser = this.authSvc.user();
  if (!currentUser) throw new Error('Sign in before writing a review.');
  await addDoc(this.col, {
    showId,
    text,
    ownerId: currentUser.uid,
    authorName: currentUser.displayName ?? 'Anonymous',
    authorPhoto: currentUser.photoURL ?? '',
    createdAt: new Date().toISOString()
  });
}

async delete(reviewId: string) {
  await deleteDoc(doc(this.col, reviewId));
}

// show-detail.ts (template)
@for (review of reviews(); track review.docId) {
  <div class="review">
    <img [src]="review.authorPhoto" [alt]="review.authorName" />
    <strong>{{ review.authorName }}</strong>
    <p>{{ review.text }}</p>
    @if (review.ownerId === authSvc.uid) {
      <button (click)="reviewsSvc.delete(review.docId)">Delete</button>
    }
  </div>
}

// firestore.rules — reviews collection
match /reviews/{reviewId} {
  allow read: if true;
  allow create: if request.auth != null;
  allow update, delete: if request.auth != null
                        && request.auth.uid == resource.data.ownerId;
}`;

  signinNudgeAnswerCode = `<!-- show-detail.ts -->
@if (authSvc.isLoggedIn) {
  <app-review-form [showId]="show().id" />
  <button (click)="watchlistSvc.add(show())">Add to Watchlist</button>
} @else {
  <div class="signin-nudge">
    <p>Sign in to write a review or add this show to your watchlist.</p>
    <button (click)="authSvc.signIn()">Sign in with Google</button>
  </div>
}`;

  returnUrlAnswerCode = `// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  const authSvc = inject(AuthService);
  const router = inject(Router);
  if (authSvc.isLoggedIn) return true;
  return router.createUrlTree(['/sign-in'], {
    queryParams: { returnUrl: state.url }
  });
};

// sign-in.ts
async signIn() {
  const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  await this.authSvc.signIn();
  this.router.navigateByUrl(
    returnUrl?.startsWith('/') && !returnUrl.startsWith('//') ? returnUrl : '/'
  );
}`;

  profileStretchAnswerCode = `// profile.ts
export class Profile {
  private authSvc = inject(AuthService);
  private reviewsSvc = inject(ReviewsService);

  user = this.authSvc.user;
  myReviews = toSignal(
    toObservable(this.authSvc.user).pipe(
      switchMap(currentUser => currentUser
        ? collectionData(query(this.reviewsSvc.col, where('ownerId', '==', currentUser.uid)))
        : of([]))
    ),
    { initialValue: [] }
  );
}

// app.routes.ts
{ path: 'profile', loadComponent: () => import('./pages/profile/profile').then(m => m.Profile), canActivate: [authGuard] }`;
}
