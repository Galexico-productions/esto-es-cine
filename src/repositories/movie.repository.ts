import { MovieDomain } from "../entities/movie.class";
import Movie from "../models/movies.model";
import { MovieIDType, MovieTitleType, MovieType } from "../types/movies.interface";

export async function getAllMoviesFromMongoDB() {
    const allMovies = await Movie.find({}).collation({
        locale: 'en', strength: 1 //Debería fragmentar aun más? Es decir: 1 función sólo para find, 1 para sort, etc...
    }).sort({ title: 1 });
    return allMovies
}

export async function getAllMoviesTitlesFromMongoDB() {
    const allMoviesTitles = await Movie.find({}, "title").lean<MovieTitleType[]>();
    return allMoviesTitles.map((m => m.title));
}

export async function getAllMoviesIDsFromMongoDB(): Promise<string[]> {
    const allMoviesIDs = await Movie.find({}, "_id").lean();
    return allMoviesIDs.map((m: any) => m._id.toString());
}

export async function createMovie(movie: MovieDomain): Promise<MovieType> {
    const createdMovie = await Movie.create({ title: movie.getTitle(),
        tmdbId: movie.getId(),
     });
     return createdMovie
};

export async function deleteMovie(id: string): Promise<void> {
    await Movie.findByIdAndDelete(id)
}