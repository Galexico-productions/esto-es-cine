import { UserDomain } from "../../models/user.class";
import { createUser, getUserByEmail } from "../../repositories/user.repository";
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
        name: "Balamovich",
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
        (getUserByEmail as jest.Mock).mockResolvedValue(null);
        (createUser as jest.Mock).mockResolvedValue(mockCreatedUser);

        //When
        const result = await createUserService(mockUserDomain);

        //Then
        expect(getUserByEmail).toHaveBeenCalledWith(mockUserDomain.email);
        expect(createUser).toHaveBeenCalledWith(mockUserDomain);
        expect(result).toEqual(mockCreatedUser);
    });

    it("should throw an error when user email already exists", async () => {
        //Given
        (getUserByEmail as jest.Mock).mockResolvedValue(mockCreatedUser);

        // When / Then
        await expect(createUserService(mockUserDomain)).rejects.toThrow("User already exists");

        expect(getUserByEmail).toHaveBeenCalledWith(mockUserDomain.email);
        expect(createUser).not.toHaveBeenCalled();
    });
});