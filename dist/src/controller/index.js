"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = void 0;
const post_1 = __importDefault(require("../models/post"));
// GET /    완전 초기 화면, 모든 user의 post를 종합해서 보여주자 
async function getAll(req, res, next) {
    try {
        const posts = await post_1.default.findAll();
        res.json(posts);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}
exports.getAll = getAll;
//# sourceMappingURL=index.js.map