"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associate = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("./sequelize");
class Post extends sequelize_1.Model {
}
Post.init({
    title: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: sequelize_2.sequelize,
    modelName: 'Post',
    tableName: 'posts',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});
const associate = (db) => {
    db.Post.belongsTo(db.User);
};
exports.associate = associate;
exports.default = Post;
//# sourceMappingURL=post.js.map