import { BelongsToGetAssociationMixin, DataTypes, HasManyGetAssociationsMixin, Model } from "sequelize";
import { dbType } from ".";
import Post from "./post";
import {sequelize} from './sequelize'

class User extends Model {
  public id?: number;
  public email! : string;
  public nickname!: string;
  public profile?: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updateAt!: Date;

  // 연관관계 
  public readonly Posts?: Post[];

  public getPosts!: HasManyGetAssociationsMixin<Post>
}

User.init({
  nick : {
    type : DataTypes.STRING(20)
  },
  email: {
    type : DataTypes.STRING(20),
    allowNull : false
  },
  password : {
    type : DataTypes.STRING(100),
    allowNull : false
  },
  profile : {
    type : DataTypes.STRING(300),
    allowNull : true
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