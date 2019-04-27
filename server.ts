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
        console.log(`Theatre: ${req.body.theatre}, Date: ${req.body.date}`);
        let listings: Movie[] = await getMovieListings(req.body.theatre, req.body.date);
        return res.send(listings);
    } catch (err) {
        return res.send("Error");
    }
});

app.listen(process.env.PORT || 8000);