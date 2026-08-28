// BingeBoard's app-facing Show model, plus the minimal TVMaze API shapes we
// actually consume and the adapter that translates between them.
//
// This is the Day 13 Act 2 pattern: model only what you read, then convert
// once at the boundary so the rest of the app never touches TVMaze's naming.
// (Kept in one file here for a small starter project — in the lesson it's
// split across show.model.ts / tvmaze.model.ts / show.adapter.ts.)

export interface Show {
  id: number;
  name: string;
  genre: string;
  rating: number;
  imageUrl: string;
  summary: string;
  runtime: number;
}

export interface TvMazeShow {
  id: number;
  name: string;
  genres: string[];
  rating: { average: number | null };
  image: { medium: string; original: string } | null;
  summary: string | null; // contains HTML!
  runtime: number | null;
}

export interface TvMazeSearchResult {
  score: number;
  show: TvMazeShow;
}

export interface TvMazeEpisode {
  id: number;
  season: number;
  number: number;
}

export function toShow(tv: TvMazeShow): Show {
  return {
    id: tv.id,
    name: tv.name,
    genre: tv.genres[0] ?? 'Unknown',
    rating: tv.rating.average ?? 0,
    imageUrl: tv.image?.medium ?? '',
    summary: tv.summary ?? '',
    runtime: tv.runtime ?? 0
  };
}
