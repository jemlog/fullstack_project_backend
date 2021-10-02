import { BelongsToGetAssociationMixin, DataTypes, Model } from "sequelize";
import { dbType } from ".";
import {sequelize} from './sequelize'
import User from "./user";


class Post extends Model {
  public readonly id!: number;
  public title!: string; 
  public description!: string;
  public image?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly User?: User;
  
  public getUser!: BelongsToGetAssociationMixin<User>
}

Post.init({

  title : {
    type : DataTypes.STRING(20),
    allowNull : false
  },
  description : {
    type : DataTypes.STRING(100),
    allowNull : false
  },
  image : {
    type : DataTypes.STRING(300),
    allowNull : true
  }
},{
  sequelize,
  timestamps : true,
  modelName : 'Post',
  tableName : 'posts',
  charset : 'utf8',
  collate : 'utf8_general_ci'
})

export const associate = (db: dbType) => {

  db.Post.belongsTo(db.User)
}

export default Post;