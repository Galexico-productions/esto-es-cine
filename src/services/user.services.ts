import { UserDomain } from "../models/user.class"
import { createUser, getUserByEmail } from "../repositories/user.repository"
import { UserType } from "../types/user.interface"

export const createUserService = async (userData: UserDomain): Promise<UserType> => {
    const existingUser = await getUserByEmail(userData.email);
    if(existingUser) {
        throw new Error("User already exists")
    }
    const createdUser = await createUser(userData);
    return createdUser
}