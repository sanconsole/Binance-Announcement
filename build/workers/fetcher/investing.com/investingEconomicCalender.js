"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestingEconomicCalenderFetcher = void 0;
var axios_1 = __importDefault(require("axios"));
var investingScrapedData_1 = __importDefault(require("../../../models/investing.com/investingScrapedData"));
var logger_1 = require("../../../Helper/common/logger");
var countryData_1 = require("../../../assets/countryData");
var hooks_1 = require("../hooks");
var public_1 = require("../../room/public");
var cheerio = require("cheerio").default;
var InvestingEconomicCalenderFetcher = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, pageRespone, $_1, scrapedData_1, forcastDay_1, i, test, text, title, description, deleted, err_1;
    var _a, _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _e.trys.push([0, 10, , 11]);
                logger_1.logger.info("Fetching Investing.com Economic Calendar Feed");
                url = "https://www.investing.com/economic-calendar/";
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                pageRespone = _e.sent();
                $_1 = cheerio.load(pageRespone === null || pageRespone === void 0 ? void 0 : pageRespone.data);
                scrapedData_1 = [];
                $_1("#economicCalendarData > tbody > tr").each(function (index, element) {
                    var _a;
                    var tds = $_1(element).find("td");
                    if (index === 0) {
                        forcastDay_1 = $_1(tds[0]).text();
                    }
                    else {
                        var time = $_1(tds[0]).text();
                        var countryId_1 = tds[1]["children"][0]["attribs"]["data-img_key"];
                        countryId_1 = countryId_1.replace("_", " ");
                        var flagsObjectArray = Object.values(countryData_1.countryFlagData);
                        var countryFlag = flagsObjectArray.find(function (item) { return item.name === countryId_1; });
                        var currency = $_1(tds[1]).text().trim();
                        var imp = $_1(tds[2]).text();
                        var event = $_1(tds[3]).text().replace("\n", "").trim();
                        var actual = $_1(tds[4]).text().trim();
                        var forecast = $_1(tds[5]).text().trim();
                        var previous = $_1(tds[6]).text().trim();
                        var tableRow = {
                            countryId: countryId_1,
                            countryFlag: countryFlag === null || countryFlag === void 0 ? void 0 : countryFlag.emoji,
                            time: time,
                            currency: currency,
                            forcastDay: forcastDay_1,
                            event: event,
                            actual: actual,
                            forecast: forecast,
                            previous: previous,
                        };
                        if (imp !== "Holiday" && ((_a = tableRow === null || tableRow === void 0 ? void 0 : tableRow.actual) === null || _a === void 0 ? void 0 : _a.length) !== 0) {
                            scrapedData_1.push(tableRow);
                        }
                    }
                });
                i = 0;
                _e.label = 2;
            case 2:
                if (!(i < scrapedData_1.length)) return [3 /*break*/, 8];
                return [4 /*yield*/, investingScrapedData_1.default.find({
                        event: scrapedData_1[i].event,
                        forcastDay: scrapedData_1[i].forcastDay,
                    })];
            case 3:
                test = _e.sent();
                if (!(test.length === 0)) return [3 /*break*/, 7];
                return [4 /*yield*/, investingScrapedData_1.default.create(scrapedData_1[i])];
            case 4:
                _e.sent();
                text = "".concat((_a = scrapedData_1[i]) === null || _a === void 0 ? void 0 : _a.countryFlag, " ").concat((_b = scrapedData_1[i]) === null || _b === void 0 ? void 0 : _b.countryId, " ").concat((_c = scrapedData_1[i]) === null || _c === void 0 ? void 0 : _c.event, " $").concat((_d = scrapedData_1[i]) === null || _d === void 0 ? void 0 : _d.currency, "\n\n");
                title = text;
                if (scrapedData_1[i].actual.length !== 0) {
                    text = text + "Actual: ".concat(scrapedData_1[i].actual);
                    description = "Actual: ".concat(scrapedData_1[i].actual);
                    if (parseFloat(scrapedData_1[i].actual) >
                        parseFloat(scrapedData_1[i].forecast)) {
                        text = text + " \uD83D\uDFE2";
                        description = description + " \uD83D\uDFE2";
                    }
                    else if (parseFloat(scrapedData_1[i].actual) <
                        parseFloat(scrapedData_1[i].forecast)) {
                        text = text + " \uD83D\uDD34";
                        description = description + " \uD83D\uDD34";
                    }
                }
                if (scrapedData_1[i].forecast.length !== 0) {
                    text = text + "\nExpected: ".concat(scrapedData_1[i].forecast);
                    description = description + "\nExpected: ".concat(scrapedData_1[i].forecast);
                }
                if (scrapedData_1[i].previous.length !== 0) {
                    text = text + "\nPrevious: ".concat(scrapedData_1[i].previous);
                    description = description + "\nPrevious: ".concat(scrapedData_1[i].previous);
                }
                return [4 /*yield*/, (0, public_1.emitInvestingEconomicCalenderData)({
                        data: {
                            title: title,
                            description: description,
                            url: "https://www.piqsuite.com",
                            pubDate: new Date(),
                        },
                    })];
            case 5:
                _e.sent();
                // text = text + "\n\n- PiQSuite.com";
                return [4 /*yield*/, (0, hooks_1.postInvestingEconomicCalender)(text)];
            case 6:
                // text = text + "\n\n- PiQSuite.com";
                _e.sent();
                _e.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 2];
            case 8: return [4 /*yield*/, investingScrapedData_1.default.deleteMany({
                    forcastDay: { $ne: forcastDay_1 },
                })];
            case 9:
                deleted = _e.sent();
                if ((deleted === null || deleted === void 0 ? void 0 : deleted.deletedCount) > 0) {
                    logger_1.logger.info("Deleted ".concat(deleted === null || deleted === void 0 ? void 0 : deleted.deletedCount, " Investing Data"));
                }
                return [3 /*break*/, 11];
            case 10:
                err_1 = _e.sent();
                logger_1.logger.info((err_1 === null || err_1 === void 0 ? void 0 : err_1.stack) + " From Investing.com Econic Calender Fetcher");
                return [3 /*break*/, 11];
            case 11: return [2 /*return*/];
        }
    });
}); };
exports.InvestingEconomicCalenderFetcher = InvestingEconomicCalenderFetcher;
