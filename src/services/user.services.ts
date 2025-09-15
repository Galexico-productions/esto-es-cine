import { UserDomain } from "../entities/user.class"
import { createUser, getUserByEmail } from "../repositories/user.repository"
import { DBUserType } from "../types/user.interface"

export const createUserService = async (userData: UserDomain): Promise<DBUserType> => {
    const existingUser = await getUserByEmail(userData.email);
    if(existingUser) {
        throw new Error("User already exists")
    }
    const createdUser = await createUser(userData);
    return createdUser
}