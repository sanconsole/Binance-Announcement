"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var winston_1 = __importDefault(require("winston"));
var customFormat = winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(function (info) { return "".concat(info.timestamp, "  [").concat(info.level, "] : ").concat(info.message); }));
exports.logger = winston_1.default.createLogger({
    level: 'info',
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize({ all: true }), customFormat),
        }),
        new winston_1.default.transports.File({
            filename: "".concat(process.cwd(), "/error.log"),
            level: 'error',
            format: customFormat,
        }),
    ],
});
