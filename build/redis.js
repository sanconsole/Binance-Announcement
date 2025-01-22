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
exports.runRedisServer = exports.redisClient = void 0;
var redis_adapter_1 = require("@socket.io/redis-adapter");
var redis_1 = require("redis");
var users_1 = require("./Helper/users");
var userActivity_1 = __importDefault(require("./models/user/userActivity"));
var socket_1 = require("./Helper/socket/socket");
var parser = require("ua-parser-js");
exports.redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
var runRedisServer = function (io) { return __awaiter(void 0, void 0, void 0, function () {
    var subClient;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subClient = exports.redisClient.duplicate();
                return [4 /*yield*/, exports.redisClient.connect()];
            case 1:
                _a.sent();
                return [4 /*yield*/, exports.redisClient.flushAll()];
            case 2:
                _a.sent();
                io === null || io === void 0 ? void 0 : io.adapter((0, redis_adapter_1.createAdapter)(exports.redisClient, subClient));
                io === null || io === void 0 ? void 0 : io.on("connection", function (socket) { return __awaiter(void 0, void 0, void 0, function () {
                    var username, deviceData, ip, user;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                username = socket.handshake.auth.username;
                                deviceData = parser(socket.request.headers["user-agent"]);
                                ip = socket.request.connection.remoteAddress;
                                //COMMENT:check if user is already logged in or not if it is already logged in then emit to logout from the current device devices
                                return [4 /*yield*/, (0, users_1.updateUserOnlineStatus)(username, true)];
                            case 1:
                                //COMMENT:check if user is already logged in or not if it is already logged in then emit to logout from the current device devices
                                _a.sent();
                                socket.join(username);
                                return [4 /*yield*/, (0, users_1.getUserDetails)(username)];
                            case 2:
                                user = _a.sent();
                                return [4 /*yield*/, (0, socket_1.performSocketOpetaions)(socket, user)];
                            case 3:
                                _a.sent();
                                io === null || io === void 0 ? void 0 : io.on("reuters", function (data) {
                                });
                                /* Disconnect socket */
                                socket.on("disconnect", function () { return __awaiter(void 0, void 0, void 0, function () {
                                    var authRoom;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                socket.leave("auth");
                                                socket.leave("admin");
                                                socket.leave("public");
                                                authRoom = Array.from(io.sockets.adapter.rooms.get(username) || []);
                                                if (!!authRoom.length) return [3 /*break*/, 2];
                                                return [4 /*yield*/, (0, users_1.updateUserOnlineStatus)(username, false)];
                                            case 1:
                                                _a.sent();
                                                _a.label = 2;
                                            case 2:
                                                socket.disconnect();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                /* logout */
                                socket.on("logout", function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, (0, users_1.getUserDetails)(username)];
                                            case 1:
                                                user = _a.sent();
                                                return [4 /*yield*/, userActivity_1.default.create({
                                                        deviceData: deviceData,
                                                        ip: ip,
                                                        user: user === null || user === void 0 ? void 0 : user._id,
                                                        type: "LOGOUT",
                                                    })];
                                            case 2:
                                                _a.sent();
                                                socket.leave("auth");
                                                socket.leave("admin");
                                                socket.leave("public");
                                                socket.join("public");
                                                return [4 /*yield*/, (0, users_1.updateUserOnlineStatus)(username, false)];
                                            case 3:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                /* login */
                                socket.on("login", function (data) { return __awaiter(void 0, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, (0, users_1.getUserDetails)(username)];
                                            case 1:
                                                user = _a.sent();
                                                return [4 /*yield*/, (0, socket_1.performSocketOpetaions)(socket, user)];
                                            case 2:
                                                _a.sent();
                                                //COMMENT:check if user is already logged in or not if it is already logged in then emit to logout from the current device devices
                                                return [4 /*yield*/, (0, users_1.updateUserOnlineStatus)(username, true)];
                                            case 3:
                                                //COMMENT:check if user is already logged in or not if it is already logged in then emit to logout from the current device devices
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); };
exports.runRedisServer = runRedisServer;
