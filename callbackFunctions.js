const moviedex = require('./movies-data.json');
const {genres, countries} = require('./prepFunctions');

const handleCountrySearch = (country, movies) => {
    return movies.filter(movie => movie.country.toLowerCase().includes(country.toLowerCase()))
}

const handleGenreSearch = (genre, movies) => {
    return movies.filter(movie => movie.genre.toLowerCase().includes(genre.toLowerCase()))
}

const handleAvgVoteSearch = (avg_vote, movies) => {
    return movies.filter(movie => Number(movie.avg_vote)>= Number(avg_vote))
}

const handleGetMovies = (req, res) => {
    const genre = req.query.genre;
    const avg_vote = req.query.avg_vote;
    const country = req.query.country;
    const invalidQuery = !genre && !country && !avg_vote;
    let movies = moviedex.slice(0);
    
    if(invalidQuery){
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

    res.json(movies)
}

const handleGetGenres = (req, res) => {
    res.json(genres)
}

const handleGetCountries = (req, res) => {
    res.json(countries)
}

module.exports = {handleGetCountries, handleGetGenres, handleGetMovies}