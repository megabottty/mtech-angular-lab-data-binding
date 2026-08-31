import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, fromEvent, of, switchMap, tap } from 'rxjs';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';
import { ShowCard } from '../../shared/show-card';

// End-of-Day-16 Browse: the full Day 16 typeahead pipeline (Subject ->
// filter(length >= 2) -> debounceTime -> distinctUntilChanged -> tap
// (loading) -> switchMap with catchError INSIDE the projection -> tap
// (loading false)), plus the Day 16 lab's minimum-viable-query idle hint
// (Tier 1) and the Day 15 lab's '/' keyboard shortcut. Day 17 doesn't touch
// this file — it's the assumed "already works" state for pipes work.
@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [ShowCard],
  template: `
    <section class="browse">
      <h1>Browse</h1>

      <div class="search-row">
        <input
          #searchInput
          placeholder="Search all of television… (press / to focus)"
          (input)="onType(searchInput.value)"
        />
      </div>

      @if (tooShort()) {
        <p class="muted">Type at least 2 characters to search.</p>
      } @else if (loading()) {
        <p class="muted">Searching…</p>
      } @else if (error()) {
        <div class="error-box">
          <p>{{ error() }}</p>
        </div>
      } @else if (results().length) {
        <div class="grid">
          @for (show of results(); track show.id) {
            <app-show-card [show]="show" />
          }
        </div>
      } @else if (currentTerm().length >= 2) {
        <p class="muted">No shows matched. Try another title.</p>
      }
    </section>
  `,
  styles: [`
    .browse { padding: 24px; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; max-width: 480px; }
    .search-row input { flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  `]
})
export class Browse {
  private showsSvc = inject(ShowsService);

  searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  private searchTerms = new Subject<string>();

  currentTerm = signal('');
  tooShort = computed(() => this.currentTerm().length > 0 && this.currentTerm().length < 2);

  loading = signal(false);
  error = signal<string | null>(null);

  results = toSignal(
    this.searchTerms.pipe(
      filter(term => term.length >= 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => { this.loading.set(true); this.error.set(null); }),
      switchMap(term =>
        this.showsSvc.search(term).pipe(
          catchError(() => {
            this.error.set('Search failed — check your connection.');
            return of([]);
          })
        )
      ),
      tap(() => this.loading.set(false)),
    ),
    { initialValue: [] as Show[] }
  );

  constructor() {
    // Day 15 lab Task 4 — press '/' anywhere to focus the search box.
    fromEvent<KeyboardEvent>(document, 'keydown')
      .pipe(
        filter(e => e.key === '/'),
        takeUntilDestroyed()
      )
      .subscribe(e => {
        e.preventDefault();
        this.searchInput()?.nativeElement.focus();
      });
  }

  onType(term: string) {
    const trimmed = term.trim();
    this.currentTerm.set(trimmed);
    this.searchTerms.next(trimmed);
  }
}
