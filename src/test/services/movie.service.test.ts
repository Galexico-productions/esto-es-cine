import { getAllMovies } from "../../services/movie.service"
import Movie from '../../models/movies.model'
jest.mock('../../models/movies.model')
import { fetchMovieFromTMDB } from '../../services/movie.service'
(global.fetch as jest.Mock) = jest.fn();
import { TMDBMovie } from "../../types/TMDB.interface"

describe("getAllMovies function", () => {
  it("should call the database and return movies sorted alphabetically", async () => {
    // Given
    const mockSortedMovies = [
      { title: 'Ants', year: '2000' },
      { title: 'Monsters INC', year: '2005' },
      { title: 'XYZ', year: '1992' }
    ];
    const sortMock = jest.fn().mockResolvedValue(mockSortedMovies);
    const collationMock = jest.fn().mockReturnValue({ sort: sortMock });

    jest.spyOn(Movie, 'find').mockReturnValue({
      collation: collationMock,
    } as any);

    // When
    const result = await getAllMovies();
    // Then
    expect(Movie.find).toHaveBeenCalledWith({}, 'title');
    expect(collationMock).toHaveBeenCalledWith({ locale: 'en', strength: 1 });
    expect(sortMock).toHaveBeenCalledWith({ title: 1 });
    expect(result).toEqual(mockSortedMovies);
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