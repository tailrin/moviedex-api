require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const moviedex = require('./movies-data.json')


const app = express();
app.use(morgan('dev'));
app.use(helmet());
app.use(function validateBearerToken(req, res, next){
    const authToken = req.get('Authorization')
    const apiToken = process.env.API_TOKEN
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
});

const handleCountrySearch = (country, movies) => {
    return movies.filter(movie => movie.country.toLowerCase() === country.toLowerCase())
}

const handleGenreSearch = (genre, movies) => {
    return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase())
}

const handleAvgVoteSearch = (avg_vote, movies) => {
    return movies.filter(movie => Number(movie.avg_vote)>= Number(avg_vote))
}

const handleGet = (req, res) => {
    const genre = req.query.genre;
    const avg_vote = req.query.avg_vote;
    const country = req.query.country;
    let movies = moviedex.slice(0);

    if(!!genre){
        movies = handleGenreSearch(genre, movies);
    }

    if(!!avg_vote){
        movies = handleAvgVoteSearch(avg_vote, movies);
    }

    if(!!country){
        movies = handleCountrySearch(country, movies)
    }

    res.send(movies)
}



app.get('/movie', handleGet)

module.exports = app;


