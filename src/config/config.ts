import * as dotenv from 'dotenv'
dotenv.config()


type Config = {
  username: string,
  password: string,
  database: string,
  host: string,
  [key: string]: string | boolean
}

interface IConfigGroup {
  development: Config;
  test: Config;
  production: Config;
}

const config: IConfigGroup = {
  "development": {
    "username": "postgres",
    "password": process.env.DB_PASSWORD!,
    "database": "jemin_schema",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "operatorsAliases" : false
  },
  "test": {
    "username": "postgres",
    "password": process.env.DB_PASSWORD!,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": process.env.DB_PASSWORD!,
    "database": "jemin_schema",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}



export default config