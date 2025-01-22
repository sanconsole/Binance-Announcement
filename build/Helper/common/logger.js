"use strict";
var winston = require('winston');
var customFormat = winston.format.combine(winston.format.timestamp({
    format: 'DD-MM-YYYY HH:MM:SS',
}), winston.format.printf(function (info) { return "".concat(info.timestamp, "  [").concat(info.level, "] : ").concat(info.message); }));
var logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize({ all: true }), customFormat),
        }),
        new winston.transports.File({
            filename: "".concat(process.cwd(), "/error.log"),
            level: 'error',
            format: customFormat,
        }),
    ],
});
var logObject = function (obj) {
    if (obj === void 0) { obj = {}; }
    logger.info("".concat(JSON.stringify(obj, null, ' ')));
};
module.exports = { logger: logger, logObject: logObject };
