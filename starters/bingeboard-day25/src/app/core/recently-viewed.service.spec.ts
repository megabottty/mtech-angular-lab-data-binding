import { TestBed } from '@angular/core/testing';
import { RecentlyViewedService } from './recently-viewed.service';
import { Show } from '../models/show';

// Day 24 Act 1's own worked example, kept as a real spec file: this
// service takes zero constructor dependencies, so it's the simplest
// possible TestBed target -- no fakes needed, just a fresh instance.
function mockShow(id: number): Show {
  return { id, name: `Show ${id}`, genre: 'Drama', rating: 8, imageUrl: '', summary: '', runtime: 30 };
}

describe('RecentlyViewedService', () => {
  let svc: RecentlyViewedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    svc = TestBed.inject(RecentlyViewedService);
  });

  it('starts empty', () => {
    expect(svc.recent()).toEqual([]);
  });

  it('keeps the newest show first and removes duplicates', () => {
    svc.record(mockShow(1));
    svc.record(mockShow(2));
    svc.record(mockShow(1));
    expect(svc.recent().map(show => show.id)).toEqual([1, 2]);
  });

  it('keeps only the last five', () => {
    for (let id = 1; id <= 7; id++) svc.record(mockShow(id));
    expect(svc.recent().map(show => show.id)).toEqual([7, 6, 5, 4, 3]);
  });
});
