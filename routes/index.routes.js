const express = require('express')
const router = express.Router();

const indexControllers = require('../controllers/index.controllers');

router.get('/', indexControllers.getHome);
router.post('/new-movie', indexControllers.postNewMovie)


module.exports = router