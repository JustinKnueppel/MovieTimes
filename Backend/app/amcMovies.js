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
Object.defineProperty(exports, "__esModule", { value: true });
var axios = require('axios');
var cheerio = require('cheerio');
var db_1 = require("./db");
var baseURL = 'https://www.amctheatres.com';
axios.defaults.baseURL = baseURL;
;
;
/**
 * Return the movie listings for the given theatre and date.
 * @param theatre AMC unique theatre name.
 * @param date yyyy-mm-dd date.
 */
function getMovieListings(theatre, date) {
    return __awaiter(this, void 0, void 0, function () {
        var uri, movies, response, $_1, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // If listing is already in database do not retrieve again
                    if (db_1.default.contains(theatre, date)) {
                        return [2 /*return*/, Promise.resolve(db_1.default.get(theatre, date))];
                    }
                    uri = "/movie-theatres/showtimes/all/" + date + "/" + theatre + "/all";
                    movies = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios(uri)];
                case 2:
                    response = _a.sent();
                    $_1 = cheerio.load(response.data);
                    $_1('div[class="ShowtimesByTheatre-maincol-scroll"]').find('div[class="ShowtimesByTheatre-film"]').each(function (_, movieElem) {
                        var movie = {
                            title: "",
                            link: "",
                            times: []
                        };
                        movie.title = $_1(movieElem).find('a.MovieTitleHeader-title > h2').text();
                        movie.link = "" + baseURL + $_1(movieElem).find('a.MovieTitleHeader-title').attr('href');
                        var movieTimes = [];
                        $_1(movieElem).find('div.Showtime a.Btn').each(function (i, e) {
                            movieTimes.push($_1(e).text());
                        });
                        var movieTimeLinks = [];
                        $_1(movieElem).find('div.Showtime a.Btn').each(function (i, e) {
                            movieTimeLinks.push($_1(e).attr('href'));
                        });
                        movie.times = [];
                        for (var i = 0; i < movieTimes.length; i++) {
                            movie.times.push({
                                time: movieTimes[i],
                                link: movieTimeLinks[i]
                            });
                        }
                        ;
                        movies.push(movie);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log("Error");
                    return [3 /*break*/, 4];
                case 4:
                    ;
                    // Update the database
                    db_1.default.post(theatre, date, movies);
                    return [2 /*return*/, movies];
            }
        });
    });
}
exports.getMovieListings = getMovieListings;
/**
 * Get AMC API information about the given theatre on the given date.
 * @param theatreID Unique AMC theatre ID.
 * @param date yyyy-mm-dd date.
 */
function getTheatre(theatreID, date) {
    return __awaiter(this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios(baseURL + "/v2/theatres/" + theatreID + "/showtimes/" + date, { headers: { 'X-AMC-Vendor-Key': process.env.API_KEY } })];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/, resp];
            }
        });
    });
}
var _loop_1 = function (theatre) {
    getMovieListings(theatre, '2019-05-12').then(function (movieListings) {
        console.log("Retrieved data for " + theatre);
    })
        .catch(function (e) {
        console.log("Error retrieving promise");
    });
};
// Test API
// getTheatre(377, '2019-05-01')
//     .then((resp) => {
//         console.log(resp.data._embedded.showtimes[0]);
//     })
//     .catch((err) => {
//         console.log('Error occurred in amcMovies');
//     });
// Test database
for (var _i = 0, _a = ['amc-columbus-10', 'amc-dublin-village-18', 'amc-lennox-town-center-24']; _i < _a.length; _i++) {
    var theatre = _a[_i];
    _loop_1(theatre);
}
;
