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
const passportLocal = __importStar(require("passport-local")); // ๐งจ ์ด๋ถ๋ถ ๊ผญ ๋ค์ ์ฒดํฌํ๊ณ  ๋์ด๊ฐ๊ธฐ 
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
                    done(null, false, { message: '๋น๋ฐ๋ฒํธ๊ฐ ์ผ์นํ์ง ์์ต๋๋ค' });
                }
            }
            else {
                done(null, false, { message: '๊ฐ์ํ์ง ์์ ํ์์๋๋ค!' }); // done์ด๋? done ์ฒซ๋ฒ์งธ ๊ธฐ๋ณธ๊ฐ null ์๋ฒ ์๋ฌ ๋๋ฉด error ๋ฃ์ด์ค
                // ๋ก๊ทธ์ธ ์ฑ๊ณตํ๋ฉด ๋๋ฒ์งธ ์ธ์์ ์ ์  ๊ฐ์ฒด ๋ฃ์ด์ฃผ๊ธฐ 
                // ์ธ๋ฒ์งธ๋ ๋ก๊ทธ์ธ ์คํจํ์๋ ๋ฉ์ธ์ง ์ด๋ค! 
            }
        }
        catch (error) {
            console.error(error);
            done(error);
        }
    }));
};
// ์ ๋๋ ์ด์  localstrategy๋ก ์์ด 
// ์ฌ๊ธฐ์ ๋ก๊ทธ์ธ์ ์ฒ๋ฆฌํ๋ ๋ก์ง์ ์์ฑํด ์ค๊บผ์ผ
//# sourceMappingURL=localStrategy.js.map