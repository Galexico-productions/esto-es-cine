const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const indexRoutes = require('./routes/index.routes');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'ejs');

app.use('/', indexRoutes);

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to the database')
};
connectDB().catch(err => console.log(err));


//Server init
const PORT = process.env.PORT || 3000;

app.listen(PORT, (req, res) => {
    console.log(`Server listening correctly in port ${PORT}`)
})