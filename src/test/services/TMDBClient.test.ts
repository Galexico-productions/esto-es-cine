import { getMovieByTitle } from "../../services/TMDBClient";
import { MovieDomain } from "../../services/movie.domain";
(global.fetch as jest.Mock) = jest.fn();

describe("getMovieByTitle", () => {
    it("should return a list of a movie that matches the title from the TMDB API", async () => {
        //Given
        const title = "Titanic"
        const mockMovie = [
            { id: 1, title: title }
        ];
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({
                results: mockMovie
            })
        })
        //When
        const result = await getMovieByTitle(title);
        //Then
        expect(result).toEqual([new MovieDomain(title)])
    });
})