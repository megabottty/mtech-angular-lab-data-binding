import { Component } from '@angular/core';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [],
  templateUrl: './show-card.html',
  styleUrl: './show-card.css'
})
export class ShowCard {
  title = 'Severance';
  imageUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/423/1059131.jpg';
  rating = 8.7;
  watched = false;
  hype = 0;

  toggleWatched() {
    this.watched = !this.watched;
  }
}
