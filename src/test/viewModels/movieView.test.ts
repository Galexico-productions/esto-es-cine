import { extractTitles } from "../../viewModels/movieView"


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
});