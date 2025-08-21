import { extractTitles, sortMoviesByTitle } from "../../viewModels/movieView"


describe("extractTitles function", () => {
    it("should extract titles from an array of movie objects", () => {
        //Given
        const movies = [
            { title: 'Oppenhaimer' },
            { title: 'Interstellar' },
            { title: 'Inception' }
        ];
        //When
        const result = extractTitles(movies);
        //Then
        expect(result).toEqual(['Oppenhaimer', 'Interstellar', 'Inception'])
    });
    it("should return an empty array when receives an empty movie object", () => {
        const movies: { title: string }[] = [];
        const result = extractTitles(movies);
        expect(result).toEqual([]);
    });
});

describe("sortMoviesByTitle function", () => {
    it("should sort all the movies alphabetically by their titles", () => {
        const unsortedMovies = [
            { title: 'Oppenhaimer' },
            { title: 'Interstellar' },
            { title: 'Inception' }
        ];
        const result = sortMoviesByTitle(unsortedMovies);
        expect(result).toEqual([
            { title: 'Inception' },
            { title: 'Interstellar' },
            { title: 'Oppenhaimer' }
        ])
    });
});