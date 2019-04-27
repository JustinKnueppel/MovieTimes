import {Movie} from '../app/amcMovies';

const baseURL: string = 'localhost'
const port = process.env.PORT || 8000;

type DateFormat = string | number;

function formatDate(date: Date): DateFormat {
    let dd: DateFormat = date.getDate();
    dd = dd >= 10 ? dd : `0${dd}`
    let mm: DateFormat = date.getMonth() + 1;
    mm = mm >= 10 ? mm : `0${mm}`
    let yyyy: DateFormat = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`
}

async function getAMC(theatre: string, date: Date = new Date()) {
    let formattedDate: DateFormat = formatDate(date);

    const url: string = `${baseURL}:${port}/amc?theatre=${theatre}&date=${formattedDate}`;

    let movieInfo;
    
    try {
        console.log(`Pinging URL ${url}`);
        const response = await fetch(url);
        movieInfo = response.json();
    } catch (err) {
        console.log('Error occurred fetching API');
    }
    return movieInfo;
}

getAMC('amc-dublin-village-18')
    .then((movies) => {
        console.log(JSON.stringify(movies));
    })
    .catch((err) => {
        console.log("An error occurred resolving promise");
    });