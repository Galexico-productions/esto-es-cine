const { postNewMovie, getMovies } = require('/controllers/movie.controllers')
const { getAllMovies, getAllMovieTitles } = require('/services/movies.services')
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

describe("getMovies controller", () => {
  it("should be able to render all the movies", async () => {
    //Given
    const movies = [
      { title: 'Ants', year: '2000' },
      { title: 'Monsters INC', year: '2005' },
      { title: 'XYZ', year: '1992' }
    ];
    getAllMovies.mockResolvedValue(movies);

    const req = {}
    const res = {
      render: jest.fn(),
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    //When
    await getMovies(req, res)
    //Then
    expect(res.render).toHaveBeenCalledWith('my-movies', { movies })
  })
  it("should get a message saying the list is empty", async () => {
    //Given
    const movies = [];
    getAllMovies.mockResolvedValue(movies)

    const req = {}
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    //When
    await getMovies(req, res)
    //Then
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.json).toHaveBeenCalledWith({ message: 'The list is empty' })
  })
})

// AC1: Display Delete button
// Given there are movies in the system
// When the user is viewing the list of movies
// Then there should be a delete button next to each of them

// AC2: Delete an existing movie
// Given the user is viewing the list of movies
// When they click on the Delete button for a movie with title X
// Then the list of movies should be updated to not include movie X
// And a message should be shown saying that movie X was deleted
