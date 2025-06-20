const Movie = require('../models/movies.model')

const getAllMovieTitles = async () => {
    const movies = await Movie.find({}, "title").lean();
    return movies.map((m) => m.title);
}

module.exports = {
    getAllMovieTitles,
}