"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var InvestingData = new mongoose_1.default.Schema({
    time: {
        type: String,
    },
    currency: {
        type: String,
    },
    event: {
        type: String,
    },
    actual: {
        type: String,
    },
    forecast: {
        type: String,
    },
    previous: {
        type: String,
    },
    forcastDay: {
        type: String,
    },
    countryId: {
        type: String,
    },
});
var InvestingDataSchema = mongoose_1.default.model("investingEconomicCalender", InvestingData);
exports.default = InvestingDataSchema;
