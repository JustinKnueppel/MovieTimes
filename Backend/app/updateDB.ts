const fs = require('fs');
const path = require('path');
import { getMovieListings } from './amcMovies';
const db = require('./db');

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
function removeOldData() {
    let datadir = path.join(__dirname, 'data');
    fs.readdirSync(datadir).forEach((date, index) => {
        if (isOld(date)) {
            db.delete(date);
        }
    });
}

/**
 * Removes old data and adds new data to the database.
 */
async function updateDB(days: number) {
    // removeOldData();

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
            await getMovieListings(theatre, <string>formattedDate);
            console.log(`Retrieved ${theatre} data for ${formattedDate}`);
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

updateDB(2);
