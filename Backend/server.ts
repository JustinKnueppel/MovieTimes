import {getMovieListings} from "./app/amcMovies";

type DateFormat = string | number;

/**
 * Format a date object into a yyyy-mm-dd date string.
 * @param date Date to be formatted.
 */
function formatDate(date: Date): DateFormat {
    let dd: DateFormat = date.getDate();
    dd = dd >= 10 ? dd : `0${dd}`;
    let mm: DateFormat = date.getMonth() + 1;
    mm = mm >= 10 ? mm : `0${mm}`;
    let yyyy: DateFormat = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}

async function getTheatresInfo(dateString: string) {
    let theatresInfo = {};
    let promises = [];
    for (let theatre of theatres) {
        promises.push(getMovieListings(theatre, dateString));
    }
    let data = await Promise.all(promises);
    for(let i = 0; i < theatres.length; i++) {
        theatresInfo[theatres[i]] = data[i];
    }
    return theatresInfo;
}

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');

const app = express();

const theatres = ['amc-columbus-10', 'amc-dublin-village-18', 'amc-lennox-town-center-24'];

app.use(cors({
    credentials: true, 
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/api/date/:date', async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    return res.send(await getTheatresInfo(req.params.date));
});
app.get('/api/today', async (req, res) => {
    try {
        let today = new Date();
        let formattedDate = formatDate(today);

        return res.send(await getTheatresInfo(<string>formattedDate));
    } catch(err) {
        return res.send('Error');
    }
});

app.get('/api/date/:date/theatre/:theatre', async (req, res) => {
    try {
        console.log(`Theatre: ${req.params.theatre}, Date: ${req.params.date}`);
        let listings = await getMovieListings(req.params.theatre, req.params.date);
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