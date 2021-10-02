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
const passport_1 = __importDefault(require("passport"));
const passportLocal = __importStar(require("passport-local")); // 🧨 이부분 꼭 다시 체크하고 넘어가기 
const LocalStrategy = passportLocal.Strategy;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
exports.default = () => {
    passport_1.default.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const exUser = await user_1.default.findOne({ where: { email } });
            if (exUser) {
                const result = await bcrypt_1.default.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                }
                else {
                    done(null, false, { message: '비밀번호가 일치하지 않습니다' });
                }
            }
            else {
                done(null, false, { message: '가입하지 않은 회원입니다!' }); // done이란? done 첫번째 기본값 null 서버 에러 나면 error 넣어줌
                // 로그인 성공하면 두번째 인자에 유저 객체 넣어주기 
                // 세번째는 로그인 실패했을때 메세지 이다! 
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
// 자 나는 이제 localstrategy로 왔어 
// 여기서 로그인을 처리하는 로직을 작성해 줄꺼야
//# sourceMappingURL=localStrategy.js.map