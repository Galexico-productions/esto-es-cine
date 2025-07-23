import { createMovie, deleteMovie, getAllMoviesFromMongoDB, getAllMoviesIDsFromMongoDB, getAllMoviesTitlesFromMongoDB } from '../repositories/movie.repository'
import { MovieType } from '../types/movies.interface';


export const getAllMoviesService = async (): Promise<{ title: string }[]> => {
    return getAllMoviesFromMongoDB();
}

export const getAllMovieTitlesService = async (): Promise<string[]> => {
    return await getAllMoviesTitlesFromMongoDB();
} 

export const createMovieService = async (title: string): Promise<void> => {
    const existingTitles = await getAllMoviesTitlesFromMongoDB();
    const alreadyExists = existingTitles.some(t => t.toLowerCase() === title.toLowerCase());

    if(alreadyExists) {
        throw new Error("DUPLICATE_MOVIE");
    }
    await createMovie(title);
};

export const deleteMovieService = async (id: string): Promise<void> => {
    const allMoviesIDs = await getAllMoviesIDsFromMongoDB();
    const exists = allMoviesIDs.includes(id)
    if(!exists) {
        throw new Error("The movie does not exist in the Database")
    }
    await deleteMovie(id);
}