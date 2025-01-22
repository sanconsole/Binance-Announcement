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
exports.postSocketData = exports.postInvestingEconomicCalender = exports.postInvestingEarningCalender = exports.postReutersFeeds = exports.postTextToTelegramAccounts = exports.postTextToDiscordAccounts = exports.postDataToTwitterAccounts = exports.postDataToBSkyAccounts = void 0;
var common_1 = require("../../Helper/common");
var logger_1 = require("../../Helper/common/logger");
var automationfeeds_1 = __importDefault(require("../../models/automationfeeds"));
var discord_1 = __importDefault(require("../../models/discord"));
var telegram_1 = __importDefault(require("../../models/telegram"));
var bsky_1 = __importDefault(require("../../models/bsky"));
var twitter_1 = __importDefault(require("../../models/twitter"));
var common_2 = require("../common");
var axios_1 = __importDefault(require("axios"));
// const { ObjectId } = require("mongodb");
var postDataToBSkyAccounts = function (text, reutersFeed, base64) { return __awaiter(void 0, void 0, void 0, function () {
    var accountList, _loop_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, bsky_1.default.find({
                    is_active: true,
                    automation_feeds: reutersFeed === null || reutersFeed === void 0 ? void 0 : reutersFeed._id,
                }).select(" -automation_feeds -__v -createdAt -updatedAt -is_active -title ")];
            case 1:
                accountList = _a.sent();
                _loop_1 = function (i) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var item;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, common_2.decryptObject)(accountList[i].toObject())];
                                case 1:
                                    item = _a.sent();
                                    return [4 /*yield*/, (0, common_1.postBSky)(text, item, base64)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 500);
                };
                for (i = 0; i < accountList.length; i++) {
                    _loop_1(i);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.postDataToBSkyAccounts = postDataToBSkyAccounts;
var postDataToTwitterAccounts = function (text, reutersFeed, base64) { return __awaiter(void 0, void 0, void 0, function () {
    var twitterAccountList, _loop_2, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, twitter_1.default.find({
                    is_active: true,
                    automation_feeds: reutersFeed,
                }).select(" -automation_feeds -__v -createdAt -updatedAt -is_active -title ")];
            case 1:
                twitterAccountList = _a.sent();
                console.log(twitterAccountList === null || twitterAccountList === void 0 ? void 0 : twitterAccountList.length, "twitterAccountList");
                _loop_2 = function (i) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var item;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, common_2.decryptObject)(twitterAccountList[i].toObject())];
                                case 1:
                                    item = _a.sent();
                                    return [4 /*yield*/, (0, common_1.postTwit)(text, item, base64)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 500);
                };
                for (i = 0; i < twitterAccountList.length; i++) {
                    _loop_2(i);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.postDataToTwitterAccounts = postDataToTwitterAccounts;
var postTextToDiscordAccounts = function (text, reutersFeed, base64) { return __awaiter(void 0, void 0, void 0, function () {
    var AccountList, _loop_3, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, discord_1.default.find({
                    is_active: true,
                    automation_feeds: reutersFeed,
                }).select(" -_id -automation_feeds -__v -createdAt -updatedAt -is_active -title ")];
            case 1:
                AccountList = _a.sent();
                _loop_3 = function (i) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var item;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, common_2.decryptObject)(AccountList[i].toObject())];
                                case 1:
                                    item = _a.sent();
                                    return [4 /*yield*/, (0, common_1.postToDiscord)(text, item, base64)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 500);
                };
                for (i = 0; i < AccountList.length; i++) {
                    _loop_3(i);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.postTextToDiscordAccounts = postTextToDiscordAccounts;
var postTextToTelegramAccounts = function (text, reutersFeed, base64) { return __awaiter(void 0, void 0, void 0, function () {
    var AccountList, _loop_4, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, telegram_1.default.find({
                    is_active: true,
                    automation_feeds: reutersFeed,
                }).select(" -_id -automation_feeds -__v -createdAt -updatedAt -is_active -title ")];
            case 1:
                AccountList = _a.sent();
                _loop_4 = function (i) {
                    setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var item;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, common_2.decryptObject)(AccountList[i].toObject())];
                                case 1:
                                    item = _a.sent();
                                    return [4 /*yield*/, (0, common_1.postToTelegram)(text, item, base64)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); }, 500);
                };
                for (i = 0; i < AccountList.length; i++) {
                    _loop_4(i);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.postTextToTelegramAccounts = postTextToTelegramAccounts;
var postReutersFeeds = function (text, base64, titleWithParagraph, post_to_twitter) { return __awaiter(void 0, void 0, void 0, function () {
    var reutersFeed, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, automationfeeds_1.default.findOne({
                        slug: "reuters",
                        is_active: true,
                    })];
            case 1:
                reutersFeed = _a.sent();
                if (!reutersFeed)
                    return [2 /*return*/];
                // if (post_to_twitter) {
                return [4 /*yield*/, (0, exports.postDataToTwitterAccounts)(text, reutersFeed, base64)];
            case 2:
                // if (post_to_twitter) {
                _a.sent();
                // }
                return [4 /*yield*/, (0, exports.postTextToTelegramAccounts)(titleWithParagraph, reutersFeed, base64)];
            case 3:
                // }
                _a.sent();
                return [4 /*yield*/, (0, exports.postTextToDiscordAccounts)(titleWithParagraph, reutersFeed, base64)];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, exports.postDataToBSkyAccounts)(text, reutersFeed, base64)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                logger_1.logger.error("postReutersFeeds" + error_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postReutersFeeds = postReutersFeeds;
var postInvestingEarningCalender = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    var reutersFeed, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, automationfeeds_1.default.findOne({
                        slug: "investing-earning-calendar",
                        is_active: true,
                    })];
            case 1:
                reutersFeed = _a.sent();
                if (!reutersFeed)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, exports.postDataToTwitterAccounts)(text, reutersFeed, null)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, exports.postTextToTelegramAccounts)(text, reutersFeed, null)];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, exports.postTextToDiscordAccounts)(text, reutersFeed, null)];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, exports.postDataToBSkyAccounts)(text, reutersFeed, null)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_2 = _a.sent();
                logger_1.logger.error("postInvestingEarningCalender" + error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postInvestingEarningCalender = postInvestingEarningCalender;
var postInvestingEconomicCalender = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    var reutersFeed, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                return [4 /*yield*/, automationfeeds_1.default.findOne({
                        slug: "investing-economic-calendar",
                        is_active: true,
                    })];
            case 1:
                reutersFeed = _a.sent();
                if (!reutersFeed)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, exports.postDataToTwitterAccounts)(text, reutersFeed, null)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, exports.postTextToTelegramAccounts)(text, reutersFeed, null)];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, exports.postTextToDiscordAccounts)(text, reutersFeed, null)];
            case 4:
                _a.sent();
                return [4 /*yield*/, (0, exports.postDataToBSkyAccounts)(text, reutersFeed, null)];
            case 5:
                _a.sent();
                return [3 /*break*/, 7];
            case 6:
                error_3 = _a.sent();
                logger_1.logger.error("postInvestingEconomicCalender" + error_3);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postInvestingEconomicCalender = postInvestingEconomicCalender;
var postSocketData = function (eventName, data) { return __awaiter(void 0, void 0, void 0, function () {
    var list, feed, res, piqColumns, piqColumn, i, formatedText, error_4;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                _g.trys.push([0, 9, , 10]);
                list = data === null || data === void 0 ? void 0 : data.data;
                if (!(list === null || list === void 0 ? void 0 : list.length))
                    return [2 /*return*/];
                return [4 /*yield*/, automationfeeds_1.default.findOne({
                        slug: eventName,
                        is_active: true,
                    })];
            case 1:
                feed = _g.sent();
                if (!feed)
                    return [2 /*return*/];
                return [4 /*yield*/, axios_1.default.get("https://feed.piqsuite.com/piq-columns")];
            case 2:
                res = _g.sent();
                piqColumns = (_a = res === null || res === void 0 ? void 0 : res.data) === null || _a === void 0 ? void 0 : _a.data;
                piqColumn = piqColumns === null || piqColumns === void 0 ? void 0 : piqColumns.find(function (item) {
                    return (item === null || item === void 0 ? void 0 : item.slug) === eventName;
                });
                if (!piqColumn)
                    return [2 /*return*/];
                console.log(piqColumn);
                i = 0;
                _g.label = 3;
            case 3:
                if (!(i < list.length)) return [3 /*break*/, 8];
                formatedText = "\uD83D\uDCA1 ".concat((_b = list[i]) === null || _b === void 0 ? void 0 : _b.title, "\n\n");
                if (feed === null || feed === void 0 ? void 0 : feed.twitterAccount) {
                    formatedText += "- ".concat(feed === null || feed === void 0 ? void 0 : feed.twitterAccount, " on PiQSuite.com\n\n");
                }
                if (piqColumn === null || piqColumn === void 0 ? void 0 : piqColumn.has_detail_page) {
                    if ((_c = list[i]) === null || _c === void 0 ? void 0 : _c.slug) {
                        formatedText += "Full Story \u2192 https://m.piqsuite.com/".concat(eventName, "/").concat((_d = list[i]) === null || _d === void 0 ? void 0 : _d.slug);
                    }
                    else {
                        formatedText += "https://app.piqsuite.com";
                    }
                }
                else {
                    if ((_e = list[i]) === null || _e === void 0 ? void 0 : _e.canonicalUrl) {
                        formatedText += (_f = list[i]) === null || _f === void 0 ? void 0 : _f.canonicalUrl;
                    }
                    else {
                        formatedText += "https://app.piqsuite.com";
                    }
                }
                formatedText = formatedText === null || formatedText === void 0 ? void 0 : formatedText.replaceAll("&", "and");
                return [4 /*yield*/, (0, exports.postDataToTwitterAccounts)(formatedText, feed, null)];
            case 4:
                _g.sent();
                return [4 /*yield*/, (0, exports.postTextToTelegramAccounts)(formatedText, feed, null)];
            case 5:
                _g.sent();
                return [4 /*yield*/, (0, exports.postTextToDiscordAccounts)(formatedText, feed, null)];
            case 6:
                _g.sent();
                _g.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 3];
            case 8: return [3 /*break*/, 10];
            case 9:
                error_4 = _g.sent();
                logger_1.logger.error("postSocketData" + error_4);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.postSocketData = postSocketData;
