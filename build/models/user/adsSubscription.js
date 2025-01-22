"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var piqAdsSubscriptionSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    subscriptionPlan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subscriptionPlan",
    },
    subscriptionId: {
        type: String,
        default: "",
    },
    stripeCustomerId: {
        type: String,
        default: "",
    },
    subscriptionEndDate: {
        type: Date,
        default: null,
    },
    type: {
        type: String,
    },
    is_paid: {
        type: Boolean,
        default: true,
    },
    billingName: {
        type: String,
        default: "",
    },
    active: {
        type: Boolean,
        default: true,
    },
    refunded: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    cancellation_type: {
        type: String,
        default: "NONE",
        enum: [
            "NONE",
            "CANCEL_AT_PERIOD_END",
            "CUSTOM",
            "PAUSE",
            "IMMEDIATE",
            "CANCELED_DUE_TO_PAST_DUE",
        ],
        //COMMENT:Options are 1)NONE 2)CANCEL_AT_PERIOD_END 3)CUSTOM 4)PAUSE 5)IMMEDIATE
    },
});
var piqAdsSubscriptionModel = mongoose.model("piqAdsSubscription", piqAdsSubscriptionSchema);
exports.default = piqAdsSubscriptionModel;
