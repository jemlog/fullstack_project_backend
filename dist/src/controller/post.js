"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectUserPost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const post_1 = __importDefault(require("../models/post"));
// POST /    create Post  게시글을 추가하는 부분이다. 
async function createPost(req, res, next) {
    const { title, description } = req.body;
    console.log(req.file);
    const id = req.user.id;
    try {
        const post = await post_1.default.create({ title, description, UserId: id });
        res.json({ code: 201, message: post });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.createPost = createPost;
// UPDATE :id/user  update user n's post    n번 유저의 게시글을 수정하는 로직 
async function updatePost(req, res, next) {
    const id = req.params.id;
    try {
        const post = await post_1.default.update({ title: "연남" }, {
            where: {
                title: '망원',
                id,
            }
        });
        res.json({
            code: 200,
            message: post
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.updatePost = updatePost;
// DELETE :id/user   delete user n's post    n번 유저의 게시글을 삭제하는 로직 
async function deletePost(req, res, next) {
    const id = req.params.id;
    try {
        const post = await post_1.default.destroy({ where: { id } });
        res.json({
            code: 204, message: '삭제완료'
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.deletePost = deletePost;
// GET /user/:id     select user n's post     n번 유저의 게시글ㅇ르 조회하는 로직 
async function SelectUserPost(req, res, next) {
    const id = req.params.id;
    try {
        const posts = await post_1.default.findAll({ where: { UserId: id } });
        res.json({
            code: 200,
            message: posts
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.SelectUserPost = SelectUserPost;
//# sourceMappingURL=post.js.map