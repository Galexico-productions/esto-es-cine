import express from 'express';
import { getHome } from '../controllers/index.controllers'
import { postNewMovie, getMovies } from '../controllers/movie.controllers'

const router = express.Router();


router.get('/', getHome);
router.post('/new-movie', postNewMovie);
router.get('/my-movies', getMovies)


export default router;