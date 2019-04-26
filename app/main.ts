import { AxiosPromise } from "../node_modules/axios/index";

const axios = require('axios');
const cheerio = require('cheerio')

const baseURL: string = 'https://www.amctheatres.com';

// axios.defaults.baseURL = baseURL;

interface MovieTime {
    time: string;
    link: string;
};
interface Movie {
    title: string;
    link: string;
    times: MovieTime[];
};

let formatDate = function(date: Date): string {
    let dd: any = date.getDate();
    dd = dd >= 10 ? dd : `0${dd}`
    let mm: any = date.getMonth() + 1;
    mm = mm >= 10 ? mm : `0${mm}`
    let yyyy: number = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}


const date: string = formatDate(new Date());
let theatres: string[] = ['amc-lennox-town-center-24', 'amc-dublin-village-18']
let uri: string = `/movie-theatres/showtimes/all/${date}/${theatres[1]}/all`;

let url: string = `${baseURL}${uri}`;

let movies = [];

let request: AxiosPromise = axios(url);
request.then((response) => {
    console.log('Got html');
    const $ = cheerio.load(response.data);
    $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each((_: number, e: CheerioElement) => {
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

    let times: MovieTime[] = [];
    for (let i = 0; i < movieTimes.length; i++) {
        times.push({
            time: movieTimes[i],
            link: movieTimeLinks[i]
        });
        console.log(`Pushed ${movieTimes[i]}`);
    };
    let movie: Movie = {
        title: movieTitle,
        link: movieLink,
        times: times
    };
    console.log(movie);

})
.catch((err) => {
    console.log("Error");
});



