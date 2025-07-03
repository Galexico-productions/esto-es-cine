import Movie from '../models/movies.model'
import { TMDBMovie } from '../types/TMDB.interface'


export const getAllMovies = async (): Promise<{ title: string }[]> => {
    const movies = await Movie.find({}, 'title').collation({ locale: 'en', strength: 1 }).sort({ title: 1 })

    return movies
}

export const getAllMovieTitles = async (): Promise<string[]> => {
    const movies = await Movie.find({}, "title").lean();
    return movies.map((m: { title: string }) => m.title);
}

export const fetchMovieFromTMDB = async (title: string): Promise<TMDBMovie[]> => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}`);

    if(!res.ok) {
        throw new Error(`TMDB fetch failed: ${res.status}`);
    };

    const data = await res.json();

    //Asumir que sólo es una y hacer PR cuando funcione
    return data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
    }));
};