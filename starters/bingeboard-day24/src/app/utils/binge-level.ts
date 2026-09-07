// Day 3's lab taught this exact branching logic as a computed() signal
// inside ShowCard, driven by a fake episodesWatched counter: 0 episodes,
// 1-4, 5-9, 10+. Now that Show Detail has a real episode count from the
// TVMaze API (episodesRes.value().length), the same idea is worth having
// again -- but this time as a plain, exported function with no component,
// no signal, and no Angular import at all. That's what makes it the
// easiest possible thing to unit test: call it, check what comes back.
//
// Thresholds here are illustrative, not scientifically tuned -- the point
// is the shape of the function, not the exact cutoffs.
export type BingeLevel = 'Quick Watch' | 'Full-Season Binge' | 'Marathon';

export function bingeLevel(episodeCount: number): BingeLevel {
  if (episodeCount <= 12) return 'Quick Watch';
  if (episodeCount <= 50) return 'Full-Season Binge';
  return 'Marathon';
}
