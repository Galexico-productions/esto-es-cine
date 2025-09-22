import { UserDomain } from "../entities/user.class"
import { createUser, getUserByUserName } from "../repositories/user.repository"
import { DBUserType } from "../types/user.interface"

export const createUserService = async (userData: UserDomain): Promise<DBUserType> => {
    const existingUser = await getUserByUserName(userData.userName);
    if(existingUser) {
        throw new Error("User already exists")
    }
    const createdUser = await createUser(userData);
    return createdUser
}