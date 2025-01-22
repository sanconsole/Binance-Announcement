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
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    twitterAccount: {
        type: String,
        trim: true,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// config.pre("save", function (next) {
//   const feed = this as IAutomationFeed;
//   feed.slug = slugifyWithoutRandomText(feed.title);
//   next();
// });
var AutomationFeedsSchema = mongoose_1.default.model("automationfeeds", config);
exports.default = AutomationFeedsSchema;
