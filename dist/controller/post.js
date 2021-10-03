"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectUserPost = exports.deletePost = exports.updatePost = exports.createPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
// POST /    create Post  게시글을 추가하는 부분이다. 
async function createPost(req, res, next) {
    const { title, description } = req.body;
    console.log('일단 post로는 도달했어!');
    const id = req.user ? req.user.id : 0;
    const location = req.file ? req.file.location : '';
    try {
        const post = await post_1.default.create({ title, description, image: location, UserId: id });
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
        const user = await user_1.default.findOne({ where: { id } });
        const data = await user.getPosts(); //get post도 !로 확신을 주고, promise로 가지고 와야 한다. 
        res.json({
            code: 200,
            message: data
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
}
exports.SelectUserPost = SelectUserPost;
//# sourceMappingURL=post.js.map