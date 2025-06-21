const Movie = require('../models/movies.model')


const getAllMovies = async () => {
    const movies = await Movie.find({}, 'title').collation({ locale: 'en', strength: 1 }).sort({ title: 1 })

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