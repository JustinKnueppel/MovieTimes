const express = require("express");
const app = express();
const movieInfo = require('./app/movieTimes.js');

app.get('/', (req, res) => {
    return res.send('Hello world');
});

app.listen(process.env.PORT || 8000);