import { Component, signal, computed, effect, linkedSignal } from '@angular/core';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  title = 'Severance'; // fine as plain — it never changes (yet)
  imageUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/423/1059131.jpg';
  rating = 8.7;
  episodeMinutes = 50;

  watched = signal(false);
  episodesWatched = signal(Number(localStorage.getItem('episodesWatched') ?? 0));

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
    this.season(); // depends on season…
    return 1;       // …resets to 1 whenever season changes
  });

  hype = 0;

  constructor() {
    effect(() => {
      localStorage.setItem('episodesWatched', String(this.episodesWatched()));
    });
  }

  watchEpisode() {
    this.episodesWatched.update(n => n + 1);
  }

  toggleWatched() {
    this.watched.update(w => !w);
  }
}
