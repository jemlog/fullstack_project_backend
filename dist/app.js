"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const index_1 = __importDefault(require("./router/index"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
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