"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
var multer_1 = __importDefault(require("multer"));
var fs_1 = __importDefault(require("fs"));
//@desc image destination and filename
var FileStorage = function (path) {
    var storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            // setting destination of uploading files
            if (file.fieldname === "pdfLink") {
                // if uploading resume
                fs_1.default.mkdirSync(path + "/pdf", { recursive: true });
                cb(null, path);
            }
            else {
                // else uploading image
                fs_1.default.mkdirSync(path + "/images", { recursive: true });
                cb(null, path);
            }
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        },
    });
    //@desc filters of file type
    var fileFilter = function (req, file, cb) {
        if (file.fieldname === "pdfLink") {
            // if uploading pdf
            if (file.mimetype === "application/pdf" ||
                file.mimetype === "application/msword" ||
                file.mimetype ===
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                // check file type to be pdf, doc, or docx
                cb(null, true);
            }
            else {
                cb(null, false); // else fails
            }
        }
        else {
            // else uploading image
            if (file.mimetype === "image/png" ||
                file.mimetype === "image/jpg" ||
                file.mimetype === "image/jpeg") {
                // check file type to be png, jpeg, or jpg
                cb(null, true);
            }
            else {
                cb(null, false); // else fails
            }
        }
    };
    var uploadFile = (0, multer_1.default)({
        storage: storage,
        fileFilter: fileFilter,
    });
    return uploadFile;
};
exports.FileStorage = FileStorage;
