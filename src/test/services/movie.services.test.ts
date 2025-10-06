jest.mock('../../repositories/movie.repository.ts')
jest.mock("../../repositories/user.repository.ts");
jest.mock('../../client/TMDBClient.ts')

import { getMovieByTitleFromTMDB } from '../../client/TMDBClient';
import { MovieDomain } from '../../entities/movie.class';
import User from '../../models/user.model';
import * as MovieRepository from '../../repositories/movie.repository';
import { addMovieToUser } from '../../repositories/movie.repository'; 
import { addMovieToUserService, createMovieService, deleteMovieService, getAllMoviesService } from '../../services/movie.services'

(global.fetch as jest.Mock) = jest.fn();

const mockGetMovieByTitleFromTMDB = getMovieByTitleFromTMDB as jest.Mock;
const mockGetAllMoviesTitles = MovieRepository.getAllMoviesTitlesFromMongoDB as jest.Mock;
const mockCreateMovie = MovieRepository.createMovie as jest.Mock;
const mockGetAllMoviesIDs = MovieRepository.getAllMoviesIDsFromMongoDB as jest.Mock;
const mockDeleteMovie = MovieRepository.deleteMovie as jest.Mock;

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

describe("addMovieToUserService", () => {
  const mockUserId = "user123";
  const mockMovieTitle = "Inception";
  const mockMovie = new MovieDomain("Inception", "123", "/poster.jpg");

  beforeEach(() => {
    jest.clearAllMocks();
    (getMovieByTitleFromTMDB as jest.Mock).mockResolvedValue([mockMovie]);
    (addMovieToUser as jest.Mock).mockResolvedValue(mockMovie);
  });


  it("should fetch movie data from TMDB and save it to the user’s movie list", async () => {
    const result = await addMovieToUserService(mockUserId, mockMovieTitle);

    expect(getMovieByTitleFromTMDB).toHaveBeenCalledWith(mockMovieTitle);
    expect(addMovieToUser).toHaveBeenCalledWith(mockUserId, mockMovie);

    expect(result).toBeInstanceOf(MovieDomain);
    expect(result.getTitle()).toBe("Inception");
    expect(result.getId()).toBe("123");
    expect(result.getPosterPath()).toBe("/poster.jpg");
  })

})

describe("createMovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch details from TMDB and save movie if not duplicate", async () => {
    //Given
    mockGetAllMoviesTitles.mockResolvedValue(["Inception", "Matrix"]);
    const mockMovie = new MovieDomain("Interstellar", "300");
    mockGetMovieByTitleFromTMDB.mockResolvedValue([mockMovie]);
    mockCreateMovie.mockResolvedValue(undefined);
    //When
    const result = await createMovieService("Interstellar");
    //Then
    expect(mockGetAllMoviesTitles).toHaveBeenCalled();
    expect(mockGetMovieByTitleFromTMDB).toHaveBeenCalledWith("Interstellar")
    expect(mockCreateMovie).toHaveBeenCalledWith(mockMovie);
    expect(result).toEqual(mockMovie);
  })
  it("should throw DUPLICATE_MOVIE if the movie title already exists", async () => {
    //Given
    mockGetAllMoviesTitles.mockResolvedValue(["Inception", "Matrix"]);

    //When
    await expect(createMovieService("matrix")).rejects.toThrow("DUPLICATE_MOVIE");

    //Then
    expect(mockGetMovieByTitleFromTMDB).not.toHaveBeenCalled();
    expect(mockCreateMovie).not.toHaveBeenCalled();
  });
  it("should throw MOVIE_NOT_FOUND if TMDB returns empty", async () => {
    //Given
    mockGetAllMoviesTitles.mockResolvedValue([]);
    mockGetMovieByTitleFromTMDB.mockResolvedValue([]);
    //WHen
    await expect(createMovieService("NonExistingMovie")).rejects.toThrow("MOVIE_NOT_FOUND");
    //Then
    expect(mockCreateMovie).not.toHaveBeenCalled();
  });
});

describe("deleteMovieService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete the movie if it exists in the MongoDB database", async () => {
    //Given
    mockGetAllMoviesIDs.mockResolvedValue(["movie_id_to_delete"]);
    mockDeleteMovie.mockResolvedValue(undefined)
    //When
    await deleteMovieService("movie_id_to_delete")
    //Then  
    expect(mockGetAllMoviesIDs).toHaveBeenCalled();
    expect(mockDeleteMovie).toHaveBeenCalledWith("movie_id_to_delete");
  });
  it("should throw an error if the movie does not exist in the database", async () => {
    //Given
    mockGetAllMoviesIDs.mockResolvedValue(["movie_id"])
    //When
    await expect(deleteMovieService("other_movie_id")).rejects.toThrow("The movie does not exist in the Database")
    //Then
    expect(mockDeleteMovie).not.toHaveBeenCalled();
  })
})