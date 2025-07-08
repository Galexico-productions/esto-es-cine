jest.mock('../../models/movies.model')
import * as MovieRepository from '../../repositories/movie.repository';
import { getAllMoviesService } from '../../services/movie.services'
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