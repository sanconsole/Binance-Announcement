"use strict";
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
var express_1 = __importDefault(require("express"));
var roleModel_1 = __importDefault(require("../../models/Roles/roleModel"));
var model_1 = __importDefault(require("../../models/user/model"));
var Route = /** @class */ (function () {
    function Route() {
        var _this = this;
        this.path = "role";
        this.router = express_1.default.Router();
        this.schema = roleModel_1.default;
        this.userschema = model_1.default;
        this.addRoles = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleTypes, roleTypeRegExp, rolesData, roleRes, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        roleTypes = request.body.roleType;
                        roleTypeRegExp = new RegExp("^".concat(roleTypes, "$"), 'i');
                        return [4 /*yield*/, this.schema.find({ roleType: roleTypeRegExp })];
                    case 1:
                        rolesData = _a.sent();
                        if (!!rolesData.length) return [3 /*break*/, 3];
                        roleRes = new this.schema(request.body);
                        return [4 /*yield*/, roleRes.save()];
                    case 2:
                        data = _a.sent();
                        response.status(200).json({
                            status: true,
                            data: data,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        response.status(400).json({
                            status: false,
                            msg: "Role Name Is Duplicate",
                        });
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        response.status(400).json({
                            status: false,
                            msg: error_1.message,
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        this.getById = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, data, error_2;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _id = (_a = request === null || request === void 0 ? void 0 : request.params) === null || _a === void 0 ? void 0 : _a._id;
                        return [4 /*yield*/, this.schema.findOne({ _id: _id })];
                    case 1:
                        data = _b.sent();
                        response.status(200).json({
                            status: true,
                            data: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        response.status(500).json({
                            status: false,
                            msg: error_2.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getByRoleType = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var role, data, error_3;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        role = (_a = request === null || request === void 0 ? void 0 : request.body) === null || _a === void 0 ? void 0 : _a.role;
                        return [4 /*yield*/, this.schema.findOne({ roleType: role })];
                    case 1:
                        data = _b.sent();
                        response.status(200).json({
                            status: true,
                            data: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        response.status(500).json({
                            status: false,
                            msg: error_3.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAll = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, page, items_per_page, search, data, dataTotal, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 14, , 15]);
                        _a = request.query, page = _a.page, items_per_page = _a.items_per_page;
                        search = request.query.search;
                        data = void 0;
                        dataTotal = void 0;
                        if (!(page !== undefined && items_per_page !== undefined)) return [3 /*break*/, 7];
                        if (!search) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.schema.find({ roleType: { $regex: search, $options: "i" } }).sort({ createdAt: -1 }).skip((Number(page) - 1) * Number(items_per_page)).limit(Number(items_per_page))];
                    case 1:
                        data = _b.sent();
                        return [4 /*yield*/, this.schema.find({ roleType: { $ne: 'superadmin', $regex: search, $options: "i" } }).count()];
                    case 2:
                        dataTotal = _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, this.schema.find({}).sort({ createdAt: -1 }).skip((Number(page) - 1) * Number(items_per_page)).limit(Number(items_per_page))];
                    case 4:
                        data = _b.sent();
                        return [4 /*yield*/, this.schema.find({ roleType: { $ne: 'superadmin' } }).count()];
                    case 5:
                        dataTotal = _b.sent();
                        _b.label = 6;
                    case 6: return [3 /*break*/, 13];
                    case 7:
                        if (!search) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.schema.find({ roleType: { $regex: search, $options: "i" } }).sort({ createdAt: -1 }).limit(Number(items_per_page))];
                    case 8:
                        data = _b.sent();
                        return [4 /*yield*/, this.schema.find({ roleType: { $ne: 'superadmin', $regex: search, $options: "i" } }).count()];
                    case 9:
                        dataTotal = _b.sent();
                        return [3 /*break*/, 13];
                    case 10: return [4 /*yield*/, this.schema.find({}).sort({ createdAt: -1 }).limit(Number(items_per_page))];
                    case 11:
                        data = _b.sent();
                        return [4 /*yield*/, this.schema.find({ roleType: { $ne: 'superadmin' } }).count()];
                    case 12:
                        dataTotal = _b.sent();
                        _b.label = 13;
                    case 13:
                        response.status(200).json({
                            status: true,
                            data: data,
                            totalData: dataTotal
                        });
                        return [3 /*break*/, 15];
                    case 14:
                        error_4 = _b.sent();
                        response.status(500).json({
                            status: false,
                            msg: error_4.message,
                        });
                        return [3 /*break*/, 15];
                    case 15: return [2 /*return*/];
                }
            });
        }); };
        this.getTotalRoles = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var data, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.schema.count()];
                    case 1:
                        data = _a.sent();
                        response.status(200).json({
                            status: true,
                            data: data,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        // console.log(error)
                        response.status(400).json({
                            status: false,
                            msg: error_5.message,
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.update = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var roleTypes, previousRole, roleTypeRegExp, rolesData, data, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        roleTypes = request.body.roleType;
                        previousRole = request.body.previousRole;
                        console.log("roleee", previousRole);
                        console.log("roleee", roleTypes);
                        if (!(roleTypes.trim().length === 0)) return [3 /*break*/, 1];
                        response.status(400).json({
                            status: false,
                            msg: "Role name cannot be empty",
                        });
                        return [3 /*break*/, 6];
                    case 1:
                        roleTypeRegExp = new RegExp("^".concat(roleTypes, "$"), 'i');
                        return [4 /*yield*/, this.schema.find({
                                $and: [
                                    { roleType: roleTypeRegExp },
                                    { _id: { $ne: request.params._id } }
                                ]
                            })];
                    case 2:
                        rolesData = _a.sent();
                        if (!!(rolesData === null || rolesData === void 0 ? void 0 : rolesData.length)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.schema.updateOne({ _id: request.params._id }, { $set: request.body }, { new: true })];
                    case 3:
                        data = _a.sent();
                        return [4 /*yield*/, this.userschema.updateMany({ role: previousRole }, { role: roleTypes })];
                    case 4:
                        _a.sent();
                        response.status(201).send({
                            status: true,
                            data: data,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        response.status(400).json({
                            status: false,
                            msg: "Role Name Is Duplicate",
                        });
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_6 = _a.sent();
                        response.status(500).json({
                            status: false,
                            msg: error_6.message,
                        });
                        return [3 /*break*/, 8];
                    case 8: return [2 /*return*/];
                }
            });
        }); };
        this.delete = function (request, response, next) { return __awaiter(_this, void 0, void 0, function () {
            var getRole, getUsersRole, deleteProducts, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.schema.findById({ _id: request.params._id })];
                    case 1:
                        getRole = _a.sent();
                        return [4 /*yield*/, this.userschema.find({ role: getRole.roleType })];
                    case 2:
                        getUsersRole = _a.sent();
                        if (!(getUsersRole.length === 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.schema.findByIdAndDelete({ _id: request.params._id })];
                    case 3:
                        deleteProducts = _a.sent();
                        response.status(201).send({
                            status: true,
                            message: "Successfully Deleted",
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        response.status(400).json({
                            status: false,
                            msg: "Role already assigned to a users.",
                        });
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_7 = _a.sent();
                        response.status(400).json({
                            status: false,
                            msg: error_7.message,
                        });
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        this.initializeRoutes();
    }
    Route.prototype.initializeRoutes = function () {
        this.router.post("/add/".concat(this.path, "/"), this.addRoles);
        this.router.post("/getRoleByRole/".concat(this.path, "/"), this.getByRoleType);
        this.router.get("/getOne/".concat(this.path, "/:_id"), this.getById);
        this.router.get("/getTotal/".concat(this.path), this.getTotalRoles);
        this.router.get("/getAll/".concat(this.path), this.getAll);
        this.router.put("/updateOne/".concat(this.path, "/:_id"), this.update);
        this.router.delete("/deleteOne/".concat(this.path, "/:_id"), this.delete);
    };
    return Route;
}());
exports.default = Route;
