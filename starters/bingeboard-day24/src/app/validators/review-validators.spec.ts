import { noShouting } from './review-validators';

describe('noShouting', () => {
  const validate = noShouting();

  it('flags a long, fully uppercase headline', () => {
    const result = validate({ value: 'AMAZING SHOW' } as any);
    expect(result).toEqual({ noShouting: true });
  });

  it('does not flag a short all-caps acronym', () => {
    const result = validate({ value: 'US' } as any);
    expect(result).toBeNull();
  });

  it('does not flag a normal, mixed-case sentence', () => {
    const result = validate({ value: 'This show was great' } as any);
    expect(result).toBeNull();
  });

  it('does not flag an empty string', () => {
    const result = validate({ value: '' } as any);
    expect(result).toBeNull();
  });
});
