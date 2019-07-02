"use strict";
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var db = {
    /**
     * Check if the database contains the theatre information for the given day.
     * @param theatre AMC unique theatre name.
     * @param date yyyy-mm-dd date.
     */
    contains: function (theatre, date) {
        var filePath = path.join(__dirname, 'data', date, theatre + ".json");
        return fs.existsSync(filePath);
    },
    /**
     * Retrieve theatre information for the given theatre and date.
     * @param theatre AMC unique theatre name.
     * @param date yyyy-mm-dd date.
     */
    get: function (theatre, date) {
        var filePath = path.join(__dirname, 'data', date, theatre + ".json");
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
    },
    "delete": function (date) {
        try {
            var folderPath_1 = path.join(__dirname, 'data', date);
            if (fs.existsSync(folderPath_1)) {
                fs.readdirSync(folderPath_1).forEach(function (file, index) {
                    var curFile = path.join(folderPath_1, file);
                    fs.unlinkSync(curFile);
                });
                fs.rmdirSync(folderPath_1);
            }
        }
        catch (err) {
            console.log("Failed to remove " + date + " folder");
        }
    }
};
exports["default"] = db;
