"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: 1000 * 10,
    max: 100,
    handler(req, res) {
        res.status(this.statusCode).json({
            code: this.statusCode,
            message: '10초에 5번만 호출 가능합니다'
        });
    }
});
exports.default = apiLimiter;
//# sourceMappingURL=limit.js.map