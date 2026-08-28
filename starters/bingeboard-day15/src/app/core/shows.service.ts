import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { TvMazeEpisode, TvMazeSearchResult, TvMazeShow, toShow } from '../models/show';

// The end-of-Day-14 ShowsService: real HTTP, typed + adapted responses.
// search() and byId() are used by Browse/ShowDetail's HttpClient + subscribe()
// path; episodes() backs the Day 13 lab task and Day 14's second httpResource.
@Injectable({ providedIn: 'root' })
export class ShowsService {
  private http = inject(HttpClient);
  private readonly base = 'https://api.tvmaze.com';

  search(query: string) {
    return this.http
      .get<TvMazeSearchResult[]>(`${this.base}/search/shows`, { params: { q: query } })
      .pipe(map(results => results.map(r => toShow(r.show))));
  }

  byId(id: number) {
    return this.http.get<TvMazeShow>(`${this.base}/shows/${id}`).pipe(map(toShow));
  }

  episodes(id: number) {
    return this.http.get<TvMazeEpisode[]>(`${this.base}/shows/${id}/episodes`);
  }
}
