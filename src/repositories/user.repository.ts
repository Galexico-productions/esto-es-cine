import { UserDomain } from "../entities/user.class";
import User from "../models/user.model";
import { DBUserType } from "../types/user.interface";

export async function createUser(user: UserDomain): Promise<DBUserType> {
 const createdUser = await User.create({
    userName: user.userName,
    email: user.email,
    password: user.getPasswordHash(),
    isAdmin: user.isAdmin,
    favoriteMovies: user.favoriteMovies,
 });

 return createdUser.toObject ? createdUser.toObject() : createdUser;
}

export async function getUserByUserName(userName: string): Promise<DBUserType | null> {
    const user = await User.findOne({ userName });
    return user ? user.toObject() : null;
}