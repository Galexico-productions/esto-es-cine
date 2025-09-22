import { postNewUser } from "../../controllers/user.controllers";
import { Request, Response } from "express";
import { createUserService } from "../../services/user.services";


jest.mock("../../services/user.services");

describe("postNewUser controller", () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user and return 201", async () => {
    const reqBody = {
      userName: "Balamovich",
      email: "balamovich@example.com",
      password: "password123",
    };

    const req = { body: reqBody } as Partial<Request>;

    const mockJson = jest.fn();
    const mockStatus = jest.fn().mockReturnThis();
    const res = { status: mockStatus, json: mockJson } as Partial<Response>;

    (createUserService as jest.Mock).mockResolvedValue({
      id: "123",
      userName: reqBody.userName,
      email: reqBody.email,
      isAdmin: false,
      favoriteMovies: [],
      passwordHash: expect.any(String),
    });

    await postNewUser(req as Request, res as Response);

    expect(createUserService).toHaveBeenCalledWith(
      expect.objectContaining({
        userName: reqBody.userName,
        email: reqBody.email,
        isAdmin: false,
        favoriteMovies: [],
        passwordHash: expect.any(String),
      })
    );

    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith(
      expect.objectContaining({ message: "User created successfully" })
    );
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
      error: "UserName, email and password are required",
    });
    expect(createUserService).not.toHaveBeenCalled();
  });

  it("should return 500 if service throws error", async () => {
    const reqBody = {
      userName: "Balamovich",
      email: "balamovich@example.com",
      password: "password123",
    };
    const req = { body: reqBody } as Partial<Request>;

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