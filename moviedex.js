require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const {handleGetCountries, handleGetGenres, handleGetMovies} = require('./callbackFunctions')
const {validateBearerToken } = require('./prepFunctions');

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(validateBearerToken);
app.get('/movie', handleGetMovies)
app.get('/movie/genres', handleGetGenres)
app.get('/movie/countries', handleGetCountries)

module.exports = app;


