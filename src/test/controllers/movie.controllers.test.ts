import { Request, Response } from 'express'
import { postNewMovie, getMovies, deleteMovie } from "../../controllers/movie.controllers"
import { createMovieService, deleteMovieService, getAllMoviesService } from "../../services/movie.services"
import Movie from '../../models/movies.model'
import { sortMoviesByTitle } from '../../viewModels/movieView'

jest.mock('../../services/movie.services')
jest.mock('../../models/movies.model')



describe("postNewMovie when called", () => {
  const mockCreateMovieService = createMovieService as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should give a 400 error if there is no title", async () => {
    //Given
    const req = { body: { title: '' } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;
    //When
    await postNewMovie(req as Request, res as Response)
    //Then
    expect(mockCreateMovieService).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Title is required" })
  });

  it("should give a 201 if movie is correctly saved", async () => {
    //Given
    mockCreateMovieService.mockResolvedValue(undefined);

    const req = { body: { title: "Star Wars" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    //When
    await postNewMovie(req as Request, res as Response)
    //Then
    expect(mockCreateMovieService).toHaveBeenCalledWith("Star Wars");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Peli añadida exitosamente' })
  });
  it("should return a 500 if unknown error occurs", async () => {
    // Given
    mockCreateMovieService.mockRejectedValue(new Error("Database down"));

    const req = { body: { title: "The Matrix" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    // When
    await postNewMovie(req as Request, res as Response);
    // Then
    expect(mockCreateMovieService).toHaveBeenCalledWith("The Matrix");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

describe("getMovies controller", () => {
  it("should be able to render all the movies sorted", async () => {
    //Given
    const movies = [
      { title: 'XYZ', year: '1992' },
      { title: 'Ants', year: '2000' },
      { title: 'Monsters INC', year: '2005' },
    ];
    (getAllMoviesService as jest.Mock).mockResolvedValue(movies);

    const req = {} as Partial<Request>;
    const res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    const sortedMovies = sortMoviesByTitle(movies);
    //When
    await getMovies(req as Request, res as Response)

    //Then
    expect(res.render).toHaveBeenCalledWith('my-movies', { movies: sortedMovies })
  })
  it("should get a message saying the list is empty", async () => {
    //Given
    const movies: string[] = [];
    (getAllMoviesService as jest.Mock).mockResolvedValue(movies)

    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    //When
    await getMovies(req as Request, res as Response)
    //Then
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'The list is empty' })
  })
})
describe("deleteMovie controller", () => {
  const mockDeleteMovieService = deleteMovieService as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 200 and confirmation message when movie is deleted", async () => {
    //Given
    const req = {
      params: { id: "this is a mock id" }
    } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    mockDeleteMovieService.mockResolvedValue(undefined);

    //When
    await deleteMovie(req as Request, res as Response)
    //Then
    expect(mockDeleteMovieService).toHaveBeenCalledWith("this is a mock id")
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Peli borrada exitosamente' })
  });

  it("should return 404 if no id is provided", async () => {
    //Given 
    const req = { params: {} } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    //When
    await deleteMovie(req as Request, res as Response);

    //Then
    expect(mockDeleteMovieService).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Movie not found' })
  });

  it("should return a 500 code when service failure", async () => {
    //Given
    const req = { params: { id: "123" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    mockDeleteMovieService.mockRejectedValue(new Error("Something went wrong"));

    //When
    await deleteMovie(req as Request, res as Response);

    //Then
    expect(mockDeleteMovieService).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});

