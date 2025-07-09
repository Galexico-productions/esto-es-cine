import { Request, Response } from 'express'
import { postNewMovie, getMovies, deleteMovie } from "../../controllers/movie.controllers"
import { getAllMoviesService, getAllMovieTitlesService } from "../../services/movie.services"
import Movie from '../../models/movies.model'
import { sortMoviesByTitle } from '../../viewModels/movieView'

jest.mock('../../services/movie.services')
jest.mock('../../models/movies.model')



describe("postNewMovie when called", () => {
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
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Title is required" })
  });

  it("should give a 400 error if movie already exists", async () => {
    //Given
    const existingTitles = ["El Padrino", "green book"];
    (getAllMovieTitlesService as jest.Mock).mockResolvedValue(existingTitles);
    const req = { body: { title: "El Padrino" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;
    //When
    await postNewMovie(req as Request, res as Response)
    //Then
    expect(getAllMovieTitlesService).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Esa peli ya existe" })
  })

  it("should give a 201 if movie is correctly saved", async () => {
    //Given
    const existingTitles = ["El Padrino", "green book"];
    (getAllMovieTitlesService as jest.Mock).mockResolvedValue(existingTitles);

    Movie.create = jest.fn().mockResolvedValue({ title: "Star Wars" });

    const req = { body: { title: "Star Wars" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    //When
    await postNewMovie(req as Request, res as Response)
    //Then
    expect(getAllMovieTitlesService).toHaveBeenCalledWith();
    expect(Movie.create).toHaveBeenCalledWith({ title: "Star Wars" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Peli añadida exitosamente' })
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
  it("should return 204 and confirmation message when movie is deleted", async () => {
    //Given
    const req = {
      params: { id: "this is a mock id"}
    } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;
    (Movie.findByIdAndDelete as jest.Mock).mockResolvedValue({ title: "any movie "})
    //When
    await deleteMovie(req as Request, res as Response)
    //Then
    expect(Movie.findByIdAndDelete).toHaveBeenCalledWith("this is a mock id")
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'Peli borrada exitosamente' })
  })
})

