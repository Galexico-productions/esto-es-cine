import { MovieDomain } from "./movie.domain";

export async function getMovieByTitle(title :string ){
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}`);

    const data = await res.json();
    const firstMovie = data.results[0];
    //Asumir que sólo es una y hacer PR cuando funcione
    return [new MovieDomain(firstMovie.title)]
}