import Movie from '../models/movies.model'
import { getAllMoviesFromMongoDB } from '../repositories/movie.repository'


export const getAllMoviesService = async (): Promise<{ title: string }[]> => {
    const allMoviesFromRepository = await getAllMoviesFromMongoDB();
    return allMoviesFromRepository
}

export const getAllMovieTitles = async (): Promise<string[]> => {
    const movies = await Movie.find({}, "title").lean();
    return movies.map((m: { title: string }) => m.title);
} //Esta función tendría que estar en views. 
