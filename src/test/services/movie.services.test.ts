jest.mock('../../models/movies.model')
jest.mock('../../repositories/movie.repository.ts')
import * as MovieRepository from '../../repositories/movie.repository';
import { createMovieService, getAllMoviesService } from '../../services/movie.services'
(global.fetch as jest.Mock) = jest.fn();

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

describe("createMovieServie", () => {
  const mockGetAllMoviesTitles = MovieRepository.getAllMoviesTitlesFromMongoDB as jest.Mock;
  const mockCreateMovie = MovieRepository.createMovie as jest.Mock;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the repository and check if the movie title already exists", async () => {
    //Given
    mockGetAllMoviesTitles.mockResolvedValue(["Inception", "Matrix"]);
    mockCreateMovie.mockResolvedValue(undefined);
    //When
    await createMovieService("Interstellar");
    //Then
    expect(mockGetAllMoviesTitles).toHaveBeenCalled();
    expect(mockCreateMovie).toHaveBeenCalledWith("Interstellar");
  })
    it("should throw an error if the movie already exists (case insensitive)", async () => {
    //Given
    mockGetAllMoviesTitles.mockResolvedValue(["Inception", "Matrix"]);

    //When
    await expect(createMovieService("matrix")).rejects.toThrow("DUPLICATE_MOVIE");

    //Then
    expect(mockCreateMovie).not.toHaveBeenCalled();
  });
});