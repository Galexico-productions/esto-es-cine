import Movie from "../models/movies.model";

export async function getAllMoviesFromMongoDB(){
    const allMovies = await Movie.find({}).collation({
        locale: 'en', strength: 1 //Debería fragmentar aun más? Es decir: 1 función sólo para find, 1 para sort, etc...
    }).sort({ title: 1 });
    return allMovies
}

export async function getAllMoviesTitlesFromMongoDB(){
    const allMoviesTitles = await Movie.find({}, "title").lean();
    return allMoviesTitles.map((m: { title: string }) => m.title);
}

export async function createMovie (title: string): Promise<void> {
    await Movie.create({ title });
};