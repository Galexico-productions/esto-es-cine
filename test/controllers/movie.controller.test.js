const { postNewMovie, getAllMovies } = require('/controllers/movie.controllers')
const { getAllMovieTitles } = require('/services/movies.services')
jest.mock('/services/movies.services.js')
const Movie = require('/models/movies.model')
jest.mock('/models/movies.model.js')

describe("postNewMovie when called", () => {

  it("should give a 400 error if there is no title", async () => {
    //Given
    const req = { body: { title: '' } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    //When
    await postNewMovie(req, res)
    //Then
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Title is required" })
  });

  it("should give a 400 error if movie already exists", async () => {
    //Given
    const existingTitles = ["El Padrino", "green book"];
    getAllMovieTitles.mockResolvedValue(existingTitles);
    const req = { body: { title: "El Padrino" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    //When
    await postNewMovie(req, res)
    //Then
    expect(getAllMovieTitles).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Esa peli ya existe" })
  })

  it("should give a 201 if movie is correctly saved", async () => {
    //Given
    const existingTitles = ["El Padrino", "green book"];
    getAllMovieTitles.mockResolvedValue(existingTitles);

    Movie.create = jest.fn().mockResolvedValue({ title: "Star Wars" });

    const req = { body: { title: "Star Wars" } }
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    //When
    await postNewMovie(req, res)
    //Then
    expect(getAllMovieTitles).toHaveBeenCalledWith();
    expect(Movie.create).toHaveBeenCalledWith({ title: "Star Wars" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'Peli añadida exitosamente' })
  });
});

describe("getAllMovies function", () => {
  it("should be able to see all the movie titles ordered alphabetically", async () => {
    //Given
    //When
    const result = await getAllMovies(req, res)
    //Then
    expect(getAllMovies).toHaveBeenCalledWith();
  })
  it("should get a message saying the list is empty", async () => {
    //Given
    //When
    //Then
  })
})
