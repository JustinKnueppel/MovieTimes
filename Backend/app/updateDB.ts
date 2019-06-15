import { getMovieListings } from './amcMovies';
import {db}  from './db';
type DateFormat = string | number;

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
 * Remove all data occurring before today.
 */
async function removeOldData() {
    try {
        let dates = await db.getDates();

        dates.forEach(doc => {
            if (isOld(doc.id)) {
                db.delete(doc.id);
            }
        });
    } catch {
        console.log('Error gettings dates');
    }
}

/**
 * Removes old data and adds new data to the database.
 */
async function updateDB(days: number) {
    await removeOldData();

    let today = new Date();

    for (let dayNum = 0; dayNum <= days; dayNum++) {
        let curDay = new Date();
        curDay.setDate(today.getDate() + dayNum);

        let formattedDate = formatDate(curDay);

        for (let theatre of [
            'amc-columbus-10',
            'amc-dublin-village-18',
            'amc-lennox-town-center-24'
        ]) {
            if (!(await db.contains(theatre, formattedDate))) {
                let movies = await getMovieListings(theatre, <string>formattedDate);
                db.post(theatre, formattedDate, {movies: movies});
                console.log(`Retrieved ${theatre} data for ${formattedDate}`);
            }
        }
    }
}

/**
 * Return true if the datestring given represents a date prior to today.
 * @param dateString yyyy-mm-dd representation of a date to compare to today.
 */
function isOld(dateString: string): boolean {
    return Date.parse(dateString) < Date.parse(<string>formatDate(new Date()));
}

updateDB(7);
