const express = require('express')
const router = express.Router();

const indexControllers = require('../controllers/index.controllers');
const movieControllers = require('../controllers/movie.controllers')

router.get('/', indexControllers.getHome);
router.post('/new-movie', movieControllers.postNewMovie)


module.exports = router