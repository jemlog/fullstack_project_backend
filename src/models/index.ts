import User from './user';
import Post from './post';
import {associate as associateUser} from './user'

export * from './sequelize'

const db = {
  User,
  Post
}

export type dbType = typeof db;

associateUser(db);