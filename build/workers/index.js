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
exports.fetchBinanceAnnouncements = void 0;
var axios_1 = __importDefault(require("axios"));
var Binance_Announcement_1 = __importDefault(require("../models/Binance-Announcement"));
var common_1 = require("./common");
var common_2 = require("../Helper/common");
var fetchBinanceAnnouncements = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, articles, _i, articles_1, article, existingArticle, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                return [4 /*yield*/, axios_1.default.get('https://www.binance.com/bapi/apex/v1/public/apex/cms/article/list/query', {
                        params: {
                            type: 1,
                            pageNo: 1,
                            pageSize: 10,
                            catalogId: 48
                        }
                    })];
            case 1:
                response = _a.sent();
                if (!response.data.success) {
                    throw new Error('Failed to fetch Binance announcements');
                }
                articles = response.data.data.catalogs[0].articles;
                _i = 0, articles_1 = articles;
                _a.label = 2;
            case 2:
                if (!(_i < articles_1.length)) return [3 /*break*/, 6];
                article = articles_1[_i];
                return [4 /*yield*/, Binance_Announcement_1.default.findOne({ id: article.id, code: "".concat(article.code), title: article.title })];
            case 3:
                existingArticle = _a.sent();
                if (existingArticle) {
                    return [3 /*break*/, 5];
                }
                data = {
                    title: article.title,
                    code: article.code,
                    id: article.id,
                    releaseDate: article.releaseDate,
                    slug: (0, common_1.slugifyWithoutRandomText)(article.title),
                    articleUrl: "https://www.binance.com/en/support/announcement/".concat((0, common_1.slugifyWithoutRandomText)(article.title), "-").concat(article.code),
                };
                return [4 /*yield*/, Binance_Announcement_1.default.create(data)];
            case 4:
                _a.sent();
                if (!data.title.includes("Will List")) {
                    return [3 /*break*/, 5];
                }
                (0, common_2.postToTelegram)(data);
                _a.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, articles];
            case 7:
                error_1 = _a.sent();
                console.error('Error fetching Binance announcements:', error_1);
                throw error_1;
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.fetchBinanceAnnouncements = fetchBinanceAnnouncements;
