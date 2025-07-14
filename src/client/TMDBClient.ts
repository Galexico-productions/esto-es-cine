import { MovieDomain } from "../entities/movie.class";

export async function getMovieByTitleFromTMDB(title: string) {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}`);

  if (!res.ok) {
    throw new Error(`TMDB fetch failed: ${res.status}`)
  };

  const data = await res.json();
  const firstMovie = data.results[0];

  //Asumir que sólo es una y hacer PR cuando funcione
  return [new MovieDomain(firstMovie.title)]
}