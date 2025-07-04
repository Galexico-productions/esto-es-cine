import Movie from '../models/movies.model';
import { Request, Response } from 'express';
import { getAllMovies, getAllMovieTitles } from '../services/movies.services';
import { fetchMovieFromTMDB } from '../services/movies.services';


export const postNewMovie = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title } = req.body;
        if (!title) {
            res.status(400).json({
                error: "Title is required"
            });
            return
        };

        const allMovieTitles = await getAllMovieTitles();
        if (allMovieTitles.some((t) => t.toLowerCase() === title.toLowerCase())) {
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
        const movies = await getAllMovies()

        if (movies.length === 0) {
            res.status(204).json({
                message: 'The list is empty'
            })
            return
        } else {
            res.render('my-movies', {
                movies
            })
        }


    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error getting the list of movies:", error.message);
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

export const getMovieInfo = async (req: Request, res: Response): Promise<void> => {
    try {
        const movieTitle = req.query.title as string
        const fetchedMovie = await fetchMovieFromTMDB(movieTitle)
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

