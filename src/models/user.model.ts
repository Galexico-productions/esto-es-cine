import { Schema, model } from 'mongoose'
import { DBUserType } from '../types/user.interface';

const favoriteMovieSchema = new Schema({
    title: { type: String, required: true },
    tmdbId: { type: String, required: true },
    poster_path: { type: String }
})

const userSchema = new Schema<DBUserType>({
    userName: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    favoriteMovies: {
        type: [favoriteMovieSchema],
        default: []
    }
});



const User = model('User', userSchema);

export default User;