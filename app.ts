import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { sequelize } from './models';
import indexRouter from './router/index'
const app: express.Application = express();

app.use(express.json())
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

app.use('/', indexRouter)

sequelize.sync({force : false}).then(()=> console.log('success'))
.catch((err: Error)=> {
  console.error(err)
})

app.use((req,res,next)=>{
  console.log('잘못왔네요')
  next()
})

app.use((err: any, req: any,res: any,next: any)=> {
  console.error(err);
})


app.listen(8000)