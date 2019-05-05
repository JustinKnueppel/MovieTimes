import {getMovieListings} from '../../Backend/app/amcMovies';

const baseURL: string = 'localhost'
const port = 8000;

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
    //testing purposes until looking further into date api
    formattedDate = '2019-05-03';

    return await getMovieListings(theatre, formattedDate);

    //End testing

    const url: string = `${baseURL}:${port}/amc?theatre=${theatre}&date=${formattedDate}`;

    let movieInfo;
    
    try {
        console.log(`Pinging URL ${url}`);
        let config = {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        const response = await fetch(url, config);
        movieInfo = response.json();
    } catch (err) {
        console.log('Error occurred fetching API');
        console.log(err);
    }
    return movieInfo;
}

async function getAMCOffline(theatre: string, date: Date = new Date()) {
    let formattedDate: DateFormat = formatDate(date);
}

export const AMCtheatres: string[] = ['amc-lennox-town-center-24', 'amc-dublin-village-18', 'amc-columbus-10']

getAMC(AMCtheatres[1])
    .then((movies) => {
        console.log(JSON.stringify(movies));
    })
    .catch((err) => {
        console.log("An error occurred resolving promise");
    });