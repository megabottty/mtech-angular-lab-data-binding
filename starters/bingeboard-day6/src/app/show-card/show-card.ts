import { Component, signal, computed, effect, linkedSignal, input, output, model } from '@angular/core';
import { Show } from '../models/show';
import { RatingStars } from '../rating-stars/rating-stars';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [RatingStars],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  show = input.required<Show>();
  compact = input(false);
  alreadyAdded = input(false);

  addToWatchlist = output<Show>();
  myRating = model(0);

  episodeMinutes = 50;

  watched = signal(false);

  // keyed per show, so eight cards don't fight over one localStorage entry
  episodesWatched = linkedSignal(() =>
    Number(localStorage.getItem(`episodes-${this.show().id}`) ?? 0)
  );

  minutesWatched = computed(() => this.episodesWatched() * this.episodeMinutes);
  hours = computed(() => (this.minutesWatched() / 60).toFixed(1));

  bingeLevel = computed(() => {
    const n = this.episodesWatched();
    if (n === 0) return 'Not started';
    if (n < 5) return 'Casual';
    if (n < 10) return 'Invested';
    return 'Send help';
  });

  weeklyBudgetMinutes = signal(300);
  minutesRemaining = computed(() => this.weeklyBudgetMinutes() - this.minutesWatched());
  isOverBudget = computed(() => this.minutesRemaining() < 0);

  season = signal(1);
  nextEpisode = linkedSignal(() => {
    this.season();
    return 1;
  });

  hype = 0;

  constructor() {
    effect(() => {
      localStorage.setItem(`episodes-${this.show().id}`, String(this.episodesWatched()));
    });
  }

  add() {
    this.addToWatchlist.emit(this.show());
  }

  watchEpisode() {
    this.episodesWatched.update(n => n + 1);
  }

  toggleWatched() {
    this.watched.update(w => !w);
  }
}
