import { MovieDomain } from "../entities/movie.class";
import Movie from "../models/movies.model";
import User from "../models/user.model"
import { MovieIDType, MovieTitleType, MovieType } from "../types/movies.interface";

export async function getAllMoviesFromMongoDB() {
    const allMovies = await Movie.find({}).collation({
        locale: 'en', strength: 1
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

export async function addMovieToUser(userId: string, movie: MovieDomain) {
    const updateUser = await User.findByIdAndUpdate(
        userId, {
        $addToSet: {
            favoriteMovies: {
                title: movie.getTitle(),
                tmdbId: movie.getId(),
                poster_path: movie.getPosterPath()
            }
        }
    },
    { new: true }
    )

    if(!updateUser) throw new Error("USER_NOT_FOUND");

    return movie
}


export async function createMovie(movie: MovieDomain): Promise<MovieType> {
    const createdMovie = await Movie.create({
        title: movie.getTitle(),
        tmdbId: movie.getId(),
        poster_path: movie.getPosterPath(),
    });
    return createdMovie
};

export async function deleteMovie(id: string): Promise<void> {
    await Movie.findByIdAndDelete(id)
}