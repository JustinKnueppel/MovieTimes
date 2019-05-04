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
var amcMovies_1 = require("../../Backend/app/amcMovies");
var baseURL = 'localhost';
var port = 8000;
function formatDate(date) {
    var dd = date.getDate();
    dd = dd >= 10 ? dd : "0" + dd;
    var mm = date.getMonth() + 1;
    mm = mm >= 10 ? mm : "0" + mm;
    var yyyy = date.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
}
function getAMC(theatre, date) {
    if (date === void 0) { date = new Date(); }
    return __awaiter(this, void 0, void 0, function () {
        var formattedDate, url, movieInfo, config, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formattedDate = formatDate(date);
                    //testing purposes until looking further into date api
                    formattedDate = '2019-05-03';
                    return [4 /*yield*/, amcMovies_1.getMovieListings(theatre, formattedDate)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    console.log("Pinging URL " + url);
                    config = {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    };
                    return [4 /*yield*/, fetch(url, config)];
                case 3:
                    response = _a.sent();
                    movieInfo = response.json();
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    console.log('Error occurred fetching API');
                    console.log(err_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/, movieInfo];
            }
        });
    });
}
function getAMCOffline(theatre, date) {
    if (date === void 0) { date = new Date(); }
    return __awaiter(this, void 0, void 0, function () {
        var formattedDate;
        return __generator(this, function (_a) {
            formattedDate = formatDate(date);
            return [2 /*return*/];
        });
    });
}
var AMCtheatres = ['amc-lennox-town-center-24', 'amc-dublin-village-18', 'amc-columbus-10'];
getAMC(AMCtheatres[1])
    .then(function (movies) {
    console.log(JSON.stringify(movies));
})["catch"](function (err) {
    console.log("An error occurred resolving promise");
});
