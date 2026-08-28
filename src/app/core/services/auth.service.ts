import { Injectable, inject, signal } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, signOut, user } from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth = inject(Auth);

  readonly user = toSignal(user(this.auth), { initialValue: null });

  // Surfaces the last sign-in/sign-out failure so the UI can show it instead
  // of silently doing nothing. Cleared on the next attempt.
  readonly error = signal<string | null>(null);

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
    this.error.set(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (err) {
      this.error.set(this.describeError(err));
      throw err;
    }
  }

  async signOut(): Promise<void> {
    this.error.set(null);
    try {
      await signOut(this.auth);
    } catch (err) {
      this.error.set(this.describeError(err));
      throw err;
    }
  }

  private describeError(err: unknown): string {
    const code = (err as { code?: string })?.code;
    if (code === 'auth/popup-blocked') {
      return 'Your browser blocked the sign-in popup. Allow popups for this site and try again.';
    }
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
      return 'Sign-in was cancelled.';
    }
    if (code === 'auth/invalid-api-key' || code === 'auth/api-key-not-valid' || code === 'auth/configuration-not-found') {
      return 'Sign-in is misconfigured (invalid Firebase config) — this needs a developer to fix, not a retry.';
    }
    return `Sign-in failed: ${code ?? (err as Error)?.message ?? 'unknown error'}. Check the console for details.`;
  }
}
