import { TimeAgoPipe } from './time-ago.pipe';

describe('TimeAgoPipe', () => {
  const pipe = new TimeAgoPipe();

  afterEach(() => {
    vi.useRealTimers();
  });

  function agoIso(ms: number): string {
    return new Date(Date.now() - ms).toISOString();
  }

  it('returns "just now" for a few seconds ago', () => {
    expect(pipe.transform(agoIso(10 * 1000))).toBe('just now');
  });

  it('handles a few seconds in the future (clock skew) as "just now"', () => {
    const secondsInTheFuture = new Date(Date.now() + 5000).toISOString();
    expect(pipe.transform(secondsInTheFuture)).toBe('just now');
  });

  it('formats singular vs. plural minutes', () => {
    expect(pipe.transform(agoIso(60 * 1000))).toBe('1 minute ago');
    expect(pipe.transform(agoIso(2 * 60 * 1000))).toBe('2 minutes ago');
  });

  it('formats singular vs. plural hours', () => {
    expect(pipe.transform(agoIso(60 * 60 * 1000))).toBe('1 hour ago');
    expect(pipe.transform(agoIso(2 * 60 * 60 * 1000))).toBe('2 hours ago');
  });

  it('formats singular vs. plural days', () => {
    expect(pipe.transform(agoIso(24 * 60 * 60 * 1000))).toBe('1 day ago');
    expect(pipe.transform(agoIso(2 * 24 * 60 * 60 * 1000))).toBe('2 days ago');
  });

  it('formats singular vs. plural weeks', () => {
    expect(pipe.transform(agoIso(7 * 24 * 60 * 60 * 1000))).toBe('1 week ago');
    expect(pipe.transform(agoIso(14 * 24 * 60 * 60 * 1000))).toBe('2 weeks ago');
  });
});
