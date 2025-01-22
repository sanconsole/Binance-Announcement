"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var InvestingData = new mongoose_1.default.Schema({
    company: {
        type: String,
    },
    forcastDay: {
        type: String,
    },
});
InvestingData.index({ company: 1, forcastDay: 1 }, { unique: true });
var InvestingEarningCalenderDataSchema = mongoose_1.default.model("investingEarningCalender", InvestingData);
exports.default = InvestingEarningCalenderDataSchema;
