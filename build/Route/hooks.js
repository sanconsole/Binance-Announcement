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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.deleteDataFromList = exports.updateDataToList = exports.updateEncryptedDataToList = exports.addEncryptedDataToList = exports.addDataToList = exports.getList = void 0;
var CryptoJS = require("crypto-js");
var common_1 = require("../workers/common");
var getList = function (feedName, query, model, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, _b, limit, data, dataFromRedish;
    var _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 50 : _b;
                return [4 /*yield*/, model
                        .find()
                        .sort([
                        ["pubDate", -1],
                        ["title", 1],
                    ])
                        .skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()))
                        .limit(parseInt(limit.toString()))];
            case 1:
                data = _e.sent();
                return [4 /*yield*/, (0, common_1.getDataFromRedisClient)("".concat(feedName, "_").concat(page, "_").concat(limit))];
            case 2:
                dataFromRedish = _e.sent();
                if (!!dataFromRedish) return [3 /*break*/, 5];
                _c = {
                    data: data,
                    page: parseInt(page.toString()),
                    limit: parseInt(limit.toString())
                };
                return [4 /*yield*/, model.countDocuments()];
            case 3:
                dataFromRedish = (_c.total = _e.sent(),
                    _c);
                return [4 /*yield*/, (0, common_1.saveDataToRedisClient)("".concat(feedName, "_").concat(page, "_").concat(limit), dataFromRedish)];
            case 4:
                _e.sent();
                _e.label = 5;
            case 5:
                if ((_d = dataFromRedish === null || dataFromRedish === void 0 ? void 0 : dataFromRedish.data) === null || _d === void 0 ? void 0 : _d.length) {
                    return [2 /*return*/, response.status(200).send(dataFromRedish)];
                }
                else {
                    return [2 /*return*/, response.status(404).send("NO_DATA_FOUND")];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.getList = getList;
var addDataToList = function (feedName, model, request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model.create(request === null || request === void 0 ? void 0 : request.body)];
            case 1:
                data = _a.sent();
                if (!data) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, common_1.removeDataFromRedisClient)(feedName)];
            case 2:
                _a.sent();
                return [2 /*return*/, response.status(200).json({
                        status: true,
                        data: data,
                        message: "Added Successfully",
                    })];
            case 3: return [2 /*return*/, response.status(400).json({
                    status: false,
                    msg: "Something went wrong",
                })];
        }
    });
}); };
exports.addDataToList = addDataToList;
var addEncryptedDataToList = function (feedName, model, request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, common_1.encryptObject)(request === null || request === void 0 ? void 0 : request.body)];
            case 1:
                data = _a.sent();
                return [4 /*yield*/, model.create(data)];
            case 2:
                data = _a.sent();
                if (!data) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, common_1.removeDataFromRedisClient)(feedName)];
            case 3:
                _a.sent();
                return [2 /*return*/, response.status(200).json({
                        status: true,
                        data: data,
                        message: "Added Successfully",
                    })];
            case 4: return [2 /*return*/, response.status(400).json({
                    status: false,
                    msg: "Something went wrong",
                })];
        }
    });
}); };
exports.addEncryptedDataToList = addEncryptedDataToList;
var updateEncryptedDataToList = function (feedName, model, request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, body, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = request.params._id;
                return [4 /*yield*/, (0, common_1.encryptObject)(request === null || request === void 0 ? void 0 : request.body)];
            case 1:
                body = _a.sent();
                return [4 /*yield*/, model.updateOne({ _id: _id }, { $set: body })];
            case 2:
                data = _a.sent();
                if (!data)
                    return [2 /*return*/, response.status(401).send("Item not found")];
                return [4 /*yield*/, (0, common_1.removeDataFromRedisClient)(feedName)];
            case 3:
                _a.sent();
                console.log(body, _id);
                response.status(201).json({
                    status: true,
                    data: data,
                    msg: "Updated Successful !",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateEncryptedDataToList = updateEncryptedDataToList;
var updateDataToList = function (feedName, model, request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = request.params.id;
                return [4 /*yield*/, model.updateOne({ _id: _id }, { $set: request.body })];
            case 1:
                data = _a.sent();
                if (!data)
                    return [2 /*return*/, response.status(401).send("Update Failed")];
                return [4 /*yield*/, (0, common_1.removeDataFromRedisClient)(feedName)];
            case 2:
                _a.sent();
                response.status(201).json({
                    status: true,
                    data: data,
                    msg: "Updated Successful !",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateDataToList = updateDataToList;
var deleteDataFromList = function (feedName, model, request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = request.params.id;
                return [4 /*yield*/, model.updateOne({ _id: _id }, { $set: request.body })];
            case 1:
                data = _a.sent();
                if (!data)
                    return [2 /*return*/, response.status(401).send("Update Failed")];
                return [4 /*yield*/, (0, common_1.removeDataFromRedisClient)(feedName)];
            case 2:
                _a.sent();
                response.status(201).json({
                    status: true,
                    data: data,
                    msg: "Updated Successful !",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteDataFromList = deleteDataFromList;
var deleteData = function (feedName, model, request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = request.params._id;
                return [4 /*yield*/, model.findByIdAndDelete({ _id: _id })];
            case 1:
                data = _a.sent();
                if (!data)
                    return [2 /*return*/, response.status(401).send("Deleted Failed")];
                return [4 /*yield*/, (0, common_1.removeDataFromRedisClient)(feedName)];
            case 2:
                _a.sent();
                response.status(201).json({
                    status: true,
                    data: data,
                    msg: "Deleted Successful !",
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteData = deleteData;
