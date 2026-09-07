import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';

// Day 21 Act 1 -- Google sign-in wrapped as one shared service. `user`
// starts `undefined` while Firebase restores a saved session, then
// settles to a `User` or `null`. Never read it once and cache the result;
// every consumer should read the signal live.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  readonly user = toSignal(user(this.auth));
  readonly isLoggedIn = computed(() => this.user() !== undefined && this.user() !== null);

  async signIn() {
    try {
      await signInWithPopup(this.auth, new GoogleAuthProvider());
    } catch (error) {
      // A blocked or dismissed popup is a normal failure, not a crash --
      // Day 21 Act 1 asks the header to render a friendly message here.
      console.error('Sign-in did not finish.', error);
    }
  }

  signOut() {
    return signOut(this.auth);
  }
}
