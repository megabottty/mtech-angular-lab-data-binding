import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Subject, catchError, debounceTime, distinctUntilChanged, filter, fromEvent, of, switchMap, tap } from 'rxjs';
import { Show } from '../../models/show';
import { ShowsService } from '../../core/shows.service';
import { FeaturedService } from '../../core/featured.service';
import { ShowCard } from '../../shared/show-card';

// End-of-Day-18 Browse: the full Day 16 typeahead pipeline (Subject ->
// filter(length >= 2) -> debounceTime -> distinctUntilChanged -> tap
// (loading) -> switchMap with catchError INSIDE the projection -> tap
// (loading false)), the Day 16 lab's minimum-viable-query idle hint, the
// Day 15 lab's '/' keyboard shortcut, and Day 18 Act 2's "Shows of the
// week" panel -- Browse is this app's real '' / home route.
@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [ShowCard],
  template: `
    <section class="browse">
      <h1>Browse</h1>

      <section class="featured-panel">
        <h2>Shows of the week</h2>
        @for (s of featuredSvc.featured(); track s.id) {
          <article class="featured-card">
            <h3>{{ s.name }}</h3>
            <p>{{ s.blurb }}</p>
          </article>
        } @empty {
          <p class="muted">Nothing featured yet.</p>
        }
      </section>

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
    .featured-panel { margin-bottom: 24px; padding: 16px; border: 1px solid #2a2d35; border-radius: 10px; background: #1a1d24; }
    .featured-panel h2 { margin: 0 0 10px; font-size: 16px; }
    .featured-card { padding: 8px 0; border-top: 1px solid #2a2d35; }
    .featured-card:first-of-type { border-top: none; }
    .search-row { display: flex; gap: 8px; margin-bottom: 20px; max-width: 480px; }
    .search-row input { flex: 1; padding: 8px 10px; border-radius: 6px; border: 1px solid #3e3e42; background: #1c1f26; color: #e6e6e6; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; }
  `]
})
export class Browse {
  private showsSvc = inject(ShowsService);
  featuredSvc = inject(FeaturedService);

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
