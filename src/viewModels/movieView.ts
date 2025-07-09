import { MovieTitleType } from "../types/movies.interface";

export const extractTitles = (movies: { title: string }[]) => movies.map(m => m.title);

export const sortMoviesByTitle = (movies: MovieTitleType[]): MovieTitleType[] => {
    return [...movies].sort((a,b) => a.title.localeCompare(b.title))
}