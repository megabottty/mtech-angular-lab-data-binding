import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day21-act1',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label">Day 21 · Act 1 of 3</span>
        <h1>🔑 Firebase Auth — Real Users Arrive</h1>
        <p class="subtitle">Your app can finally know who is using it, rather than treating every browser as the same anonymous visitor.</p>
      </div>
      <div class="info-box"><strong>Before you start:</strong> run the end-of-Day-20 project and confirm reviews and watchlist data work. If you need the exact baseline, visit the <a routerLink="/day21/start">Day 21 Starting Point</a>.</div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Firebase's <a href="https://firebase.google.com/docs/auth/web/google-signin" target="_blank" rel="noopener">Google sign-in guide</a> and <a href="https://firebase.google.com/docs/auth/web/manage-users" target="_blank" rel="noopener">user-state guide</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Enable Google sign-in and expose Firebase's current user as signal-based application state.</li><li><strong>Why It Matters:</strong> A name in a header is not just decoration. Identity is what makes private data and permission checks possible.</li><li><strong>Build Steps:</strong> Enable the provider → provide Auth → build AuthService → render the three header states.</li><li><strong>Expected Outcome:</strong> You can sign in with Google, sign out, and see the header update without a reload.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 1 (Firebase Auth — Real Users Arrive)</p><p><strong>Next step:</strong> Act 2 (Private Watchlists and Locked Routes)</p><p><strong>Time:</strong> About 30 minutes.</p></section>

      <app-lesson-step stepId="d21-act1-provider" [stepNumber]="1" title="Enable Google, Then Provide Auth">
        <p><span class="effort-tag effort-short">Effort: Short</span></p>
        <p>In Firebase Console, open <strong>Authentication → Sign-in method</strong>, enable Google, and choose a support email. Then add Auth beside your existing Firebase providers.</p>
        <app-code-block lang="typescript" [code]="authProviderCode" />
        <div class="think-about-it"><p class="tai-q">Why is enabling Google in the console not enough by itself?</p></div>
        <app-collapsible icon="✅" label="Show Answer — the console permits it; the app still needs the service"><p>The console allows Firebase to use Google as an identity provider. <code>provideAuth</code> creates the Auth service in this Angular app so code can ask for the current user and begin a sign-in flow. One is cloud configuration; the other is application wiring.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Enable Google in the Firebase console and add <code>provideAuth</code> to your configuration. You can now inject Firebase Auth into an Angular service.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d21-act1-auth-service" [stepNumber]="2" title="Make Identity One Shared Service">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Create an <code>AuthService</code>. The initial <code>undefined</code> value is meaningful: Firebase has not told you whether a saved sign-in exists yet. After that first answer, the value is either a user or <code>null</code>.</p>
        <app-code-block lang="typescript" [code]="authServiceCode" />
        <div class="think-about-it"><p class="tai-q">What are the three states of <code>user()</code>, and why must the header distinguish the first one?</p></div>
        <app-collapsible icon="✅" label="Show Answer — booting, signed out, and signed in"><p><code>undefined</code> means the auth SDK is still restoring state; <code>null</code> means that work finished and nobody is signed in; a <code>User</code> means someone is signed in. Treating booting as signed out causes a distracting flash of the sign-in button, then an abrupt switch to an avatar.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Add an AuthService with a <code>toSignal(user(...))</code> field, computed login state, and popup sign-in/sign-out methods. You can ask one service for identity anywhere in the app.</div>
      </app-lesson-step>

      <app-lesson-step stepId="d21-act1-header-state" [stepNumber]="3" title="Render the Header's Three Honest States">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p>
        <p>Inject <code>AuthService</code> in your app shell. During boot, reserve the same small space for a loading label. When signed out, offer Google sign-in. When signed in, the header displays the photo and display name plus a sign-out button.</p>
        <app-code-block lang="typescript" [code]="headerCode" />
        <div class="warning-box"><strong>Popup failures are normal failures.</strong> A popup can be blocked, closed, or rejected. Catch the promise in <code>signIn</code>, keep the app usable, and show a friendly message such as "Sign-in did not finish. Try again when you are ready."</div>
        <div class="think-about-it"><p class="tai-q">Should a failed sign-in leave a fake local user in the header?</p></div>
        <app-collapsible icon="✅" label="Show Answer — no, let Firebase remain the source of truth"><p>No. The header should render only Firebase's observed user state. A rejected popup has not authenticated anyone, so keep the signed-out state and surface a recoverable message. Inventing local identity would make the UI disagree with later permission checks.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Sign in, observe your name and avatar in the header, then sign out. You can handle a dismissed popup without breaking the page.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day21/start" class="btn-secondary">← Day 21 Starting Point</a><a routerLink="/day21/act2" class="btn-primary">Act 2: Private Watchlists and Locked Routes →</a></div>
    </div>
  `
})
export class Act1Component {
  models: MentalModel[] = [
    { concept: 'authentication', plainEnglish: 'Proving which real person is using the app.', analogy: '🪪 Showing ID before receiving a personalized key.' },
    { concept: 'user signal', plainEnglish: 'A live value that changes when Firebase restores, starts, or ends a session.', analogy: '📡 A status light that follows the account, not a one-time snapshot.' },
    { concept: 'undefined / null / User', plainEnglish: 'Three distinct answers: still checking, nobody signed in, or a known person.', analogy: '🚪 A door being checked, unlocked and empty, or opened by a named guest.' },
    { concept: 'popup sign-in', plainEnglish: 'A user-controlled browser window where Google confirms identity.', analogy: '🪟 Stepping to a reception window, then returning with a verified badge.' }
  ];

  authProviderCode = `import { provideAuth, getAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ]
};`;

  authServiceCode = `import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);
  readonly user = toSignal(user(this.auth)); // undefined while Auth restores a session
  readonly isLoggedIn = computed(() => this.user() !== undefined && this.user() !== null);

  async signIn() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
    } catch {
      // Set a friendly error signal here for the header to render.
    }
  }

  signOut() { return signOut(this.auth); }
}`;

  headerCode = `@if (authSvc.user() === undefined) {
  <span class="auth-loading">Checking sign-in…</span>
} @else if (authSvc.user(); as currentUser) {
  <img [src]="currentUser.photoURL ?? ''" [alt]="currentUser.displayName ?? 'Profile'" class="avatar">
  <span>{{ currentUser.displayName }}</span>
  <button (click)="authSvc.signOut()">Sign out</button>
} @else {
  <button (click)="authSvc.signIn()">Sign in with Google</button>
}`;
}
