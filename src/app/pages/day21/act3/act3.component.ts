import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MentalModelCardComponent, MentalModel } from '../../../shared/components/mental-model-card/mental-model-card.component';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day21-act3',
  standalone: true,
  imports: [RouterLink, MentalModelCardComponent, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header"><span class="act-label">Day 21 · Act 3 of 3</span><h1>🛡️ Rules — The Server Holds the Keys</h1><p class="subtitle">The database now independently verifies that each request deserves the data it asks for.</p></div>
      <div class="info-box"><strong>📚 Worth reading alongside this act:</strong> Firebase's <a href="https://firebase.google.com/docs/firestore/security/rules-conditions" target="_blank" rel="noopener">secure data rules guide</a> and <a href="https://firebase.google.com/docs/firestore/manage-data/enable-offline" target="_blank" rel="noopener">offline and error behavior guide</a>.</div>
      <app-mental-model-card [models]="models" />
      <section class="lesson-framework"><h3>Lesson Map</h3><ul><li><strong>Learning Goal:</strong> Deploy rules that protect private watchlists while allowing deliberate public reviews and curated reads.</li><li><strong>Why It Matters:</strong> UI checks cannot protect a cloud database. Firestore rules decide on the server for every request.</li><li><strong>Build Steps:</strong> Write ownership rules → surface permission failures well → debug two tempting mistakes.</li><li><strong>Expected Outcome:</strong> A signed-in account can modify only its own data, and denied requests receive a human explanation.</li></ul></section>
      <section class="selfguided-panel"><p><strong>You are here:</strong> Act 3 (Rules — The Server Holds the Keys)</p><p><strong>Next step:</strong> Day 21 Lab</p><p><strong>Time:</strong> About 35 minutes.</p></section>
      <app-lesson-step stepId="d21-act3-rules" [stepNumber]="1" title="Make Watchlists Private at the Database">
        <p><span class="effort-tag effort-challenge">Effort: Challenge</span></p><p>Deploy explicit rules. Curated <code>featured</code> and <code>announcements</code> data is public read-only. Reviews are public to read, but only authenticated users may create them. A watchlist document is private to its owner.</p><app-code-block lang="typescript" [code]="rulesCode" />
        <div class="think-about-it"><p class="tai-q">Why does create inspect <code>request.resource.data</code>, but update and delete inspect <code>resource.data</code>?</p></div><app-collapsible icon="✅" label="Show Answer — incoming data versus stored data"><p>On create, no document exists yet, so the only proposed owner is in <code>request.resource.data</code>. On update or delete, <code>resource.data</code> is the trusted document already stored by Firestore. Comparing the stored owner prevents someone from changing an ownership field as part of a takeover attempt.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Deploy the rules and test with two accounts. You can create and change only your own watchlist entries while both accounts can read reviews.</div>
      </app-lesson-step>
      <app-lesson-step stepId="d21-act3-error-ux" [stepNumber]="2" title="Turn Permission Denied into a Useful Next Step">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p><p>A rejected write is expected when a session ends or a rule blocks it. Catch it near the interaction and say what the person can do next; do not expose a raw Firebase error as the whole experience.</p><app-code-block lang="typescript" [code]="errorCode" />
        <div class="think-about-it"><p class="tai-q">Can an HttpClient interceptor catch Firestore permission errors?</p></div><app-collapsible icon="✅" label="Show Answer — no; Firestore does not use Angular HttpClient"><p>No. An interceptor is useful for your own REST requests, where HttpClient owns the request pipeline. Firestore SDK calls have their own transport and error surface. Use a local <code>try/catch</code> or a shared Firestore error helper for these operations.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Force a denied write by signing out or using a second account. You can show a friendly message that tells the visitor whether to sign in or return to their own data.</div>
      </app-lesson-step>
      <app-lesson-step stepId="d21-act3-debug" [stepNumber]="3" title="Debug It — Stale Names and One Overgrown Rule">
        <p><span class="effort-tag effort-medium">Effort: Medium</span></p><p><strong>Bug one:</strong> a review stores <code>userName</code> once and later keeps showing an old copied value after the profile name changes. Store the author fields as a snapshot only when that historical attribution is intentional; otherwise render the current profile from a user record. <strong>Bug two:</strong> a single broad rule says all authenticated users can read and write every collection.</p><app-code-block lang="typescript" [code]="badRulesCode" />
        <div class="think-about-it"><p class="tai-q">Why is one unified authenticated rule wrong even if every page has a guard?</p></div><app-collapsible icon="✅" label="Show Answer — collections have different permissions"><p>Authentication answers who is asking, not what they should access. A universal rule lets any signed-in account read or alter every watchlist entry and curated collection. Write rules per collection and operation, matching the actual product decision: owner-only watchlists, public review reads with authenticated review creation, and read-only curation.</p></app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome for this step:</strong> Review each collection's purpose and replace broad permissions with specific rules. You can explain why copied author fields and a one-size-fits-all rule both create incorrect behavior.</div>
      </app-lesson-step>
      <div class="nav-footer"><a routerLink="/day21/act2" class="btn-secondary">← Act 2: Private Watchlists and Locked Routes</a><a routerLink="/day21/lab" class="btn-primary">Day 21 Lab →</a></div>
    </div>
  `
})
export class Act3Component {
  models: MentalModel[] = [
    { concept: 'Firestore rules', plainEnglish: 'Server-side checks that decide every database request after app code has sent it.', analogy: '🏰 A castle gate that checks every visitor even if a map says they may enter.' },
    { concept: 'resource.data', plainEnglish: 'The document currently stored in Firestore.', analogy: '📋 The signed record already in the filing cabinet.' },
    { concept: 'request.resource.data', plainEnglish: 'The document data a caller wants Firestore to create or save.', analogy: '📝 The new form handed across the counter.' },
    { concept: 'permission error UX', plainEnglish: 'A clear recovery message after a server correctly refuses an operation.', analogy: '🧭 A locked door with directions to the right entrance.' }
  ];
  rulesCode = `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /watchlist/{docId} {
      allow create: if request.auth != null
                    && request.auth.uid == request.resource.data.ownerId;
      allow read, update, delete: if request.auth != null
                                  && request.auth.uid == resource.data.ownerId;
    }
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null
                            && request.auth.uid == resource.data.ownerId;
    }
    match /featured/{docId} { allow read: if true; }
    match /announcements/{docId} { allow read: if true; }
  }
}`;
  errorCode = `async add(show: Show) {
  try {
    await this.watchlistSvc.add(show);
  } catch (error) {
    this.message.set('We could not save that show. Sign in, then try again.');
    console.error(error);
  }
}`;
  badRulesCode = `// Too broad: any signed-in person can now write any collection.
match /{document=**} {
  allow read, write: if request.auth != null;
}`;
}
