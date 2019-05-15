const path = require('path');
const fs = require('fs');

let AMCtheatres = [
    'amc-lennox-town-center-24',
    'amc-dublin-village-18',
    'amc-columbus-10'
];

/**
 * Format a date object into a yyyy-mm-dd date string.
 * @param date Date to be formatted.
 */
function formatDate(date) {
    let dd = date.getDate();
    dd = dd >= 10 ? dd : `0${dd}`;
    let mm = date.getMonth() + 1;
    mm = mm >= 10 ? mm : `0${mm}`;
    let yyyy = date.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
}

function updateData() {
    let today = formatDate(new Date());

    data = {};

    for (let theatre of AMCtheatres) {
        let filepath = path.join(__dirname, 'Backend', 'app', 'data', today, `${theatre}.json`)
        data[theatre] = JSON.parse(fs.readFileSync(filepath));
    }
    
    let temp = path.join(__dirname, 'Frontend', 'scripts', 'temp.ts')
    fs.writeFileSync(temp, `let theatreinfo = ${JSON.stringify(data)}`);

}

updateData()