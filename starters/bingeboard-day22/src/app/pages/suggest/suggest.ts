import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap } from 'rxjs';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';

// Honest heuristic, not real fuzzy string matching — see Day 16's lab Task 2.
function findCloseMatch(typed: string, results: Show[]): Show | null {
  const needle = typed.toLowerCase();
  return results.find(s => {
    const name = s.name.toLowerCase();
    return name === needle || name.includes(needle);
  }) ?? null;
}

// Day 16 lab Task 2 (the capstone): the same typeahead shape as Browse,
// rebuilt solo against a different question — "does a close match exist?"
@Component({
  selector: 'app-suggest',
  standalone: true,
  template: `
    <section class="suggest">
      <h1>Suggest a Show</h1>
      <p class="muted">Type a show name — we'll check if it's already in the catalog.</p>

      <input placeholder="Name a show…" (input)="onType(nameInput.value)" #nameInput />

      @if (tooShort()) {
        <p class="muted">Type at least 2 characters.</p>
      } @else if (currentTerm().length >= 2) {
        @if (match(); as m) {
          <p>Did you mean <em>{{ m.name }}</em>?</p>
        } @else {
          <p class="muted">No matching show found — looks like a new suggestion!</p>
        }
      }
    </section>
  `,
  styles: [`
    .suggest { padding: 24px; max-width: 480px; }
    input { width: 100%; padding: 8px 10px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; margin: 12px 0; }
  `]
})
export class Suggest {
  private showsSvc = inject(ShowsService);
  private typedTerms = new Subject<string>();

  currentTerm = signal('');
  tooShort = signal(false);

  match = toSignal(
    this.typedTerms.pipe(
      filter(term => term.length >= 2),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.showsSvc.search(term).pipe(
          map(results => findCloseMatch(term, results)),
          catchError(() => of(null)),
        )
      ),
    ),
    { initialValue: null as Show | null }
  );

  onType(term: string) {
    const trimmed = term.trim();
    this.currentTerm.set(trimmed);
    this.tooShort.set(trimmed.length > 0 && trimmed.length < 2);
    this.typedTerms.next(trimmed);
  }
}
