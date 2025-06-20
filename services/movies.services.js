const Movie = require('../models/movies.model')

const getAllMovieTitles = async () => {
    const moviesTitles = await Movie.find({}, "title").lean();

    const titlesArray = moviesTitles.map(movie => movie.title.toLowerCase());

    return titlesArray
}

module.exports = {
    getAllMovieTitles,
}