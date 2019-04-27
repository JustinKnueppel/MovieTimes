const axios = require('axios');
const cheerio = require('cheerio');

const baseURL: string = 'https://www.amctheatres.com';

axios.defaults.baseURL = baseURL;

export interface MovieTime {
    time: string;
    link: string;
};

export interface Movie {
    title: string;
    link: string;
    times: MovieTime[];
};

let theatres: string[] = ['amc-lennox-town-center-24', 'amc-dublin-village-18']

export async function getMovieListings(theatre: string, date: string): Promise<Movie[]> {
    let uri: string = `/movie-theatres/showtimes/all/${date}/${theatre}/all`;

    let movies: Movie[] = [];

    try {
        let response = await axios(uri);

        const $ = cheerio.load(response.data);
        $('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each((_: number, movieElem) => {
            let movie: Movie = {
                title: "",
                link: "",
                times: []
            };

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
    } catch (err)  {
        console.log("Error");

    };
    return movies;
}

// getMovieListings(theatres[1]).then((movieListings) => {
//     console.log(JSON.stringify(movieListings));
// })
// .catch((e) => {
//     console.log("Error retrieving promise");
// });
