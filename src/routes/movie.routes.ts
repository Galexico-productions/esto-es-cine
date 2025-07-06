import express from 'express';
import { postNewMovie, getMovies, deleteMovie, getMovieInfo } from '../controllers/movie.controllers'

const router = express.Router();


router.post('/new-movie', postNewMovie);
router.get('/my-movies', getMovies);
router.post('/my-movies/:id', deleteMovie);
router.get('/search', getMovieInfo)

export default router;
