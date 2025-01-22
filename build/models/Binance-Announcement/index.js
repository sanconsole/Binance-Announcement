"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var binanceAnnouncementSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    slug: {
        type: String,
        required: true,
    },
    articleUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var binanceAnnouncementModel = mongoose_1.default.model("binanceAnnouncement", binanceAnnouncementSchema);
exports.default = binanceAnnouncementModel;
