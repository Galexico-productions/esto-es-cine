import { getAllMovies } from "../../services/movies.services"
import Movie from '../../models/movies.model'
jest.mock('../../models/movies.model')
import { fetchMoviesFromTMDB } from '../../services/movies.services'
global.fetch = jest.fn()
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

describe("fetchMoviesFromTMDB", () => {
  it("should call the TMDB API and return an array of movies with id and title", async () => {
    const mockMovies = [
      { id: 1, title: 'title1' }, { id: 2, title: 'title2' }
    ]
    const mockResponse = {
      ok: true,
      json: async () => ({ results: mockMovies })
    };

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        results: mockMovies
      })
    });

    const result: TMDBMovie[] = await fetchMoviesFromTMDB();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual([
      { id: 1, title: 'title1' }, { id: 2, title: 'title2' }
    ]);
  });
  
  it("should throw an error if fetch fails", async () => {
    const mockErrorResponse = {
      ok: false,
      status: 500
    };
    
    (fetch as jest.Mock).mockResolvedValue(mockErrorResponse);

    await expect(fetchMoviesFromTMDB()).rejects.toThrow('TMDB fetch failed: 500')
  });
});