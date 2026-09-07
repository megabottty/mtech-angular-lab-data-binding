import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ShowsService } from './shows.service';
import { Show, TvMazeShow } from '../models/show';

// Day 24 Act 3's own worked example, kept as a real spec file. The
// testing backend replaces the real TVMaze connection: expectOne
// catches the outgoing request, flush plays a canned response, and
// verify() (in afterEach) fails the test if any request went unhandled.
const tvMazeShow: TvMazeShow = {
  id: 1, name: 'Severance', genres: ['Drama'],
  rating: { average: 9.2 },
  image: { medium: 'poster.jpg', original: 'poster-original.jpg' },
  summary: '<p>A show about work-life balance.</p>',
  runtime: 50,
};

describe('ShowsService', () => {
  let svc: ShowsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    svc = TestBed.inject(ShowsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('maps a TVMaze search result into a Show', () => {
    let result: Show[] = [];
    svc.search('severance').subscribe(shows => (result = shows));

    const req = httpMock.expectOne(r => r.url.includes('/search/shows'));
    req.flush([{ score: 1, show: tvMazeShow }]);

    expect(result).toEqual([{
      id: 1, name: 'Severance', genre: 'Drama', rating: 9.2,
      imageUrl: 'poster.jpg', summary: '<p>A show about work-life balance.</p>', runtime: 50,
    }]);
  });

  it('maps a null rating and missing image to safe defaults', () => {
    let result: Show | undefined;
    svc.byId(2).subscribe(show => (result = show));

    const req = httpMock.expectOne(r => r.url.includes('/shows/2'));
    req.flush({ ...tvMazeShow, id: 2, rating: { average: null }, image: null });

    expect(result?.rating).toBe(0);
    expect(result?.imageUrl).toBe('');
  });

  it('does not leave a pending request when nothing subscribes', () => {
    // svc.search() returns a cold observable -- calling it without
    // .subscribe() never sends a request, so httpMock has nothing to verify.
    svc.search('unused');
  });
});
