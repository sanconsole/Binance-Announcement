"use strict";
var Redis = require('ioredis');
var client = new Redis(process.env.REDIS_URL);
var subscriber = new Redis(process.env.REDIS_URL);
exports.opts = {
    createClient: function (type) {
        switch (type) {
            case 'client':
                return client;
            case 'subscriber':
                return subscriber;
            default:
                return new Redis(process.env.REDIS_URL);
        }
    },
};
