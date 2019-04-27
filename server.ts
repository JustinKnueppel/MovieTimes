import {Movie, getMovieListings} from "./app/amcMovies";
const bodyParser = require('body-parser');
const express = require('express');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/amc', async (req, res) => {
    try {
        let listings: Movie[] = await getMovieListings(req.body.theatre);
        return res.send(JSON.stringify(listings));
    } catch (err) {
        return res.send("Error");
    }
});

app.listen(process.env.PORT || 8000);