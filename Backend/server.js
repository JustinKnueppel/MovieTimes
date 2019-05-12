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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var amcMovies_1 = require("./app/amcMovies");
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
function getTheatresInfo(dateString) {
    return __awaiter(this, void 0, void 0, function () {
        var theatresInfo, promises, _i, theatres_1, theatre, data, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    theatresInfo = {};
                    promises = [];
                    for (_i = 0, theatres_1 = theatres; _i < theatres_1.length; _i++) {
                        theatre = theatres_1[_i];
                        promises.push(amcMovies_1.getMovieListings(theatre, dateString));
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 1:
                    data = _a.sent();
                    for (i = 0; i < theatres.length; i++) {
                        theatresInfo[theatres[i]] = data[i];
                    }
                    return [2 /*return*/, theatresInfo];
            }
        });
    });
}
var bodyParser = require('body-parser');
var express = require('express');
var cors = require('cors');
var app = express();
var theatres = ['amc-columbus-10', 'amc-dublin-village-18', 'amc-lennox-town-center-24'];
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.get('/api/date/:date', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                res.setHeader('Content-Type', 'application/json');
                _b = (_a = res).send;
                return [4 /*yield*/, getTheatresInfo(req.params.date)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
        }
    });
}); });
app.get('/api/today', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var today, formattedDate, _a, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                today = new Date();
                formattedDate = formatDate(today);
                _b = (_a = res).send;
                return [4 /*yield*/, getTheatresInfo(formattedDate)];
            case 1: return [2 /*return*/, _b.apply(_a, [_c.sent()])];
            case 2:
                err_1 = _c.sent();
                return [2 /*return*/, res.send('Error')];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/api/date/:date/theatre/:theatre', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var listings, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                console.log("Theatre: " + req.params.theatre + ", Date: " + req.params.date);
                return [4 /*yield*/, amcMovies_1.getMovieListings(req.params.theatre, req.params.date)];
            case 1:
                listings = _a.sent();
                res.setHeader('Content-Type', 'application/json');
                return [2 /*return*/, res.send(listings)];
            case 2:
                err_2 = _a.sent();
                return [2 /*return*/, res.send("Error")];
            case 3: return [2 /*return*/];
        }
    });
}); });
var PORT = process.env.API_PORT || 8000;
app.listen(PORT, function () {
    console.log("API Started on port " + PORT);
});
