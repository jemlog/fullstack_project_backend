"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const post_1 = __importDefault(require("../models/post"));
const user_1 = __importDefault(require("../models/user"));
const localStrategy_1 = __importDefault(require("./localStrategy"));
// passport는 전략을 사용한다. 전략은 로그인을 어떻게 할지 전략을 적어놓은 것이다. 
exports.default = () => {
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    // 즉 세션에 id만 저장하는 기능 
    // model : Post, attributes : ['title','description','image']
    passport_1.default.deserializeUser((id, done) => {
        user_1.default.findOne({ where: { id }, include: {
                model: post_1.default, attributes: ['title', 'description', 'image']
            } })
            .then(user => done(null, user)) // req.user에 찾은 user를 집어넣는다. req.isAuthenticated() 이 함수 실행시 로그인되어있으면 true
            .catch(err => done(err)); // 세션에 저장했던 아이디를 가지고 User에서 해당하는 사람 찾는다. 찾아서 다시 done에 넣어준다. 
    });
    (0, localStrategy_1.default)(); // passport.authenticate('local') 에 걸렸기 때문에 여기서 localStrategy로 넘어간다. 
};
// index는 serialize와 deserialize를 위한 영역 
// serialize의 역할은 세션에 user.id를 저장하는 역할이다. 
// deserialize의 역할은 passport.session()에서 해독해준 id를 가지고 user에서 검색을 하고 user를 찾아서 done에 넣고, req.user를 사용하게 해줌 
//# sourceMappingURL=index.js.map