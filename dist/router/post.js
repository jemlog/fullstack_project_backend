"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController = __importStar(require("../controller/post"));
const limit_1 = __importDefault(require("../middleware/limit"));
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("../middleware/auth");
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
console.log('====================hello=======================');
try {
    fs_1.default.readdirSync('uploads');
}
catch (error) {
    console.log(error);
    fs_1.default.mkdirSync('uploads');
}
aws_sdk_1.default.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'ap-northeast-2'
});
const upload = (0, multer_1.default)({
    storage: (0, multer_s3_1.default)({
        s3: new aws_sdk_1.default.S3(),
        bucket: 'boardproject',
        key(req, file, cb) {
            cb(null, `original/${Date.now()}${path_1.default.basename(file.originalname)}`);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});
// const upload = multer({
//   storage : multer.diskStorage({
//     destination(req,file,done)
//     {
//       done(null,'uploads/')
//   },
//   filename(req,file,done){
//     const ext = path.extname(file.originalname)
//     done(null,path.basename(file.originalname,ext) + Date.now() + ext)
//   }
// }),limits : { fileSize : 5*1024*1024}
// })
// 포스트를 추가하는 컨트롤러 
router.post('/', limit_1.default, upload.single('img'), postController.createPost);
router.get('/user/:id', auth_1.isLoggedIn, limit_1.default, postController.SelectUserPost);
router.put('/:id/user', auth_1.isLoggedIn, limit_1.default, postController.updatePost);
router.delete('/:id/user', auth_1.isLoggedIn, limit_1.default, postController.deletePost);
exports.default = router;
//# sourceMappingURL=post.js.map