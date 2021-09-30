import { BelongsToGetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, Model } from "sequelize";
import { dbType } from ".";
import Post from "./post";
import {sequelize} from './sequelize'

class User extends Model {
  public readonly id!: number;
  public nickname!: string;
  public userId!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  // 연관관계 
  public readonly Post?: Post[];

  public getPosts!: HasManyGetAssociationsMixin<Post>
}

User.init({
  nickname : {
    type : DataTypes.STRING(20)
  },
  userId: {
    type : DataTypes.STRING(20),
    allowNull : false,
    unique : true
  },
  password : {
    type : DataTypes.STRING(100),
    allowNull : false
  }
},{
  sequelize,
  modelName : 'User',
  tableName : 'users',
  charset : 'utf8',
  collate : 'utf8_general_ci'
})

export const associate = (db: dbType) => {

  db.User.hasMany(db.Post)
}

export default User;