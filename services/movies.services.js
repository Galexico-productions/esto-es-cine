const Movie = require('../models/movies.model')


const getAllMovies = async () => {
    const movies = await Movie.find();
    return movies
}

const getAllMovieTitles = async () => {
    const movies = await Movie.find({}, "title").lean();
    return movies.map((m) => m.title);
}

module.exports = {
    getAllMovies,
    getAllMovieTitles,
}