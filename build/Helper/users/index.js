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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserOnlineStatus = exports.getTotalNewSubscriberCount = exports.getTotalActiveSubscriberCount = exports.getUserCountCreatedToday = exports.getGenderCount = exports.getuserMonthWiseCount = exports.getUserDetails = exports.getUserInfo = exports.getOnlineUsersWithoutAuthntication = exports.getOnlineUsersWithAuthntication = exports.getOnlineUsers = exports.deleteOnlineUser = exports.addOnlineUser = void 0;
var OnlineListModel_1 = __importDefault(require("../../models/user/OnlineListModel"));
var model_1 = __importDefault(require("../../models/user/model"));
var adsSubscription_1 = __importDefault(require("../../models/user/adsSubscription"));
var common_1 = require("../common");
var logger_1 = require("../common/logger");
var addOnlineUser = function (username, userInfo, socketId) {
    return __awaiter(this, void 0, void 0, function () {
        var username_1, userDetails, user, userData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ! DEPRECATED NOT USED AT THE MOMENT
                    console.log(userInfo, "@@@from service");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    username_1 = userInfo.username, userDetails = userInfo.userDetails;
                    return [4 /*yield*/, OnlineListModel_1.default.findOne({ username: username_1 })];
                case 2:
                    user = _a.sent();
                    if (!(user == null)) return [3 /*break*/, 4];
                    userData = {
                        username: username_1,
                        userDetails: userDetails,
                        isOnline: true,
                        socketId: [socketId],
                    };
                    return [4 /*yield*/, OnlineListModel_1.default.create(__assign({}, userData))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    /* handle the exception */
                    console.log("@@@adding error", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.addOnlineUser = addOnlineUser;
var deleteOnlineUser = function (username, socketId) {
    return __awaiter(this, void 0, void 0, function () {
        var user, socketIdList, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // ! DEPRECATED NOT USED AT THE MOMENT
                    console.log("deleting user...");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    return [4 /*yield*/, OnlineListModel_1.default.findOne({ username: username })];
                case 2:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 5];
                    /* remove given socketId from the list */
                    user.socketId.pull(socketId);
                    return [4 /*yield*/, user.save()];
                case 3:
                    _a.sent();
                    socketIdList = user.socketId;
                    if (!!socketIdList.length) return [3 /*break*/, 5];
                    return [4 /*yield*/, OnlineListModel_1.default.deleteOne({ username: username })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_2 = _a.sent();
                    /* handle the exception */
                    console.log("@@@deleting error", error_2);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
};
exports.deleteOnlineUser = deleteOnlineUser;
var getOnlineUsers = function (io, username) {
    var _a, _b;
    if (username === void 0) { username = ""; }
    var usersActiveSockets = {};
    // var socketObject = Object.fromEntries(io.sockets.sockets);
    var socketObject = Object.values(Object.fromEntries(io.sockets.sockets));
    // console.log(socketObject.length, "socketObject");
    // console.log(socketObject, "socketObject");
    for (var _i = 0, socketObject_1 = socketObject; _i < socketObject_1.length; _i++) {
        var socket = socketObject_1[_i];
        var username_2 = (_b = (_a = socket === null || socket === void 0 ? void 0 : socket.handshake) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.username;
        if (usersActiveSockets[username_2]) {
            usersActiveSockets[username_2].push(socket.id);
        }
        else {
            usersActiveSockets[username_2] = [socket.id];
        }
        // console.log(socket.id, "socket.id");
        // console.log(socket.handshake.auth, "socket.handshake.auth");
    }
    // let authUser = Array.from(io.sockets.adapter.rooms.get("auth") || []);
    // console.log(io.sockets.adapter.rooms, "authUser");
    // for (const socket of authUser) {
    //   // const { username } = socket.handshake.query;
    //   if (usersActiveSockets[username]) {
    //     usersActiveSockets[username].push(socket);
    //   } else {
    //     usersActiveSockets[username] = [socket];
    //   }
    // }
    Object.keys(usersActiveSockets).forEach(function (key) {
        if (!key || key === "undefined") {
            delete usersActiveSockets[key];
        }
    });
    return usersActiveSockets;
};
exports.getOnlineUsers = getOnlineUsers;
var getOnlineUsersWithAuthntication = function (io) { return __awaiter(void 0, void 0, void 0, function () {
    var authUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model_1.default.find({ online: true })];
            case 1:
                authUser = _a.sent();
                return [2 /*return*/, authUser.length];
        }
    });
}); };
exports.getOnlineUsersWithAuthntication = getOnlineUsersWithAuthntication;
var getOnlineUsersWithoutAuthntication = function (io) {
    var publicUser = Array.from(io.sockets.adapter.rooms.get("public") || []);
    var authUser = Array.from(io.sockets.adapter.rooms.get("auth") || []);
    // let adminUser = Array.from(io.sockets.adapter.rooms.get("admin") || []);
    return (publicUser === null || publicUser === void 0 ? void 0 : publicUser.length) - (authUser === null || authUser === void 0 ? void 0 : authUser.length);
};
exports.getOnlineUsersWithoutAuthntication = getOnlineUsersWithoutAuthntication;
var getUserInfo = function (usernames) { return __awaiter(void 0, void 0, void 0, function () {
    var users, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                users = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.default.find({ username: { $in: usernames } })];
            case 2:
                users = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                console.log("Error getting usernames");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, users];
        }
    });
}); };
exports.getUserInfo = getUserInfo;
var getUserDetails = function (username) { return __awaiter(void 0, void 0, void 0, function () {
    var user, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = {
                    role: " ",
                    username: "",
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.default.findOne({ username: username })];
            case 2:
                user = _b.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                logger_1.logger.error("Error getting user for username: [" + username + "]");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, user];
        }
    });
}); };
exports.getUserDetails = getUserDetails;
var getuserMonthWiseCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var date, userMonthWiseCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                date = new Date();
                return [4 /*yield*/, model_1.default.aggregate([
                        {
                            $addFields: {
                                parsedDate: {
                                    $toDate: "$createdAt",
                                },
                            },
                        },
                        {
                            $addFields: {
                                year: {
                                    $year: "$parsedDate",
                                },
                                nowYear: {
                                    $year: date,
                                },
                            },
                        },
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$year", "$nowYear"],
                                },
                            },
                        },
                        {
                            $group: {
                                _id: {
                                    $month: "$parsedDate",
                                },
                                count: {
                                    $sum: 1,
                                },
                            },
                        },
                    ])];
            case 1:
                userMonthWiseCount = _a.sent();
                userMonthWiseCount.sort(function (a, b) {
                    return -(b._id - a._id);
                });
                userMonthWiseCount === null || userMonthWiseCount === void 0 ? void 0 : userMonthWiseCount.map(function (item, index) {
                    userMonthWiseCount[index]["_id"] = (0, common_1.getMonthByIndex)(item["_id"]);
                });
                return [2 /*return*/, userMonthWiseCount];
        }
    });
}); };
exports.getuserMonthWiseCount = getuserMonthWiseCount;
var getGenderCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var genderCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model_1.default.aggregate([
                    { $match: { gender: { $ne: null } } },
                    {
                        $group: {
                            _id: "$gender",
                            count: { $sum: 1 },
                        },
                    },
                ])];
            case 1:
                genderCount = _a.sent();
                genderCount = genderCount.sort(function (a, b) {
                    return b._id.localeCompare(a._id);
                });
                return [2 /*return*/, genderCount];
        }
    });
}); };
exports.getGenderCount = getGenderCount;
var getUserCountCreatedToday = function () { return __awaiter(void 0, void 0, void 0, function () {
    var userCountCreatedToday;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, model_1.default.find({
                    $expr: {
                        $gte: [
                            { $toDate: "$_id" },
                            Math.floor((new Date(new Date().getFullYear() +
                                "/" +
                                (new Date().getMonth() + 1) +
                                "/" +
                                new Date().getDate())) / 1000).toString(16) + "0000000000000000",
                        ],
                    },
                }).countDocuments()];
            case 1:
                userCountCreatedToday = _a.sent();
                return [2 /*return*/, userCountCreatedToday];
        }
    });
}); };
exports.getUserCountCreatedToday = getUserCountCreatedToday;
var getTotalActiveSubscriberCount = function (query) { return __awaiter(void 0, void 0, void 0, function () {
    var piqAdsSubscriptionCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, adsSubscription_1.default
                    .find(query)
                    .countDocuments()];
            case 1:
                piqAdsSubscriptionCount = _a.sent();
                return [2 /*return*/, piqAdsSubscriptionCount];
        }
    });
}); };
exports.getTotalActiveSubscriberCount = getTotalActiveSubscriberCount;
var getTotalNewSubscriberCount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var newSubscriberCount;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, adsSubscription_1.default
                    .find({
                    _id: {
                        $gt: Math.floor((new Date(new Date().getFullYear() +
                            "/" +
                            (new Date().getMonth() + 1) +
                            "/" +
                            new Date().getDate())) / 1000).toString(16) + "0000000000000000",
                    },
                    active: true,
                })
                    .countDocuments()];
            case 1:
                newSubscriberCount = _a.sent();
                return [2 /*return*/, newSubscriberCount];
        }
    });
}); };
exports.getTotalNewSubscriberCount = getTotalNewSubscriberCount;
// export const getOnlineUsers = (io: Server) => {
// 	if (!io) {
// 		return [];
// 	}
// 	let onlineUsers: any[] = [];
// 	Object.values(io.sockets.connected).forEach((soc) => {
// 		if (soc?.data) {
// 			onlineUsers.push(soc.data);
// 		}
// 	});
// 	return onlineUsers;
// };
// export const emitOnlineList = function (io: Server) {
// 	console.log("emitting updated user list...");
// 	try {
// 		/* fetch online user list */
// 		const onlineUsers = getOnlineUsers(io);
// 		io.sockets.emit("online-list", { users: onlineUsers });
// 	} catch (error: any) {
// 		/* handle the exception */
// 		console.log("@@@@emitting error", error);
// 	}
// };
var updateUserOnlineStatus = function (username, online) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!username) return [3 /*break*/, 4];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, model_1.default.findOneAndUpdate({ username: username }, {
                        lastOnline: new Date(),
                        online: online,
                    })];
            case 2:
                _b.sent();
                return [3 /*break*/, 4];
            case 3:
                _a = _b.sent();
                console.log("unknown error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateUserOnlineStatus = updateUserOnlineStatus;
