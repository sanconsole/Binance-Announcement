"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var config = new mongoose_1.default.Schema({
    key: {
        type: String,
        default: "NONE",
    },
    value: {
        type: mongoose_1.default.Schema.Types.Mixed,
        default: "DEFAULT",
    },
});
var configModel = mongoose_1.default.model("config", config);
exports.default = configModel;
