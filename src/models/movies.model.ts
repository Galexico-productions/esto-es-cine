import { Schema, model } from 'mongoose'
import { MovieType } from '../types/movies.interface';

const movieSchema = new Schema<MovieType>({
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
    imdb_rating: {
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

export default Movie;