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
exports.changeUserPiqAdsRemovalExpiredStatus = exports.userSubscriptionHasExpired = exports.userHasSubscribedForPiqAdsRemoval = void 0;
var model_1 = __importDefault(require("../../models/user/model"));
var adsSubscription_1 = __importDefault(require("../../models/user/adsSubscription"));
var userHasSubscribedForPiqAdsRemoval = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var usersPiqAdsRemovalData, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, adsSubscription_1.default
                    .find({
                    user: userId,
                    active: true,
                })
                    .limit(1)
                    .sort({ $natural: -1 })];
            case 1:
                usersPiqAdsRemovalData = _b.sent();
                return [4 /*yield*/, model_1.default.findOne({
                        _id: userId,
                        subscriptionForAdsRemoval: true,
                    })];
            case 2:
                user = _b.sent();
                return [2 /*return*/, (usersPiqAdsRemovalData.length > 0 &&
                        user &&
                        ((_a = usersPiqAdsRemovalData[0]) === null || _a === void 0 ? void 0 : _a.subscriptionEndDate) > new Date())];
        }
    });
}); };
exports.userHasSubscribedForPiqAdsRemoval = userHasSubscribedForPiqAdsRemoval;
var userSubscriptionHasExpired = function (userId) { return __awaiter(void 0, void 0, void 0, function () {
    var usersPiqAdsRemovalData, user;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, adsSubscription_1.default
                    .find({
                    user: userId,
                    active: false,
                })
                    .limit(1)
                    .sort({ $natural: -1 })];
            case 1:
                usersPiqAdsRemovalData = _b.sent();
                return [4 /*yield*/, model_1.default.findOne({
                        _id: userId,
                        subscriptionForAdsRemoval: false,
                    })];
            case 2:
                user = _b.sent();
                return [2 /*return*/, (usersPiqAdsRemovalData.length > 0 &&
                        ((_a = usersPiqAdsRemovalData === null || usersPiqAdsRemovalData === void 0 ? void 0 : usersPiqAdsRemovalData[0]) === null || _a === void 0 ? void 0 : _a.cancellation_type) ==
                            "CANCELED_DUE_TO_PAST_DUE" &&
                        user)];
        }
    });
}); };
exports.userSubscriptionHasExpired = userSubscriptionHasExpired;
var changeUserPiqAdsRemovalExpiredStatus = function (userId, active) { return __awaiter(void 0, void 0, void 0, function () {
    var usersPiqADsUpdated, updatePiQAds, userUpdated;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, adsSubscription_1.default
                    .find({ user: userId, active: !active })
                    .limit(1)
                    .sort({ $natural: -1 })];
            case 1:
                usersPiqADsUpdated = _a.sent();
                if (!(usersPiqADsUpdated.length > 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, adsSubscription_1.default.updateOne({ _id: usersPiqADsUpdated[0]._id }, { active: active })];
            case 2:
                updatePiQAds = _a.sent();
                return [4 /*yield*/, model_1.default.findOneAndUpdate({ _id: userId }, { subscriptionForAdsRemoval: active })];
            case 3:
                userUpdated = _a.sent();
                return [2 /*return*/, updatePiQAds && userUpdated];
            case 4: return [2 /*return*/, false];
        }
    });
}); };
exports.changeUserPiqAdsRemovalExpiredStatus = changeUserPiqAdsRemovalExpiredStatus;
