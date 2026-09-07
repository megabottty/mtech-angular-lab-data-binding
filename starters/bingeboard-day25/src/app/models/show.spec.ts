import { toShow, TvMazeShow } from './show';

describe('toShow', () => {
  it('defaults every null-safe field on a sparse TvMazeShow', () => {
    // Arrange
    const sparse: TvMazeShow = {
      id: 1,
      name: 'Mystery Show',
      genres: [],
      rating: { average: null },
      image: null,
      summary: null,
      runtime: null
    };

    // Act
    const result = toShow(sparse);

    // Assert
    expect(result).toEqual({
      id: 1,
      name: 'Mystery Show',
      genre: 'Unknown',
      rating: 0,
      imageUrl: '',
      summary: '',
      runtime: 0
    });
  });

  it('passes every field through unchanged on a fully populated show', () => {
    const full: TvMazeShow = {
      id: 2,
      name: 'Real Show',
      genres: ['Drama', 'Comedy'],
      rating: { average: 8.4 },
      image: { medium: 'medium.jpg', original: 'original.jpg' },
      summary: '<p>A great show.</p>',
      runtime: 42
    };

    const result = toShow(full);

    expect(result.genre).toBe('Drama');
    expect(result.rating).toBe(8.4);
    expect(result.imageUrl).toBe('medium.jpg');
    expect(result.runtime).toBe(42);
  });
});
