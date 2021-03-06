"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require('fs');
var path = require('path');
var amcMovies_1 = require("./amcMovies");
var db_1 = require("./db");
/**
 * Format a date object into a yyyy-mm-dd date string.
 * @param date Date to be formatted.
 */
function formatDate(date) {
    var dd = date.getDate();
    dd = dd >= 10 ? dd : "0" + dd;
    var mm = date.getMonth() + 1;
    mm = mm >= 10 ? mm : "0" + mm;
    var yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
}
/**
 * Remove all data occurring before today.
 */
function removeOldData() {
    var datadir = path.join(__dirname, 'data');
    fs.readdirSync(datadir).forEach(function (date, index) {
        if (isOld(date)) {
            db_1["default"]["delete"](date);
        }
    });
}
/**
 * Removes old data and adds new data to the database.
 */
function updateDB() {
    return __awaiter(this, void 0, void 0, function () {
        var today, dayNum, curDay, formattedDate, _i, _a, theatre;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    removeOldData();
                    today = new Date();
                    dayNum = 0;
                    _b.label = 1;
                case 1:
                    if (!(dayNum <= 4)) return [3 /*break*/, 6];
                    curDay = new Date();
                    curDay.setDate(today.getDate() + dayNum);
                    formattedDate = formatDate(curDay);
                    _i = 0, _a = [
                        'amc-columbus-10',
                        'amc-dublin-village-18',
                        'amc-lennox-town-center-24'
                    ];
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    theatre = _a[_i];
                    return [4 /*yield*/, amcMovies_1.getMovieListings(theatre, formattedDate)];
                case 3:
                    _b.sent();
                    console.log("Retrieved " + theatre + " data for " + formattedDate);
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    dayNum++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
/**
 * Return true if the datestring given represents a date prior to today.
 * @param dateString yyyy-mm-dd representation of a date to compare to today.
 */
function isOld(dateString) {
    return Date.parse(dateString) < Date.parse(formatDate(new Date()));
}
updateDB();
