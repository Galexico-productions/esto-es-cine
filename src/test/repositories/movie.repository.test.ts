import Movie from "../../models/movies.model";
jest.mock('../../models/movies.model')
import { getAllMoviesFromMongoDB } from "../../repositories/movie.repository"
(global.fetch as jest.Mock) = jest.fn();


describe("getAllMoviesFromMongoDB", () => {
    it("should get an array with all movies from Movies MongoDB collection", async () => {
        //Given
        const mockUnorderedMovies = [
            { title: "Monsters INC", year: "2005" },
            { title: "XYZ", year: "1992" },
            { title: "Ants", year: "2000" },
        ];
        const mockSort = jest.fn().mockResolvedValue(mockUnorderedMovies);
        const mockCollation = jest.fn().mockReturnValue({ sort: mockSort });
        jest.spyOn(Movie, "find").mockReturnValue({ collation: mockCollation } as any);

        const result = await getAllMoviesFromMongoDB();

        expect(result).toEqual(mockUnorderedMovies);
    });
    it("should sort all the movies in alphabetical order", async () => {
        //Given
        const mockSortedMovies = [
            { title: 'Ants', year: '2000' },
            { title: 'Monsters INC', year: '2005' },
            { title: 'XYZ', year: '1992' }
        ];
        const sortMock = jest.fn().mockResolvedValue(mockSortedMovies);
        const collationMock = jest.fn().mockReturnValue({ sort: sortMock })
        jest.spyOn(Movie, 'find').mockReturnValue({
            collation: collationMock,
        } as any);

        //When
        const result = await getAllMoviesFromMongoDB();
        //Then
        expect(result).toEqual(mockSortedMovies);
    })
})