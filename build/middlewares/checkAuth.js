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
exports.checkRoleAuth = exports.checkAdminAuth = exports.checkRoleAdmin = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var model_1 = __importDefault(require("../models/user/model"));
var roleModel_1 = __importDefault(require("../models/Roles/roleModel"));
var checkRoleAdmin = function (req, res, next) {
    var _a;
    try {
        // const token = req.headers.authorization.split(" ")[1]
        var models_1 = "RoleManagement" ||
            "TwitterManagement" ||
            "AutomationFeeds" ||
            "DiscordManagement" ||
            "TelegramManagement" ||
            "UserManagement" ||
            "BlackList" ||
            "WhiteList";
        var pathname = (_a = req === null || req === void 0 ? void 0 : req._parsedUrl) === null || _a === void 0 ? void 0 : _a.pathname;
        switch (pathname) {
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/role"):
                models_1 = "RoleManagement";
                break;
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/twitter"):
                models_1 = "TwitterManagement";
                break;
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/automationfeed"):
                models_1 = "AutomationFeeds";
                break;
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/discord"):
                models_1 = "DiscordManagement";
                break;
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/telegram"):
                models_1 = "TelegramManagement";
                break;
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/user"):
                models_1 = "UserManagement";
                break;
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/blacklist"):
                models_1 = "BlackList";
                break;
            case pathname === null || pathname === void 0 ? void 0 : pathname.includes("/whitelist"):
                models_1 = "WhiteList";
                break;
            default:
                models_1 = "RoleManagement";
                break;
        }
        var method_1 = req.method.toLowerCase();
        if (method_1 === "put") {
            method_1 = "update";
        }
        // const token = req.cookies.WWWtttLLL;
        var rawHeaders = req === null || req === void 0 ? void 0 : req.rawHeaders;
        var headers = {};
        for (var i = 0; i < (rawHeaders === null || rawHeaders === void 0 ? void 0 : rawHeaders.length); i += 2) {
            headers[rawHeaders[i]] = rawHeaders[i + 1];
        }
        var token = headers["x-access-token"];
        console.log("token", token);
        if (!token) {
            return res
                .status(401)
                .json({ status: false, message: "Fail to authenticate user" });
        }
        jsonwebtoken_1.default.verify(token, "secretkey", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    return [2 /*return*/, res
                            .status(403)
                            .json({ status: false, message: "Token not valid" })];
                }
                model_1.default.findOne({ _id: data.id })
                    .then(function (userData) {
                    console.log("userdata", userData);
                    if (userData.role === "superadmin") {
                        next();
                    }
                    else {
                        console.log("userData", userData);
                        req.user = userData;
                        roleModel_1.default.findOne({ roleType: userData.role })
                            .then(function (data) {
                            var validRoles = data.rolePermissions[0]._doc;
                            if (validRoles.hasOwnProperty(models_1)) {
                                if (validRoles[models_1].includes(method_1)) {
                                    next();
                                }
                                else {
                                    return res.status(401).json({
                                        success: false,
                                        error: "Only authorized user can have access",
                                    });
                                }
                            }
                            else {
                                return res.status(401).json({
                                    success: false,
                                    error: "Only authorized user can have access",
                                });
                            }
                        })
                            .catch(function (err) {
                            return res.status(401).json({ success: false, error: "Auth failed." });
                        });
                    }
                })
                    .catch(function (userData) {
                    return res
                        .status(401)
                        .json({ success: false, error: "Auth failed." });
                });
                return [2 /*return*/];
            });
        }); });
    }
    catch (e) {
        return res.status(403).json({ status: false, message: e.message });
    }
};
exports.checkRoleAdmin = checkRoleAdmin;
var checkAdminAuth = function (req, res, next) {
    try {
        // const token = req.headers.authorization.split(" ")[1]
        var token = req.cookies.WWWtttLLL;
        console.log("token", token);
        if (!token) {
            return res
                .status(404)
                .json({ status: false, message: "Fail to authenticate admin" });
        }
        jsonwebtoken_1.default.verify(token, "secretkey", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (err) {
                    return [2 /*return*/, res
                            .status(404)
                            .json({ status: false, message: "Token not valid" })];
                }
                model_1.default.findOne({ _id: data.id })
                    .then(function (userData) {
                    req.user = userData;
                    console.log(req.user, "user");
                    if (userData.role === "admin") {
                        next();
                    }
                    else {
                        return res
                            .status(403)
                            .json({ success: false, error: "Only Admin can authorized" });
                    }
                })
                    .catch(function (userData) {
                    return res
                        .status(403)
                        .json({ success: false, error: "Auth failed." });
                });
                return [2 /*return*/];
            });
        }); });
    }
    catch (e) {
        return res.status(403).json({ status: false, message: e.message });
    }
};
exports.checkAdminAuth = checkAdminAuth;
var checkRoleAuth = function (routesFor, method) {
    return function (req, res, next) {
        try {
            // const token = req.headers.authorization.split(" ")[1]
            var token = req.cookies.WWWtttLLL;
            console.log("token", token);
            if (!token) {
                return res
                    .status(401)
                    .json({ status: false, message: "Fail to authenticate user" });
            }
            jsonwebtoken_1.default.verify(token, "secretkey", function (err, data) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (err) {
                        return [2 /*return*/, res
                                .status(403)
                                .json({ status: false, message: "Token not valid" })];
                    }
                    model_1.default.findOne({ _id: data.id })
                        .then(function (userData) {
                        console.log("userdata", userData);
                        if (userData.role === "superadmin") {
                            next();
                        }
                        req.user = userData;
                        roleModel_1.default.findOne({ roleType: userData.role })
                            .then(function (data) {
                            var validRoles = data.rolePermissions[0]._doc;
                            if (validRoles.hasOwnProperty(routesFor)) {
                                if (validRoles[routesFor].includes(method)) {
                                    next();
                                }
                                else {
                                    return res.status(401).json({
                                        success: false,
                                        error: "Only authorized user can have access",
                                    });
                                }
                            }
                            else {
                                return res.status(401).json({
                                    success: false,
                                    error: "Only authorized user can have access",
                                });
                            }
                        })
                            .catch(function (err) {
                            return res.status(401).json({ success: false, error: "Auth failed." });
                        });
                    })
                        .catch(function (userData) {
                        return res
                            .status(401)
                            .json({ success: false, error: "Auth failed." });
                    });
                    return [2 /*return*/];
                });
            }); });
        }
        catch (e) {
            return res.status(403).json({ status: false, message: e.message });
        }
    };
};
exports.checkRoleAuth = checkRoleAuth;
