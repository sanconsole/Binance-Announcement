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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postBSky = exports.postTwit = exports.postToDiscord = exports.postToTelegram = exports.getMonthByIndex = exports.diff_minutes = void 0;
var axios_1 = __importDefault(require("axios"));
var discord_js_1 = __importStar(require("discord.js"));
var logger_1 = require("./logger");
var TwitterApi = require("twitter-api-v2").TwitterApi;
var _a = require("@atproto/api"), BskyAgent = _a.BskyAgent, RichText = _a.RichText;
var client = new discord_js_1.default.Client({
    intents: [discord_js_1.GatewayIntentBits.Guilds, discord_js_1.GatewayIntentBits.GuildMessages],
});
client.on("ready", function (msg) {
    var _a;
    logger_1.logger.info("Logged in to Discord ".concat((_a = client === null || client === void 0 ? void 0 : client.user) === null || _a === void 0 ? void 0 : _a.tag, "!"));
});
var POST_TWEET = true;
var diff_minutes = function (dt2, dt1) { return __awaiter(void 0, void 0, void 0, function () {
    var diff;
    return __generator(this, function (_a) {
        diff = (dt2.getTime() - dt1.getTime()) / 1000;
        diff /= 60;
        return [2 /*return*/, Math.abs(Math.round(diff))];
    });
}); };
exports.diff_minutes = diff_minutes;
var getMonthByIndex = function (id) {
    switch (id) {
        case 1:
            return "Jan";
        case 2:
            return "Feb";
        case 3:
            return "Mar";
        case 4:
            return "Apr";
        case 5:
            return "May";
        case 6:
            return "Jun";
        case 7:
            return "Jul";
        case 8:
            return "Aug";
        case 9:
            return "Sep";
        case 10:
            return "Oct";
        case 11:
            return "Nov";
        case 12:
            return "Dec";
        default:
            return "Invalid";
    }
};
exports.getMonthByIndex = getMonthByIndex;
var postToTelegram = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var headline, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                headline = data === null || data === void 0 ? void 0 : data.title;
                headline = headline + "\n\n".concat(data === null || data === void 0 ? void 0 : data.articleUrl);
                // if (base64 && base64 !== null) {
                //   var base64Data = base64.replace(/^data:image\/png;base64,/, "");
                //   const directoryPath = "telegram_image.png";
                //   if (require("fs").existsSync(directoryPath)) {
                //     require("fs").unlinkSync(directoryPath);
                //     logger.info("Telegram : Image Deleted");
                //   }
                //   require("fs").writeFile(
                //     directoryPath,
                //     base64Data,
                //     "base64",
                //     async (err: any) => {
                //       logger.info("Telegram : Image Saved");
                //       const url = `https://api.telegram.org/bot${item.bot_token}/sendPhoto`;
                //       // Read the image file into a buffer
                //       const imageBuffer = require("fs").readFileSync("telegram_image.png");
                //       // Create a FormData object to send as multipart/form-data
                //       const formData = new FormData();
                //       formData.append("chat_id", item.channel_id);
                //       formData.append("photo", imageBuffer, {
                //         filename: "telegram_image.png",
                //       });
                //       formData.append("caption", headline);
                //       // Make the API request
                //       const response = await axios.post(url, formData, {
                //         headers: formData.getHeaders(),
                //       });
                //       logger.info("Telegram: Headline Posted On Telegram");
                //     }
                //   );
                // } else {
                return [4 /*yield*/, axios_1.default.get("https://api.telegram.org/bot".concat(process.env.TELEGRAM_BOT_TOKEN, "/sendMessage?chat_id=").concat(process.env.TELEGRAM_CHANNEL_ID, "&text=").concat(encodeURI(headline)))];
            case 1:
                // if (base64 && base64 !== null) {
                //   var base64Data = base64.replace(/^data:image\/png;base64,/, "");
                //   const directoryPath = "telegram_image.png";
                //   if (require("fs").existsSync(directoryPath)) {
                //     require("fs").unlinkSync(directoryPath);
                //     logger.info("Telegram : Image Deleted");
                //   }
                //   require("fs").writeFile(
                //     directoryPath,
                //     base64Data,
                //     "base64",
                //     async (err: any) => {
                //       logger.info("Telegram : Image Saved");
                //       const url = `https://api.telegram.org/bot${item.bot_token}/sendPhoto`;
                //       // Read the image file into a buffer
                //       const imageBuffer = require("fs").readFileSync("telegram_image.png");
                //       // Create a FormData object to send as multipart/form-data
                //       const formData = new FormData();
                //       formData.append("chat_id", item.channel_id);
                //       formData.append("photo", imageBuffer, {
                //         filename: "telegram_image.png",
                //       });
                //       formData.append("caption", headline);
                //       // Make the API request
                //       const response = await axios.post(url, formData, {
                //         headers: formData.getHeaders(),
                //       });
                //       logger.info("Telegram: Headline Posted On Telegram");
                //     }
                //   );
                // } else {
                _a.sent();
                logger_1.logger.info("Telegram: Headline Posted On Telegram");
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                logger_1.logger.error(err_1, "error from telgram");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.postToTelegram = postToTelegram;
var postToDiscord = function (headline, item, base64) { return __awaiter(void 0, void 0, void 0, function () {
    var base64Data, directoryPath_1, payload, rest, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(base64 && base64 !== null)) return [3 /*break*/, 1];
                base64Data = base64.replace(/^data:image\/png;base64,/, "");
                directoryPath_1 = "discord_image.png";
                if (require("fs").existsSync(directoryPath_1)) {
                    require("fs").unlinkSync(directoryPath_1);
                    logger_1.logger.info("Discord : Image Deleted");
                }
                require("fs").writeFile(directoryPath_1, base64Data, "base64", function (err) { return __awaiter(void 0, void 0, void 0, function () {
                    var payload, rest;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                payload = {
                                    content: "\n\n" + headline,
                                    files: [directoryPath_1],
                                };
                                logger_1.logger.info("Discord : Image Saved");
                                rest = new discord_js_1.REST({ version: "10" }).setToken(item.bot_token);
                                return [4 /*yield*/, rest.post(discord_js_1.Routes.channelMessages(item.channel_id), {
                                        body: payload,
                                    })];
                            case 1:
                                _a.sent();
                                logger_1.logger.info("Discord: Headline Posted On Discord");
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 3];
            case 1:
                payload = {
                    content: headline + "\n",
                };
                rest = new discord_js_1.REST({ version: "10" }).setToken(item.bot_token);
                return [4 /*yield*/, rest.post(discord_js_1.Routes.channelMessages(item.channel_id), {
                        body: payload,
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                logger_1.logger.error(err_2, "error from Discord");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.postToDiscord = postToDiscord;
var textTweet = function (client, text) { return __awaiter(void 0, void 0, void 0, function () {
    var err_3;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                // rwClient.v2
                // const rwClient = client.readWrite;
                return [4 /*yield*/, client.v2.tweet(text)];
            case 1:
                // rwClient.v2
                // const rwClient = client.readWrite;
                _c.sent();
                logger_1.logger.info("Twitter: Tweet Posted On Twitter Without Image");
                return [3 /*break*/, 3];
            case 2:
                err_3 = _c.sent();
                logger_1.logger.error("Twitter Code :" + ((_a = err_3 === null || err_3 === void 0 ? void 0 : err_3.data) === null || _a === void 0 ? void 0 : _a.status) + " Message: " + ((_b = err_3 === null || err_3 === void 0 ? void 0 : err_3.data) === null || _b === void 0 ? void 0 : _b.detail));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var mediaTweet = function (client, text, image) { return __awaiter(void 0, void 0, void 0, function () {
    var base64Data, directoryPath_2;
    var _a, _b;
    return __generator(this, function (_c) {
        try {
            base64Data = image.replace(/^data:image\/png;base64,/, "");
            directoryPath_2 = "twitter_image.png";
            if (require("fs").existsSync(directoryPath_2)) {
                require("fs").unlinkSync(directoryPath_2);
                logger_1.logger.info("Twitter : Image Deleted");
            }
            require("fs").writeFile(directoryPath_2, base64Data, "base64", function (err) { return __awaiter(void 0, void 0, void 0, function () {
                var mediaId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            logger_1.logger.info("Twitter : Image Saved");
                            return [4 /*yield*/, client.v1.uploadMedia(directoryPath_2)];
                        case 1:
                            mediaId = _a.sent();
                            return [4 /*yield*/, client.v2.tweet({
                                    text: text,
                                    media: { media_ids: [mediaId] },
                                })];
                        case 2:
                            _a.sent();
                            logger_1.logger.info("Twitter: Tweet Posted On Twitter With Image");
                            return [2 /*return*/];
                    }
                });
            }); });
        }
        catch (err) {
            logger_1.logger.error("Twitter Code :" + ((_a = err === null || err === void 0 ? void 0 : err.data) === null || _a === void 0 ? void 0 : _a.status) + " Message: " + ((_b = err === null || err === void 0 ? void 0 : err.data) === null || _b === void 0 ? void 0 : _b.detail));
            // if (err?.data?.status === 429) {
            //   const twitterAccount = await TwitterSchema.findById(item?._id);
            //   if (twitterAccount) {
            //     twitterAccount.is_active = false;
            //     twitterAccount.save();
            //   }
            // }
        }
        return [2 /*return*/];
    });
}); };
var postTwit = function (text, item, base64) { return __awaiter(void 0, void 0, void 0, function () {
    var client_1, err_4;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 5, , 6]);
                // console.log(item, "item");
                // if (
                //   !item?.api_key ||
                //   !item?.api_key_secret ||
                //   !item?.access_token ||
                //   item?.access_token_secret ||
                //   !text
                // ) {
                //   return;
                // }
                console.log(text, "text");
                client_1 = new TwitterApi({
                    appKey: item.api_key,
                    appSecret: item.api_key_secret,
                    accessToken: item.access_token,
                    accessSecret: item.access_token_secret,
                    // bearerToken: item.bearer_token,
                    timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
                    strictSSL: true, // optional - requires SSL certificates to be valid.
                });
                if (!(base64 && base64 !== null)) return [3 /*break*/, 2];
                return [4 /*yield*/, mediaTweet(client_1, text, base64)];
            case 1:
                _c.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, textTweet(client_1, text)];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_4 = _c.sent();
                logger_1.logger.error("Twitter Code :" + ((_a = err_4 === null || err_4 === void 0 ? void 0 : err_4.data) === null || _a === void 0 ? void 0 : _a.status) + " Message: " + ((_b = err_4 === null || err_4 === void 0 ? void 0 : err_4.data) === null || _b === void 0 ? void 0 : _b.detail));
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.postTwit = postTwit;
var postBSky = function (text, item, base64) { return __awaiter(void 0, void 0, void 0, function () {
    var agent_1, richText_1, base64Data, directoryPath_3, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!(item === null || item === void 0 ? void 0 : item.user_name) || !(item === null || item === void 0 ? void 0 : item.password) || !text)
                    return [2 /*return*/];
                agent_1 = new BskyAgent({ service: "https://bsky.social" });
                return [4 /*yield*/, agent_1.login({
                        identifier: item === null || item === void 0 ? void 0 : item.user_name,
                        password: item === null || item === void 0 ? void 0 : item.password,
                    })];
            case 1:
                _a.sent();
                richText_1 = new RichText({ text: text });
                return [4 /*yield*/, richText_1.detectFacets(agent_1)];
            case 2:
                _a.sent();
                if (!(base64 && base64 !== null)) return [3 /*break*/, 3];
                base64Data = base64.replace(/^data:image\/png;base64,/, "");
                directoryPath_3 = "bsky_image.png";
                if (require("fs").existsSync(directoryPath_3)) {
                    require("fs").unlinkSync(directoryPath_3);
                    logger_1.logger.info("BSky : Image Deleted");
                }
                require("fs").writeFile(directoryPath_3, base64Data, "base64", function (err) { return __awaiter(void 0, void 0, void 0, function () {
                    var file, image, data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                logger_1.logger.info("BSky : Image Saved");
                                file = require("fs").readFileSync(directoryPath_3);
                                image = Buffer.from(file);
                                return [4 /*yield*/, agent_1.uploadBlob(image, 
                                    // convertDataURIToUint8Array(`data:image/png;base64,` + base64),
                                    {
                                        encoding: "image/png",
                                    })];
                            case 1:
                                data = (_a.sent()).data;
                                return [4 /*yield*/, agent_1.post({
                                        text: richText_1.text,
                                        facets: richText_1.facets,
                                        embed: {
                                            images: [
                                                {
                                                    alt: "https://PiQSuite.com",
                                                    image: data.blob,
                                                },
                                            ],
                                            $type: "app.bsky.embed.images",
                                        },
                                    })];
                            case 2:
                                _a.sent();
                                logger_1.logger.info("BSky: Bsky Posted On Twitter With Image");
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, agent_1.post({
                    text: richText_1.text,
                    facets: richText_1.facets,
                })];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [3 /*break*/, 7];
            case 6:
                err_5 = _a.sent();
                logger_1.logger.error("BSky:" + (err_5 === null || err_5 === void 0 ? void 0 : err_5.message));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.postBSky = postBSky;
