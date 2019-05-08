const axios = require('axios');
const cheerio = require('cheerio');
import db from './db';
const baseURL = 'https://www.amctheatres.com';
axios.defaults.baseURL = baseURL;
;
;
/**
 * Return the movie listings for the given theatre and date.
 * @param theatre AMC unique theatre name.
 * @param date yyyy-mm-dd date.
 */
export async function getMovieListings(theatre, date) {
    // If listing is already in database do not retrieve again
    if (db.contains(theatre, date)) {
        return Promise.resolve(db.get(theatre, date));
    }
    // Scrape HTML to get the movie listings
    let uri = `/movie-theatres/showtimes/all/${date}/${theatre}/all`;
    let movies = [];
    try {
        let response = await axios(uri);
        const $ = cheerio.load(response.data);
        $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each((_, movieElem) => {
            let movie = {
                title: "",
                link: "",
                times: []
            };
            movie.title = $(movieElem).find('a.MovieTitleHeader-title > h2').text();
            movie.link = `${baseURL}${$(movieElem).find('a.MovieTitleHeader-title').attr('href')}`;
            let movieTimes = [];
            $(movieElem).find('div.Showtime a.Btn').each((i, e) => {
                movieTimes.push($(e).text());
            });
            let movieTimeLinks = [];
            $(movieElem).find('div.Showtime a.Btn').each((i, e) => {
                movieTimeLinks.push($(e).attr('href'));
            });
            movie.times = [];
            for (let i = 0; i < movieTimes.length; i++) {
                movie.times.push({
                    time: movieTimes[i],
                    link: movieTimeLinks[i]
                });
            }
            ;
            movies.push(movie);
        });
    }
    catch (err) {
        console.log("Error");
    }
    ;
    // Update the database
    db.post(theatre, date, movies);
    return movies;
}
/**
 * Get AMC API information about the given theatre on the given date.
 * @param theatreID Unique AMC theatre ID.
 * @param date yyyy-mm-dd date.
 */
async function getTheatre(theatreID, date) {
    const resp = await axios(`${baseURL}/v2/theatres/${theatreID}/showtimes/${date}`, { headers: { 'X-AMC-Vendor-Key': process.env.API_KEY } });
    return resp;
}
// Test API
// getTheatre(377, '2019-05-01')
//     .then((resp) => {
//         console.log(resp.data._embedded.showtimes[0]);
//     })
//     .catch((err) => {
//         console.log('Error occurred in amcMovies');
//     });
// Test database
// getMovieListings('amc-columbus-10', '2019-05-03').then((movieListings) => {
//     console.log(JSON.stringify(movieListings));
// })
// .catch((e) => {
//     console.log("Error retrieving promise");
// });
