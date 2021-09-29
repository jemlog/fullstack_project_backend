"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getAll = void 0;
const user_1 = __importDefault(require("../models/user"));
async function getAll(req, res, next) {
    try {
        const user = await user_1.default.findAll();
        res.json(user);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}
exports.getAll = getAll;
async function createUser(req, res, next) {
    console.log('hello');
    const { nickname, userId, password } = req.body;
    try {
        const newUser = await user_1.default.create({
            nickname,
            userId,
            password
        });
        res.json(newUser);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
}
exports.createUser = createUser;
//# sourceMappingURL=index.js.map