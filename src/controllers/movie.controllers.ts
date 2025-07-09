import Movie from '../models/movies.model';
import { Request, Response } from 'express';
import { getAllMoviesService, getAllMovieTitlesService } from '../services/movie.services';
import { getMovieByTitleFromTMDB } from '../client/TMDBClient';
import { sortMoviesByTitle } from '../viewModels/movieView';


export const postNewMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        if (!title) {
            res.status(400).json({
                error: "Title is required"
            });
            return
        };

        const allMovieTitles = await getAllMovieTitlesService();
        if (allMovieTitles.some((t:string) => t.toLowerCase() === title.toLowerCase())) {
            res.status(400).json({
                error: "Esa peli ya existe"
            });
            return;
        };

        await Movie.create({
            title: req.body.title
        });

        res.status(201).json({ message: 'Peli añadida exitosamente' });
        return
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error creating movie:", error.message);
        } else {
            console.error("Unkown error:", error)
        }
        res.status(500).json({
            error: "Internal Server Error"
        })
            ;
        return

    }
}
export const getMovies = async (req: Request, res: Response): Promise<void> => {
    try {
        const movies = await getAllMoviesService()
        if (movies.length === 0) {
            res.status(404).json({
                message: 'The list is empty'
            });
            return
        };
        res.render('my-movies', {
            movies: sortMoviesByTitle(movies)
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error getting the list of movies:", error.message);
        } else {
            console.error("Unkown error:", error)
        };
        res.status(500).json({
            error: "Internal Server Error"
        });
        return
    };
};
export const getMovieInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieTitle = req.query.title as string
        const fetchedMovie = await getMovieByTitleFromTMDB(movieTitle) //Temporal: Después mover a services junto con test
        console.log("🚀 ~ getMovieInfo ~ fetchedMovie:", fetchedMovie)

        if (!fetchedMovie) {
            res.status(204).json({
                message: 'No results'
            })
            return
        } else {
        }

    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error searching for the movie:", error.message);
        } else {
            console.error("Unkown error:", error)
        }
        res.status(500).json({
            error: "Internal Server Error"
        });
        return
    }
}

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const deletedMovie = await Movie.findByIdAndDelete(id)
        if (!deletedMovie) {
            res.status(404).json({
                error: 'Movie not found'
            });
            return;
        }
        res.status(204).json({
            message: 'Peli borrada exitosamente'
        });
        // res.redirect('/my-movies');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error deleting the movie:", error.message);
        } else {
            console.error("Unkown error:", error)
        }
        res.status(500).json({
            error: "Internal Server Error"
        });
        return
    }
}

