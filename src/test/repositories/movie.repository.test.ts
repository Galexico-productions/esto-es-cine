import Movie from "../../models/movies.model";
jest.mock('../../models/movies.model')
import { getAllMoviesFromMongoDB, getAllMoviesTitlesFromMongoDB } from "../../repositories/movie.repository"
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
});

describe("getAllMoviesTitlesFromMongoDB", () => {
    it("should get all the movie titles in the MongoDB", async () => {
        //Given
        const mockMovies = [
            { title: 'Ants', year: '2000' },
            { title: 'Monsters INC', year: '2005' },
            { title: 'XYZ', year: '1992' }
        ];
        const mockMoviesTitles = [
            { title: "Monsters INC"},
            { title: "XYZ"},
            { title: "Ants"},
        ];
        const mockFind = jest.fn().mockReturnValue(mockMovies);
        const mockLean = jest.fn().mockReturnValue({ find: mockFind } as any);
        jest.spyOn(Movie, "find").mockReturnValue({ lean: mockLean } as any );
        //When
        const result = await getAllMoviesTitlesFromMongoDB()
        //Then
        expect(result).toEqual(mockMoviesTitles);
        expect
    })
})