import { UserDomain } from "../../entities/user.class";
import User from "../../models/user.model";
jest.mock('../../models/user.model')
import { createUser } from "../../repositories/user.repository";
import { MovieType } from "../../types/movies.interface";
import { UserType } from "../../types/user.interface";
(global.fetch as jest.Mock) = jest.fn();

describe("createUser", () => {
    it("should create a new user", async () => {
        //Given
        const mockUser = new UserDomain("123", "Balamovich", "rotomskis@gmail.com", "password123", false, ["movie1", "movie2"]);

        const mockCreatedUser = {
            _id: "123",
            UserName: "Balamovich",
            email: "rotomskis@gmail.com",
            password: "hashedpassword123",
            isAdmin: false,
            favoriteMovies: ["movie1", "movie2"]
        };

        (User.create as jest.Mock).mockResolvedValue(mockCreatedUser);

        //When
        const result = await createUser(mockUser)

        //Then
        expect(User.create).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockCreatedUser);
    })
})