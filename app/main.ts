import { AxiosPromise } from "../node_modules/axios/index";

const axios = require('axios');
const cheerio = require('cheerio');

const baseURL: string = 'https://www.amctheatres.com';

axios.defaults.baseURL = baseURL;

type DateFormat = string | number;

interface MovieTime {
    time: string;
    link: string;
};

interface Movie {
    title?: string;
    link?: string;
    times?: MovieTime[];
};

function formatDate(date: Date): DateFormat {
    let dd: DateFormat = date.getDate();
    dd = dd >= 10 ? dd : `0${dd}`
    let mm: DateFormat = date.getMonth() + 1;
    mm = mm >= 10 ? mm : `0${mm}`
    let yyyy: DateFormat = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}

let theatres: string[] = ['amc-lennox-town-center-24', 'amc-dublin-village-18']

function getMovieListings(theatre: string, date: Date = new Date()): Movie[] {
    let formattedDate: DateFormat = formatDate(date);
    let uri: string = `/movie-theatres/showtimes/all/${formattedDate}/${theatre}/all`;

    let movies: Movie[] = [];

    axios(uri)
        .then((response) => {
            console.log('Got html');

            const $ = cheerio.load(response.data);
            $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each((_: number, movieElem: CheerioElement) => {
                let movie: Movie = {};

                movie.title = $(movieElem).find('a.MovieTitleHeader-title > h2').text();
            
                movie.link = `${baseURL}${$(movieElem).find('a.MovieTitleHeader-title').attr('href')}`;
            
                let movieTimes: string[] = [];
                $(movieElem).find('div.Showtime a.Btn').each((i, e) => {
                    movieTimes.push($(e).text());
                });
            
                let movieTimeLinks: string[] = [];
                $(movieElem).find('div.Showtime a.Btn').each((i, e) => {
                    movieTimeLinks.push($(e).attr('href'));
                });
            
                movie.times = [];
                for (let i = 0; i < movieTimes.length; i++) {
                    movie.times.push({
                        time: movieTimes[i],
                        link: movieTimeLinks[i]
                    });
                };

                movies.push(movie);
            });
            return movies;
        })
        .catch((err) => {
            console.log("Error");
            return movies;
        });

}

console.log(getMovieListings(theatres[1]));
