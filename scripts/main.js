var axios = require('axios');
var cheerio = require('cheerio');
var baseURL = 'https://www.amctheatres.com';
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
var url = baseURL + "/movie-theatres/showtimes/all/" + date + "/" + theatres[1] + "/all";
var movies = [];
theatres: AxiosResponse = axios(url);
theatres.then(function (response) {
    var $ = cheerio.load(response.data);
    $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each(function (i, e) {
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
})["catch"](function (err) {
    console.log("Error");
});
