import { getAllMoviesFromMongoDB, getAllMoviesTitlesFromMongoDB } from '../repositories/movie.repository'


export const getAllMoviesService = async (): Promise<{ title: string }[]> => {
    return await getAllMoviesFromMongoDB();
}

export const getAllMovieTitlesService = async (): Promise<string[]> => {
    return await getAllMoviesTitlesFromMongoDB();
} 
