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

const handleGetMovies = (req, res) => {
    const genre = req.query.genre;
    const avg_vote = req.query.avg_vote;
    const country = req.query.country;
    const validQuery = !!genre && !!country && !!avg_vote;
    let movies = moviedex.slice(0);
    
    if(!validQuery){
    	res.status(400).send('Please query by genre, country, avg_vote, or any combination of these things.  You can get a list of genres at /movie/genres. You can get a list of countries at /movie/countries')
    }

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



app.get('/movie', handleGetMovies)

module.exports = app;


