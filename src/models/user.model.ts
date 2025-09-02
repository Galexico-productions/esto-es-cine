import { Schema, model } from 'mongoose'
import { DBUserType } from '../types/user.interface';

const userSchema = new Schema<DBUserType>({
    name: {
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
        type: [String]
    }
});

const User = model('User', userSchema);

export default User;