import express from 'express';
import { getHome, getSearchMovies } from '../controllers/index.controllers'

const router = express.Router();


router.get('/', getHome);
router.get('/search', getSearchMovies);

export default router;