interface Theatre {
    id: string;
    name: string;
}

interface MovieInfo {
    title: string;
    link: string;
    times: Array<{
        time: string;
        link: string;
    }>;
}

interface Showtime {
    title: string;
    movieLink: string;
    showtime: string;
    showtimeLink: string;
    theatre: string;
    sortTime: number;
}

interface TheatresData {
    [theatre: string]: MovieInfo[];
}

type DateFormat = string | number;

type ampm = 'am' | 'pm';

let AMCtheatres: Array<Theatre> = [
    { id: 'amc-lennox-town-center-24', name: 'AMC Lennox' },
    { id: 'amc-dublin-village-18', name: 'AMC Dublin Village' },
    { id: 'amc-columbus-10', name: 'AMC Hilliard' }
];

/**
 * Format a date object into a yyyy-mm-dd date string.
 * @param date Date to be formatted.
 */
function formatDate(date: Date): DateFormat {
    let dd: DateFormat = date.getDate();
    dd = dd >= 10 ? dd : `0${dd}`;
    let mm: DateFormat = date.getMonth() + 1;
    mm = mm >= 10 ? mm : `0${mm}`;
    let yyyy: DateFormat = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}

/**
 * Display theatre options to the user.
 */
function loadTheatreOptions() {
    let options = document.querySelector('#theatre-options ul');

    for (let theatre of AMCtheatres) {
        let li = document.createElement('li');

        let node = document.createElement('input');
        node.setAttribute('type', 'checkbox');
        node.setAttribute('value', theatre['id']);
        node.setAttribute('name', theatre['name']);
        node.checked = true;

        li.appendChild(node);

        li.append(theatre['name']);

        options.appendChild(li);
    }
}

/**
 * Return the current hour in 12 hour format along with an am/pm indicator.
 */
function getCurrentHour(): [number, ampm] {
    let date = new Date();
    let hour = date.getHours();

    let ampm: ampm = hour <= 11 ? 'am' : 'pm';

    if (hour > 12) {
        hour -= 12;
    }

    return [hour, ampm];
}

/**
 * Display time filtering options.
 */
function loadTimeOptions() {
    let [currentHour, ampm] = getCurrentHour();

    // Generate values for the start times.
    let startTime = document.getElementById('time-start');

    let startHours = startTime.querySelector('select[name="hours"]');

    for (let i = 1; i <= 12; i++) {
        let hour = document.createElement('option');
        hour.setAttribute('value', i.toString());
        if (i === currentHour) {
            hour.setAttribute('selected', 'selected');
        }
        hour.innerText = i.toString();
        startHours.appendChild(hour);
    }

    let startMinutes = startTime.querySelector(
        'select[name="minutes"]'
    );

    for (let i of [0, 15, 30, 45, 59]) {
        let minute = document.createElement('option');
        minute.setAttribute('value', i.toString());
        minute.innerText = i.toString();
        startMinutes.appendChild(minute);
    }

    startTime
        .querySelector(
            `select[name="ampm"] option[value="${ampm}"]`
        )
        .setAttribute('selected', 'selected');

    // Generate values for the end times.
    let endTime = document.getElementById('time-end');

    let endHours = endTime.querySelector('select[name="hours"]');

    for (let i = 1; i <= 12; i++) {
        let hour = document.createElement('option');
        hour.setAttribute('value', i.toString());
        if (i === 11) {
            hour.setAttribute('selected', 'selected');
        }
        hour.innerText = i.toString();
        endHours.appendChild(hour);
    }

    let endMinutes = endTime.querySelector('select[name="minutes"]');

    for (let i of [0, 15, 30, 45, 59]) {
        let minute = document.createElement('option');
        minute.setAttribute('value', i.toString());
        if (i === 59) {
            minute.setAttribute('selected', 'selected');
        }
        minute.innerText = i.toString();
        endMinutes.appendChild(minute);
    }
}

/**
 * Return the theatre info for the given theatre and date.
 * @param date Date of movie info to get.
 * @param theatre Unique name for theatre.
 */
function getTheatreInfo(date: Date, theatre: string): Array<MovieInfo> {
    //TODO: Access backend to get real data
    let theatreinfo: TheatresData = {
        "amc-columbus-10": [{"title":"Avengers: Endgame","link":"https://www.amctheatres.com/movies/avengers-endgame-45840","times":[{"time":"11:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611889"},{"time":"1:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611921"},{"time":"3:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611890"},{"time":"7:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611891"},{"time":"11:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611892"},{"time":"9:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611923"},{"time":"9:30am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654810"},{"time":"10:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611908"},{"time":"12:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611882"},{"time":"2:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611909"},{"time":"4:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611881"},{"time":"5:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611920"},{"time":"6:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611910"},{"time":"8:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611880"},{"time":"9:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611922"},{"time":"10:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/78611911"},{"time":"10:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654809"}]},{"title":"The Intruder","link":"https://www.amctheatres.com/movies/the-intruder-58583","times":[{"time":"10:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654791"},{"time":"12:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654829"},{"time":"2:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654828"},{"time":"5:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654827"},{"time":"7:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654826"},{"time":"9:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654792"}]},{"title":"Long Shot","link":"https://www.amctheatres.com/movies/long-shot-55152","times":[{"time":"1:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654808"},{"time":"4:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654807"},{"time":"7:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654806"},{"time":"10:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654825"}]},{"title":"Uglydolls","link":"https://www.amctheatres.com/movies/uglydolls-53489","times":[{"time":"10:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654843"},{"time":"12:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192927"},{"time":"2:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192928"},{"time":"4:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192929"},{"time":"7:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192931"},{"time":"9:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79192930"}]},{"title":"Captain Marvel","link":"https://www.amctheatres.com/movies/captain-marvel-45838","times":[{"time":"9:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654857"},{"time":"12:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654839"},{"time":"3:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654842"},{"time":"6:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654841"},{"time":"9:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654840"}]},{"title":"Breakthrough","link":"https://www.amctheatres.com/movies/breakthrough-56739","times":[{"time":"9:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654783"},{"time":"12:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654795"},{"time":"3:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654794"},{"time":"6:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654793"}]},{"title":"The Curse Of La Llorona","link":"https://www.amctheatres.com/movies/the-curse-of-la-llorona-56506","times":[{"time":"2:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654859"},{"time":"10:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654858"}]},{"title":"Shazam!","link":"https://www.amctheatres.com/movies/shazam-46015","times":[{"time":"9:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654824"},{"time":"11:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654862"},{"time":"4:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654861"},{"time":"7:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-columbus-10/all/79654860"}]}],
        "amc-dublin-village-18": [{"title":"Avengers: Endgame","link":"https://www.amctheatres.com/movies/avengers-endgame-45840","times":[{"time":"10:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661704"},{"time":"11:30am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661958"},{"time":"12:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79332370"},{"time":"2:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78564689"},{"time":"3:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661957"},{"time":"4:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79332371"},{"time":"6:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78564688"},{"time":"7:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661956"},{"time":"8:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79332372"},{"time":"10:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78564687"},{"time":"11:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661955"},{"time":"10:30am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661727"},{"time":"11:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78564646"},{"time":"12:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661805"},{"time":"1:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661759"},{"time":"1:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661694"},{"time":"2:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661726"},{"time":"3:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78564645"},{"time":"4:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661804"},{"time":"5:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661758"},{"time":"5:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661693"},{"time":"6:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661725"},{"time":"7:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78564644"},{"time":"8:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661803"},{"time":"9:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661757"},{"time":"9:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661692"},{"time":"10:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661724"},{"time":"11:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661701"}]},{"title":"The Intruder","link":"https://www.amctheatres.com/movies/the-intruder-58583","times":[{"time":"11:35am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78953201"},{"time":"2:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78953200"},{"time":"4:35pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78953199"},{"time":"7:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78953197"},{"time":"9:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/78953198"}]},{"title":"Long Shot","link":"https://www.amctheatres.com/movies/long-shot-55152","times":[{"time":"10:45am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661705"},{"time":"1:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79176623"},{"time":"4:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79176624"},{"time":"7:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79176626"},{"time":"8:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661884"},{"time":"9:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661811"},{"time":"10:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79176625"},{"time":"11:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661883"}]},{"title":"Uglydolls","link":"https://www.amctheatres.com/movies/uglydolls-53489","times":[{"time":"10:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661806"},{"time":"11:30am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79177816"},{"time":"1:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79177817"},{"time":"4:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79177818"},{"time":"6:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79177820"},{"time":"9:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79177819"}]},{"title":"Captain Marvel","link":"https://www.amctheatres.com/movies/captain-marvel-45838","times":[{"time":"10:05am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661938"},{"time":"1:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661917"},{"time":"4:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661941"},{"time":"7:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661940"},{"time":"9:55pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661939"}]},{"title":"Breakthrough","link":"https://www.amctheatres.com/movies/breakthrough-56739","times":[{"time":"10:20am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661760"},{"time":"1:55pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661788"},{"time":"4:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661765"},{"time":"7:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661789"},{"time":"9:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661895"}]},{"title":"The Curse Of La Llorona","link":"https://www.amctheatres.com/movies/the-curse-of-la-llorona-56506","times":[{"time":"2:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661916"},{"time":"7:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661915"},{"time":"11:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661709"}]},{"title":"Shazam!","link":"https://www.amctheatres.com/movies/shazam-46015","times":[{"time":"10:10am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661985"},{"time":"1:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661984"},{"time":"4:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661983"},{"time":"7:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661982"},{"time":"10:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661981"}]},{"title":"Little","link":"https://www.amctheatres.com/movies/little-56470","times":[{"time":"12:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661887"},{"time":"2:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661886"},{"time":"5:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661885"}]},{"title":"Dumbo","link":"https://www.amctheatres.com/movies/dumbo-49543","times":[{"time":"10:40am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661860"},{"time":"1:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661859"},{"time":"4:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661858"},{"time":"6:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661857"}]},{"title":"Pet Sematary","link":"https://www.amctheatres.com/movies/pet-sematary-55746","times":[{"time":"11:45am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661913"},{"time":"4:35pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661914"}]},{"title":"Us","link":"https://www.amctheatres.com/movies/us-2019-53983","times":[{"time":"11:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661787"},{"time":"10:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661786"}]},{"title":"Penguins (Disneynature)","link":"https://www.amctheatres.com/movies/penguins-disneynature-56468","times":[{"time":"10:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661888"}]},{"title":"Missing Link","link":"https://www.amctheatres.com/movies/missing-link-57538","times":[{"time":"11:05am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661695"}]},{"title":"Bolden","link":"https://www.amctheatres.com/movies/bolden-59334","times":[{"time":"10:35am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661856"},{"time":"1:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661855"},{"time":"3:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661854"},{"time":"6:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661853"},{"time":"9:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-dublin-village-18/all/79661852"}]}],
        "amc-lennox-town-center-24": [{"title":"Avengers: Endgame","link":"https://www.amctheatres.com/movies/avengers-endgame-45840","times":[{"time":"10:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726339"},{"time":"2:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726340"},{"time":"6:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726341"},{"time":"9:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726342"},{"time":"3:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726338"},{"time":"11:20am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726335"},{"time":"7:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726336"},{"time":"10:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726337"},{"time":"10:25am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726395"},{"time":"12:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726425"},{"time":"2:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726396"},{"time":"4:35pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726426"},{"time":"8:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726427"},{"time":"10:45am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726193"},{"time":"11:50am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726205"},{"time":"12:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726428"},{"time":"1:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726445"},{"time":"1:35pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726228"},{"time":"2:35pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726194"},{"time":"3:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726206"},{"time":"4:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726429"},{"time":"4:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726446"},{"time":"5:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726229"},{"time":"6:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726195"},{"time":"7:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726364"},{"time":"7:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726316"},{"time":"8:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726430"},{"time":"8:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726447"},{"time":"9:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726207"},{"time":"10:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726196"},{"time":"10:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726404"}]},{"title":"The Intruder","link":"https://www.amctheatres.com/movies/the-intruder-58583","times":[{"time":"11:05am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78953986"},{"time":"1:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78953985"},{"time":"4:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78953984"},{"time":"6:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78953982"},{"time":"9:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78953983"}]},{"title":"Long Shot","link":"https://www.amctheatres.com/movies/long-shot-55152","times":[{"time":"10:30am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79118978"},{"time":"1:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79118979"},{"time":"4:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79118980"},{"time":"6:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726397"},{"time":"7:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79118982"},{"time":"8:55pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726398"},{"time":"10:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79118981"}]},{"title":"Uglydolls","link":"https://www.amctheatres.com/movies/uglydolls-53489","times":[{"time":"11:00am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79119598"},{"time":"1:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79119599"},{"time":"3:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79119600"},{"time":"6:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79119602"},{"time":"8:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79119601"}]},{"title":"Captain Marvel","link":"https://www.amctheatres.com/movies/captain-marvel-45838","times":[{"time":"10:20am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726281"},{"time":"1:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726282"},{"time":"4:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726283"},{"time":"7:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726284"},{"time":"10:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726285"}]},{"title":"Breakthrough","link":"https://www.amctheatres.com/movies/breakthrough-56739","times":[{"time":"10:35am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726390"},{"time":"1:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726391"},{"time":"4:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726392"},{"time":"7:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726393"},{"time":"10:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726394"}]},{"title":"The Curse Of La Llorona","link":"https://www.amctheatres.com/movies/the-curse-of-la-llorona-56506","times":[{"time":"10:55am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726297"},{"time":"1:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726298"},{"time":"3:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726299"},{"time":"6:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726300"},{"time":"8:30pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726301"},{"time":"10:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726302"}]},{"title":"Shazam!","link":"https://www.amctheatres.com/movies/shazam-46015","times":[{"time":"10:25am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726226"},{"time":"6:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726208"},{"time":"9:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726227"}]},{"title":"Little","link":"https://www.amctheatres.com/movies/little-56470","times":[{"time":"6:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726368"},{"time":"9:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726369"}]},{"title":"Dumbo","link":"https://www.amctheatres.com/movies/dumbo-49543","times":[{"time":"10:30am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726361"},{"time":"1:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726362"},{"time":"4:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726363"}]},{"title":"Us","link":"https://www.amctheatres.com/movies/us-2019-53983","times":[{"time":"10:35am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726239"},{"time":"1:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726240"},{"time":"4:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726241"},{"time":"7:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726242"},{"time":"9:55pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726243"}]},{"title":"Penguins (Disneynature)","link":"https://www.amctheatres.com/movies/penguins-disneynature-56468","times":[{"time":"10:45am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726268"}]},{"title":"Missing Link","link":"https://www.amctheatres.com/movies/missing-link-57538","times":[{"time":"10:55am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726209"},{"time":"1:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726210"},{"time":"3:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726211"}]},{"title":"Bolden","link":"https://www.amctheatres.com/movies/bolden-59334","times":[{"time":"11:15am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726253"},{"time":"1:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726254"},{"time":"4:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726255"},{"time":"6:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726256"},{"time":"9:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726257"},{"time":"10:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726330"}]},{"title":"Chicano, El","link":"https://www.amctheatres.com/movies/chicano-el-59189","times":[{"time":"11:10am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726405"},{"time":"1:55pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726406"},{"time":"4:40pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726407"},{"time":"7:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726408"},{"time":"9:55pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726409"}]},{"title":"Batman (1989) 30th Anniversary","link":"https://www.amctheatres.com/movies/batman-1989-30th-anniversary-60054","times":[{"time":"1:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78341869"},{"time":"4:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78341868"}]},{"title":"Canelo vs. Jacobs","link":"https://www.amctheatres.com/movies/canelo-vs-jacobs-59807","times":[{"time":"9:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78341870"}]},{"title":"Five Feet Apart","link":"https://www.amctheatres.com/movies/five-feet-apart-57359","times":[{"time":"7:05pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726269"},{"time":"9:50pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726270"}]},{"title":"Wonder Park","link":"https://www.amctheatres.com/movies/wonder-park-49764","times":[{"time":"11:45am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726365"},{"time":"2:00pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726366"},{"time":"4:25pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726367"}]},{"title":"After","link":"https://www.amctheatres.com/movies/after-57753","times":[{"time":"11:45am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726313"},{"time":"2:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726314"},{"time":"5:15pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726315"}]},{"title":"How To Train Your Dragon: The Hidden World","link":"https://www.amctheatres.com/movies/how-to-train-your-dragon-the-hidden-world-41288","times":[{"time":"10:20am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726448"},{"time":"11:40am","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726325"},{"time":"2:10pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/79726326"}]},{"title":"Hesburgh","link":"https://www.amctheatres.com/movies/hesburgh-60150","times":[{"time":"4:45pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78388882"},{"time":"7:20pm","link":"/movie-theatres/showtimes/all/2019-05-03/amc-lennox-town-center-24/all/78388881"}]}]
    }
    return theatreinfo[theatre];
}
/**
 * Retrieve the stored JSON for all theatres for today.
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
 * Load a row into the movie table representing the showtime.
 * @param showtime Showtime information.
 */
function loadShowtime(showtime: Showtime): HTMLElement {
    let tr = document.createElement('tr');

    let td = document.createElement('td');
    let time = document.createElement('a');
    time.setAttribute('href', showtime.showtimeLink);
    time.innerText = showtime.showtime;
    td.appendChild(time);
    tr.appendChild(td);

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
function filterData(
    theatreIDs: string[],
    startTime: Date,
    endTime: Date
): TheatresData {
    let filterData: TheatresData = {};

    for (let theatre of Object.keys(ALL_DATA)) {
        // Filter for theatre
        if (theatreIDs.indexOf(theatre) >= 0) {
            filterData[theatre] = ALL_DATA[theatre];
            // Filter for time
            for (let movie of filterData[theatre]) {
                movie.times = movie.times.filter(timeObj => {
                    let time: Date = timeToDate(timeObj.time);
                    return time >= startTime && time <= endTime;
                });
            }
        }
    }

    return filterData;
}
/**
 * Load in showtimes in chronological order.
 */
function loadData(theatresData: TheatresData) {
    // Remove old data
    let table = document.getElementById('movie-table');

    for (let tr of document.querySelectorAll(
        '#movie-table > tr:not([table-headers])'
    )) {
        table.removeChild(tr);
    }

    // Load new data
    let showtimes: Showtime[] = [];

    for (let theatre of AMCtheatres) {
        if (theatresData[theatre.id]) {
            showtimes.push(
                ...getShowtimes(theatre.name, theatresData[theatre.id])
            );
        }
    }

    loadShowtimes(
        showtimes.sort((s1, s2) => {
            return s1.sortTime - s2.sortTime;
        })
    );
}

/**
 * Once DOM has loaded, load in data.
 */
window.onload = () => {
    // Populate filter options.
    loadTheatreOptions();
    loadTimeOptions();

    loadData(ALL_DATA);
};
