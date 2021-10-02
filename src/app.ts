import express from 'express';
import dotenv from 'dotenv'
dotenv.config()
import redis from 'redis'
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passportConfig from './passport'
import connectRedis from 'connect-redis'
const RedisStore = connectRedis(session)
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import passport from 'passport'
import { sequelize } from './models';
import indexRouter from './router/index'
import postRouter from './router/post'
import fs from 'fs'
import authRouter from './router/auth'
const app: express.Application = express();
const redisClient = redis.createClient({
  url : `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password : process.env.REDIS_PASSWORD
})
app.set('port', process.env.PORT || 3005)


passportConfig()
if(process.env.NODE_ENV==='production')
{
  app.use(morgan('combined'))
  app.use(hpp())
  app.use(helmet({contentSecurityPolicy:false}))
}
else
{
  app.use(morgan('dev'))
}
app.use('/', express.static('uploads'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
  secret : process.env.COOKIE_SECRET!,
  resave : false,
  saveUninitialized : false,
  cookie : {
    httpOnly : true,
    secure : false
  },
  store : new RedisStore({client : redisClient})
}))

app.use(passport.initialize())
app.use(passport.session())
//=====================================================

app.use('/', indexRouter)

// 게시글 CRUD 라우터
app.use('/post',postRouter)

app.use('/auth',authRouter)

// ==========================================
sequelize.sync({force : false}).then(()=> console.log('postgresql server loading complete'))
.catch((err: Error)=> {
  console.error(err)
})
// 초기 화면 보여주는 라우터




app.use((req,res,next)=>{
  console.log('잘못왔네요')
  next()
})

app.use((err: any, req: any,res: any,next: any)=> {
  console.error(err);
})

app.listen(app.get('port'), ()=> {
  console.log('server start')
})