const axios = require('axios');
const cheerio = require('cheerio')

const date = '2019-04-17';
const url = `https://www.amctheatres.com/movie-theatres/showtimes/all/${date}/amc-lennox-town-center-24/all`;

axios.get(url)
    .then((response) => {
        console.log(response.data);
    })
    .catch((err) => {
        console.log(err);
    });
