import { createMovie, getAllMoviesFromMongoDB, getAllMoviesTitlesFromMongoDB } from '../repositories/movie.repository'


export const getAllMoviesService = async (): Promise<{ title: string }[]> => {
    return await getAllMoviesFromMongoDB();
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
}