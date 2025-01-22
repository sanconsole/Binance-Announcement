"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    key: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    value: {
        type: String,
        required: true,
        trim: true,
    },
}, { timestamps: true });
var TemplateSchema = mongoose_1.default.model("template", config);
exports.default = TemplateSchema;
