const Movie = require('../models/movies.model')
const { getAllMovieTitles } = require('../services/movies.services')


const postNewMovie = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({
                error: "Title is required"
            });
        }
        
        const allMovieTitles = await getAllMovieTitles();
        if (allMovieTitles.some((movie) => movie.title.toLowerCase() === title.toLowerCase())) {
            return res.status(400).json({
                error: "Esa peli ya existe" 
            })
        }

        await Movie.create({
            title: req.body.title
        });

        return res.status(201).send('Peli añadida exitosamente');
    } catch (error) {
        console.error("Error creating movie:", error.message);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
}

module.exports = {
    postNewMovie
}