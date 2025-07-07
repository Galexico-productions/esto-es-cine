jest.mock('../../models/movies.model')
import * as MovieRepository from '../../repositories/movie.repository';
import { fetchMovieFromTMDB, getAllMoviesService } from '../../services/movie.service'
(global.fetch as jest.Mock) = jest.fn();
import { TMDBMovie } from "../../types/TMDB.interface"

describe("getAllMoviesServices function", () => {
  it("should get all movies from the movies repository", async () => {
    // Given
    const mockMovies = [
      { title: "Zootopia", year: "2016" },
      { title: "Ants", year: "1998" },
      { title: "Cars", year: "2006" }
    ] as any;
    jest.spyOn(MovieRepository, "getAllMoviesFromMongoDB").mockResolvedValue(mockMovies);
    // When
    const result = await getAllMoviesService();
    // Then
    expect(result).toEqual(mockMovies)
  });
});

describe("fetchMovieFromTMDB", () => {
  it("should call the TMDB API and return a single movie with id and title", async () => {
    //Given
    const mockTitle = 'title1'
    const mockMovie = [
      { id: 1, title: 'title1' }
    ];


    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockMovie
      })
    });
    //When
    const result: TMDBMovie[] = await fetchMovieFromTMDB(mockTitle);
    //Then
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockMovie);
  });
  it("should show an error message when the movie does not exist", async () => {
    //Given
    const mockTitle = "this is the fake title";

    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404
    })
    //When and then
    await expect(fetchMovieFromTMDB(mockTitle)).rejects.toThrow("TMDB fetch failed: 404")
  })
});