import Movie from '../models/movies.model'


export const getAllMovies = async (): Promise<{ title: string }[]> => {
    const movies = await Movie.find({}, 'title').collation({ locale: 'en', strength: 1 }).sort({ title: 1 })

    return movies
}

export const getAllMovieTitles = async (): Promise<string[]> => {
    const movies = await Movie.find({}, "title").lean();
    return movies.map((m: { title: string }) => m.title);
}
