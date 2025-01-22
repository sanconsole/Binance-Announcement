"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
        unique: true,
    },
    image: {
        type: String,
    },
    pubDate: {
        type: Date,
    },
    type: {
        type: String,
    },
}, { timestamps: { createdAt: "pubDate" } });
var DataSchema = mongoose_1.default.model("data", schema);
exports.default = DataSchema;
