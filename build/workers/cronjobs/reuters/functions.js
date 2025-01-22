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
exports.getReutersImages = exports.getReutersDetials = exports.updatePiQAuthToken = exports.updateReutersToken = exports.getReutersToken = void 0;
var axios_1 = __importDefault(require("axios"));
var config_1 = __importDefault(require("../../../models/config"));
var logger_1 = require("../../../Helper/common/logger");
var fs = require("fs");
var _a = process.env, REUTERS_USERNAME = _a.REUTERS_USERNAME, REUTERS_PASSWORD = _a.REUTERS_PASSWORD, PIQ_ACCOUNT_USERNAME = _a.PIQ_ACCOUNT_USERNAME, PIQ_ACCOUNT_PASSWORD = _a.PIQ_ACCOUNT_PASSWORD;
var getReutersToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, config_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = "";
                return [4 /*yield*/, config_1.default.findOne({ key: "REUTERS" })];
            case 1:
                config = _a.sent();
                if (!config) return [3 /*break*/, 2];
                token = config === null || config === void 0 ? void 0 : config.value;
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, (0, exports.updateReutersToken)()];
            case 3:
                _a.sent();
                return [4 /*yield*/, config_1.default.findOne({ key: "REUTERS" })];
            case 4:
                config_2 = _a.sent();
                token = config_2 === null || config_2 === void 0 ? void 0 : config_2.value;
                _a.label = 5;
            case 5: return [2 /*return*/, token];
        }
    });
}); };
exports.getReutersToken = getReutersToken;
var updateReutersToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var url, data, configs, token;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                url = "https://commerce.reuters.com/rmd/rest/xml/login?username=".concat(REUTERS_USERNAME, "&password=").concat(REUTERS_PASSWORD, "&format=json");
                return [4 /*yield*/, axios_1.default.get(url)];
            case 1:
                data = (_b.sent()).data;
                return [4 /*yield*/, config_1.default.findOne({ key: "REUTERS" })];
            case 2:
                configs = _b.sent();
                token = (_a = data === null || data === void 0 ? void 0 : data.authToken) === null || _a === void 0 ? void 0 : _a.authToken;
                if (!!configs) return [3 /*break*/, 4];
                return [4 /*yield*/, config_1.default.create({ value: token, key: "REUTERS" })];
            case 3:
                _b.sent();
                logger_1.logger.info("Reuters: New Token Generated");
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, config_1.default.updateOne({ key: "REUTERS" }, { $set: { value: token } })];
            case 5:
                _b.sent();
                logger_1.logger.info("Reuters: Token Updated");
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateReutersToken = updateReutersToken;
var updatePiQAuthToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, configs, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios_1.default.post("https://api.priapusiq.com/auth/login", {
                    email: PIQ_ACCOUNT_USERNAME,
                    password: PIQ_ACCOUNT_PASSWORD,
                })];
            case 1:
                data = (_a.sent()).data;
                return [4 /*yield*/, config_1.default.findOne({ key: "PiQ_AUTH_TOKEN" })];
            case 2:
                configs = _a.sent();
                token = data === null || data === void 0 ? void 0 : data.tokens;
                if (!!configs) return [3 /*break*/, 4];
                return [4 /*yield*/, config_1.default.create({ value: token, key: "PiQ_AUTH_TOKEN" })];
            case 3:
                _a.sent();
                logger_1.logger.info("PiQ_AUTH_TOKEN: New Token Generated");
                return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, config_1.default.updateOne({ key: "PiQ_AUTH_TOKEN" }, { $set: { value: token } })];
            case 5:
                _a.sent();
                logger_1.logger.info("PiQ_AUTH_TOKEN: Token Updated");
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updatePiQAuthToken = updatePiQAuthToken;
var getReutersDetials = function (textId) { return __awaiter(void 0, void 0, void 0, function () {
    var token, config, textUrl, data, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                token = "";
                return [4 /*yield*/, config_1.default.findOne({ key: "REUTERS" })];
            case 1:
                config = _a.sent();
                if (!config) return [3 /*break*/, 2];
                token = config === null || config === void 0 ? void 0 : config.value;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, (0, exports.getReutersToken)()];
            case 3:
                token = _a.sent();
                _a.label = 4;
            case 4:
                textUrl = "https://rmb.reuters.com/rmd/rest/json/item?id=tag:reuters.com,".concat(textId, "&token=").concat(token);
                return [4 /*yield*/, axios_1.default.get(textUrl)];
            case 5:
                data = (_a.sent()).data;
                return [2 /*return*/, {
                        guid: data === null || data === void 0 ? void 0 : data.uri,
                        title: data === null || data === void 0 ? void 0 : data.headline,
                        full_text: (data === null || data === void 0 ? void 0 : data.body_xhtml) ? data === null || data === void 0 ? void 0 : data.body_xhtml : "",
                    }];
            case 6:
                err_1 = _a.sent();
                return [2 /*return*/, {
                        err: err_1.message,
                    }];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.getReutersDetials = getReutersDetials;
var getReutersImages = function (usn, guid, token) { return __awaiter(void 0, void 0, void 0, function () {
    var imageList, lastChar, imgId, imgListUrl, data, associations, imgUsnList, i, imgUrl, data_1, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                imageList = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
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
                imgId = (guid === null || guid === void 0 ? void 0 : guid.slice(0, -1)) + lastChar;
                imgListUrl = "https://rmb.reuters.com/rmd/rest/json/item?id=".concat(imgId, "&token=").concat(token);
                return [4 /*yield*/, axios_1.default.get(imgListUrl)];
            case 2:
                data = (_b.sent()).data;
                associations = data === null || data === void 0 ? void 0 : data.associations;
                imgUsnList = (_a = associations === null || associations === void 0 ? void 0 : associations.filter(function (item) {
                    return (item === null || item === void 0 ? void 0 : item.type) === "picture";
                })) === null || _a === void 0 ? void 0 : _a.map(function (item) {
                    return item === null || item === void 0 ? void 0 : item.usn;
                });
                i = 0;
                _b.label = 3;
            case 3:
                if (!(i < imgUsnList.length)) return [3 /*break*/, 7];
                imgUrl = "http://content.reuters.com/auth-server/content/tag:reuters.com,2024:newsml_".concat(imgUsnList[i], ":1/tag:reuters.com,2024:binary_").concat(imgUsnList[i], "-VIEWIMAGE?token=").concat(token);
                return [4 /*yield*/, axios_1.default.get(imgUrl, {
                        responseType: "arraybuffer",
                    })];
            case 4:
                data_1 = (_b.sent()).data;
                // const base64 = Buffer.from(data, "binary").toString("base64");
                if (!fs.existsSync("uploads/reuters")) {
                    fs.mkdirSync("uploads/reuters", {
                        recursive: true,
                    });
                }
                return [4 /*yield*/, fs.writeFileSync("uploads/reuters/".concat(guid, " ").concat(i + 1, ".JPG"), data_1)];
            case 5:
                _b.sent();
                imageList.push("/uploads/reuters/".concat(guid, " ").concat(i + 1, ".JPG"));
                _b.label = 6;
            case 6:
                i++;
                return [3 /*break*/, 3];
            case 7: return [2 /*return*/, imageList];
            case 8:
                err_2 = _b.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/, imageList];
        }
    });
}); };
exports.getReutersImages = getReutersImages;
