"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.getTimeDifferenceInHours = exports.getUpsertedDocuments = exports.slugify = exports.slugifyWithRandomText = exports.slugifyWithoutRandomText = exports.deleteOldestFeedRecords = exports.deleteOldestTwitterRecords = exports.getDelayedData = exports.generateOrGetModel = exports.disableCronJob = exports.createCronJob = exports.parseDate = exports.toTimestamp = exports.sortByParsedDate = exports.sortByDate = exports.fetcherEmitDataFunction = exports.GetFirstDocument = exports.CreateOrUpdateFirstDocumnet = exports.delay = exports.decryptObject = exports.decryptPassword = exports.encryptPassword = exports.encryptObject = void 0;
var mongoose = require("mongoose");
var routes_1 = require("../interface/routes");
var server_1 = require("../server");
var cron = require("node-cron");
var CryptoJS = require("crypto-js");
require("dotenv").config();
var _a = process.env, ENVIRONMENT_IS_PRODUCTION = _a.ENVIRONMENT_IS_PRODUCTION, ENCRYPTION_SECRET_KEY = _a.ENCRYPTION_SECRET_KEY;
var encryptObject = function (inputData) { return __awaiter(void 0, void 0, void 0, function () {
    var data, key, originalValue, encryptedValue;
    return __generator(this, function (_a) {
        if (!inputData)
            return [2 /*return*/];
        data = inputData;
        for (key in data) {
            if (data.hasOwnProperty(key) &&
                key !== "title" &&
                key !== "automation_feeds" &&
                key !== "_id" &&
                key !== "__v" &&
                key !== "is_active" &&
                key !== "createdAt" &&
                key !== "updatedAt") {
                originalValue = data[key];
                encryptedValue = CryptoJS.AES.encrypt(originalValue, ENCRYPTION_SECRET_KEY).toString();
                data[key] = encryptedValue;
            }
        }
        console.log(data);
        return [2 /*return*/, data];
    });
}); };
exports.encryptObject = encryptObject;
var encryptPassword = function (inputData) { return __awaiter(void 0, void 0, void 0, function () {
    var originalPasssword, encryptedValue;
    return __generator(this, function (_a) {
        if (!inputData)
            return [2 /*return*/];
        originalPasssword = inputData.password;
        encryptedValue = CryptoJS.AES.encrypt(originalPasssword, ENCRYPTION_SECRET_KEY).toString();
        return [2 /*return*/, __assign(__assign({}, inputData), { password: encryptedValue })];
    });
}); };
exports.encryptPassword = encryptPassword;
var decryptPassword = function (inputData) { return __awaiter(void 0, void 0, void 0, function () {
    var originalPasssword, decryptedValue;
    return __generator(this, function (_a) {
        if (!inputData)
            return [2 /*return*/];
        originalPasssword = inputData;
        decryptedValue = CryptoJS.AES.decrypt(originalPasssword, ENCRYPTION_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        console.log("eee", decryptedValue);
        return [2 /*return*/, decryptedValue];
    });
}); };
exports.decryptPassword = decryptPassword;
var decryptObject = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var encryptedData, key, encryptedValue, decryptedValue;
    return __generator(this, function (_a) {
        if (!data)
            return [2 /*return*/];
        encryptedData = data;
        for (key in encryptedData) {
            if (encryptedData.hasOwnProperty(key) &&
                key !== "title" &&
                key !== "automation_feeds" &&
                key !== "_id" &&
                key !== "__v" &&
                key !== "is_active" &&
                key !== "createdAt" &&
                key !== "updatedAt") {
                encryptedValue = encryptedData[key];
                decryptedValue = CryptoJS.AES.decrypt(encryptedValue, ENCRYPTION_SECRET_KEY).toString(CryptoJS.enc.Utf8);
                encryptedData[key] = decryptedValue;
            }
        }
        return [2 /*return*/, encryptedData];
    });
}); };
exports.decryptObject = decryptObject;
var delay = function (time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
};
exports.delay = delay;
var CreateOrUpdateFirstDocumnet = function (Schema, data) { return __awaiter(void 0, void 0, void 0, function () {
    var SchemaDocCount, updated, created;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Schema.countDocuments()];
            case 1:
                SchemaDocCount = _a.sent();
                if (!(SchemaDocCount != 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, Schema.updateMany({}, { $set: __assign({}, data) })];
            case 2:
                updated = _a.sent();
                return [2 /*return*/, updated];
            case 3: return [4 /*yield*/, Schema.create(data)];
            case 4:
                created = _a.sent();
                return [2 /*return*/, created];
        }
    });
}); };
exports.CreateOrUpdateFirstDocumnet = CreateOrUpdateFirstDocumnet;
var GetFirstDocument = function (Schema) { return __awaiter(void 0, void 0, void 0, function () {
    var SchemaDocCount, docs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Schema.countDocuments()];
            case 1:
                SchemaDocCount = _a.sent();
                if (!(SchemaDocCount != 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, Schema.find()];
            case 2:
                docs = _a.sent();
                return [2 /*return*/, docs[0]];
            case 3: return [2 /*return*/, {}];
        }
    });
}); };
exports.GetFirstDocument = GetFirstDocument;
var fetcherEmitDataFunction = function (Schema, data, emitFunction) { return __awaiter(void 0, void 0, void 0, function () {
    var totalDocCount, i, item, existingDoc, lastDoc, schemaFeed;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Schema.countDocuments()];
            case 1:
                totalDocCount = _a.sent();
                i = 0;
                _a.label = 2;
            case 2:
                if (!(i < data.length)) return [3 /*break*/, 9];
                item = data[i];
                return [4 /*yield*/, Schema.find({
                        title: item === null || item === void 0 ? void 0 : item.title,
                        pubDate: item === null || item === void 0 ? void 0 : item.pubDate,
                    })];
            case 3:
                existingDoc = _a.sent();
                if (!((existingDoc === null || existingDoc === void 0 ? void 0 : existingDoc.length) == 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, Schema.findOne()];
            case 4:
                lastDoc = _a.sent();
                if (!(lastDoc && totalDocCount > 200)) return [3 /*break*/, 6];
                return [4 /*yield*/, Schema.deleteOne({ _id: lastDoc === null || lastDoc === void 0 ? void 0 : lastDoc._id })];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [4 /*yield*/, Schema.create(item)];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                i++;
                return [3 /*break*/, 2];
            case 9: return [4 /*yield*/, Schema.find().sort([
                    ["pubDate", -1],
                    ["title", 1],
                ])];
            case 10:
                schemaFeed = _a.sent();
                // console.log(data_to_emit.length, "created");
                emitFunction({ data: schemaFeed });
                return [2 /*return*/];
        }
    });
}); };
exports.fetcherEmitDataFunction = fetcherEmitDataFunction;
var sortByDate = function (docs) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        docs.sort(function (a, b) { return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(); });
        return [2 /*return*/, docs];
    });
}); };
exports.sortByDate = sortByDate;
var sortByParsedDate = function (docs) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        docs.sort(function (a, b) { return Date.parse(b.pubDate) - Date.parse(a.pubDate); });
        return [2 /*return*/, docs];
    });
}); };
exports.sortByParsedDate = sortByParsedDate;
var toTimestamp = function (strDate) { return __awaiter(void 0, void 0, void 0, function () {
    var datum;
    return __generator(this, function (_a) {
        datum = Date.parse(strDate);
        return [2 /*return*/, datum / 1000];
    });
}); };
exports.toTimestamp = toTimestamp;
var parseDate = function (strDate) { return __awaiter(void 0, void 0, void 0, function () {
    var date;
    return __generator(this, function (_a) {
        date = new Date(strDate);
        return [2 /*return*/, date];
    });
}); };
exports.parseDate = parseDate;
var createCronJob = function (schedule, cronId, listId) {
    var job = cron.schedule(schedule, function () {
        console.log("Running cron job with ID ".concat(cronId, "..."));
    });
    // Store the cron job instance in the map
    server_1.cronJobMap.set(cronId, job);
    // Return the cron job instance
    return job;
};
exports.createCronJob = createCronJob;
var disableCronJob = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var job;
    return __generator(this, function (_a) {
        job = server_1.cronJobMap.get(id);
        if (job) {
            job.stop();
            server_1.cronJobMap.delete(id);
            console.log("Cron job ".concat(id, " disabled"));
        }
        return [2 /*return*/];
    });
}); };
exports.disableCronJob = disableCronJob;
var generateOrGetModel = function (modelName) {
    if (routes_1.ModelList.includes(modelName)) {
        try {
            return mongoose.model(modelName);
        }
        catch (error) {
            var schema = new mongoose.Schema({}, { strict: false, timestamps: true });
            return mongoose.model(modelName, schema);
        }
    }
    else {
        return null;
    }
};
exports.generateOrGetModel = generateOrGetModel;
var getDelayedData = function (feedName, query, model, response, delay) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, page, _b, limit, data, resData;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = query.page, page = _a === void 0 ? 1 : _a, _b = query.limit, limit = _b === void 0 ? 50 : _b;
                return [4 /*yield*/, model
                        .find({
                        pubDate: {
                            $lt: delay,
                        },
                    })
                        .sort([
                        ["pubDate", -1],
                        ["title", 1],
                    ])
                        .skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()))
                        .limit(parseInt(limit.toString()))];
            case 1:
                data = _d.sent();
                _c = {
                    data: data,
                    page: parseInt(page.toString()),
                    limit: parseInt(limit.toString())
                };
                return [4 /*yield*/, model.countDocuments()];
            case 2:
                resData = (_c.total = _d.sent(),
                    _c);
                return [2 /*return*/, response.status(200).send(resData)];
        }
    });
}); };
exports.getDelayedData = getDelayedData;
var deleteOldestTwitterRecords = function (Schema) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Schema.deleteMany({
                    createdAt: { $lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
                })];
            case 1:
                result = _a.sent();
                if (result.deletedCount)
                    console.log("".concat(result.deletedCount, " records deleted."));
                return [2 /*return*/];
        }
    });
}); };
exports.deleteOldestTwitterRecords = deleteOldestTwitterRecords;
var deleteOldestFeedRecords = function (Schema) { return __awaiter(void 0, void 0, void 0, function () {
    var result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Schema.deleteMany({
                    pubDate: { $lt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) },
                })];
            case 1:
                result = _a.sent();
                if (result === null || result === void 0 ? void 0 : result.deletedCount)
                    console.log("".concat(result.deletedCount, " records deleted."));
                return [2 /*return*/];
        }
    });
}); };
exports.deleteOldestFeedRecords = deleteOldestFeedRecords;
var randomText = function (length) {
    if (length === void 0) { length = 8; }
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var str = "";
    for (var i = 0; i < length; i += 1) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return str;
};
var slugifyWithoutRandomText = function (string) {
    return string
        .toString() // converts input to a string
        .trim() // trims trailing whitespace
        .toLowerCase() // converts to lowercase
        .replace(/\s+/g, "-") // replaces any spaces with '-'
        .replace(/[^\w\-]+/g, "") // removes any non-word, non-hyphen characters
        .replace(/\-\-+/g, "-") // converts multiple hyphens to a single one
        .replace(/^-+/, "") // removes leading hyphens
        .replace(/-+$/, "") // removes trailing hyphens
        .replace("‘", "") // removes ' from string
        .replace("’", "") // removes ' from string
        .replace('"', "") // removes ' from string
        .replace("'", "");
}; // removes ' from string
exports.slugifyWithoutRandomText = slugifyWithoutRandomText;
var slugifyWithRandomText = function (string) {
    return (0, exports.slugifyWithoutRandomText)(string);
};
exports.slugifyWithRandomText = slugifyWithRandomText;
var slugify = function (string, version, length) {
    if (length === void 0) { length = 4; }
    // slugifyWithoutRandomText(string).concat(`-${version}`); // adds random text to the end of the slug
    return (0, exports.slugifyWithoutRandomText)(string);
}; // adds random text to the end of the slug
exports.slugify = slugify;
var getUpsertedDocuments = function (dataArray, schema) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _i, dataArray_1, item, document;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = [];
                _i = 0, dataArray_1 = dataArray;
                _a.label = 1;
            case 1:
                if (!(_i < dataArray_1.length)) return [3 /*break*/, 4];
                item = dataArray_1[_i];
                return [4 /*yield*/, schema.findOne({ _id: item === null || item === void 0 ? void 0 : item._id })];
            case 2:
                document = _a.sent();
                data.push(document);
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, data];
        }
    });
}); };
exports.getUpsertedDocuments = getUpsertedDocuments;
var getTimeDifferenceInHours = function (time) {
    var timestamp = new Date(time);
    // Current time
    var currentTime = new Date();
    // Calculate the time difference in milliseconds
    var timeDifference = currentTime - timestamp;
    // Convert the time difference to hours
    var hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference;
};
exports.getTimeDifferenceInHours = getTimeDifferenceInHours;
