
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');

const app = express();

require('dotenv').config();

const mongoString = process.env.DB_URI

mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})





app.use(express.json());

app.use('/api', routes)

app.listen(3029, () => {
    console.log(`Server Started at ${3029}`)
})