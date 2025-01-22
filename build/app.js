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
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var express_session_1 = __importDefault(require("express-session"));
var mongoose_1 = __importDefault(require("mongoose"));
var morgan_1 = __importDefault(require("morgan"));
var passport_1 = __importDefault(require("passport"));
var path_1 = __importDefault(require("path"));
var socket_io_1 = require("socket.io");
var index_1 = __importDefault(require("./Route/User/index"));
var index_2 = __importDefault(require("./Route/Role/index"));
var index_3 = __importDefault(require("./Route/Twitter/index"));
var index_4 = __importDefault(require("./Route/Telegram/index"));
var index_5 = __importDefault(require("./Route/Whitelist/index"));
var index_6 = __importDefault(require("./Route/Blacklist/index"));
var index_7 = __importDefault(require("./Route/Discord/index"));
var index_8 = __importDefault(require("./Route/Automationfeed/index"));
var checkAuth_1 = require("./middlewares/checkAuth");
var BSky_1 = __importDefault(require("./Route/BSky"));
// import logger from 'express-logger';
/* eslint-disable no-var-requires */
require("dotenv").config();
// const logger = require('express-logger')
var DB_URL = process.env.DB_URL;
morgan_1.default.token("id", function (req) {
    var username = req.headers["username"];
    return username;
});
var App = /** @class */ (function () {
    function App(routes, port) {
        var _this = this;
        this.dbUrl = DB_URL;
        this.IO = null;
        this.ALLOWEDLIST = [
            "http://localhost:3000",
            "http://localhost:3001",
            "https://priapusiq.com",
            "https://piqsuite.com",
            "https://test.piqsuite.com",
            "https://www.piqsuite.com",
            "https://www.test.piqsuite.com",
            "https://beta.piqsuite.com",
            "https://www.beta.piqsuite.com",
            "https://admin.priapusiq.com",
            "https://automation-admin.priapusiq.com",
            "https://89d1697de324e4d41ea4b33ffea165ef.piqsuite.com",
            "https://dev-admin-panel.piqsuite.com",
        ];
        this.CORSOPTION = {
            origin: function (origin, callback) {
                if (_this.ALLOWEDLIST.indexOf(origin) !== -1 || !origin) {
                    callback(null, true);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            credentials: true, // Allow credentials
        };
        this.config = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.app.use((0, cors_1.default)(this.CORSOPTION));
                        this.app.use(function (req, res, next) {
                            if (req.originalUrl.startsWith("/stripe/webhook")) {
                                next();
                            }
                            else {
                                express_1.default.json()(req, res, next);
                            }
                        });
                        this.app.use((0, cookie_parser_1.default)());
                        this.app.use((0, morgan_1.default)("[Username: :id ] [Remote IP: :remote-addr ] [Method: :method ] [Url: :url ] [Status: :status ] [HTTP Version: HTTP/:http-version ] [Content Length: :res[content-length] ] [Referer: :referrer ]  [User Agent: :user-agent ] [Remote User: :remote-user ] [Date Time: :date[clf] ] - [Response Time: :response-time ms ] \n"));
                        this.app.use((0, express_session_1.default)({ secret: "whatever", resave: true, saveUninitialized: true }));
                        this.app.use(passport_1.default.initialize());
                        this.app.use(passport_1.default.session());
                        this.app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
                        this.app.use("/assets", express_1.default.static(path_1.default.join("".concat(__dirname, "/assets"))));
                        this.app.use("/uploads", express_1.default.static("uploads"));
                        return [4 /*yield*/, mongoose_1.default.connect(this.dbUrl, {
                                useNewUrlParser: true,
                                useUnifiedTopology: true,
                                useFindAndModify: false,
                            })];
                    case 1:
                        _a.sent();
                        console.log("connected to mongodb server");
                        return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes = function (routes) {
            _this.app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("X-Frame-Options", "Deny");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                if (req.method === "OPTIONS") {
                    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
                    return res.status(200).json({});
                }
                next();
            });
            routes.forEach(function (route) {
                _this.app.use("/", route.router);
            });
            _this.app.use("/test", checkAuth_1.checkAdminAuth, function (req, res) {
                console.log("api test");
                res.send(" yes it is working");
            });
            // user routes
            var userRoute = new index_1.default();
            _this.app.use("/api", userRoute.router);
            // role routes
            var roleRoute = new index_2.default();
            _this.app.use("/api", roleRoute.router);
            // twitter routes
            var twitterRoute = new index_3.default();
            _this.app.use("/api", twitterRoute.router);
            // automation feed routes
            var atomationFeedRoute = new index_8.default();
            _this.app.use("/api", atomationFeedRoute.router);
            // discord routes
            var discordRoute = new index_7.default();
            _this.app.use("/api", discordRoute.router);
            // telegram routes
            var telegramRoute = new index_4.default();
            _this.app.use("/api", telegramRoute.router);
            // blacklist routes
            var blacklistRoute = new index_6.default();
            _this.app.use("/api", blacklistRoute.router);
            // whitelist routes
            var whitelistRoute = new index_5.default();
            _this.app.use("/api", whitelistRoute.router);
            // BSky routes
            var bskyRoute = new BSky_1.default();
            _this.app.use("/api", bskyRoute.router);
        };
        this.listen = function () {
            var server = _this.app.listen(_this.PORT, function () {
                console.log("Server is running on port ".concat(_this.PORT));
            });
            var io = new socket_io_1.Server(server, {
                cors: {
                    origin: _this.ALLOWEDLIST,
                    credentials: true,
                },
            });
            _this.IO = io;
            _this.app.set("IO", io);
        };
        this.app = (0, express_1.default)();
        this.config();
        this.initializeRoutes(routes);
        this.PORT = port;
    }
    return App;
}());
exports.default = App;
// 2.1.13
