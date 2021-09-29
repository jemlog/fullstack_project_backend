"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var models_1 = require("./models");
var app = (0, express_1["default"])();
app.get('/', function (req, res) {
    res.send('hello');
});
models_1.sequelize.sync({ force: false }).then(function () { return console.log('success'); })["catch"](function (err) {
    console.error(err);
});
app.listen();
