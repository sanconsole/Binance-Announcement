"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cronInit = void 0;
var Investing_com_1 = require("./workers/cronjobs/Investing.com");
var reuters_1 = require("./workers/cronjobs/reuters/reuters");
var ENVIRONMENT_IS_PRODUCTION = process.env.ENVIRONMENT_IS_PRODUCTION;
var cronInit = function () {
    //COMMENT:Test
    if (ENVIRONMENT_IS_PRODUCTION == "false") {
        reuters_1.reutersFeedFetcher.start();
        // InvestingEconomicCalenderFetcherCronJob.start(); //Ryan
        // InvestingEarningCalenderFetcherCronJob.start(); // Ryan
        // ReutersTokenCronJob.start();
        // PiQAuthTokenFetcherCronJob.start();
    }
    if (ENVIRONMENT_IS_PRODUCTION == "true") {
        // reutersFeedFetcher.start();
        Investing_com_1.InvestingEconomicCalenderFetcherCronJob.start(); //Ryan
        Investing_com_1.InvestingEarningCalenderFetcherCronJob.start(); // Ryan
        // ReutersTokenCronJob.start();
        // PiQAuthTokenFetcherCronJob.start();
    }
};
exports.cronInit = cronInit;
