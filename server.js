const app = require('./moviedex.js');
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:5000`)
});