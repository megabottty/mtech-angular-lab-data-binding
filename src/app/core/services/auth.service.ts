import { Injectable, inject, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  readonly user = toSignal(user(this.auth), { initialValue: null });

  get isLoggedIn() {
    return this.user() !== null;
  }

  get displayName() {
    return this.user()?.displayName ?? 'Guest';
  }

  get photoUrl() {
    return this.user()?.photoURL ?? null;
  }

  get uid() {
    return this.user()?.uid ?? null;
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
  }

  async signOut(): Promise<void> {
    await signOut(this.auth);
  }
}
