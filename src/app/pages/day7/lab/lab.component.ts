import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodeBlockComponent } from '../../../shared/components/code-block/code-block.component';
import { CollapsibleComponent } from '../../../shared/components/collapsible/collapsible.component';
import { LessonStepComponent } from '../../../shared/components/lesson-step/lesson-step.component';

@Component({
  selector: 'app-day7-lab',
  standalone: true,
  imports: [RouterLink, CodeBlockComponent, CollapsibleComponent, LessonStepComponent],
  template: `
    <div class="lesson-content">
      <div class="page-header">
        <span class="act-label lab-label">🛠️ Student Lab</span>
        <h1>Your Turn — Services That Own Real State</h1>
        <p class="subtitle">About 55 minutes. Three tasks to move watchlist ownership, add a second shared feature, and make state survive a refresh.</p>
      </div>

      <div class="lab-intro">
        <h3>🎯 Starting Point</h3>
        <p>Complete Acts 1-3 first. You should have a <code>WatchlistService</code> with a private signal, a read-only public view, and <code>App</code> using <code>inject()</code>. Need a clean copy? <a routerLink="/day7/start">Start from the Day 7 starting point</a>.</p>
      </div>

      <section class="lesson-framework">
        <h3>Lab Map</h3>
        <ul>
          <li><strong>Learning Goal:</strong> Use the service pattern in three realistic situations instead of treating it as a toy exercise.</li>
          <li><strong>Why It Matters:</strong> Shared state, history, and persistence are all service-shaped problems.</li>
          <li><strong>Build Steps:</strong> Finish the refactor → create RecentlyViewedService → persist the watchlist.</li>
          <li><strong>Expected Outcome:</strong> The watchlist has one owner, recently viewed shows have one owner, and a refresh no longer erases saved shows.</li>
        </ul>
      </section>

      <section class="selfguided-panel">
        <p><strong>You are here:</strong> Day 7 Lab (final step of Day 7)</p>
        <p><strong>Next step:</strong> Review the Checkpoint below, then Day 9 will use this service across routes.</p>
        <p><strong>Time:</strong> About 55 minutes total.</p>
      </section>

      <app-lesson-step stepId="d7-lab-refactor" [stepNumber]="'Task 1'" title="Complete the service refactor">
        <div class="task-meta"><span class="difficulty easy">🟡 Easy</span><span class="concepts">Concepts: <code>inject()</code>, <code>asReadonly()</code>, service boundaries.</span></div>
        <h4>What to build:</h4>
        <p>Finish moving every watchlist responsibility out of <code>App</code>. The panel's remove button and each card's disabled state must still work, but <code>App</code> must not own a watchlist array or duplicate the no-duplicates rule.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Generate <code>src/app/services/watchlist.ts</code> and add <code>add</code>, <code>remove</code>, <code>has</code>, <code>watchlist</code>, and <code>count</code>.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Inject it at the top of <code>App</code> and expose its read-only signal as <code>watchlist</code>.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Delete the old signal, <code>watchlistIds</code>, and array update logic from <code>App</code>; use service methods instead.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Add the same service to <code>Header</code> and confirm the count changes when a card adds or removes a show.</span></div>
        </div>
        <app-collapsible icon="💡" label="Hint — search for the old owner">
          <p>Search the project for <code>watchlist = signal</code>, <code>.push(</code>, and <code>new WatchlistService</code>. The first should disappear from <code>App</code>, the second should not appear in service consumers, and the third should have zero matches.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The app still adds, removes, and counts shows, while one service owns every watchlist rule.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 1">
          <app-code-block lang="typescript" file="src/app/services/watchlist.ts" [code]="watchlistServiceCode" />
          <app-code-block lang="typescript" file="src/app/app.ts" [code]="appServiceCode" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d7-lab-recently-viewed" [stepNumber]="'Task 2'" title="Recently viewed service">
        <div class="task-meta"><span class="difficulty medium">⚡ Medium</span><span class="concepts">Concepts: singleton state, immutable updates, derived signals.</span></div>
        <h4>What to build:</h4>
        <p>Create <code>RecentlyViewedService</code>. Clicking a show's poster records it. A small panel shows the five most recent shows, most recent first, with no duplicates.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Keep the writable signal private and expose a read-only <code>recent</code> signal.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>In <code>record(show)</code>, remove any older copy before putting the show at the front, then slice to five.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Inject the service in <code>App</code>, call <code>record(show)</code> from a poster click, and render the panel with <code>&#64;for</code>.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Click the same show twice and confirm it appears once at the front.</span></div>
        </div>
        <app-collapsible icon="💡" label="Hint — newest first is an immutable update">
          <p>Filter the old copy out, then build a new array: <code>[show, ...withoutDuplicate].slice(0, 5)</code>. Do not sort the original signal value or call <code>unshift()</code>.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> A sixth viewed show drops the oldest entry, and revisiting an existing show moves it to the front instead of duplicating it.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 2">
          <app-code-block lang="typescript" file="src/app/services/recently-viewed.ts" [code]="recentlyViewedCode" />
          <app-code-block lang="html" file="src/app/app.html" [code]="recentlyViewedTemplateCode" />
        </app-collapsible>
      </app-lesson-step>

      <app-lesson-step stepId="d7-lab-persistence" [stepNumber]="'Task 3'" title="Persist the watchlist across refreshes">
        <div class="task-meta"><span class="difficulty hard">🔴 Hard</span><span class="concepts">Concepts: <code>effect()</code>, localStorage, startup state.</span></div>
        <h4>What to build:</h4>
        <p>Give <code>WatchlistService</code> staying power. Initialize the signal from localStorage, then write the current list whenever it changes. Add a show, refresh, and confirm it remains.</p>
        <div class="task-steps">
          <div class="task-step"><span class="step-dot">1</span><span>Read and parse the saved JSON once when the service is constructed. Treat missing or invalid data as an empty list.</span></div>
          <div class="task-step"><span class="step-dot">2</span><span>Use an <code>effect()</code> in the constructor to serialize the private signal back to the same key.</span></div>
          <div class="task-step"><span class="step-dot">3</span><span>Open DevTools → Application → Local Storage and inspect the value while adding and removing shows.</span></div>
          <div class="task-step"><span class="step-dot">4</span><span>Clear the storage manually and refresh to prove the empty state is intentional, not cached in the UI.</span></div>
        </div>
        <app-collapsible icon="💡" label="Hint — keep persistence inside the owner">
          <p>The component should not know the storage key or call <code>localStorage</code>. The service owns the state, so it owns loading and saving it. The service API stays the same for callers; Day 18 can replace this storage with a cloud backend without rewriting the components.</p>
        </app-collapsible>
        <div class="outcome-check">✅ <strong>Expected outcome:</strong> The watchlist survives a full browser refresh, and removing a show updates storage rather than only the current DOM.</div>
        <app-collapsible icon="✅" label="Show Full Answer — Task 3">
          <app-code-block lang="typescript" file="src/app/services/watchlist.ts" [code]="persistenceCode" />
        </app-collapsible>
      </app-lesson-step>

      <div class="nav-footer"><a routerLink="/day7/act3" class="btn-secondary">← Act 3: Boundaries & Debug It</a><a routerLink="/" class="btn-primary">Back to Home →</a></div>
      <section class="lesson-framework checkpoint-card">
        <h3>Checkpoint</h3>
        <ul class="complete-list">
          <li>Watchlist state lives in <code>WatchlistService</code>; <code>App</code> holds no watchlist array.</li>
          <li>A header badge proves shared reactive state across unrelated components.</li>
          <li>Recently viewed keeps five unique shows, newest first.</li>
          <li>The watchlist survives a page refresh through localStorage.</li>
          <li>You can define dependency injection and singleton without notes.</li>
        </ul>
      </section>
      <div class="completion-card"><h3>🎉 Congratulations!</h3><p>You moved state out of the component tree and gave it an owner. Day 9 will prove why that matters when the app becomes multiple routes.</p></div>
    </div>
  `,
  styles: [`
    .lab-label { color: #f0b429; }
    .lab-intro { background: #172331; border: 1px solid #2f5879; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px; }
    .task-meta { display: flex; gap: 12px; flex-wrap: wrap; align-items: center; margin-bottom: 12px; }
    .difficulty { border-radius: 999px; padding: 4px 10px; font-size: 13px; font-weight: 700; }
    .difficulty.easy { background: #253b2f; color: #9be7b1; }
    .difficulty.medium { background: #4a3920; color: #ffd27a; }
    .difficulty.hard { background: #4a2525; color: #ffaaa6; }
    .concepts { color: #9aa0aa; font-size: 14px; }
    .task-steps { display: grid; gap: 10px; margin: 16px 0; }
    .task-step { display: flex; gap: 10px; align-items: flex-start; }
    .step-dot { flex: 0 0 24px; height: 24px; border-radius: 50%; background: #2a2d35; color: #e6e6e6; text-align: center; line-height: 24px; font-size: 13px; }
    .checkpoint-card { margin-top: 28px; }
    .completion-card { background: #193524; border: 1px solid #3d8a5c; border-radius: 10px; padding: 20px; margin-top: 20px; }
    .completion-card h3 { margin-top: 0; color: #9be7b1; }
    .complete-list { display: grid; gap: 8px; }
  `]
})
export class Day7LabComponent {
  watchlistServiceCode = `@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private items = signal<Show[]>([]);
  readonly watchlist = this.items.asReadonly();
  readonly count = computed(() => this.items().length);

  add(show: Show) {
    this.items.update(list =>
      list.some(item => item.id === show.id) ? list : [...list, show]
    );
  }

  remove(id: number) {
    this.items.update(list => list.filter(show => show.id !== id));
  }
}`;

  appServiceCode = `export class App {
  private watchlistSvc = inject(WatchlistService);
  watchlist = this.watchlistSvc.watchlist;

  addShow(show: Show) {
    this.watchlistSvc.add(show);
  }

  removeShow(show: Show) {
    this.watchlistSvc.remove(show.id);
  }
}`;

  recentlyViewedCode = `@Injectable({ providedIn: 'root' })
export class RecentlyViewedService {
  private items = signal<Show[]>([]);
  readonly recent = this.items.asReadonly();

  record(show: Show) {
    this.items.update(list => [
      show,
      ...list.filter(item => item.id !== show.id)
    ].slice(0, 5));
  }
}`;

  recentlyViewedTemplateCode = `<section class="recently-viewed">
  <h2>Recently viewed</h2>
  @for (show of recentViewed.recent(); track show.id) {
    <button (click)="openShow(show)" [attr.aria-label]="'Open ' + show.name">
      {{ show.name }}
    </button>
  } @empty {
    <p>Click a poster to start your history.</p>
  }
</section>`;

  persistenceCode = `@Injectable({ providedIn: 'root' })
export class WatchlistService {
  private readonly storageKey = 'bingeboard-watchlist';
  private items = signal<Show[]>(this.load());
  readonly watchlist = this.items.asReadonly();

  constructor() {
    effect(() => {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items()));
    });
  }

  private load(): Show[] {
    const saved = localStorage.getItem(this.storageKey);
    if (!saved) return [];

    try {
      return JSON.parse(saved) as Show[];
    } catch (error) {
      console.warn('Ignoring invalid saved watchlist', error);
      return [];
    }
  }
}`;
}
