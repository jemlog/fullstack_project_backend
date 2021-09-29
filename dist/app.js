"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const models_1 = require("./models");
const index_1 = __importDefault(require("./router/index"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'production') {
    app.use((0, morgan_1.default)('combined'));
    app.use((0, hpp_1.default)());
    app.use((0, helmet_1.default)({ contentSecurityPolicy: false }));
}
else {
    app.use((0, morgan_1.default)('dev'));
}
app.use('/', index_1.default);
models_1.sequelize.sync({ force: false }).then(() => console.log('success'))
    .catch((err) => {
    console.error(err);
});
app.use((req, res, next) => {
    console.log('잘못왔네요');
    next();
});
app.use((err, req, res, next) => {
    console.error(err);
});
app.listen(8000);
//# sourceMappingURL=app.js.map