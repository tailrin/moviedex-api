const moviedex = require('./movies-data.json')

const getCountries = () => {
    const countriesSet = new Set();
    moviedex.map(movie => {
        movie.country.split(', ').map(country => {
            countriesSet.add(country)
        })
    });
    return Array.from(countriesSet);
}

const countries = getCountries();
const genres = Array.from(new Set(moviedex.map(movie => {
    return movie.genre
})));

module.exports = {genres, countries}