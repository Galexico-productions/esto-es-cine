import Movie from "../../models/movies.model";
jest.mock('../../models/movies.model')
import { createMovie, deleteMovie, getAllMoviesFromMongoDB, getAllMoviesTitlesFromMongoDB } from "../../repositories/movie.repository"
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
        const spyOn = jest.spyOn(Movie, "find").mockReturnValue({ collation: mockCollation } as any);

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
        const findSpy = jest.spyOn(Movie, 'find').mockReturnValue({
            collation: collationMock,
        } as any);

        //When
        const result = await getAllMoviesFromMongoDB();
        //Then
        expect(result).toEqual(mockSortedMovies);
        expect(findSpy).toHaveBeenCalled();
        expect(sortMock).toHaveBeenCalledWith({ title: 1 });
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
        const expectedTitles = [
            "Ants",
            "Monsters INC",
            "XYZ",
        ];
        const mockLean = jest.fn().mockReturnValue(mockMovies);
        jest.spyOn(Movie, "find").mockReturnValue({ lean: mockLean } as any)
        //When
        const result = await getAllMoviesTitlesFromMongoDB()
        //Then
        expect(result).toEqual(expectedTitles);
        expect(mockLean).toHaveBeenCalled();
    })
})

describe("createNewMovie", () => {
    it("should create a new movie in the MongoDB", async () => {
        //Given
        const mockTitle = "New Movie";

        (Movie.create as jest.Mock).mockResolvedValue({ title: mockTitle })
        //When
        await createMovie(mockTitle)
        //Then
        expect(Movie.create).toHaveBeenCalledTimes(1);
        expect(Movie.create).toHaveBeenCalledWith({ title: mockTitle });
    })
})

describe("deleteMovie", () => {
    it("should delete an existing movie in the MongoDB", async () => {
        //Given
        const mockId = "test_id";

        (Movie.findByIdAndDelete as jest.Mock).mockResolvedValue({ id: "mockId" })
        //When
        await deleteMovie(mockId)
        //Then
        expect(Movie.findByIdAndDelete).toHaveBeenCalledTimes(1);
        expect(Movie.findByIdAndDelete).toHaveBeenCalledWith( mockId )
    })
})