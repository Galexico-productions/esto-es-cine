const { Schema, model } = require('mongoose');

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    year: {
        type: String,
        // required: true,
        unique: false
    },
    description: {
        type: String,
        required: false,
        unique: false,
    },
    imdb_Rating: {
        type: String,
        required: false,
        unique: false
    },
    genre: {
        type: [String],
        required: false,
        enum: [
            "Action",
            "Adult",
            "Adventure",
            "Animation",
            "Biography",
            "Comedy",
            "Crime",
            "Documentary",
            "Drama",
            "Family",
            "Fantasy",
            "Film-Noir",
            "Game-Show",
            "History",
            "Horror",
            "Music",
            "Musical",
            "Mystery",
            "News",
            "Reality-TV",
            "Romance",
            "Sci‑Fi",
            "Short",
            "Sport",
            "Talk‑Show",
            "Thriller",
            "War",
            "Western",
            "Other"
        ]
    },
    is_watched: {
        type: Boolean,
        // required: true,
    }
});

const Movie = model('Movie', movieSchema);

module.exports = Movie;