"use strict";
exports.__esModule = true;
var axios = require('axios');
var cheerio = require('cheerio');
var baseURL = 'https://www.amctheatres.com';
;
;
var formatDate = function (date) {
    var dd = date.getDate();
    dd = dd >= 10 ? dd : "0" + dd;
    var mm = date.getMonth() + 1;
    mm = mm >= 10 ? mm : "0" + mm;
    var yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
};
var date = formatDate(new Date());
var theatres = ['amc-lennox-town-center-24', 'amc-dublin-village-18'];
var uri = "/movie-theatres/showtimes/all/" + date + "/" + theatres[1] + "/all";
var url = "" + baseURL + uri;
var movies = [];
var request = axios(url);
request.then(function (response) {
    console.log('Got html');
    var $ = cheerio.load(response.data);
    $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each(function (_, e) {
        movies.push($(e));
    });
    var movieTitle = $(movies[0]).find('a.MovieTitleHeader-title > h2').text();
    console.log(movieTitle);
    var movieLink = "" + baseURL + $(movies[0]).find('a.MovieTitleHeader-title').attr('href');
    console.log(movieLink);
    var movieTimes = [];
    $(movies[0]).find('div.Showtime a.Btn').each(function (i, e) {
        movieTimes.push($(e).text());
    });
    console.log(movieTimes);
    var movieTimeLinks = [];
    $(movies[0]).find('div.Showtime a.Btn').each(function (i, e) {
        movieTimeLinks.push($(e).attr('href'));
    });
    console.log(movieTimeLinks);
    var times = [];
    for (var i = 0; i < movieTimes.length; i++) {
        times.push({
            time: movieTimes[i],
            link: movieTimeLinks[i]
        });
        console.log("Pushed " + movieTimes[i]);
    }
    ;
    var movie = {
        title: movieTitle,
        link: movieLink,
        times: times
    };
    console.log(movie);
})["catch"](function (err) {
    console.log("Error");
});
