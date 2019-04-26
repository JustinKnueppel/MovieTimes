"use strict";
exports.__esModule = true;
var axios = require('axios');
var cheerio = require('cheerio');
var baseURL = 'https://www.amctheatres.com';
axios.defaults.baseURL = baseURL;
;
;
function formatDate(date) {
    var dd = date.getDate();
    dd = dd >= 10 ? dd : "0" + dd;
    var mm = date.getMonth() + 1;
    mm = mm >= 10 ? mm : "0" + mm;
    var yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
}
var theatres = ['amc-lennox-town-center-24', 'amc-dublin-village-18'];
function getMovieListings(theatre, date) {
    if (date === void 0) { date = new Date(); }
    var formattedDate = formatDate(date);
    var uri = "/movie-theatres/showtimes/all/" + formattedDate + "/" + theatre + "/all";
    var movies = [];
    axios(uri)
        .then(function (response) {
        console.log('Got html');
        var $ = cheerio.load(response.data);
        $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each(function (_, movieElem) {
            var movie = {};
            movie.title = $(movieElem).find('a.MovieTitleHeader-title > h2').text();
            movie.link = "" + baseURL + $(movieElem).find('a.MovieTitleHeader-title').attr('href');
            var movieTimes = [];
            $(movieElem).find('div.Showtime a.Btn').each(function (i, e) {
                movieTimes.push($(e).text());
            });
            var movieTimeLinks = [];
            $(movieElem).find('div.Showtime a.Btn').each(function (i, e) {
                movieTimeLinks.push($(e).attr('href'));
            });
            movie.times = [];
            for (var i = 0; i < movieTimes.length; i++) {
                movie.times.push({
                    time: movieTimes[i],
                    link: movieTimeLinks[i]
                });
            }
            ;
            movies.push(movie);
        });
    })["catch"](function (err) {
        console.log("Error");
    });
    return movies;
}
console.log(getMovieListings(theatres[1]));
