const fs = require('fs');
const path = require('path');

export type DateString = string;

let db = {
    contains: function(theatre: string, date: DateString): boolean {
        let filePath = path.join(__dirname, 'data', date, `${theatre}.json`);
        return fs.existsSync(filePath);
    },
    get: function(theatre: string, date: DateString): Object {
        let filePath = path.join(__dirname, 'data', date, `${theatre}.json`);
        return JSON.parse(fs.readFileSync(filePath));
    },
    post: function(theatre: string, date: DateString, data: Object): boolean {
        try {
            let folderPath = path.join(__dirname, 'data', date);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            let filePath = path.join(__dirname, 'data', date, `${theatre}.json`);

            let json = JSON.stringify(data);
            fs.writeFileSync(filePath, json);
            return true;
        } catch(err) {
            return false;
        }
    }
};

export default db;

console.log(db.post('amc-dublin-village-18', '2019-05-02', {"showtime": "test"}));