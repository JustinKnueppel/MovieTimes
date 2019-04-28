import {Movie, getMovieListings} from "./app/amcMovies";
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
    credentials: true, 
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/amc', async (req, res) => {
    try {
        console.log(`Theatre: ${req.query.theatre}, Date: ${req.query.date}`);
        let listings: Movie[] = await getMovieListings(req.query.theatre, req.query.date);
        return res.send(listings);
    } catch (err) {
        return res.send("Error");
    }
});

app.listen(process.env.PORT || 8000);