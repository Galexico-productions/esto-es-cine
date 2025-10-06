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

    const req = { 
      body: reqBody,
      session: {}
     } as unknown as Request;

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
    const mockCreateUserService = createUserService as jest.Mock;

    const mockSession: any = {};
    const mockReq: any = { body: { userName: "john", email: "john@example.com", password: "1234" }, session: mockSession };
    const mockStatus = jest.fn().mockReturnThis();
    const mockJson = jest.fn();

    const res = {
      status: mockStatus,
      json: mockJson,
    } as Partial<Response>;

    mockCreateUserService.mockResolvedValue({
      id: "user123",
      userName: "john",
      email: "john@example.com"
    })

    await postNewUser(mockReq, { status: mockStatus, json: mockJson } as any);

    expect(mockStatus).toHaveBeenCalledWith(201);
    expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
      message: "User created successfully"
    }));
    expect(mockSession.userId).toBe("user123");
    expect(mockSession.userName).toBe("john");
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