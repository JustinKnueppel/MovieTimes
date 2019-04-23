const axios = require('axios');
const cheerio = require('cheerio')

const baseURL = 'https://www.amctheatres.com';

formatDate = function(date) {
    dd = date.getDate();
    dd = dd >= 10 ? dd : `0${dd}`
    mm = date.getMonth() + 1;
    mm = mm >= 10 ? mm : `0${mm}`
    yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
    // "X-AMC-Vendor-Key": info['api-key'],
}


const date = formatDate(new Date());
let theatres = ['amc-lennox-town-center-24', 'amc-dublin-village-18']
let url = `${baseURL}/movie-theatres/showtimes/all/${date}/${theatres[1]}/all`;

let movies = [];

theatres = axios(url);
theatres.then((response) => {
    const $ = cheerio.load(response.data);
    $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each((i, e) => {
        movies.push($(e));
    });
    let movieTitle = $(movies[0]).find('a.MovieTitleHeader-title > h2').text();
    console.log(movieTitle);
    let movieLink = `${baseURL}${$(movies[0]).find('a.MovieTitleHeader-title').attr('href')}`;
    console.log(movieLink);
    let movieTimes = [];
    $(movies[0]).find('div.Showtime a.Btn').each((i, e) => {
        movieTimes.push($(e).text());
    });
    console.log(movieTimes);
    let movieTimeLinks = []
    $(movies[0]).find('div.Showtime a.Btn').each((i, e) => {
        movieTimeLinks.push($(e).attr('href'));
    });
    console.log(movieTimeLinks);

})
.catch((err) => {
    console.log("Error");
});



