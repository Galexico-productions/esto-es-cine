import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
import indexRoutes from './routes/index.routes';
import moviesRoutes from './routes/movie.routes';
import path from 'path';
import methodOverride from 'method-override'

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.use('/', indexRoutes);
app.use('/movie', moviesRoutes);

async function connectDB() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is missing")
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection error: ', err);
    }
}
connectDB();

//Server init
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening correctly in port ${PORT}`)
})