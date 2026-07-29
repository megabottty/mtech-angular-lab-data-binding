import { Injectable, inject, signal } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, collection, getDocs, serverTimestamp } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { effect } from '@angular/core';

export interface StudentProgress {
  uid: string;
  displayName: string;
  email: string;
  completedSteps: string[];
  lastActive: Date | null;
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);

  // Local signal of completed step IDs for the current user
  readonly completedSteps = signal<Set<string>>(new Set());

  constructor() {
    // Load progress whenever the user changes
    effect(() => {
      const uid = this.authService.uid;
      if (uid) {
        this.loadProgress(uid);
      } else {
        this.completedSteps.set(new Set());
      }
    });
  }

  isCompleted(stepId: string): boolean {
    return this.completedSteps().has(stepId);
  }

  async markComplete(stepId: string): Promise<void> {
    const uid = this.authService.uid;
    if (!uid) return;

    const updated = new Set(this.completedSteps());
    updated.add(stepId);
    this.completedSteps.set(updated);

    const user = this.authService.user();
    await setDoc(
      doc(this.firestore, 'progress', uid),
      {
        displayName: user?.displayName ?? 'Student',
        email: user?.email ?? '',
        completedSteps: Array.from(updated),
        lastActive: serverTimestamp()
      },
      { merge: true }
    );
  }

  async markIncomplete(stepId: string): Promise<void> {
    const uid = this.authService.uid;
    if (!uid) return;

    const updated = new Set(this.completedSteps());
    updated.delete(stepId);
    this.completedSteps.set(updated);

    const user = this.authService.user();
    await setDoc(
      doc(this.firestore, 'progress', uid),
      {
        displayName: user?.displayName ?? 'Student',
        email: user?.email ?? '',
        completedSteps: Array.from(updated),
        lastActive: serverTimestamp()
      },
      { merge: true }
    );
  }

  private async loadProgress(uid: string): Promise<void> {
    const snap = await getDoc(doc(this.firestore, 'progress', uid));
    if (snap.exists()) {
      const data = snap.data();
      this.completedSteps.set(new Set(data['completedSteps'] ?? []));
    }
  }

  // Teacher-only: fetch all students
  async getAllStudentProgress(): Promise<StudentProgress[]> {
    const snapshot = await getDocs(collection(this.firestore, 'progress'));
    return snapshot.docs.map(d => {
      const data = d.data();
      return {
        uid: d.id,
        displayName: data['displayName'] ?? 'Unknown',
        email: data['email'] ?? '',
        completedSteps: data['completedSteps'] ?? [],
        lastActive: data['lastActive']?.toDate() ?? null
      };
    });
  }
}
