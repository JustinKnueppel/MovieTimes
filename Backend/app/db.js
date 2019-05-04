"use strict";
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var db = {
    contains: function (theatre, date) {
        var filePath = path.join(__dirname, 'data', date, theatre + ".json");
        return fs.existsSync(filePath);
    },
    get: function (theatre, date) {
        var filePath = path.join(__dirname, 'data', date, theatre + ".json");
        return JSON.parse(fs.readFileSync(filePath));
    },
    post: function (theatre, date, data) {
        try {
            var folderPath = path.join(__dirname, 'data', date);
            if (!fs.existsSync(folderPath)) {
                fs.mkdirSync(folderPath);
            }
            var filePath = path.join(__dirname, 'data', date, theatre + ".json");
            var json = JSON.stringify(data);
            fs.writeFileSync(filePath, json);
            return true;
        }
        catch (err) {
            return false;
        }
    }
};
exports["default"] = db;
console.log(db.post('amc-dublin-village-18', '2019-05-02', { "showtime": "test" }));
