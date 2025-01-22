"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var newReutersBlacklist = new mongoose_1.default.Schema({
    keyword: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var newReutersBlacklistSchema = mongoose_1.default.model("newReutersBlacklist", newReutersBlacklist);
exports.default = newReutersBlacklistSchema;
