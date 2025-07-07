import Movie from "../models/movies.model";

export async function getAllMoviesFromMongoDB(){
    const allMovies = await Movie.find({}, 'title').collation({
        locale: 'en', strength: 1 //Debería fragmentar aun más? Es decir: 1 función sólo para find, 1 para sort, etc...
    }).sort({ title: 1 });
    return allMovies
}