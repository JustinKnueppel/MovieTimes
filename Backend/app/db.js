const fs = require('fs');
const path = require('path');
let db = {
    /**
     * Check if the database contains the theatre information for the given day.
     * @param theatre AMC unique theatre name.
     * @param date yyyy-mm-dd date.
     */
    contains: function (theatre, date) {
        let filePath = path.join(__dirname, 'data', date, `${theatre}.json`);
        return fs.existsSync(filePath);
    },
    /**
     * Retrieve theatre information for the given theatre and date.
     * @param theatre AMC unique theatre name.
     * @param date yyyy-mm-dd date.
     */
    get: function (theatre, date) {
        let filePath = path.join(__dirname, 'data', date, `${theatre}.json`);
        return JSON.parse(fs.readFileSync(filePath));
    },
    /**
     * Post information for a given theatre on the given date to the database.
     * @param theatre AMC unique theatre name.
     * @param date yyyy-mm-dd date.
     * @param data Movie information to be stored in database.
     */
    post: function (theatre, date, data) {
        try {
            let folderPath = path.join(__dirname, 'data', date);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            let filePath = path.join(__dirname, 'data', date, `${theatre}.json`);
            let json = JSON.stringify(data);
            fs.writeFileSync(filePath, json);
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
export default db;
