import { postNewUser } from "../../controllers/user.controllers";
import { Request, Response } from "express";
import { createUserService } from "../../services/user.services";
import { DBUserType } from "../../types/user.interface";


jest.mock("../../services/user.services");

describe("postNewUser controller", () => {
    const mockUser: DBUserType = {
        id: "123",
        name: "Balamovich",
        email: "balamovich@example.com",
        password: "password123",
        isAdmin: false,
        favoriteMovies: ["peli1", "peli2"]
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a new user and return 201", async () => {
        const req = { body: mockUser } as Partial<Request>;;

        const mockJson = jest.fn();
        const mockStatus = jest.fn().mockReturnThis();

        const res = {
            status: mockStatus,
            json: mockJson,
        } as Partial<Response>;

        (createUserService as jest.Mock).mockResolvedValue(mockUser);

        await postNewUser(req as Request, res as Response);

        expect(createUserService).toHaveBeenCalledWith(mockUser);
        expect(mockStatus).toHaveBeenCalledWith(201);
        expect(mockJson).toHaveBeenCalledWith({
            message: "User created successfully",
            user: mockUser,
        });
    });
    it("should return 400 if name or email is missing", async () => {
    const req = { body: { email: "" } } as Partial<Request>;

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnThis();

    const res = {
      status: mockStatus,
      json: mockJson,
    } as Partial<Response>;

    await postNewUser(req as Request, res as Response);

    expect(mockStatus).toHaveBeenCalledWith(400);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Name and email are required",
    });
    expect(createUserService).not.toHaveBeenCalled();
  });

  it("should return 500 if service throws error", async () => {
    const req = { body: mockUser } as Partial<Request>;

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnThis();

    const res = {
      status: mockStatus,
      json: mockJson,
    } as Partial<Response>;

    (createUserService as jest.Mock).mockRejectedValue(new Error("DB failure"));

    await postNewUser(req as Request, res as Response);

    expect(mockStatus).toHaveBeenCalledWith(500);
    expect(mockJson).toHaveBeenCalledWith({
      error: "Internal Server Error",
    });
  });
});