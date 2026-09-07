import { RuntimePipe } from './runtime.pipe';

describe('RuntimePipe', () => {
  const pipe = new RuntimePipe();

  it('returns an em dash for null or undefined', () => {
    expect(pipe.transform(null)).toBe('—');
    expect(pipe.transform(undefined)).toBe('—');
  });

  it('returns an em dash for a runtime of 0', () => {
    const result = pipe.transform(0);
    expect(result).toBe('—');
  });

  it('formats under an hour as minutes only', () => {
    const result = pipe.transform(45);
    expect(result).toBe('45m');
  });

  it('formats an exact hour with no trailing minutes', () => {
    const result = pipe.transform(60);
    expect(result).toBe('1h');
  });

  it('formats hours and minutes together', () => {
    const result = pipe.transform(90);
    expect(result).toBe('1h 30m');
  });
});
