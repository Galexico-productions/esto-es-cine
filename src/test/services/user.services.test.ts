import { UserDomain } from "../../entities/user.class";
import { createUser, getUserByUserName } from "../../repositories/user.repository";
import { DBUserType } from "../../types/user.interface";
import { createUserService } from "../../services/user.services";



jest.mock("../../repositories/user.repository");

describe("createUserService", () => {
    const mockUserDomain = new UserDomain(
        "123",
        "Balamovich",
        "balamovich@example.com",
        "password123",
        false,
        ["peli1", "peli2"]
    );

    const mockCreatedUser: DBUserType = {
        id: "123",
        userName: "Balamovich",
        email: "balamovich@example.com",
        password: "password135",
        isAdmin: false,
        favoriteMovies: ["peli1", "peli2"]
    }

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a user when email does not exist", async () => {
        //Given
        (getUserByUserName as jest.Mock).mockResolvedValue(null);
        (createUser as jest.Mock).mockResolvedValue(mockCreatedUser);

        //When
        const result = await createUserService(mockUserDomain);

        //Then
        expect(getUserByUserName).toHaveBeenCalledWith(mockUserDomain.userName);
        expect(createUser).toHaveBeenCalledWith(mockUserDomain);
        expect(result).toEqual(mockCreatedUser);
    });

    it("should throw an error when user email already exists", async () => {
        //Given
        (getUserByUserName as jest.Mock).mockResolvedValue(mockCreatedUser);

        // When / Then
        await expect(createUserService(mockUserDomain)).rejects.toThrow("User already exists");

        expect(getUserByUserName).toHaveBeenCalledWith(mockUserDomain.userName);
        expect(createUser).not.toHaveBeenCalled();
    });
});