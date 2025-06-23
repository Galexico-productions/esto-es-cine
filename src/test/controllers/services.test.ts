import { getAllMovies } from "../../services/movies.services"
import Movie from '../../models/movies.model'
jest.mock('../../models/movies.model')

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
}) 