import express from 'express';
import { getHome } from '../controllers/index.controllers'
import { postNewMovie, getMovies, deleteMovie } from '../controllers/movie.controllers'

const router = express.Router();


router.get('/', getHome);
router.post('/new-movie', postNewMovie);
router.get('/my-movies', getMovies);
router.post('/my-movies/:id', deleteMovie)


export default router;