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

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    return res.sendFile('/index.html', { root: __dirname});
});

app.get('/api/amc', async (req, res) => {
    try {
        console.log(`Theatre: ${req.query.theatre}, Date: ${req.query.date}`);
        let listings: Movie[] = await getMovieListings(req.query.theatre, req.query.date);
        res.setHeader('Content-Type', 'application/json');
        return res.send(listings);
    } catch (err) {
        return res.send("Error");
    }
});

const PORT = process.env.API_PORT || 8000;
app.listen(PORT, () => {
    console.log(`API Started on port ${PORT}`);
});