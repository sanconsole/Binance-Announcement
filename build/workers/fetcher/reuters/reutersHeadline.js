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
exports.postReutersHeadline = void 0;
var axios_1 = __importDefault(require("axios"));
var headlineForTelegram_1 = __importDefault(require("../../../models/reuters/headlineForTelegram"));
var common_1 = require("../../../Helper/common");
var functions_1 = require("../../cronjobs/reuters/functions");
var hooks_1 = require("../hooks");
var logger_1 = require("../../../Helper/common/logger");
var subject_1 = __importDefault(require("../../../models/reuters/subject"));
var cheerio = require("cheerio").default;
var postReutersHeadline = function (parsedData) { return __awaiter(void 0, void 0, void 0, function () {
    var time_limit, reutersHeadlineFeeds, i, time, _loop_1, whitelistSubjectCode, imgResponse, i, err_1;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _l.trys.push([0, 13, , 17]);
                time_limit = 59;
                if (!((parsedData === null || parsedData === void 0 ? void 0 : parsedData.length) != 0)) return [3 /*break*/, 11];
                return [4 /*yield*/, headlineForTelegram_1.default.find()];
            case 1:
                reutersHeadlineFeeds = _l.sent();
                i = 0;
                _l.label = 2;
            case 2:
                if (!(i < (reutersHeadlineFeeds === null || reutersHeadlineFeeds === void 0 ? void 0 : reutersHeadlineFeeds.length))) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, common_1.diff_minutes)(new Date(), new Date((_a = reutersHeadlineFeeds[i]) === null || _a === void 0 ? void 0 : _a.pubDate))];
            case 3:
                time = _l.sent();
                if (!(time > time_limit)) return [3 /*break*/, 5];
                return [4 /*yield*/, headlineForTelegram_1.default.deleteOne({
                        title: (_b = reutersHeadlineFeeds[i]) === null || _b === void 0 ? void 0 : _b.title,
                    })];
            case 4:
                _l.sent();
                _l.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6:
                _loop_1 = function (i) {
                    var post_to_twitter, tweet_posted, item, time, existingInstance, newModal, tempString, usn, lastChar, imgId, token, textUrl, data, SubjectCode, $, pTag, firstParagraph, firstWord, text_1, titleWithParagraph_1, imgListUrl, imgListData, imgUsnList, imgUrl, data_1, base64;
                    return __generator(this, function (_m) {
                        switch (_m.label) {
                            case 0:
                                post_to_twitter = false;
                                tweet_posted = false;
                                item = parsedData[i];
                                return [4 /*yield*/, (0, common_1.diff_minutes)(new Date(), new Date(item === null || item === void 0 ? void 0 : item.pubDate))];
                            case 1:
                                time = _m.sent();
                                if (!true) return [3 /*break*/, 12];
                                return [4 /*yield*/, headlineForTelegram_1.default.findOne({
                                        title: item === null || item === void 0 ? void 0 : item.title,
                                    })];
                            case 2:
                                existingInstance = _m.sent();
                                if (!!existingInstance) return [3 /*break*/, 12];
                                return [4 /*yield*/, headlineForTelegram_1.default.create({
                                        title: item === null || item === void 0 ? void 0 : item.title,
                                        pubDate: item === null || item === void 0 ? void 0 : item.pubDate,
                                    })];
                            case 3:
                                newModal = _m.sent();
                                tempString = item === null || item === void 0 ? void 0 : item.title;
                                tempString = tempString.replace("&", " and ");
                                usn = (_d = (_c = item === null || item === void 0 ? void 0 : item.guid) === null || _c === void 0 ? void 0 : _c.split("newsml_")) === null || _d === void 0 ? void 0 : _d[1];
                                lastChar = usn[usn.length - 1];
                                if (/[a-zA-Z]/.test(lastChar)) {
                                    if (lastChar != "A") {
                                        lastChar = String.fromCharCode(lastChar.charCodeAt(0) - 1);
                                    }
                                }
                                else {
                                    if (lastChar != "0") {
                                        lastChar = (parseInt(lastChar) - 1).toString();
                                    }
                                }
                                imgId = ((_e = item === null || item === void 0 ? void 0 : item.guid) === null || _e === void 0 ? void 0 : _e.slice(0, -1)) + lastChar;
                                return [4 /*yield*/, (0, functions_1.getReutersToken)()];
                            case 4:
                                token = _m.sent();
                                textUrl = "https://rmb.reuters.com/rmd/rest/json/item?id=".concat(item === null || item === void 0 ? void 0 : item.guid, "&token=").concat(token);
                                return [4 /*yield*/, axios_1.default.get(textUrl)];
                            case 5:
                                data = (_m.sent()).data;
                                SubjectCode = (_f = data === null || data === void 0 ? void 0 : data.subject) === null || _f === void 0 ? void 0 : _f.map(function (item) {
                                    return item === null || item === void 0 ? void 0 : item.code;
                                });
                                return [4 /*yield*/, subject_1.default.find()];
                            case 6:
                                whitelistSubjectCode = _m.sent();
                                whitelistSubjectCode = whitelistSubjectCode.map(function (item) {
                                    return item === null || item === void 0 ? void 0 : item.code;
                                });
                                post_to_twitter = hasCommonItems(SubjectCode, whitelistSubjectCode);
                                $ = cheerio.load(data === null || data === void 0 ? void 0 : data.body_xhtml);
                                pTag = $("p");
                                firstParagraph = $(pTag[0]).text();
                                firstWord = $(pTag[0]).text().toUpperCase().split(" ")[0];
                                if (firstWord == "BY") {
                                    firstParagraph = $(pTag[1]).text();
                                }
                                firstParagraph = firstParagraph.split("(Reuters) -");
                                firstParagraph =
                                    (firstParagraph === null || firstParagraph === void 0 ? void 0 : firstParagraph.length) === 1
                                        ? firstParagraph[0].trim()
                                        : firstParagraph[1].trim();
                                text_1 = "\uD83D\uDD35  ".concat((_g = item === null || item === void 0 ? void 0 : item.title) === null || _g === void 0 ? void 0 : _g.toUpperCase(), "\n\nFull Story \u2192 https://m.piqsuite.com/reuters/").concat(item === null || item === void 0 ? void 0 : item.slug);
                                titleWithParagraph_1 = "".concat(text_1, "\n\n").concat(firstParagraph);
                                imgListUrl = "https://rmb.reuters.com/rmd/rest/json/item?id=".concat(imgId, "&token=").concat(token);
                                imgResponse = null;
                                return [4 /*yield*/, axios_1.default
                                        .get(imgListUrl)
                                        .then(function (res) { return (imgResponse = res); })
                                        .catch(function (err) { return __awaiter(void 0, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    logger_1.logger.info("Text Only :" + text_1);
                                                    return [4 /*yield*/, (0, hooks_1.postReutersFeeds)(text_1, null, titleWithParagraph_1, post_to_twitter)];
                                                case 1:
                                                    _a.sent();
                                                    tweet_posted = true;
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                            case 7:
                                _m.sent();
                                imgListData = (_h = imgResponse === null || imgResponse === void 0 ? void 0 : imgResponse.data) === null || _h === void 0 ? void 0 : _h.associations;
                                imgUsnList = (_j = imgListData === null || imgListData === void 0 ? void 0 : imgListData.filter(function (item) {
                                    return (item === null || item === void 0 ? void 0 : item.type) === "picture";
                                })) === null || _j === void 0 ? void 0 : _j.map(function (item) {
                                    return item === null || item === void 0 ? void 0 : item.usn;
                                });
                                if (!((imgUsnList === null || imgUsnList === void 0 ? void 0 : imgUsnList.length) > 0)) return [3 /*break*/, 10];
                                imgUrl = "http://content.reuters.com/auth-server/content/tag:reuters.com,2024:newsml_".concat(imgUsnList[0], ":1/tag:reuters.com,2024:binary_").concat(imgUsnList[0], "-VIEWIMAGE?token=").concat(token);
                                return [4 /*yield*/, axios_1.default.get(imgUrl, {
                                        responseType: "arraybuffer",
                                    })];
                            case 8:
                                data_1 = (_m.sent()).data;
                                base64 = Buffer.from(data_1, "binary").toString("base64");
                                logger_1.logger.info("Text With Image :" + text_1);
                                return [4 /*yield*/, (0, hooks_1.postReutersFeeds)(text_1, base64, titleWithParagraph_1, post_to_twitter)];
                            case 9:
                                _m.sent();
                                return [3 /*break*/, 12];
                            case 10:
                                if (!!tweet_posted) return [3 /*break*/, 12];
                                return [4 /*yield*/, (0, hooks_1.postReutersFeeds)(text_1, null, titleWithParagraph_1, post_to_twitter)];
                            case 11:
                                _m.sent();
                                _m.label = 12;
                            case 12: return [2 /*return*/];
                        }
                    });
                };
                i = 0;
                _l.label = 7;
            case 7:
                if (!(i < (parsedData === null || parsedData === void 0 ? void 0 : parsedData.length))) return [3 /*break*/, 10];
                return [5 /*yield**/, _loop_1(i)];
            case 8:
                _l.sent();
                _l.label = 9;
            case 9:
                i++;
                return [3 /*break*/, 7];
            case 10: return [3 /*break*/, 12];
            case 11:
                logger_1.logger.info("No Data found");
                _l.label = 12;
            case 12: return [3 /*break*/, 17];
            case 13:
                err_1 = _l.sent();
                if (!(((_k = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _k === void 0 ? void 0 : _k.status) == 403)) return [3 /*break*/, 15];
                return [4 /*yield*/, (0, functions_1.updateReutersToken)()];
            case 14:
                _l.sent();
                return [3 /*break*/, 16];
            case 15:
                logger_1.logger.error((err_1 === null || err_1 === void 0 ? void 0 : err_1.message) + "From Reuters Headline");
                _l.label = 16;
            case 16: return [3 /*break*/, 17];
            case 17: return [2 /*return*/];
        }
    });
}); };
exports.postReutersHeadline = postReutersHeadline;
function hasCommonItems(array1, array2) {
    for (var _i = 0, array1_1 = array1; _i < array1_1.length; _i++) {
        var item = array1_1[_i];
        if (array2.includes(item)) {
            return true;
        }
    }
    return false;
}
