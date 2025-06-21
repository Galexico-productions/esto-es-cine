const Movie = require('../models/movies.model')
const { getAllMovies, getAllMovieTitles } = require('../services/movies.services')


const postNewMovie = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        const allMovieTitles = await getAllMovieTitles();
        console.log("allMovieTitles from DB:", allMovieTitles);
        if (allMovieTitles.some((t) => t.toLowerCase() === title.toLowerCase())) {
            return res.status(400).json({
                error: "Esa peli ya existe"
            })
        }

        await Movie.create({
            title: req.body.title
        });

        return res.status(201).json({ message: 'Peli añadida exitosamente' });
    } catch (error) {
        console.error("Error creating movie:", error.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

const getMovies = async (req, res) => {
    try {
        const movies = await getAllMovies()
        res.render('my-movies', { 
            movies
        })
    } catch (error) {
        console.error("Error getting the list of movies: ", error.message);
        return res.statur(500).json({
            error: "Internal server error"
        })
    }
}

module.exports = {
    postNewMovie,
    getMovies
}