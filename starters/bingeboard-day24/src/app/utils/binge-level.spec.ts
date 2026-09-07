import { bingeLevel } from './binge-level';

describe('bingeLevel', () => {
  it('returns Quick Watch at 12 episodes or fewer', () => {
    // Arrange
    const episodeCount = 12;
    // Act
    const result = bingeLevel(episodeCount);
    // Assert
    expect(result).toBe('Quick Watch');
  });

  it('returns Full-Season Binge between 13 and 50 episodes', () => {
    const result = bingeLevel(24);
    expect(result).toBe('Full-Season Binge');
  });

  it('returns Marathon above 50 episodes', () => {
    const result = bingeLevel(51);
    expect(result).toBe('Marathon');
  });
});
