import { UserDomain } from "../models/user.class";
import User from "../models/user.model";
import { UserType } from "../types/user.interface";

export async function createUser(user: UserDomain): Promise<UserType> {
 const createdUser = await User.create({
    name: user.name,
    email: user.email,
    password: user.verifyPassword,
    isAdmin: user.isAdmin,
    favoriteMovies: user.favoriteMovies,
 });

 return createdUser.toObject ? createdUser.toObject() : createdUser;
}

export async function getUserByEmail(email: string): Promise<UserType | null> {
    const user = await User.findOne({ email });
    return user ? user.toObject() : null;
}