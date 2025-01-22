"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ErrorHandler = /** @class */ (function (_super) {
    __extends(ErrorHandler, _super);
    function ErrorHandler(statusCode, message) {
        var _this = _super.call(this) || this;
        _this.statusCode = statusCode;
        _this.message = message;
        _this.isOperational = true;
        return _this;
    }
    return ErrorHandler;
}(Error));
function handleError(err, res) {
    res.status(err.statusCode || 500).json({
        status: err.status ? err.status : 'error',
        message: err.message ? err.message : 'Unknown error',
    });
}
var catchAsync = function (fn) { return function (req, res, next) {
    fn(req, res, next).catch(next);
}; };
module.exports = { ErrorHandler: ErrorHandler, handleError: handleError, catchAsync: catchAsync };
