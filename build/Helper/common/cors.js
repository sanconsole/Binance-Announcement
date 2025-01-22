"use strict";
var allowList = require('../config/cors.json').allowList;
exports.corsOptions = {
    origin: function (origin, callback) {
        if (allowList.indexOf(origin) === -1 || !origin) {
            callback(null, false);
        }
        else {
            callback(null, true);
        }
    },
};
