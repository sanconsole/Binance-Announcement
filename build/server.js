"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.app = exports.cronJobMap = void 0;
var app_1 = __importDefault(require("./app"));
var cronInit_1 = require("./cronInit");
var logger_1 = require("./Helper/logger");
/* eslint-disable no-var-requires */
require("dotenv").config();
var PORT = process.env.PORT;
var _a = process.env, ENVIRONMENT_IS_PRODUCTION = _a.ENVIRONMENT_IS_PRODUCTION, PIQ_MAIN_DB_URL = _a.PIQ_MAIN_DB_URL, PIQ_MAIN_DB_NAME = _a.PIQ_MAIN_DB_NAME;
exports.cronJobMap = new Map();
exports.app = new app_1.default([
// new TwitterRoute(),
// new TelegramRoute(),
// new DiscordRoute(),
// new BlueSkyRoute(),
], PORT);
exports.app.listen();
// run this every 30 mins!!
(0, cronInit_1.cronInit)();
process.on("uncaughtException", function (err) {
    logger_1.logger.error("Uncaught Exception:", err);
    // Perform cleanup tasks if necessary
    // process.exit(1); // Exit the process
});
// Global error handling for unhandled promise rejections
process.on("unhandledRejection", function (reason, promise) {
    logger_1.logger.error("Unhandled Rejection:", reason);
    // Perform cleanup tasks if necessary
    // process.exit(1); // Exit the process
});
exports.io = exports.app.IO;
