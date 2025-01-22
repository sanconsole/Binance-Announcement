"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var counter = new mongoose_1.default.Schema({
    key: {
        type: String,
        default: "NONE",
        unique: true,
    },
    count: {
        type: Number,
        required: true,
        default: 0,
    },
}, {
    timestamps: true,
});
var CounterModel = mongoose_1.default.model("counter", counter);
exports.default = CounterModel;
