import { getMovieByTitleFromTMDB } from "../../client/TMDBClient";
import { MovieDomain } from "../../entities/movie.class";
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
        const result = await getMovieByTitleFromTMDB(title);
        //Then
        expect(result).toEqual([new MovieDomain(title)])
    });
    it("should show an error message when the movie does not exist", async () => {
        //Given
        const mockTitle = "this is the fake title";

        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 404
        })
        //When and then
        await expect(getMovieByTitleFromTMDB(mockTitle)).rejects.toThrow("TMDB fetch failed: 404")
    })
})