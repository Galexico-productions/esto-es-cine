import Movie from '../models/movies.model'
import { getAllMoviesFromMongoDB } from '../repositories/movie.repository'
import { TMDBMovie } from '../types/TMDB.interface'


export const getAllMoviesService = async (): Promise<{ title: string }[]> => {
    const allMoviesFromRepository = await getAllMoviesFromMongoDB();
    return allMoviesFromRepository
}

export const getAllMovieTitles = async (): Promise<string[]> => {
    const movies = await Movie.find({}, "title").lean();
    return movies.map((m: { title: string }) => m.title);
} //Esta función tendría que estar en views. 

export const fetchMovieFromTMDB = async (title: string): Promise<TMDBMovie[]> => {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${title}`);

    if(!res.ok) {
        throw new Error(`TMDB fetch failed: ${res.status}`);
    };

    const data = await res.json();

    //Asumir que sólo es una y hacer PR cuando funcione
    return data.results;
};