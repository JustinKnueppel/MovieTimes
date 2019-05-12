const axios = require('axios');
const cheerio = require('cheerio');

import db from './db';

const baseURL: string = 'https://www.amctheatres.com';

axios.defaults.baseURL = baseURL;

export interface MovieTime {
    time: string;
    link: string;
}

export interface Movie {
    title: string;
    link: string;
    times: MovieTime[];
}
/**
 * Return the movie listings for the given theatre and date.
 * @param theatre AMC unique theatre name.
 * @param date yyyy-mm-dd date.
 */
export async function getMovieListings(theatre: string, date: string) {
    // If listing is already in database do not retrieve again
    if (db.contains(theatre, date)) {
        return Promise.resolve(db.get(theatre, date));
    }
    // Scrape HTML to get the movie listings
    let uri: string = `/movie-theatres/showtimes/all/${date}/${theatre}/all`;

    let movies: Movie[] = [];

    try {
        let response = await axios(uri);

        const $ = cheerio.load(response.data);
        $('div[class="ShowtimesByTheatre-maincol-scroll"]')
            .find('div[class="ShowtimesByTheatre-film"]')
            .each((_: number, movieElem) => {
                let movie: Movie = {
                    title: '',
                    link: '',
                    times: []
                };

                movie.title = $(movieElem)
                    .find('a.MovieTitleHeader-title > h2')
                    .text();

                movie.link = `${baseURL}${$(movieElem)
                    .find('a.MovieTitleHeader-title')
                    .attr('href')}`;

                $(movieElem)
                    .find('div.Showtime a.Btn')
                    .each((i, e) => {
                        movie.times.push({
                            time: $(e).text(),
                            link: `${baseURL}${$(e).attr('href')}`
                        });
                    });

                movies.push(movie);
            });
    } catch (err) {
        console.log('Error');
    }
    // Update the database
    db.post(theatre, date, movies);
    return movies;
}

/**
 * Get AMC API information about the given theatre on the given date.
 * @param theatreID Unique AMC theatre ID.
 * @param date yyyy-mm-dd date.
 */
async function getTheatre(
    theatreID: number,
    date: string
) /*: Promise<Movie[]>*/ {
    const resp = await axios(
        `${baseURL}/v2/theatres/${theatreID}/showtimes/${date}`,
        { headers: { 'X-AMC-Vendor-Key': process.env.API_KEY } }
    );
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
// for (let theatre of [
//     'amc-columbus-10',
//     'amc-dublin-village-18',
//     'amc-lennox-town-center-24'
// ]) {
//     getMovieListings(theatre, '2019-05-12')
//         .then(movieListings => {
//             console.log(`Retrieved data for ${theatre}`);
//         })
//         .catch(e => {
//             console.log('Error retrieving promise');
//         });
// }
