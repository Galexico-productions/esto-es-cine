import { Request, Response } from 'express'
import { postNewMovie, getMovies, deleteMovie } from "../../controllers/movie.controllers"
import { getAllMovies, getAllMovieTitles } from "../../services/movies.services"
import * as services from '../../services/movies.services'
import Movie from '../../models/movies.model'

jest.mock('../../services/movies.services.ts')
jest.mock('../../models/movies.model.js')



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
    (getAllMovieTitles as jest.Mock).mockResolvedValue(existingTitles);
    const req = { body: { title: "El Padrino" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;
    //When
    await postNewMovie(req as Request, res as Response)
    //Then
    expect(getAllMovieTitles).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Esa peli ya existe" })
  })

  it("should give a 201 if movie is correctly saved", async () => {
    //Given
    const existingTitles = ["El Padrino", "green book"];
    (getAllMovieTitles as jest.Mock).mockResolvedValue(existingTitles);

    Movie.create = jest.fn().mockResolvedValue({ title: "Star Wars" });

    const req = { body: { title: "Star Wars" } } as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    //When
    await postNewMovie(req as Request, res as Response)
    //Then
    expect(getAllMovieTitles).toHaveBeenCalledWith();
    expect(Movie.create).toHaveBeenCalledWith({ title: "Star Wars" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Peli añadida exitosamente' })
  });
});

describe("getMovies controller", () => {
  it("should be able to render all the movies", async () => {
    //Given
    const movies = [
      { title: 'Ants', year: '2000' },
      { title: 'Monsters INC', year: '2005' },
      { title: 'XYZ', year: '1992' }
    ];
    (getAllMovies as jest.Mock).mockResolvedValue(movies);

    const req = {} as Partial<Request>;
    const res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    //When
    await getMovies(req as Request, res as Response)
    //Then
    expect(res.render).toHaveBeenCalledWith('my-movies', { movies })
  })
  it("should get a message saying the list is empty", async () => {
    //Given
    const movies: string[] = [];
    (getAllMovies as jest.Mock).mockResolvedValue(movies)

    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;

    //When
    await getMovies(req as Request, res as Response)
    //Then
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'The list is empty' })
  })
})
describe("deleteMovie controller", () => {
  it("should return 204 and confirmation message when movie is deleted", async () => {
    //Given
    const req = {} as Partial<Request>;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as Partial<Response>;
    //When
    await deleteMovie(req as Request, res as Response)
    //Then
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'Peli borrada exitosamente' })
  })
})

