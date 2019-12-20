require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const moviedex = require('./movies-data.json')


const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());


const handleCountrySearch = (country, movies) => {

}

const handleGenreSearch = (genre, movies) => {
    
}

const handleAvgVoteSearch = (avg_vote, movies) => {
    
}

const handleGet = (req, res) => {
    res.send('this is a test')
}



app.get('/movie', handleGet)

module.exports = app;


