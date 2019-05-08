interface Theatre {
    id: string,
    name: string
}

interface MovieInfo {
    title: string,
    link: string,
    times: Array<{
        time: string;
        link: string;
    }>
}

interface Showtime {
    title: string,
    movieLink: string,
    showtime: string,
    showtimeLink: string,
    theatre: string,
    sortTime: number
}

interface TheatresData {
    [theatre: string]: MovieInfo[]
}

let AMCtheatres: Array<Theatre> = [{id: 'amc-lennox-town-center-24', name: 'AMC Lennox'}, {id: 'amc-dublin-village-18', name: 'AMC Dublin Village'}, {id: 'amc-columbus-10', name: 'AMC Hilliard'}];

/**
 * Return the theatre info for the given theatre and date.
 * @param date Date of movie info to get.
 * @param theatre Unique name for theatre.
 */
function getTheatreInfo(date: Date, theatre: string): Array<MovieInfo> {
    //TODO: Access backend to get real data
    return [{"title":"Avengers: Endgame","link":"https://www.amctheatres.com/movies/avengers-endgame-45840","times":[{"time":"11:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611889"},{"time":"1:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611921"},{"time":"3:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611890"},{"time":"7:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611891"},{"time":"11:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611892"},{"time":"9:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611923"},{"time":"9:30am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654810"},{"time":"10:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611908"},{"time":"12:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611882"},{"time":"2:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611909"},{"time":"4:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611881"},{"time":"5:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611920"},{"time":"6:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611910"},{"time":"8:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611880"},{"time":"9:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611922"},{"time":"10:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611911"},{"time":"10:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654809"}]},{"title":"The Intruder","link":"https://www.amctheatres.com/movies/the-intruder-58583","times":[{"time":"10:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654791"},{"time":"12:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654829"},{"time":"2:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654828"},{"time":"5:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654827"},{"time":"7:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654826"},{"time":"9:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654792"}]},{"title":"Long Shot","link":"https://www.amctheatres.com/movies/long-shot-55152","times":[{"time":"1:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654808"},{"time":"4:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654807"},{"time":"7:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654806"},{"time":"10:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654825"}]},{"title":"Uglydolls","link":"https://www.amctheatres.com/movies/uglydolls-53489","times":[{"time":"10:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654843"},{"time":"12:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192927"},{"time":"2:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192928"},{"time":"4:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192929"},{"time":"7:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192931"},{"time":"9:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192930"}]},{"title":"Captain Marvel","link":"https://www.amctheatres.com/movies/captain-marvel-45838","times":[{"time":"9:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654857"},{"time":"12:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654839"},{"time":"3:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654842"},{"time":"6:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654841"},{"time":"9:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654840"}]},{"title":"Breakthrough","link":"https://www.amctheatres.com/movies/breakthrough-56739","times":[{"time":"9:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654783"},{"time":"12:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654795"},{"time":"3:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654794"},{"time":"6:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654793"}]},{"title":"The Curse Of La Llorona","link":"https://www.amctheatres.com/movies/the-curse-of-la-llorona-56506","times":[{"time":"2:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654859"},{"time":"10:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654858"}]},{"title":"Shazam!","link":"https://www.amctheatres.com/movies/shazam-46015","times":[{"time":"9:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654824"},{"time":"11:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654862"},{"time":"4:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654861"},{"time":"7:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654860"}]}];
}
/**
 * Retrieve the stored JSON for the given theatre.
 * @param theatre Unique name for the theatre.
 */
function getData(): TheatresData {
    let data: TheatresData = {};
    for (let theatre of AMCtheatres) {
        data[theatre.id] = getTheatreInfo(new Date(), theatre.id);
    }

    return data;
}

/**
 * Convert a time string into a date object.
 * @param time hh:mm[am/pm] time string.
 */
function timeToDate(time: string): Date {
    let regex = /(\d{1,2}):(\d{1,2})(am|pm)/;
    let match = regex.exec(time);

    let hour = parseInt(match[1]);
    if (match[3] === 'pm' && hour !== 12) {
        hour += 12;
    }
    if (match[3] === 'am' && hour === 12) {
        hour = 0;
    }
    let minute = parseInt(match[2]);

    let date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

/**
 * Convert theatre information into a list of showtimes.
 * @param theatre Unique theatre name.
 * @param theatreInfo Information about movie showtimes at a given theatre.
 */
function getShowtimes(theatre: string, theatreInfo: MovieInfo[]): Showtime[] {
    let showtimes: Showtime[] = [];

    for (let movie of theatreInfo) {
        for (let showtime of movie.times) {
            showtimes.push({
                title: movie.title,
                movieLink: movie.link,
                showtime: showtime.time,
                showtimeLink: showtime.link,
                theatre: theatre,
                sortTime: timeToDate(showtime.time).getTime()
            });
        }
    }

    return showtimes;
}

/**
 * Return a DOM object representing the showtime.
 * @param showtime Showtime information.
 */
function loadShowtime(showtime: Showtime): HTMLElement {
    let tr = document.createElement('tr');

    let td = document.createElement('td');
    let time = document.createElement('a');
    time.setAttribute('href', showtime.showtimeLink);
    time.innerText = showtime.showtime;
    td.appendChild(time);
    tr.appendChild(td)
    
    td = document.createElement('td');
    let movie = document.createElement('a');
    movie.setAttribute('href', showtime.movieLink);
    movie.innerText = showtime.title;
    td.appendChild(movie);
    tr.appendChild(td);

    td = document.createElement('td');
    let theatre = document.createElement('a');
    //TODO: Add theatre links
    theatre.setAttribute('href', '#');
    theatre.innerText = showtime.theatre;
    td.appendChild(theatre);
    tr.appendChild(td);

    return tr;
}

/**
 * Add showtimes given to the movie table.
 * @param showtimes List of showtimes to be added to table.
 */
function loadShowtimes(showtimes: Showtime[]) {
    let movieTable = document.getElementById('movie-table');

    for (let showtime of showtimes) {
        movieTable.appendChild(loadShowtime(showtime));
    }
}

/*
 * Load all data first, filter later.
 */
const ALL_DATA: TheatresData = getData();

/*
 * Filter all data by given constraints.
 */
function filterDataByTheatre(theatreIDs: string[]/*, startTime: Date, endTime: Date*/): TheatresData {
    let filterData = ALL_DATA;

    for (let theatre of Object.keys(filterData)) {
        if (theatreIDs.indexOf(theatre) < 0) {
            delete filterData[theatre];
        }
    }

    return filterData;
}
/**
 * Load in showtimes in chronological order.
 */
function loadData(theatresData: TheatresData) {

    let showtimes: Showtime[] = [];

    for (let theatre of AMCtheatres) {
        if (theatresData[theatre.id]) {
            showtimes.push(...getShowtimes(theatre.name, theatresData[theatre.id]));
        }
    }


    loadShowtimes(showtimes.sort((s1, s2) => {
        return s1.sortTime - s2.sortTime;
    }));
}

/**
 * Once DOM has loaded, load in data.
 */
window.onload = () => {
    let startTime = new Date();
    startTime.setHours(0);
    startTime.setMinutes(0);
    startTime.setMilliseconds(0);

    let endTime = new Date();
    endTime.setHours(23);
    endTime.setMinutes(59);
    endTime.setMilliseconds(0);

    loadData(ALL_DATA);
}
