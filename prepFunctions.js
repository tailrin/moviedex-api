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

const validateBearerToken = (req, res, next) => {
    const authToken = req.get('Authorization')
    const apiToken = process.env.API_TOKEN
    console.log(apiToken)
    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
}

const countries = getCountries();
const genres = Array.from(new Set(moviedex.map(movie => {
    return movie.genre
})));

module.exports = {genres, countries, validateBearerToken}