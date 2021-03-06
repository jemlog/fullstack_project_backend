"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis_1 = __importDefault(require("redis"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./passport"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const passport_2 = __importDefault(require("passport"));
const models_1 = require("./models");
const index_1 = __importDefault(require("./router/index"));
const post_1 = __importDefault(require("./router/post"));
const auth_1 = __importDefault(require("./router/auth"));
const app = (0, express_1.default)();
const redisClient = redis_1.default.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD
});
app.set('port', process.env.PORT || 3005);
(0, passport_1.default)();
if (process.env.NODE_ENV === 'production') {
    app.use((0, morgan_1.default)('combined'));
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
}
else {
    app.use((0, morgan_1.default)('dev'));
}
app.use('/', express_1.default.static('uploads'));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET));
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false
    },
    store: new RedisStore({ client: redisClient })
}));
app.use(passport_2.default.initialize());
app.use(passport_2.default.session());
//=====================================================
app.use('/', index_1.default);
// ????????? CRUD ?????????
app.use('/post', post_1.default);
app.use('/auth', auth_1.default);
// ==========================================
models_1.sequelize.sync({ force: false }).then(() => console.log('postgresql server loading complete'))
    .catch((err) => {
    console.error(err);
});
// ?????? ?????? ???????????? ?????????
app.use((req, res, next) => {
    console.log('???????????????');
    next();
});
app.use((err, req, res, next) => {
    console.error(err);
});
app.listen(app.get('port'), () => {
    console.log('server start');
});
//# sourceMappingURL=app.js.map